# MODELE-DPA-RGPD.md — Accord de sous-traitance (art. 28 RGPD) + transfert hors-UE (art. 46)

> Annexe au contrat de prestation (`MODELE-CONTRAT-PRESTATION.md`, art. 11), **partie
> intégrante** du contrat. Encadre le traitement de données à caractère personnel par
> Salverys, **sous-traitant** opérant depuis Madagascar (hors UE/EEE).
>
> Principe directeur : **Salverys n'héberge aucune donnée du Client** — les agents
> travaillent **dans les outils du Client** (ticketing, ITSM, back-office applicatif), où la
> donnée reste. L'**accès** distant constitue un transfert hors-UE à encadrer (≠ hébergement).
>
> Révisé le 2026-10-30 : offre médicale abandonnée — clauses santé/HDS (données de santé,
> clause de souveraineté HDS) retirées ; version précédente archivée dans
> `99-Archives-Medical/04-Closing/MODELE-DPA-RGPD-version-medicale.md`. Art. 6 adapté au
> recrutement en CDI.
>
> ⚠️ Support opérationnel, **pas un avis juridique** : faire valider par un conseil avant
> signature.

---

## Article 1 — Parties & rôles

- **Responsable de traitement** : le Client (donneur d'ordre ou client final).
- **Sous-traitant** : Salverys ([Salverys — raison sociale], Antananarivo, Madagascar),
  agissant **sur instruction documentée** du Client.

## Article 2 — Objet & finalité

Salverys traite des données personnelles **pour le seul compte du Client**, aux fins
d'exécuter la prestation (helpdesk IT N1 / support applicatif N1). Aucun traitement
à d'autres fins, ni réutilisation, sans instruction écrite du Client.

## Article 3 — Nature des données & des traitements

- **Catégories de personnes** : utilisateurs finaux / collaborateurs / appelants du Client.
- **Catégories de données** : identité, coordonnées, motif d'appel/de ticket, données
  techniques nécessaires au traitement de la demande (poste, compte, logiciel concerné).
  **Pas de catégorie particulière (art. 9 RGPD)** dans le périmètre standard.
- **Opérations** : consultation, saisie, mise à jour **directement dans l'outil du Client**.
- Détail en **Annexe 1**.

## Article 4 — Zéro stockage / zéro hébergement côté Salverys

- **Aucun enregistrement** des appels par défaut (disponible sur demande écrite du Client).
- **Aucune donnée utilisateur stockée** sur les postes des agents ni sur une
  infrastructure Salverys : la donnée reste dans les **outils du Client** (ticketing, ITSM,
  back-office). La téléphonie ne fait que **router** l'appel.
- Le **CRM interne** de Salverys ne contient que des **données B2B** (contacts
  professionnels), **jamais de donnée d'utilisateur final**.
- Salverys est donc **sous-traitant (art. 28), pas hébergeur**.

## Article 5 — Mesures techniques & organisationnelles

- **Comptes nominatifs** par agent dans les outils du Client + **MFA**.
- **Zéro download** : interdiction d'export/copie locale ; pas de cache local de données.
- Connexions chiffrées (**TLS**) aux outils du Client.
- **Formation RGPD et secret professionnel** des agents ; engagement de confidentialité signé.
- Gouvernance d'accès : droits au strict nécessaire, révocation immédiate à la sortie d'un agent.
- Détail en **Annexe 2**.

## Article 6 — Sous-traitants ultérieurs

- Les agents sont **salariés de Salverys (CDI, Antananarivo)** et signent un engagement
  de **confidentialité / secret professionnel** ; ils ne sont pas des sous-traitants
  ultérieurs.
- Sous-traitants ultérieurs : **[à lister — ex. prestataires techniques ayant accès aux
  données]**. **Autorisation générale** du Client, assortie d'une **information préalable**
  de tout ajout/remplacement avec un préavis de **5 jours ouvrés**, ouvrant un **droit
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

## Article 9 — Audit

Le Client (ou un tiers mandaté, sous confidentialité) peut **auditer** le respect du présent
DPA, sur préavis raisonnable de **[__ jours]**, sans perturber l'exploitation.

## Article 10 — Sort des données en fin de contrat

À la fin de la prestation, et selon le choix du Client : **suppression** des accès et
**destruction** de toute donnée résiduelle éventuelle côté Salverys (en principe nulle,
art. 4), avec **attestation** sur demande. Aucune conservation au-delà de l'obligation légale.

---

## Annexe 1 — Détail des traitements

| Élément | Contenu |
|---|---|
| Finalité | [helpdesk IT N1 / support applicatif N1 — sous le nom du Client] |
| Personnes concernées | [utilisateurs finaux / collaborateurs / appelants] |
| Catégories de données | [identité, coordonnées, motif, données techniques du ticket] |
| Données sensibles (art. 9) | [non — à confirmer au cadrage] |
| Durée du traitement | durée du contrat |
| Outils du Client | [ticketing / ITSM / back-office applicatif] |

## Annexe 2 — Mesures de sécurité

- Comptes nominatifs + MFA · zéro download · pas de cache local · chiffrement TLS ·
  formation RGPD + secret pro · révocation immédiate des accès · double connexion
  (fibre+4G) + hub de repli alimenté (continuité) · aucun enregistrement d'appel par défaut.

## Annexe 3 — Localisation

- **Traitement (accès)** : Antananarivo, Madagascar (pays tiers).
- **Hébergement de la donnée** : dans les **outils du Client** ([localisation à préciser —
  UE/EEE]) — la donnée ne quitte pas ces outils.

---

## Signatures

| Le Responsable de traitement (Client) | Le Sous-traitant (Salverys) |
|---|---|
| Nom / fonction : [ ] | Nom : Valérien Rakotosalama |
| Date : [JJ/MM/AAAA] | Date : [JJ/MM/AAAA] |
| Signature : | Signature : |
