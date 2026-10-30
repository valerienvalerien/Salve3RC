# SETUP-COLD-MAILING.md — Stack & hébergeurs (handoff)

> Mémo de cadrage pour démarrer/scaler le cold mailing Salverys proprement.
> Complète `WARMUP-MANUEL.md`, `SESSION-WARMUP-DEMARRAGE.md` et `planningchauffesalverys.html`
> (procédure de chauffe). Coûts chiffrables dans `tresorerie-salverys.html` (ligne « Infra cold »).

## 1. Règle d'or

**Le domaine de cold mailing ≠ le domaine daily/marque.** On ne brûle JAMAIS le domaine
des vrais mails clients (`salverys.fr`) avec de la prospection. Un mail client en spam
= perte directe.

## 2. Architecture cible

| Usage | Domaine | Hébergeur | Volume |
|---|---|---|---|
| **Daily / clients / contrats** | `salverys.fr` (marque) | **M365** | normal |
| **Cold mailing** | 2-3 domaines secondaires | **GWS** | faible, plafonné, chauffé |

- Les domaines cold **redirigent vers `salverys.fr`** (le prospect qui clique atterrit sur le vrai site).
- Daily sur M365 / cold sur GWS = **deux écosystèmes séparés** → réputations isolées. ✅

## 3. Hébergeur mail

- **Daily → Microsoft 365** (choix retenu). Sur `salverys.fr`.
- **Cold → Google Workspace (GWS)**. ~6 €/boîte/mois (Business Starter). Déjà en place sur
  `salverys-bpo.fr`. GWS passe par les serveurs Google → pas de risque d'IP perso blacklistée.
- **Alternatives cold** (si besoin de scaler fort un jour) : infra dédiée type Maildoso /
  Mailreef (boîtes cold clés-en-main). **Pas nécessaire au démarrage** — GWS suffit.

## 4. Domaines : combien, lesquels, où acheter

**Combien** : **2-3 domaines** de cold au démarrage, **2 boîtes/domaine** → 4-6 adresses.
Chaque adresse : ~20-40 mails/j **une fois chauffée**.

**Lesquels (naming)** : des lookalikes proches de la marque mais **distincts** de `salverys.fr`.
Ex. : `salverys-bpo.fr` (déjà pris), `salverys-bpo.com`, `getsalverys.fr`, `salverys-pro.fr`.
Mélanger `.fr` (crédibilité marché FR) et `.com`.

**Où acheter (registrar)** :
- **Cloudflare Registrar** — `.com` au prix coûtant (zéro marge) + **DNS gratuit et simple**
  pour gérer SPF/DKIM/DMARC. **Recommandé** pour les `.com`.
- **OVH** (français) — `.fr` pas cher, idéal pour les domaines en `.fr`.
- **Gandi** (français) — fiable, un peu plus cher.
- **Namecheap / Porkbun** — `.com` très bon marché si volume.

> Conseil : gérer **tout le DNS sur Cloudflare** (même les domaines achetés ailleurs) →
> un seul endroit pour SPF/DKIM/DMARC et les redirections.

## 5. Checklist de setup (par domaine cold)

- [ ] Domaine acheté + DNS sur Cloudflare
- [ ] Boîtes créées sur GWS (2/domaine, expéditeur = vraie personne, ex. `prenom@...`)
- [ ] **SPF** + **DKIM** + **DMARC** (`p=none` au début, puis `quarantine`)
- [ ] Redirection du domaine cold → `salverys.fr`
- [ ] Google Postmaster Tools branché
- [ ] **mail-tester 10/10** (config technique uniquement — ≠ réputation)
- [ ] **Warm-up 3-4 semaines** AVANT toute campagne (cf. planning de chauffe)
- [ ] Branchement **Emelia** (outil d'envoi retenu) + sa chauffe intégrée, plafond bas au départ

## 6. Outils & coûts

- **Envoi : Emelia** (outil retenu, cf. `CLAUDE.md`).
- **Infra : GWS** (~6 €/boîte/mois) + domaines (~10-15 €/an chacun).
- Ordre de grandeur : 3 dom × 2 boîtes × 6 € = **~36 €/mois** + Emelia.
- Modélisable dans `tresorerie-salverys.html` → ligne « Infra cold — domaines GWS ».
- **Le coût n'est pas le sujet** (négligeable vs charges ~7 100 €) ; le sujet est la
  **délivrabilité**. Mieux vaut 6 adresses bien chauffées qu'une seule saturée.

## 7. Erreurs à éviter

1. Envoyer **avant la fin de la chauffe** (= spam direct, ce qui est déjà arrivé sur
   `salverys-bpo.fr`, domaine créé le 2026-06-02).
2. **Tout envoyer depuis une seule boîte/domaine** → plafond bas + point de défaillance unique.
3. Cold mailing **depuis `salverys.fr`** → brûle le domaine de marque. Interdit.
4. Confondre **mail-tester 10/10** (technique) avec **bonne réputation** (comportement + chauffe).
5. Listes non nettoyées → bounces/complaints → blacklistage (récupération : semaines à mois).
