// Configuration lue une seule fois depuis l'environnement. Les clés ne quittent jamais le serveur.
export function loadConfig(env = process.env, overrides = {}) {
  const searchProvider =
    env.SEARCH_PROVIDER ||
    (env.BRAVE_API_KEY ? 'brave' : env.TAVILY_API_KEY ? 'tavily' : 'duckduckgo');
  return {
    port: Number(env.PORT) || 8080,
    anthropicKey: env.ANTHROPIC_API_KEY || '',
    anthropicBaseUrl: env.ANTHROPIC_BASE_URL_RECROISE || undefined,
    model: env.RECROISE_MODEL || 'claude-opus-5-5',
    effort: env.RECROISE_EFFORT || 'medium',
    fallbacks: env.RECROISE_FALLBACKS !== '0',
    searchProvider,
    braveKey: env.BRAVE_API_KEY || '',
    tavilyKey: env.TAVILY_API_KEY || '',
    braveBaseUrl: 'https://api.search.brave.com',
    tavilyBaseUrl: 'https://api.tavily.com',
    ddgUrl: 'https://html.duckduckgo.com/html/',
    allowPrivateHosts: false, // réservé aux tests
    maxImageBytes: 5 * 1024 * 1024,
    maxTextChars: 12000,
    maxClaims: 6,
    maxSources: 10,
    rateLimitPerMin: 30,
    maxConcurrentAnalyses: 3,
    ...overrides,
  };
}

export function capabilities(cfg) {
  const searchReady =
    (cfg.searchProvider === 'brave' && !!cfg.braveKey) ||
    (cfg.searchProvider === 'tavily' && !!cfg.tavilyKey) ||
    cfg.searchProvider === 'duckduckgo';
  return {
    llm: !!cfg.anthropicKey,
    model: cfg.anthropicKey ? cfg.model : null,
    search: searchReady ? cfg.searchProvider : null,
    searchKeyed: cfg.searchProvider !== 'duckduckgo' && searchReady,
    serverOcr: !!cfg.anthropicKey,
    maxImageBytes: cfg.maxImageBytes,
    maxTextChars: cfg.maxTextChars,
  };
}
