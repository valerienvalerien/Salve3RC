# ESPACE-CLIENT-CANDIDAT.md — guide d'exploitation (interne)

> Créé le 2026-06-12. Couvre : l'**espace client** (page chiffrée des prix marque
> blanche), l'**espace candidat** (dépôt + suivi de candidature), et le **déploiement
> Netlify** qui garantit que rien d'interne n'est servi. Chiffres : `PRICING.md` fait foi.

---

## 1. Espaces partenaires (2 pages chiffrées) — prix MB protégés

### Architecture
`espace-client.html` est une simple **page d'aiguillage** (aucun prix) vers 2 espaces
chiffrés, **un par offre, chacun avec son propre mot de passe** — un partenaire helpdesk
ne voit jamais la rate card support applicatif, et inversement :

| Espace | Page | Source en clair | Contenu (PRICING.md) |
|---|---|---|---|
| Helpdesk IT N1 | `espace-client-helpdesk.html` | `tools/espace-contenu-helpdesk.html` | rate card 2 000/1 750/1 550 (§3) |
| Support applicatif N1 | `espace-client-support.html` | `tools/espace-contenu-support.html` | rate card 1 700/1 500/1 350 (§3) |

> L'espace **télésecrétariat médical** (`espace-client-medical.html` + sa source) a été
> retiré du site et archivé le 2026-10-30 dans `99-Archives-Medical/site/` (offre
> abandonnée). L'ancienne URL redirige vers `espace-client.html` (`netlify.toml`).

### Comment ça marche
Le contenu est **chiffré AES-256-GCM** dans chaque page, clé dérivée du mot de passe par
**PBKDF2-SHA256 (310 000 itérations)**. Rien n'est lisible dans le code source servi. Le
déverrouillage se fait dans le navigateur (HTTPS ou localhost requis) ; la session reste
ouverte le temps de l'onglet (sessionStorage, clé distincte par espace). Bouton
**« Imprimer / PDF de cadrage »** : génère le PDF confidentiel à remettre sous NDA.

### Mots de passe
- **Un mot de passe par espace**, remis aux partenaires de la niche **au cadrage, sous
  NDA** — jamais par écrit dans un cold email, jamais committé dans le dépôt.
- Les mots de passe en vigueur sont transmis hors dépôt (chat / gestionnaire de mots de
  passe de la direction).

### Rotation d'un mot de passe (à chaque départ de partenaire, ou trimestriellement)
```bash
node tools/espace-client-build.mjs helpdesk "Nouveau-Mot-De-Passe-Fort" --verify
git add espace-client-helpdesk.html && git commit -m "Rotation accès espace helpdesk" && git push
```
(Idem avec `support` — chaque espace tourne indépendamment.)

### Mettre à jour les prix / le contenu
1. Modifier `tools/espace-contenu-<espace>.html` (et d'abord `PRICING.md`, qui fait foi).
2. Relancer la génération de l'espace concerné (même mot de passe ou nouveau).
3. Committer la page générée (+ la source modifiée).

### ⚠️ Sécurité — à lire
- Les `tools/espace-contenu-*.html` sont les **sources en clair** : elles sont dans le
  dépôt (comme `PRICING.md`, qui expose déjà ces prix). **Tant que le dépôt GitHub est
  public, les prix MB fuient par le dépôt, pas par le site.** → **Passer le dépôt en
  privé dès que le site est branché sur Netlify** (déjà prévu).
- Le site servi, lui, est propre : `tools/build-site.sh` ne copie dans `_site/` que les
  pages publiques + `assets/` — ni .md, ni `tools/`, ni CRM, ni trésorerie.

---

## 2. Espace candidat (`espace-candidat.html` + `suivi-candidature.html`)

### Dépôt de candidature
- Formulaire **Netlify Forms** (`name="candidature"`, honeypot anti-spam). À activer :
  au premier deploy, vérifier dans Netlify → **Forms** que « candidature » est détecté ;
  configurer la **notification email** vers contact@salverys.fr (Forms → Notifications).
- Tier gratuit : **100 soumissions/mois** (largement assez). Pas d'upload de fichier :
  le CV est demandé en **lien** (Drive/Dropbox).
- **Repli automatique** : si le POST échoue (site pas encore sur Netlify, Forms
  inactif), le candidat reçoit un lien **email pré-rempli** vers contact@salverys.fr —
  aucune candidature perdue.
- Alternative si on quitte Netlify : Formspree — remplacer l'attribut du `<form>` par
  `action="https://formspree.io/f/<ID>"` et retirer `data-netlify`.

### Code candidat & suivi
- Chaque dépôt génère un code **SLV-XXXXX** (affiché au candidat + inclus dans la
  soumission reçue par email).
- Le suivi lit `assets/candidatures-statuts.json` : mapping `code → statut` parmi
  `recue · entretien · test · acceptee · refusee`. **Tout code absent = « reçue »**
  (donc rien à faire pour les nouveaux dépôts).
- **Mise à jour d'un statut** : éditer le JSON, committer, pousser (Netlify redéploie).
  ```json
  { "SLV-7K2MQ": "entretien" }
  ```
- **RGPD** : le JSON ne contient **que des codes anonymes** — jamais de nom/email.
  Supprimer les codes des candidatures clôturées depuis plus de 6 mois.

---

## 3. Déploiement Netlify

- `netlify.toml` : build = `bash tools/build-site.sh`, publish = `_site/`.
- Pages servies : index, 2 simulateurs (helpdesk IT, support applicatif), espace-client, espace-candidat,
  suivi-candidature + `assets/`. **Tout le reste est exclu** (le script échoue si un .md
  ou `tools/` se retrouve dans `_site/`).
- En-têtes : `espace-client.html` servi en `noindex` + `Cache-Control: no-store`.
- Test local du build : `bash tools/build-site.sh && python3 -m http.server -d _site`.

## 4. Checklist mise en ligne
1. ☐ Brancher le dépôt sur Netlify (build auto via `netlify.toml`).
2. ☐ **Passer le dépôt GitHub en privé.**
3. ☐ Activer la notification email Netlify Forms → contact@salverys.fr.
4. ☐ Tester les 2 espaces partenaires en HTTPS, chacun avec son mot de passe.
5. ☐ Faire un dépôt de candidature test + vérifier la réception + le suivi.
6. ☐ Retirer `SLV-DEMO1` de `assets/candidatures-statuts.json`.
