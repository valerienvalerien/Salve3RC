# MODELE-REPORTING-CLIENT.md — Modèles de reporting client Salverys

> Gabarit de reporting **envoyé au client** (≠ grille QA interne). Tient la promesse
> « reporting hebdo » MB (`ONEPAGER-PARTENAIRE-MB.md`) et « reporting mensuel » du site.
> Le client **mesure, ne croit pas sur parole**. Variantes médicales archivées le 2026-10-30
> (`99-Archives-Medical/05-Process-Delivery/REPORTING-medical.md`).
>
> Seuils & garanties : `PRICING.md §7` fait foi (SLA figé au cadrage, avoir **20 %**
> automatique si non tenu, max 1 mois/12). Remplir les `[ ]` ; ne pas inventer de chiffre.

---

# MB partenaire (cadence HEBDOMADAIRE)

```
REPORTING SALVERYS (marque blanche) — [Partenaire] — Semaine [S / du .. au ..]
Offre : [Helpdesk IT N1 / Support applicatif N1]
```

### Bloc KPI selon l'offre (garder le bloc pertinent)

**Helpdesk IT N1 (ITIL)** — offre principale — KPI : SLA de prise en charge

| Indicateur | Valeur | Cible | Statut |
|---|---|---|---|
| SLA prise en charge respecté | [ ] % | [seuil cadrage] | 🟢/🟠/🔴 |
| Tickets pris en charge / résolus N1 | [ ] / [ ] | | |
| Taux d'escalade N2 | [ ] % | | |

**Support applicatif N1** — offre secondaire — KPI : SLA de première réponse

| Indicateur | Valeur | Cible | Statut |
|---|---|---|---|
| SLA 1re réponse respecté | [ ] % | [seuil cadrage] | 🟢/🟠/🔴 |
| Tickets traités / résolus N1 | [ ] / [ ] | | |
| Taux d'escalade N2 | [ ] % | | |

### Communs aux deux offres

| Indicateur | Valeur |
|---|---|
| ETP actifs sur le compte | [ ] |
| Escalades notables (incidents, réclamations) | [ ] |
| Backup déclenché (absences couvertes) | [oui/non] |

**Engagement de service** : KPI [ ] % vs seuil convenu.
→ Si non tenu sur le mois civil : **avoir de 20 %** automatique sur la facture suivante
(max 1 mois/12) — statut : [appliqué / sans objet], compteur annuel [n/1].

**Lecture de la semaine** : [2-3 lignes — volume vs capacité, créneaux sous tension, points
à arbitrer avec le partenaire, opportunités d'extension de périmètre.]

---

## Règles de remplissage

- **Statut couleur** : 🟢 cible atteinte · 🟠 sous la cible mais dans la marge · 🔴 sous le
  seuil engagé (déclenche le suivi avoir).
- L'avoir 20 % s'apprécie **par mois civil** et **en régime uniquement** (pas pendant le mois
  pilote) — cf. conditions de défense, `PRICING.md §7` / contrat art. 6.
- Ne jamais publier les chiffres MB hors du partenaire concerné (confidentiel).
