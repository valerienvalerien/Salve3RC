import { EXAMPLES } from './examples.js';
import { renderStatic } from './pages.js';

const $ = (s, r = document) => r.querySelector(s);
const main = $('#main');
const KEY = 'recroise_v2_dossiers';
const STATUS = {
  etaye: ['Étayé', '✔'], contredit: ['Contredit', '✖'], hors_contexte: ['Hors contexte ou trompeur', '⚠'],
  insuffisant: ['Preuves insuffisantes', '?'], opinion: ['Opinion : non soumise à un verdict factuel', '“'], non_evalue: ['Non évalué (pas d’analyse automatique)', '–'],
};
const KIND = { fait: 'Fait', opinion: 'Opinion', accusation: 'Accusation (≠ condamnation)', prevision: 'Prévision' };
const ROLE = { confirme: 'Confirme', contredit: 'Contredit', contexte: 'Apporte du contexte', declaration: 'Prouve qu’une déclaration a été faite' };
const SRC_KIND = { primaire: 'Source primaire', verification: 'Vérification existante', presse: 'Presse', autre: 'Autre' };
const THEMES = ['Présidence et gouvernement', 'Justice', 'Ravatomanga', 'Lois, décrets et annonces', 'Russie', 'Chine', 'France', 'Autre'];

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const href = (u) => { try { const x = new URL(u); return ['http:', 'https:'].includes(x.protocol) ? esc(x.toString()) : '#'; } catch { return '#'; } };
const fmt = (iso) => { if (!iso) return 'date inconnue'; const d = new Date(iso); return Number.isNaN(+d) ? esc(iso) : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); };
const fmtT = (iso) => (iso ? new Date(iso).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' }) : '');
const badge = (s) => { const [l, i] = STATUS[s] || STATUS.non_evalue; return `<span class="badge st-${esc(s)}"><span aria-hidden="true">${i}</span>${esc(l)}</span>`; };

/* ------------------------------ Stockage ------------------------------ */
let memory = []; // repli si localStorage est indisponible
function loadAll() {
  try { const r = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(r) ? r.map(normalizeDossier).filter(Boolean) : []; } catch { return memory; }
}
function saveAll(list) { memory = list; try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { toast('Stockage du navigateur indisponible : exportez vos dossiers en JSON.'); } }
let exCache = null;
const examples = () => (exCache ||= EXAMPLES.map((ex) => ({ ...normalizeDossier(ex), readonly: true, example: true })));
const allWithExamples = () => [...loadAll(), ...examples()];
const getDossier = (id) => allWithExamples().find((d) => d.id === id);
function upsert(d) { const l = loadAll().filter((x) => x.id !== d.id); d.updatedAt = new Date().toISOString(); saveAll([d, ...l]); }
const addLog = (d, msg) => { d.log = [{ at: new Date().toISOString(), msg }, ...(d.log || [])].slice(0, 200); };

function normalizeDossier(r) {
  if (!r || typeof r !== 'object' || typeof r.id !== 'string' || !r.analysis || typeof r.analysis !== 'object') return null;
  const a = r.analysis; const str = (v, n = 4000) => String(v ?? '').slice(0, n); const arr = (v) => (Array.isArray(v) ? v.map((x) => str(x, 600)).slice(0, 20) : []);
  const claims = (Array.isArray(a.claims) ? a.claims : []).slice(0, 30).map((c, i) => ({
    id: str(c.id || `C${i + 1}`, 20), text: str(c.text, 1200), kind: KIND[c.kind] ? c.kind : 'fait',
    status: STATUS[c.status] ? c.status : 'non_evalue', rationale: str(c.rationale), systemNote: c.systemNote ? str(c.systemNote) : null,
    entities: { people: arr(c.entities?.people), institutions: arr(c.entities?.institutions), countries: arr(c.entities?.countries), dates: arr(c.entities?.dates) },
    evidence: (Array.isArray(c.evidence) ? c.evidence : []).slice(0, 20).map((e) => ({ sourceId: str(e.sourceId, 20), role: ROLE[e.role] ? e.role : 'contexte', proves: str(e.proves), quote: str(e.quote), quoteVerified: !!e.quoteVerified, snippetOnly: !!e.snippetOnly })),
    sourceIds: arr(c.sourceIds), contradictions: arr(c.contradictions), missing: arr(c.missing), caveats: arr(c.caveats), searchLeads: arr(c.searchLeads),
    independentConfirmations: Number(c.independentConfirmations) || 0,
    human: c.human && typeof c.human === 'object' ? { status: STATUS[c.human.status] ? c.human.status : '', note: str(c.human.note, 1500) } : { status: '', note: '' },
  }));
  return {
    id: str(r.id, 60), title: str(r.title, 300) || 'Sans titre', readonly: false, createdAt: str(r.createdAt, 40), updatedAt: str(r.updatedAt, 40),
    input: { kind: str(r.input?.kind, 20), url: str(r.input?.url, 500), text: str(r.input?.text, 13000), capturedAt: str(r.input?.capturedAt, 40) },
    analysis: {
      mode: ['ia', 'regles', 'documentaire'].includes(a.mode) ? a.mode : 'regles', model: a.model ? str(a.model, 80) : null, analysedAt: str(a.analysedAt, 40),
      themes: arr(a.themes).filter((t) => THEMES.includes(t)), summary: str(a.summary), limits: arr(a.limits), warnings: arr(a.warnings), claims,
      sources: (Array.isArray(a.sources) ? a.sources : []).slice(0, 30).map((s) => ({ id: str(s.id, 20), url: str(s.url, 800), title: str(s.title, 300), publisher: str(s.publisher, 120), date: s.date ? str(s.date, 40) : null, fetchedAt: str(s.fetchedAt, 40), kind: SRC_KIND[s.kind] ? s.kind : 'autre', pageRead: !!s.pageRead, repriseWith: arr(s.repriseWith) })),
    },
    humanReview: { done: !!r.humanReview?.done, by: str(r.humanReview?.by, 80), at: str(r.humanReview?.at, 40) },
    log: (Array.isArray(r.log) ? r.log : []).slice(0, 200).map((l) => ({ at: str(l.at, 40), msg: str(l.msg, 300) })),
  };
}

/* ------------------------------ Toasts ------------------------------ */
function toast(msg) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); t.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#202D29;color:#fff;padding:.7rem 1rem;border-radius:8px;z-index:20;max-width:90vw;font-size:.95rem'; document.body.append(t); }
  t.textContent = msg; t.hidden = false; clearTimeout(toast.h); toast.h = setTimeout(() => (t.hidden = true), 5000);
}

