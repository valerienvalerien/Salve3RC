// Deux dossiers DOCUMENTAIRES (lecture seule, dupliquables). Ce ne sont PAS des analyses automatiques :
// ils reprennent la chronologie rapportée par les médias cités. Aucune citation n'est inventée (quote vide).
const NOTE_RELECTURE = "Cette version de RECROISE n'a pas pu rouvrir la page le 24/10/2026 (accès réseau bloqué dans l'environnement de développement) : elle reprend la chronologie transmise par l'équipe. À relire à la source avant toute citation.";

export const EXAMPLES = [
  {
    id: 'ex-25-septembre', readonly: true, example: true,
    title: '25 septembre 2026 : jour chômé et payé, ou pas ?',
    createdAt: '2026-10-24T00:00:00.000Z', updatedAt: '2026-10-24T00:00:00.000Z',
    input: { kind: 'texte', url: '', text: "Le vendredi 25 septembre 2026 est-il férié, chômé et payé ? Une annonce, puis un message contraire, puis une confirmation, puis une explication par un piratage." },
    analysis: {
      mode: 'documentaire', model: null, analysedAt: '2026-10-24T00:00:00.000Z',
      themes: ['Lois, décrets et annonces', 'Présidence et gouvernement'],
      summary: "Chronologie rapportée par deux médias : une journée chômée et payée est annoncée pour le 25 septembre 2026, un message contraire circule le 24 septembre, le maintien est ensuite confirmé, et le ministre avance une explication par un piratage. RECROISE n'a pas mené l'enquête initiale : la conclusion est attribuée aux médias cités. L'explication du piratage reste une déclaration, sans preuve technique indépendante disponible. La date de signature du décret diffère selon les références consultées : elle n'est pas présentée comme vérifiée.",
      limits: [NOTE_RELECTURE, "Les publications institutionnelles originales (communiqués, décret) ne sont pas archivées dans l'application.", "Le titre de l'article Studio Sifaka (« FAUX : le vendredi 25 septembre 2026 reste un jour férié, chômé et payé ») peut se lire de deux façons : seule la lecture du contenu de l'article tranche."],
      warnings: [],
      claims: [
        { id: 'C1', text: "Une journée chômée et payée a été annoncée pour le vendredi 25 septembre 2026.", kind: 'fait', status: 'etaye', rationale: "Rapporté par les deux sources citées. Cela établit qu'une annonce a été faite, pas les détails juridiques.", sourceIds: ['S1', 'S2'] },
        { id: 'C2', text: "Un message contraire a été diffusé le 24 septembre 2026.", kind: 'fait', status: 'etaye', rationale: "Fait rapporté dans la chronologie des sources consultées. Le message original n'est pas archivé ici.", sourceIds: ['S1', 'S2'] },
        { id: 'C3', text: "Le maintien de la journée chômée et payée a ensuite été confirmé.", kind: 'fait', status: 'etaye', rationale: "Confirmation rapportée par les sources. Une confirmation officielle primaire reste à archiver.", sourceIds: ['S1', 'S2'] },
        { id: 'C4', text: "Le ministre a expliqué le message contraire par un piratage.", kind: 'fait', status: 'etaye', rationale: "Établit seulement que cette explication a été avancée par le ministre, selon les médias.", sourceIds: ['S2'] },
        { id: 'C5', text: "Le message contraire résultait réellement d'un piratage.", kind: 'fait', status: 'insuffisant', rationale: "Explication attribuée au ministre. Aucune preuve technique indépendante n'est disponible dans les sources consultées. Une absence de preuve ne prouve pas l'inverse.", sourceIds: [], missing: ["Expertise technique indépendante", "Communiqué officiel détaillant l'incident"] },
        { id: 'C6', text: "Le décret a été signé à une date précise (date de signature).", kind: 'fait', status: 'insuffisant', rationale: "Les références consultées divergent sur la date du décret : elle ne doit pas être présentée comme définitivement vérifiée.", sourceIds: ['S1', 'S2'], contradictions: ["Divergence de dates entre les références consultées."], missing: ["Texte du décret au Journal officiel"] },
      ],
      sources: [
        { id: 'S1', url: 'https://www.studiosifaka.org/i-verify/item/9314-faux-le-vendredi-25-septembre-2026-reste-un-jour-ferie-chome-et-paye.html', title: "Studio Sifaka i-Verify — « Faux : le vendredi 25 septembre 2026 reste un jour férié, chômé et payé »", publisher: 'Studio Sifaka', date: null, kind: 'verification', pageRead: false },
        { id: 'S2', url: 'https://midi-madagasikara.mg/journee-du-25-septembre-retropedalage-du-regime/', title: "Midi Madagasikara — « Journée du 25 septembre : rétropédalage du régime »", publisher: 'Midi Madagasikara', date: null, kind: 'presse', pageRead: false },
      ],
    },
    humanReview: { done: false },
  },
  {
    id: 'ex-moscou-2025', readonly: true, example: true,
    title: "Déplacement du chef de l'État à Moscou (octobre 2025)",
    createdAt: '2026-10-24T00:00:00.000Z', updatedAt: '2026-10-24T00:00:00.000Z',
    input: { kind: 'texte', url: '', text: "Publication d'octobre 2025 évoquant un déplacement du dirigeant malgache en Russie." },
    analysis: {
      mode: 'documentaire', model: null, analysedAt: '2026-10-24T00:00:00.000Z',
      themes: ['Russie', 'Présidence et gouvernement'],
      summary: "Vérification historique datée d'octobre 2025, sur une publication évoquant un déplacement du dirigeant malgache à Moscou. Le contenu de l'article de vérification n'a pas pu être relu dans cet environnement : aucun verdict n'est donc rendu ici. Cette fiche ne préjuge d'aucun déplacement ultérieur.",
      limits: [NOTE_RELECTURE, "Date et contexte conservés : octobre 2025. Une information historique ne s'applique pas automatiquement au présent."],
      warnings: [],
      claims: [
        { id: 'C1', text: "Le chef de l'État malgache se serait déplacé en Russie (publication d'octobre 2025).", kind: 'fait', status: 'insuffisant', rationale: "Un article Studio Sifaka i-Verify traite cette publication, mais son contenu n'a pas été relu ici : le verdict de ce média doit être lu à la source. Ne pas étendre cette vérification à d'autres dates.", sourceIds: ['S1'], missing: ["Lecture du verdict de l'article de vérification", "Sources primaires (agenda officiel, communiqués)"] },
      ],
      sources: [
        { id: 'S1', url: 'https://www.studiosifaka.org/i-verify/item/8446-le-chef-d-etat-malgache-en-deplacement-en-russie.html', title: "Studio Sifaka i-Verify — « Le chef d'État malgache en déplacement en Russie »", publisher: 'Studio Sifaka', date: null, kind: 'verification', pageRead: false },
      ],
    },
    humanReview: { done: false },
  },
];
