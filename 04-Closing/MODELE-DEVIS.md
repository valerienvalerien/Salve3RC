# MODELE-DEVIS.md — Gabarit de devis Salverys

> Gabarit de devis prêt à compléter. **Variante active : MB partenaire** (Helpdesk IT N1,
> puis Support applicatif N1 — rate card remise au cadrage sous NDA). La variante A
> « médical direct » et le bloc télésecrétariat MB sont archivés depuis le 2026-10-30
> (offre abandonnée) : `99-Archives-Medical/04-Closing/MODELE-DEVIS-variante-medicale.md`.
> **Source de vérité prix : `PRICING.md`** — en cas de divergence, `PRICING.md` fait foi.
>
> Règles fixes : forfait/ETP **jamais à l'appel côté client final** · offre de lancement
> = **1er mois à −50 %** (jamais « essai gratuit ») · **cadrage & mise en place — offerts** ·
> on dit **« forfait »** / « contrat de service », jamais « abonnement » · le prix MB figure dans le
> devis au partenaire (c'est l'acheteur) mais **ne se recopie jamais dans un support public**.
>
> Identité juridique en cours d'enregistrement → laisser les placeholders `[...]` tant que
> non renseignés. Ne rien inventer (SIREN, préavis, outil de paiement).

---

## En-tête commun (à reprendre sur chaque devis)

```
SALVERYS — [Salverys — raison sociale]
[forme juridique + immatriculation]
[adresse — Antananarivo, Madagascar]
Représentant : Valérien Rakotosalama
contact@salverys.fr

DEVIS N° [AAAA-MM-XXX]
Date d'émission : [JJ/MM/AAAA]
Validité du devis : 30 jours

Client : [CLIENT — raison sociale]
SIREN/SIRET : [__________]
Adresse : [__________]
Contact : [nom — fonction — email]
```

Devise : **euro (€)**. Facturation **mensuelle**, à terme échu, le [jour] de chaque mois.

---

# VARIANTE B — MB partenaire (sous-traitance)

> Le partenaire (donneur d'ordre) est l'acheteur : la rate card figure **dans son devis**.
> Elle reste **confidentielle (NDA)** et ne doit **jamais** apparaître sur un support public.
> Garder uniquement le bloc de l'offre concernée.

## B.1 — Helpdesk IT N1 (ITIL, ETP par position, dégressif) — offre principale

| Engagement | Prix MB €/mois/ETP | Nb ETP | Total / mois |
|---|---|---|---|
| 1 ETP | **2 000 €** | [ ] | [ ] € |
| 3 ETP | **1 750 €** | [ ] | [ ] € |
| 5+ ETP | **1 550 €** | [ ] | [ ] € |

KPI engagé : **SLA de prise en charge**. Option **Priority** (capacité réservée non
mutualisée, backup intégré) : multiplicateur `1,10 + 0,90/n` (`PRICING.md §3`).

## B.2 — Support applicatif N1 (ETP par position, dégressif) — offre secondaire

| Engagement | Prix MB €/mois/ETP | Nb ETP | Total / mois |
|---|---|---|---|
| 1 ETP | **1 700 €** | [ ] | [ ] € |
| 3 ETP | **1 500 €** | [ ] | [ ] € |
| 5+ ETP | **1 350 €** | [ ] | [ ] € |

KPI engagé : **SLA de première réponse**. Option **Priority** idem B.1.

## B.3 Mise en service & offre de lancement (MB)

- SETUP : **cadrage & mise en place — offerts** (afficher la valeur, facturer 0 €).
- **Mois pilote à −50 %**, sans engagement, sur périmètre limité (débordement ou lot de
  **200-400 tickets**) défini au cadrage.

## B.4 Engagement de service (MB, en régime)

KPI convenu par offre (SLA de prise en charge / SLA de 1re réponse). En deçà du seuil
sur un mois civil → **avoir de 20 %** automatique sur la facture suivante, max 1 mois/12.
Seuil exact **figé au cadrage**.

## B.5 Modalités (MB partenaire)

- **Marque blanche totale** : scripts, outils, SLA et **nom du partenaire**.
- **Durée** : engagement initial **3 mois (pilote)**, puis **12 mois renouvelable**
  (24-36 mois réservés aux grands comptes avec dégressif).
- Backup **+1 agent par compte**. Plan de continuité écrit remis avant démarrage.
- Facturation mensuelle, paiement à [__ jours] par [moyen de paiement à préciser].

---

## Pied de devis commun

```
Conditions : prestations régies par le contrat de prestation de services Salverys
(MODELE-CONTRAT-PRESTATION.md) et son annexe RGPD/DPA (MODELE-DPA-RGPD.md),
qui prévalent en cas de contradiction avec le présent devis.

Bon pour accord — le [JJ/MM/AAAA]
Nom, fonction, signature du client :
```
