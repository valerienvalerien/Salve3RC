> ⛔ **Archive — version médicale du DPA** (offre de télésecrétariat médical abandonnée le
> 2026-10-30, décision Valérien). Copie intégrale de `04-Closing/MODELE-DPA-RGPD.md` avant
> sa réécriture pour le Helpdesk IT N1 et le Support applicatif N1. Ne plus utiliser.

# MODELE-DPA-RGPD.md — Accord de sous-traitance (art. 28 RGPD) + transfert hors-UE (art. 46)

> Annexe au contrat de prestation (`MODELE-CONTRAT-PRESTATION.md`, art. 11), **partie
> intégrante** du contrat. Encadre le traitement de données à caractère personnel par
> Salverys, **sous-traitant** opérant depuis Madagascar (hors UE/EEE).
>
> Fondé sur l'analyse `CONFORMITE-HDS-RGPD.md`. Principe directeur : **Salverys ne crée et
> n'héberge aucune donnée de santé** — les agents travaillent **dans les outils HDS du
> Client** (Doctolib/Maiia…), où la donnée reste. L'**accès** distant constitue un transfert
> hors-UE à encadrer (≠ hébergement).
>
> ⚠️ Support opérationnel, **pas un avis juridique** : faire valider par un conseil avant
> signature, et tenir compte de la veille souveraineté (art. 9).

---

## Article 1 — Parties & rôles

