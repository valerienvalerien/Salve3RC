// Deux dossiers DOCUMENTAIRES (lecture seule, dupliquables), repris de la V1 (RECROISE.html).
// Ce ne sont PAS des analyses automatiques : les conclusions sont attribuées aux médias cités.
// Les pages n'ont pas pu être rouvertes lors du portage (réseau bloqué) : à relire avant toute citation.
const PORTAGE = "Chronologie et conclusions reprises de la V1 de RECROISE, attribuées aux médias cités. Les pages n'ont pas pu être rouvertes lors du portage vers la V2 (accès réseau bloqué) : à relire à la source avant toute citation publique.";

export const EXAMPLES = [
  {
    id: 'ex-25-septembre', readonly: true, example: true,
    title: '25 septembre : chômé, travaillé… puis confirmé chômé.', date: '2026-09-25',
    createdAt: '2026-10-24T00:00:00.000Z', updatedAt: '2026-10-24T00:00:00.000Z',
    input: { kind: 'texte', url: '', text: "Le vendredi 25 septembre 2026 serait finalement redevenu un jour travaillé. [Affirmation reformulée pour ce dossier historique, pas une capture originale.]" },
    analysis: {
      mode: 'documentaire', model: null, analysedAt: '2026-10-24T00:00:00.000Z',
      themes: ['Lois, décrets et annonces', 'Présidence et gouvernement'],
      summary: "Des messages contradictoires ont circulé le 24 septembre. La vérification de Studio Sifaka et le récit ultérieur de Midi Madagasikara rapportent le maintien de la journée chômée et payée.",
      limits: [PORTAGE, "Les publications institutionnelles originales ne sont pas archivées dans l'application.", "Le catalogue CNLegis et Studio Sifaka donnent des dates différentes pour le décret : sa date de signature n'est pas présentée comme définitivement vérifiée.", "Le titre de l'article Sifaka (« Faux : le vendredi 25 septembre 2026 reste un jour férié, chômé et payé ») est ambigu : lire le contenu de l'article."],
      warnings: [],
      claims: [
        { id: 'C1', text: 'Le 25 septembre 2026 est finalement redevenu un jour travaillé.', kind: 'fait', status: 'contredit', rationale: "Conclusion attribuée à Studio Sifaka (24/09) : la mise au point de la Primature confirme le maintien de la journée chômée et payée.", sourceIds: ['S1', 'S2'] },
        { id: 'C2', text: 'La page du ministère a été piratée.', kind: 'fait', status: 'insuffisant', rationale: "Midi rapporte cette explication du ministre. Elle reste une déclaration attribuée : aucune expertise technique indépendante n'est jointe au dossier. Une absence de preuve ne prouve pas l'inverse.", sourceIds: ['S2'], missing: ['Expertise technique indépendante'] },
        { id: 'C3', text: 'La date de signature du décret est définitivement vérifiée.', kind: 'fait', status: 'insuffisant', rationale: "Les références consultées donnent des dates différentes pour le décret : elle ne doit pas être présentée comme définitivement vérifiée.", sourceIds: ['S1'], contradictions: ['CNLegis et Studio Sifaka donnent des dates différentes pour le décret.'], missing: ['Texte du décret au Journal officiel / CNLegis'] },
      ],
      sources: [
        { id: 'S1', url: 'https://www.studiosifaka.org/i-verify/item/9314-faux-le-vendredi-25-septembre-2026-reste-un-jour-ferie-chome-et-paye.html', title: 'Studio Sifaka · I-Verify', publisher: 'Studio Sifaka', date: '2026-09-24', kind: 'verification', origin: 'Communications institutionnelles / vérification Sifaka', note: 'Retrace les messages contradictoires et rapporte la confirmation de la Primature à 15 h 43.', pageRead: false },
        { id: 'S2', url: 'https://midi-madagasikara.mg/journee-du-25-septembre-retropedalage-du-regime/', title: 'Midi Madagasikara · Retour sur la confusion', publisher: 'Midi Madagasikara', date: '2026-09-26', kind: 'presse', origin: 'Communications institutionnelles / intervention TV du ministre', note: "Rapporte la confirmation télévisée du ministre et son explication d'un piratage. Cette explication ne constitue pas une preuve technique.", pageRead: false },
      ],
    },
    timeline: [
      { date: '23 septembre 2026', text: "Annonce d'une journée chômée et payée, selon les récits de Sifaka et Midi." },
      { date: '24 septembre · vers 13 h', text: 'Message contraire sur la page ministérielle, rapporté par Sifaka.' },
      { date: '24 septembre · 15 h 43', text: 'Confirmation du maintien par la Primature, selon Sifaka.' },
      { date: '24 septembre · soirée', text: 'Confirmation du ministre à la télévision, rapportée par Midi le 26 septembre.' },
    ],
    humanReview: { done: false },
  },
  {
    id: 'ex-moscou-2025', readonly: true, example: true,
    title: "Une rencontre à Moscou ? Replacer l'image dans le temps.", date: '2025-10-20',
    createdAt: '2026-10-24T00:00:00.000Z', updatedAt: '2026-10-24T00:00:00.000Z',
    input: { kind: 'texte', url: '', text: "Le dirigeant malgache serait à Moscou pour un sommet et aurait signé des accords. [Reformulation du cas du 20 octobre 2025 étudié par Studio Sifaka.]" },
    analysis: {
      mode: 'documentaire', model: null, analysedAt: '2026-10-24T00:00:00.000Z',
      themes: ['Russie', 'Présidence et gouvernement'],
      summary: "Un cas historique vérifié par Studio Sifaka en octobre 2025. La conclusion concerne cette publication et cette période uniquement : elle ne préjuge d'aucun déplacement ultérieur.",
      limits: [PORTAGE, "Un fait réfuté à une date ne l'est pas nécessairement à une autre : toujours vérifier le contexte temporel."],
      warnings: [],
      claims: [
        { id: 'C1', text: "La publication d'octobre 2025 prouve un déplacement à Moscou pour un sommet.", kind: 'fait', status: 'contredit', rationale: "Studio Sifaka réfute cette publication dans sa vérification du 26 octobre 2025. Cette conclusion ne concerne pas d'éventuels déplacements ultérieurs.", sourceIds: ['S1'] },
      ],
      sources: [
        { id: 'S1', url: 'https://www.studiosifaka.org/i-verify/item/8446-le-chef-d-etat-malgache-en-deplacement-en-russie.html', title: "Studio Sifaka · Le chef d'État malgache en déplacement en Russie ?", publisher: 'Studio Sifaka', date: '2025-10-26', kind: 'verification', origin: 'Enquête Studio Sifaka', note: "Vérification existante, attribuée à son auteur ; RECROISE n'a pas réalisé cette enquête.", pageRead: false },
      ],
    },
    timeline: [
      { date: '20 octobre 2025', text: 'Date de la publication examinée, selon Sifaka.' },
      { date: '26 octobre 2025', text: 'Publication de la vérification par Studio Sifaka.' },
    ],
    humanReview: { done: false },
  },
];
