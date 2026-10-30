# SCRIPTS-APPEL.md — Scripts d'appel à froid Salverys

> **Source lisible et éditable** des scripts de cold calling Salverys.
> Miroir de l'objet `CALL_SCRIPTS` du CRM (`CRM_Salverys.html`, section COLD CALLING).
> Les séquences `OUTREACH-SEQUENCE.md` référencent ces scripts par leur clé
> (`CALL_SCRIPTS.helpdesk-n1.qualif`, `CALL_SCRIPTS.support-n1.opening`, etc.) —
> les ancres ci-dessous reprennent exactement cette nomenclature.
>
> ⚠️ **Synchronisation** : ce fichier et le CRM doivent rester alignés. Toute
> modification de fond ici doit être répercutée dans `CRM_Salverys.html` (et
> inversement).
>
> **Sources de vérité** : prix/SLA/durées = `PRICING.md` · garde-fous marque/discours =
> `CLAUDE.md`.
>
> Scripts **télésecrétariat médical** (`CALL_SCRIPTS.telemed`) archivés le 2026-10-30 :
> `99-Archives-Medical/02-Prospection/SCRIPTS-APPEL-telemed.md`.
>
> **Placeholders** : `{prenom}` = prénom de l'interlocuteur · `{structure}` =
> nom de l'ESN / de l'éditeur / de la DSI.

---

## Les 5 étapes de l'appel (`CALL_STEPS`)

| # | id | Étape | Objectif |
|---|----|-------|----------|
| 1 | `opening` | 👋 Ouverture | Les 15 premières secondes |
| 2 | `qualif` | 🔍 Qualification | Vérifier le besoin réel |
| 3 | `pitch` | 🎯 Pitch valeur | Présenter Salverys en 30 sec |
| 4 | `objection` | 🛡️ Objections | Arbre de réponses |
| 5 | `closing` | 🤝 Closing | Obtenir un engagement |

---

# 1. Helpdesk IT N1 — `CALL_SCRIPTS.helpdesk-n1` (offre principale)

> Helpdesk IT N1 distant pour DSI et ESN françaises. Cible prioritaire : ESN & MSP
> (marque blanche) — séquence `OUTREACH-IT-N1-marque-blanche.md`.

### `CALL_SCRIPTS.helpdesk-n1.opening` — Ouverture

**Script**

> Bonjour {prenom}, Valérien de Salverys. On opère des plateaux helpdesk IT N1 distants pour des DSI et ESN françaises depuis Madagascar.
>
> **Vous avez 3 minutes ?** Je vous appelle parce que sur une structure comme {structure}, le N1 c'est en général le poste où on a le plus de mal à tenir les SLA tout en gardant les coûts sous contrôle. Vous êtes plutôt où sur ce sujet aujourd'hui ?

💡 **Tip** — Les DSI parlent SLA, ticket volume, et CSAT. Adopte leur vocabulaire dès la 1re phrase.

### `CALL_SCRIPTS.helpdesk-n1.qualif` — Qualification

**Script**

> Pour bien comprendre votre setup :
>
> - Combien de postes utilisateurs à supporter ?
> - Combien de tickets N1 par mois ?
> - Quel est votre SLA contractuel sur la prise en charge N1 ?
> - Vous êtes sur ServiceNow, JIRA Service Desk, ManageEngine, GLPI ?
> - Le N1 est fait en interne, infogéré, ou mix ?
> - Vous avez un référentiel ITIL en place ?

💡 **Tip** — Le SLA et le volume sont les 2 chiffres clés pour dimensionner ton offre. Note-les noir sur blanc.

### `CALL_SCRIPTS.helpdesk-n1.pitch` — Pitch valeur

**Script**

> On opère du **helpdesk IT N1 distant 100% francophone** :
>
> - Profils **ITIL**, formés à vos outils (ServiceNow, JIRA Service Desk, ManageEngine)
> - **SLA documenté et signé** dans le contrat — non tenu sur un mois, 20 % d'avoir
> - Contrats dès 3 mois, puis 12 mois renouvelable, dimensionnement progressif
> - **~40 % de coût en moins** qu'un prestataire hexagonal — sans perte de qualité de service
> - Plateaux dédiés ou mutualisés selon vos besoins
>
> On peut démarrer petit, par exemple 1 ETP sur 3 mois, et monter en charge si le ROI est là.
>
> Ça rentre dans vos critères budgétaires actuels ?

