// Serveurs factices pour les tests : aucun appel externe réel n'est fait.
import http from 'node:http';

export const PAGE_A = `Communiqué de la Présidence. Le vendredi 25 septembre 2026 est maintenu comme journée chômée et payée, a indiqué le porte-parole. Le texte précise que les employeurs du secteur privé doivent appliquer cette décision sans délai. Cette annonce fait suite à un message contraire diffusé la veille sur les réseaux officiels, que les services de la communication ont qualifié d'erreur. Les organisations syndicales ont demandé une clarification écrite avant le week-end.`;
export const PAGE_B = `Reprise : Communiqué de la Présidence. Le vendredi 25 septembre 2026 est maintenu comme journée chômée et payée, a indiqué le porte-parole. Le texte précise que les employeurs du secteur privé doivent appliquer cette décision sans délai. Cette annonce fait suite à un message contraire diffusé la veille sur les réseaux officiels, que les services de la communication ont qualifié d'erreur. Les organisations syndicales ont demandé une clarification écrite avant le week-end. Lu sur notre site.`;
export const PAGE_C = `Vérification indépendante. Notre équipe a consulté le journal officiel et interrogé trois syndicats. Aucune trace d'un piratage technique n'a été publiée à ce jour et aucune expertise indépendante n'est disponible. Le ministre est le seul à avancer cette explication. Nous n'avons pas pu établir la date exacte de signature du décret, deux références donnant des dates différentes. ${'Détails complémentaires de la rédaction. '.repeat(8)}`;

const html = (title, body, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>${extra}</head><body><nav>Menu Accueil</nav><article><h1>${title}</h1><p>${body}</p></article><footer>Pied</footer><script>alert(1)</script></body></html>`;

export function startMockWeb() {
  const srv = http.createServer((req, res) => {
    const u = req.url;
    if (u === '/a') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(html('Communiqué du 24 septembre', PAGE_A, '<meta property="article:published_time" content="2026-09-24T10:00:00Z"><meta property="og:site_name" content="Presse Test">')); }
    if (u === '/b') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(html('Un journal reprend', PAGE_B)); }
    if (u === '/c') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(html('Vérification', PAGE_C, '<meta property="article:published_time" content="2026-09-28">')); }
    if (u === '/short') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end('<html><body>Connectez-vous</body></html>'); }
    if (u === '/redir') { res.writeHead(302, { location: 'file:///etc/passwd' }); return res.end(); }
    if (u === '/loop') { res.writeHead(302, { location: '/loop' }); return res.end(); }
    if (u === '/pdf') { res.writeHead(200, { 'content-type': 'application/pdf' }); return res.end('%PDF-1.4'); }
    if (u === '/big') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end('x'.repeat(3 * 1024 * 1024)); }
    if (u === '/slow') { return; }
    res.writeHead(404); res.end('nope');
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r({ srv, base: `http://127.0.0.1:${srv.address().port}` })));
}

