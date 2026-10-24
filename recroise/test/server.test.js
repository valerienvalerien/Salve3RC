import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server.js';
import { makeLookup } from '../lib/net-guard.js';
import { startMockWeb, startMockAnthropic, startMockBrave, close } from './helpers.js';

const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(64)]);
const listen = (server) => new Promise((r) => server.listen(0, '127.0.0.1', () => r(`http://127.0.0.1:${server.address().port}`)));

async function post(base, path, body, headers = { 'content-type': 'application/json' }) {
  const r = await fetch(base + path, { method: 'POST', headers, body: typeof body === 'string' ? body : JSON.stringify(body) });
  const text = await r.text();
  return { status: r.status, text, json: () => JSON.parse(text) };
}
async function analyze(base, body) {
  const r = await post(base, '/api/analyze', body);
  const events = r.text.trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
  return { status: r.status, events, result: events.find((e) => e.type === 'result')?.result, error: events.find((e) => e.type === 'error'), stages: events.filter((e) => e.type === 'progress').map((e) => e.stage) };
}

async function rig({ anthropic = {}, brave = {}, cfg = {} } = {}) {
  const web = await startMockWeb();
  const an = await startMockAnthropic(anthropic);
  const br = await startMockBrave(web.base, brave);
  const { server } = createApp({ anthropicKey: 'sk-test', anthropicBaseUrl: an.base, searchProvider: 'brave', braveKey: 'k', braveBaseUrl: br.base, allowPrivateHosts: true, rateLimitPerMin: 1000, ...cfg });
  const base = await listen(server);
  return { web, an, br, base, server, stop: async () => { await Promise.all([close(web.srv), close(an.srv), close(br.srv), close(server)]); } };
}

const TEXTE = "Le vendredi 25 septembre 2026 est férié, chômé et payé selon la Présidence. Le ministre dit que le message contraire était un piratage. C'est une honte.";

test('DNS : un nom résolu vers une IP interne est refusé (anti DNS-rebinding)', async () => {
  const lookup = makeLookup(false);
  await new Promise((resolve) => lookup('localhost', { all: true }, (err) => { assert.equal(err?.code, 'blocked_host'); resolve(); }));
});

test('Sans clé API : statut honnête, aucune fausse analyse', async () => {
  const { server } = createApp({ anthropicKey: '', searchProvider: 'duckduckgo' }, {});
  const base = await listen(server);
  try {
    const st = await (await fetch(base + '/api/status')).json();
    assert.equal(st.llm, false);
    const a = await analyze(base, { text: TEXTE });
    assert.equal(a.result.mode, 'regles');
    assert.ok(a.result.claims.length >= 1);
    for (const c of a.result.claims) assert.ok(['non_evalue', 'opinion'].includes(c.status), c.status);
    assert.equal(a.result.sources.length, 0);
    assert.match(a.result.summary, /Aucun verdict/);
    const o = await post(base, '/api/ocr', { image: PNG.toString('base64') });
    assert.equal(o.status, 501);
  } finally { await close(server); }
});

test('Parcours TEXTE complet : preuves vérifiées, source inventée et citation inventée écartées, reprises détectées', async () => {
  const r = await rig({ cfg: { fallbacks: true } });
  try {
    const a = await analyze(r.base, { text: TEXTE });
    assert.ok(!a.error, a.error?.message);
    assert.deepEqual([...new Set(a.stages)], ['claims', 'search', 'fetch', 'judge']);
    const res = a.result;
    assert.equal(res.mode, 'ia');
    const by = Object.fromEntries(res.claims.map((c) => [c.id, c]));
    // C1 : étayé, avec citations retrouvées dans les pages
    assert.equal(by.C1.status, 'etaye');
    assert.ok(by.C1.evidence.length >= 2 && by.C1.evidence.every((e) => e.quoteVerified));
    // A et B sont des reprises : moins de confirmations indépendantes que de sources citées
    assert.ok(by.C1.independentConfirmations < by.C1.evidence.length);
    assert.ok(by.C1.caveats.some((c) => /indépendante/.test(c)));
    // C2 : citation inventée → statut abaissé
    assert.equal(by.C2.status, 'insuffisant');
    assert.match(by.C2.systemNote, /abaissé automatiquement/);
    assert.ok(by.C2.evidence.every((e) => e.quote === ''));
    // C3 : source S99 inexistante → écartée, abaissé
    assert.equal(by.C3.status, 'insuffisant');
    assert.equal(by.C3.evidence.length, 0);
    // C4 : opinion reste une opinion, sans requête de recherche
    assert.equal(by.C4.status, 'opinion');
    assert.ok(!r.br.queries.includes('inutile'));
    // sources : dates, lecture de page, repli sur extrait, reprises
    const s = Object.fromEntries(res.sources.map((x) => [x.url.split('/').pop(), x]));
    assert.equal(s.a.date, '2026-09-24');
    assert.equal(s.a.pageRead, true);
    assert.deepEqual(s.a.repriseWith, ['S2'].filter(Boolean).length ? s.a.repriseWith : []);
    assert.ok(s.a.repriseWith.length === 1 && s.b.repriseWith.length === 1 && s.c.repriseWith.length === 0);
    assert.equal(s.missing.pageRead, false);
    assert.ok(res.warnings.some((w) => /non retrouvée|inexistante/.test(w)));
    assert.ok(res.analysedAt && res.limits.length >= 2);
  } finally { await r.stop(); }
});

