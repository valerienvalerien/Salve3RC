import test from 'node:test';
import assert from 'node:assert/strict';
import { safeFetch, parseSafeUrl, isBlockedIp, isWalledPlatform } from '../lib/net-guard.js';
import { extractFromHtml, decodeEntities } from '../lib/html-extract.js';
import { sniffImage, parseImagePayload } from '../lib/image.js';
import { heuristicClaims, extractEntities } from '../lib/heuristics.js';
import { clusterReprises, shingles, similarity } from '../lib/analyze.js';
import { parseDuckDuckGo } from '../lib/search.js';
import { startMockWeb, close, PAGE_A, PAGE_B, PAGE_C } from './helpers.js';

test('SSRF : adresses internes bloquées', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '169.254.169.254', '192.168.0.5', '172.16.0.1', '100.64.0.1', '0.0.0.0', '::1', 'fe80::1', 'fc00::1', '::ffff:127.0.0.1', '::ffff:10.0.0.1'])
    assert.equal(isBlockedIp(ip), true, ip);
  for (const ip of ['8.8.8.8', '151.101.1.1', '2606:4700:4700::1111']) assert.equal(isBlockedIp(ip), false, ip);
});

test('SSRF : URL invalides refusées', () => {
  for (const u of ['file:///etc/passwd', 'ftp://example.com/', 'javascript:alert(1)', 'http://user:pw@example.com/', 'http://example.com:22/', 'http://localhost/', 'pas une url', 'http://intranet/'])
    assert.throws(() => parseSafeUrl(u), (e) => e.code === 'bad_url', u);
  assert.doesNotThrow(() => parseSafeUrl('https://example.com/a?b=1'));
});

test('SSRF : connexion réelle à 127.0.0.1 et métadonnées cloud refusées', async () => {
  const web = await startMockWeb();
  try {
    await assert.rejects(safeFetch(`${web.base}/a`), (e) => e.code === 'bad_url' || e.code === 'blocked_host');
    await assert.rejects(safeFetch('http://127.0.0.1/'), (e) => e.code === 'blocked_host');
    await assert.rejects(safeFetch('http://[::1]/'), (e) => e.code === 'blocked_host');
    await assert.rejects(safeFetch('http://169.254.169.254/latest/meta-data/'), (e) => e.code === 'blocked_host');
  } finally { await close(web.srv); }
});

test('Fetch (hôte de test autorisé) : redirection vers file://, boucle, PDF, gros fichier, 404, timeout', async () => {
  const web = await startMockWeb();
  const o = { allowPrivate: true };
  try {
    const ok = await safeFetch(`${web.base}/a`, o);
    assert.equal(ok.status, 200);
    await assert.rejects(safeFetch(`${web.base}/redir`, o), (e) => e.code === 'bad_url');
    await assert.rejects(safeFetch(`${web.base}/loop`, o), (e) => e.code === 'redirects');
    await assert.rejects(safeFetch(`${web.base}/pdf`, o), (e) => e.code === 'unsupported_type');
    await assert.rejects(safeFetch(`${web.base}/big`, o), (e) => e.code === 'too_large');
    await assert.rejects(safeFetch(`${web.base}/nope`, o), (e) => e.code === 'http_404');
    await assert.rejects(safeFetch(`${web.base}/slow`, { ...o, timeoutMs: 300 }), (e) => e.code === 'timeout' || /trop de temps/.test(e.message));
  } finally { await close(web.srv); }
});

test('Extraction HTML : nettoie scripts/menus, lit titre/date/site', () => {
  const ex = extractFromHtml(`<html><head><title>Titre &amp; test</title><meta property="article:published_time" content="2026-09-24T10:00:00Z"><meta property="og:site_name" content="Journal"></head><body><nav>MENU</nav><article><p>Premier paragraphe d'un article assez long pour passer le seuil. ${'Texte. '.repeat(40)}</p><script>evil()</script></article></body></html>`, 'https://x.mg/a');
  assert.equal(ex.title, 'Titre & test');
  assert.equal(ex.publishedAt, '2026-09-24');
  assert.equal(ex.siteName, 'Journal');
  assert.ok(!ex.text.includes('MENU') && !ex.text.includes('evil'));
  assert.equal(ex.warnings.length, 0);
  assert.equal(decodeEntities('&eacute;&#233;&#xE9;'), 'ééé');
});

