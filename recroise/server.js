import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadConfig, capabilities } from './lib/config.js';
import { safeFetch, parseSafeUrl, isWalledPlatform, FetchError } from './lib/net-guard.js';
import { decodeBody, extractFromHtml } from './lib/html-extract.js';
import { parseImagePayload, ImageError } from './lib/image.js';
import { createLlm, LlmError } from './lib/llm.js';
import { createSearch } from './lib/search.js';
import { createAnalyzer, AnalysisError } from './lib/analyze.js';
import { transcribeImage } from './lib/ocr.js';
import { createLimiter } from './lib/ratelimit.js';

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const CSP = "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'wasm-unsafe-eval'; worker-src 'self' blob:; connect-src 'self' https://cdn.jsdelivr.net https://tessdata.projectnaptha.com; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'";

class HttpError extends Error { constructor(status, message, code) { super(message); this.status = status; this.code = code; } }

function readJson(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; let over = false; const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (over) return; // on vide le flux sans le conserver, pour pouvoir répondre proprement
      if (size > limit) { over = true; chunks.length = 0; req.resume(); return reject(new HttpError(413, 'Requête trop volumineuse (image trop lourde ?).', 'too_large')); }
      chunks.push(c);
    });
    req.on('end', () => { if (over) return; try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch { reject(new HttpError(400, 'JSON invalide.', 'bad_json')); } });
    req.on('error', reject);
  });
}

