/* Archivé le 2026-10-30 (offre médicale abandonnée) — bloc retiré de assets/site.js.
   Simulateur de forfaits médicaux utilisé par simulateur-salverys.html (archivé ici). */
  /* ========================================================
     SIMULATEUR MÉDICAL  (présent si #calls existe)
     ======================================================== */
  if (document.getElementById('calls')) {
    const TIERS = [
      { name: 'Essentiel', max: 250, price: 350 },
      { name: 'Confort',   max: 500, price: 590 },
      { name: 'Intensif',  max: 900, price: 950 },
    ];
    const MARGINAL_PER_100 = 95;
    // Add-ons d'amplitude à prix fixes (PRICING.md §1.a) — base : 5j/7, 8h–20h.
    const WORKDAYS_PER_MONTH = 5 * 4.33; // ≈ 21,7 jours ouvrés
    const st = { calls: 250, integration: 1.0, addons: {} };

    const tierFor = c => TIERS.find(t => c <= t.max) || null;
    const $ = id => document.getElementById(id);
    const addonsTotal = () => Object.values(st.addons).reduce((s, p) => s + p, 0);

    function calc() {
      const tier = tierFor(st.calls);
      let name, base, custom = false;
      if (tier) { name = tier.name; base = tier.price; }
      else { custom = true; name = 'Sur-mesure'; base = 950 + Math.ceil((st.calls - 900) / 100) * MARGINAL_PER_100; }
      const addons = addonsTotal();
      const price = base + addons;
      const INTERNAL_SECRETARY = 2200; // secrétaire interne au cabinet, charges comprises (cf. comparatif)
      const perDay = Math.round(st.calls / WORKDAYS_PER_MONTH);

      $('price-monthly').textContent = (custom ? '≈ ' : '') + euro(price);
      $('price-per-day').textContent = '≈ ' + euro(price / WORKDAYS_PER_MONTH) + ' €';
      $('calls-perday').textContent = '≈ ' + perDay;
      const days = st.addons['samedi-complet'] ? '6 j' : (st.addons['samedi-matin'] ? '5 j + sam. matin' : '5 j');
      $('coverage').textContent = days + ' · ' + (st.addons['soiree'] ? '8h–22h' : '8h–20h');

      const savings = INTERNAL_SECRETARY - price;
      $('savings-monthly').textContent = euro(Math.max(savings, 0)) + ' €';
      const cmp = $('compare-line'), badge = $('savings-badge');
      if (savings > 0) {
        cmp.innerHTML = 'Une secrétaire au cabinet : <span class="old">2 200 €+/mois</span> charges comprises';
        badge.textContent = '−' + Math.round((savings / INTERNAL_SECRETARY) * 100) + ' % vs une secrétaire interne';
      } else {
        cmp.textContent = 'Forfait tout compris, sans surprise.';
        badge.textContent = '1er mois à −50 %';
      }

      let reco;
      if (custom) reco = 'Offre <strong>Sur-mesure</strong> — on cadre ensemble.';
      else if (name === 'Essentiel') reco = 'Forfait <strong>Essentiel</strong> — idéal pour un praticien.';
      else if (name === 'Confort') reco = 'Forfait <strong>Confort</strong> — le meilleur rapport volume / prix.';
      else reco = 'Forfait <strong>Intensif</strong> — pensé pour les cabinets de groupe.';
      $('recommendation').innerHTML = reco;

      const disc = $('sim-disclaimer');
      if (disc) {
        disc.textContent = custom
          ? 'Estimation au-delà de 900 appels · 1er mois à -50 %, sans engagement.'
          : 'Montants fermes (options incluses) · 1er mois à -50 %, sans engagement.';
      }

      // Chip de palier dans la valeur du slider
      const valEl = $('calls-value');
      if (valEl) {
        const slug = name.toLowerCase().replace('-', '');
        valEl.innerHTML = st.calls.toLocaleString('fr-FR') + ' appels <span class="tier-chip tc-' + slug + '">' + name + '</span>';
      }

      // Alerte de seuil : dans les 50 derniers appels avant le prochain palier
      const alertEl = $('tier-alert');
      if (alertEl) {
        const approaching = tier && (tier.max - st.calls) > 0 && (tier.max - st.calls) <= 50;
        if (approaching) {
          const ni = TIERS.indexOf(tier) + 1;
          const nextName = ni < TIERS.length ? TIERS[ni].name : 'Sur-mesure';
          const nextPrice = ni < TIERS.length ? TIERS[ni].price : 950 + MARGINAL_PER_100;
          alertEl.textContent = 'Ce volume reste dans le forfait ' + name + ' — ' + nextName + ' à ' + euro(nextPrice + addons) + ' €/mois au-delà.';
          alertEl.hidden = false;
        } else {
          alertEl.hidden = true;
        }
      }

      pop($('price-monthly'));
    }

    $('calls').addEventListener('input', e => {
      st.calls = parseInt(e.target.value);
      calc();
    });
    // Add-ons d'amplitude : pills multi-sélection (samedi matin / complet exclusifs).
    document.querySelectorAll('[data-addon]').forEach(pill => {
      pill.addEventListener('click', () => {
        const id = pill.dataset.addon;
        if (st.addons[id] !== undefined) {
          delete st.addons[id];
          pill.classList.remove('active');
        } else {
          const excl = pill.dataset.excl;
          if (excl && st.addons[excl] !== undefined) {
            delete st.addons[excl];
            const other = document.querySelector('[data-addon="' + excl + '"]');
            if (other) other.classList.remove('active');
          }
          st.addons[id] = parseInt(pill.dataset.price, 10);
          pill.classList.add('active');
        }
        calc();
      });
    });
    bindPills((name, m) => { st[name] = m; calc(); });
    calc();
  }
