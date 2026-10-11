/* VRX Studio — reusable project page template. URL: project.html?slug=<project slug> */
(function () {
  "use strict";
  var U = window.VRXU, D = U.data, esc = U.esc;
  var main = document.querySelector("[data-project]");
  var slug = new URLSearchParams(location.search).get("slug");
  var p = D.projects.filter(function (x) { return x.slug === slug; })[0];
  if (!slug && D.projects.length) p = D.projects.filter(function (x) { return x.featured; })[0] || D.projects[0];

  if (!p) {
    document.title = "Project not found — VRX Studio";
    main.innerHTML = '<section class="notfound"><div><span class="eyebrow">404</span><h1>Project not found</h1><p class="muted">This project does not exist or has moved.</p><br><a class="btn primary" href="index.html#projects">Back to projects <span class="arrow" aria-hidden="true">→</span></a></div></section>';
    return;
  }

  var cat = U.category(p.category);
  var m = p.media || {};
  var trailer = m.trailer || {};
  var hasTrailer = !!(trailer.src || trailer.youtube);
  var mailSubject = p.title + " — VRX Studio";
  document.title = p.title + " — VRX Studio";
  var md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", p.title + ": " + p.tagline);
  if (p.accent) document.documentElement.style.setProperty("--cyan", p.accent);
  document.body.classList.add("pp");

  var sections = p.sections || [];
  var html = "";

  /* ---------- hero ---------- */
  var focus = (m.heroFocus || m.heroFocusMobile) ? ' style="' + (m.heroFocus ? "--focus:" + esc(m.heroFocus) + ";" : "") + (m.heroFocusMobile ? "--focus-m:" + esc(m.heroFocusMobile) : "") + '"' : "";
  var trailerLabel = trailer.label || "Official trailer";
  var heroMedia = m.heroVideo
    ? '<video' + focus + ' data-autoplay autoplay muted loop playsinline preload="auto" poster="' + esc(m.heroPoster || p.cover) + '" aria-hidden="true" tabindex="-1"><source src="' + esc(m.heroVideo) + '" type="video/mp4"></video>'
    : '<img' + focus + ' src="' + esc(m.heroPoster || p.cover) + '" alt="">';
  var trailerBtn = hasTrailer
    ? '<button class="btn primary" type="button" data-trailer><span class="play-ico" aria-hidden="true"></span> Watch ' + esc(trailer.label ? trailer.label.toLowerCase() : "trailer") + '</button>'
    : '<a class="btn primary" href="#trailer"><span class="play-ico" aria-hidden="true"></span> Trailer <span class="soon">Soon</span></a>';
  var primaryLink = (p.links || []).filter(function (l) { return l.primary; })[0];
  var liveLink = primaryLink && !U.isPlaceholder(primaryLink);
  if (liveLink && hasTrailer) trailerBtn = trailerBtn.replace('class="btn primary"', 'class="btn"');
  var heroActions = liveLink
    ? U.linkButton(primaryLink, "", mailSubject) + trailerBtn
    : trailerBtn + (primaryLink ? U.linkButton({ label: primaryLink.label, url: primaryLink.url, todo: primaryLink.todo }, "", mailSubject) : "");
  var specs = (p.specs || []).map(function (s) { return "<div><dt>" + esc(s.label) + "</dt><dd>" + esc(s.value) + "</dd></div>"; }).join("");

  html += '<section class="hero p-hero" aria-label="' + esc(p.title) + '">' +
    '<div class="hero-media">' + heroMedia + "</div>" +
    '<div class="wrap hero-inner">' +
    '<nav class="breadcrumb hero-fade" style="--d:.05s" aria-label="Breadcrumb"><a href="index.html">VRX Studio</a><span aria-hidden="true">/</span><a href="index.html?category=' + esc(cat.id) + '#projects">' + esc(cat.label) + '</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(p.code || p.title) + "</span></nav>" +
    (p.icon ? '<img class="p-icon hero-fade" style="--d:.1s" src="' + esc(p.icon) + '" alt="" width="64" height="64">' : "") +
    '<h1><span class="line"><span style="--d:.15s">' + esc(p.title) + "</span></span></h1>" +
    '<p class="tagline hero-fade" style="--d:.45s">' + esc(p.tagline) + "</p>" +
    '<p class="hero-lede hero-fade" style="--d:.55s">' + esc(p.summary) + "</p>" +
    '<div class="hero-actions hero-fade" style="--d:.7s">' + heroActions + "</div>" +
    '<div class="hero-foot hero-fade" style="--d:.9s;align-items:center">' +
    (specs ? '<dl class="specs" style="--n:' + p.specs.length + ';margin:0;flex:1">' + specs + "</dl>" : "<span></span>") +
    '<div class="hero-meta"><button class="video-toggle" type="button" data-video-toggle hidden><span class="ico" aria-hidden="true"></span><span class="lbl">Pause video</span></button></div>' +
    "</div></div></section>";

  /* ---------- overview + trailer slot ---------- */
  html += '<section class="section" id="overview" aria-labelledby="ov-title"><div class="wrap">' +
    '<div class="overview"><div class="reveal"><span class="status" data-status="' + esc(p.status) + '"><i></i>' + esc(U.statusText(p)) + '</span><h2 id="ov-title">' + esc(p.tagline) + "</h2></div>" +
    '<div class="copy reveal" style="--d:.1s">' + (p.description || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
    '<div class="tags">' + (p.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div></div></div>" +
    '<div id="trailer" class="reveal" style="margin-top:clamp(60px,8vw,110px)">' + trailerSlot() + "</div>" +
    "</div></section>";

  function trailerSlot() {
    if (hasTrailer) {
      return '<div class="trailer"><img src="' + esc(trailer.poster || m.heroPoster || p.cover) + '" alt="" loading="lazy">' +
        (trailer.note ? '<span class="chip tag-soon">' + esc(trailer.note) + "</span>" : "") +
        '<div class="trailer-overlay"><button class="big-play" type="button" data-trailer aria-label="Play the ' + esc(p.title) + " " + esc(trailerLabel.toLowerCase()) + '"></button><span class="eyebrow plain">Watch' + (trailer.duration ? " · " + esc(trailer.duration) : "") + '</span><h3>' + esc(trailerLabel) + '</h3><p>With sound — press play.</p></div></div>' +
        (trailer.youtubeLink ? '<div class="trailer-meta"><span>Also available on YouTube.</span><a class="link-arrow" href="' + esc(trailer.youtubeLink) + '" target="_blank" rel="noopener">Watch on YouTube <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></div>' : "");
    }
    /* TRAILER PLACEHOLDER — set media.trailer.src (mp4) or media.trailer.youtube in data/projects.js */
    return '<div class="trailer" data-trailer-placeholder>' +
      (m.heroVideo ? '<video data-autoplay muted loop playsinline preload="none" poster="' + esc(m.heroPoster || p.cover) + '" aria-hidden="true"><source src="' + esc(m.heroVideo) + '" type="video/mp4"></video>' : '<img src="' + esc(p.cover) + '" alt="">') +
      '<span class="chip tag-soon">Gameplay capture</span>' +
      '<div class="trailer-overlay"><span class="eyebrow plain">Official trailer</span><h3>Coming soon</h3><p>The official ' + esc(p.title) + " trailer is in production.</p></div></div>";
  }

  /* ---------- data-driven sections ---------- */
  var renderers = {
    cards: function (s) {
      return '<div class="cards-grid">' + s.items.map(function (it, i) {
        return '<article class="ability reveal" style="--d:' + (i % 4) * 0.07 + 's">' +
          '<span class="img"><img src="' + esc(it.image) + '" alt="" loading="lazy"></span>' +
          '<div class="body"><span class="meta">' + esc(it.meta || "") + "</span><h3>" + esc(it.title) + "</h3><p>" + esc(it.text || "") + "</p></div>" +
          '<button class="stretch" type="button" aria-label="Enlarge the ' + esc(it.title) + ' card" data-lb-group="' + esc(s.id) + '" data-lb-src="' + esc(it.zoom || it.image) + '" data-lb-caption="' + esc(it.title + (it.meta ? " — " + it.meta : "")) + '" data-lb-alt="' + esc(it.title + " ability card") + '"></button></article>';
      }).join("") + "</div>";
    },
    media: function (s) {
      return '<div class="rows">' + s.items.map(function (it, i) {
        var mediaHtml;
        if (it.video) {
          mediaHtml = '<div class="row-media"><video data-autoplay muted loop playsinline preload="none" poster="' + esc(it.poster || "") + '" aria-label="' + esc(it.title) + '"><source src="' + esc(it.video) + '" type="video/mp4"></video></div>';
        } else {
          mediaHtml = '<div class="row-media shot"><img src="' + esc(it.image) + '" alt="' + esc(it.title) + '" loading="lazy" data-lb-group="' + esc(s.id) + '-shots" data-lb-src="' + esc(it.image) + '" data-lb-caption="' + esc(it.eyebrow) + '" data-lb-alt="' + esc(it.title) + '" tabindex="0" role="button"></div>';
        }
        return '<article class="row">' +
          '<div class="reveal">' + mediaHtml + "</div>" +
          '<div class="row-copy reveal" style="--d:.1s"><span class="row-num">' + String(i + 1).padStart(2, "0") + " / " + String(s.items.length).padStart(2, "0") + '</span><span class="eyebrow">' + esc(it.eyebrow) + "</span><h3>" + esc(it.title) + "</h3><p>" + esc(it.text) + "</p>" +
          (it.bullets ? '<div class="tags">' + it.bullets.map(function (b) { return '<span class="chip">' + esc(b) + "</span>"; }).join("") + "</div>" : "") +
          "</div></article>";
      }).join("") + "</div>";
    },
    tiles: function (s) {
      return '<div class="tiles reveal">' + s.items.map(function (it) {
        return '<div class="tile"><span class="img"><img src="' + esc(it.image) + '" alt="" loading="lazy"></span><div><h3>' + esc(it.title) + "</h3><p>" + esc(it.text) + "</p></div></div>";
      }).join("") + "</div>";
    },
    highlights: function (s) {
      return '<div class="hl-grid">' + s.items.map(function (it, i) {
        return '<article class="hl reveal" style="--d:' + (i % 3) * 0.07 + 's"><span class="hl-num">' + String(i + 1).padStart(2, "0") + "</span>" +
          (it.meta ? '<span class="meta">' + esc(it.meta) + "</span>" : "") + "<h3>" + esc(it.title) + "</h3><p>" + esc(it.text || "") + "</p></article>";
      }).join("") + "</div>";
    },
    steps: function (s) {
      return '<ol class="steps">' + s.items.map(function (it, i) {
        return '<li class="step reveal" style="--d:' + i * 0.08 + 's"><span class="step-num" aria-hidden="true">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(it.title) + "</h3><p>" + esc(it.text || "") + "</p></li>";
      }).join("") + "</ol>";
    },
    shortcuts: function (s) {
      function keys(list) {
        return (list || []).map(function (k) { return "<kbd>" + esc(k) + "</kbd>"; }).join('<span class="plus" aria-hidden="true">+</span>');
      }
      return '<div class="sc-wrap reveal"><table class="shortcuts"><thead><tr><th scope="col">Action</th><th scope="col">Keyboard</th><th scope="col">Controller</th></tr></thead><tbody>' +
        s.items.map(function (it) {
          return '<tr><th scope="row"><b>' + esc(it.action) + "</b><small>" + esc(it.text || "") + '</small></th><td data-label="Keyboard">' + keys(it.keyboard) + '</td><td data-label="Controller">' + keys(it.controller) + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    },
    changelog: function (s) {
      return '<ol class="changelog">' + s.items.map(function (it) {
        return '<li class="reveal"><div class="cl-head"><span class="cl-ver">v' + esc(it.version) + "</span>" + (it.label ? '<span class="chip">' + esc(it.label) + "</span>" : "") + (it.date ? "<time>" + esc(it.date) + "</time>" : "") + "</div>" +
          "<ul>" + (it.notes || []).map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></li>";
      }).join("") + "</ol>";
    },
    gallery: function (s) {
      return '<div class="gallery">' + s.items.map(function (it, i) {
        return '<figure class="g-item reveal" style="--d:' + (i % 3) * 0.07 + 's;margin:0" tabindex="0" role="button" aria-label="Open image: ' + esc(it.caption || it.alt) + '" data-lb-group="' + esc(s.id) + '" data-lb-src="' + esc(it.src) + '" data-lb-caption="' + esc(it.caption || "") + '" data-lb-alt="' + esc(it.alt || "") + '">' +
          '<img src="' + esc(it.src) + '" alt="' + esc(it.alt || "") + '" loading="lazy"><figcaption>' + esc(it.caption || "") + "</figcaption></figure>";
      }).join("") + "</div>";
    }
  };

  sections.forEach(function (s) {
    var r = renderers[s.type];
    if (!r || !s.items || !s.items.length) return;
    html += '<section class="section" id="' + esc(s.id) + '" aria-labelledby="' + esc(s.id) + '-title"' + (s.type === "gallery" ? ' style="padding-top:0"' : "") + '><div class="wrap">' +
      '<div class="section-head"><div class="reveal"><span class="eyebrow">' + esc(s.eyebrow || "") + '</span><h2 id="' + esc(s.id) + '-title">' + esc(s.title) + "</h2></div>" +
      (s.intro ? '<p class="reveal" style="--d:.1s">' + esc(s.intro) + "</p>" : "") + "</div>" +
      r(s) + "</div></section>";
  });

  /* ---------- reviews (project.reviews) ---------- */
  if (U.hasReviews(p)) {
    var rvNum = String(sections.filter(function (s) { return renderers[s.type] && s.items && s.items.length; }).length + 1).padStart(2, "0");
    html += '<section class="section" id="reviews" aria-labelledby="reviews-title"><div class="wrap">' +
      '<div class="section-head"><div class="reveal"><span class="eyebrow">' + rvNum + ' / Reviews</span><h2 id="reviews-title">What players say.</h2></div>' +
      '<p class="reveal" style="--d:.1s">Real ratings and reviews from the ' + esc(p.reviews.source) + ".</p></div>" +
      U.reviewsBlock([p]) + "</div></section>";
  }

  /* ---------- CTA ---------- */
  var links = (p.links || []).map(function (l, i) { return U.linkButton(i === 0 ? l : { label: l.label, url: l.url, todo: l.todo }, "", mailSubject); }).join("");
  var cta = p.cta || {};
  html += '<section class="section" id="get" aria-labelledby="cta-title" style="padding-top:0"><div class="wrap">' +
    '<div class="cta-band reveal"><div><span class="status" data-status="' + esc(p.status) + '"><i></i>' + esc(U.statusText(p)) + '</span><h2 id="cta-title">' + esc(cta.title || "Get " + p.title) + "</h2>" +
    "<p>" + esc(cta.text || "Store page and documentation are coming soon. Want early news or have a question? Get in touch.") + "</p></div>" +
    '<div class="cta-actions">' + links + "</div></div>" +
    (p.disclaimer ? '<p class="disclaimer reveal">' + esc(p.disclaimer) + "</p>" : "") +
    nextProject() + "</div></section>";

  function nextProject() {
    var i = D.projects.indexOf(p), n = D.projects[(i + 1) % D.projects.length];
    var label = n && n !== p ? "Next project: " + n.title : "More projects coming soon";
    return '<div class="next-project"><a class="link-arrow" href="index.html#projects">← All projects</a>' +
      (n && n !== p ? '<a class="link-arrow" href="' + U.projectUrl(n) + '">' + esc(label) + " →</a>" : '<span class="link-arrow muted">' + esc(label) + "</span>") + "</div>";
  }

  main.innerHTML = html;

  /* ---------- section nav in header ---------- */
  var nav = document.querySelector("[data-project-nav]");
  var navHtml = '<a href="#overview">Overview</a>';
  sections.forEach(function (s) {
    if (!renderers[s.type] || !s.items || !s.items.length) return;
    var label = s.navLabel || (s.id.charAt(0).toUpperCase() + s.id.slice(1).replace(/-/g, " "));
    navHtml += '<a href="#' + esc(s.id) + '">' + esc(label) + "</a>";
  });
  if (U.hasReviews(p)) navHtml += '<a href="#reviews">Reviews</a>';
  nav.innerHTML = navHtml + '<a href="index.html#projects">All projects</a>';

  /* ---------- behaviour ---------- */
  var heroVid = main.querySelector(".p-hero video");
  var tgl = main.querySelector("[data-video-toggle]");
  if (heroVid && tgl) { tgl.hidden = U.reduceMotion(); U.bindVideoToggle(tgl, heroVid); }

  main.querySelectorAll("[data-trailer]").forEach(function (b) {
    b.addEventListener("click", function () {
      U.openLightbox([trailer.youtube ? { type: "youtube", src: trailer.youtube, caption: p.title + " — " + trailerLabel } : { type: "video", src: trailer.src, poster: trailer.poster, caption: p.title + " — " + trailerLabel }], 0);
    });
  });
  // keyboard support for role=button lightbox triggers
  main.addEventListener("keydown", function (e) {
    var t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t.matches('[role="button"][data-lb-group]')) { e.preventDefault(); t.click(); }
  });
  // active section highlight in nav
  if ("IntersectionObserver" in window) {
    var links2 = nav.querySelectorAll('a[href^="#"]');
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        links2.forEach(function (a) { if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    main.querySelectorAll("section[id]").forEach(function (s) { so.observe(s); });
  }
})();
