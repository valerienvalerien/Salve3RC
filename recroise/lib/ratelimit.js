// Limiteur simple en mémoire (par IP). Suffisant pour une démo ; à remplacer derrière un proxy en production.
export function createLimiter(perMin) {
  const hits = new Map();
  return (ip) => {
    const now = Date.now();
    const arr = (hits.get(ip) || []).filter((t) => now - t < 60000);
    arr.push(now); hits.set(ip, arr);
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > 60000) hits.delete(k);
    return arr.length <= perMin;
  };
}
