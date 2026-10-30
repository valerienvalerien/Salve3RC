# Playbook Cold Outreach Salverys — séquences par niche

Ce document est la **source unique** des séquences cold mail Salverys. Les
campagnes sont exécutées dans **Emelia**. Le CRM (`CRM_Salverys.html`) sert au
pipeline post-réponse, aux décideurs vérifiés et aux scripts d'appel — pas à
l'envoi des séquences.

**Outil d'envoi :** Emelia (mail-merge CSV)
**Date :** 2026-06-02
**Niches couvertes (ordre CLAUDE.md, révisé 2026-10-30) :**
1. **Helpdesk IT N1 — ESN & MSP** — offre principale (séquence dédiée : `OUTREACH-IT-N1-marque-blanche.md`)
2. **Support applicatif N1 — Éditeurs de logiciels & SaaS** — offre secondaire (séquence détaillée ci-dessous)

> Sections archivées le 2026-10-30 : **télésecrétariat médical** (offre abandonnée →
> `99-Archives-Medical/02-Prospection/OUTREACH-SEQUENCE-medical.md`) et **bailleurs sociaux
> & grandes structures** (→ `99-Archives-Bailleurs/OUTREACH-SEQUENCE-bailleurs.md`).

---

## Canaux & CTA — principes communs

À appliquer à toute séquence cold mail, quelle que soit la niche.

### CTA soft, jamais de lien de réservation en cold

Chaque email finit par **une question oui/non**. Jamais de bouton « réserve un
call ». Le clic sur un lien Calendly en cold tourne autour de 0,3 à 1 % — la
réponse à une question simple est plusieurs fois supérieure.

### Délivrabilité : zéro lien dans les emails 1 à 3

Les liens trackés dans les premiers emails à froid signalent « mailing de masse »
aux filtres anti-spam et plombent la délivrabilité.

- **Emails 1, 2, 3 :** aucun lien. Pas de Calendly, pas de WhatsApp, pas de
  site, pas d'image. Le **domaine du site** apparaît uniquement en signature
  (texte brut, ex. `salverys.fr`).
- **Emails 4, 5 :** le numéro WhatsApp peut apparaître **en texte brut** (pas de
  lien `wa.me`), idem pour le site.
- **Toujours :** pas d'emoji ni de gras dans le corps. Texte brut intégral.

### WhatsApp = canal de bascule APRÈS la première réponse

WhatsApp n'apparaît jamais comme un **lien cliquable** en cold (`wa.me/...`
dégrade la délivrabilité). Le pivot se fait dès qu'un prospect répond :

> « Pour simplifier, on peut continuer par WhatsApp ? +33 6 48 91 84 50 »

Côté CRM, mettre le statut du lead à `contacté` puis `rdv` selon l'issue, et
passer le canal sur `WhatsApp`.

### Live chat du site = preuve de réactivité

Le live chat opéré par Salverys sur son propre site est une **démonstration en
direct** de notre réactivité support. Il se mentionne **verbalement** dans
l'email 3 (« vous pouvez tester notre réactivité en direct sur notre site »)
sans l'URL — l'URL ne paraît qu'en signature.

### Cadence et A/B testing

5 emails sur 21 jours : **J1 / J3 / J7 / J14 / J21**. Deux variantes d'objet
(A/B) par email. < 100 mots (E5 < 75). Une seule idée par email.

---

## Variables Emelia (CSV)

Communes à toutes les niches sauf mention contraire.

| Variable | Contenu | Source |
|---|---|---|
| `{{firstName}}` | Prénom du contact | Décideur vérifié dans le CRM |
| `{{structure}}` | Nom de la société / de l'éditeur | CRM |
| `{{ville_dept}}` | Ville ou département | CRM (`notes` ou `structure`) |
| `{{accroche_perso}}` | La phrase de personnalisation déclencheur | **Obligatoire** — 30 s de recherche par prospect |
| `{{signature}}` | Bloc signature Salverys | Pré-défini |
| `{{outil_ticketing}}` *(SaaS uniquement)* | Zendesk / Intercom / Freshdesk | Page « carrières » du poste support |
| `{{secteur}}` *(SaaS uniquement)* | Verticale du SaaS | Site éditeur |

