# Archive — Playbook cold outreach : section « Télésecrétariat médical »

> ⛔ **Offre abandonnée le 2026-10-30** (décision Valérien). Section extraite telle quel de
> `02-Prospection/OUTREACH-SEQUENCE.md` (version 2026-06-02). Ne plus utiliser.

# 1. Télésecrétariat médical (priorité ICP)

**Segment cible**
- **Priorité 1 :** chaînes / réseaux multi-sites (3+ centres) — dentaire,
  ophtalmo, radiologie, kiné, ostéo.
- **Priorité 2 :** cabinets de groupe (4+ praticiens) avec secrétariat saturé.

**Persona principal**
- Chaînes : **directrice/directeur d'exploitation**, responsable opérationnel
  des centres, responsable accueil/secrétariat groupe.
- Cabinets de groupe : praticien associé qui gère l'administratif (gérant,
  cogérant) — pas le DG/fondateur.

**Décideur secondaire (escalade) :** fondateur / DG / président.

**Hors cible (à ne pas démarcher)**
- Praticien solo en libéral (volume trop faible, autogestion + Doctolib).
- Cabinet déjà équipé d'un BPO interne dédié (cas Dentego/Adental — angle
  débordement seulement).
- CHU / hôpital public (marchés publics).

---

## Recherche de personnalisation (à remplir dans `{{accroche_perso}}`)

Quatre déclencheurs à chercher (30 s par prospect, prioriser le n°1).

1. **Avis Google « injoignable »** — Qualité : Hot
   *Angle :* « Plusieurs avis récents de patients de {{structure}} signalent
   qu'ils n'arrivent pas à joindre votre secrétariat. »
2. **Offre d'emploi « secrétaire médicale » récente** (Indeed, France Travail,
   site cabinet) — Qualité : Hot
   *Angle :* « J'ai vu que {{structure}} cherche une secrétaire médicale depuis
   quelques semaines. »
3. **Multi-sites / nouvelle ouverture** — Qualité : Warm
   *Angle :* « Avec {{X}} centres ouverts, gérer la centralisation des appels
   patients devient un sujet. »
4. **Désert médical** (zones rurales, Creuse / Ariège / Lot / Cantal…)
   — Qualité : Warm
   *Angle :* « Dans {{ville_dept}}, la pression sur les médecins libéraux ne
   laisse plus le temps de gérer le téléphone. »

**Angle d'ouverture préféré :** déclencheur entreprise (avis ou offre d'emploi).
**Angle secondaire (relances) :** coût d'une secrétaire interne, qualité de
l'accueil, image de la structure.

---

## Séquence 5 emails

### Email 1 — L'accroche (Jour 1)

**Objet A :** {{firstName}}, vos appels patients sonnent dans le vide ?
**Objet B :** secrétariat pour {{structure}}

---

Bonjour {{firstName}},

{{accroche_perso}}

Beaucoup de cabinets en {{ville_dept}} perdent des patients faute de pouvoir décrocher pendant les consultations — et un patient qui n'a pas pu être rappelé prend le suivant qui répond.

Chez Salverys, on opère une équipe française d'origine, formée à Doctolib / Maiia / Médistory, qui prend vos appels sous le nom de {{structure}} : prise de RDV directe dans votre agenda, transfert d'urgence si vous êtes demandé. À environ -40 % du coût d'une secrétaire interne, sans charge RH.

Ça vaudrait un échange de 15 min cette semaine ?

{{signature}}

---

**CTA :** soft, question
**Touchpoint complémentaire (Jour 5) :** **appel téléphonique court** (utiliser
le script `CALL_SCRIPTS.telemed.opening` dans le CRM). LinkedIn optionnel pour
les chaînes multi-sites (le décideur opérationnel y est).

#### Variantes A/B
**Ligne d'ouverture A (déclencheur perso) :** `{{accroche_perso}}`
**Ligne d'ouverture B (sectorielle) :** « En cabinet de groupe, 3 à 5 appels
patients par jour finissent en répondeur — c'est rarement la faute du
secrétariat, c'est un problème de capacité. »

---

### Email 2 — La valeur (Jour 3)

**Objet A :** le vrai coût d'une secrétaire à plein temps
**Objet B :** 60 jours pour recruter, vs…

---

Bonjour {{firstName}},

Un repère qui revient chez les cabinets qu'on accompagne : une secrétaire médicale en interne, en coût complet (salaire + charges + congés + formation au logiciel + turnover), tourne autour de 33 à 40 k€ par an équivalent temps plein. Et le recrutement prend 60 à 90 jours, avec un turnover régulier à refaire.

Pas de demande aujourd'hui — juste un repère utile si vous arbitrez entre interne et externe pour {{structure}} sur 2026.

{{signature}}

---

**CTA :** zéro (apport de valeur pur)
**Touchpoint complémentaire :** aucun à ce stade — laisser respirer.

#### Variantes A/B
**Ligne d'ouverture A :** « Un repère qui revient chez les cabinets qu'on accompagne… »
**Ligne d'ouverture B :** « Petit chiffre qui surprend souvent les praticiens associés… »

---

### Email 3 — Le cadrage honnête + preuve réactivité (Jour 7)

**Objet A :** comment on prendrait vos appels
**Objet B :** testez notre réactivité en direct
**Objet C :** ≥ 90 % d'appels décrochés, sinon on vous crédite

---

Bonjour {{firstName}},