💡 **Tip** — Pour les DSI grandes structures, mentionne **contrat dès 3 mois puis 12 mois** tôt — ça les rassure sur la sécurité du prestataire.

### `CALL_SCRIPTS.helpdesk-n1.objection` — Objections

→ Voir l'**arbre d'objections helpdesk** ci-dessous (`OBJECTIONS_HELPDESK`).

### `CALL_SCRIPTS.helpdesk-n1.closing` — Closing

**Script**

> Parfait {prenom}. Voici comment je vous propose qu'on avance :
>
> **1.** Je vous envoie demain un dossier complet : références, modèle de SLA, grille tarifaire.
> **2.** On fait un **atelier de cadrage de 1h** avec votre responsable support — **jeudi prochain ou mardi de la semaine d'après**.
> **3.** Si on s'aligne, je vous remets une proposition chiffrée sous 5 jours.
>
> Jeudi prochain ou mardi 10 ?

💡 **Tip** — Pour les contrats long-terme, propose un atelier d'1h plutôt qu'un appel — c'est plus engageant et ça signale le sérieux.

### Arbre d'objections — `OBJECTIONS_HELPDESK`

#### Objection 1 — « On a déjà un contrat avec [ESN concurrente]. »

**Réponse** — **Très bien, et ça se passe comment ?** Je vous pose 2 questions : **(1)** Êtes-vous au-dessus ou en-dessous du SLA contractuel ? **(2)** Quand le contrat se termine ? Si tout va bien, je vous recontacte 3 mois avant l'échéance. Si ça pèche, on peut être complémentaires.

- Tout va bien → Note la date de fin de contrat → calendrier J-90.
- Ça coince → « OK, on peut prendre un débordement sans casser votre contrat actuel. On en parle ? »

#### Objection 2 — « Madagascar c'est trop loin pour la confiance, on préfère un prestataire FR. »

**Réponse** — **Légitime.** 3 points concrets : **(1)** société française, contrat français, juridiction française ; **(2)** données hébergées en UE, conformité RGPD documentée ; **(3)** votre interlocuteur direct est en France. Madagascar c'est uniquement la production. Vous voulez qu'on regarde la doc juridique ensemble ?

- Si « OK pour voir la doc » → Envoie le dossier conformité, fixe un rappel J+3.
- Si « c'est une question de principe » → « Je comprends. Je vous laisse mes coordonnées, on se reparle quand vous êtes prêts. »

#### Objection 3 — « On a besoin de profils certifiés ITIL. »

**Réponse** — **Tous nos chefs de plateau sont certifiés ITIL Foundation minimum, et nous avons des profils Intermediate sur les plateaux clés.** On peut vous garantir contractuellement le ratio de certifiés par plateau. Combien d'ETP certifiés ITIL vous avez besoin sur votre périmètre ?

- Volume défini → Note → reviens dans le pitch avec le dimensionnement précis.
- Pas défini → « OK, on fait un atelier d'1h pour cadrer ensemble. »

#### Objection 4 — « C'est un appel d'offres public, vous ne pouvez pas y répondre seul. »

**Réponse** — **Exact, et c'est pour ça qu'on travaille en sous-traitance avec des ESN établies sur les marchés publics.** On peut soit candidater avec votre prestataire historique, soit vous mettre en relation avec une ESN partenaire qui porte le marché. Quel est votre besoin sur l'AO ?

- Ils ont déjà un porteur → « Parfait, présentez-nous au porteur, on le rassure sur la capacité. »
- Pas de porteur → « On vous met en relation avec une de nos ESN partenaires sous 48h. »

#### Objection 5 — « Le N1 doit être 24/7, vous ne pourrez pas couvrir la nuit. »

**Réponse** — **Si, et c'est même un de nos points forts.** Madagascar est UTC+3, donc notre journée couvre votre soirée naturellement. Pour la nuit profonde (2h-6h Paris), on a une équipe rotative dédiée. Vous avez quel volume de tickets sur la nuit ?

