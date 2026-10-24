// Extraction de texte lisible depuis du HTML, sans dépendance. Volontairement simple et prudente.
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', laquo: '«', raquo: '»', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…', ndash: '–', mdash: '—', eacute: 'é', egrave: 'è', ecirc: 'ê', agrave: 'à', acirc: 'â', ccedil: 'ç', ocirc: 'ô', icirc: 'î', ucirc: 'û', ugrave: 'ù', euml: 'ë', iuml: 'ï', Eacute: 'É', deg: '°', euro: '€' };
export function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const n = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      try { return String.fromCodePoint(n); } catch { return ''; }
    }
    return ENT[e] ?? ENT[e.toLowerCase()] ?? m;
  });
}

export function decodeBody(buf, contentType = '') {
  let label = (/charset=([\w-]+)/i.exec(contentType) || [])[1];
  if (!label) label = (/<meta[^>]+charset=["']?([\w-]+)/i.exec(buf.subarray(0, 4096).toString('latin1')) || [])[1];
  try { return new TextDecoder(label || 'utf-8').decode(buf); } catch { return buf.toString('utf8'); }
}

function meta(html, keys) {
  for (const k of keys) {
    const re1 = new RegExp(`<meta[^>]+(?:property|name)=["']${k}["'][^>]*content=["']([^"']*)["']`, 'i');
    const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${k}["']`, 'i');
    const m = re1.exec(html) || re2.exec(html);
    if (m && m[1].trim()) return decodeEntities(m[1].trim());
  }
  return null;
}

function toIso(d) {
  if (!d) return null;
  const t = Date.parse(d);
  return Number.isNaN(t) ? null : new Date(t).toISOString().slice(0, 10);
}

export function extractFromHtml(html, finalUrl = '') {
  const title = decodeEntities(((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || '').replace(/\s+/g, ' ').trim()) || meta(html, ['og:title']);
  const siteName = meta(html, ['og:site_name']) || (finalUrl ? new URL(finalUrl).hostname.replace(/^www\./, '') : null);
  let published = meta(html, ['article:published_time', 'og:article:published_time', 'date', 'datePublished', 'pubdate', 'DC.date.issued']);
  if (!published) published = (/"datePublished"\s*:\s*"([^"]+)"/i.exec(html) || [])[1] || (/<time[^>]+datetime=["']([^"']+)["']/i.exec(html) || [])[1];
  const author = meta(html, ['author', 'article:author']);

  let body = html.replace(/<!--[\s\S]*?-->/g, ' ');
  body = body.replace(/<(script|style|noscript|svg|template|iframe|form|nav|footer|header|aside|button)\b[\s\S]*?<\/\1>/gi, ' ');
  const pick = (tag) => { const m = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*)<\\/${tag}>`, 'i').exec(body); return m ? m[1] : null; };
  const main = pick('article') || pick('main') || pick('body') || body;
  const text = decodeEntities(
    main
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|h[1-6]|li|tr|blockquote|section|figcaption)>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .split('\n').map((l) => l.replace(/[ \t ]+/g, ' ').trim()).filter(Boolean).join('\n')
    .replace(/\n{3,}/g, '\n\n');

  const warnings = [];
  if (text.length < 200) warnings.push("Très peu de texte récupéré : la page est peut-être dynamique, protégée ou réservée aux abonnés. Collez le texte ou importez une capture.");
  if (/(se connecter|log in|connectez-vous|sign in)/i.test(text.slice(0, 600)) && text.length < 800)
    warnings.push('La page semble demander une connexion : le contenu réel n\'a probablement pas été lu.');
  return { title, siteName, publishedAt: toIso(published), author, text, warnings };
}
