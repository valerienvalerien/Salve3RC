import { PITCH, PREFLIGHT } from './pitch.js';
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const methode = (caps) => `<h1>Méthode</h1><p class="lead">Décomposer une publication en affirmations vérifiables, puis relier chaque conclusion à des preuves consultables et datées.</p>
<section class="stack"><h2>Les cinq statuts</h2>
<p><span class="badge st-etaye">✔ Étayé</span> Une source consultable le confirme, citation à l’appui.</p>
<p><span class="badge st-contredit">✖ Contredit</span> Une source consultable établit le contraire.</p>
<p><span class="badge st-hors_contexte">⚠ Hors contexte ou trompeur</span> Vrai en partie, mais présenté sans sa date, son lieu ou son contexte.</p>
<p><span class="badge st-insuffisant">? Preuves insuffisantes</span> Statut par défaut : on ne sait pas encore.</p>
<p><span class="badge st-opinion">“ Opinion</span> Non soumise à un verdict factuel.</p>
<p class="meta">Le statut est toujours écrit en toutes lettres et accompagné d’un symbole : jamais la couleur seule.</p></section>
<section class="stack"><h2>Règles appliquées</h2><ul>
<li>Une absence de preuve ne démontre pas qu’une information est fausse.</li>
<li>Un communiqué prouve qu’une institution a déclaré quelque chose, pas que tous les faits avancés sont vrais.</li>
<li>Plusieurs articles reprenant le même communiqué ne sont pas plusieurs confirmations indépendantes — RECROISE compare les textes et signale les reprises probables.</li>
<li>Une accusation n’est pas une condamnation.</li>
<li>Une information historique n’est pas appliquée automatiquement au présent : les dates sont conservées.</li>
<li>Aucun score de vérité. Aucune intention de manipulation attribuée sans preuve.</li>
<li>Jamais de source, de citation ou de document inventé : le serveur écarte toute source non récupérée et toute citation introuvable dans la page, puis abaisse le statut.</li>
<li>Même méthode pour tous les acteurs, sans présumer qu’un pays ou un camp ment.</li></ul></section>
<section class="stack"><h2>Analyse automatique et relecture humaine</h2>
<p>L’analyse automatique est une aide. Elle est affichée comme « non relue » jusqu’à ce qu’une personne déclare avoir ouvert les sources et validé le résultat. Modifier un statut ou une note annule la relecture. Les exemples documentaires ne sont pas produits par l’analyse automatique.</p></section>
<section class="stack"><h2>Vos données</h2><ul>
<li><b>Captures</b> : jamais écrites sur le disque du serveur. Avec la « lecture par le serveur », l’image est transmise au service d’IA pour être lue puis oubliée par RECROISE ; avec la « lecture dans mon navigateur », elle ne quitte pas votre appareil.</li>
<li><b>Textes et liens</b> : envoyés au serveur le temps de l’analyse et de la recherche (les extraits servant aux requêtes de recherche sont transmis au moteur de recherche configuré). Le serveur ne garde ni texte ni journal de contenu.</li>
<li><b>Dossiers</b> : enregistrés uniquement dans votre navigateur. Exportez-les en JSON pour les conserver.</li>
<li><b>Clés API</b> : uniquement côté serveur, jamais envoyées au navigateur.</li></ul></section>
<section class="stack"><h2>État de ce serveur</h2><ul>
<li>Analyse IA : <b>${caps.llm ? 'configurée (' + esc(caps.model) + ')' : 'non configurée — aucun verdict possible'}</b></li>
<li>Recherche web : <b>${caps.search ? esc(caps.search) + (caps.searchKeyed ? '' : ' (secours sans clé, fragile)') : 'non configurée'}</b></li>
<li>Lecture des captures par le serveur : <b>${caps.serverOcr ? 'oui' : 'non (lecture dans le navigateur seulement)'}</b></li></ul></section>`;

const sw = (name, hex, use, dark) => `<div class="sw" style="background:${hex};${dark ? 'color:#fff' : ''}"><b>${name}</b>${hex}<br>${use}</div>`;
const moodboard = () => `<h1>Moodboard</h1><p class="lead">Une table de rédaction contemporaine : calme, lisible, documentaire.</p>
<section class="stack"><h2>Palette</h2><div class="swatches">
${sw('Papier ivoire', '#F6F4ED', 'Fond des pages')}${sw('Encre sombre', '#202D29', 'Texte', true)}${sw('Vert profond', '#214E42', 'Actions, repères', true)}${sw('Vert clair de repérage', '#D6EC94', 'Surlignage, « Étayé »')}${sw('Ambre d’attention', '#FFF0C9', 'Alertes, « Hors contexte »')}</div>
<p class="meta">Teintes complémentaires pour les statuts uniquement : brique très clair (#F6D5CC) pour « Contredit », gris-ivoire pour « Preuves insuffisantes », gris-bleu pour « Opinion ». Chaque statut a aussi un symbole et un libellé.</p></section>
<section class="stack"><h2>Typographie</h2><p style="font:700 1.8rem Georgia,serif;margin:0">Georgia — titres éditoriaux</p><p style="margin:0">Arial — commandes et informations, lisible sur mobile, tailles de 16 px minimum pour le texte.</p></section>
<section class="stack"><h2>Éléments visuels</h2><ul><li>Documents, dates, calendriers et chronologies.</li><li>Sources toujours visibles, avec leur date.</li><li>Hiérarchie claire : résumé → affirmations → preuves → sources → limites.</li><li>Surligneur vert clair comme marque de repérage.</li><li>Statuts exprimés en texte, jamais uniquement par la couleur.</li><li>Cibles tactiles de 44 px, interface pensée mobile d’abord.</li></ul></section>
<section class="stack"><h2>Aperçu des statuts</h2><p>${['etaye|✔ Étayé', 'contredit|✖ Contredit', 'hors_contexte|⚠ Hors contexte ou trompeur', 'insuffisant|? Preuves insuffisantes', 'opinion|“ Opinion'].map((x) => { const [k, l] = x.split('|'); return `<span class="badge st-${k}">${l}</span> `; }).join('')}</p></section>`;

const pitch = () => `<h1>Pitch — 3 minutes</h1><p class="lead">Texte final, limité aux fonctions réellement opérationnelles.</p>
<section class="pitch">${PITCH.map(([t, p]) => `<div class="t">${t}</div><p>${esc(p)}</p>`).join('')}</section>
<section class="card" style="margin-top:28px"><h2>Avant de monter sur scène</h2><ul>${PREFLIGHT.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>`;

export function renderStatic(r, caps) { return { methode: () => methode(caps), moodboard, pitch }[r](); }