- **Responsable de traitement** : le Client (cabinet médical / donneur d'ordre).
- **Sous-traitant** : Salverys ([Salverys — raison sociale], Antananarivo, Madagascar),
  agissant **sur instruction documentée** du Client.

## Article 2 — Objet & finalité

Salverys traite des données personnelles **pour le seul compte du Client**, aux fins
d'exécuter la prestation (télésecrétariat médical / support / helpdesk). Aucun traitement
à d'autres fins, ni réutilisation, sans instruction écrite du Client.

## Article 3 — Nature des données & des traitements

- **Catégories de personnes** : patients / utilisateurs finaux / appelants du Client.
- **Catégories de données** : identité, coordonnées, motif d'appel/de ticket, données
  d'agenda. Côté médical : **données de santé** (catégorie particulière, art. 9 RGPD) —
  traitées uniquement **dans l'outil HDS du Client**.
- **Opérations** : consultation, saisie, mise à jour **directement dans l'outil du Client**.
- Détail en **Annexe 1**.

## Article 4 — Zéro stockage / zéro hébergement côté Salverys

- **Aucun enregistrement** des appels patients.
- **Aucune donnée patient/utilisateur stockée** sur les postes des agents ni sur une
  infrastructure Salverys : la donnée reste chez l'**hébergeur HDS du Client**
  (Doctolib/Maiia/Ubicentrex…). La téléphonie ne fait que **router** l'appel.
- Le **CRM interne** de Salverys ne contient que des **données B2B** (contacts
  professionnels), **jamais de donnée patient/utilisateur final**.
- Salverys est donc **sous-traitant (art. 28), pas hébergeur** : aucune brique HDS à sa charge.

## Article 5 — Mesures techniques & organisationnelles

- **Comptes nominatifs** par agent dans les outils du Client + **MFA**.
- **Zéro download** : interdiction d'export/copie locale ; pas de cache local de données.
- Connexions chiffrées (**TLS**) aux outils du Client.
- **Formation RGPD et secret professionnel** des agents ; engagement de confidentialité signé.
- Gouvernance d'accès : droits au strict nécessaire, révocation immédiate à la sortie d'un agent.
- Détail en **Annexe 2**.

## Article 6 — Sous-traitants ultérieurs

- Salverys recourt à des **freelances (Antananarivo)** comme sous-traitants ultérieurs.
  Chacun signe un **DPA** et un engagement de **secret professionnel**.
- **Autorisation générale** du Client, assortie d'une **information préalable** de tout
  ajout/remplacement avec un préavis de **5 jours ouvrés**, ouvrant un **droit
  d'opposition** motivé au Client.

## Article 7 — Transfert hors-UE (art. 46 RGPD)

- L'accès aux données depuis Madagascar (pays tiers) constitue un **transfert hors-UE**.
- Encadrement par **clauses contractuelles types (CCT/SCC)** de la Commission européenne +
  **mesures complémentaires** (art. 4 et 5 : minimisation, accès distant sans copie locale,
  chiffrement, comptes nominatifs).
- Information des personnes concernées assurée par le Client (mentions d'information).

## Article 8 — Assistance au Responsable de traitement

- Salverys assiste le Client pour répondre aux **demandes d'exercice des droits**
  (accès, rectification, effacement, opposition…) reçues via la prestation, en les
  **transmettant sans délai** au Client (les données résidant dans l'outil du Client).
- Salverys assiste le Client pour la **sécurité**, les **AIPD** et les **consultations
  préalables** si nécessaire.
- **Notification de violation** de données à caractère personnel au Client **sans délai et
  au plus tard sous [24/48/72] heures** après en avoir pris connaissance.

## Article 9 — Clause de souveraineté HDS (échéance sept. 2026)

Compte tenu du **décret du 24 mars 2026** (obligations de souveraineté HDS applicables en
**septembre 2026**) :

- Les parties **réexaminent** le présent DPA **avant septembre 2026** (rappel de veille :
  **août 2026**, cf. `CONFORMITE-HDS-RGPD.md §4`).
- En cas d'incompatibilité avérée du modèle d'accès offshore : **renégociation sous 30 jours**,
  **repli technique** vers un **VDI hébergé en UE** + clauses art. 46 renforcées, ou
  **suspension/résiliation sans pénalité** pour le Client si aucune solution conforme.

## Article 10 — Audit

Le Client (ou un tiers mandaté, sous confidentialité) peut **auditer** le respect du présent
DPA, sur préavis raisonnable de **[__ jours]**, sans perturber l'exploitation.

## Article 11 — Sort des données en fin de contrat

À la fin de la prestation, et selon le choix du Client : **suppression** des accès et
**destruction** de toute donnée résiduelle éventuelle côté Salverys (en principe nulle,
art. 4), avec **attestation** sur demande. Aucune conservation au-delà de l'obligation légale.

---

## Annexe 1 — Détail des traitements

| Élément | Contenu |
|---|---|
| Finalité | [télésecrétariat / support N1 / helpdesk IT — sous le nom du Client] |
| Personnes concernées | [patients / utilisateurs finaux / appelants] |
| Catégories de données | [identité, coordonnées, motif, agenda — santé le cas échéant] |
| Données sensibles (art. 9) | [oui (médical) / non] — traitées dans l'outil HDS du Client |
| Durée du traitement | durée du contrat |
| Outils du Client | [Doctolib / Maiia / Médistory / Cegedim / ticketing / ITSM] |

## Annexe 2 — Mesures de sécurité

- Comptes nominatifs + MFA · zéro download · pas de cache local · chiffrement TLS ·
  formation RGPD + secret pro · révocation immédiate des accès · double connexion
  (fibre+4G) + hub de repli alimenté (continuité) · aucun enregistrement d'appel.

## Annexe 3 — Localisation

- **Traitement (accès)** : Antananarivo, Madagascar (pays tiers).
- **Hébergement de la donnée** : chez l'**hébergeur HDS du Client** (UE/EEE) — la donnée
  ne quitte pas cet hébergeur.

---

## Signatures

| Le Responsable de traitement (Client) | Le Sous-traitant (Salverys) |
|---|---|
| Nom / fonction : [ ] | Nom : Valérien Rakotosalama |
| Date : [JJ/MM/AAAA] | Date : [JJ/MM/AAAA] |
| Signature : | Signature : |
