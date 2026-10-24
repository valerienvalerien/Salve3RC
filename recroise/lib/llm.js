// Appels Claude (SDK officiel). Sortie JSON contrainte par schéma, puis re-validée côté serveur.
import Anthropic from '@anthropic-ai/sdk';

export class LlmError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export function createLlm(cfg) {
  if (!cfg.anthropicKey) return null;
  const client = new Anthropic({ apiKey: cfg.anthropicKey, baseURL: cfg.anthropicBaseUrl, maxRetries: 2, timeout: 120000 });

  async function create(params) {
    const base = { model: cfg.model, max_tokens: 16000, output_config: { effort: cfg.effort, format: params.format }, system: params.system, messages: params.messages };
    if (cfg.fallbacks) {
      try {
        return await client.beta.messages.create({ ...base, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' });
      } catch (e) {
        // Si l'API refuse le paramètre de repli, on retente sans (une seule fois).
        if (!(e instanceof Anthropic.BadRequestError)) throw e;
      }
    }
    return client.messages.create(base);
  }

  async function json({ system, content, schema }) {
    let res;
    try {
      res = await create({ system, messages: [{ role: 'user', content }], format: { type: 'json_schema', schema } });
    } catch (e) {
      if (e instanceof Anthropic.AuthenticationError) throw new LlmError('auth', "La clé API de l'analyse IA est refusée. Vérifiez la configuration du serveur.");
      if (e instanceof Anthropic.RateLimitError) throw new LlmError('rate', "Le service d'analyse est saturé. Réessayez dans une minute.");
      if (e instanceof Anthropic.APIConnectionError) throw new LlmError('network', "Le service d'analyse est injoignable.");
      if (e instanceof Anthropic.APIError) throw new LlmError('api', `Le service d'analyse a renvoyé une erreur (${e.status ?? 'réseau'}).`);
      throw e;
    }
    if (res.stop_reason === 'refusal') throw new LlmError('refusal', "Le modèle a refusé d'analyser ce contenu.");
    if (res.stop_reason === 'max_tokens') throw new LlmError('truncated', 'Réponse tronquée : le contenu est trop long. Raccourcissez le texte.');
    const block = (res.content || []).find((b) => b.type === 'text');
    if (!block) throw new LlmError('empty', "Réponse vide du service d'analyse.");
    try { return JSON.parse(block.text); } catch { throw new LlmError('bad_json', "Réponse du service d'analyse illisible."); }
  }

  return { json, model: cfg.model };
}

const arrStr = { type: 'array', items: { type: 'string' } };

export const CLAIMS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['themes', 'claims'],
  properties: {
    themes: { type: 'array', items: { type: 'string', enum: ['Présidence et gouvernement', 'Justice', 'Ravatomanga', 'Lois, décrets et annonces', 'Russie', 'Chine', 'France', 'Autre'] } },
    claims: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['text', 'kind', 'time_scope', 'people', 'institutions', 'countries', 'dates', 'search_queries'],
        properties: {
          text: { type: 'string' },
          kind: { type: 'string', enum: ['fait', 'opinion', 'accusation', 'prevision'] },
          time_scope: { type: 'string', enum: ['passe', 'present', 'futur', 'indetermine'] },
          people: arrStr, institutions: arrStr, countries: arrStr, dates: arrStr,
          search_queries: arrStr,
        },
      },
    },
  },
};

export const JUDGE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'sources', 'claims'],
  properties: {
    summary: { type: 'string' },
    sources: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['id', 'kind'],
        properties: { id: { type: 'string' }, kind: { type: 'string', enum: ['primaire', 'verification', 'presse', 'autre'] } },
      },
    },
    claims: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['id', 'status', 'rationale', 'evidence', 'contradictions', 'missing'],
        properties: {
          id: { type: 'string' },
          status: { type: 'string', enum: ['etaye', 'contredit', 'hors_contexte', 'insuffisant', 'opinion'] },
          rationale: { type: 'string' },
          evidence: {
            type: 'array',
            items: {
              type: 'object', additionalProperties: false, required: ['source_id', 'role', 'proves', 'quote'],
              properties: {
                source_id: { type: 'string' },
                role: { type: 'string', enum: ['confirme', 'contredit', 'contexte', 'declaration'] },
                proves: { type: 'string' },
                quote: { type: 'string' },
              },
            },
          },
          contradictions: arrStr,
          missing: arrStr,
        },
      },
    },
  },
};

export const OCR_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['text', 'legible', 'platform', 'author', 'date_shown', 'notes'],
  properties: {
    text: { type: 'string' }, legible: { type: 'boolean' },
    platform: { type: 'string' }, author: { type: 'string' }, date_shown: { type: 'string' }, notes: { type: 'string' },
  },
};
