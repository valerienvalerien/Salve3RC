#!/usr/bin/env bash
# Construit le dossier publié sur Netlify (_site) en ne copiant QUE les
# fichiers publics. Tout le reste (fichiers .md stratégiques, CRM, trésorerie,
# tools/ — dont la source en clair de l'espace client) n'est JAMAIS servi.
set -euo pipefail
cd "$(dirname "$0")/.."

PUBLIC_PAGES=(
  index.html
  simulateur-helpdesk-it.html
  simulateur-informatique.html
  espace-client.html
  espace-client-helpdesk.html
  espace-client-support.html
  espace-candidat.html
  suivi-candidature.html
)

rm -rf _site
mkdir -p _site/assets
cp "${PUBLIC_PAGES[@]}" _site/
cp assets/* _site/assets/

echo "✓ _site construit : $(ls _site | wc -l) entrées."
if ls _site/*.md >/dev/null 2>&1 || [ -d _site/tools ]; then
  echo "✗ ERREUR : fichiers internes présents dans _site" >&2
  exit 1
fi
