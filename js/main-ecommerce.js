(function () {
  "use strict";

  const rupiah = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

  function highlightAccent(text, phrase) {
    return text.replace(phrase, '<span class="text-accent">' + phrase + "</span>");
  }

  /* ---------- hero + leak visualization (reused from main.js) ---------- */

  function renderHero() {
    document.getElementById("heroHeadline").innerHTML = highlightAccent(
      ECOM_LANDING_CONTENT.hero.headline,
      ECOM_LANDING_CONTENT.hero.accentPhrase
    );
  }

  function renderLeak() {
    const leak = ECOM_LANDING_CONTENT.hero.leak;
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

  /* ---------- problem (trimmed pain grid) ---------- */

  function renderProblem() {
    document.getElementById("problemEyebrow").textContent = ECOM_LANDING_CONTENT.problem.eyebrow;
    document.getElementById("problemTitle").textContent = ECOM_LANDING_CONTENT.problem.title;
    const grid = document.getElementById("problemGrid");

    ECOM_LANDING_CONTENT.problem.items.forEach((item) => {
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

  /* ---------- mechanism ("this is what we build") ---------- */

  function renderMechanism() {
    const m = ECOM_LANDING_CONTENT.mechanism;
    document.getElementById("mechEyebrow").textContent = m.eyebrow;
    document.getElementById("mechTitle").textContent = m.title;
    document.getElementById("mechProofLine").textContent = m.proofLine;

    const list = document.getElementById("mechSteps");
    m.steps.forEach((step, i) => {
      const li = document.createElement("li");
      li.innerHTML =
        '<span class="mech-step-num">' + (i + 1) + "</span>" +
        '<span class="mech-step-body"><span class="mech-step-title">' +
        step.title +
        '</span><span class="mech-step-desc">' +
        step.body +
        "</span></span>";
      list.appendChild(li);
    });
  }

  /* ---------- CTA + sticky bar ---------- */

  function renderCta() {
    ["ctaButton", "stickyCtaButton"].forEach((id) => {
      const el = document.getElementById(id);
      el.textContent = ECOM_LANDING_CONTENT.ctaLabel;
      el.href = ECOM_LANDING_CONTENT.ctaUrl;
    });
    document.getElementById("ctaMicrocopy").textContent = ECOM_LANDING_CONTENT.cta.microcopy;
  }

  function initStickyBar() {
    const bar = document.getElementById("stickyCtaBar");
    const hero = document.querySelector(".hero");
    if (!bar || !hero) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          bar.classList.toggle("visible", !entry.isIntersecting);
        });
      },
      { rootMargin: "0px" }
    );
    io.observe(hero);
  }

  /* ---------- faq ---------- */

  function renderFaq() {
    document.getElementById("faqEyebrow").textContent = ECOM_LANDING_CONTENT.faq.eyebrow;
    document.getElementById("faqTitle").textContent = ECOM_LANDING_CONTENT.faq.title;
    const list = document.getElementById("faqList");

    ECOM_LANDING_CONTENT.faq.items.forEach((item, i) => {
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
    renderHero();
    renderLeak();
    renderProblem();
    renderMechanism();
    renderCta();
    renderFaq();
    initStickyBar();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
