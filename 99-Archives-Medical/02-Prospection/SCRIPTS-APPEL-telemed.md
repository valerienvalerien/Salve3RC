# Archive — Scripts d'appel « Télésecrétariat médical » (`CALL_SCRIPTS.telemed`)

> ⛔ **Offre abandonnée le 2026-10-30** (décision Valérien). Section extraite telle quel de
> `02-Prospection/SCRIPTS-APPEL.md` ; l'objet correspondant du CRM est archivé dans
> `99-Archives-Medical/crm/call-scripts-telemed.js`. Ne plus utiliser.

# 1. Télésecrétariat médical — `CALL_SCRIPTS.telemed`

> Niche **priorité absolue**. Côté médical, on parle toujours de **forfait**
> (jamais « abonnement »).

### `CALL_SCRIPTS.telemed.opening` — Ouverture

**Script**

> Bonjour, **{prenom}** ? Je m'appelle Valérien, je suis directeur chez Salverys, on travaille avec des cabinets médicaux comme le vôtre sur la gestion des appels patients.
>
> **Vous avez 2 minutes ?** Je vous appelle parce qu'on aide les cabinets à ne plus rater d'appels pendant les consultations — je voulais vous demander : ça vous parle, ou c'est déjà résolu chez vous ?

💡 **Tip** — Ne dis JAMAIS « je sais que vous êtes occupé ». Affirme la valeur en 1 phrase, puis demande la permission de continuer.

⛔ **Danger** — Ne pitche pas. La 1re phrase doit être courte et ouvrir une question.

### `CALL_SCRIPTS.telemed.qualif` — Qualification

**Script**

> Concrètement chez {structure} :
>
> - Combien d'appels patients par jour environ ?
> - Sur ces appels, combien finissent en répondeur ou sans réponse pendant les consultations ?
> - Vous utilisez Doctolib, Maiia, Médistory… ?
> - La secrétaire qui gère les appels aujourd'hui, c'est en interne, en libéral, ou personne ?

💡 **Tip** — Pose UNE question à la fois. Note les réponses. Reformule avant de continuer : « Si je comprends bien, vous perdez environ X appels par jour, c'est ça ? »

### `CALL_SCRIPTS.telemed.pitch` — Pitch valeur

**Script**

> Ce qu'on propose c'est simple : **une télésecrétaire médicale francophone dédiée à {structure}**, formée à votre logiciel, qui prend vos appels de 8h à 20h, sans congés, sans arrêt maladie.
>
> La différence avec une secrétaire classique : on est à Madagascar, donc le tarif est environ 40 % inférieur à un prestataire en France — sans perte de qualité, le français est langue maternelle ici.
>
> Forfait à partir de 350€/mois, **1er mois à -50 %** pour qu'on prouve la valeur avant que vous vous engagiez. Et une fois en régime, on s'engage sur le décroché : sous 90 % d'appels pris sur un mois, vous avez 20 % d'avoir le mois suivant.

💡 **Tip** — Termine TOUJOURS par une question fermée : « Est-ce que cet ordre de grandeur vous semble cohérent par rapport à ce que vous payez aujourd'hui ? »

### `CALL_SCRIPTS.telemed.objection` — Objections

→ Voir l'**arbre d'objections télémed** ci-dessous (`OBJECTIONS_TELEMED`).

### `CALL_SCRIPTS.telemed.closing` — Closing

**Script**

> Très bien {prenom}. Je vous propose qu'on fasse les choses dans l'ordre :
>
> **Étape 1** — je vous envoie aujourd'hui un mémo de 2 pages : ce qu'on fait exactement, prix, conditions, contrat type.
>
> **Étape 2** — on se reparle **jeudi à 14h ou vendredi à 11h** pour décider de lancer l'offre 1er mois à -50 %. Lequel des deux vous arrange ?

💡 **Tip** — Donne TOUJOURS deux options fermées de RDV. Jamais « quand êtes-vous dispo ? » → c'est une porte de sortie.

### Arbre d'objections — `OBJECTIONS_TELEMED`

