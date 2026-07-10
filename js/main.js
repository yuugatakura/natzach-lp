(function () {
  "use strict";

  const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

  const ICONS = {
    store:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9"/><path d="M9 20v-6h6v6"/></svg>',
    traffic:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/></svg>',
    customers:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>',
    repeat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
    whatsapp:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.86.505 3.605 1.383 5.104L2 22l5.03-1.352A9.958 9.958 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.111c-1.655 0-3.194-.487-4.489-1.322l-.322-.198-2.988.803.813-2.909-.211-.328A8.086 8.086 0 013.889 12c0-4.472 3.64-8.111 8.112-8.111 4.471 0 8.111 3.639 8.111 8.111 0 4.472-3.64 8.111-8.111 8.111z"/></svg>',
  };

  /* proof-card background motifs — abstract SVG, not stock photography */
  const MOCK_VISUALS = {
    trading:
      '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.05)"/>' +
      '<line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.05)"/>' +
      '<line x1="0" y1="120" x2="300" y2="120" stroke="rgba(255,255,255,0.05)"/>' +
      '<g stroke-width="1.5">' +
      '<line x1="26" y1="95" x2="26" y2="125" stroke="rgba(255,255,255,0.22)"/><rect x="20" y="105" width="12" height="15" fill="rgba(255,255,255,0.14)"/>' +
      '<line x1="58" y1="85" x2="58" y2="115" stroke="rgba(217,164,65,0.55)"/><rect x="52" y="90" width="12" height="18" fill="rgba(217,164,65,0.4)"/>' +
      '<line x1="90" y1="70" x2="90" y2="100" stroke="rgba(255,255,255,0.22)"/><rect x="84" y="75" width="12" height="20" fill="rgba(255,255,255,0.14)"/>' +
      '<line x1="122" y1="60" x2="122" y2="90" stroke="rgba(217,164,65,0.55)"/><rect x="116" y="65" width="12" height="17" fill="rgba(217,164,65,0.4)"/>' +
      '<line x1="154" y1="50" x2="154" y2="78" stroke="rgba(217,164,65,0.55)"/><rect x="148" y="55" width="12" height="15" fill="rgba(217,164,65,0.4)"/>' +
      '<line x1="186" y1="40" x2="186" y2="68" stroke="rgba(255,255,255,0.22)"/><rect x="180" y="45" width="12" height="18" fill="rgba(255,255,255,0.14)"/>' +
      '<line x1="218" y1="25" x2="218" y2="55" stroke="rgba(217,164,65,0.55)"/><rect x="212" y="30" width="12" height="18" fill="rgba(217,164,65,0.4)"/>' +
      '<line x1="250" y1="15" x2="250" y2="45" stroke="rgba(217,164,65,0.55)"/><rect x="244" y="18" width="12" height="17" fill="rgba(217,164,65,0.4)"/>' +
      '<line x1="278" y1="8" x2="278" y2="35" stroke="rgba(217,164,65,0.55)"/><rect x="272" y="10" width="12" height="15" fill="rgba(217,164,65,0.4)"/>' +
      "</g>" +
      '<polyline points="26,112 58,99 90,85 122,73 154,62 186,54 218,39 250,26 278,17" fill="none" stroke="rgba(217,164,65,0.5)" stroke-width="1" stroke-dasharray="3 3"/>' +
      "</svg>",
    japan:
      '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="150" cy="58" r="40" fill="rgba(217,164,65,0.10)" stroke="rgba(217,164,65,0.3)" stroke-width="1"/>' +
      '<path d="M76,52 Q150,30 224,52 L224,63 Q150,43 76,63 Z" fill="rgba(255,255,255,0.16)"/>' +
      '<rect x="95" y="58" width="9" height="76" fill="rgba(255,255,255,0.16)"/>' +
      '<rect x="196" y="58" width="9" height="76" fill="rgba(255,255,255,0.16)"/>' +
      '<rect x="90" y="78" width="120" height="7" fill="rgba(255,255,255,0.16)"/>' +
      '<line x1="0" y1="134" x2="300" y2="134" stroke="rgba(255,255,255,0.06)"/>' +
      "</svg>",
  };

  /* ---------- header / nav ---------- */

  function renderSocialIcons(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML =
      '<a class="ig" href="' +
      CONTENT.instagramUrl +
      '" target="_blank" rel="noopener" aria-label="Instagram Natzach">' +
      ICONS.instagram +
      "</a>" +
      '<a class="wa" href="' +
      CONTENT.ctaUrl +
      '" target="_blank" rel="noopener" aria-label="Konsultasi Natzach">' +
      ICONS.whatsapp +
      "</a>";
  }

  function renderNav() {
    const navDesktop = document.getElementById("navDesktop");
    const navMobileLinks = document.getElementById("navMobileLinks");

    CONTENT.nav.forEach((item) => {
      const a1 = document.createElement("a");
      a1.href = item.href;
      a1.textContent = item.label;
      navDesktop.appendChild(a1);

      const a2 = document.createElement("a");
      a2.href = item.href;
      a2.textContent = item.label;
      navMobileLinks.appendChild(a2);
    });

    renderSocialIcons("socialIconsFooter");

    ["heroCta", "finalCta"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = CONTENT.ctaLabel;
        el.href = CONTENT.ctaUrl;
        el.addEventListener("click", () => {
          // Clicking here only means "heading to the Tally form" — the real
          // Lead event fires once the form is actually submitted (see the
          // redirect-page pattern noted for Tally's completion redirect).
          if (typeof fbq === "function") fbq("track", "InitiateCheckout");
        });
      }
    });

    const toggle = document.getElementById("navToggle");
    const mobile = document.getElementById("navMobile");
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobile.querySelectorAll("nav a").forEach((a) =>
      a.addEventListener("click", () => {
        mobile.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- hero ---------- */

  function highlightAccent(text, phrase) {
    return text.replace(phrase, '<span class="text-accent">' + phrase + "</span>");
  }

  function renderHero() {
    document.getElementById("heroHeadline").innerHTML = highlightAccent(
      CONTENT.hero.headline,
      "ambil bagian mereka"
    );
    document.getElementById("heroSub").innerHTML = highlightAccent(CONTENT.hero.sub, "#LebihProfitable");
    document.getElementById("heroMicrocopy").textContent = CONTENT.hero.ctaMicrocopy;

    const secondary = document.getElementById("heroSecondary");
    secondary.textContent = CONTENT.hero.secondaryLabel + " ↓";
    secondary.href = CONTENT.hero.secondaryHref;
  }

  /* ---------- leak visualization ---------- */

  function renderLeak() {
    const leak = CONTENT.hero.leak;
    document.getElementById("leakTitle").textContent = leak.title;
    document.getElementById("leakCaption").textContent = leak.caption;
    document.getElementById("leakCallout").textContent = leak.callout;
    document.getElementById("leakCalloutSource").textContent = "— " + leak.calloutSource;
    document.getElementById("leakOwnedNote").textContent = leak.ownedNote;

    const deducted = leak.segments.reduce((s, seg) => s + seg.amount, 0);
    const net = leak.base - deducted;

    const bar = document.getElementById("leakBarMarket");
    const legend = document.getElementById("leakLegend");
    const greys = [
      "rgba(255,255,255,0.07)",
      "rgba(255,255,255,0.11)",
      "rgba(255,255,255,0.15)",
      "rgba(255,255,255,0.19)",
    ];

    leak.segments.forEach((seg, i) => {
      const segEl = document.createElement("div");
      segEl.className = "leak-seg";
      segEl.style.flexGrow = seg.amount;
      segEl.style.background = greys[i % greys.length];
      bar.appendChild(segEl);

      const li = document.createElement("li");
      const swatch = greys[i % greys.length];
      li.innerHTML =
        '<span class="leak-legend-swatch" style="background:' +
        swatch +
        '"></span>' +
        '<span class="leak-legend-text">' +
        '<span class="leak-legend-title">' +
        seg.label +
        "</span>" +
        '<span class="leak-legend-source">' +
        seg.source +
        "</span>" +
        "</span>" +
        '<span class="leak-legend-amount tnum">' +
        rupiah(seg.amount) +
        "</span>";
      legend.appendChild(li);
    });

    const netSeg = document.createElement("div");
    netSeg.className = "leak-seg leak-seg-net";
    netSeg.style.flexGrow = net;
    netSeg.innerHTML =
      "<span>" + leak.netLabel + "</span><span class=\"tnum\">" + rupiah(net) + "</span>";
    bar.appendChild(netSeg);

    document.getElementById("leakOwnedValue").textContent = rupiah(leak.base);
  }

  /* ---------- bento ---------- */

  function renderBento() {
    document.getElementById("bentoEyebrow").textContent = CONTENT.bento.eyebrow;
    document.getElementById("bentoTitle").textContent = CONTENT.bento.title;
    const grid = document.getElementById("bentoGrid");

    CONTENT.bento.tiles.forEach((tile) => {
      const el = document.createElement("div");
      el.className = "bento-tile reveal" + (tile.anchor ? " anchor" : "");
      el.innerHTML =
        '<div class="bento-icon">' +
        (ICONS[tile.icon] || "") +
        '</div><h3 class="bento-tile-title">' +
        tile.title +
        '</h3><p class="bento-tile-body">' +
        tile.body +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- proof ---------- */

  function renderProof() {
    document.getElementById("proofEyebrow").textContent = CONTENT.proof.eyebrow;
    document.getElementById("proofTitle").textContent = CONTENT.proof.title;

    const intro = document.createElement("p");
    intro.className = "proof-intro";
    intro.textContent = CONTENT.proof.intro;
    document.getElementById("proofTitle").insertAdjacentElement("afterend", intro);

    const grid = document.getElementById("proofGrid");
    CONTENT.proof.cards.forEach((card) => {
      const el = document.createElement("div");
      el.className = "proof-card reveal" + (card.open ? " open" : "");
      el.innerHTML =
        '<div class="proof-card-mock">' +
        (card.open
          ? '<span class="proof-card-mock-plus">+</span>'
          : MOCK_VISUALS[card.visual] || "") +
        '</div><div class="proof-card-body"><p class="proof-card-tag">' +
        card.tag +
        '</p><h3 class="proof-card-title">' +
        card.title +
        '</h3><p class="proof-card-desc">' +
        card.body +
        "</p></div>";
      grid.appendChild(el);
    });
  }

  /* ---------- why ---------- */

  function renderWhy() {
    document.getElementById("whyEyebrow").textContent = CONTENT.why.eyebrow;
    document.getElementById("whyTitle").textContent = CONTENT.why.title;
    const grid = document.getElementById("whyGrid");

    CONTENT.why.items.forEach((item) => {
      const el = document.createElement("div");
      el.className = "why-item reveal";
      el.innerHTML =
        '<h3 class="why-item-title">' +
        item.title +
        '</h3><p class="why-item-body">' +
        item.body +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- testimonials ---------- */

  function renderTestimonials() {
    document.getElementById("testiEyebrow").textContent = CONTENT.testimonials.eyebrow;
    document.getElementById("testiTitle").textContent = CONTENT.testimonials.title;
    const grid = document.getElementById("testiGrid");

    CONTENT.testimonials.items.forEach((t) => {
      const el = document.createElement("div");
      el.className = "testi-card reveal";
      el.innerHTML =
        '<p class="testi-quote">' +
        t.quote +
        '</p><p class="testi-attribution">' +
        t.attribution +
        '</p><p class="testi-source">' +
        t.source +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- metrics ---------- */

  function renderMetrics() {
    document.getElementById("metricsEyebrow").textContent = CONTENT.metrics.eyebrow;
    document.getElementById("metricsTitle").textContent = CONTENT.metrics.title;
    const grid = document.getElementById("metricsGrid");

    CONTENT.metrics.items.forEach((m) => {
      const el = document.createElement("div");
      el.className = "metric reveal";
      el.innerHTML =
        '<div class="metric-value tnum">' +
        m.value +
        m.unit +
        '</div><p class="metric-label">' +
        m.label +
        '</p><p class="metric-source">' +
        m.source +
        "</p>";
      grid.appendChild(el);
    });
  }

  /* ---------- operator ---------- */

  function renderOperator() {
    const op = CONTENT.operator;
    document.getElementById("operatorEyebrow").textContent = op.eyebrow;
    document.getElementById("operatorTitle").textContent = op.title;
    document.getElementById("operatorName").textContent = op.name + " — " + op.role;
    const photoEl = document.getElementById("operatorPhoto");
    if (op.photoUrl) {
      photoEl.classList.remove("is-placeholder");
      photoEl.innerHTML = '<img src="' + op.photoUrl + '" alt="' + op.name + ', ' + op.role + '" loading="lazy">';
    } else {
      photoEl.classList.add("is-placeholder");
      photoEl.textContent = op.photoNote || "";
    }

    const list = document.getElementById("operatorPrinciples");
    op.principles.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      list.appendChild(li);
    });
  }

  /* ---------- faq ---------- */

  function renderFaq() {
    document.getElementById("faqEyebrow").textContent = CONTENT.faq.eyebrow;
    document.getElementById("faqTitle").textContent = CONTENT.faq.title;
    const list = document.getElementById("faqList");

    CONTENT.faq.items.forEach((item, i) => {
      const el = document.createElement("div");
      el.className = "faq-item reveal";
      el.dataset.open = "false";
      const qid = "faq-answer-" + i;
      el.innerHTML =
        '<button class="faq-question" aria-expanded="false" aria-controls="' +
        qid +
        '"><span>' +
        item.q +
        '</span><span class="faq-icon" aria-hidden="true"></span></button>' +
        '<div class="faq-answer" id="' +
        qid +
        '"><div class="faq-answer-inner"><p>' +
        item.a +
        "</p></div></div>";
      list.appendChild(el);

      const btn = el.querySelector(".faq-question");
      btn.addEventListener("click", () => {
        const isOpen = el.dataset.open === "true";
        el.dataset.open = String(!isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  /* ---------- final cta ---------- */

  function renderFinalCta() {
    document.getElementById("finalHeadline").textContent = CONTENT.finalCta.headline;
    document.getElementById("finalSub").textContent = CONTENT.finalCta.sub;
    const steps = document.getElementById("finalSteps");
    CONTENT.finalCta.steps.forEach((s, i) => {
      const li = document.createElement("li");
      li.innerHTML = "<span>" + (i + 1) + "</span>" + s;
      steps.appendChild(li);
    });
  }

  /* ---------- about us ---------- */

  function renderAboutUs() {
    const au = CONTENT.aboutUs;
    document.getElementById("aboutEyebrow").textContent = au.eyebrow;
    document.getElementById("aboutText").textContent = au.text;
    const link = document.getElementById("aboutInstagramLink");
    link.textContent = au.instagramLabel;
    link.href = au.instagramUrl;
  }

  /* ---------- footer ---------- */

  function renderFooter() {
    document.getElementById("footerTagline").textContent = CONTENT.footer.tagline;
  }

  /* ---------- pain grid ---------- */

  function renderPainGrid() {
    document.getElementById("painEyebrow").textContent = CONTENT.painGrid.eyebrow;
    document.getElementById("painTitle").textContent = CONTENT.painGrid.title;
    const grid = document.getElementById("painGrid");

    CONTENT.painGrid.items.forEach((item) => {
      const el = document.createElement("div");
      el.className = "pain-card reveal";
      el.innerHTML =
        '<div class="pain-stat">' +
        item.stat +
        '</div><h3 class="pain-card-title">' +
        item.title +
        '</h3><p class="pain-card-body">' +
        item.body +
        '</p><span class="pain-tag">' +
        item.tag +
        "</span>" +
        (item.source ? '<p class="pain-card-source">' + item.source + "</p>" : "");
      grid.appendChild(el);
    });
  }

  /* ---------- fee trend chart ---------- */

  function renderFeeTrend() {
    const ft = CONTENT.feeTrend;
    document.getElementById("feeTrendEyebrow").textContent = ft.eyebrow;
    document.getElementById("feeTrendTitle").textContent = ft.title;
    document.getElementById("feeTrendSubtitle").textContent = ft.subtitle;
    document.getElementById("feeTrendNote").textContent = ft.note;

    const W = 640;
    const H = 320;
    const plotLeft = 46;
    const plotRight = W - 16;
    const plotTop = 40;
    const plotBottom = H - 60;
    const plotHeight = plotBottom - plotTop;
    const plotWidth = plotRight - plotLeft;
    const maxVal = 25;
    const gridVals = [0, 5, 10, 15, 20, 25];
    const barCount = ft.bars.length;
    const slotWidth = plotWidth / barCount;
    const barWidth = slotWidth * 0.5;
    const yFor = (v) => plotBottom - (v / maxVal) * plotHeight;
    const FONT = "Inter, -apple-system, sans-serif";

    let svg = '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grafik tren biaya marketplace 2020-2026">';

    gridVals.forEach((v) => {
      const y = yFor(v);
      svg +=
        '<line x1="' + plotLeft + '" y1="' + y + '" x2="' + plotRight + '" y2="' + y +
        '" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>' +
        '<text x="' + (plotLeft - 10) + '" y="' + (y + 4) + '" text-anchor="end" font-size="11" fill="#6f6d68" font-family="' + FONT + '">' + v + "%</text>";
    });

    ft.bars.forEach((bar, i) => {
      const xCenter = plotLeft + slotWidth * (i + 0.5);
      const xLeft = xCenter - barWidth / 2;
      const yHigh = yFor(bar.high);
      const yLow = yFor(bar.low);
      svg +=
        '<rect x="' + xLeft + '" y="' + yLow + '" width="' + barWidth + '" height="' + (plotBottom - yLow) + '" fill="rgba(255,255,255,0.10)"/>' +
        '<rect x="' + xLeft + '" y="' + yHigh + '" width="' + barWidth + '" height="' + (yLow - yHigh) + '" fill="rgba(255,255,255,0.26)"/>' +
        '<text x="' + xCenter + '" y="' + (yHigh - 12) + '" text-anchor="middle" font-size="15" font-weight="700" fill="#f5f4f1" font-family="' + FONT + '">' + bar.low + "–" + bar.high + "%</text>" +
        '<text x="' + xCenter + '" y="' + (plotBottom + 22) + '" text-anchor="middle" font-size="13.5" font-weight="600" fill="#f5f4f1" font-family="' + FONT + '">' + bar.label + "</text>" +
        '<text class="fee-chart-sublabel" x="' + xCenter + '" y="' + (plotBottom + 38) + '" text-anchor="middle" font-size="10" fill="#6f6d68" font-family="' + FONT + '">' + bar.sublabel + "</text>";
    });

    const yOwned = yFor(ft.ownedValue);
    svg +=
      '<line x1="' + plotLeft + '" y1="' + yOwned + '" x2="' + plotRight + '" y2="' + yOwned +
      '" stroke="#d9a441" stroke-width="2" stroke-dasharray="6,5"/>' +
      '<text x="' + plotRight + '" y="' + (yOwned - 8) + '" text-anchor="end" font-size="12" font-weight="700" fill="#d9a441" font-family="' + FONT + '">' +
      ft.ownedLabel + ": " + String(ft.ownedValue).replace(".", ",") + "%</text>";

    svg += "</svg>";

    document.getElementById("feeTrendChart").innerHTML = svg;
  }

  /* ---------- calculator ---------- */

  function renderCalc() {
    const c = CONTENT.calc;
    document.getElementById("calcEyebrow").textContent = c.eyebrow;
    document.getElementById("calcTitle").textContent = c.title;
    document.getElementById("calcInputLabel").textContent = c.inputLabel;
    document.getElementById("calcMarketLabel").textContent = c.marketLabel;
    document.getElementById("calcOwnedLabel").textContent = c.ownedLabel;
    document.getElementById("calcSavingsLabel").textContent = c.savingsLabel;
    document.getElementById("calcNote").textContent = c.note;

    const input = document.getElementById("calcInput");

    function formatInput(raw) {
      const digits = raw.replace(/\D/g, "");
      return digits ? Number(digits).toLocaleString("id-ID") : "";
    }

    function compute() {
      const digits = input.value.replace(/\D/g, "");
      const revenue = Number(digits) || 0;

      const marketLow = revenue * c.marketplaceLowPct;
      const marketHigh = revenue * c.marketplaceHighPct;
      const owned = revenue * c.ownedPct;
      const savingsLow = Math.max(0, marketLow - owned);
      const savingsHigh = Math.max(0, marketHigh - owned);
      const savingsYear = ((savingsLow + savingsHigh) / 2) * 12;

      document.getElementById("calcMarketValue").textContent =
        rupiah(marketLow) + " – " + rupiah(marketHigh);
      document.getElementById("calcOwnedValue").textContent = rupiah(owned);
      document.getElementById("calcSavingsValue").textContent =
        rupiah(savingsLow) + " – " + rupiah(savingsHigh);
      document.getElementById("calcSavingsYear").textContent =
        c.savingsYearPrefix + rupiah(savingsYear) + c.savingsYearSuffix;
    }

    input.value = Number(c.defaultValue).toLocaleString("id-ID");
    input.addEventListener("input", () => {
      const caretAtEnd = input.selectionStart === input.value.length;
      input.value = formatInput(input.value);
      if (caretAtEnd) input.setSelectionRange(input.value.length, input.value.length);
      compute();
    });

    compute();
  }

  /* ---------- scroll reveal ---------- */

  function initReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- boot ---------- */

  function init() {
    renderNav();
    renderHero();
    renderLeak();
    renderFeeTrend();
    renderCalc();
    renderPainGrid();
    renderBento();
    renderProof();
    renderWhy();
    renderTestimonials();
    renderMetrics();
    renderOperator();
    renderFaq();
    renderFinalCta();
    renderAboutUs();
    renderFooter();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