- Faible volume nuit → « On peut faire une astreinte mutualisée, beaucoup moins cher. »
- Fort volume nuit → « Plateau dédié 24/7 — on cadre dans l'atelier. »

---

---

# 2. Support applicatif N1 — `CALL_SCRIPTS.support-n1` (offre secondaire)

> Support applicatif N1 pour éditeurs de logiciels & SaaS français.

### `CALL_SCRIPTS.support-n1.opening` — Ouverture

**Script**

> Bonjour {prenom}, Valérien de Salverys. Je m'occupe d'équipes support N1 pour des éditeurs SaaS français — on est basés à Madagascar mais l'équipe est francophone native.
>
> **Vous avez 2 minutes ?** Je vous appelle parce que je vois que {structure} grandit côté produit — et c'est en général là que la file d'attente sur le N1 explose. C'est encore gérable chez vous, ou ça commence à tirer ?

💡 **Tip** — Pour les SaaS, mentionne la croissance produit comme déclencheur de pain. C'est un signal qui résonne avec les Heads of CS.

### `CALL_SCRIPTS.support-n1.qualif` — Qualification

**Script**

> Pour me caler sur votre réalité :
>
> - Combien de tickets N1 par semaine en ce moment ?
> - Quel est votre First Response Time moyen — réaliste, pas l'objectif SLA ?
> - Vous êtes sur Zendesk, Freshdesk, Intercom ?
> - L'équipe N1, c'est en CDI interne, freelances, autre prestataire ?
> - Quelle est la prochaine étape qui vous bloque — plus de tickets, plus de langues, horaires étendus ?

💡 **Tip** — Note le KPI exact (FRT, CSAT) — tu t'en serviras pour chiffrer le ROI au pitch.

### `CALL_SCRIPTS.support-n1.pitch` — Pitch valeur

**Script**

> Ce qu'on fait : **une équipe N1 dédiée à {structure}**, sur vos outils (Zendesk/Freshdesk/Intercom), formée à votre produit en 2 semaines, KPI documentés chaque semaine — FRT, CSAT, taux de résolution.
>
> Le levier économique : ~**40 % de coût en moins qu'un CDI en France**, sans charges RH côté Salverys, démarrage en 2 semaines.
>
> On commence par un **1er mois à -50 %** — vous comparez nos KPI aux vôtres avant de signer. Et on engage le service : si le SLA de première réponse convenu n'est pas tenu sur un mois, 20 % d'avoir le mois suivant.
>
> Ça correspond au type de scaling que vous cherchez ?

💡 **Tip** — Toujours chiffrer le pilote : « 1er mois à -50 %, périmètre 200-400 tickets, demi-tarif. »

### `CALL_SCRIPTS.support-n1.objection` — Objections

→ Voir l'**arbre d'objections support** ci-dessous (`OBJECTIONS_SUPPORT`).

### `CALL_SCRIPTS.support-n1.closing` — Closing

**Script**

> OK {prenom}. Mon process habituel :
>
> **1.** Je vous envoie un one-pager + 2 références anonymisées.
> **2.** On bloque **mardi 11h ou mercredi 15h** une visio de 30 min avec un de vos lead techs pour qu'ils valident l'approche.
> **3.** Si OK on lance le pilote (1er mois à -50 %) lundi suivant.
>
> Mardi 11h ou mercredi 15h ?

💡 **Tip** — Implique le lead tech dans le 2e RDV — ça raccourcit le cycle de validation interne.

### Arbre d'objections — `OBJECTIONS_SUPPORT`

#### Objection 1 — « On préfère garder le N1 en interne, c'est stratégique. »

**Réponse** — **Je l'entends souvent et c'est juste : 50 % du temps c'est la bonne réponse.** Notre proposition : on prend uniquement le débordement et les horaires étendus — vous gardez les tickets stratégiques et la culture produit en interne. Vous avez combien de tickets aujourd'hui qui dorment > 24h ?

- Si « beaucoup » → « C'est exactement la zone qu'on couvre — pas votre cœur, juste le surplus. »
- Si « très peu » → « OK, vous êtes peut-être pas mûrs encore. Je vous recontacte dans 6 mois quand le volume aura grossi. »

