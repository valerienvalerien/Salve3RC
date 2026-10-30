# Séquence Cold Email — Segment « Télésecrétariats FR » (offre marque blanche)

**Cible :** dirigeants des télésecrétariats français (top 10 partenaires prioritaires)
**Émetteur :** Salverys — bras offshore Madagascar en marque blanche
**Canal :** Emelia (email) + LinkedIn en appui
**Date :** 2026-05-25
**Outreach Readiness Score : 67/100**
**Framework retenu :** Problème → Preuve → Demande (segment B2B, pas de trigger individuel recherché)

---

## Top 10 cibles & décideurs (appariement vérifié — source : 02_decideurs_identifies.csv)

| Entreprise | Décideur (vérifié) | Localisation | Canal prioritaire |
|---|---|---|---|
| Simplify Télésecrétariat Médical | **Stéphane Roy**, fondateur & dirigeant | Bois d'Arcy (78) | LinkedIn DM → email |
| Médi Services | **Daniel Garcia**, fondateur & dirigeant | Franconville (95) / IDF | LinkedIn DM → email |
| IPContact Group | **Patrick Gomez**, fondateur / CEO | Le Tholonet (13) | LinkedIn DM → email |
| Stanpro | **Christiane Hueber**, fondatrice & gérante | Vaudeville (54) | LinkedIn + **courrier postal** |
| Tellma | **Damien Duhem**, dirigeant | Abbeville (80) | LinkedIn + cold email |
| Optilib / Telodoc | **Guillaume Fourmy**, co-gérant (+ Mathieu Boucher) | Montpellier (34) | LinkedIn + email |
| A3COM | fondateurs non publics | Fontenay-sous-Bois (94) | email via SIRET / standard |
| Médiphone | à identifier | — | email |
| Vocallz | à identifier | — | email |
| Cmondoc | à identifier | — | email |

> ⚠️ **Correction d'appariement** : une version antérieure de ce tableau mélangeait les noms (Roy↔Stanpro, etc.). Le tableau ci-dessus est l'appariement **vérifié** (CSV décideurs + recherche web). À utiliser tel quel.
>
> Stratégie : sur les 6 décideurs nominatifs, **LinkedIn DM personnalisé d'abord (sem. 1-2)**, puis cette séquence email en relais. Hueber = profil traditionnel zone rurale → ajouter le **courrier postal**. Sur A3COM + les 3 sans contact, email direct via Emelia après identification.

---

## Accroches personnalisées vérifiées (à substituer à la 1re ligne de l'Email 1)

> Triggers issus de recherche web, classés du plus solide au plus faible. **À revérifier d'un coup d'œil avant envoi** quand c'est signalé (dates non confirmées).

**1. Simplify — Stéphane Roy** · trigger FORT et daté
> « Bonjour Stéphane, j'ai vu que Simplify avait poussé l'IA hybride de prise de RDV jusqu'aux JFR 2025, avec l'intégration Enovacom/GXD5 en imagerie — votre logique "IA quand c'est possible, humain quand c'est nécessaire" est exactement le point où je voulais vous parler. »
> *(source : simplify.fr/blog JFR 2025, enovacom.com)*

**2. Optilib — Guillaume Fourmy** · trigger ACTIONNABLE
> « Bonjour Guillaume, j'ai vu qu'Optilib recrute des téléconseillers en appels entrants à Montpellier — c'est souvent le signe d'une charge d'appels qui grimpe plus vite que les plannings. C'est précisément là que je peux vous aider, sans toucher à Telodoc ni à votre marque. »
> *(source : optilib.com/nous-rejoindre, France Travail)*