// Faux Anthropic : détecte l'étape par le prompt système, répond en JSON valide… et triche volontairement.
export function startMockAnthropic(opts = {}) {
  const calls = [];
  const srv = http.createServer((req, res) => {
    let b = ''; req.on('data', (c) => (b += c));
    req.on('end', () => {
      const body = JSON.parse(b || '{}');
      calls.push({ url: req.url, body });
      if (opts.status) { res.writeHead(opts.status, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ type: 'error', error: { type: 'authentication_error', message: 'bad key' } })); }
      const sys = String(typeof body.system === 'string' ? body.system : (body.system || []).map((x) => x.text).join(' '));
      const userContent = body.messages[0].content;
      const userText = typeof userContent === 'string' ? userContent : userContent.map((c) => c.text || '').join('\n');
      let out;
      if (sys.includes('Tu transcris des captures')) {
        out = opts.blankOcr
          ? { text: '', legible: false, platform: '', author: '', date_shown: '', notes: 'image floue' }
          : { text: "Le 25 septembre 2026 est férié, chômé et payé selon la Présidence.\nLe ministre affirme que le message contraire était un piratage.", legible: true, platform: 'Facebook', author: 'Page Actu', date_shown: '24 sept.', notes: '' };
      } else if (sys.includes('AFFIRMATIONS distinctes')) {
        out = {
          themes: ['Lois, décrets et annonces', 'Présidence et gouvernement'],
          claims: opts.noClaims ? [] : [
            { text: 'Le vendredi 25 septembre 2026 est une journée chômée et payée.', kind: 'fait', time_scope: 'passe', people: [], institutions: ['Présidence'], countries: ['Madagascar'], dates: ['25 septembre 2026'], search_queries: ['25 septembre 2026 jour férié Madagascar'] },
            { text: "Le message contraire était dû à un piratage.", kind: 'fait', time_scope: 'passe', people: [], institutions: [], countries: [], dates: [], search_queries: ['piratage message 25 septembre Madagascar'] },
            { text: 'Le décret a été signé le 20 septembre.', kind: 'fait', time_scope: 'passe', people: [], institutions: [], countries: [], dates: ['20 septembre'], search_queries: ['décret 25 septembre signature'] },
            { text: "C'est une honte.", kind: 'opinion', time_scope: 'present', people: [], institutions: [], countries: [], dates: [], search_queries: ['inutile'] },
          ],
        };
      } else {
        const srcs = [...userText.matchAll(/\[(S\d+)\] (\S+)\n[\s\S]*?<<<TEXTE\n([\s\S]*?)\nTEXTE>>>/g)].map((m) => ({ id: m[1], url: m[2], text: m[3] }));
        const first = srcs[0];
        out = {
          summary: 'Résumé de test.',
          sources: srcs.map((s) => ({ id: s.id, kind: 'presse' })),
          claims: [
            { id: 'C1', status: 'etaye', rationale: 'Le communiqué indique le maintien.', evidence: srcs.map((s) => ({ source_id: s.id, role: 'confirme', proves: 'Déclaration de maintien.', quote: s.text.slice(0, 60) })), contradictions: [], missing: [] },
            { id: 'C2', status: 'contredit', rationale: 'Test : citation inventée.', evidence: [{ source_id: first.id, role: 'contredit', proves: 'Prétend contredire.', quote: 'Cette phrase est totalement inventée par le modèle' }], contradictions: [], missing: [] },
            { id: 'C3', status: 'etaye', rationale: 'Test : source inexistante.', evidence: [{ source_id: 'S99', role: 'confirme', proves: 'Rien.', quote: 'bla' }], contradictions: [], missing: ['Date de signature'] },
            { id: 'C4', status: 'etaye', rationale: '', evidence: [], contradictions: [], missing: [] },
          ],
        };
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ id: 'msg_test', type: 'message', role: 'assistant', model: body.model, content: [{ type: 'text', text: JSON.stringify(out) }], stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 10, output_tokens: 10 } }));
    });
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r({ srv, calls, base: `http://127.0.0.1:${srv.address().port}` })));
}

// Faux Brave : renvoie pages A, B, C quel que soit la requête (ou rien).
export function startMockBrave(webBase, opts = {}) {
  const queries = [];
  const srv = http.createServer((req, res) => {
    const q = new URL(req.url, 'http://x').searchParams.get('q');
    queries.push(q);
    res.writeHead(200, { 'content-type': 'application/json' });
    if (opts.empty) return res.end(JSON.stringify({ web: { results: [] } }));
    res.end(JSON.stringify({ web: { results: [
      { title: 'Communiqué', url: `${webBase}/a`, description: 'desc a' },
      { title: 'Reprise', url: `${webBase}/b`, description: 'desc b' },
      { title: 'Vérif', url: `${webBase}/c`, description: 'desc c' },
      { title: 'Inaccessible', url: `${webBase}/missing`, description: 'Extrait de moteur seulement, page absente.' },
    ] } }));
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r({ srv, queries, base: `http://127.0.0.1:${srv.address().port}` })));
}

export const close = (s) => new Promise((r) => { s.closeAllConnections?.(); s.close(r); });