/* ------------------------------ API ------------------------------ */
let caps = { llm: false, search: null, serverOcr: false, maxImageBytes: 5 * 1024 * 1024, maxTextChars: 12000 };
async function loadCaps() { try { caps = await (await fetch('/api/status')).json(); } catch { caps = { ...caps, offline: true }; } }
async function postJson(url, body) {
  let r;
  try { r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); }
  catch { throw new Error('Le serveur est injoignable. Vérifiez votre connexion.'); }
  let j = null; try { j = await r.json(); } catch { /* ignore */ }
  if (!r.ok || (j && j.ok === false)) { const e = new Error(j?.message || `Erreur ${r.status}.`); e.reason = j?.reason; throw e; }
  return j;
}

/* ------------------------------ Flux de vérification ------------------------------ */
const flow = { step: 'input', tab: 'lien', url: '', text: '', image: null, ocrMode: 'server', error: null, notice: null, extracted: null, progress: 0, progMsg: '', ocrPct: 0 };
const resetFlow = () => Object.assign(flow, { step: 'input', error: null, notice: null, extracted: null, progress: 0, progMsg: '' });

function renderHome() {
  const f = flow;
  const aiBanner = caps.offline
    ? `<div class="banner err" role="alert"><b>Serveur injoignable</b>L’application ne peut pas extraire ni analyser pour l’instant. Les dossiers déjà enregistrés restent consultables.</div>`
    : !caps.llm
      ? `<div class="banner" role="status"><b>Analyse IA non configurée sur ce serveur</b>RECROISE repère les affirmations par des règles simples et propose des pistes de recherche, mais <u>ne rend aucun verdict</u>. La lecture de captures se fait dans votre navigateur (plus lente, moins précise).</div>`
      : '';
  let body;
  if (f.step === 'input') body = inputCard(); else if (f.step === 'review') body = reviewCard(); else body = progressCard();
  main.innerHTML = `
    <section class="hero"><h1>Avant de partager,<br><em>remontez aux preuves.</em></h1>
    <p class="lead">Collez un lien, importez une capture ou collez un texte : RECROISE repère les affirmations, cherche des sources, et montre ce que chaque preuve établit — avec les dates et les limites.</p></section>
    ${aiBanner}${f.error ? `<div class="banner err" role="alert"><b>${esc(f.error.title)}</b>${esc(f.error.message)}</div>` : ''}${f.notice ? `<div class="banner" role="status">${esc(f.notice)}</div>` : ''}
    ${body}
    <section class="stack" style="margin-top:34px"><h2>Comment ça marche</h2>
    <ol class="steps"><li><b>1</b><br><strong>Extraire</strong><br><span class="meta">Lecture du lien ou de la capture. Vous corrigez le texte avant analyse.</span></li>
    <li><b>2</b><br><strong>Décomposer</strong><br><span class="meta">Une publication = plusieurs affirmations, avec faits, opinions et accusations séparés.</span></li>
    <li><b>3</b><br><strong>Chercher</strong><br><span class="meta">Vérifications existantes, sources primaires, reprises d’une même source.</span></li>
    <li><b>4</b><br><strong>Justifier</strong><br><span class="meta">Statut par affirmation, sources datées, contradictions et manques. Relecture humaine à part.</span></li></ol>
    <p>Voir deux <a href="#/dossiers">exemples documentaires</a> (25 septembre 2026 ; déplacement à Moscou, octobre 2025) ou la <a href="#/methode">méthode</a>.</p></section>`;
}