**3. Tellma — Damien Duhem** · trigger à VÉRIFIER (date non confirmée)
> « Bonjour Damien, en ouvrant à Lille et en élargissant Tellma au-delà du médical, vous multipliez les standards à tenir en parallèle — c'est exactement le moment où un bras de débordement change la donne. »
> *(à valider : l'ouverture Lille est récente mais non datée — vérifier avant envoi)*

**4. Médi Services — Daniel Garcia** · ancrage entreprise (pas de trigger daté)
> « Bonjour Daniel, votre approche hybride humain + automatisation chez Médi Services est exactement ce que je cherche à compléter : une couche humaine francophone supplémentaire sur vos pics, sans CapEx en France. »
> *(25+ ans, +20 M d'appels, serveurs HDS — angle factuel vérifiable)*

**5. IPContact — Patrick Gomez** · pas de trigger perso fiable → angle techno + secteur
> « Bonjour Patrick, votre architecture Logicielnet est assez unique sur le marché — l'idée serait de brancher une capacité offshore en marque blanche via vos API, pour étendre la capacité sans diluer votre techno. »
> *(NB : profil multi-secteurs, déjà très orienté IA — à requalifier avant d'investir du temps)*

**6. Stanpro — Christiane Hueber** · pas de trigger récent → ancrage + secteur (canal courrier)
> « Bonjour Madame Hueber, vingt ans après la fondation de Stanpro, vos 7 pôles sont à pleine maturité — la vraie question devient comment soutenir la croissance sans saturer vos équipes. »
> *(seul contenu LinkedIn daté = 2023, trop ancien ; décideuse traditionnelle → privilégier LinkedIn + courrier postal)*

---

## Variables de fusion (Emelia)

| Variable | Exemple | Note |
|---|---|---|
| `{prenom}` | Roy | obligatoire — sinon ne pas envoyer |
| `{entreprise}` | Stanpro | nom de la société |
| `{ville}` | Lyon | optionnel, renforce la perso |
| `{signature}` | bloc signature Salverys | bas de mail |

**Positionnement à ne JAMAIS perdre de vue :** on ne se présente PAS comme une alternative aux télésec FR (leurs clients médecins ne nous connaissent pas). On est leur **bras offshore en marque blanche** — leurs clients ne voient que leur marque.

**Prix (rappel interne)** : jamais de chiffre en email. La grille à l'appel **par créneau**
(jour / soir-samedi / pics réservés, `PRICING.md §1.b`) se présente **au cadrage** uniquement.
Qualifier le **prix de vente final** du partenaire dès le 1er échange (alerte Callmed,
`EVALUATION-STRATEGIQUE-2026-06.md §1.4`).

---

## Lead magnet — audit de débordement (avant E1, prospects prioritaires)

> Variante partenaire de l'audit de décroché : **10 appels tests** répartis sur les
> créneaux de débordement (12h-14h, après 18h, samedi matin) chez **2-3 clients publics
> du prospect** (cabinets affichés en référence sur son site). Constat factuel : décroché
> ou non, temps d'attente.

- **Usage en accroche** (remplace le trigger si plus fort) : « Bonjour {prenom}, samedi
  matin, X de nos 10 appels tests chez vos clients publics ont sonné dans le vide —
  c'est exactement le créneau qu'on absorbe en marque blanche, sous votre nom. »
- **Ton** : factuel et allié (« voilà où on peut vous renforcer »), jamais accusateur —
  on parle à quelqu'un dont c'est le métier.
- ~15 min par prospect, à faire faire par un agent en banc. Réserver au top 10.

---

## Séquence 5 emails

### Email 1 — L'accroche (J1)

**Objet A :** `{entreprise} — un renfort offshore en marque blanche ?`
**Objet B :** `renfort télésec sans recruter en France`

---

Bonjour {prenom},

Recruter des télésecrétaires qualifiées en France coûte cher et prend du temps — surtout pour absorber les nuits, les week-ends et les pics saisonniers.

Chez Salverys (Antananarivo), on opère le débordement d'acteurs comme {entreprise} en marque blanche : télésecrétaires francophones natives, fuseau compatible Paris, à coût ~40 % inférieur à un poste en métropole. Vos clients ne voient que votre marque.

Pas une alternative à {entreprise} — votre bras offshore, sur les créneaux que vous ne voulez pas internaliser.

Ça vaut 15 minutes cette semaine ?

{signature}

---

**CTA :** « Ça vaut 15 minutes cette semaine ? »
**LinkedIn (J0) :** demande de connexion — « Bonjour {prenom}, je travaille avec des télésec FR sur la capacité offshore en marque blanche (nuits, week-ends, pics). Au plaisir d'échanger. »

#### Variantes A/B
**1re ligne A :** « Recruter des télésecrétaires qualifiées en France coûte cher et prend du temps… »
**1re ligne B :** « {prenom}, la question n'est pas de remplacer vos équipes FR — mais d'absorber ce qu'elles ne peuvent pas couvrir rentablement. »

---

### Email 2 — L'apport de valeur (J3)

**Objet A :** `le calcul nuits / week-ends`
**Objet B :** `ce que coûte vraiment une permanence FR`

---

Bonjour {prenom},

Un repère rapide sur le débordement : une permanence soir + week-end internalisée en France, c'est ~1 ETP chargé, difficile à rentabiliser tant que le volume n'est pas plein.

En marque blanche offshore, vous payez par tranches de volume — un forfait qui s'ajuste au débordement réel : la capacité tampon ne devient un coût que quand elle sert. C'est ce qui permet de dire oui à un nouveau client sans CapEx ni recrutement.

Je vous laisse y penser — content d'en parler si c'est un sujet chez {entreprise}.

{signature}

---

**CTA :** soft — « content d'en parler si c'est un sujet ».
**LinkedIn (J5) :** liker + commenter un post récent de {prenom} (commentaire de fond, aucune vente).

#### Variantes A/B
**1re ligne A :** « Un repère rapide sur le débordement… »
**1re ligne B :** « {prenom}, le vrai coût d'une permanence soir/week-end n'est pas le salaire — c'est le temps mort. »

---

### Email 3 — La preuve (J7)

**Objet A :** `comment on cadre la qualité en marque blanche`
**Objet B :** `pilote sans engagement pour {entreprise}`
**Objet C :** `un décroché garanti par contrat — sinon on vous crédite`

> L'Objet C met la garantie (différenciateur n°1, qu'aucun offshore low-cost ne peut
> écrire) directement dans l'objet. À tester en A/B.

---

Bonjour {prenom},

En offshore marque blanche, la vraie question c'est la qualité — pas le prix. Chez nous tout est cadré avant le premier appel : décroché, script, double écoute et reporting hebdo.

Concrètement, on propose un pilote : 200 à 500 appels/mois sur vos créneaux de débordement, KPIs mesurés (taux de décroché, temps moyen, satisfaction), sans engagement. Et une fois en régime, on s'engage sur le décroché : sous le seuil convenu sur un mois, 20 % d'avoir le mois suivant.

Si le résultat ne tient pas vos standards, vous arrêtez. Ça vaut un test ?

{signature}

---

**CTA :** « Ça vaut un test ? » (pilote 200-500 appels/mois).
**LinkedIn (J10) :** message — « Bonjour {prenom}, je vous ai écrit cette semaine sur la capacité offshore en marque blanche pour {entreprise}. Pas sûr que ce soit tombé dans la bonne boîte. On propose un pilote sans engagement, KPIs mesurés — un échange de 15 min ? »

#### Variantes A/B
**1re ligne A :** « En offshore marque blanche, la vraie question c'est la qualité — pas le prix. »
**1re ligne B :** « {prenom}, je sais que l'offshore inquiète sur la qualité — voici comment on la cadre. »

---

### Email 4 — L'angle différent (J14)

**Objet A :** `dire oui au prochain gros client`
**Objet B :** `scaler {entreprise} sans avancer la masse salariale`

---

Bonjour {prenom},

Un autre angle : la croissance. Le frein à la prise d'un gros compte, c'est souvent la capacité — il faut recruter avant de signer, donc on hésite.

Avec une capacité offshore activable en marque blanche, {entreprise} peut accepter le volume dès la signature, puis ajuster. Vous scalez sans avancer la masse salariale.

Démarrage possible en 2 semaines. Un échange court pour voir si ça colle à votre pipeline ?

{signature}

---

**CTA :** « Un échange court pour voir si ça colle à votre pipeline ? »
**LinkedIn (J18) :** partager un contenu utile au secteur (tension RH télésec, demande de permanence) en taguant {prenom} si pertinent.

#### Variantes A/B
**1re ligne A :** « Un autre angle : la croissance. »
**1re ligne B :** « {prenom}, et si la capacité n'était plus le frein pour signer votre prochain gros compte ? »

---

### Email 5 — La clôture (J21)

**Objet A :** `je referme la boucle`
**Objet B :** `pas le bon moment ?`

---

Bonjour {prenom},

Je ne veux pas encombrer votre boîte. Si le débordement ou la capacité tampon n'est pas un sujet en ce moment chez {entreprise}, aucun souci.

Si ça le devient — nuits, congés, nouveau client — vous savez où me trouver. Je garde votre contact et reste dispo pour un test sans engagement.

Bonne continuation,

{signature}

---

**CTA :** porte ouverte, aucune pression.

#### Variantes A/B
**1re ligne A :** « Je ne veux pas encombrer votre boîte. »
**1re ligne B :** « {prenom}, j'arrête là pour ne pas insister — juste un dernier mot. »

---

## Récap touchpoints LinkedIn

| Jour | Action | Contenu |
|---|---|---|
| J0 | Demande de connexion | note perso (voir Email 1) |
| J5 | Engagement | like + commentaire de fond sur un post de {prenom} |
| J10 | Message | relais cross-canal (voir Email 3) |
| J18 | Partage | contenu sectoriel utile, tag si pertinent |

---

## Intégration Emelia & délivrabilité

- **Warm-up d'abord :** domaine d'envoi dédié + SPF/DKIM/DMARC, puis 2-3 semaines de warm-up Emelia AVANT le 1er envoi. Le warm-up ne s'éteint jamais.
- **Volume :** démarrage 25 envois/jour, montée à 30-50/jour. Pour le top 10, c'est négligeable — la contrainte est la qualité de perso, pas le volume.
- **Version 3 emails (cadence Emelia simple) :** si tu veux coller au schéma J0/J+3/J+7 de ton programme, utilise **Emails 1, 3 et 5**. La version 5 emails est réservée à ce segment partenaires (deal à plus forte valeur, nurture plus long justifié).
- **Désinscription :** activer le lien de désabonnement Emelia (conformité RGPD B2B / opt-out).
- **Texte brut**, pas de HTML lourd ni pixel de tracking sur l'Email 1.

## Timing d'envoi (dirigeants / gérants)

- **Jours :** mardi, mercredi, jeudi.
- **Heures :** 7h-8h ou 17h-18h (avant/après les pics d'appels patients de leurs clients).
- À éviter : lundi matin, vendredi après-midi.

---

## Préparation aux objections

| Objection probable | Réponse |
|---|---|
| « On gère déjà tout en interne en France. » | Justement — on ne remplace pas vos équipes FR. On absorbe ce qu'elles ne couvrent pas rentablement : nuits, week-ends, pics, congés. Vous gardez la main sur les agendas et la relation client. |
| « L'offshore, mes clients médecins n'aiment pas. » | C'est de la marque blanche : vos clients ne voient que vous. Français natif, fuseau Paris, double écoute qualité. On peut le cantonner d'abord à un volume limité de débordement. |
| « Comment je sais que la qualité suivra ? » | Pilote 200-500 appels/mois, KPIs hebdo (décroché, temps moyen, satisfaction). Si ça ne tient pas vos standards, vous arrêtez — sans engagement. Et en régime, on s'engage sur le décroché : sous le seuil convenu, 20 % d'avoir. On met notre argent sur le résultat. |
| « On a déjà essayé l'offshore, ça s'est mal passé. » | Compréhensible. La différence : cadrage qualité documenté (script, double écoute, reporting) et démarrage en pilote mesuré, pas en bascule totale. |
| « D'autres prestataires malgaches sont moins chers (0,50-1 €/appel). » | Exact, et c'est volontaire. À ce prix, l'agent est payé au minimum local et tourne en 6 mois — votre qualité de marque part avec lui. Nous, on paie nos agents au-dessus du marché pour les garder, on s'engage contractuellement sur le décroché (avoir automatique en deçà), avec plan de continuité écrit (double connexion par agent, hub de repli alimenté) et backup +1 agent. La question n'est pas le prix de l'appel : c'est le coût du client que vous perdez quand le prestataire à 0,50 € ne décroche pas sous votre marque. |
| « L'IA / les callbots vont absorber ce marché. » | L'IA absorbe le RDV simple — raison de plus de nous sous-traiter le trafic **humain** restant (urgences, patients âgés, demandes complexes, débordement) à coût malgache, plutôt que de payer un plateau France pour des appels que le bot vous enlève déjà. (cf. `NARRATIF-HYBRIDE-CALLBOT.md`) |

---

*Généré via le skill `sales-outreach` (ai-sales-team-claude), adapté au positionnement marque blanche Salverys.*
