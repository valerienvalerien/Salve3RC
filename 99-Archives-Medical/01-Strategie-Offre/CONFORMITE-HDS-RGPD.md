# CONFORMITE-HDS-RGPD.md — Salverys (télésecrétariat médical)

> Note d'analyse autonome, réutilisable en réponse client / appel d'offres. Cadre la
> conformité de l'activité **télésecrétariat médical** opérée depuis Madagascar (offshore)
> pour des cabinets français. Complète le prévisionnel (`FINANCE-PREVISIONNEL.md §5`).

---

## 1. HDS certifie l'hébergement, pas la téléphonie

La certification **HDS (Hébergeur de Données de Santé)** porte sur l'**hébergement** de la
donnée de santé, **pas sur la téléphonie**. Les solutions de téléphonie cloud (Aircall,
Ringover & co.) **ne sont pas des « téléphonies HDS »** : l'expression n'a pas de sens
réglementaire.

- **Ringover n'est PAS confirmé HDS.** Toute affirmation « notre téléphonie est HDS » doit
  être **vérifiée nominativement** sur la **liste officielle ANS** (esante.gouv.fr) avant
  d'être reprise dans un argumentaire ou un contrat.
- Conséquence : on ne « résout » pas la conformité en achetant une téléphonie estampillée
  HDS — on la résout en **ne créant pas de donnée de santé à héberger** (cf. §2).

---

## 2. Levier SaaS-first : ne pas créer de donnée de santé à héberger

L'approche par défaut (cf. `CLAUDE.md`, arbitrage SaaS-first) **supprime le besoin d'une
brique HDS payante** en évitant de produire de la donnée de santé côté Salverys :

- **Par défaut, pas d'enregistrement des appels patients.** C'est cette posture qui
  supprime la brique HDS, allège les formalités RGPD et évite le cumul « donnée de santé
  + accès offshore » (cf. §3).
- **Donnée patient uniquement dans Doctolib** (lui-même HDS) — le télésecrétaire saisit
  directement dans l'outil du cabinet, qui reste l'hébergeur.
- La **téléphonie ne fait que router** l'appel → **exposition HDS ~nulle** côté Salverys,
  **aucune brique d'hébergement à construire ni à payer**.

**CRM maison** : il ne contient que des **données B2B cabinets** (prospects/clients
professionnels), **jamais de donnée patient**. Les **freelances signent des DPA**
(accords de sous-traitance RGPD).

### Option enregistrement (sur demande, selon la stack client)

Le zéro enregistrement est la **posture par défaut**, pas une interdiction technique :
certains donneurs d'ordre médicaux attendent un enregistrement + QA a posteriori (modèle
type Secrétel). On **n'impose aucun logiciel d'enregistrement** — quand l'option est
activée, **l'enregistrement suit la stack du client** et le fichier **n'atterrit jamais
sur le poste de l'agent** (cohérent avec la règle « zéro download » du §10 de
`RAPPORT-PRIX.html`). L'option **n'est pas un add-on facturé** (cf. `PRICING.md`).

Arbre selon le cas :

- **Marque blanche (cas dominant, GTM prioritaire)** : l'enregistrement est porté par le
  **système du donneur d'ordre** (sa téléphonie / son outil métier — Ubicentrex, Clopilote,
  Doctolib Phone, son PBX…) et **stocké sur SON HDS**. Le donneur d'ordre reste
  **responsable de traitement** ; Salverys opère dedans → **coût brique ~0** pour nous.
- **Client direct sans stack** : **téléphonie cloud avec enregistrement (Aircall /
  Ringover / 3CX)** + **stockage sur hébergeur certifié HDS** (OVHcloud HDS, Scaleway HDS…).
  Rappel §1 : vérifier la certif **nominativement sur la liste ANS** ; ce n'est pas la
  téléphonie mais **l'hébergement du fichier** qui doit être HDS. Coût d'hébergement HDS
  **absorbé dans le forfait** (pas de facturation séparée).
- **Client avec sa propre téléphonie / PBX** : enregistrement côté client, sur son infra.

**Règle d'or** : le fichier d'enregistrement **vit sur un HDS, jamais sur le poste de
l'agent**.

**Formalités RGPD à activer avec l'option** (renvoi §3/§4) :

- **Base légale** intérêt légitime + **test de balance (LIA)** documenté.
- **Double information** : patient (annonce au décroché + politique de confidentialité) et
  agent (clause contrat + DPA).
- **Durée de conservation courte / échantillonnage** — l'enregistrement permanent de 100 %
  des appels est jugé **disproportionné par la CNIL** ; privilégier l'échantillon QA.
- **Registre art. 30** + **DPA art. 28** couvrant explicitement l'enregistrement **et** son
  hébergement HDS ; **AIPD** à évaluer.

> ⚠️ **Cohérence §3/§4** : enregistrer de la donnée de santé **cumule HDS + accès
> hors-UE**. Contractualiser **de préférence sur le HDS du donneur d'ordre** (marque
> blanche) pour éviter ce cumul, et **re-vérifier au regard du décret souveraineté** (§4)
> avant tout engagement long sur l'option.

---

## 3. Signal offshore : risque RGPD de transfert + risque commercial

Madagascar est un pays **offshore** (hors UE/EEE), ce qui ouvre deux sujets distincts :

- **Référentiel HDS (mai 2024)** : exige un **hébergement en EEE**.
- **Décret du 24 mars 2026** : introduit des **obligations de souveraineté** (applicables
  **septembre 2026**) qui **excluent une bonne partie de l'offshore**.

Pour Salverys :

1. **RGPD — transfert hors-UE.** L'**accès** à de la donnée depuis Madagascar constitue un
   transfert hors-UE à encadrer (clauses contractuelles, mesures techniques, information).
   À noter : **accès ≠ hébergement** — le modèle §2 limite fortement l'exposition, mais le
   sujet doit être **documenté**, pas ignoré.
2. **Vulnérabilité commerciale.** Face à des concurrents « **100 % France** », l'offshore
   est un **angle d'attaque** en appel d'offres. À anticiper dans le discours (montrer que
   la donnée patient ne quitte pas l'hébergeur HDS du cabinet).

> **Conclusion** : le modèle **n'est pas interdit** (l'accès encadré n'est pas un
> hébergement), mais l'offshore est un **risque à documenter et à défendre**, pas à passer
> sous silence. Vérifier l'évolution réglementaire (souveraineté sept. 2026) avant tout
> engagement contractuel long.

---

## 4. Veille décret souveraineté — rappel planifié (décision 2026-06-10)

**⏰ AOÛT 2026 — avant l'entrée en application de septembre : re-vérifier le texte
d'application du décret du 24 mars 2026** (souveraineté HDS) et son impact sur l'accès
distant depuis un pays tiers, **avant tout engagement contractuel long** côté médical.

- Traitement retenu : **simple rappel** (pas d'avis juridique externe à ce stade).
- **Pourquoi ce niveau de traitement suffit** : le GTM prioritaire est la **marque
  blanche** (cf. `CLAUDE.md`) — le donneur d'ordre français porte la relation avec le
  client final et sa propre conformité ; l'exposition réglementaire directe de Salverys
  est réduite d'autant au démarrage. Le sujet redevient critique au moment du **direct
  médical** (2e temps) et des contrats chaînes 3+ sites.
- Si le texte d'application se durcit contre l'accès offshore : repli = VDI hébergé UE
  + clauses contractuelles types renforcées (art. 46), à chiffrer à ce moment-là.
