import { writeFileSync } from 'node:fs';
import { PITCH, PREFLIGHT } from '../public/pitch.js';
const words = PITCH.map(([, p]) => p).join(' ').split(/\s+/).length;
writeFileSync(new URL('../PITCH.md', import.meta.url), `# Pitch RECROISE — 3 minutes

> Généré par \`node tools/build-pitch.mjs\` depuis \`public/pitch.js\` (source unique, aussi affichée dans l'application, page « Pitch »).
> ${words} mots ≈ ${(words / 140).toFixed(1)} min à 140 mots/minute. Ne décrit que des fonctions opérationnelles.

${PITCH.map(([t, p]) => `**${t}**\n\n${p}`).join('\n\n')}

## Avant de monter sur scène

${PREFLIGHT.map((x) => `- ${x}`).join('\n')}
`);
console.log(words, 'mots');
