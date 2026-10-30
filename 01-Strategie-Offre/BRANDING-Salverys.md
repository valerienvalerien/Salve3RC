# Stratégie de marque — Salverys

> Document de référence interne. Toute décision visuelle ou de naming (site, CRM,
> cold email Emelia, cartes de visite, signatures, propositions commerciales)
> s'aligne sur ce document.
>
> **Révision 2026-10-30** : télésecrétariat médical **abandonné** (décision Valérien). Les
> deux lignes de service deviennent **Helpdesk IT N1** (principale, ESN & MSP) et **Support
> applicatif N1** (secondaire, éditeurs de logiciels & SaaS). Lockups et signatures
> ci-dessous mis à jour en conséquence.

---

## 1. Décision (TL;DR)

**Une seule marque : Salverys. Deux lignes de service sous la même bannière.**

On retient l'**Option A — « maison mère + divisions »** : un logo Salverys
unique, avec les deux métiers présentés comme des lignes de service, pas comme
des marques autonomes.

> **Salverys.** — Helpdesk IT N1 · Support Applicatif

**Écarté (Option B) :** créer deux sous-marques indépendantes (« Salverys
Helpdesk » / « Salverys Support ») avec sites, logos et supports séparés. Prématuré et
plus cher à gérer au stade actuel (équipe de 10, on repart de zéro).

---

## 2. Pourquoi l'Option A

| Critère | Option A (retenue) | Option B (écartée) |
|---|---|---|
| Coût de gestion | 1 site, 1 charte, 1 jeu de supports | x2 sur tout |
| Notoriété | Capitalise sur **un seul** nom | Dilue l'effort sur deux |
| Cross-selling | Naturel (« on fait aussi… ») | Frein : deux marques perçues distinctes |
| Crédibilité au démarrage | Une marque qui paraît plus large | Deux marques qui paraissent petites |

L'enjeu au démarrage est de **concentrer** la notoriété, pas de la fragmenter.
On reconsidérera une architecture multi-marques seulement si un segment prend
une ampleur qui justifie sa propre identité (pas avant).

---

## 3. Architecture de marque

```
                        SALVERYS  (marque mère)
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                            │
      Helpdesk IT N1                          Support Applicatif
  (priorité n°1 — ESN & MSP)        (priorité n°2 — éditeurs logiciels & SaaS)
```

- **Salverys** porte la marque, la promesse et la réputation.
- Les deux lignes de service sont des **descripteurs**, jamais des marques :
  on écrit « Salverys — Helpdesk IT N1 », pas « Salverys Helpdesk » en logo
  autonome.
- Priorité commerciale (2026-10-30) : **Helpdesk IT N1 d'abord**, le support
  applicatif en second métier. (Le télésecrétariat médical, ex-priorité n°1, est
  abandonné.)

---

## 4. Le lockup officiel