export function createApp(cfgOverrides = {}, deps = {}) {
  const cfg = loadConfig(process.env, cfgOverrides);
  const llm = deps.llm !== undefined ? deps.llm : createLlm(cfg);
  const search = deps.search || createSearch(cfg);
  const fetcher = deps.fetcher || ((u) => safeFetch(u, { allowPrivate: cfg.allowPrivateHosts }));
  const { analyze } = createAnalyzer({ cfg, llm, search, fetcher });
  const limiter = createLimiter(cfg.rateLimitPerMin);
  let running = 0;

  function send(res, status, obj) {
    const body = JSON.stringify(obj);
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
    res.end(body);
  }

  async function extractUrl(body) {
    let u;
    try { u = parseSafeUrl(body.url, { anyPort: cfg.allowPrivateHosts }); } catch (e) { return [422, { ok: false, reason: e.code, message: e.message }]; }
    if (isWalledPlatform(u))
      return [200, { ok: false, reason: 'walled', message: "Facebook, Instagram, X et TikTok bloquent la lecture automatique des publications. Je n'ai pas lu cette publication : importez une capture d'écran ou collez son texte." }];
    try {
      const r = await fetcher(u.toString());
      const ex = extractFromHtml(decodeBody(r.body, r.type), r.finalUrl);
      return [200, { ok: true, url: r.finalUrl, ...ex, text: ex.text.slice(0, cfg.maxTextChars), truncated: ex.text.length > cfg.maxTextChars, fetchedAt: new Date().toISOString() }];
    } catch (e) {
      if (e instanceof FetchError) {
        const msg = { blocked_host: "Cette adresse n'est pas autorisée.", http_403: 'Le site refuse la lecture automatique (403). Collez le texte ou importez une capture.', http_401: 'Le contenu demande une connexion. Collez le texte ou importez une capture.', http_404: "La page n'existe plus (404). Vérifiez le lien." }[e.code] || e.message;
        return [422, { ok: false, reason: e.code, message: msg }];
      }
      throw e;
    }
  }

  async function handleApi(req, res, pathname) {
    const ip = req.socket.remoteAddress || 'x';
    if (pathname === '/api/status' && req.method === 'GET') return send(res, 200, capabilities(cfg));
    if (req.method !== 'POST') throw new HttpError(405, 'Méthode non autorisée.');
    if (!limiter(ip)) throw new HttpError(429, 'Trop de requêtes. Patientez une minute.', 'rate');
    if (!/application\/json/.test(req.headers['content-type'] || '')) throw new HttpError(415, 'Envoyez du JSON.');

    if (pathname === '/api/extract') {
      const [status, out] = await extractUrl(await readJson(req, 10_000));
      return send(res, status, out);
    }

    if (pathname === '/api/ocr') {
      if (!llm) return send(res, 501, { ok: false, reason: 'no_llm', message: "La lecture des captures par le serveur n'est pas configurée. Utilisez la lecture locale dans le navigateur ou collez le texte." });
      const body = await readJson(req, Math.ceil(cfg.maxImageBytes * 1.4) + 1000);
      let img;
      try { img = parseImagePayload(body.image, cfg.maxImageBytes); } catch (e) {
        if (e instanceof ImageError) return send(res, e.code === 'too_large' ? 413 : 422, { ok: false, reason: e.code, message: e.message });
        throw e;
      }
      const out = await transcribeImage(llm, img); // l'image n'est jamais écrite sur disque
      if (!out.text) return send(res, 422, { ok: false, reason: 'unreadable', message: "Aucun texte lisible dans cette image. Essayez une capture plus nette ou collez le texte." });
      return send(res, 200, { ok: true, ...out });
    }

    if (pathname === '/api/analyze') {
      const body = await readJson(req, 100_000);
      if (running >= cfg.maxConcurrentAnalyses) throw new HttpError(503, 'Le service est occupé. Réessayez dans un instant.', 'busy');
      running++;
      res.writeHead(200, { 'content-type': 'application/x-ndjson; charset=utf-8', 'cache-control': 'no-store', 'x-accel-buffering': 'no' });
      const line = (o) => res.write(JSON.stringify(o) + '\n');
      try {
        const result = await analyze({ text: body.text, sourceUrl: typeof body.sourceUrl === 'string' ? body.sourceUrl.slice(0, 500) : null, capturedAt: body.capturedAt || null }, (p) => line({ type: 'progress', ...p }));
        line({ type: 'result', result });
      } catch (e) {
        const known = e instanceof AnalysisError || e instanceof LlmError;
        if (!known) console.error('analyze error:', e.message);
        line({ type: 'error', code: known ? e.code : 'internal', message: known ? e.message : "Erreur inattendue pendant l'analyse. Réessayez." });
      } finally { running--; res.end(); }
      return;
    }
    throw new HttpError(404, 'Route inconnue.');
  }

  async function serveStatic(req, res, pathname) {
    const rel = pathname === '/' ? '/index.html' : pathname;
    const file = path.normalize(path.join(PUBLIC, rel));
    if (!file.startsWith(PUBLIC + path.sep)) throw new HttpError(403, 'Interdit.');
    try {
      const data = await fs.readFile(file);
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' });
      res.end(data);
    } catch { throw new HttpError(404, 'Introuvable.'); }
  }

  const server = http.createServer(async (req, res) => {
    res.setHeader('content-security-policy', CSP);
    res.setHeader('x-content-type-options', 'nosniff');
    res.setHeader('referrer-policy', 'no-referrer');
    res.setHeader('permissions-policy', 'camera=(), microphone=(), geolocation=()');
    try {
      const { pathname } = new URL(req.url, 'http://x');
      if (pathname.startsWith('/api/')) return await handleApi(req, res, pathname);
      if (!['GET', 'HEAD'].includes(req.method)) throw new HttpError(405, 'Méthode non autorisée.');
      return await serveStatic(req, res, pathname);
    } catch (e) {
      if (res.headersSent) return res.end();
      if (e instanceof HttpError) return send(res, e.status, { ok: false, reason: e.code || 'http', message: e.message });
      if (e instanceof LlmError) return send(res, 502, { ok: false, reason: e.code, message: e.message });
      console.error('server error:', e.message);
      send(res, 500, { ok: false, reason: 'internal', message: 'Erreur interne.' });
    }
  });
  server.requestTimeout = 180000;
  return { server, cfg };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { server, cfg } = createApp();
  const c = capabilities(cfg);
  server.listen(cfg.port, () => {
    console.log(`RECROISE sur http://localhost:${cfg.port}`);
    console.log(`  Analyse IA : ${c.llm ? 'oui (' + c.model + ')' : 'NON (ANTHROPIC_API_KEY manquante) — mode règles'}`);
    console.log(`  Recherche  : ${c.search}${c.search === 'duckduckgo' ? ' (secours sans clé, fragile)' : ''}`);
  });
}