test('Extraction HTML : page quasi vide / mur de connexion signalés', () => {
  const ex = extractFromHtml('<html><body>Connectez-vous pour continuer</body></html>', 'https://x.mg');
  assert.ok(ex.warnings.length >= 1);
});

test('Plateformes fermées détectées (Facebook, etc.)', () => {
  for (const u of ['https://www.facebook.com/x/posts/1', 'https://m.facebook.com/story.php?id=1', 'https://fb.watch/abc', 'https://x.com/a/status/1', 'https://www.tiktok.com/@a/video/1'])
    assert.equal(isWalledPlatform(new URL(u)), true, u);
  assert.equal(isWalledPlatform(new URL('https://notfacebook.com/')), false);
  assert.equal(isWalledPlatform(new URL('https://midi-madagasikara.mg/a')), false);
});

test('Images : validation par octets, pas par extension', () => {
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(20)]);
  const jpg = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(20)]);
  assert.equal(sniffImage(png), 'image/png');
  assert.equal(sniffImage(jpg), 'image/jpeg');
  assert.equal(sniffImage(Buffer.from('<svg onload=alert(1)>')), null);
  assert.equal(sniffImage(Buffer.from('%PDF-1.4')), null);
  assert.equal(parseImagePayload('data:image/png;base64,' + png.toString('base64'), 1000).mediaType, 'image/png');
  assert.throws(() => parseImagePayload('data:image/png;base64,' + Buffer.from('MZ exe').toString('base64'), 1000), (e) => e.code === 'unsupported');
  assert.throws(() => parseImagePayload(jpg.toString('base64'), 5), (e) => e.code === 'too_large');
  assert.throws(() => parseImagePayload('', 100), (e) => e.code === 'missing');
  assert.throws(() => parseImagePayload('###', 100), (e) => e.code === 'bad_encoding');
});

test('Règles sans IA : affirmations, entités, opinions, accusations', () => {
  const t = "Le 25 septembre 2026, la Présidence a annoncé un jour férié à Madagascar. C'est honteux, je pense que tout est faux! Le ministre Jean Rakoto est accusé de corruption par un journal. Ok.";
  const cs = heuristicClaims(t);
  assert.ok(cs.length >= 2);
  assert.ok(cs.some((c) => c.kind === 'opinion'));
  assert.ok(cs.some((c) => c.kind === 'accusation'));
  const e = extractEntities(cs[0].text);
  assert.ok(e.dates.length && e.institutions.includes('Présidence') && e.countries.includes('Madagascar'));
});

test('Reprises : A et B regroupées, C indépendante', () => {
  const g = clusterReprises([{ text: PAGE_A }, { text: PAGE_B }, { text: PAGE_C }]);
  assert.equal(g[0], g[1]);
  assert.notEqual(g[0], g[2]);
  assert.ok(similarity(shingles(PAGE_A), shingles(PAGE_C)) < 0.2);
  // les extraits de moteur ne sont jamais regroupés
  const g2 = clusterReprises([{ text: PAGE_A, snippetOnly: true }, { text: PAGE_A, snippetOnly: true }]);
  assert.notEqual(g2[0], g2[1]);
});

test('DuckDuckGo : parsing des résultats et décodage des liens', () => {
  const html = `<div class="result"><a class="result__a" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fexample.mg%2Fa%3Fx%3D1&amp;rut=zz">Titre <b>A</b></a><a class="result__snippet" href="#">Un <b>extrait</b></a></div>`;
  const r = parseDuckDuckGo(html);
  assert.equal(r.length, 1);
  assert.equal(r[0].url, 'https://example.mg/a?x=1');
  assert.equal(r[0].title, 'Titre A');
  assert.equal(r[0].snippet, 'Un extrait');
});