function inputCard() {
  const f = flow; const t = f.tab;
  const tab = (id, label) => `<button role="tab" id="tab-${id}" aria-selected="${t === id}" aria-controls="panel" data-tab="${id}">${label}</button>`;
  const ocrChoice = f.image && caps.serverOcr
    ? `<fieldset class="radios" style="border:0;padding:0;margin:14px 0 0"><legend class="f">Comment lire la capture ?</legend>
      <label><input type="radio" name="ocr" value="server" ${f.ocrMode === 'server' ? 'checked' : ''}><span><b>Lecture par le serveur (recommandé)</b><br><span class="meta">L’image est envoyée au service d’IA pour être lue, puis oubliée : RECROISE ne l’enregistre pas.</span></span></label>
      <label><input type="radio" name="ocr" value="local" ${f.ocrMode === 'local' ? 'checked' : ''}><span><b>Lecture dans mon navigateur</b><br><span class="meta">L’image ne quitte pas votre appareil. Plus lent, moins fiable sur les captures complexes.</span></span></label></fieldset>` : '';
  let panel;
  if (t === 'lien') panel = `<label class="f" for="in-url">Adresse (URL) de l’article ou de la publication</label><input id="in-url" type="url" inputmode="url" placeholder="https://…" value="${esc(f.url)}" autocomplete="off"><p class="hint">Les articles de presse sont lus automatiquement. Facebook, Instagram, X et TikTok bloquent la lecture : dans ce cas, importez une capture ou collez le texte.</p>`;
  else if (t === 'image') panel = `<div class="drop" id="drop" tabindex="0" role="button" aria-label="Choisir une capture ou une photo">${f.image ? `<img src="${esc(f.image.preview)}" alt="Aperçu de la capture importée"><span class="meta">${esc(f.image.name)} — ${(f.image.size / 1024).toFixed(0)} Ko · <u>changer</u></span>` : `<strong>Déposez une capture ou une photo ici</strong><span>ou touchez pour choisir un fichier — ou collez avec Ctrl+V</span><span class="meta">JPEG, PNG, WebP, GIF · ${Math.round(caps.maxImageBytes / 1048576)} Mo maximum</span>`}</div><input id="file" class="sr" type="file" accept="image/jpeg,image/png,image/webp,image/gif" tabindex="-1" aria-label="Fichier image">${ocrChoice}
    <p class="hint">Conservation : l’image n’est jamais écrite sur le serveur. Le texte extrait que vous validez est gardé uniquement dans votre navigateur (dossier local).</p>`;
  else panel = `<label class="f" for="in-text">Texte de la publication à vérifier</label><textarea id="in-text" placeholder="Collez ici le texte de la publication…" maxlength="${caps.maxTextChars}">${esc(f.text)}</textarea><p class="hint">Ajoutez, si vous l’avez, le lien d’origine dans l’onglet « Lien » pour garder la trace de la source.</p>`;
  return `<form class="card big" id="start" novalidate><h2 style="margin-bottom:.6rem">Que voulez-vous vérifier ?</h2>
    <div class="tabs" role="tablist" aria-label="Type de contenu">${tab('lien', '🔗 <span class="lg">Coller un </span>lien')}${tab('image', '🖼 <span class="lg">Importer une </span>capture')}${tab('texte', '✍ <span class="lg">Coller un </span>texte')}</div>
    <div id="panel" role="tabpanel" aria-labelledby="tab-${t}">${panel}</div>
    <div class="row" style="margin-top:18px"><button class="btn" type="submit">Vérifier cette information</button></div></form>`;
}

function reviewCard() {
  const x = flow.extracted;
  return `<form class="card big stack" id="review"><h2>Texte extrait — vérifiez-le avant l’analyse</h2>
    <p class="meta">${esc(x.origin)}${x.title ? ` · « ${esc(x.title)} »` : ''}${x.date ? ` · publié le ${esc(fmt(x.date))}` : ''}</p>
    ${(x.warnings || []).map((w) => `<div class="banner">${esc(w)}</div>`).join('')}
    <label class="f" for="ex-text">Corrigez les erreurs de lecture (noms, chiffres, dates) :</label>
    <textarea id="ex-text" maxlength="${caps.maxTextChars}" style="min-height:240px">${esc(x.text)}</textarea>
    <div class="row"><button class="btn" type="submit">Lancer l’analyse</button><button class="btn ghost" type="button" data-act="back">Retour</button></div></form>`;
}

function progressCard() {
  const labels = ['Extraction du contenu', 'Identification des affirmations', 'Recherche et lecture des sources', 'Comparaison des preuves'];
  return `<div class="card big" aria-live="polite"><h2>Analyse en cours</h2><ol class="progress">${labels.map((l, i) => {
    const s = i < flow.progress ? 'done' : i === flow.progress ? 'active' : 'todo';
    return `<li data-s="${s}">${s === 'done' ? '✔' : s === 'active' ? '<span class="spin" aria-hidden="true"></span>' : '○'} ${l}${s === 'active' && flow.progMsg ? ` — <span class="meta">${esc(flow.progMsg)}</span>` : ''}</li>`;
  }).join('')}</ol><p class="hint">Cela peut prendre une à deux minutes. Ne fermez pas la page.</p></div>`;
}