#### Objection 1 — « On a déjà une secrétaire physique au cabinet. »

**Réponse** — **Parfait, ce n'est pas l'un ou l'autre.** La plupart de nos cabinets gardent leur secrétaire physique et nous délèguent uniquement les pics d'appels et les heures creuses où elle est en consultation avec vous. Combien d'appels votre secrétaire ne peut pas prendre aujourd'hui pendant les rendez-vous ?

- Si « presque aucun » → « OK très bien. Et le midi entre 12h et 14h ? » — creuse pour trouver un trou.
- Si « pas mal en fait » → « C'est exactement notre cas d'usage. On prend le relais uniquement sur ces moments-là, avec un forfait mensuel calé sur votre volume. »

#### Objection 2 — « Vous êtes à Madagascar, l'accent ça va poser problème aux patients âgés. »

**Réponse** — **C'est la question qu'on entend le plus.** Le français est ma langue maternelle, comme pour toutes nos télésecrétaires. **Je vous propose le 1er mois à -50 %** : vos patients appellent, et vous jugez en direct — écoute en double ligne quand vous voulez, ou un appel test de 5 min avec la télésecrétaire avant même de démarrer. Par défaut on n'enregistre pas les appels patients (conformité RGPD), donc tout se vérifie en temps réel. Si un seul patient se plaint de l'accent, on arrête, sans engagement.

- Si « OK pour tester » → Passe au closing → fixe RDV pour démarrer le pilote.
- Si « même comme ça non » → « Je comprends. Acceptez juste un appel téléphonique avec une de nos secrétaires pour vous faire votre opinion. 5 minutes. »

> 🔒 **Garde-fou conformité** (`CONFORMITE-HDS-RGPD.md §2`) : **par défaut, zéro
> enregistrement des appels patients**. La preuve qualité se fait en **double écoute /
> double ligne** ou par **appel test** — ne pas proposer « vous écoutez les
> enregistrements ». Ne pas non plus promettre « jamais d'enregistrement possible » :
> c'est une **option sur demande**, portée par la stack / le HDS du client (jamais sur le
> poste de l'agent), **à ne pas improviser** → escalade direction.

#### Objection 3 — « C'est trop cher pour un cabinet de notre taille. »

**Réponse** — **Vous payez aujourd'hui combien pour gérer vos appels — y compris le coût des rendez-vous manqués ?** Un patient qui ne peut pas vous joindre, en moyenne, c'est 30€ de consultation perdue. Si on évite 15 appels manqués par mois, on est déjà à 450€. Notre forfait commence à 350€.

- Si silence ou « je n'ai jamais calculé » → « Je vous propose de regarder ça ensemble. Sur le mois pilote à -50 %, on chiffre exactement. »
- Si « pas tant de manqués que ça » → « Alors le plus petit forfait suffit largement — et le 1er mois à -50 % vous le confirme sans engagement. »

#### Objection 4 — « Envoyez-moi un email, je regarderai. »

**Réponse** — **Bien sûr je l'envoie aujourd'hui.** Pour qu'il vous soit utile : je vous le fais sur-mesure pour votre cas, mais j'ai besoin de 5 minutes maintenant pour comprendre votre volume. Sinon je vais vous envoyer un truc générique que vous allez supprimer en 30 secondes. **5 minutes là, ça marche ?**

- Si OK → Repasse en qualif rapide → 3 questions max → puis closing.
- Si toujours « envoyez quand même » → « OK je vous envoie. Je vous rappelle vendredi à 11h pour en discuter ? » — bloque le RDV maintenant.

#### Objection 5 — « Ce n'est pas moi qui décide, c'est mon associé. »

**Réponse** — **Très bien, c'est important qu'il soit dans la boucle.** Du coup je vous propose qu'on fixe directement une visio à 3 — vous, lui et moi — 20 minutes maximum. Plutôt jeudi ou vendredi cette semaine ?

- Si OK → Pose immédiatement les 2 créneaux.
- Si « je vais lui en parler d'abord » → « OK je vous laisse mes coordonnées. Je vous relance lundi à 10h, ça vous va ? »
