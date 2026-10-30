# Salve2 — Salverys

Dépôt de travail Salverys (BPO Antananarivo → clients FR). Contient la **documentation
business** (rangée par dossiers thématiques ci-dessous) et le **site/CRM** (fichiers HTML
+ `assets/` + `tools/`, à la racine — chemins codés en dur, ne pas déplacer).

## À la racine (contexte permanent)

| Fichier | Rôle |
|---|---|
| `CLAUDE.md` | Instructions projet (contexte, marque, règles) — **doit rester à la racine** |
| `PRICING.md` | **Source unique de vérité tarifaire** — référencé partout |
| `ESPACE-CLIENT-CANDIDAT.md` | Procédure de build des espaces protégés (couplée aux HTML/`tools/`) |

## Documentation par dossier (ordre du funnel)

| Dossier | Contenu |
|---|---|
| `01-Strategie-Offre/` | Offre irrésistible, éval. stratégique, prévisionnel, branding, arguments Priority |
| `02-Prospection/` | Séquences cold (`OUTREACH-*`), scripts d'appel, one-pager partenaire MB |
| `03-Cibles-Prospects/` | Analyses prospects (`PROSPECT-ANALYSIS-*`), décideurs, cibles ESN/MSP, ICP |
| `04-Closing/` | Devis, contrat de prestation, DPA/RGPD, onboarding client |
| `05-Process-Delivery/` | Grille QA + double écoute, modèles de reporting client |
| `06-Warmup-Email/` | Warm-up email (démarrage, manuel) |
| `99-Archives-Medical/` | **Archives — télésecrétariat médical, offre abandonnée le 2026-10-30** (docs, pages du site, leads et scripts CRM). Ne plus utiliser. |
| `99-Archives-Bailleurs/` | **Archives — segment Bailleurs sociaux & grandes structures** (archivé le 2026-10-30 : séquence, ICP, leads CRM). Ne plus utiliser. |

## Site / CRM (racine — ne pas déplacer)

`index.html`, `CRM_Salverys.html`, simulateurs (helpdesk IT, support applicatif), espaces client/candidat, chartes,
`assets/`, `tools/`. Build : `tools/build-site.sh`.
