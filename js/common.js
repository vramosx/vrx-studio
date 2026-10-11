/* VRX Studio — shared helpers (header, footer, reveal, video, lightbox) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var D = window.VRX || { studio: {}, categories: [], projects: [] };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  var U = {
    data: D,
    reduceMotion: function () { return reduce.matches; },
    esc: function (s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    },
    category: function (id) {
      for (var i = 0; i < D.categories.length; i++) if (D.categories[i].id === id) return D.categories[i];
      return { id: id, label: id, code: "" };
    },
    statusLabel: function (s) {
      return ({ "in-development": "In development", beta: "Beta", released: "Available now", concept: "Concept" })[s] || "Coming soon";
    },
    /* Badge text for a project: optional project.statusText overrides the generic label. */
    statusText: function (p) { return (p && p.statusText) || U.statusLabel(p && p.status); },
    projectUrl: function (p) { return "project.html?slug=" + encodeURIComponent(p.slug); },
    mailto: function (subject) {
      return "mailto:" + (D.studio.email || "") + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    },
    isPlaceholder: function (l) { return !l || l.todo || !l.url || l.url === "#"; },
    /* Renders a link as a button; placeholders become disabled "Coming soon" buttons. */
    linkButton: function (l, extraClass, subject) {
      var cls = "btn " + (l.primary ? "primary " : "") + (extraClass || "");
      if (l.url === "mailto:") {
        return '<a class="' + cls + '" href="' + U.esc(U.mailto(subject)) + '">' + U.esc(l.label) + ' <span class="arrow" aria-hidden="true">→</span></a>';
      }
      if (U.isPlaceholder(l)) {
        return '<a class="' + cls + '" role="link" aria-disabled="true" title="Coming soon">' + U.esc(l.label) + ' <span class="soon">Soon</span></a>';
      }
      var ext = /^https?:/.test(l.url);
      return '<a class="' + cls + '" href="' + U.esc(l.url) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + U.esc(l.label) + ' <span class="arrow" aria-hidden="true">↗</span></a>';
    }
  };
  window.VRXU = U;

  /* ---------- footer ---------- */
  function renderFooter() {
    var el = document.querySelector("[data-footer]");
    if (!el) return;
    var cats = D.categories.map(function (c) {
      var n = D.projects.filter(function (p) { return p.category === c.id; }).length;
      return n
        ? "<li><a href=\"index.html?category=" + c.id + "#projects\">" + U.esc(c.label) + "</a></li>"
        : '<li class="muted">' + U.esc(c.label) + " · soon</li>";
    }).join("");
    var projects = D.projects.map(function (p) {
      return '<li><a href="' + U.projectUrl(p) + '">' + U.esc(p.title) + "</a></li>";
    }).join("");
    var socials = (D.studio.socials || []).filter(function (s) { return s.url && s.url !== "#"; });
    var socialHtml = socials.length
      ? socials.map(function (s) { return '<li><a href="' + U.esc(s.url) + '" target="_blank" rel="noopener">' + U.esc(s.label) + "</a></li>"; }).join("")
      : ""; // no public profiles yet (TODO in data/projects.js): render nothing
    el.innerHTML =
      '<div class="wrap">' +
      '<div class="wordmark-xl" aria-hidden="true">VRX Studio</div>' +
      '<div class="footer-top">' +
      '<div><a class="brand" href="index.html"><img src="assets/brand/vrx-mark.png" alt="" width="53" height="22"><span>VRX <small>STUDIO</small></span></a>' +
      '<p class="lede">Independent studio building plugins, tools and digital products. Starting with games — thinking beyond.</p></div>' +
      "<div><h4>Projects</h4><ul>" + projects + "</ul></div>" +
      "<div><h4>Categories</h4><ul>" + cats + "</ul></div>" +
      '<div><h4>Studio</h4><ul><li><a href="index.html#studio">About</a></li><li><a href="' + U.esc(U.mailto("Hello VRX Studio")) + '">' + U.esc(D.studio.email) + "</a></li>" + socialHtml + "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " VRX Studio. All rights reserved.</span><span>Unity, Game Creator 2, Chrome and Xbox Cloud Gaming are trademarks of their respective owners. VRX Studio is not affiliated with Microsoft or Xbox.</span></div>" +
      "</div>";
  }

  /* ---------- header ---------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var last = 0;
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("scrolled", y > 30);
      var menuOpen = doc.classList.contains("menu-open");
      header.classList.toggle("hide", !menuOpen && y > 500 && y > last + 4);
      if (y < last - 4) header.classList.remove("hide");
      last = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    var btn = header.querySelector(".menu-btn");
    if (btn) {
      btn.addEventListener("click", function () {
        var open = doc.classList.toggle("menu-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      header.querySelectorAll(".nav a").forEach(function (a) {
        a.addEventListener("click", function () { doc.classList.remove("menu-open"); btn.setAttribute("aria-expanded", "false"); });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && doc.classList.contains("menu-open")) { doc.classList.remove("menu-open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
      });
    }
  }

  /* ---------- reveal on scroll ---------- */
  var io = null;
  U.observeReveals = function (root) {
    var els = (root || document).querySelectorAll(".reveal:not(.in)");
    if (U.reduceMotion() || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    if (!io) io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  };

  /* ---------- autoplay videos only while visible (and never with reduced motion) ---------- */
  var vio = null;
  U.observeVideos = function (root) {
    var vids = (root || document).querySelectorAll("video[data-autoplay]");
    vids.forEach(function (v) { v.muted = true; v.setAttribute("muted", ""); v.playsInline = true; });
    if (U.reduceMotion()) { vids.forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); }); return; }
    if (!("IntersectionObserver" in window)) { vids.forEach(function (v) { v.play().catch(function () {}); }); return; }
    if (!vio) vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (v.dataset.userPaused === "1") return;
        if (en.isIntersecting) { if (v.preload === "none") v.preload = "auto"; v.play().catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.15 });
    vids.forEach(function (v) { vio.observe(v); });
  };

  /* Hero pause/play toggle (WCAG 2.2.2) */
  U.bindVideoToggle = function (btn, video) {
    if (!btn || !video) return;
    function sync() {
      var paused = video.paused;
      btn.setAttribute("aria-pressed", paused ? "true" : "false");
      btn.querySelector(".lbl").textContent = paused ? "Play video" : "Pause video";
    }
    btn.addEventListener("click", function () {
      if (video.paused) { video.dataset.userPaused = "0"; video.play().catch(function () {}); }
      else { video.dataset.userPaused = "1"; video.pause(); }
    });
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    sync();
  };

  /* ---------- lightbox (images, video, youtube) ---------- */
  var lb, lbFig, lbCount, lbPrev, lbNext, items = [], idx = 0, lastFocus = null;
  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Media viewer");
    lb.innerHTML = '<span class="lb-count" aria-live="polite"></span><figure></figure>' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous">←</button>' +
      '<button class="lb-btn lb-next" type="button" aria-label="Next">→</button>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Close">✕</button>';
    document.body.appendChild(lb);
    lbFig = lb.querySelector("figure"); lbCount = lb.querySelector(".lb-count");
    lbPrev = lb.querySelector(".lb-prev"); lbNext = lb.querySelector(".lb-next");
    lb.querySelector(".lb-close").addEventListener("click", close);
    lbPrev.addEventListener("click", function () { go(-1); });
    lbNext.addEventListener("click", function () { go(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Tab") { // focus trap
        var f = lb.querySelectorAll("button:not([hidden]),video,iframe");
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
  }
  function render() {
    var it = items[idx];
    var cap = it.caption ? "<figcaption>" + U.esc(it.caption) + "</figcaption>" : "";
    if (it.type === "video") lbFig.innerHTML = '<video src="' + U.esc(it.src) + '" ' + (it.poster ? 'poster="' + U.esc(it.poster) + '" ' : "") + "controls autoplay playsinline></video>" + cap;
    else if (it.type === "youtube") lbFig.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + U.esc(it.src) + '?autoplay=1&rel=0" title="Trailer" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>' + cap;
    else lbFig.innerHTML = '<img src="' + U.esc(it.src) + '" alt="' + U.esc(it.alt || it.caption || "") + '">' + cap;
    var multi = items.length > 1;
    lbPrev.hidden = lbNext.hidden = !multi;
    lbCount.textContent = multi ? String(idx + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0") : "";
  }
  function go(d) { idx = (idx + d + items.length) % items.length; render(); }
  function close() {
    lb.classList.remove("open"); lbFig.innerHTML = ""; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  U.openLightbox = function (list, start) {
    if (!lb) buildLightbox();
    items = list; idx = start || 0; lastFocus = document.activeElement;
    render(); lb.classList.add("open"); document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  };
  /* Any element with [data-lb-group] becomes a lightbox trigger; items in the same group are navigable. */
  U.bindLightbox = function (root) {
    (root || document).querySelectorAll("[data-lb-group]").forEach(function (el) {
      if (el.dataset.lbBound) return;
      el.dataset.lbBound = "1";
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var group = Array.prototype.slice.call(document.querySelectorAll('[data-lb-group="' + el.dataset.lbGroup + '"]'));
        U.openLightbox(group.map(function (g) {
          return { type: g.dataset.lbType || "image", src: g.dataset.lbSrc, poster: g.dataset.lbPoster, caption: g.dataset.lbCaption, alt: g.dataset.lbAlt };
        }), group.indexOf(el));
      });
    });
  };

  /* ---------- boot ---------- */
  function boot() {
    renderFooter();
    initHeader();
    U.observeReveals();
    U.observeVideos();
    U.bindLightbox();
    requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add("loaded"); }); });
  }
  U.ready = function (fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); };
  U.ready(boot);
})();