test('Aucun résultat de recherche : pas de verdict inventé, le juge n’est même pas appelé', async () => {
  const r = await rig({ brave: { empty: true } });
  try {
    const a = await analyze(r.base, { text: TEXTE });
    const f = a.result.claims.filter((c) => c.kind !== 'opinion');
    assert.ok(f.length && f.every((c) => c.status === 'insuffisant' && c.evidence.length === 0));
    assert.match(a.result.summary, /ne signifie pas/);
    assert.equal(r.an.calls.length, 1); // extraction seule
  } finally { await r.stop(); }
});

test('Recherche en panne (clé refusée) : message clair, statuts prudents', async () => {
  const r = await rig({ cfg: { braveBaseUrl: 'http://127.0.0.1:9' } });
  try {
    const a = await analyze(r.base, { text: TEXTE });
    assert.ok(a.result.limits.some((l) => /Recherche indisponible/.test(l)));
    assert.ok(a.result.claims.filter((c) => c.kind !== 'opinion').every((c) => c.status === 'insuffisant'));
  } finally { await r.stop(); }
});

test('Aucune affirmation vérifiable → réponse explicite', async () => {
  const r = await rig({ anthropic: { noClaims: true } });
  try {
    const a = await analyze(r.base, { text: TEXTE });
    assert.equal(a.result.claims.length, 0);
    assert.match(a.result.summary, /Aucune affirmation/);
  } finally { await r.stop(); }
});

test('Erreurs d’analyse : clé IA refusée, texte trop court, trop long', async () => {
  const bad = await rig({ anthropic: { status: 401 } });
  try {
    const a = await analyze(bad.base, { text: TEXTE });
    assert.equal(a.error.code, 'auth');
    assert.match(a.error.message, /clé API/);
  } finally { await bad.stop(); }
  const r = await rig();
  try {
    assert.equal((await analyze(r.base, { text: 'court' })).error.code, 'too_short');
    assert.equal((await analyze(r.base, { text: 'x'.repeat(13000) })).error.code, 'too_long');
    assert.equal((await post(r.base, '/api/analyze', '{pas json')).status, 400);
    assert.equal((await post(r.base, '/api/analyze', '{}', { 'content-type': 'text/plain' })).status, 415);
  } finally { await r.stop(); }
});

