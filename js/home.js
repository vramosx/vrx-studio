/* VRX Studio — home page rendering (all content comes from data/projects.js) */
(function () {
  "use strict";
  var U = window.VRXU, D = U.data, esc = U.esc;
  var $ = function (s) { return document.querySelector(s); };
  // Featured projects (featured: true, in data order). The hero rotates between them; each gets a featured panel.
  var featuredList = D.projects.filter(function (p) { return p.featured; });
  if (!featuredList.length && D.projects.length) featuredList = [D.projects[0]];
  var featured = featuredList[0];

  function trailerItem(p) {
    var tr = (p.media && p.media.trailer) || {};
    var cap = p.title + " — " + (tr.label || "Official trailer");
    if (tr.youtube) return { type: "youtube", src: tr.youtube, caption: cap };
    if (tr.src) return { type: "video", src: tr.src, poster: tr.poster, caption: cap };
    return null;
  }
  function focusStyle(m) {
    return (m.heroFocus || m.heroFocusMobile) ? ' style="' + (m.heroFocus ? "--focus:" + esc(m.heroFocus) + ";" : "") + (m.heroFocusMobile ? "--focus-m:" + esc(m.heroFocusMobile) : "") + '"' : "";
  }

  /* ---------- hero (rotating background between featured projects) ---------- */
  var slides = featuredList.filter(function (p) { return p.media && p.media.heroVideo; });
  var heroIdx = 0, heroTimer = null, heroHold = false, HERO_MS = 9000;
  var hm = $("[data-hero-media]"), toggle = $("[data-video-toggle]");
  if (slides.length) {
    hm.innerHTML = slides.map(function (p, i) {
      return '<video class="hero-slide' + (i === 0 ? " on" : "") + '"' + focusStyle(p.media) + (i === 0 && !U.reduceMotion() ? " autoplay" : "") + ' muted loop playsinline preload="' + (i === 0 ? "auto" : "none") + '" poster="' + esc(p.media.heroPoster || p.cover) + '" aria-hidden="true" tabindex="-1">' +
        '<source src="' + esc(p.media.heroVideo) + '" type="video/mp4"></video>';
    }).join("");
  }
  var heroVids = hm.querySelectorAll("video");
  var actions = $("[data-hero-actions]");
  actions.insertAdjacentHTML("beforeend", '<button class="btn" type="button" data-home-trailer hidden><span class="play-ico" aria-hidden="true"></span> <span data-trailer-lbl>Watch trailer</span></button>');
  var trailerBtn = $("[data-home-trailer]");
  trailerBtn.addEventListener("click", function () {
    var it = trailerItem(slides[heroIdx] || featured);
    if (it) U.openLightbox([it], 0);
  });

  var nowEl = $("[data-now]");
  function renderNow(p) {
    var multi = slides.length > 1;
    nowEl.innerHTML = '<div class="now-wrap"><a class="now-card" href="' + U.projectUrl(p) + '">' +
      '<img src="' + esc(p.cover) + '" alt="" width="96" height="54">' +
      "<span><small>" + esc(U.statusLabel(p.status)) + "</small><b>" + esc(p.title) + "</b></span></a>" +
      (multi ? '<div class="hero-dots" role="group" aria-label="Featured projects">' + slides.map(function (s, i) {
        return '<button type="button" class="hero-dot" data-slide="' + i + '" aria-label="Show ' + esc(s.title) + '" aria-pressed="' + (i === heroIdx ? "true" : "false") + '"><span>' + String(i + 1).padStart(2, "0") + "</span><i></i></button>";
      }).join("") + "</div>" : "") + "</div>";
  }
  function playActive() {
    heroVids.forEach(function (v, i) {
      if (i === heroIdx) {
        if (v.preload === "none") v.preload = "auto";
        if (!U.reduceMotion() && v.dataset.userPaused !== "1") v.play().catch(function () {});
      } else v.pause();
    });
  }
  function showSlide(i, fromUser) {
    var p = slides[i] || featured;
    heroIdx = i;
    heroVids.forEach(function (v, k) { v.classList.toggle("on", k === i); });
    var it = trailerItem(p);
    trailerBtn.hidden = !it;
    var lbl = (p.media && p.media.trailer && p.media.trailer.label) ? "Watch " + p.media.trailer.label.toLowerCase() : "Watch trailer";
    trailerBtn.querySelector("[data-trailer-lbl]").textContent = lbl;
    trailerBtn.setAttribute("aria-label", lbl + ": " + p.title);
    renderNow(p);
    playActive();
    if (fromUser) restartTimer();
  }
  function restartTimer() {
    clearInterval(heroTimer); heroTimer = null;
    if (slides.length < 2 || U.reduceMotion() || heroHold) return;
    var nowVid = heroVids[heroIdx];
    if (nowVid && nowVid.dataset.userPaused === "1") return;
    heroTimer = setInterval(function () { showSlide((heroIdx + 1) % slides.length); }, HERO_MS);
  }
  nowEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-slide]");
    if (b) showSlide(+b.dataset.slide, true);
  });
  // pause the rotation while the user interacts with the hero controls
  var heroEl = $(".hero");
  heroEl.addEventListener("focusin", function () { heroHold = true; restartTimer(); });
  heroEl.addEventListener("focusout", function () { heroHold = false; restartTimer(); });
  if (featured) showSlide(0);
  if (heroVids.length) {
    toggle.hidden = U.reduceMotion();
    // the toggle pauses/plays the visible slide and stops/resumes the rotation
    toggle.addEventListener("click", function () {
      var v = heroVids[heroIdx], willPause = !v.paused;
      heroVids.forEach(function (x) { x.dataset.userPaused = willPause ? "1" : "0"; });
      if (willPause) v.pause(); else v.play().catch(function () {});
      restartTimer();
    });
    function syncToggle() {
      var v = heroVids[heroIdx], paused = v.paused;
      toggle.setAttribute("aria-pressed", paused ? "true" : "false");
      toggle.querySelector(".lbl").textContent = paused ? "Play video" : "Pause video";
    }
    heroVids.forEach(function (v) { v.addEventListener("play", syncToggle); v.addEventListener("pause", syncToggle); });
    syncToggle();
    // only animate while the hero is on screen
    if ("IntersectionObserver" in window && !U.reduceMotion()) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { playActive(); restartTimer(); }
          else { heroVids.forEach(function (v) { v.pause(); }); clearInterval(heroTimer); heroTimer = null; }
        });
      }, { threshold: 0.1 }).observe(heroEl);
    }
    restartTimer();
  }

  /* ---------- marquee ---------- */
  var words = D.categories.map(function (c) {
    var has = D.projects.some(function (p) { return p.category === c.id; });
    return '<span class="' + (has ? "on" : "") + '">' + esc(c.label) + "</span>";
  }).join("");
  $("[data-marquee]").innerHTML = '<div class="marquee-track"><div style="display:flex;gap:56px">' + words + words + '</div><div style="display:flex;gap:56px" aria-hidden="true">' + words + words + "</div></div>";

  /* ---------- featured (one cinematic panel per featured project, alternating sides) ---------- */
  $("[data-featured]").innerHTML = featuredList.map(function (fp, i) {
    var cat = U.category(fp.category), m = fp.media || {};
    var poster = m.cardPoster || fp.cover;
    var media = m.cardVideo
      ? '<video data-autoplay muted loop playsinline preload="metadata" poster="' + esc(poster) + '" aria-hidden="true"><source src="' + esc(m.cardVideo) + '" type="video/mp4"></video>'
      : '<img src="' + esc(poster) + '" alt="" loading="lazy">';
    var live = (fp.links || []).filter(function (l) { return l.primary && !U.isPlaceholder(l); })[0];
    var tr = trailerItem(fp);
    return '<article class="featured reveal' + (i % 2 ? " flip" : "") + '">' +
      '<div class="featured-media">' + media +
      '<span class="corner tl">' + esc(cat.label) + " / " + esc(fp.platform) + '</span><span class="corner bl">' + esc(fp.code || "") + "</span></div>" +
      '<div class="featured-body"><span class="glow" aria-hidden="true"></span>' +
      '<div class="featured-top">' + (fp.icon ? '<img class="f-icon" src="' + esc(fp.icon) + '" alt="" width="48" height="48" loading="lazy">' : "") +
      '<span class="status" data-status="' + esc(fp.status) + '"><i></i>' + esc(U.statusText(fp)) + "</span></div>" +
      "<h3>" + esc(fp.title) + "</h3>" +
      '<p class="tagline">' + esc(fp.tagline) + "</p>" +
      "<p>" + esc(fp.summary) + "</p>" +
      '<div class="tags">' + (fp.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" +
      '<div class="featured-actions"><a class="btn primary" href="' + U.projectUrl(fp) + '">View project <span class="arrow" aria-hidden="true">→</span></a>' +
      (live ? U.linkButton({ label: live.label, url: live.url }, "", fp.title) : (tr ? '<button class="btn" type="button" data-f-trailer="' + i + '"><span class="play-ico" aria-hidden="true"></span> Trailer</button>' : "")) +
      "</div></div></article>";
  }).join("");
  $("[data-featured]").addEventListener("click", function (e) {
    var b = e.target.closest("[data-f-trailer]");
    if (b) { var it = trailerItem(featuredList[+b.dataset.fTrailer]); if (it) U.openLightbox([it], 0); }
  });

  /* ---------- catalog ---------- */
  var filtersEl = $("[data-filters]"), gridEl = $("[data-grid]"), horizonEl = $("[data-horizon]");
  function count(id) { return D.projects.filter(function (p) { return id === "all" || p.category === id; }).length; }
  // Only categories that actually have projects get a filter tab; the rest go to the "On the horizon" strip.
  var activeCats = D.categories.filter(function (c) { return count(c.id) > 0; });
  var futureCats = D.categories.filter(function (c) { return count(c.id) === 0; });
  var tabs = [{ id: "all", label: "All" }].concat(activeCats);
  filtersEl.innerHTML = tabs.map(function (c) {
    return '<button class="filter" type="button" data-filter="' + esc(c.id) + '" aria-pressed="false">' + esc(c.label) + "<sup>" + String(count(c.id)).padStart(2, "0") + "</sup></button>";
  }).join("");
  // Hide the toolbar only when no category has projects.
  filtersEl.hidden = activeCats.length === 0;

  function projectCard(p, i) {
    var cat = U.category(p.category);
    var cover = p.cover; // catalog cards use the cover; featured panels use media.cardPoster
    var vid = p.media && p.media.cardVideo ? '<video muted loop playsinline preload="none" aria-hidden="true" data-hover-video><source src="' + esc(p.media.cardVideo) + '" type="video/mp4"></video>' : "";
    return '<article class="card reveal" style="--d:' + (i * 0.08) + 's">' +
      '<div class="card-media"><img src="' + esc(cover) + '" alt="" loading="lazy">' + vid + "</div>" +
      '<div class="card-body"><div class="card-top"><span>' + esc(cat.label) + " · " + esc(p.platform || "") + '</span><span class="status" data-status="' + esc(p.status) + '"><i></i>' + esc(U.statusText(p).replace(/ on .*$/, "")) + "</span></div>" +
      "<h3>" + esc(p.title) + "</h3><p>" + esc(p.tagline) + "</p>" +
      '<a class="link-arrow cover-link" href="' + U.projectUrl(p) + '">View project <span aria-hidden="true">→</span><span class="sr-only">: ' + esc(p.title) + "</span></a></div></article>";
  }
  function render(filter) {
    filtersEl.querySelectorAll(".filter").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.filter === filter ? "true" : "false"); });
    var list = D.projects.filter(function (p) { return filter === "all" || p.category === filter; });
    gridEl.classList.toggle("single", list.length === 1);
    gridEl.classList.toggle("duo", list.length === 2);
    gridEl.innerHTML = list.map(projectCard).join("");
    U.observeReveals(gridEl);
    gridEl.querySelectorAll("[data-hover-video]").forEach(function (v) {
      var card = v.closest(".card");
      v.addEventListener("playing", function () { v.classList.add("ready"); });
      if (U.reduceMotion()) return;
      card.addEventListener("mouseenter", function () { v.play().catch(function () {}); });
      card.addEventListener("mouseleave", function () { v.pause(); });
    });
  }
  filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest(".filter");
    if (!b) return;
    render(b.dataset.filter);
    var url = new URL(location.href);
    if (b.dataset.filter === "all") url.searchParams.delete("category"); else url.searchParams.set("category", b.dataset.filter);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  });
  var initial = new URLSearchParams(location.search).get("category");
  render(tabs.some(function (t) { return t.id === initial; }) ? initial : "all");

  /* ---------- on the horizon (categories without projects yet) ---------- */
  if (futureCats.length) {
    horizonEl.innerHTML = '<div class="horizon reveal" id="horizon"><div class="horizon-head"><span class="eyebrow">On the horizon</span><p>Next chapters of the catalog. Nothing announced yet.</p></div>' +
      '<ul class="horizon-list">' + futureCats.map(function (c) {
        return "<li><b>" + esc(c.code || "") + "</b><span>" + esc(c.label) + "</span><small>" + esc(c.blurb || "") + '</small><span class="status" data-status="concept"><i></i>Coming soon</span></li>';
      }).join("") + "</ul></div>";
  } else horizonEl.remove();

  /* ---------- contact ---------- */
  var mail = $("[data-mail]");
  mail.textContent = D.studio.email;
  mail.href = U.mailto("Hello VRX Studio");
  $("[data-mail-btn]").href = U.mailto("Hello VRX Studio");
})();