const fail = (title, message) => { flow.step = 'input'; flow.error = { title, message }; renderHome(); };

async function startVerification() {
  const f = flow; f.error = null; f.notice = null;
  if (f.tab === 'texte') {
    f.text = $('#in-text')?.value ?? f.text;
    if (f.text.trim().length < 20) return fail('Texte trop court', 'Collez au moins une phrase complète (20 caractères minimum).');
    return runAnalysis(f.text, null, 'texte');
  }
  if (f.tab === 'lien') {
    f.url = ($('#in-url')?.value ?? f.url).trim();
    if (!f.url) return fail('Lien manquant', 'Collez l’adresse de l’article à vérifier.');
    if (!/^https?:\/\//i.test(f.url)) f.url = 'https://' + f.url;
    f.step = 'extracting'; f.progress = 0; f.progMsg = 'Lecture de la page…'; renderHome();
    try {
      const r = await postJson('/api/extract', { url: f.url });
      f.step = 'review';
      f.extracted = { text: r.text, title: r.title, date: r.publishedAt, origin: `Lien lu le ${fmtT(r.fetchedAt)} : ${r.siteName || ''}`, url: r.url || f.url, kind: 'lien', warnings: [...(r.warnings || []), ...(r.truncated ? ['Le texte a été tronqué à la longueur maximale.'] : [])] };
      renderHome();
    } catch (e) {
      f.step = 'input';
      if (e.reason === 'walled') { f.tab = 'image'; f.error = { title: 'Publication non lue', message: e.message }; return renderHome(); }
      fail('Lien inaccessible', e.message);
    }
    return;
  }
  // image
  if (!f.image) return fail('Aucune image', 'Choisissez ou déposez une capture à vérifier.');
  f.step = 'extracting'; f.progress = 0; f.progMsg = 'Lecture de la capture…'; renderHome();
  try {
    let out;
    if (f.ocrMode === 'server' && caps.serverOcr) {
      out = await postJson('/api/ocr', { image: f.image.dataUrl });
      if (!out.legible) out.notes = (out.notes ? out.notes + ' ' : '') + 'Le modèle signale une lecture partielle : relisez attentivement.';
    } else out = await localOcr(f.image.file);
    const meta = [out.platform && `Plateforme : ${out.platform}`, out.author && `Auteur/page : ${out.author}`, out.dateShown && `Date affichée : ${out.dateShown}`].filter(Boolean).join(' · ');
    f.step = 'review';
    f.extracted = { text: out.text, title: '', date: null, origin: `Capture « ${f.image.name} »${meta ? ' — ' + meta : ''}`, kind: 'image', url: '', warnings: [out.notes, f.ocrMode === 'local' || !caps.serverOcr ? 'Lecture automatique dans le navigateur : vérifiez chaque mot, les erreurs sont fréquentes.' : null].filter(Boolean) };
    renderHome();
  } catch (e) { fail('Capture illisible', e.message); }
}

function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Le module de lecture locale n’a pas pu être chargé (réseau).')); document.head.append(s); }); }
async function localOcr(file) {
  if (!window.Tesseract) {
    let local = false; try { local = (await fetch('/vendor/tesseract/tesseract.min.js', { method: 'HEAD' })).ok; } catch { /* ignore */ }
    await loadScript(local ? '/vendor/tesseract/tesseract.min.js' : 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js');
  }
  const r = await window.Tesseract.recognize(file, 'fra', { logger: (m) => { if (m.progress != null) { flow.progMsg = `${m.status} ${Math.round(m.progress * 100)} %`; if (flow.step === 'extracting') renderHome(); } } });
  const text = (r.data.text || '').trim();
  if (text.length < 10) throw new Error('Aucun texte lisible dans cette image. Essayez une capture plus nette ou collez le texte.');
  return { text, legible: (r.data.confidence || 0) > 60, platform: '', author: '', dateShown: '', notes: `Confiance de lecture : ${Math.round(r.data.confidence || 0)} %.` };
}

async function runAnalysis(text, extracted, kind) {
  const f = flow; f.step = 'analysing'; f.progress = 1; f.progMsg = ''; renderHome();
  let result = null; let err = null;
  try {
    const r = await fetch('/api/analyze', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, sourceUrl: extracted?.url || null }) });
    if (!r.ok && !(r.headers.get('content-type') || '').includes('ndjson')) { const j = await r.json().catch(() => ({})); throw new Error(j.message || `Erreur ${r.status}.`); }
    const reader = r.body.getReader(); const dec = new TextDecoder(); let buf = '';
    for (;;) {
      const { value, done } = await reader.read(); if (done) break;
      buf += dec.decode(value, { stream: true }); let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1); if (!line) continue;
        const ev = JSON.parse(line);
        if (ev.type === 'progress') { f.progress = { claims: 1, search: 2, fetch: 2, judge: 3 }[ev.stage] ?? f.progress; f.progMsg = ev.message; renderHome(); }
        else if (ev.type === 'result') result = ev.result; else if (ev.type === 'error') err = ev;
      }
    }
  } catch (e) { err = { message: e.message || 'Connexion interrompue pendant l’analyse.' }; }
  if (err || !result) { f.step = extracted ? 'review' : 'input'; f.error = { title: 'Analyse impossible', message: err?.message || 'Réponse incomplète du serveur.' }; return renderHome(); }
  const now = new Date().toISOString();
  const d = normalizeDossier({
    id: 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), title: (extracted?.title || result.claims[0]?.text || text).slice(0, 120),
    createdAt: now, updatedAt: now, input: { kind, url: extracted?.url || '', text, capturedAt: now }, analysis: result, humanReview: { done: false }, log: [{ at: now, msg: result.mode === 'ia' ? 'Analyse automatique créée (non relue).' : 'Repérage par règles créé (aucun verdict).' }],
  });
  upsert(d); resetFlow(); f.url = ''; f.text = ''; f.image = null; location.hash = '#/dossier/' + d.id;
}