#### Objection 2 — « L'offshore, on a essayé, ça s'est mal passé. »

**Réponse** — **C'est le réflexe normal — la plupart des SaaS qu'on signe ont eu une mauvaise expérience avant.** 3 différences chez nous : **(1)** français langue maternelle, pas LV1 ; **(2)** KPI hebdomadaires partagés en transparence — vous voyez tout ; **(3)** 1er mois à -50 %, pas d'engagement. Qu'est-ce qui s'était mal passé exactement la dernière fois ?

- Si « qualité de langue » → « Faites le test : on vous met en relation avec un de nos agents demain, vous évaluez. »
- Si « tickets jamais résolus » → « Notre KPI clé c'est le taux de résolution N1 — on l'engage par contrat, avec 20 % d'avoir si le seuil convenu n'est pas tenu. »

#### Objection 3 — « On utilise [outil obscur] comme support, pas Zendesk. »

**Réponse** — **Pas un problème.** Nos agents sont formés à 4-5 outils en moyenne et apprennent un nouvel outil en moins d'une semaine. C'est plus une question de votre **process** que de l'outil. Vous pouvez me décrire un ticket type — de la création à la résolution ?

- Process simple → « OK on est dans notre zone, on s'adapte sans souci. »
- Process complexe / outil très spécifique → « Très bien, on planifie 2 semaines de formation au lieu d'1 dans le contrat. »

#### Objection 4 — « Je n'ai pas le budget en ce moment. »

**Réponse** — **OK, mais le budget n'est pas la vraie question.** Si je vous montre que sur 6 mois vous économisez 30 % par rapport à votre solution actuelle, vous trouvez le budget ou pas ? Sinon ça veut dire qu'on n'est pas le bon prestataire à ce stade.

- Si « oui si ROI prouvé » → « Parfait. Le 1er mois est à -50 %, vous mesurez vous-même. »
- Si « non c'est gelé » → « OK, je vous recontacte au prochain trimestre fiscal. C'est quand ? »

#### Objection 5 — « Il faut que j'en parle à mon CTO / Head of Eng. »

**Réponse** — **Excellent, c'est lui le décideur opérationnel.** Je vous propose qu'on bloque une visio à 3 directement — 30 minutes, je présente, il challenge. C'est beaucoup plus efficace que vous transmettiez un document. **Mardi prochain 14h ?**

- Si OK → Bloque le créneau, envoie l'invite calendrier dans la foulée.
- Si « je préfère lui transmettre » → « OK, je vous envoie un one-pager spécial CTO — focus archi/sécurité. »

---

## Garde-fous (rappel `CLAUDE.md`)

- **Marque** : « Salverys » uniquement. Jamais Nesvalo / Vinlo.
- On dit **forfait** / « contrat de service », jamais « abonnement » (`PRICING.md` §7).
- **Aucun claim** « direction issue d'une structure de 1 000 collaborateurs ».
- **Enregistrement des appels** : **zéro par défaut**, disponible sur demande
  (`PRICING.md` §10) — la preuve qualité se fait en double écoute / appel test.
- **Tarifs MB** (marque blanche) : **jamais en clair côté public** ni au téléphone en
  cold — la rate card se remet au cadrage, sous NDA (`PRICING.md` §3).

## Chiffres & promesses — alignés `PRICING.md`

| Élément | Valeur | Réf. |
|---------|--------|------|
| Engagement de service | SLA de prise en charge (helpdesk) / de première réponse (support), seuil figé au cadrage | `PRICING.md` §7 |
| Remède si seuil non tenu | **20 % d'avoir** (mois suivant, max 1 mois/12) | `PRICING.md` §7 |
| Offre de lancement | **1er mois à -50 %** (sans engagement) | `PRICING.md` §7 |
| Pilote support / helpdesk | **200-400 tickets**, 1er mois à -50 % | `PRICING.md` §3 |
| Durée contrats IT | **dès 3 mois, puis 12 mois** renouvelable | `PRICING.md` §3 |
| Avantage coût | **~40 %** sous un prestataire FR | `CLAUDE.md` |
