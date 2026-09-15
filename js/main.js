/* =============================================================
   Glyde Mobile Detailing — site script
   =============================================================

   >>> EDIT YOUR PRICING AND PACKAGE DETAILS IN THE `CATALOG`
   >>> OBJECT BELOW. Nothing else on the site needs to change.

   To turn on the Premium or Ultimate tier later:
     1. Set  available: true
     2. Fill in  price: { sedan: 0, suv: 0 }  with real numbers
     3. Fill in the  includes: []  list
   The tabs and price card read from here, and the "Package tier" selector
   appears by itself once two or more tiers are available. The price table
   in index.html is plain HTML, so add a row there by hand.
   ============================================================= */

var CATALOG = {
  /* ---------------- INTERIOR ---------------- */
  interior: {
    label: "Interior Detail",
    tagline: "Cabin deep-clean",
    tiers: {
      basic: {
        name: "Basic Interior",
        available: true,
        popular: false,
        price: { sedan: 100, suv: 125 },
        duration: "1.5 – 2.5 hours",
        bestFor: "Routine upkeep & lease returns",
        blurb: "A thorough top-to-bottom clean of everything you touch and see inside the car. We vacuum, wipe, degrease and deodorize the whole cabin so it feels fresh again — without the cost of a full restoration.",
        includes: [
          { title: "Full interior vacuum", detail: "Carpets, floor mats, seats, seat rails, and trunk or cargo area." },
          { title: "Vents, seams & crevices", detail: "Compressed air and detail brushes to pull dust out of the places a vacuum can't reach." },
          { title: "Dash, console & door panels", detail: "Cleaned and finished with a non-greasy UV protectant to slow sun fading." },
          { title: "Cup holders & compartments", detail: "Emptied, wiped out, and degreased — including the center console and glovebox exterior." },
          { title: "Interior glass", detail: "Windshield, all windows and mirrors cleaned streak-free, including the inside rear glass." },
          { title: "Door jambs wiped down", detail: "The dirt line you see every time you open the door — gone." },
          { title: "Seat spot-cleaning", detail: "Light surface spots on cloth treated. Deep stains and full extraction are an add-on." },
          { title: "Deodorize & finish", detail: "Cabin deodorizer and a final inspection walkthrough with you before we leave." }
        ],
        excluded: "Heavy stains, embedded pet hair, mold or strong odors need an add-on — see below."
      },
      premium: {
        name: "Premium Interior",
        available: false,
        price: null,
        blurb: "A deeper interior package with steam cleaning and fabric extraction is on the way."
      },
      ultimate: {
        name: "Ultimate Interior",
        available: false,
        price: null,
        blurb: "Our top-tier interior restoration package is on the way."
      }
    }
  },

  /* ---------------- EXTERIOR ---------------- */
  exterior: {
    label: "Exterior Detail",
    tagline: "Wash, wheels & shine",
    tiers: {
      basic: {
        name: "Basic Exterior",
        available: true,
        popular: false,
        price: { sedan: 100, suv: 125 },
        duration: "1.5 – 2.5 hours",
        bestFor: "Maintenance washes & restoring gloss",
        blurb: "A proper hand wash — not a tunnel wash. We use safe two-bucket technique and plush microfiber so the paint comes out clean and glossy without the swirl marks automatic washes leave behind.",
        includes: [
          { title: "Pre-rinse & foam bath", detail: "Loose grit is lifted off the paint before anything touches it, so it isn't dragged across your clear coat." },
          { title: "Two-bucket hand wash", detail: "pH-neutral soap with grit guards — the method that protects paint instead of scratching it." },
          { title: "Wheels, tires & wheel wells", detail: "Brake dust and road grime cleaned off the face and barrel of each wheel, plus the wells behind them." },
          { title: "Tire dressing", detail: "A clean satin finish on the sidewalls — no greasy sling onto your paint." },
          { title: "Exterior glass", detail: "All windows and mirrors cleaned for a clear, streak-free finish." },
          { title: "Hand-dried, no swirls", detail: "Dried with plush microfiber towels — never a squeegee or a shared rag." },
          { title: "Spray sealant for gloss", detail: "A protective spray wax that adds shine and helps water bead off for weeks." }
        ],
        excluded: "Paint correction, scratch removal and long-term ceramic coating aren't part of the Basic package."
      },
      premium: {
        name: "Premium Exterior",
        available: false,
        price: null,
        blurb: "A longer-lasting protection package with clay decontamination is on the way."
      },
      ultimate: {
        name: "Ultimate Exterior",
        available: false,
        price: null,
        blurb: "Our top-tier paint correction and coating package is on the way."
      }
    }
  },

  /* ---------------- FULL DETAIL ---------------- */
  full: {
    label: "Full Detail",
    tagline: "Inside and out",
    tiers: {
      basic: {
        name: "Basic Full Detail",
        available: true,
        popular: true,
        price: { sedan: 200, suv: 250 },
        duration: "3 – 5 hours",
        bestFor: "First-time clients, seasonal resets & pre-sale prep",
        blurb: "Everything in the Basic Interior and Basic Exterior packages, done in one visit. This is the package most people book first — it resets the whole vehicle at once instead of chasing one half at a time.",
        includes: [
          { title: "Everything in Basic Interior", detail: "Full vacuum, vents and crevices, dash and doors, glass, jambs, spot-cleaning and deodorizing." },
          { title: "Everything in Basic Exterior", detail: "Foam pre-wash, two-bucket hand wash, wheels and tires, glass, hand-dry and spray sealant." },
          { title: "Single appointment", detail: "One visit, one crew, one price — no scheduling the halves separately." },
          { title: "Full walkthrough", detail: "We go around the finished vehicle with you before we pack up, so nothing gets missed." }
        ],
        excluded: "Deep extraction, pet hair, ceramic spray and odor treatment are available as add-ons."
      },
      premium: {
        name: "Premium Full Detail",
        available: false,
        price: null,
        blurb: "A deeper full-vehicle package is on the way."
      },
      ultimate: {
        name: "Ultimate Full Detail",
        available: false,
        price: null,
        blurb: "Our most complete inside-and-out restoration package is on the way."
      }
    }
  }
};

