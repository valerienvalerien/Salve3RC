// Régénère les PDF du dossier vidéo : depuis ce dossier, `node build-pdf.js`.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const [src, out, label] of [
    ['BRIEF-VIDEO-PORTRAITS.html','BRIEF-VIDEO-PORTRAITS.pdf','Brief vidéo — Portraits du fondateur']]) {
    await p.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { await document.fonts.load('600 12px Lora'); await document.fonts.load('700 12px Lora'); await document.fonts.load('500 12px Lora'); await document.fonts.ready; });
    await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: `<div style="font-family:Inter,Arial;font-size:7pt;color:#8A8275;width:100%;padding:0 20mm;display:flex;justify-content:space-between"><span>Salverys · ${label} · Confidentiel</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>` });
    const n = await p.evaluate(() => document.fonts.check('12px Lora'));
    console.log(out, 'Lora chargée:', n);
  }
  await b.close();
})();
