# RECROISE — « Avant de partager, remontez aux preuves. »

Application de vérification assistée de l'information (hackathon FANILO, Madagascar).
**Indépendante de Salverys** : dossier autonome, aucune dépendance avec le reste du dépôt.

Parcours : **coller un lien / importer une capture / coller un texte → extraire → identifier les affirmations → chercher des sources → analyse justifiée, datée, nuancée**, avec relecture humaine distincte.

## ⚠️ À lire d'abord

- **`RECROISE.html` (V1) n'était pas dans le dépôt ni dans la session** (ni `/mnt/attach`, ni `uploads`). L'application a donc été **reconstruite** d'après la description (tableau de bord, dossiers, statuts, relecture déclarée annulée après modification, lecture simplifiée, import/export JSON, impression, Méthode/Moodboard/Pitch, deux exemples en lecture seule). Si vous avez le fichier, envoyez-le : on pourra reprendre ses textes et son modèle de données exact. L'ancien format JSON V1 n'est **pas** importable (format inconnu) ; l'export v2 l'est.
- **Les sources n'ont pas pu être relues** (Sifaka, Midi Madagasikara) : l'environnement de développement bloque ces domaines. Les deux exemples documentaires reprennent la chronologie transmise, **attribuée aux médias**, sans citation inventée, avec la mention « non relue ». À relire avant toute citation publique (surtout : le sens réel du titre Sifaka, la date du décret, le verdict de l'article sur Moscou).
- **Règlement FANILO** : aucune source publiée trouvée en recherche. Vérifiez auprès de l'organisateur les règles de préparation avant le 2 novembre (code déjà écrit avant l'événement ?). Rappel : 2 nov. 8 h → 3 nov. 20 h = **36 h**.
- **Aucun test avec le vrai modèle ni un vrai moteur de recherche** (pas de clé dans l'environnement). Tout le pipeline est testé contre des serveurs factices qui **trichent exprès** (citation inventée, source inexistante). La qualité réelle des verdicts n'est **pas mesurée**.

## Démarrer

```bash
cd recroise
npm install
cp .env.example .env     # puis renseigner les clés (ou exporter les variables)
node --env-file=.env server.js     # http://localhost:8080
```

| Variable | Rôle | Sans elle |
|---|---|---|
| `ANTHROPIC_API_KEY` | Identification des affirmations, jugement, **lecture des captures côté serveur** | Mode « règles » : affirmations repérées par regex, **aucun verdict** ; lecture de capture dans le navigateur (Tesseract) |
| `BRAVE_API_KEY` ou `TAVILY_API_KEY` (+ `SEARCH_PROVIDER`) | Recherche de sources | Secours DuckDuckGo HTML sans clé (**fragile**, peut être bloqué) |
| `RECROISE_MODEL` / `RECROISE_EFFORT` / `RECROISE_FALLBACKS` | Défaut : `claude-opus-5-5`, effort `medium`, repli serveur activé (`=0` pour couper) | — |
| `PORT` | 8080 | — |

La page « Méthode » affiche l'état réel du serveur (IA, recherche, OCR).

## Déployer

Serveur Node unique (sans base de données, sans état) : `Dockerfile` fourni (Render, Fly.io, Railway, VPS…). Définir les variables d'environnement sur l'hébergeur ; ne jamais les mettre dans le dépôt. Aucun déploiement n'a été fait (réseau bloqué) : **pas de lien de démonstration à ce jour**. Le `netlify.toml` de la racine appartient au site Salverys : ne pas l'utiliser pour ce projet.

## Architecture

```
server.js            API + fichiers statiques + en-têtes de sécurité (CSP…)
lib/net-guard.js     fetch d'URL sécurisé (SSRF)         lib/html-extract.js  texte/titre/date d'une page
lib/image.js         validation d'image par les octets    lib/ocr.js           lecture de capture (vision)
lib/llm.js           SDK Anthropic + schémas JSON         lib/search.js        Brave / Tavily / DuckDuckGo
lib/analyze.js       pipeline + VALIDATION côté serveur   lib/heuristics.js    mode sans IA
public/              interface (HTML/CSS/JS sans build), exemples, pages, pitch
test/                unit.test.js, server.test.js, e2e.cjs (navigateur)
```

API : `GET /api/status` · `POST /api/extract {url}` · `POST /api/ocr {image}` · `POST /api/analyze {text, sourceUrl}` (réponse NDJSON : événements `progress`, puis `result` ou `error`).

### Garde-fous (testés)
- **Anti-SSRF** : http(s) seul, ports 80/443, pas d'identifiants, IP validée à la connexion (anti DNS-rebinding), **IP littérales validées** (bug trouvé par les tests : Node n'appelle pas `lookup` pour une IP), redirections revalidées, 2 Mo, 10 s, types HTML/texte seulement.
- **Plateformes fermées** (Facebook, Instagram, X, TikTok, Threads) : jamais lues ; message « je n'ai pas lu cette publication », demande de capture/texte.
- **Images** : type vérifié par les octets (JPEG/PNG/WebP/GIF), 5 Mo, jamais écrites sur disque.
- **Preuves** : le serveur écarte toute source non récupérée et toute citation introuvable mot pour mot dans la page ; un statut Étayé/Contredit/Hors contexte sans citation vérifiée est **abaissé** à « Preuves insuffisantes » ; les extraits de moteur (page non lue) sont signalés ; les **reprises** (textes très proches) ne comptent pas comme confirmations indépendantes.
- Clés uniquement côté serveur ; rendu client échappé (import JSON malveillant testé) ; limite de débit 30 req/min/IP et 3 analyses simultanées (en mémoire, suffisant pour une démo).
- **Conservation** : aucun texte, lien ni image n'est stocké côté serveur ; dossiers dans le `localStorage` du navigateur. Avec la lecture serveur, l'image transite par l'API Anthropic ; avec la lecture navigateur, elle ne quitte pas l'appareil. Les requêtes de recherche sont envoyées au moteur configuré.

