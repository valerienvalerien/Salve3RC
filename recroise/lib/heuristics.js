// Mode sans IA : repérage par règles. NE PRODUIT AUCUN VERDICT — les statuts restent « non évalué ».
const MONTHS = 'janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre';
const COUNTRIES = ['Madagascar', 'Russie', 'Chine', 'France', 'États-Unis', 'Etats-Unis', 'Inde', 'Maurice', 'Comores', 'Union européenne'];
const INSTITUTIONS = ['Présidence', 'Gouvernement', 'Primature', 'Assemblée nationale', 'Sénat', 'HCC', 'Ministère de la Justice', 'Ministère', 'Tribunal', 'Cour suprême', 'BIANCO', 'PAC', 'Journal officiel', 'Conseil des ministres', 'Police', 'Gendarmerie', 'JIRAMA', 'Banque centrale'];
const OPINION = /\b(je pense|à mon avis|selon moi|honteux|scandale|scandaleux|incroyable|ras-le-bol|il faut que|on dirait|pour moi|nul|catastrophe|inadmissible)\b/i;
const ACCUSE = /\b(accus\w+|corromp\w+|corruption|voleur|vol[ée]|détourn\w+|escroc\w*|inculp\w+|arrêt[ée]|mandat d'arrêt|complot\w*|trahi\w*|coupable|condamn\w+)\b/i;
const FUTURE = /\b(va |vont |sera |seront |prochainement|demain)\b/i;

export function splitSentences(text) {
  return text.replace(/\s+/g, ' ').split(/(?<=[.!?…])\s+(?=[A-ZÀ-ÖØ-Þ«"“\d])/).map((s) => s.trim()).filter(Boolean);
}

export function extractEntities(s) {
  const dates = [...s.matchAll(new RegExp(`\\b(\\d{1,2}(?:er)?\\s+(?:${MONTHS})(?:\\s+\\d{4})?|(?:${MONTHS})\\s+\\d{4}|\\d{1,2}/\\d{1,2}/\\d{2,4})\\b`, 'gi'))].map((m) => m[1]);
  const countries = COUNTRIES.filter((c) => new RegExp(`\\b${c}\\b`, 'i').test(s));
  const institutions = INSTITUTIONS.filter((c) => new RegExp(`\\b${c}\\b`, 'i').test(s));
  const people = [...new Set([...s.matchAll(/(?<![.!?]\s)(?<!^)\b([A-ZÉÈ][a-zéèêàçîï]+(?:\s+[A-ZÉÈ][a-zéèêàçîï]+){1,2})\b/g)].map((m) => m[1]))]
    .filter((p) => !COUNTRIES.includes(p) && !INSTITUTIONS.includes(p) && !new RegExp(MONTHS, 'i').test(p));
  return { people: people.slice(0, 5), institutions, countries, dates };
}

export function heuristicClaims(text, max = 6) {
  const out = [];
  for (const s of splitSentences(text)) {
    if (s.length < 25) continue;
    const ent = extractEntities(s);
    const hasSignal = OPINION.test(s) || /\d/.test(s) || ent.institutions.length || ent.countries.length || ent.people.length || ACCUSE.test(s);
    if (!hasSignal) continue;
    const kind = OPINION.test(s) ? 'opinion' : ACCUSE.test(s) ? 'accusation' : FUTURE.test(s) ? 'prevision' : 'fait';
    const q = s.replace(/["«»“”]/g, '').split(/\s+/).slice(0, 14).join(' ');
    out.push({ text: s, kind, time_scope: 'indetermine', ...ent, search_queries: [kind === 'opinion' ? '' : `${q} Madagascar`].filter(Boolean) });
    if (out.length >= max) break;
  }
  return out;
}