/* ------------------------------ Dossier ------------------------------ */
let simple = false;
function renderDossier(id) {
  const d = getDossier(id);
  if (!d) { main.innerHTML = `<div class="banner err">Dossier introuvable. <a href="#/dossiers">Retour aux dossiers</a></div>`; return; }
  const a = d.analysis; const ro = d.readonly;
  const srcById = Object.fromEntries(a.sources.map((s) => [s.id, s]));
  const mode = { ia: ['Analyse automatique par IA', 'Les statuts sont proposés par un modèle, vérifiés par le serveur (citations retrouvées dans les pages), mais pas relus par un humain.'], regles: ['Repérage par règles — aucun verdict', 'Aucune analyse IA n’était disponible : les affirmations sont repérées par des règles simples.'], documentaire: ['Exemple documentaire — non produit par l’analyse automatique', 'Chronologie rapportée par des médias, attribuée à ces médias. RECROISE n’a pas mené l’enquête initiale.'] }[a.mode];
  const rev = d.humanReview.done ? `<div class="banner ok"><b>✔ Relue par un humain${d.humanReview.by ? ` : ${esc(d.humanReview.by)}` : ''}</b>le ${esc(fmtT(d.humanReview.at))}. Toute modification annule cette relecture.</div>` : `<div class="banner"><b>Non relue par un humain</b>${esc(mode[1])}</div>`;
  const claimHtml = a.claims.map((c, i) => {
    const eff = c.human.status || c.status;
    return `<article class="claim st-${esc(eff)}" id="claim-${i}"><div class="row">${badge(c.status)}${c.human.status ? `<span class="meta">→ relecture humaine :</span>${badge(c.human.status)}` : ''}<span class="meta">${esc(KIND[c.kind] || '')}</span></div>
    <h3>${esc(c.text)}</h3>
    ${c.rationale ? `<p>${esc(c.rationale)}</p>` : ''}
    ${c.systemNote ? `<div class="banner">${esc(c.systemNote)}</div>` : ''}
    <div class="detail">
    ${['people', 'institutions', 'countries', 'dates'].some((k) => c.entities[k].length) ? `<p class="meta">${Object.entries({ people: 'Personnes', institutions: 'Institutions', countries: 'Pays', dates: 'Dates' }).filter(([k]) => c.entities[k].length).map(([k, l]) => `${l} : ${c.entities[k].map((x) => `<span class="chip">${esc(x)}</span>`).join('')}`).join(' &nbsp; ')}</p>` : ''}
    ${c.caveats.map((x) => `<div class="banner">${esc(x)}</div>`).join('')}
    ${c.evidence.length ? `<h4 style="margin:.8rem 0 0">Ce que disent les sources</h4>${c.evidence.map((e) => { const s = srcById[e.sourceId]; return `<div class="ev"><strong>${esc(ROLE[e.role])}</strong> — ${s ? `<a href="${href(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a> <span class="meta">(${esc(s.publisher || '')}, ${esc(fmt(s.date))})</span>` : esc(e.sourceId)}<br>${esc(e.proves)}${e.quote ? `<blockquote>« ${esc(e.quote)} »<br>${e.snippetOnly ? '<span class="warn-q">Citation retrouvée dans l’extrait du moteur de recherche seulement (page non lue)</span>' : '<span class="ok-q">✔ Citation retrouvée dans la page</span>'}</blockquote>` : '<br><span class="warn-q">Aucune citation vérifiée.</span>'}</div>`; }).join('')}` : ''}
    ${c.sourceIds.length ? `<p class="meta">Rapporté par : ${c.sourceIds.map((sid) => srcById[sid] ? `<a href="${href(srcById[sid].url)}" target="_blank" rel="noopener noreferrer">${esc(srcById[sid].publisher || sid)}</a>` : esc(sid)).join(', ')}</p>` : ''}
    ${c.contradictions.length ? `<p><strong>Contradictions :</strong></p><ul>${c.contradictions.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    ${c.missing.length ? `<p><strong>Informations manquantes :</strong></p><ul>${c.missing.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    ${c.searchLeads.length ? `<p class="meta">Pistes de recherche : ${c.searchLeads.map((q) => `<a href="https://duckduckgo.com/?q=${encodeURIComponent(q)}" target="_blank" rel="noopener noreferrer">${esc(q)}</a>`).join(' · ')}</p>` : ''}
    </div>
    ${c.human.note ? `<p class="detail"><strong>Note de relecture :</strong> ${esc(c.human.note)}</p>` : ''}
    ${ro ? '' : `<details class="noprint detail"><summary>Relecture humaine de cette affirmation</summary><div class="stack"><label class="f" for="hs-${i}">Statut après relecture</label><select id="hs-${i}" data-human-status="${i}"><option value="">Garder le statut automatique</option>${Object.entries(STATUS).filter(([k]) => k !== 'non_evalue').map(([k, [l]]) => `<option value="${k}" ${c.human.status === k ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select><label class="f" for="hn-${i}">Note</label><textarea id="hn-${i}" data-human-note="${i}" style="min-height:80px">${esc(c.human.note)}</textarea></div></details>`}
    </article>`;
  }).join('');
  const sources = a.sources.length ? `<section class="detail"><h2>Sources consultées</h2><ul class="list">${a.sources.map((s) => `<li class="item"><div><h3><a href="${href(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a></h3><span class="meta">${esc(s.id)} · ${esc(SRC_KIND[s.kind])} · ${esc(s.publisher || '')} · publiée : ${esc(fmt(s.date))}${s.fetchedAt ? ` · consultée le ${esc(fmt(s.fetchedAt))}` : ''} · ${s.pageRead ? 'page lue' : 'page non lue'}</span>${s.repriseWith.length ? `<br><span class="warn-q">Texte très proche de ${s.repriseWith.map(esc).join(', ')} : ne comptent pas comme confirmations indépendantes.</span>` : ''}</div></li>`).join('')}</ul></section>` : '';
  main.innerHTML = `<div class="${simple ? 'simple' : ''}" id="dossier">
    <p class="noprint"><a href="#/dossiers">← Dossiers</a></p>
    ${ro ? '<span class="tag-ex">EXEMPLE DOCUMENTAIRE · LECTURE SEULE</span>' : ''}
    ${ro ? `<h1 style="margin-top:.4rem">${esc(d.title)}</h1>` : `<label class="sr" for="ttl">Titre du dossier</label><h1><input id="ttl" type="text" value="${esc(d.title)}" style="font:inherit;font-size:clamp(1.3rem,4vw,1.9rem);border:0;border-bottom:2px dashed var(--line);background:transparent;padding:0;width:100%;text-overflow:ellipsis"></h1>`}
    <p class="meta">${badgeMode(a.mode)} ${esc(mode[0])} · ${a.analysedAt ? `analysée le ${esc(fmtT(a.analysedAt))}` : ''}${a.model ? ` · modèle ${esc(a.model)}` : ''}${d.input.url ? ` · <a href="${href(d.input.url)}" target="_blank" rel="noopener noreferrer">lien d’origine</a>` : ''}</p>
    ${rev}
    <div class="row noprint"><button class="btn small ghost" data-act="simple" aria-pressed="${simple}">${simple ? 'Lecture détaillée' : 'Lecture simplifiée'}</button><button class="btn small ghost" data-act="print">Imprimer</button><button class="btn small ghost" data-act="export-one">Exporter (JSON)</button>${ro ? `<button class="btn small" data-act="dup">Dupliquer pour modifier</button>` : ''}</div>
    <section class="card" style="margin-top:14px"><h2>Résumé</h2><p>${esc(a.summary)}</p>${a.themes.length ? `<p>${a.themes.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</p>` : ''}</section>
    <section><h2 style="margin-top:24px">Affirmations (${a.claims.length})</h2>${claimHtml || '<p class="meta">Aucune affirmation vérifiable repérée.</p>'}</section>
    ${sources}
    ${a.warnings.length ? `<section class="detail"><h2>Alertes</h2>${a.warnings.map((w) => `<div class="banner">${esc(w)}</div>`).join('')}</section>` : ''}
    <section class="detail"><h2>Limites de cette analyse</h2><ul>${a.limits.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></section>
    ${d.input.text ? `<details class="detail"><summary>Texte analysé</summary><p style="white-space:pre-wrap">${esc(d.input.text)}</p></details>` : ''}
    ${ro ? '' : `<section class="card noprint" style="margin-top:18px"><h2>Relecture humaine</h2><p class="meta">Déclarez la relecture seulement après avoir ouvert les sources et vérifié les statuts.</p>
      <div class="stack"><label class="f" for="rv-by">Votre nom (facultatif)</label><input id="rv-by" type="text" value="${esc(d.humanReview.by)}"><label><input id="rv-ok" type="checkbox" ${d.humanReview.done ? 'checked' : ''}> J’ai relu les sources et je valide cette analyse.</label><div class="row"><button class="btn" data-act="review">Enregistrer la relecture</button><button class="btn danger small" data-act="delete">Supprimer ce dossier</button></div></div></section>
      <details class="noprint"><summary>Journal des modifications (${d.log.length})</summary><ul class="tl">${d.log.map((l) => `<li><span class="meta">${esc(fmtT(l.at))}</span> — ${esc(l.msg)}</li>`).join('')}</ul></details>`}
    </div>`;
  main.dataset.did = d.id;
}
const badgeMode = (m) => ({ ia: '🤖', regles: '📏', documentaire: '📄' }[m]);

/* ------------------------------ Dossiers ------------------------------ */
let q = ''; let theme = '';
function renderDossiers() {
  const list = allWithExamples().filter((d) => (!theme || d.analysis.themes.includes(theme)) && (!q || (d.title + ' ' + d.analysis.claims.map((c) => c.text).join(' ')).toLowerCase().includes(q.toLowerCase())));
  main.innerHTML = `<h1>Dossiers</h1><p class="lead">Vos vérifications sont enregistrées dans ce navigateur uniquement. Exportez-les pour les conserver ou les partager.</p>
  <div class="row noprint" style="margin:14px 0"><div style="flex:1;min-width:220px"><label class="sr" for="q">Rechercher</label><input id="q" type="text" placeholder="Rechercher un dossier…" value="${esc(q)}"></div>
  <label class="sr" for="th">Thème</label><select id="th" style="width:auto"><option value="">Tous les thèmes</option>${THEMES.map((t) => `<option ${t === theme ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>
  <button class="btn small ghost" data-act="export-all">Tout exporter</button><label class="btn small ghost" style="display:inline-flex;align-items:center">Importer (JSON)<input type="file" id="imp" accept="application/json,.json" class="sr"></label></div>
  <ul class="list">${list.map((d) => `<li class="item"><div><h3><a href="#/dossier/${esc(d.id)}">${esc(d.title)}</a></h3><span class="meta">${d.example ? '<span class="tag-ex">EXEMPLE</span> ' : ''}${d.analysis.claims.length} affirmation(s) · ${esc(fmt(d.updatedAt))} · ${d.humanReview.done ? '✔ relue' : 'non relue'} · ${({ ia: 'analyse IA', regles: 'repérage par règles', documentaire: 'documentaire' })[d.analysis.mode]}</span><br>${d.analysis.themes.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>${d.readonly ? '' : `<a class="btn small ghost" href="#/dossier/${esc(d.id)}">Ouvrir</a>`}</li>`).join('') || '<li class="meta">Aucun dossier ne correspond.</li>'}</ul>
  <p><a class="btn" href="#/">Vérifier une nouvelle information</a></p>`;
}

/* ------------------------------ Actions ------------------------------ */
function download(name, obj) { const b = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }
const cur = () => { const d = getDossier(main.dataset.did); return d && !d.readonly ? d : null; };
function touch(d, msg) { if (d.humanReview.done) { d.humanReview.done = false; addLog(d, 'Relecture annulée par une modification.'); } addLog(d, msg); upsert(d); }

main.addEventListener('click', async (e) => {
  const tab = e.target.closest('[data-tab]'); if (tab) { flow.url = $('#in-url')?.value ?? flow.url; flow.text = $('#in-text')?.value ?? flow.text; flow.tab = tab.dataset.tab; flow.error = null; return renderHome(); }
  if (e.target.closest('#drop')) return $('#file').click();
  const act = e.target.closest('[data-act]')?.dataset.act; if (!act) return;
  if (act === 'back') { flow.step = 'input'; return renderHome(); }
  if (act === 'simple') { simple = !simple; return renderDossier(main.dataset.did); }
  if (act === 'print') return window.print();
  if (act === 'export-all') return download('recroise-dossiers.json', { app: 'recroise', version: 2, exportedAt: new Date().toISOString(), dossiers: loadAll() });
  const d = getDossier(main.dataset.did);
  if (act === 'export-one' && d) return download(`recroise-${d.id}.json`, { app: 'recroise', version: 2, exportedAt: new Date().toISOString(), dossiers: [{ ...d, readonly: false, example: undefined }] });
  if (act === 'dup' && d) { const c = structuredClone(d); c.id = 'd' + Date.now().toString(36); c.title = 'Copie — ' + d.title; c.readonly = false; delete c.example; c.log = [{ at: new Date().toISOString(), msg: 'Copie créée depuis un exemple documentaire.' }]; c.humanReview = { done: false }; const n = normalizeDossier(c); upsert(n); location.hash = '#/dossier/' + n.id; return; }
  const own = cur(); if (!own) return;
  if (act === 'review') { own.humanReview = { done: $('#rv-ok').checked, by: $('#rv-by').value.slice(0, 80), at: new Date().toISOString() }; addLog(own, own.humanReview.done ? `Relecture humaine déclarée${own.humanReview.by ? ' par ' + own.humanReview.by : ''}.` : 'Relecture retirée.'); upsert(own); renderDossier(own.id); toast('Relecture enregistrée.'); }
  if (act === 'delete' && confirm('Supprimer définitivement ce dossier de ce navigateur ?')) { saveAll(loadAll().filter((x) => x.id !== own.id)); location.hash = '#/dossiers'; }
});
main.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id === 'start') startVerification();
  if (e.target.id === 'review') { const t = $('#ex-text').value; if (t.trim().length < 20) { flow.error = { title: 'Texte trop court', message: 'Il faut au moins une phrase complète pour analyser.' }; return renderHome(); } runAnalysis(t, flow.extracted, flow.extracted.kind); }
});
main.addEventListener('change', async (e) => {
  const t = e.target;
  if (t.id === 'file') return pickFile(t.files[0]);
  if (t.name === 'ocr') flow.ocrMode = t.value;
  if (t.id === 'th') { theme = t.value; renderDossiers(); }
  if (t.id === 'imp') return importFile(t.files[0]);
  if (t.dataset.humanStatus !== undefined || t.dataset.humanNote !== undefined) {
    const d = cur(); if (!d) return; const i = Number(t.dataset.humanStatus ?? t.dataset.humanNote); const c = d.analysis.claims[i];
    if (t.dataset.humanStatus !== undefined) c.human.status = t.value; else c.human.note = t.value;
    touch(d, `Relecture de l’affirmation ${c.id} modifiée.`); renderDossier(d.id); document.getElementById('claim-' + i)?.scrollIntoView({ block: 'center' });
  }
  if (t.id === 'ttl') { const d = cur(); if (d) { d.title = t.value.slice(0, 300) || 'Sans titre'; touch(d, 'Titre modifié.'); } }
});
main.addEventListener('input', (e) => { if (e.target.id === 'q') { q = e.target.value; const p = e.target.selectionStart; renderDossiers(); const el = $('#q'); el.focus(); el.setSelectionRange(p, p); } });
main.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.id === 'drop') { e.preventDefault(); $('#file').click(); } });
main.addEventListener('dragover', (e) => { if (e.target.closest('#drop')) { e.preventDefault(); $('#drop').classList.add('over'); } });
main.addEventListener('dragleave', () => $('#drop')?.classList.remove('over'));
main.addEventListener('drop', (e) => { if (e.target.closest('#drop')) { e.preventDefault(); pickFile(e.dataTransfer.files[0]); } });
document.addEventListener('paste', (e) => {
  if (!['home'].includes(currentRoute) || flow.step !== 'input') return;
  const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith('image/')); if (f) { flow.tab = 'image'; pickFile(f); }
});

async function pickFile(file) {
  if (!file) return;
  flow.error = null;
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) { flow.tab = 'image'; return fail('Format non pris en charge', 'Utilisez une image JPEG, PNG, WebP ou GIF (pas de PDF ni de vidéo).'); }
  try {
    let blob = file;
    if (file.size > caps.maxImageBytes || file.size > 3.5 * 1048576) blob = await shrink(file);
    if (blob.size > caps.maxImageBytes) return fail('Image trop lourde', `Maximum ${Math.round(caps.maxImageBytes / 1048576)} Mo, même après réduction.`);
    const dataUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(new Error('Lecture du fichier impossible.')); r.readAsDataURL(blob); });
    flow.image = { file: blob, name: file.name || 'capture collée', size: blob.size, dataUrl, preview: dataUrl }; flow.tab = 'image'; renderHome();
  } catch (e) { fail('Image illisible', e.message || 'Impossible de lire ce fichier.'); }
}
async function shrink(file) {
  const bmp = await createImageBitmap(file).catch(() => { throw new Error('Ce fichier n’est pas une image lisible.'); });
  const k = Math.min(1, 2200 / Math.max(bmp.width, bmp.height)); const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('Réduction de l’image impossible.'))), 'image/jpeg', 0.88));
}
async function importFile(file) {
  if (!file) return;
  try {
    if (file.size > 8 * 1048576) throw new Error('Fichier trop volumineux.');
    const j = JSON.parse(await file.text());
    if (j?.app !== 'recroise' || !Array.isArray(j.dossiers)) throw new Error('Ce fichier n’est pas un export RECROISE v2.');
    const ok = j.dossiers.map(normalizeDossier).filter(Boolean); if (!ok.length) throw new Error('Aucun dossier valide dans ce fichier.');
    const ids = new Set(loadAll().map((d) => d.id)); saveAll([...ok.filter((d) => !ids.has(d.id)), ...loadAll()]); toast(`${ok.length} dossier(s) importé(s).`); renderDossiers();
  } catch (e) { toast('Import impossible : ' + e.message); }
}

/* ------------------------------ Routeur ------------------------------ */
let currentRoute = 'home';
function route() {
  const h = location.hash.replace(/^#\/?/, ''); const [r, id] = h.split('/');
  currentRoute = r === 'dossier' ? 'dossiers' : r || 'home';
  for (const a of document.querySelectorAll('#nav a')) { if (a.dataset.r === currentRoute) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); }
  delete main.dataset.did;
  if (r === 'dossier') renderDossier(decodeURIComponent(id || ''));
  else if (r === 'dossiers') renderDossiers();
  else if (['methode', 'moodboard', 'pitch'].includes(r)) main.innerHTML = renderStatic(r, caps);
  else { currentRoute = 'home'; renderHome(); }
  document.title = 'RECROISE — ' + ({ home: 'Vérifier', dossiers: 'Dossiers', methode: 'Méthode', moodboard: 'Moodboard', pitch: 'Pitch' }[currentRoute] || 'Vérifier');
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
await loadCaps();
route();
