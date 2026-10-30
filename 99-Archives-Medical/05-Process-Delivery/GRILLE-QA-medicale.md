# Archive — Grille QA variante médicale (appel patient)

> ⛔ **Offre abandonnée le 2026-10-30** (décision Valérien). Section extraite telle quelle de
> `05-Process-Delivery/PROCESS-QA-DOUBLE-ECOUTE.md`. Ne plus utiliser.

## 2. Grille QA — Variante MÉDICAL (appel patient)

Notation par critère : **2 = conforme · 1 = partiel · 0 = non conforme**. Score = points
obtenus / points possibles, ramené sur 100.

| # | Critère | Poids | Note (0/1/2) |
|---|---|---|---|
| 1 | **Décroché** dans le délai cible (sonneries) | 3 | |
| 2 | **Accueil sous le nom du cabinet**, formule convenue | 2 | |
| 3 | **Respect du script** & des consignes du cabinet | 3 | |
| 4 | **Exactitude de la saisie agenda** (RDV, coordonnées, motif) | 4 | |
| 5 | **Secret médical / RGPD** (pas d'enregistrement, pas d'info hors besoin) | 4 | |
| 6 | **Qualification** correcte (urgence vs RDV, bon créneau) | 2 | |
| 7 | **Ton & posture** (courtoisie, écoute, débit) | 2 | |
| 8 | **Clôture** (récapitulatif, prise de congé) | 1 | |
| 9 | **Escalade** appliquée quand requise | 2 | |

- **Critères critiques (KO)** : #4 exactitude saisie et #5 secret médical/RGPD. Un **0** sur
  un critère KO → fiche marquée **rouge** quel que soit le total.
