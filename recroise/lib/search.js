// Recherche web : Brave ou Tavily (clé serveur), DuckDuckGo HTML en secours sans clé (fragile).
const UA = 'Mozilla/5.0 (compatible; RECROISE/2.0)';

async function timedFetch(url, init = {}, ms = 12000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { ...init, signal: ctl.signal }); } finally { clearTimeout(t); }
}

export class SearchError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export function parseDuckDuckGo(html) {
  const out = [];
  const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/\s+/g, ' ').trim();
  for (const block of html.split(/(?=<a[^>]+class="result__a")/).slice(1)) {
    const a = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i.exec(block);
    if (!a) continue;
    const sn = /class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i.exec(block);
    let href = a[1].replace(/&amp;/g, '&');
    const u = /[?&]uddg=([^&]+)/.exec(href);
    if (u) href = decodeURIComponent(u[1]);
    if (href.startsWith('//')) href = 'https:' + href;
    if (!/^https?:\/\//.test(href)) continue;
    out.push({ title: strip(a[2]), url: href, snippet: strip(sn && sn[1]), date: null });
  }
  return out;
}

export function createSearch(cfg) {
  async function brave(q) {
    const url = `${cfg.braveBaseUrl}/res/v1/web/search?q=${encodeURIComponent(q)}&count=8&country=fr&search_lang=fr`;
    const r = await timedFetch(url, { headers: { accept: 'application/json', 'x-subscription-token': cfg.braveKey } });
    if (r.status === 401 || r.status === 403) throw new SearchError('auth', 'Clé de recherche refusée.');
    if (r.status === 429) throw new SearchError('rate', 'Quota de recherche atteint.');
    if (!r.ok) throw new SearchError('api', `Recherche indisponible (${r.status}).`);
    const j = await r.json();
    return ((j.web && j.web.results) || []).map((x) => ({ title: x.title, url: x.url, snippet: (x.description || '').replace(/<[^>]+>/g, ''), date: x.page_age ? String(x.page_age).slice(0, 10) : null }));
  }
  async function tavily(q) {
    const r = await timedFetch(`${cfg.tavilyBaseUrl}/search`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${cfg.tavilyKey}` },
      body: JSON.stringify({ query: q, max_results: 8, search_depth: 'basic' }),
    });
    if (r.status === 401 || r.status === 403) throw new SearchError('auth', 'Clé de recherche refusée.');
    if (r.status === 429) throw new SearchError('rate', 'Quota de recherche atteint.');
    if (!r.ok) throw new SearchError('api', `Recherche indisponible (${r.status}).`);
    const j = await r.json();
    return (j.results || []).map((x) => ({ title: x.title, url: x.url, snippet: x.content || '', date: x.published_date ? String(x.published_date).slice(0, 10) : null }));
  }
  async function ddg(q) {
    const r = await timedFetch(`${cfg.ddgUrl}?q=${encodeURIComponent(q)}&kl=fr-fr`, { headers: { 'user-agent': UA, 'accept-language': 'fr' } });
    if (!r.ok) throw new SearchError('api', `Recherche indisponible (${r.status}).`);
    const res = parseDuckDuckGo(await r.text());
    if (!res.length) throw new SearchError('blocked', 'Le moteur de secours ne renvoie rien (blocage possible).');
    return res.slice(0, 8);
  }
  return async function search(q) {
    const fn = { brave, tavily, duckduckgo: ddg }[cfg.searchProvider];
    if (!fn) throw new SearchError('config', 'Moteur de recherche non configuré.');
    if (cfg.searchProvider === 'brave' && !cfg.braveKey) throw new SearchError('config', 'BRAVE_API_KEY manquante.');
    if (cfg.searchProvider === 'tavily' && !cfg.tavilyKey) throw new SearchError('config', 'TAVILY_API_KEY manquante.');
    try { return await fn(q); } catch (e) {
      if (e instanceof SearchError) throw e;
      throw new SearchError('network', 'Recherche injoignable.');
    }
  };
}
