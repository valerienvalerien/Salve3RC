# CLAUDE.md — slvrs

## Contexte activité

Support IT et applicatif N1 en marque blanche, basé à Antananarivo (Madagascar), ciblant
des clients **français** d'abord, puis Belgique, Suisse et Québec.
**Fondateur seul au démarrage** (Valérien) : pas encore de salarié, de client ni de locaux.
Ne jamais écrire « notre équipe », « nos agents », « nos clients » tant qu'ils n'existent pas.
Référence à jour : dossier de contexte Salverys du 2026-10-02.

> ⚠️ **Claim interdit (décision 2026-06-12)** : « direction issue d'une structure de
> 1 000 collaborateurs » était une consigne de persona initiale, **pas la réalité**.
> Ne plus jamais l'utiliser dans aucun livrable, email, page ou support. Mettre en
> avant à la place : process documentés, cadrage qualité (script, double écoute,
> reporting), pilote mesuré.

### Offres (par priorité, confirmé 2026-10-30)
1. **Helpdesk IT N1** pour ESN et MSP (offre principale), jusqu'à ~40-50 salariés
2. **Support applicatif N1** pour éditeurs de logiciels et SaaS (offre secondaire)

Le **télésecrétariat médical est abandonné** : ne plus le proposer ni le prioriser.
`PRICING.md` et les pages médicales restent à aligner sur cette décision.

### Séquence de développement (toujours dans cet ordre)
**Prospection → Équipe → Infrastructure**

### Stratégie GTM (décision direction, 2026-06-10)
**Objectif prioritaire : démarrer en MARQUE BLANCHE** (sous-traitance de donneurs
d'ordre : ESN/MSP, éditeurs). Le direct (client final) vient en 2e temps. Toute priorisation de prospection,
de copy ou de chiffrage doit refléter ce MB-first.

### Modèle d'équipe (confirmé 2026-10-30)
Recrutement en **CDI**, à la signature des contrats, sur les postes qu'ils financent, avec
une grille de progression. Français testé à l'oral et à l'écrit. **Zéro turnover** :
ambition forte et culture RH, jamais présentée comme une garantie.
L'ancien modèle « 100 % freelances à 1,8-2 M Ar/mois, 2 managers dont 1 médical » est
caduc ; `01-Strategie-Offre/FINANCE-PREVISIONNEL.md` (v2) repose encore dessus et reste à
mettre à jour.

### Avantage compétitif
- Fuseau horaire compatible avec la France
- Français langue maternelle
- Coût ~40 % inférieur à un prestataire hexagonal

## Marque

**Nom commercial retenu : Salverys** (temporaire mais à utiliser partout pour
l'instant). Remplace les anciens noms **Nesvalo** et **Vinlo**, qui ne doivent
plus apparaître dans aucun livrable, séquence, CRM ou support client.

> Note technique : depuis le 2026-05-29, les clés `localStorage` du CRM
> (`CRM_Salverys.html`) sont préfixées `salverys_`. L'ancien stockage `vinlo_`/
> `nesvalo_` a été abandonné ; les CRM ouverts après cette date repartent du
> seed (180 leads + décideurs vérifiés sont définis dans le code).

## Outils retenus
- **Cold mailing : Emelia** (outil de prospection email retenu)

## Source de vérité tarifaire

Tous les prix, grilles, benchmarks et conditions (essai/offre de lancement) sont
définis dans **`PRICING.md`** — c'est la **source unique de vérité**. Toute copy
(emails `OUTREACH-*`, CRM, simulateurs, `index.html`) doit s'aligner dessus ; en cas
de divergence, `PRICING.md` fait foi. Réflexion détaillée : `RAPPORT-PRIX.html`.

Rappels clés : priorités = **1) Helpdesk IT N1 ESN/MSP · 2) Support applicatif N1
éditeurs** (le médical est abandonné ; les grilles médicales de `PRICING.md` sont caduques) ; offre de lancement = **1er mois à -50 %** (et non plus essai gratuit) ;
modèles de tarification = **ETP par position > à l'heure > à l'interaction**.

## Règle d'arbitrage : SaaS-first avant tout code maison

Avant de proposer d'implémenter une fonctionnalité dans le CRM ou dans un
projet, se poser systématiquement :

- **Est-ce qu'un SaaS résout déjà ça mieux et plus vite ?**
- **Le coût de maintenance du code maison vaut-il l'économie sur l'abonnement ?**

Si un outil externe est clairement supérieur : **le dire en premier**, avant de
proposer une implémentation technique. Cela vaut en priorité pour :
- l'**analytics**,
- les **solutions de paiement**,
- la **facturation**,
- le **tracking email**.

Le réflexe par défaut est d'acheter, pas de construire. Le code maison se
justifie seulement quand aucun SaaS ne couvre le besoin, ou quand le coût/la
dépendance du SaaS dépasse clairement le coût de maintenance.

## Style de travail attendu
- Toujours répondre en **français**.
- Être **direct et opérationnel**.
- Partir des niches, canaux et stratégies déjà définis ci-dessus.
