# Pitch RECROISE — 3 minutes

> Généré par `node tools/build-pitch.mjs` depuis `public/pitch.js` (source unique, aussi affichée dans l'application, page « Pitch »).
> 374 mots ≈ 2.7 min à 140 mots/minute. Ne décrit que des fonctions opérationnelles.

**0:00 – 0:25**

Le 25 septembre : on travaille, ou pas ? Une journée chômée et payée est annoncée. La veille, un message affirme le contraire. Puis le maintien est confirmé, et le ministre avance une explication par un piratage. Dans ce brouillard, chacun est tenté de partager la version qu'il a vue en premier.

**0:25 – 0:50**

Quand une capture circule sur Facebook, le journaliste comme le particulier font la même chose : ouvrir dix onglets, chercher le communiqué, comparer des dates. Et un simple « vrai » ou « faux » ne dit presque jamais ce qui est exact, ce qui est trompeur, et ce qu'on ne sait pas encore.

**0:50 – 1:30**

RECROISE part de là. Vous collez un lien, vous déposez une capture, ou vous collez un texte. L'application lit le contenu et vous montre le texte extrait, que vous pouvez corriger. Puis elle découpe la publication en affirmations distinctes, sépare les faits, les opinions et les accusations, cherche des vérifications existantes et des sources primaires, et affiche pour chaque affirmation un statut, des sources datées, et ce que chaque source prouve — ou ne prouve pas.

**1:30 – 2:10**

Notre différence, ce sont des règles de méthode appliquées par le code, pas seulement promises. Aucun score de vérité. Une absence de preuve n'est jamais présentée comme une preuve de fausseté. Un communiqué prouve qu'on a déclaré quelque chose, pas que c'est vrai. Trois articles qui recopient le même texte ne comptent pas pour trois confirmations : RECROISE détecte ces reprises. Et chaque citation affichée est retrouvée mot pour mot dans la page lue : sinon, elle est retirée, et le statut est abaissé.

**2:10 – 2:35**

L'analyse automatique est toujours distinguée de la relecture humaine : l'IA propose, la personne relit, et sa relecture est datée dans un journal. Quand Facebook bloque la lecture d'un lien, RECROISE le dit et demande une capture, sans prétendre avoir lu la publication. Et la même méthode s'applique à tous : gouvernement, Russie, Chine, France, sans présumer qu'un camp ment.

**2:35 – 3:00**

RECROISE ne remplace ni les journalistes ni le jugement de chacun : il rend le chemin vers les preuves court, visible et daté. Prochaine étape : archiver les sources primaires, comme les communiqués et les décrets, pour qu'elles restent consultables. RECROISE : avant de partager, remontez aux preuves.

## Avant de monter sur scène

- Démo réelle : exige ANTHROPIC_API_KEY et une clé de recherche (BRAVE_API_KEY ou TAVILY_API_KEY) sur le serveur déployé. Sans elles, ne montrez que le parcours « sans IA » et dites-le.
- Répétez la démo sur 2 ou 3 cas la veille : la qualité des verdicts dépend du modèle et du moteur de recherche, elle n'a pas été mesurée à ce jour.
- Montrez l'échec d'un lien Facebook : c'est une force (honnêteté), pas un défaut.
- N'annoncez pas de chiffre de précision : il n'en existe pas.