Salverys démarre — donc plutôt qu'un faux cas client, je préfère vous décrire ce que ça donnerait pour {{structure}}.

Votre standard est basculé vers nous selon vos horaires. On répond sous votre nom, on prend les RDV directement dans votre Doctolib (ou Maiia / Médistory), on filtre les urgences et on transfère si vous êtes demandé. Vous gardez la main sur les agendas.

Avant tout échange, vous pouvez tester notre réactivité : un chat en direct est ouvert sur notre site (en signature). Posez une question, vous verrez le délai.

15 min cette semaine ?

{{signature}}

---

**CTA :** soft, question
**Touchpoint complémentaire (Jour 12) :** **2e tentative d'appel** si pas de
réponse (script `CALL_SCRIPTS.telemed.qualif`).

#### Variantes A/B
**Ligne d'ouverture A :** « Salverys démarre — donc plutôt que de vous sortir un cas client… »
**Ligne d'ouverture B :** « Une question revient souvent à ce stade : comment ça se passe concrètement ? »

> Note : on remplacera ce cadrage par un vrai cas client dès qu'un premier
> cabinet pilote sera signé. Ne jamais inventer une référence.

---

### Email 4 — L'angle marque blanche + pilote (Jour 14)

**Objet A :** vos patients ne verront pas la différence
**Objet B :** 1er mois à -50 %, sans engagement

---

Bonjour {{firstName}},

Jusqu'ici je vous ai parlé fonctionnement et coût. L'autre sujet pour {{structure}}, c'est l'image perçue par vos patients.

Notre modèle est marque blanche : équipe française d'origine, sous votre nom, vos process, votre ton. Le patient pense parler à votre secrétariat.

Pour limiter le risque, deux garde-fous : un 1er mois à -50 %, sans engagement, sur un périmètre réduit (un site, certains créneaux) ; et une fois en régime, on s'engage sur le décroché — sous 90 % d'appels pris sur un mois, 20 % d'avoir le mois suivant. Vous jugez la qualité avant d'élargir, et on met notre argent sur le résultat.

Si l'email n'est pas le plus simple, on peut aussi en parler par WhatsApp au +33 6 48 91 84 50.

Ouvert à en parler ?

{{signature}}

---

**CTA :** soft, question + canal optionnel (WhatsApp en texte brut)
**Touchpoint complémentaire :** aucun.

#### Variantes A/B
**Ligne d'ouverture A (marque) :** « Jusqu'ici je vous ai parlé fonctionnement et coût. L'autre point, c'est l'image… »
**Ligne d'ouverture B (risque) :** « Une objection légitime : et si la qualité ne suit pas ? D'où notre approche : 1er mois à -50 %, sans engagement, plus un engagement de décroché en régime (sous 90 %, 20 % d'avoir). »

---

### Email 5 — Le breakup (Jour 21)

**Objet A :** je referme la boucle
**Objet B :** ce n'est peut-être pas le moment

---

Bonjour {{firstName}},

Je n'encombre pas davantage votre boîte. Le sujet — répondre à 100 % des appels patients sous votre nom, à -40 % du coût d'une secrétaire interne — sera là quand il deviendra prioritaire pour {{structure}}.

Si c'est le cas, répondez simplement à ce mail, ou écrivez-nous sur WhatsApp au +33 6 48 91 84 50.

Bonne continuation à vous et à l'équipe.

{{signature}}

---

**CTA :** porte ouverte, sans culpabilisation. WhatsApp en option (texte brut).
**(< 75 mots)**

#### Variantes A/B
**Ligne d'ouverture A :** « Je n'encombre pas davantage votre boîte. »
**Ligne d'ouverture B :** « Visiblement le timing n'est pas le bon — je comprends. »

---

## Récap touchpoints téléphone (médical)

| Jour | Action | Script CRM |
|---|---|---|
| 1 | Email 1 — accroche | — |
| 3 | Email 2 — valeur | — |
| 5 | Appel téléphonique court | `CALL_SCRIPTS.telemed.opening` |
| 7 | Email 3 — cadrage + live chat | — |
| 12 | 2e tentative d'appel | `CALL_SCRIPTS.telemed.qualif` |
| 14 | Email 4 — marque blanche | — |
| 21 | Email 5 — breakup | — |

LinkedIn (optionnel) : pour les chaînes multi-sites uniquement (Dentego, IK
Paris, Dentelia…), le décideur opérationnel y est. Pour les cabinets de groupe,
LinkedIn n'apporte rien.

---

## Objections (médical)

Réutiliser les arbres `OBJECTIONS_TELEMED` du CRM (`CRM_Salverys.html`, section
COLD CALLING). Les 5 objections principales :

| Objection | Réponse courte |
|---|---|
| « Mes patients vont sentir que c'est externalisé » | Équipe française d'origine, sous votre nom, vos process. Patients entendent votre secrétariat — pas Salverys. |
| « C'est combien ? » | Forfait selon volume d'appels, à partir de ~350 €/mois. ~40 % moins cher qu'une secrétaire interne complète. |
| « Et les urgences ? » | Filtrage selon vos règles : transfert d'appel si vous êtes demandé, sinon RDV calé. Vous gardez la main. |
| « J'ai déjà une secrétaire » | Pas pour la remplacer — pour absorber le débordement (pics, congés, hors heures). |
| « Sécurité des données patients ? » | RGPD, accès tracé, engagement de confidentialité, dossier sécurité avant tout démarrage. |