> Sans `{{accroche_perso}}` rempli, l'email 1 devient générique. **Ne pas
> lancer la campagne** avec cette colonne vide.

---

## Traitement des réponses (toutes niches)

Dès qu'un prospect répond, basculer sur le **canal le plus simple pour lui** —
en pratique : WhatsApp ou appel rapide.

1. **Réponse positive ou question** :
   - CRM : passer le lead de `contacté` à `rdv` si un créneau est posé,
     sinon laisser `contacté` et mettre une note.
   - Canal : « Pour simplifier, on continue par WhatsApp ? +33 6 48 91 84 50 »
     ou proposer un appel de 15 min dans la foulée.
2. **Réponse négative / pas le moment** :
   - CRM : `perdu` avec note sur le motif (mauvais timing, déjà équipé, hors
     ICP). Si « pas le moment », planifier une tâche de relance à J+90 avec
     un nouvel angle (nouvelle ouverture, nouveau poste ouvert…).
3. **Out-of-office / pas le bon interlocuteur** :
   - CRM : mettre à jour le décideur dans la fiche lead. Recommencer la
     séquence pour le bon contact (en marquant que ce n'est plus un cold).

---

# Support applicatif N1 — Éditeurs de logiciels & SaaS FR (offre secondaire)

> Pour le **Helpdesk IT N1 en marque blanche** (ESN, MSP, infogéreurs — **offre
> principale**), voir le fichier dédié `OUTREACH-IT-N1-marque-blanche.md` — segment et angle
> différents (sous-traitance d'un acteur établi, pas vente directe).

**Segment cible :** éditeurs SaaS B2B français, 20-300 salariés, en croissance
**Persona :** Head of Support / Customer Support Manager / Head of Customer Care
**Décideur secondaire :** COO / Directeur des Opérations
**Framework :** Problème → Preuve → Ask

### Recherche de personnalisation (à remplir dans `{{accroche_perso}}`)

Trois déclencheurs à chercher (30 s par prospect, prioriser le n°1).

1. **Poste « Support N1 / Customer Care » ouvert depuis > 1 mois**
   (LinkedIn, Welcome to the Jungle, page carrières) — Qualité : Hot
   *Angle :* « J'ai vu que {{structure}} cherche un Customer Support Specialist
   depuis quelques semaines — j'imagine que les tickets s'empilent en attendant. »
2. **Avis clients sur les délais de réponse** (Trustpilot, G2, Capterra,
   ProductHunt) — Qualité : Warm
   *Angle :* « Plusieurs avis G2 récents sur {{structure}} mentionnent un délai
   de réponse support qui s'allonge. »
3. **Levée de fonds < 12 mois** (Maddyness, Eldorado) — Qualité : Warm
   *Angle :* « Avec la série {{X}} bouclée en {{mois}}, le scale-up du support
   client doit être un sujet ouvert chez {{structure}}. »

**Angle d'ouverture préféré :** déclencheur entreprise (poste ouvert ou avis).
**Variable spécifique :** `{{outil_ticketing}}` (Zendesk / Intercom / Freshdesk /
Crisp), trouvée sur la page carrières du poste support ou dans la stack publique
de l'éditeur.

---

## Séquence 5 emails (SaaS)

### Email 1 — L'accroche (Jour 1)

**Objet A :** {{firstName}}, vos tickets N1 s'empilent ?
**Objet B :** support {{secteur}} pour {{structure}}

---

Bonjour {{firstName}},

{{accroche_perso}}

Recruter un Customer Support Specialist FR en CDI prend 60 à 90 jours et 35-40 k€ chargés par an, pour un poste qui tourne ~18 mois. Pendant ce temps, les tickets N1 s'empilent et le NPS prend.

Chez Salverys, on opère une équipe française d'origine, formée à {{outil_ticketing}}, qui traite votre N1 sous le nom de {{structure}} : tickets, chat in-app, téléphone, escalade cadrée vers vos équipes produit. Environ 40 % de moins qu'une embauche équivalente en France — chiffrage précis sous 24 h selon votre volume.

Ça vaudrait un échange de 15 min cette semaine ?

{{signature}}

---

**CTA :** soft, question
**Touchpoint complémentaire (Jour 5) :** LinkedIn — visite de profil + invitation
sans note pour le persona Head of Support (l'éditeur SaaS y est actif).

#### Variantes A/B
**Ligne d'ouverture A (déclencheur perso) :** `{{accroche_perso}}`
**Ligne d'ouverture B (sectorielle) :** « 89 % des éditeurs SaaS FR déclarent
des difficultés de recrutement sur le support N1 — c'est devenu le goulot
d'étranglement n°1 de la croissance. »

---

### Email 2 — La valeur (Jour 3)

**Objet A :** le vrai coût d'un Customer Support en CDI
**Objet B :** 60 jours pour recruter, vs…

---

Bonjour {{firstName}},

Un repère qui revient chez les éditeurs SaaS qu'on accompagne : un Customer Support Specialist FR en interne, en coût complet (salaire chargé + onboarding produit 4-6 semaines + outils + turnover ~18 mois), tourne autour de 38-46 k€ par an équivalent temps plein. Et c'est 60 à 90 jours de recrutement, à refaire à chaque rotation.

Pas de demande aujourd'hui — juste un repère utile si {{structure}} arbitre entre internalisation et externalisation pour 2026.

{{signature}}

---

**CTA :** zéro (apport de valeur pur)
**Touchpoint complémentaire :** aucun à ce stade.

#### Variantes A/B
**Ligne d'ouverture A :** « Un repère qui revient chez les éditeurs SaaS qu'on accompagne… »
**Ligne d'ouverture B :** « Petit chiffre qui surprend souvent les Head of Support… »

---

### Email 3 — Le cadrage honnête + preuve réactivité (Jour 7)

**Objet A :** comment on prendrait vos tickets {{outil_ticketing}}
**Objet B :** testez notre réactivité en direct
**Objet C :** un SLA garanti par contrat — sinon on vous crédite

---

Bonjour {{firstName}},

Salverys démarre — donc plutôt qu'un faux cas client, je préfère vous décrire ce que ça donnerait pour {{structure}}.

Vos tickets {{outil_ticketing}} sont routés vers nos agents selon vos règles (priorité, langue, type de demande). On répond sous votre nom, avec votre macro et votre ton. Les questions hors périmètre N1 sont escaladées vers votre équipe produit avec un contexte propre — pas de ping-pong client.

Avant tout échange, vous pouvez tester notre réactivité : un live chat est ouvert sur notre site (en signature). Posez une question, vous verrez le délai.

Je vous montre comment en 15 min ?

{{signature}}

---

**CTA :** soft, question
**Touchpoint complémentaire (Jour 12) :** relance LinkedIn — message court
référant à l'email (« je vous ai écrit la semaine dernière sur le N1 SaaS, vu
le poste ouvert chez {{structure}} »).

#### Variantes A/B
**Ligne d'ouverture A :** « Salverys démarre — donc plutôt que de vous sortir un cas client… »
**Ligne d'ouverture B :** « Une question revient souvent à ce stade : comment ça se passe concrètement sur {{outil_ticketing}} ? »

> Note : remplacer ce cadrage par un vrai cas client dès qu'un premier éditeur
> pilote est signé. Ne jamais inventer une référence.

---

### Email 4 — L'angle marque blanche + pilote (Jour 14)

**Objet A :** vos utilisateurs ne verront pas la différence
**Objet B :** 1er mois à -50 %, sans engagement

---

Bonjour {{firstName}},

Jusqu'ici je vous ai parlé volume et coût. L'autre sujet pour {{structure}}, c'est l'expérience perçue par vos utilisateurs.

Notre modèle est marque blanche : équipe française d'origine, sous votre nom, vos macros, votre ton produit. L'utilisateur pense parler à votre équipe support.

Pour limiter le risque, deux garde-fous : un 1er mois à -50 %, sans engagement, sur un périmètre réduit (1 agent, certaines catégories de tickets) ; et une fois en régime, on s'engage sur le SLA de première réponse — non tenu sur un mois, 20 % d'avoir le mois suivant. Vous jugez la qualité avant d'élargir, et on met notre argent sur le résultat.

Si l'email n'est pas le plus simple, on peut aussi en parler par WhatsApp au +33 6 48 91 84 50.

Ouvert à en parler ?

{{signature}}

---

**CTA :** soft, question + canal optionnel (WhatsApp en texte brut)
**Touchpoint complémentaire :** aucun.

#### Variantes A/B
**Ligne d'ouverture A (marque) :** « Jusqu'ici je vous ai parlé volume et coût. L'autre point, c'est l'expérience perçue… »
**Ligne d'ouverture B (risque) :** « Une objection légitime : et si la qualité produit ne suit pas ? D'où notre approche : 1er mois à -50 %, sans engagement, plus un engagement sur le SLA de première réponse en régime (non tenu = 20 % d'avoir). »

---

### Email 5 — Le breakup (Jour 21)

**Objet A :** je referme la boucle
**Objet B :** ce n'est peut-être pas le moment

---

Bonjour {{firstName}},

Je n'encombre pas davantage votre boîte. Le sujet — un N1 français formé à {{outil_ticketing}}, sous votre marque, à -40 % d'un CDI interne — sera là quand il deviendra prioritaire pour {{structure}}.

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

## Récap touchpoints (SaaS)

| Jour | Action | Notes |
|---|---|---|
| 1 | Email 1 — accroche | `{{accroche_perso}}` obligatoire |
| 3 | Email 2 — valeur (coût CDI + délai recrutement) | — |
| 5 | LinkedIn — visite + invitation sans note | Head of Support |
| 7 | Email 3 — cadrage + live chat | — |
| 12 | Relance LinkedIn courte | Référer à l'email |
| 14 | Email 4 — marque blanche + pilote | WhatsApp en option |
| 21 | Email 5 — breakup | Porte ouverte |

---

## Objections (SaaS)

| Objection | Réponse courte |
|---|---|
| « Nos users vont sentir que c'est externalisé » | Équipe française d'origine, sous votre nom, vos macros, vos process. Le user voit votre marque — Salverys n'apparaît jamais. |
| « C'est combien ? » | Selon configuration (volume, amplitude, canaux) — devis sous 24 h après un premier cadrage. Repère : environ -40 % d'un CDI N1 FR chargé (38-46 k€/an). |
| « Nos tickets sont trop techniques pour du N1 externalisé » | C'est exactement le périmètre cadré : N1 sur catégories simples, escalade automatique vers votre N2 sur le reste. Vous gardez la complexité. |
| « On a déjà un Customer Support Manager » | Pas pour le remplacer — pour absorber le N1 répétitif et lui rendre du temps sur la qualité, l'onboarding, la voice of customer. |
| « Et la formation à notre produit ? » | Onboarding 5-10 jours sur votre base de connaissance + macros. Backup agent inclus pour absorber le turnover de votre côté **et** du nôtre. |

---

# Bonnes pratiques d'envoi (Emelia)

- **Créneau optimal** : mardi-jeudi, 9 h-11 h. Éviter lundi matin et vendredi
  après-midi.
- **Volume** : démarrer à 10-20 envois/jour par boîte, monter progressivement à
  ~50.
- **Warm-up** : chauffer le domaine d'envoi 2-3 semaines avant (Emelia propose
  un warm-up intégré — l'activer).
- **Domaine** : utiliser un domaine d'envoi dédié (ex. `mail.salverys.fr`),
  pas le domaine principal.
- **Authentification** : SPF, DKIM, DMARC configurés. Tester via mail-tester.com
  avant lancement.
- **Format** : texte brut, sans image ni tracking pixel sur l'email 1
  (meilleure délivrabilité).
- **Désinscription** : inclure un lien de désinscription (conformité RGPD /
  CAN-SPAM).
- **Relance si aucune réponse aux 5 emails** : attendre 30 jours, repartir sur
  un nouvel angle ou un nouveau déclencheur (nouvelle ouverture de centre,
  nouveau poste ouvert).

---

# Prochaines étapes suggérées

- **Premier pilote signé (SaaS)** : idem, remplacer l'email 3 SaaS par un vrai
  cas éditeur (métriques sur volume tickets / délai première réponse / CSAT).
- **Helpdesk IT (ESN)** : séquence maintenue séparément dans
  `OUTREACH-IT-N1-marque-blanche.md` — pas de fusion prévue, segments distincts.

---

*Document maintenu en parallèle du pipeline Emelia. Toute modification doit
être répercutée dans le mail-merge avant le prochain envoi.*
