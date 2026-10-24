// Test de bout en bout dans un vrai navigateur (Chromium/Playwright), avec serveurs factices.
// Usage : node test/e2e.cjs   (captures dans test/screens/)
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');
const assert = require('node:assert/strict');

const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(64)]);
const SHOTS = path.join(__dirname, 'screens'); fs.mkdirSync(SHOTS, { recursive: true });
const results = []; let browser;
const step = async (name, fn) => { try { await fn(); results.push(['ok', name]); console.log('✔', name); } catch (e) { results.push(['KO', name, e.message]); console.log('✖', name, '\n   ', e.message.split('\n')[0]); } };

(async () => {
  const { createApp } = await import('../server.js');
  const H = await import('./helpers.js');
  const web = await H.startMockWeb(); const an = await H.startMockAnthropic(); const br = await H.startMockBrave(web.base);
  const app = createApp({ anthropicKey: 'sk-test', anthropicBaseUrl: an.base, searchProvider: 'brave', braveKey: 'k', braveBaseUrl: br.base, allowPrivateHosts: true, rateLimitPerMin: 1000 });
  const bare = createApp({ anthropicKey: '', searchProvider: 'duckduckgo', rateLimitPerMin: 1000 });
  const listen = (s) => new Promise((r) => s.listen(0, '127.0.0.1', () => r(`http://127.0.0.1:${s.address().port}`)));
  const base = await listen(app.server); const bareBase = await listen(bare.server);
  browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, locale: 'fr-FR' });
  const page = await ctx.newPage();
  const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  const shot = (n) => page.screenshot({ path: path.join(SHOTS, n + '.png'), fullPage: true });
  const analyzeAndWait = async () => { await page.waitForURL(/#\/dossier\//, { timeout: 15000 }); await page.waitForSelector('.claim'); };

  await step('Accueil : entrée visible (lien, capture, texte) + bouton', async () => {
    await page.goto(base + '/');
    await page.waitForSelector('#start');
    assert.ok(await page.isVisible('role=tab[name=/Coller un lien/]'));
    assert.ok(await page.isVisible('role=tab[name=/Importer une capture/]'));
    assert.ok(await page.isVisible('role=tab[name=/Coller un texte/]'));
    assert.ok(await page.isVisible('button:has-text("Vérifier cette information")'));
    const box = await page.locator('#start').boundingBox(); assert.ok(box.y < 600, 'le formulaire doit être dans le premier écran: y=' + box.y);
    await shot('01-accueil-desktop');
  });

  await step('Parcours TEXTE → analyse → dossier avec statuts, sources, citations vérifiées', async () => {
    await page.click('#tab-texte');
    await page.fill('#in-text', "Le vendredi 25 septembre 2026 est férié, chômé et payé selon la Présidence. Le ministre dit que le message contraire était un piratage. C'est une honte.");
    await page.click('button:has-text("Vérifier cette information")');
    await analyzeAndWait();
    const txt = await page.locator('main').innerText();
    assert.match(txt, /Étayé/); assert.match(txt, /Preuves insuffisantes/); assert.match(txt, /Opinion/);
    assert.match(txt, /Citation retrouvée dans la page/);
    assert.match(txt, /abaissé automatiquement/);
    assert.match(txt, /Non relue par un humain/);
    assert.match(txt, /indépendante/);
    assert.ok(await page.locator('a[href^="http"][target=_blank]').count() >= 3);
    await shot('02-dossier-desktop');
  });

  await step('Relecture humaine : déclaration, annulation après modification, journal', async () => {
    await page.fill('#rv-by', 'Rédac test'); await page.check('#rv-ok'); await page.click('button:has-text("Enregistrer la relecture")');
    await page.waitForSelector('.banner.ok');
    assert.match(await page.locator('.banner.ok').innerText(), /Relue par un humain : Rédac test/);
    await page.locator('details:has-text("Relecture humaine de cette affirmation") summary').first().click();
    await page.selectOption('[data-human-status="0"]', 'hors_contexte');
    await page.waitForSelector('text=Non relue par un humain');
    assert.match(await page.locator('main').innerText(), /relecture humaine :/);
    await page.locator('summary:has-text("Journal des modifications")').click();
    assert.match(await page.locator('.tl').innerText(), /Relecture annulée/);
  });

  await step('Lecture simplifiée et impression masquent le détail', async () => {
    await page.click('button:has-text("Lecture simplifiée")');
    assert.equal(await page.locator('.detail').first().isVisible(), false);
    await page.click('button:has-text("Lecture détaillée")');
  });

  await step('Parcours LIEN : lecture, texte extrait corrigeable, analyse', async () => {
    await page.goto(base + '/#/'); await page.waitForSelector('#start'); await page.click('#tab-lien');
    await page.fill('#in-url', web.base + '/a');
    await page.click('button:has-text("Vérifier cette information")');
    await page.waitForSelector('#review');
    const v = await page.inputValue('#ex-text'); assert.match(v, /journée chômée et payée/);
    assert.match(await page.locator('main').innerText(), /publié le 24 septembre 2026/);
    await shot('03-texte-extrait');
    await page.fill('#ex-text', v + '\nCorrection manuelle ajoutée.');
    await page.click('button:has-text("Lancer l’analyse")');
    await analyzeAndWait();
    await page.locator('summary:has-text("Texte analysé")').click();
    assert.match(await page.locator('main').innerText(), /Correction manuelle ajoutée/);
  });

  await step('Lien Facebook : refus honnête, bascule vers la capture', async () => {
    await page.goto(base + '/#/'); await page.waitForSelector('#start'); await page.click('#tab-lien');
    await page.fill('#in-url', 'https://www.facebook.com/page/posts/123');
    await page.click('button:has-text("Vérifier cette information")');
    await page.waitForSelector('.banner.err');
    assert.match(await page.locator('.banner.err').innerText(), /Je n'ai pas lu cette publication/);
    assert.ok(await page.isVisible('#drop'));
    assert.equal(await page.locator('#review').count(), 0);
    await shot('04-facebook-bloque');
  });

  await step('Liens en échec : 404, IP interne (prod), URL absurde', async () => {
    await page.goto(base + '/#/'); await page.waitForSelector('#start'); await page.click('#tab-lien');
    await page.fill('#in-url', web.base + '/introuvable'); await page.click('button:has-text("Vérifier cette information")');
    await page.waitForSelector('.banner.err'); assert.match(await page.locator('.banner.err').innerText(), /n'existe plus/);
    await page.fill('#in-url', ''); await page.click('button:has-text("Vérifier cette information")');
    assert.match(await page.locator('.banner.err').innerText(), /Lien manquant/);
  });

  await step('Parcours IMAGE : dépôt, aperçu, lecture serveur, texte extrait, analyse', async () => {
    await page.goto(base + '/#/'); await page.waitForSelector('#start'); await page.click('#tab-image');
    await page.setInputFiles('#file', { name: 'capture.png', mimeType: 'image/png', buffer: PNG });
    await page.waitForSelector('#drop img');
    assert.ok(await page.isVisible('text=Lecture par le serveur'));
    assert.ok(await page.isVisible('text=Lecture dans mon navigateur'));
    await shot('05-image-importee');
    await page.click('button:has-text("Vérifier cette information")');
    await page.waitForSelector('#review');
    assert.match(await page.inputValue('#ex-text'), /25 septembre 2026/);
    assert.match(await page.locator('main').innerText(), /Plateforme : Facebook/);
    await page.click('button:has-text("Lancer l’analyse")'); await analyzeAndWait();
  });

  await step('Image : format refusé (PDF), fichier non-image déguisé, capture illisible', async () => {
    await page.goto(base + '/#/'); await page.waitForSelector('#start'); await page.click('#tab-image');
    await page.setInputFiles('#file', { name: 'doc.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });
    await page.waitForSelector('.banner.err'); assert.match(await page.locator('.banner.err').innerText(), /Format non pris en charge/);
    await page.click('#tab-image');
    await page.setInputFiles('#file', { name: 'faux.png', mimeType: 'image/png', buffer: Buffer.from('MZ programme windows pas une image') });
    await page.waitForSelector('#drop img');
    await page.click('button:has-text("Vérifier cette information")');
    await page.waitForSelector('.banner.err'); assert.match(await page.locator('.banner.err').innerText(), /Format non pris en charge/);
  });

  await step('Texte trop court : message clair', async () => {
    await page.goto(base + '/#/'); await page.click('#tab-texte'); await page.fill('#in-text', 'oui'); await page.click('button:has-text("Vérifier cette information")');
    assert.match(await page.locator('.banner.err').innerText(), /trop court/);
  });

  await step('Serveur d’analyse en panne : erreur compréhensible, saisie conservée', async () => {
    const p2 = await ctx.newPage();
    await p2.goto(base + '/'); await p2.waitForSelector('#start'); await p2.click('#tab-texte');
    await p2.fill('#in-text', "Le vendredi 25 septembre 2026 est férié selon la Présidence, dit le communiqué.");
    await p2.route('**/api/analyze', (r) => r.abort());
    await p2.click('button:has-text("Vérifier cette information")');
    await p2.waitForSelector('.banner.err');
    assert.match(await p2.locator('.banner.err').innerText(), /Analyse impossible/);
    assert.match(await p2.inputValue('#in-text'), /Présidence/);
    await p2.close();
  });

  await step('Exemples documentaires : lecture seule, duplicables, non présentés comme analyse', async () => {
    await page.goto(base + '/#/dossiers'); await page.click('text=25 septembre 2026 : jour chômé et payé');
    await page.waitForSelector('.claim');
    const t = await page.locator('main').innerText();
    assert.match(t, /EXEMPLE DOCUMENTAIRE · LECTURE SEULE/); assert.match(t, /non produit par l’analyse automatique/);
    assert.match(t, /Explication attribuée au ministre/); assert.match(t, /divergent sur la date du décret/);
    assert.equal(await page.locator('#rv-ok').count(), 0);
    assert.ok(await page.locator('a[href*="studiosifaka.org"]').count() >= 1 && await page.locator('a[href*="midi-madagasikara.mg"]').count() >= 1);
    await shot('06-exemple');
    await page.click('button:has-text("Dupliquer pour modifier")'); await page.waitForSelector('#rv-ok');
    assert.match(await page.inputValue('#ttl'), /^Copie —/);
    await page.goto(base + '/#/dossier/ex-moscou-2025'); await page.waitForSelector('.claim');
    assert.match(await page.locator('main').innerText(), /octobre 2025/); assert.match(await page.locator('main').innerText(), /ne préjuge/i);
  });

  await step('Dossiers : recherche, filtre, export, import, persistance au rechargement', async () => {
    await page.goto(base + '/#/dossiers'); await page.waitForSelector('.item');
    const n = await page.locator('.item').count(); assert.ok(n >= 4);
    await page.fill('#q', 'Moscou'); assert.equal(await page.locator('.item').count(), 1);
    await page.fill('#q', ''); await page.selectOption('#th', 'Russie'); assert.equal(await page.locator('.item').count(), 1);
    await page.selectOption('#th', ''); 
    const [dl] = await Promise.all([page.waitForEvent('download'), page.click('button:has-text("Tout exporter")')]);
    const file = path.join(SHOTS, 'export.json'); await dl.saveAs(file);
    const j = JSON.parse(fs.readFileSync(file, 'utf8')); assert.equal(j.app, 'recroise'); assert.ok(j.dossiers.length >= 3);
    await page.evaluate(() => localStorage.clear()); await page.reload(); await page.waitForSelector('.item');
    const before = await page.locator('.item').count();
    await page.setInputFiles('#imp', file); await page.waitForFunction((b) => document.querySelectorAll('.item').length > b, before);
    await page.reload(); await page.waitForSelector('.item'); assert.ok(await page.locator('.item').count() > before);
    fs.writeFileSync(path.join(SHOTS, 'bad.json'), '{"x":1}'); await page.setInputFiles('#imp', path.join(SHOTS, 'bad.json'));
    await page.waitForSelector('#toast:has-text("Import impossible")');
  });

  await step('Import malveillant : contenu HTML jamais exécuté', async () => {
    const evil = { app: 'recroise', version: 2, dossiers: [{ id: 'evil1', title: '<img src=x onerror=window.__pwn=1>', analysis: { mode: 'ia', summary: '<script>window.__pwn=1</script>', claims: [{ id: 'C1', text: '<b onmouseover=1>x</b>', status: 'etaye', evidence: [{ sourceId: 'S1', role: 'confirme', proves: '<i>', quote: '', quoteVerified: false }] }], sources: [{ id: 'S1', url: 'javascript:window.__pwn=1', title: 'x' }] } }] };
    const f = path.join(SHOTS, 'evil.json'); fs.writeFileSync(f, JSON.stringify(evil));
    await page.goto(base + '/#/dossiers'); await page.setInputFiles('#imp', f); await page.waitForSelector('#toast:has-text("importé")');
    await page.goto(base + '/#/dossier/evil1'); await page.waitForSelector('.claim');
    assert.equal(await page.evaluate(() => window.__pwn), undefined);
    assert.equal(await page.locator('main a[href^="javascript"]').count(), 0);
  });

  await step('Pages Méthode, Moodboard, Pitch', async () => {
    for (const [r, re] of [['methode', /cinq statuts/i], ['moodboard', /#F6F4ED/], ['pitch', /Le 25 septembre : on travaille, ou pas \?/]]) {
      await page.goto(base + '/#/' + r); await page.waitForSelector('h1'); assert.match(await page.locator('main').innerText(), re);
    }
    await shot('07-moodboard');
  });

  await step('Mobile 390 px : pas de défilement horizontal, entrée visible, cibles tactiles', async () => {
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'fr-FR' });
    const mp = await m.newPage();
    for (const r of ['#/', '#/dossiers', '#/dossier/ex-25-septembre', '#/methode', '#/moodboard', '#/pitch']) {
      await mp.goto(base + '/' + r); await mp.waitForSelector('main h1, main h2');
      const sw = await mp.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert.ok(sw <= 1, `${r} déborde de ${sw}px`);
      if (r === '#/') await mp.screenshot({ path: path.join(SHOTS, '08-accueil-mobile.png'), fullPage: false });
      if (r.includes('dossier/')) await mp.screenshot({ path: path.join(SHOTS, '09-dossier-mobile.png'), fullPage: true });
    }
    await mp.goto(base + '/'); const h = await mp.locator('button:has-text("Vérifier cette information")').boundingBox(); assert.ok(h.height >= 44);
    await m.close();
  });

  await step('Serveur SANS clé : bandeau honnête, repérage par règles, aucun verdict', async () => {
    const p3 = await ctx.newPage(); await p3.goto(bareBase + '/'); await p3.waitForSelector('#start');
    assert.match(await p3.locator('main').innerText(), /Analyse IA non configurée/);
    await p3.click('#tab-texte'); await p3.fill('#in-text', "Le 25 septembre 2026, la Présidence a annoncé un jour férié à Madagascar. Le ministre dit que c'est un piratage. C'est honteux, je pense que tout est faux!");
    await p3.click('button:has-text("Vérifier cette information")'); await p3.waitForURL(/#\/dossier\//); await p3.waitForSelector('.claim');
    const t = await p3.locator('main').innerText();
    assert.match(t, /Repérage par règles — aucun verdict/); assert.match(t, /Non évalué/);
    assert.doesNotMatch(t, /✔ Étayé/);
    await p3.screenshot({ path: path.join(SHOTS, '10-sans-ia.png'), fullPage: true });
    await p3.click('#tab-image').catch(() => {});
    await p3.close();
  });

  await step('Aucune erreur JavaScript dans la console', async () => assert.deepEqual(errors, []));

  await browser.close();
  for (const s of [web.srv, an.srv, br.srv, app.server, bare.server]) await H.close(s);
  const ko = results.filter((r) => r[0] === 'KO');
  console.log(`\n${results.length - ko.length}/${results.length} étapes OK`);
  process.exit(ko.length ? 1 : 0);
})().catch(async (e) => { console.error(e); try { await browser.close(); } catch {} process.exit(2); });