/* Vehicle size labels shown on the price card */
var VEHICLES = {
  sedan: "Sedan / Coupe",
  suv: "SUV / Truck"
};

/* Student discount on package prices (0.20 = 20%). Set to 0 to hide the student price
   in the package tabs — the "20%" wording in index.html must then be removed by hand. */
var STUDENT_DISCOUNT = 0.20;

var TIER_ORDER = ["basic", "premium", "ultimate"];
var TIER_LABELS = { basic: "Basic", premium: "Premium", ultimate: "Ultimate" };

/* ============================================================= */

(function () {
  "use strict";

  var ICON_CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_CLOCK = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v5.3l3.2 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  var ICON_TARGET = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.6" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/></svg>';
  var ICON_INFO = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 11v5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.15" fill="currentColor"/></svg>';

  /* ---------- tiny helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* =========================================================
     1. Footer year
     ========================================================= */
  var yearEl = el("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     2. Mobile navigation
     ========================================================= */
  var header = el("site-header");
  var toggle = el("menu-toggle");
  var nav = el("main-nav");

  if (toggle && header && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* =========================================================
     3. Service / tier / vehicle tab system
     ========================================================= */
  var state = { service: "interior", tier: "basic", vehicle: "sedan" };

  var serviceTabs = Array.prototype.slice.call(document.querySelectorAll("[data-service]"));
  var panel = el("service-panel");

  function renderPanel() {
    if (!panel) return;

    var service = CATALOG[state.service];
    var tier = service.tiers[state.tier];

    /* --- tier tablist — only tiers with real pricing, hidden while there's just one --- */
    var availableTiers = TIER_ORDER.filter(function (key) { return service.tiers[key].available; });
    var showTierTabs = availableTiers.length > 1;
    var tierTabs = availableTiers.map(function (key) {
      var selected = key === state.tier;
      return '<button type="button" role="tab" id="tiertab-' + key + '"' +
        ' aria-selected="' + selected + '" aria-controls="tier-panel"' +
        ' tabindex="' + (selected ? "0" : "-1") + '" data-tier="' + key + '">' +
        esc(TIER_LABELS[key]) + "</button>";
    }).join("");

    /* --- vehicle radio group — only shown when there's a price to change --- */
    var vehicleControl = "";
    if (tier.available) {
      var vehicleBtns = Object.keys(VEHICLES).map(function (key) {
        var checked = key === state.vehicle;
        return '<button type="button" role="radio" aria-checked="' + checked + '"' +
          ' tabindex="' + (checked ? "0" : "-1") + '" data-vehicle="' + key + '">' +
          esc(VEHICLES[key]) + "</button>";
      }).join("");

      vehicleControl =
        '<div class="control-group">' +
          '<span class="control-label" id="vehlabel">Vehicle size</span>' +
          '<div class="segmented" role="radiogroup" aria-labelledby="vehlabel" id="vehicle-group">' + vehicleBtns + "</div>" +
        "</div>";
    }

    /* --- body --- */
    var body;
    if (tier.available) {
      var includes = tier.includes.map(function (item) {
        return "<li>" + ICON_CHECK + "<span><strong>" + esc(item.title) + "</strong> — " + esc(item.detail) + "</span></li>";
      }).join("");

      var popularPill = tier.popular ? '<span class="pill pill-popular">Most booked</span>' : "";

      body =
        '<div class="tier-body">' +
          "<div>" +
            '<div class="tier-headline"><h3>' + esc(tier.name) + "</h3>" + popularPill + "</div>" +
            '<p class="tier-blurb">' + esc(tier.blurb) + "</p>" +
            '<div class="tier-meta">' +
              '<span class="tier-meta-item">' + ICON_CLOCK + "<span>Typical time <strong>" + esc(tier.duration) + "</strong></span></span>" +
              '<span class="tier-meta-item">' + ICON_TARGET + "<span>Best for <strong>" + esc(tier.bestFor) + "</strong></span></span>" +
            "</div>" +
            '<p class="includes-title">What\'s included</p>' +
            '<ul class="includes-list">' + includes + "</ul>" +
          "</div>" +

          '<aside class="price-card">' +
            '<p class="price-card-label">Your price</p>' +
            '<div aria-live="polite">' +
              '<p class="price"><span class="price-currency">$</span><span class="price-amount">' +
                tier.price[state.vehicle] + "</span></p>" +
              '<p class="price-vehicle">' + esc(VEHICLES[state.vehicle]) + " &middot; " + esc(tier.name) + "</p>" +
              (STUDENT_DISCOUNT > 0
                ? '<p class="price-student"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6.5 11v4.2c0 1.3 2.5 2.8 5.5 2.8s5.5-1.5 5.5-2.8V11M21.5 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
                  "<span>Students pay <strong>$" + Math.round(tier.price[state.vehicle] * (1 - STUDENT_DISCOUNT)) +
                  "</strong> with a valid student ID</span></p>"
                : "") +
            "</div>" +
            '<div class="price-card-actions">' +
              '<a class="btn btn-primary btn-block" href="#booking">Book this package</a>' +
              '<a class="btn btn-ghost btn-block" href="tel:+14705299949">Call or text for a quote</a>' +
            "</div>" +
            '<p class="price-note">' + esc(tier.excluded) + "</p>" +
          "</aside>" +
        "</div>";
    } else {
      body =
        '<div class="tier-body">' +
          "<div>" +
            '<div class="tier-headline"><h3>' + esc(tier.name) + '</h3><span class="pill pill-soon">Coming soon</span></div>' +
            '<div class="tier-soon-note">' + ICON_INFO +
              "<p><strong>We're still finalizing this package.</strong> " + esc(tier.blurb) +
              " In the meantime we can quote this work custom — call or text and describe your vehicle, and we'll tell you exactly what it needs and what it costs.</p>" +
            "</div>" +
            "<p>Every Basic package can also be built up with add-ons (extraction, pet hair, ceramic spray, odor treatment) to cover most of what a higher tier would include. Scroll down to see those options and pricing.</p>" +
          "</div>" +

          '<aside class="price-card">' +
            '<p class="price-card-label">Pricing</p>' +
            '<p class="price-soon">Coming soon</p>' +
            '<p class="price-vehicle">Custom quotes available now</p>' +
            '<div class="price-card-actions">' +
              '<a class="btn btn-primary btn-block" href="tel:+14705299949">Call or text for a quote</a>' +
              '<a class="btn btn-ghost btn-block" href="#contact">Send us a message</a>' +
            "</div>" +
            '<p class="price-note">Ask us about custom work — we\'ll inspect your vehicle and give you a firm price before starting.</p>' +
          "</aside>" +
        "</div>";
    }

    panel.innerHTML =
      '<div class="panel-controls">' +
        (showTierTabs
          ? '<div class="control-group">' +
              '<span class="control-label" id="tierlabel">Package tier</span>' +
              '<div class="segmented" role="tablist" aria-labelledby="tierlabel" id="tier-tablist">' + tierTabs + "</div>" +
            "</div>"
          : "") +
        vehicleControl +
      "</div>" +
      (showTierTabs
        ? '<div role="tabpanel" id="tier-panel" aria-labelledby="tiertab-' + state.tier + '" tabindex="0" class="tabpanel">'
        : '<div id="tier-panel" class="tabpanel">') +
        body +
      "</div>";
  }

  /* --- level 1: service tabs --- */
  function selectService(key, focusTab) {
    state.service = key;
    state.tier = "basic"; // always land on the tier that has real pricing
    serviceTabs.forEach(function (tab) {
      var on = tab.dataset.service === key;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.setAttribute("tabindex", on ? "0" : "-1");
      if (on && focusTab) tab.focus();
    });
    if (panel) panel.setAttribute("aria-labelledby", "tab-" + key);
    renderPanel();
  }

  serviceTabs.forEach(function (tab) {
    tab.addEventListener("click", function () { selectService(tab.dataset.service, false); });
    tab.addEventListener("keydown", function (e) {
      var i = serviceTabs.indexOf(tab);
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % serviceTabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + serviceTabs.length) % serviceTabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = serviceTabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        selectService(serviceTabs[next].dataset.service, true);
      }
    });
  });

  /* --- level 2 + vehicle: delegated, since the panel is re-rendered --- */
  if (panel) {
    panel.addEventListener("click", function (e) {
      var tierBtn = e.target.closest("[data-tier]");
      if (tierBtn) { state.tier = tierBtn.dataset.tier; renderPanel(); return; }

      var vehBtn = e.target.closest("[data-vehicle]");
      if (vehBtn) { state.vehicle = vehBtn.dataset.vehicle; renderPanel(); }
    });

    panel.addEventListener("keydown", function (e) {
      var group = e.target.closest("#tier-tablist, #vehicle-group");
      if (!group) return;

      var items = Array.prototype.slice.call(group.querySelectorAll("button"));
      var i = items.indexOf(e.target);
      if (i === -1) return;

      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % items.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + items.length) % items.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = items.length - 1;
      if (next === null) return;

      e.preventDefault();
      var target = items[next];
      if (target.dataset.tier) state.tier = target.dataset.tier;
      else if (target.dataset.vehicle) state.vehicle = target.dataset.vehicle;
      renderPanel();

      // re-find the equivalent control after re-render and move focus to it
      var sel = target.dataset.tier
        ? '[data-tier="' + target.dataset.tier + '"]'
        : '[data-vehicle="' + target.dataset.vehicle + '"]';
      var refocus = panel.querySelector(sel);
      if (refocus) refocus.focus();
    });
  }

  /* Hero pricing card reads the same CATALOG, so it can never
     drift out of sync with the package tabs. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-hero-price]"), function (node) {
    var service = CATALOG[node.dataset.heroPrice];
    if (service && service.tiers.basic.available) {
      node.textContent = "$" + service.tiers.basic.price.sedan;
    }
  });

  // Deep links like #services?interior land on the right tab
  (function initFromHash() {
    var m = /[?&]?(interior|exterior|full)\b/.exec(window.location.hash || "");
    selectService(m ? m[1] : "interior", false);
  })();

  /* =========================================================
     4. FAQ accordion
     ========================================================= */
  Array.prototype.forEach.call(document.querySelectorAll(".faq-q"), function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      var answer = el(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (answer) answer.hidden = open;
    });
  });

  /* =========================================================
     5. Stripe "Pay Online" guard
     Stops a client hitting a dead link before the real
     payment link has been pasted in.
     ========================================================= */
  var payBtn = el("pay-btn");
  var payStatus = el("pay-status");
  if (payBtn) {
    payBtn.addEventListener("click", function (e) {
      if ((payBtn.getAttribute("href") || "").indexOf("YOUR-STRIPE-PAYMENT-LINK") !== -1) {
        e.preventDefault();
        if (payStatus) {
          payStatus.textContent = "Online payment isn't switched on yet — please pay your detailer directly, or call 470-529-9949.";
        }
      }
    });
  }

  /* =========================================================
     6. Contact form — inline validation + error summary
     ========================================================= */
  var form = el("contact-form");
  var statusEl = el("form-status");
  var summaryEl = el("form-summary");
  var summaryList = el("form-summary-list");

  if (form) {
    var fields = [
      { id: "name",    errorId: "name-error",    label: "Name",    message: "Please enter your name so we know who we're talking to." },
      { id: "phone",   errorId: "phone-error",   label: "Phone",   message: "Please enter a phone number we can reach you at." },
      { id: "email",   errorId: "email-error",   label: "Email",   message: "That email address doesn't look right — fix it or leave it blank.", optional: true },
      { id: "message", errorId: "message-error", label: "Your question", message: "Please type your question so we know how to help." }
    ];

    function validateField(field) {
      var input = el(field.id);
      var errorEl = el(field.errorId);
      if (!input) return true;

      var empty = input.value.trim() === "";
      var valid = field.optional ? (empty || input.checkValidity()) : (!empty && input.checkValidity());
      if (!valid) {
        input.setAttribute("aria-invalid", "true");
        if (errorEl) errorEl.textContent = field.message;
      } else {
        input.removeAttribute("aria-invalid");
        if (errorEl) errorEl.textContent = "";
      }
      return valid;
    }

    fields.forEach(function (field) {
      var input = el(field.id);
      if (input) input.addEventListener("blur", function () { validateField(field); });
    });

    form.addEventListener("submit", function (e) {
      var invalid = fields.filter(function (f) { return !validateField(f); });

      if (invalid.length) {
        e.preventDefault();
        if (summaryEl && summaryList) {
          summaryList.innerHTML = invalid.map(function (f) {
            return '<li><a href="#' + f.id + '">' + esc(f.label) + " — " + esc(f.message) + "</a></li>";
          }).join("");
          summaryEl.hidden = false;
          summaryEl.setAttribute("tabindex", "-1");
          summaryEl.focus();
        }
        if (statusEl) { statusEl.textContent = ""; statusEl.className = "form-status"; }
        return;
      }

      if (summaryEl) summaryEl.hidden = true;

      var actionUrl = form.getAttribute("action") || "";
      if (actionUrl.indexOf("YOUR-FORM-ID") !== -1) {
        e.preventDefault();
        if (statusEl) {
          statusEl.textContent = "The form isn't connected yet — please call or text 470-529-9949 instead.";
          statusEl.className = "form-status error";
        }
        return;
      }

      var submitBtn = el("form-submit");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      if (statusEl) { statusEl.textContent = "Sending your message…"; statusEl.className = "form-status"; }
    });
  }

  /* =========================================================
     7. Scroll reveal (skipped when reduced motion is on)
     ========================================================= */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(revealEls, function (n) { n.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.08 });
    Array.prototype.forEach.call(revealEls, function (n) { io.observe(n); });
  }

  /* =========================================================
     8. Hero background video
     Plays the clips listed in data-clips one after another, then
     loops. Skipped on phone-sized screens (saves mobile data) and for
     reduced-motion and data-saver visitors.
     ========================================================= */
  var heroVideo = el("hero-video");
  var heroEl = el("home");
  var videoToggle = el("hero-video-toggle");
  var connection = navigator.connection || {};
  var saveData = connection.saveData || /2g$/.test(connection.effectiveType || "");
  var phoneScreen = window.matchMedia && window.matchMedia("(max-width: 767px)").matches;

  if (heroVideo && heroEl && !reduce && !saveData && !phoneScreen) {
    var heroMedia = heroVideo.parentElement;
    var clips = (heroVideo.getAttribute("data-clips") || "").split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    var clipIndex = 0;
    var failures = 0;
    var userPaused = false;
    var heroInView = true;

    var ICON_PAUSE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
    var ICON_PLAY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>';

    heroVideo.muted = true;

    var loadClip = function (i) {
      clipIndex = i % clips.length;
      heroVideo.src = clips[clipIndex];
    };

    var tryPlay = function () {
      if (userPaused || !heroInView) return;
      var attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(function () {});
    };

    var setToggle = function (paused) {
      if (!videoToggle) return;
      videoToggle.innerHTML = (paused ? ICON_PLAY : ICON_PAUSE) +
        "<span>" + (paused ? "Play video" : "Pause video") + "</span>";
    };

    heroVideo.addEventListener("playing", function () {
      failures = 0;
      heroVideo.classList.remove("is-fading");
      heroVideo.classList.add("is-playing");
      heroMedia.classList.add("is-active");
      heroEl.classList.add("has-video");
      if (videoToggle) videoToggle.hidden = false;
    });

    // Dip to navy just before each clip ends so the cut to the next clip isn't a hard flash
    heroVideo.addEventListener("timeupdate", function () {
      if (heroVideo.duration && heroVideo.duration - heroVideo.currentTime < 0.6) {
        heroVideo.classList.add("is-fading");
      }
    });

    heroVideo.addEventListener("ended", function () {
      loadClip(clipIndex + 1);
      tryPlay();
    });

    heroVideo.addEventListener("error", function () {
      failures += 1;
      if (failures >= clips.length) {
        heroMedia.classList.remove("is-active");
        heroEl.classList.remove("has-video");
        if (videoToggle) videoToggle.hidden = true;
        return;
      }
      loadClip(clipIndex + 1);
      tryPlay();
    });

    if (videoToggle) {
      videoToggle.addEventListener("click", function () {
        userPaused = !userPaused;
        if (userPaused) heroVideo.pause();
        else tryPlay();
        setToggle(userPaused);
      });
    }

    // Stop decoding video while the hero is scrolled out of view
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroInView = entries[0].isIntersecting;
        if (heroInView) tryPlay();
        else heroVideo.pause();
      }).observe(heroEl);
    }

    // Browsers won't autoplay in a background tab, so start once the tab is actually shown
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) heroVideo.pause();
      else tryPlay();
    });

    if (clips.length) {
      loadClip(0);
      tryPlay();
    }
  }
})();
