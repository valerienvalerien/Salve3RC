// Récupération d'URL protégée (SSRF) : http(s) uniquement, ports 80/443, IP validée AU MOMENT
// de la connexion (anti DNS-rebinding), redirections revalidées, taille et durée plafonnées.
import dns from 'node:dns';
import net from 'node:net';
import http from 'node:http';
import https from 'node:https';
import zlib from 'node:zlib';

const blocked = new net.BlockList();
for (const [a, p] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16],
  ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
]) blocked.addSubnet(a, p, 'ipv4');
for (const [a, p] of [['::', 128], ['::1', 128], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8], ['64:ff9b::', 96], ['2001:db8::', 32]])
  blocked.addSubnet(a, p, 'ipv6');

export class FetchError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export function isBlockedIp(ip) {
  if (net.isIPv6(ip)) {
    const m = ip.toLowerCase().match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (m) return blocked.check(m[1], 'ipv4');
    return blocked.check(ip, 'ipv6');
  }
  return net.isIPv4(ip) ? blocked.check(ip, 'ipv4') : true;
}

export function parseSafeUrl(raw, { anyPort = false } = {}) {
  let u;
  try { u = new URL(String(raw).trim()); } catch { throw new FetchError('bad_url', "Ce lien n'est pas une adresse web valide."); }
  if (!['http:', 'https:'].includes(u.protocol)) throw new FetchError('bad_url', 'Seuls les liens http(s) sont acceptés.');
  if (u.username || u.password) throw new FetchError('bad_url', 'Les liens avec identifiants ne sont pas acceptés.');
  const port = u.port || (u.protocol === 'https:' ? '443' : '80');
  if (!anyPort && !['80', '443'].includes(port)) throw new FetchError('bad_url', 'Port non autorisé.');
  if (!u.hostname || (!u.hostname.includes('.') && !net.isIP(u.hostname.replace(/^\[|\]$/g, ''))))
    throw new FetchError('bad_url', "Nom de domaine invalide.");
  return u;
}

export function makeLookup(allowPrivate) {
  return (hostname, options, cb) => {
    if (typeof options === 'function') { cb = options; options = {}; }
    dns.lookup(hostname, { all: true, verbatim: true }, (err, addrs) => {
      if (err) return cb(err);
      const ok = addrs.filter((a) => allowPrivate || !isBlockedIp(a.address));
      if (!ok.length) return cb(new FetchError('blocked_host', 'Adresse interne ou non autorisée.'));
      if (options && options.all) return cb(null, ok);
      cb(null, ok[0].address, ok[0].family);
    });
  };
}

const ALLOWED_TYPES = /^(text\/html|application\/xhtml\+xml|text\/plain)\b/i;

function once(urlObj, { allowPrivate, timeoutMs, maxBytes, accept }) {
  return new Promise((resolve, reject) => {
    // Node n'appelle pas `lookup` pour une IP littérale : on la valide ici.
    const literal = urlObj.hostname.replace(/^\[|\]$/g, '');
    if (!allowPrivate && net.isIP(literal) && isBlockedIp(literal)) return reject(new FetchError('blocked_host', 'Adresse interne ou non autorisée.'));
    const lib = urlObj.protocol === 'https:' ? https : http;
    const req = lib.request(
      urlObj,
      {
        method: 'GET',
        lookup: makeLookup(allowPrivate),
        timeout: timeoutMs,
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; RECROISE/2.0; vérification de l\'information)',
          accept: accept || 'text/html,application/xhtml+xml,text/plain;q=0.9',
          'accept-language': 'fr,en;q=0.7',
          'accept-encoding': 'gzip, deflate, br',
        },
      },
      (res) => {
        const status = res.statusCode || 0;
        if ([301, 302, 303, 307, 308].includes(status) && res.headers.location) {
          res.resume();
          return resolve({ redirect: new URL(res.headers.location, urlObj).toString(), status });
        }
        const type = String(res.headers['content-type'] || '');
        if (status >= 400) { res.resume(); return reject(new FetchError('http_' + status, `Le site a répondu ${status}.`)); }
        if (type && !ALLOWED_TYPES.test(type)) {
          res.resume();
          return reject(new FetchError('unsupported_type', `Type de contenu non pris en charge (${type.split(';')[0]}). Collez le texte ou une capture.`));
        }
        const enc = String(res.headers['content-encoding'] || '').toLowerCase();
        let stream = res;
        if (enc === 'gzip') stream = res.pipe(zlib.createGunzip());
        else if (enc === 'deflate') stream = res.pipe(zlib.createInflate());
        else if (enc === 'br') stream = res.pipe(zlib.createBrotliDecompress());
        const chunks = []; let size = 0; let done = false;
        const fail = (e) => { if (!done) { done = true; req.destroy(); reject(e); } };
        stream.on('data', (c) => {
          size += c.length;
          if (size > maxBytes) return fail(new FetchError('too_large', 'Page trop volumineuse.'));
          chunks.push(c);
        });
        stream.on('end', () => { if (!done) { done = true; resolve({ status, type, body: Buffer.concat(chunks) }); } });
        stream.on('error', (e) => fail(new FetchError('network', e.message)));
      },
    );
    req.on('timeout', () => req.destroy(new FetchError('timeout', 'Le site met trop de temps à répondre.')));
    req.on('error', (e) => reject(e instanceof FetchError ? e : new FetchError(e.code === 'ENOTFOUND' ? 'dns' : 'network',
      e.code === 'ENOTFOUND' ? "Ce nom de domaine n'existe pas ou est injoignable." : 'Connexion impossible à ce site.')));
    req.end();
  });
}

export async function safeFetch(rawUrl, opts = {}) {
  const o = { allowPrivate: false, timeoutMs: 10000, maxBytes: 2 * 1024 * 1024, maxRedirects: 4, ...opts };
  const pu = (r) => parseSafeUrl(r, { anyPort: o.allowPrivate });
  let url = pu(rawUrl);
  for (let i = 0; i <= o.maxRedirects; i++) {
    const r = await once(url, o);
    if (r.redirect) { url = pu(r.redirect); continue; }
    return { ...r, finalUrl: url.toString() };
  }
  throw new FetchError('redirects', 'Trop de redirections.');
}

const WALLED = /(^|\.)((m|www|web|mbasic|l|lm)\.)?(facebook\.com|fb\.com|fb\.watch|instagram\.com|tiktok\.com|x\.com|twitter\.com|threads\.net)$/i;
export function isWalledPlatform(urlObj) { return WALLED.test(urlObj.hostname); }
