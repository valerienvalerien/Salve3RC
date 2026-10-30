/* Archivé le 2026-10-30 (offre médicale abandonnée) — retiré de CRM_Salverys.html.
   Miroir lisible : 99-Archives-Medical/02-Prospection/SCRIPTS-APPEL-telemed.md */

const CALL_SCRIPTS_TELEMED = {
    'telemed': {
        opening: {
            script: `Bonjour, <strong>{prenom}</strong> ? Je m'appelle Valérien, je suis directeur chez Salverys, on travaille avec des cabinets médicaux comme le vôtre sur la gestion des appels patients.\n\n<strong>Vous avez 2 minutes ?</strong> Je vous appelle parce qu'on aide les cabinets à ne plus rater d'appels pendant les consultations — je voulais vous demander : ça vous parle, ou c'est déjà résolu chez vous ?`,
            tip: `Ne dis JAMAIS "je sais que vous êtes occupé". Affirme la valeur en 1 phrase, puis demande la permission de continuer.`,
            danger: `Ne pitche pas. La 1re phrase doit être courte et ouvrir une question.`
        },
        qualif: {
            script: `Concrètement chez {structure} :\n\n• Combien d'appels patients par jour environ ?\n• Sur ces appels, combien finissent en répondeur ou sans réponse pendant les consultations ?\n• Vous utilisez Doctolib, Maiia, Médistory… ?\n• La secrétaire qui gère les appels aujourd'hui, c'est en interne, en libéral, ou personne ?`,
            tip: `Pose UNE question à la fois. Note les réponses. Reformule avant de continuer : "Si je comprends bien, vous perdez environ X appels par jour, c'est ça ?"`
        },
        pitch: {
            script: `Ce qu'on propose c'est simple : <strong>une télésecrétaire médicale francophone dédiée à {structure}</strong>, formée à votre logiciel, qui prend vos appels de 8h à 20h, sans congés, sans arrêt maladie.\n\nLa différence avec une secrétaire classique : on est à Madagascar, donc le tarif est environ 40 % inférieur à un prestataire en France — sans perte de qualité, le français est langue maternelle ici.\n\nForfait à partir de 350€/mois, <strong>1er mois à -50 %</strong> pour qu'on prouve la valeur avant que vous vous engagiez. Et une fois en régime, on s'engage sur le décroché : sous 90 % d'appels pris sur un mois, vous avez 20 % d'avoir le mois suivant.`,
            tip: `Termine TOUJOURS par une question fermée : "Est-ce que cet ordre de grandeur vous semble cohérent par rapport à ce que vous payez aujourd'hui ?"`
        },
        objection: 'OBJECTIONS_TELEMED',
        closing: {
            script: `Très bien {prenom}. Je vous propose qu'on fasse les choses dans l'ordre :\n\n<strong>Étape 1</strong> — je vous envoie aujourd'hui un mémo de 2 pages : ce qu'on fait exactement, prix, conditions, contrat type.\n\n<strong>Étape 2</strong> — on se reparle <strong>jeudi à 14h ou vendredi à 11h</strong> pour décider de lancer l'offre 1er mois à -50 %. Lequel des deux vous arrange ?`,
            tip: `Donne TOUJOURS deux options fermées de RDV. Jamais "quand êtes-vous dispo ?" → c'est une porte de sortie.`
        }
    },
};

const OBJECTIONS_TELEMED = [
    {
        q: "On a déjà une secrétaire physique au cabinet.",
        a: "<strong>Parfait, ce n'est pas l'un ou l'autre.</strong> La plupart de nos cabinets gardent leur secrétaire physique et nous délèguent uniquement les pics d'appels et les heures creuses où elle est en consultation avec vous. Combien d'appels votre secrétaire ne peut pas prendre aujourd'hui pendant les rendez-vous ?",
        branches: [
            { resp: "Si \"presque aucun\" →", act: "\"OK très bien. Et le midi entre 12h et 14h ?\" — creuse pour trouver un trou." },
            { resp: "Si \"pas mal en fait\" →", act: "\"C'est exactement notre cas d'usage. On prend le relais uniquement sur ces moments-là, avec un forfait mensuel calé sur votre volume.\"" }
        ]
    },
    {
        q: "Vous êtes à Madagascar, l'accent ça va poser problème aux patients âgés.",
        a: "<strong>C'est la question qu'on entend le plus.</strong> Le français est ma langue maternelle, comme pour toutes nos télésecrétaires. <strong>Je vous propose le 1er mois à -50 %</strong> : vos patients sont accueillis pour de vrai, vous jugez sur vos propres appels, et vous me dites. Si un seul patient se plaint de l'accent, on arrête, sans engagement.",
        branches: [
            { resp: "Si \"OK pour tester\" →", act: "Passe au closing → fixe RDV pour démarrer le pilote." },
            { resp: "Si \"même comme ça non\" →", act: "\"Je comprends. Acceptez juste un appel téléphonique avec une de nos secrétaires pour vous faire votre opinion. 5 minutes.\"" }
        ]
    },
    {
        q: "C'est trop cher pour un cabinet de notre taille.",
        a: "<strong>Vous payez aujourd'hui combien pour gérer vos appels — y compris le coût des rendez-vous manqués ?</strong> Un patient qui ne peut pas vous joindre, en moyenne, c'est 30€ de consultation perdue. Si on évite 15 appels manqués par mois, on est déjà à 450€. Notre forfait commence à 350€.",
        branches: [
            { resp: "Si silence ou \"je n'ai jamais calculé\" →", act: "\"Je vous propose de regarder ça ensemble. Sur le mois pilote à -50 %, on chiffre exactement.\"" },
            { resp: "Si \"pas tant de manqués que ça\" →", act: "\"Alors le plus petit forfait suffit largement — et le 1er mois à -50 % vous le confirme sans engagement.\"" }
        ]
    },
    {
        q: "Envoyez-moi un email, je regarderai.",
        a: "<strong>Bien sûr je l'envoie aujourd'hui.</strong> Pour qu'il vous soit utile : je vous le fais sur-mesure pour votre cas, mais j'ai besoin de 5 minutes maintenant pour comprendre votre volume. Sinon je vais vous envoyer un truc générique que vous allez supprimer en 30 secondes. <strong>5 minutes là, ça marche ?</strong>",
        branches: [
            { resp: "Si OK →", act: "Repasse en qualif rapide → 3 questions max → puis closing." },
            { resp: "Si toujours \"envoyez quand même\" →", act: "\"OK je vous envoie. Je vous rappelle vendredi à 11h pour en discuter ?\" — bloque le RDV maintenant." }
        ]
    },
    {
        q: "Ce n'est pas moi qui décide, c'est mon associé.",
        a: "<strong>Très bien, c'est important qu'il soit dans la boucle.</strong> Du coup je vous propose qu'on fixe directement une visio à 3 — vous, lui et moi — 20 minutes maximum. Plutôt jeudi ou vendredi cette semaine ?",
        branches: [
            { resp: "Si OK →", act: "Pose immédiatement les 2 créneaux." },
            { resp: "Si \"je vais lui en parler d'abord\" →", act: "\"OK je vous laisse mes coordonnées. Je vous relance lundi à 10h, ça vous va ?\"" }
        ]
    }
];

