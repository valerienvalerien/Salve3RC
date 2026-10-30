# PROCESS-QA-DOUBLE-ECOUTE.md — Cadrage qualité (interne)

> Process **interne** de qualité : grille QA (scorecard) + protocole de double écoute.
> Opérationnalise la promesse client (« QA, double écoute, reporting, escalades documentés
> **avant le premier appel/ticket** » — `ONEPAGER-PARTENAIRE-MB.md`). Sert aussi le levier
> **anti-turnover** (feedback structuré, pas de flicage). Les chiffres clients (seuils SLA)
> restent ceux de `PRICING.md`.
>
> Audience : managers IT (helpdesk / support applicatif). Grille médicale archivée le
> 2026-10-30 (`99-Archives-Medical/05-Process-Delivery/GRILLE-QA-medicale.md`). **Ne se transmet pas au client** (le
> client reçoit le reporting, pas la grille interne).

---

## 1. Principe

- **Cadrage qualité dès J1** : grille armée et double écoute planifiées **avant** le 1er
  appel/ticket de chaque nouveau compte.
- La **grille QA est le support unique de notation** de la double écoute (un seul référentiel).
- Objectif double : tenir le **KPI engagé** (SLA) et **faire progresser l'agent**
  sans le sur-surveiller (cohérent avec le « zéro turnover » — `CLAUDE.md`).

---

## 2. Grille QA — Helpdesk IT N1 / Support applicatif N1 (ticket)

| # | Critère | Poids | Note (0/1/2) |
|---|---|---|---|
| 1 | **Qualification** du ticket (catégorie, priorité) | 3 | |
| 2 | **Respect du SLA** (1re réponse / prise en charge selon niche) | 4 | |
| 3 | **Exactitude de la réponse / diagnostic N1** | 4 | |
| 4 | **Respect du process & des macros** du donneur d'ordre | 3 | |
| 5 | **Escalade N2** au bon moment, vers la bonne file | 3 | |
| 6 | **Traçabilité** (notes, statut, historique à jour) | 3 | |
| 7 | **Ton & marque blanche** (sous le nom du partenaire) | 2 | |
| 8 | **Clôture** (résolution confirmée / suivi) | 1 | |

- **Critères critiques (KO)** : #2 SLA et #6 traçabilité. Un **0** → fiche **rouge**.

## 3. Seuils de notation

| Zone | Score | Action |
|---|---|---|
| 🟢 Vert | ≥ 85 % | Conforme — feedback positif |
| 🟠 Orange | 70-84 % | Point d'amélioration ciblé, re-contrôle sous 1 semaine |
| 🔴 Rouge | < 70 % **ou** un critère KO à 0 | Plan d'action immédiat + double écoute rapprochée |

---

## 4. Protocole de double écoute

### Qui & quand
- **Réalisée par le manager** de l'offre (helpdesk IT ou support applicatif).
- **Cadence** :
  - **Onboarding (S1)** : renforcée — **≥ 5 écoutes/agent** la première semaine.
  - **Régime** : **≥ 2 écoutes/agent/semaine** (échantillon aléatoire sur les plages couvertes).
  - **Déclenchée** : systématique après une fiche **rouge** ou une réclamation client.
- **Échantillonnage** : aléatoire + ciblé (créneaux sensibles : soir/samedi, pics).

### Comment
1. Écoute (live ou différé sur ticket — **pas d'enregistrement d'appel par défaut**, observation
   en double ligne / poste à poste) → notation sur la **grille QA**.
2. **Restitution à l'agent sous 48 h** : 2 points forts + 1-2 axes concrets (jamais que du négatif).
3. **Plan d'action** si orange/rouge : action, échéance, re-contrôle.
4. Consignation dans le suivi qualité (score, date, axes) → alimente le **reporting** et le
   pilotage anti-turnover.

### Lien anti-turnover
La double écoute est positionnée comme **coaching**, pas comme contrôle-sanction : feedback
régulier, valorisation, montée en compétence. Cohérent avec l'objectif « zéro turnover »
(`CLAUDE.md`).

---

## 5. Escalades (documentées avant J1)

- **Niveau 1** : l'agent gère selon script/macros.
- **Niveau 2** : manager de niche (cas complexe, réclamation, doute RGPD).
- **Niveau 3 (client)** : selon la procédure figée au cadrage (interlocuteur + canal + délai).

> À instancier par compte lors de l'onboarding (`ONBOARDING-CLIENT.md`, phase 1) : la grille,
> la cadence et la chaîne d'escalade sont prêtes **avant le 1er appel/ticket**.
