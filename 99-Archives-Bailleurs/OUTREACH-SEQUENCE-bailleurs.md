# Archive — Playbook cold outreach : section « Bailleurs sociaux & grandes structures »

> ⛔ **Segment archivé le 2026-10-30** (décision Valérien : offres actives = Helpdesk IT N1
> puis Support applicatif N1). Section extraite telle quel de
> `02-Prospection/OUTREACH-SEQUENCE.md` (version 2026-06-02). Ne plus utiliser.

# 3. Bailleurs sociaux & grandes structures (priorité 3)

**Segment cible**
- **Priorité 1 :** bailleurs sociaux (ESH) de 25 000 à 100 000 logements —
  Erilia, Plurial Novilia, ICF Habitat, Aiguillon, Domofrance, Vilogia.
- **Priorité 2 :** très grands bailleurs (>100 000 logements) — CDC Habitat,
  1001 Vies Habitat — sur **débordement uniquement** (CRC interne déjà
  structuré, angle = capacité d'appoint).
- **Priorité 3 :** grandes associations humanitaires avec relation donateurs
  structurée — Fondation Abbé Pierre (cible n°1 du segment).

**Persona principal — JAMAIS le DG**
- **Directeur(rice) de la Relation Client / des Clients** (ex. Brigitte Laurent
  chez CDC Habitat, Antoine Jeandet chez Erilia, Gaëlle Velay chez Vilogia).
- **Responsable du Centre de Relation Clients (CRC)** (ex. Olivier Sicard chez
  ICF Habitat La Sablière).
- Sur Fondation Abbé Pierre : **Directeur Développement Ressources et
  Donateurs** (Michel Raynaud).

**Décideur secondaire (escalade) :** Président du Directoire / DG.

**Hors cible — à NE PAS démarcher (NO-GO ICP)**
- **CNAF, France Travail, URSSAF, CAF départementales** : marchés publics
  obligatoires (BOAMP/UGAP), volumes nécessitant 100+ ETP. Hors capacité
  Salverys (10 agents).
- **CHU / hôpitaux publics** : marchés publics.
- **Bailleurs < 10 000 logements** : volume trop faible pour rentabiliser un
  débordement.
- **Collecteurs Action Logement sans parc locatif** (ex. Solendi déqualifié
  v5) : pas de CRC locataires.
- **Bailleurs avec contrat BPO récemment attribué** : attendre la fin du
  contrat (cycle 3-5 ans).

---

## Positionnement clé : **capacité d'appoint, pas remplacement**

Salverys (10 agents aujourd'hui) ne peut pas être le CRC principal d'un
bailleur de 50 000+ logements. Le positionnement est strictement
**débordement / heures hors bureau / pics saisonniers** :

- Rentrée scolaire (mutations, états des lieux entrants/sortants)
- Hiver (chaufferie, demandes de chauffage, gros entretien)
- Période de charges (avril–juin et octobre)
- Heures hors bureau (18h-21h, samedi)
- Crises ponctuelles (panne ascenseur sur 1 résidence, etc.)

Ce cadrage doit ressortir dès l'email 1. Sinon, le prospect répond « on est
déjà équipés » et la séquence s'arrête.

---

## Recherche de personnalisation (à remplir dans `{{accroche_perso}}`)

Cinq déclencheurs à chercher (30 s par prospect, prioriser le n°1).

1. **Nouvelle nomination Dir. Relation Client** (LinkedIn, Acteurs Publics,
   com officielle bailleur) — Qualité : Hot
   *Angle :* « J'ai vu votre nomination Dir. Relation Client chez
   {{structure}}. À la prise de poste, la question de la capacité du CRC
   se repose souvent. »
2. **Offre d'emploi « chargé de clientèle locataires » / « téléconseiller »
   ouverte > 1 mois** (Indeed, France Travail) — Qualité : Hot
   *Angle :* « J'ai vu que {{structure}} cherche des chargés de clientèle
   locataires depuis quelques semaines. »
3. **Recertification AFNOR Service Clients** (com officielle) — Qualité : Warm
   *Angle :* « Bravo pour la recertification AFNOR — c'est exactement le
   moment où la pression sur la disponibilité des conseillers se voit. »
4. **Crise / contentieux locataires dans la presse locale** — Qualité : Warm
   *Angle :* À adapter prudemment, ton empathique.
5. **Avis Google sur le standard** (« attente interminable », « personne ne
   répond ») — Qualité : Warm
   *Angle :* « Plusieurs locataires de {{structure}} signalent en avis Google
   un délai d'attente long sur le standard. »

**Angle d'ouverture préféré :** nomination ou offre d'emploi.
**Angle secondaire (relances) :** coût d'un téléconseiller interne, KPI
(taux de décroché, taux d'abandon, NPS), saisonnalité des pics.

---

## Séquence 5 emails

### Email 1 — L'accroche (Jour 1)

**Objet A :** {{firstName}}, débordement CRC chez {{structure}} ?
**Objet B :** capacité d'appoint pour {{structure}}

---

Bonjour {{firstName}},

{{accroche_perso}}

Sur un parc comme {{structure}}, les pics d'appels (rentrée, hiver, charges) génèrent de l'attente et des locataires qui raccrochent — sans que votre CRC en soit responsable, c'est un sujet de capacité.

Chez Salverys (équipe française d'origine, fuseau Paris, marque blanche), on opère du débordement pour les CRC bailleurs : on prend l'overflow et les heures hors bureau, sous votre nom, sur vos KPI. ~40 % moins cher qu'un téléconseiller en CDI, activable en quelques semaines.

Ça vaudrait un échange de 15 min cette semaine ?

{{signature}}

---

**CTA :** soft, question
**Touchpoint complémentaire (Jour 5) :** **appel téléphonique court** (script
`CALL_SCRIPTS.helpdesk-n1.opening` dans le CRM). LinkedIn recommandé en
parallèle (les Dir. Relation Client des grands bailleurs y sont actifs).

#### Variantes A/B
**Ligne d'ouverture A (déclencheur perso) :** `{{accroche_perso}}`
**Ligne d'ouverture B (sectorielle) :** « Pour un bailleur du calibre de
{{structure}}, les pics saisonniers de réclamations restent le sujet
opérationnel le plus difficile à dimensionner. »

---

### Email 2 — La valeur (Jour 3)

**Objet A :** le vrai coût d'un téléconseiller CDI
**Objet B :** pics d'appels : la math interne

---

Bonjour {{firstName}},

Un repère qui revient chez les Dir. Relation Client : un téléconseiller en CDI, en coût complet (salaire + charges + formation + management + turnover), tourne autour de 38 à 46 k€/an par ETP. Et le recrutement prend 60 à 90 jours, avec un turnover ~25 %/an sur les CRC.

Pour absorber un pic prévisible (rentrée, hiver, période de charges), embaucher ne tient pas — la capacité flexible externalisée si.

Pas de demande aujourd'hui — juste un repère utile pour le budget 2026 de {{structure}}.

{{signature}}

---

**CTA :** zéro (apport de valeur pur)
**Touchpoint complémentaire :** aucun à ce stade.

#### Variantes A/B
**Ligne d'ouverture A :** « Un repère qui revient chez les Dir. Relation Client… »
**Ligne d'ouverture B :** « Petit calcul qui surprend souvent au moment du budget… »

---

### Email 3 — Le cadrage honnête + preuve réactivité (Jour 7)

**Objet A :** comment on opérerait pour {{structure}}
**Objet B :** testez notre réactivité en direct

---

Bonjour {{firstName}},

Salverys démarre — donc plutôt qu'un cas client, je préfère vous décrire le déroulé pour {{structure}}.

Vos appels en dépassement sont routés vers nous selon vos règles (heures, seuils, motifs). On répond sous votre nom, on traite les réclamations standards directement (encaissement, état des charges, RDV gardien) et on remonte les cas complexes à votre CRC. Vous gardez la main sur les KPI et la QA.

Avant échange, vous pouvez tester notre réactivité : un chat en direct est ouvert sur notre site (en signature). Posez-y une question, vous verrez le délai.

15 min cette semaine ?

{{signature}}

---

**CTA :** soft, question
**Touchpoint complémentaire (Jour 12) :** 2e tentative d'appel
(`CALL_SCRIPTS.helpdesk-n1.qualif`). LinkedIn : commenter un post du prospect
ou de {{structure}} (rapport activité, événement USH).

#### Variantes A/B
**Ligne d'ouverture A :** « Salverys démarre — donc plutôt qu'un cas client… »
**Ligne d'ouverture B :** « Une question qui revient à ce stade : concrètement, ça donne quoi sur un parc comme le nôtre ? »

> Remplacer ce cadrage par un vrai cas client dès qu'un premier bailleur
> pilote sera signé. Ne jamais inventer une référence.

---

### Email 4 — L'angle marque blanche + pilote (Jour 14)

**Objet A :** votre marque, notre capacité
**Objet B :** pilote sur un pic d'appels

---

Bonjour {{firstName}},

Jusqu'ici je vous ai parlé fonctionnement et coût. Le point sensible pour {{structure}}, c'est ce que vos locataires perçoivent.

Notre modèle est marque blanche : équipe française d'origine, sous votre nom, vos scripts, votre ton. Un locataire pense parler à votre CRC.

Pour limiter le risque, on pilote sur un pic précis (rentrée, période de charges) avant d'élargir, avec un engagement sur le décroché : sous le seuil convenu sur un mois, 20 % d'avoir. Vous mesurez la qualité avant tout engagement, et on met notre argent sur le résultat.

Si l'email n'est pas le plus simple, on peut en parler par WhatsApp au +33 6 48 91 84 50.

Ouvert à en parler ?

{{signature}}

---

**CTA :** soft, question + WhatsApp en option (texte brut)
**Touchpoint complémentaire :** aucun.

#### Variantes A/B
**Ligne d'ouverture A (marque) :** « Le point sensible pour {{structure}},
c'est ce que vos locataires perçoivent. »
**Ligne d'ouverture B (risque) :** « Une objection légitime : et si la
qualité ne suit pas ? D'où notre approche par pilote sur un pic. »

---

### Email 5 — Le breakup (Jour 21)

**Objet A :** je referme la boucle
**Objet B :** ce n'est peut-être pas le moment

---

Bonjour {{firstName}},

Je n'encombre pas davantage votre boîte. Le sujet — absorber l'overflow CRC sur les pics, sous votre marque, à -40 % du coût téléconseiller — sera là quand il deviendra prioritaire pour {{structure}}.

Si c'est le cas, répondez à ce mail ou écrivez sur WhatsApp au +33 6 48 91 84 50.

Bonne continuation à vous et à l'équipe.

{{signature}}

---

**CTA :** porte ouverte, sans culpabilisation. WhatsApp en option (texte brut).
**(< 75 mots)**

#### Variantes A/B
**Ligne d'ouverture A :** « Je n'encombre pas davantage votre boîte. »
**Ligne d'ouverture B :** « Visiblement le timing n'est pas le bon — je comprends. »

---

## Récap touchpoints (bailleurs)

| Jour | Action | Script / canal |
|---|---|---|
| 1 | Email 1 — accroche | — |
| 3 | Email 2 — valeur | — |
| 5 | Appel téléphonique court | `CALL_SCRIPTS.helpdesk-n1.opening` |
| 7 | Email 3 — cadrage + live chat | — |
| 10 | LinkedIn : like / commentaire post du prospect ou {{structure}} | — |
| 12 | 2e tentative d'appel | `CALL_SCRIPTS.helpdesk-n1.qualif` |
| 14 | Email 4 — marque blanche | — |
| 21 | Email 5 — breakup | — |

LinkedIn est ici un canal **utile** (à l'inverse du médical) : les Dir.
Relation Client des grands bailleurs sont actifs sur la plateforme et leurs
nominations y sont annoncées.

---

## Objections (bailleurs)

| Objection | Réponse courte |
|---|---|
| « Vous êtes 10, on gère 92 000 logements » | On n'est pas votre CRC principal — on est votre capacité d'appoint sur les pics et le hors bureau. Sur 92 000 logements, ça représente quelques milliers d'appels/mois en débordement — c'est exactement notre format. |
| « Marchés publics obligatoires » | Pour les OPH et organismes publics, on cible la création de la relation et l'accompagnement sur le cahier des charges. On répond au prochain BOAMP. |
| « Confidentialité des données locataires » | RGPD, accès tracé dans votre SI, hébergement UE, dossier sécurité avant tout démarrage. Aucun stockage en local. |
| « On craint que la qualité ne suive pas » | Pilote sur 1 pic d'appels (rentrée ou charges), QA partagée, écoute en double, mesures hebdo — **et engagement de décroché** : sous le seuil convenu sur un mois, 20 % d'avoir. Vous arbitrez sur pièces, on met notre argent sur le résultat. |
| « On a déjà un BPO sur le débordement » | Voir si on est complémentaire (heures hors bureau, week-end, vagues imprévues). Sinon, on garde le contact pour la prochaine RFP. |
| « Modèle social — externaliser pose problème » | Marque blanche, les locataires n'ont pas conscience d'un changement. Équipe française d'origine, conditions de travail Salverys publiques sur demande. |

---