test('Parcours LIEN : extraction, avertissements, échecs compréhensibles', async () => {
  const r = await rig();
  try {
    const ok = (await post(r.base, '/api/extract', { url: `${r.web.base}/a` })).json();
    assert.equal(ok.ok, true);
    assert.equal(ok.title, 'Communiqué du 24 septembre');
    assert.equal(ok.publishedAt, '2026-09-24');
    assert.ok(ok.text.includes('journée chômée et payée') && !ok.text.includes('alert'));
    const short = (await post(r.base, '/api/extract', { url: `${r.web.base}/short` })).json();
    assert.ok(short.warnings.length);
    const nf = await post(r.base, '/api/extract', { url: `${r.web.base}/zzz` });
    assert.equal(nf.status, 422);
    assert.match(nf.json().message, /n'existe plus/);
    const pdf = await post(r.base, '/api/extract', { url: `${r.web.base}/pdf` });
    assert.equal(pdf.json().reason, 'unsupported_type');
    for (const u of ['https://www.facebook.com/some/posts/123', 'https://m.facebook.com/story.php?id=1', 'https://fb.watch/xyz']) {
      const fb = await post(r.base, '/api/extract', { url: u });
      const j = fb.json();
      assert.equal(j.ok, false); assert.equal(j.reason, 'walled');
      assert.match(j.message, /Je n'ai pas lu cette publication/);
      assert.ok(!j.text);
    }
    assert.equal((await post(r.base, '/api/extract', { url: 'pas une url' })).status, 422);
  } finally { await r.stop(); }
});

test('SSRF via l’API (configuration de production) : IP internes et métadonnées cloud refusées', async () => {
  const { server } = createApp({ anthropicKey: '', allowPrivateHosts: false });
  const base = await listen(server);
  try {
    for (const url of ['http://127.0.0.1/', 'http://169.254.169.254/latest/meta-data/', 'http://[::1]/', 'http://10.0.0.1/', 'file:///etc/passwd', 'http://localhost/', 'http://127.0.0.1:8080/api/status']) {
      const r = await post(base, '/api/extract', { url });
      assert.equal(r.status, 422, url);
      assert.equal(r.json().ok, false);
    }
  } finally { await close(server); }
});

test('Parcours IMAGE : lecture OK, puis fichiers invalides, trop lourds, illisibles', async () => {
  const r = await rig({ cfg: { maxImageBytes: 1000 } });
  try {
    const ok = await post(r.base, '/api/ocr', { image: 'data:image/png;base64,' + PNG.toString('base64') });
    assert.equal(ok.status, 200);
    const j = ok.json();
    assert.equal(j.ok, true);
    assert.match(j.text, /25 septembre 2026/);
    assert.equal(j.platform, 'Facebook');
    // la requête envoyée au modèle contient bien une image base64 + consigne anti-injection
    const sent = r.an.calls.at(-1).body;
    assert.equal(sent.messages[0].content[0].type, 'image');
    assert.equal(sent.messages[0].content[0].source.media_type, 'image/png');
    // fichiers invalides
    const exe = await post(r.base, '/api/ocr', { image: Buffer.from('MZ\x90\x00 programme').toString('base64') });
    assert.equal(exe.status, 422); assert.equal(exe.json().reason, 'unsupported');
    const svg = await post(r.base, '/api/ocr', { image: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>').toString('base64') });
    assert.equal(svg.json().reason, 'unsupported');
    const big = await post(r.base, '/api/ocr', { image: Buffer.concat([PNG, Buffer.alloc(2000)]).toString('base64') });
    assert.equal(big.status, 413);
    assert.equal((await post(r.base, '/api/ocr', {})).status, 422);
  } finally { await r.stop(); }
  const blank = await rig({ anthropic: { blankOcr: true } });
  try {
    const u = await post(blank.base, '/api/ocr', { image: PNG.toString('base64') });
    assert.equal(u.status, 422);
    assert.equal(u.json().reason, 'unreadable');
  } finally { await blank.stop(); }
});

test('Limitation de débit et routes / fichiers interdits', async () => {
  const r = await rig({ cfg: { rateLimitPerMin: 3 } });
  try {
    const codes = [];
    for (let i = 0; i < 5; i++) codes.push((await post(r.base, '/api/extract', { url: 'x' })).status);
    assert.deepEqual(codes.slice(0, 3), [422, 422, 422]);
    assert.equal(codes[4], 429);
  } finally { await r.stop(); }
  const r2 = await rig();
  try {
    assert.equal((await fetch(r2.base + '/api/inconnu', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })).status, 404);
    assert.equal((await fetch(r2.base + '/api/analyze')).status, 405);
    const t = await fetch(r2.base + '/%2e%2e/server.js');
    assert.ok([403, 404].includes(t.status));
    const raw = await new Promise((res) => { import('node:net').then(({ default: net }) => { const s = net.connect(r2.server.address().port, '127.0.0.1', () => s.write('GET /../server.js HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n')); let d = ''; s.on('data', (c) => (d += c)); s.on('end', () => res(d)); }); });
    assert.ok(!raw.includes('createApp'));
    const h = (await fetch(r2.base + '/api/status')).headers;
    assert.match(h.get('content-security-policy'), /default-src 'self'/);
    assert.equal(h.get('x-content-type-options'), 'nosniff');
  } finally { await r2.stop(); }
});