**Forme longue (site, page d'accueil, signature institutionnelle) :**

> **Salverys.** — Helpdesk IT N1 · Support Applicatif

**Forme courte par contexte** (quand la cible est connue, on ne montre qu'une
ligne pour rester lisible) :

- Cible ESN / MSP → **Salverys.** — Helpdesk IT N1
- Cible éditeurs de logiciels / SaaS → **Salverys.** — Support Applicatif

**Règles :**
- Le point final « **.** » fait partie du logotype, on le garde.
- Le descripteur s'écrit toujours **après** le nom, jamais à la place.
- Jamais de logo « Salverys Helpdesk » ou « Salverys Support » isolé.

### Déclinaisons concrètes (prêtes à copier)

**Footer du site** — ✅ appliqué : descripteur sous la marque (`.brand-desc`).
- `index.html` → forme longue
- `simulateur-helpdesk-it.html` → « Helpdesk IT N1 — Support utilisateurs »
- `simulateur-informatique.html` → « Support N1 — Éditeurs SaaS FR »

**Signature email (Emelia)** — bloc texte, cible **ESN / MSP** :

```
Prénom NOM
Salverys. — Helpdesk IT N1
contact@salverys.fr · salverys.fr
Antananarivo → France · 8h–20h
```

Cible **éditeurs de logiciels / SaaS** : remplacer la 2ᵉ ligne par
`Salverys. — Support Applicatif`.

**Carte de visite** — recto :
- Nom + fonction
- Logotype `Salverys.` (logo `assets/logo-salverys.png`)
- Sous le logo : `Helpdesk IT N1 · Support Applicatif`
- Coordonnées : `contact@salverys.fr · salverys.fr`

**En-tête de proposition commerciale** :

```
Salverys. — Helpdesk IT N1 · Support Applicatif
Proposition commerciale — [Nom du client] — [Date]
```

> En contexte mono-cible (proposition uniquement helpdesk ou uniquement support applicatif),
> utiliser la **forme courte** correspondante.

---

## 5. Identité visuelle

> **Décision (révisée) :** le thème **bleu profond + sauge** est l'identité
> **principale** ; le thème **navy + doré** devient l'identité **secondaire**.
> Bonne nouvelle : c'est déjà l'état du site — le thème **par défaut** de
> `assets/site.css` est le sauge (médical), et `.theme-it` (navy + doré) est
> appliqué aux pages IT. Aucun renversement de thème à coder.

### Logo principal de référence
Le logo **sauge** — pictogramme « agent au casque » teinte **sauge/vert** (historiquement
appelé « logo médical ») — est la **référence visuelle maître** de la marque et le thème
par défaut du site. ⚠️ **À reconsidérer (2026-10-30)** : ce choix était justifié par la
priorité médicale, abandonnée. Le pictogramme reste générique (pas de symbole santé) ;
l'éventuel passage du logo Helpdesk / IT en référence maître est une décision de
direction, non tranchée ici.

### Déclinaison secondaire
Le logo **bleu marine foncé + points dorés/jaunes** (version Support IT &
Applicatif) reste l'identité **secondaire**, utilisée sur les supports et pages
**IT** (`.theme-it`). Elle garde le **même logotype** « Salverys. » et ne
remplace pas le logo maître.

### Palette

| Rôle | Valeur dans le site | Statut |
|---|---|---|
| Bleu profond (primaire) | `#2E3B4E` (`:root`) | **Couleur primaire principale** |
| Sauge (accent) | `#6F8770` (`:root`) | **Accent principal** |
| Or chaud | `#B89968` (`:root`) | Accent secondaire / détails |
| Greige (fond doux) | `#F6F2EA` (`:root`) | Fond doux **et** texte sur aplats d'accent |
| Navy (secondaire) | `#013C58` (`.theme-it`) | Réservé aux supports / pages **IT** |
| Doré profond (secondaire) | `#F0B429` (`.theme-it`) | Accent du thème IT — **décision finale** |

### Règle de lisibilité — texte sur aplat d'accent
Tout **texte posé sur un aplat d'accent** (sauge, doré) s'écrit en
**`#F6F2EA` (fond doux)**. Validé sur les deux accents retenus :
- Sauge `#6F8770` → texte crème `#F6F2EA` ✓
- Doré profond `#F0B429` → texte crème `#F6F2EA` ✓ (arbitrage clos)

> 👁️ **Pour comparer visuellement** : ouvrir `comparaison-charte-salverys.html`
> dans un navigateur (principal sauge vs secondaire navy, couleur + typo +
> composants réels). Aperçu rapide aussi dans `comparaison-charte-salverys.png`.

---

## 6. Naming — règles fermes

- **Salverys** partout, sur tous les livrables et tous les canaux.
- Les anciens noms **Nesvalo** et **Vinlo** ne doivent apparaître dans aucun
  livrable, séquence, CRM ou support client.
- **Exception technique (interne, invisible client)** : dans `CRM_Salverys.html`,
  les clés `localStorage` préfixées `vinlo_` restent inchangées pour ne pas
  effacer les données déjà saisies. C'est de la plomberie de stockage, pas de la
  marque.
- À noter (cf. §7) : une clé `nesvalo_custom_templates_v1` subsiste dans le CRM.
  Même logique que les clés `vinlo_` (renommer effacerait les modèles enregistrés),
  mais à tracer ici car elle porte l'ancien nom.

---

## 7. Plan d'action / checklist

État des lieux du dépôt à date :

- [x] Site (`index.html`, simulateurs) en marque **Salverys**.
- [x] CRM (`CRM_Salverys.html`) en marque **Salverys** côté affichage.
- [x] Aucun **Nesvalo/Vinlo** visible côté client (uniquement clés `localStorage`).
- [x] **Charte couleur cohérente** : thème par défaut = sauge (principal),
      `.theme-it` = navy + doré (secondaire). Conforme à la décision révisée,
      aucun renversement à coder.
- [x] **Appliquer la règle de lisibilité** : texte `#F6F2EA` sur aplat d'accent
      dans `assets/site.css` — `--cta-text: #F6F2EA` sur les deux thèmes.
- [x] **Nuance dorée du thème secondaire tranchée** : `#F0B429` (doré profond)
      retenu. Texte crème lisible, arbitrage clos.
- [x] **Lockup décliné sur le footer du site** (forme longue sur l'accueil,
      formes courtes par contexte sur les simulateurs).
- [ ] **Appliquer le lockup hors-site** : signature Emelia, cartes de visite,
      en-tête des propositions (blocs prêts à copier au §4).
- [ ] *(optionnel, interne)* tracer / planifier le sort de la clé
      `nesvalo_custom_templates_v1` dans le CRM.

> Règle CLAUDE.md rappelée : **SaaS-first**. Cette stratégie ne nécessite aucun
> développement maison — c'est un cadrage de marque. Toute mise en œuvre visuelle
> reste de l'édition de gabarits existants (CSS/HTML), pas du nouveau code.