## Tests

```bash
npm test                                   # 22 tests (unitaires + intégration API)
NODE_PATH=$(npm root -g) npm run e2e       # 18 étapes dans Chromium (Playwright), captures dans test/screens/
```

Couverts : parcours **texte**, **lien**, **image** ; échecs : lien 404 / PDF / trop gros / redirection / boucle / timeout, Facebook, IP internes et métadonnées cloud, image invalide / déguisée / trop lourde / illisible, texte trop court/long, IA refusée (401), recherche en panne, aucun résultat, aucune affirmation, serveur injoignable, limite de débit, traversée de chemin, import JSON hostile, mobile 390 px sans débordement.

## Ce qui fonctionne / ce qui exige une configuration / ce qui reste à faire

| | |
|---|---|
| ✅ **Fonctionne (testé)** | Interface d'accueil centrée sur lien/capture/texte ; extraction de pages HTML ; texte extrait corrigeable ; progression en direct ; dossiers (créer, éditer le titre, relecture humaine par affirmation, journal, annulation de la relecture), recherche/filtre thème, import/export JSON, impression, lecture simplifiée ; exemples documentaires lecture seule ; Méthode, Moodboard, Pitch ; mode sans IA honnête ; garde-fous ci-dessus |
| 🔑 **Exige une configuration** | Analyse IA et lecture de capture serveur (`ANTHROPIC_API_KEY`) ; recherche fiable (`BRAVE_API_KEY`/`TAVILY_API_KEY`) ; déploiement public (hébergeur) |
| ⚠️ **Implémenté mais NON testé en réel** | Appels au vrai modèle (schémas JSON, paramètre de repli `fallbacks` — retenté sans en cas de 400) ; vrais Brave/Tavily/DuckDuckGo ; **OCR navigateur Tesseract.js** (chargé depuis jsDelivr sans SRI — pour la production, l'héberger dans `public/vendor/tesseract/`, l'application le préfère s'il existe) ; sites réels (encodages, paywalls) |
| 🚧 **Reste à développer** | Archivage daté des sources primaires (communiqués, décrets) ; lecture de PDF ; réseaux sociaux via API officielles ; comptes/partage multi-utilisateurs (dossiers = navigateur seul) ; recherche inversée d'images ; évaluation de la qualité sur un jeu de cas réels ; limitation de débit distribuée ; auth sur l'API si exposée publiquement (les clés payantes sont consommées par chaque visiteur) |

## Pitch

`PITCH.md` (généré par `node tools/build-pitch.mjs` depuis `public/pitch.js`, aussi affiché dans l'app). ~374 mots ≈ 2 min 40. Ne décrit que des fonctions opérationnelles ; voir la section « Avant de monter sur scène » (répéter avec de vraies clés, ne pas annoncer de chiffre de précision).
