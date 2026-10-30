# 99-Archives-Medical — Télésecrétariat médical (offre abandonnée)

> ⛔ **Offre abandonnée le 2026-10-30** (décision confirmée par Valérien). Offres actives :
> **1) Helpdesk IT N1 pour ESN & MSP (principale) · 2) Support applicatif N1 pour éditeurs
> de logiciels & SaaS (secondaire)** — cf. `CLAUDE.md` et `PRICING.md`.
>
> Ce dossier conserve **pour mémoire uniquement** tout ce qui concernait le médical. **Ne
> plus utiliser** ces contenus (prix, arguments, séquences, scripts, leads) dans aucun
> livrable, email, page, devis ou CRM. Les grilles tarifaires médicales sont archivées dans
> `PRICING.md §A` (pas ici).

## Contenu et emplacement d'origine

| Fichier archivé | Origine | Nature |
|---|---|---|
| `01-Strategie-Offre/OFFRE-MEDICAL.md` | `01-Strategie-Offre/` | Fichier entier (déplacé) |
| `01-Strategie-Offre/CONFORMITE-HDS-RGPD.md` | `01-Strategie-Offre/` | Fichier entier (déplacé) |
| `01-Strategie-Offre/NARRATIF-HYBRIDE-CALLBOT.md` | `01-Strategie-Offre/` + doublon identique à la racine (supprimé) | Fichier entier (déplacé) |
| `02-Prospection/OUTREACH-cabinets-medicaux.md` | `02-Prospection/` | Fichier entier (déplacé) |
| `02-Prospection/OUTREACH-telesec-marque-blanche.md` | `02-Prospection/` | Fichier entier (déplacé) |
| `02-Prospection/ONEPAGER-CHAINES-MEDICAL.md` | `02-Prospection/` | Fichier entier (déplacé) |
| `02-Prospection/OUTREACH-SEQUENCE-medical.md` | `02-Prospection/OUTREACH-SEQUENCE.md` | Section § 1 extraite |
| `02-Prospection/SCRIPTS-APPEL-telemed.md` | `02-Prospection/SCRIPTS-APPEL.md` | Section `CALL_SCRIPTS.telemed` extraite |
| `03-Cibles-Prospects/TELESEC-TARGETS.md` | `03-Cibles-Prospects/` | Fichier entier (déplacé) |
| `03-Cibles-Prospects/PROSPECT-ANALYSIS-{Callmed,Thelem,Vocallz}.md` | `03-Cibles-Prospects/` | Fichiers entiers (télésecrétariats) |
| `03-Cibles-Prospects/ICP-sections-medicales.md` | `03-Cibles-Prospects/IDEAL-CUSTOMER-PROFILE.md` | Sections extraites |
| `04-Closing/MODELE-DEVIS-variante-medicale.md` | `04-Closing/MODELE-DEVIS.md` | Variante A + bloc télésec MB |
| `04-Closing/MODELE-CONTRAT-annexe-medicale.md` | `04-Closing/MODELE-CONTRAT-PRESTATION.md` | Annexe A + clauses médicales |
| `04-Closing/MODELE-DPA-RGPD-version-medicale.md` | `04-Closing/MODELE-DPA-RGPD.md` | Copie intégrale avant réécriture IT |
| `05-Process-Delivery/GRILLE-QA-medicale.md` | `05-Process-Delivery/PROCESS-QA-DOUBLE-ECOUTE.md` | Grille QA médicale |
| `05-Process-Delivery/REPORTING-medical.md` | `05-Process-Delivery/MODELE-REPORTING-CLIENT.md` | Variantes médicales |
| `site/simulateur-salverys.html` | racine (page publique) | Retirée du site ; l'URL redirige vers `/` |
| `site/simulateur-medical.js` | `assets/site.js` | Bloc JS du simulateur médical |
| `site/espace-client-medical.html` | racine (page publique chiffrée) | Retirée du site ; l'URL redirige vers `/espace-client.html` |
| `site/espace-contenu-medical.html` | `tools/` | Source en clair de l'espace médical |
| `site/apercu-boutons-med.html` | racine | Aperçu de design |
| `crm/leads-medicaux.json` | `CRM_Salverys.html` (seed) | 153 leads `telemed` / `telesec-mb`, fiches enrichies (décideurs inclus) |
| `crm/call-scripts-telemed.js` | `CRM_Salverys.html` | `CALL_SCRIPTS.telemed` + `OBJECTIONS_TELEMED` |

## Remarques

- Les pages HTML archivées référencent `assets/` en chemin relatif : ouvertes depuis ce
  dossier, elles s'affichent sans style. Elles ne sont plus publiées (`tools/build-site.sh`).
- Dans un CRM déjà utilisé, les leads médicaux et Bailleurs sont déplacés au premier
  chargement vers la clé `localStorage` `salverys_archive_2026_10_v1` (rien n'est supprimé).
- Documents datés laissés en place (historique, non modifiés) : `RAPPORT-PRIX.html`,
  `prompt-prix*.html`, `EVALUATION-STRATEGIQUE-2026-06.md`, `HANDOFF-scripts-appel.md`,
  `01-Strategie-Offre/FINANCE-PREVISIONNEL.md` (à refaire, cf. `CLAUDE.md`).
