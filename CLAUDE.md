# CLAUDE.md — slvrs

## Contexte activité

BPO basé à Antananarivo (Madagascar) ciblant des clients **français**.
Direction expérimentée qui repart de zéro avec une équipe de **10 personnes**.

> ⚠️ **Claim interdit (décision 2026-06-12)** : « direction issue d'une structure de
> 1 000 collaborateurs » était une consigne de persona initiale, **pas la réalité**.
> Ne plus jamais l'utiliser dans aucun livrable, email, page ou support. Mettre en
> avant à la place : process documentés, cadrage qualité (script, double écoute,
> reporting), pilote mesuré.

### Offres (par priorité) — décision Valérien, 2026-10-30
1. **Helpdesk IT N1 pour ESN et MSP** (offre principale)
2. **Support applicatif N1 pour éditeurs de logiciels et SaaS** (offre secondaire)

> ⛔ **Télésecrétariat médical abandonné** (décision confirmée par Valérien le
> 2026-10-30) : ne plus le proposer dans aucun livrable, email, page, devis, séquence ou
> CRM. Tout le contenu médical est archivé dans `99-Archives-Medical/` (grilles tarifaires :
> `PRICING.md §A`). Le segment **Bailleurs sociaux & grandes structures** (ex-priorité 3)
> est archivé lui aussi : `99-Archives-Bailleurs/` et `PRICING.md §B`.

### Séquence de développement (toujours dans cet ordre)
**Prospection → Équipe → Infrastructure**

### Stratégie GTM (décision direction, 2026-06-10 ; périmètre révisé 2026-10-30)
**Objectif prioritaire : démarrer en MARQUE BLANCHE sur les 2 offres** (sous-traitance
de donneurs d'ordre : **ESN/MSP** pour le helpdesk IT N1, **éditeurs / prestataires de
support** pour le support applicatif N1). Le direct (client final) vient en 2e temps.
Toute priorisation de prospection, de copy ou de chiffrage doit refléter ce MB-first.

### Modèle d'équipe (décision 2026-10-30)
Recrutement en **CDI** (et non plus en freelances). Remplace le modèle du 2026-06-10
(« 100 % freelances à 1,8-2 M Ar/mois, 2 managers dont 1 médical »). Niveau de
rémunération, effectif de démarrage et encadrement (le poste de manager médical disparaît)
restent à préciser. L'objectif « zéro turnover » du modèle précédent reste la référence
tant qu'il n'est pas redéfini.

> ⚠️ `01-Strategie-Offre/FINANCE-PREVISIONNEL.md` (v2) et `tresorerie-salverys.html`
> reposent encore sur l'**ancien modèle** (freelances, sans charges sociales, manager
> médical, revenus médicaux) : à refaire avant toute décision chiffrée. Idem pour le
> plancher « coût + 20 % ≈ 540 €/ETP » de `PRICING.md §3`, calculé sur le coût freelance.

### Avantage compétitif
- Fuseau horaire compatible avec la France
- Français langue maternelle
- Coût ~40 % inférieur à un prestataire hexagonal (démonstration à revalider pour les
  offres IT : `PRICING.md §5`)

## Marque

**Nom commercial retenu : Salverys** (temporaire mais à utiliser partout pour
l'instant). Remplace les anciens noms **Nesvalo** et **Vinlo**, qui ne doivent
plus apparaître dans aucun livrable, séquence, CRM ou support client.

> Note technique : depuis le 2026-05-29, les clés `localStorage` du CRM
> (`CRM_Salverys.html`) sont préfixées `salverys_`. L'ancien stockage `vinlo_`/
> `nesvalo_` a été abandonné ; les CRM ouverts après cette date repartent du
> seed. Depuis le 2026-10-30, le seed ne contient plus que les **12 leads ESN/MSP** :
> les leads médicaux et Bailleurs sont archivés (`99-Archives-*/crm/`) et, dans un CRM
> déjà utilisé, déplacés au premier chargement vers la clé `salverys_archive_2026_10_v1`.

## Outils retenus
- **Cold mailing : Emelia** (outil de prospection email retenu)

## Source de vérité tarifaire

Tous les prix, grilles, benchmarks et conditions (essai/offre de lancement) sont
définis dans **`PRICING.md`** — c'est la **source unique de vérité**. Toute copy
(emails `OUTREACH-*`, CRM, simulateurs, `index.html`) doit s'aligner dessus ; en cas
de divergence, `PRICING.md` fait foi. Réflexion détaillée : `RAPPORT-PRIX.html`
(antérieur à l'abandon du médical).

Rappels clés : priorités = **1) Helpdesk IT N1 (ESN/MSP) · 2) Support applicatif N1
(éditeurs de logiciels & SaaS)** — médical et Bailleurs archivés (`PRICING.md §A / §B`) ;
offre de lancement = **1er mois à -50 %** (et non plus essai gratuit) ;
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
- Partir des offres, canaux et stratégies déjà définis ci-dessus.
