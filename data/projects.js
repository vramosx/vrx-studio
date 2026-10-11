/*
 * VRX Studio — content database
 * ------------------------------------------------------------
 * This is the ONLY file you need to edit to add categories and projects.
 * Everything on index.html and project.html is rendered from here.
 *
 * Anything marked "TODO" is a placeholder that still needs real data.
 * A link with url "#" (or todo: true) is rendered as a disabled
 * "Coming soon" button, so it is safe to leave it until the real URL exists.
 */
window.VRX = {
  studio: {
    name: "VRX Studio",
    tagline: "Big ideas. Tools to go further.",
    email: "hello@vrxstudio.example", // TODO: replace with the real contact e-mail
    socials: [
      // TODO: fill in real profile URLs. Entries with url "#" are hidden.
      { label: "YouTube", url: "#" },
      { label: "X", url: "#" },
      { label: "GitHub", url: "#" },
      { label: "Discord", url: "#" }
    ]
  },

  /*
   * Categories. "id" is referenced by project.category.
   * Categories without projects are shown as "Coming soon" automatically.
   * Order here = order of the filter tabs.
   */
  categories: [
    { id: "unity-plugins",     label: "Unity Plugins",     code: "UNY", blurb: "Editor tools and gameplay systems for Unity developers." },
    { id: "games",             label: "Games",             code: "GME", blurb: "Original playable worlds built with our own tools." },
    { id: "chrome-extensions", label: "Chrome Extensions", code: "CRX", blurb: "Small, sharp utilities that live in your browser." },
    { id: "shopify-apps",      label: "Shopify Apps",      code: "SHP", blurb: "Apps that help merchants build better storefronts." },
    { id: "web-apps",          label: "Web Apps",          code: "WEB", blurb: "Focused web tools for creators and teams." }
  ],

  /*
   * Status values: "in-development" | "beta" | "released" | "concept"
   * Optional per project: statusText (overrides the badge text), icon, cta {title,text},
   * disclaimer (legal notice on the project page), trademarks (short line for the footer).
   */
  projects: [
    {
      slug: "2-5d-side-scroller",
      title: "2.5D Side Scroller",
      code: "PROJECT 001",
      category: "unity-plugins",
      platform: "Unity · Game Creator 2",
      status: "in-development",
      featured: true,
      accent: "#00c9f4",
      tagline: "Full 2.5D platformer control. No code required.",
      summary: "An extension for Game Creator 2 that gives your next platformer the freedom of 3D and the precision of side-scrolling movement — abilities, parkour and level elements, ready out of the box.",
      description: [
        "Physics, camera, parkour — building a 2.5D controller from scratch takes weeks. 2.5D Side Scroller ships it ready: one click builds a complete side-scrolling structure in your scene, and every ability is a component you add and manage straight from the editor.",
        "Run, jump, push, crouch, slide, vault and climb. Tune parkour by obstacle height, preview trajectories directly in the Scene view and drag timing markers for every phase of a move."
      ],
      tags: ["Movement & traversal", "Parkour", "Editor tools", "Keyboard + gamepad"],

      // Card / featured media
      cover: "assets/media/side-scroller/img/poster-feature-loop.jpg",
      media: {
        heroVideo: "assets/media/side-scroller/video/hero-loop.mp4", // text-free loop, mirrored so the character sits on the right
        heroPoster: "assets/media/side-scroller/img/poster-hero-loop.jpg",
        cardVideo: "assets/media/side-scroller/video/feature-loop.mp4", // text-free loop (climb + glide), un-mirrored
        /*
         * TRAILER — English 90 s ad from ads/2.5d-side-scroller (2.5d-side-scroller-ad-90s-v2.mp4),
         * re-encoded to 720p H.264 + AAC 128k. To swap it, re-encode the new cut to the same path
         * (or set youtube: "<id>"). Set src: null to show the "Coming soon" placeholder instead.
         * "note" (optional) renders a small chip on the trailer poster, e.g. "PT-BR".
         */
        trailer: { src: "assets/media/side-scroller/video/trailer.mp4", poster: "assets/media/side-scroller/img/poster-hero-loop.jpg", youtube: null, duration: "1:30", note: null }
      },

      links: [
        { label: "Unity Asset Store", url: "#", primary: true, todo: true }, // TODO: store URL
        { label: "Documentation", url: "#", todo: true },                    // TODO: docs URL
        { label: "Contact the studio", url: "mailto:" }                     // uses studio.email
      ],

      specs: [
        { label: "Engine", value: "Unity" },
        { label: "Requires", value: "Game Creator 2" },
        { label: "Input", value: "Keyboard · Gamepad" },
        { label: "Status", value: "In development" },
        { label: "Release", value: "Coming soon" } // TODO: real release info when announced
      ],

      /*
       * Detail-page sections. Available types:
       *  - "cards"   : grid of image cards (items: title, text, meta, image, zoom = optional bigger image for the lightbox)
       *  - "media"   : alternating video/image rows (items: eyebrow, title, text, video|image, poster, bullets)
       *  - "tiles"   : compact tiles with image (items: title, text, image)
       *  - "gallery"   : lightbox gallery (items: src, alt, caption)
       *  - "highlights": numbered text feature cards (items: title, text, meta)
       *  - "steps"     : numbered how-to steps (items: title, text)
       *  - "shortcuts" : keyboard / controller table (items: action, text, keyboard[], controller[])
       *  - "changelog" : version history (items: version, label, date, notes[])
       * Every section accepts navLabel (header link text).
       */
      sections: [
        {
          type: "cards",
          id: "abilities",
          eyebrow: "01 / Abilities",
          title: "Ready-made abilities.",
          intro: "Every move is a component. Add it, manage it and remap it right in the editor — with keyboard and gamepad bindings already set.",
          items: [
            { title: "Parkour", meta: "Wall jumps · Obstacles · Wall climbing", text: "Wall jumps, obstacle traversal and wall climbing.", image: "assets/media/side-scroller/cards/parkour-art.webp", zoom: "assets/media/side-scroller/cards/parkour.webp" },
            { title: "Push", meta: "Walk into it", text: "Walks into pushable objects and moves them along the lane.", image: "assets/media/side-scroller/cards/push-art.webp", zoom: "assets/media/side-scroller/cards/push.webp" },
            { title: "Slide", meta: "V · East Button", text: "Drop into a slide to pass under low ceilings.", image: "assets/media/side-scroller/cards/slide-art.webp", zoom: "assets/media/side-scroller/cards/slide.webp" },
            { title: "Crouch", meta: "C · Left Shoulder", text: "Crouch-walk through tight service passages.", image: "assets/media/side-scroller/cards/crouch-art.webp", zoom: "assets/media/side-scroller/cards/crouch.webp" },
            { title: "Dash", meta: "Left Ctrl · Right Shoulder", text: "A quick burst of speed along the side-scrolling lane.", image: "assets/media/side-scroller/cards/dash-art.webp", zoom: "assets/media/side-scroller/cards/dash.webp" },
            { title: "Glide", meta: "F · North Button", text: "Float across long gaps.", image: "assets/media/side-scroller/cards/glide-art.webp", zoom: "assets/media/side-scroller/cards/glide.webp" },
            { title: "Hook", meta: "Q · West Button", text: "Aim and grab hook points and hook surfaces.", image: "assets/media/side-scroller/cards/hook-art.webp", zoom: "assets/media/side-scroller/cards/hook.webp" }
          ]
        },
        {
          type: "media",
          id: "gameplay",
          eyebrow: "02 / Gameplay",
          title: "From the first jump to parkour.",
          intro: "Captured in-engine from the sample level.",
          items: [
            { eyebrow: "Parkour", title: "Vault obstacles. Climb ledges.", text: "Clear barriers and pull yourself up onto ledges in a single fluid motion, with the camera locked to the 2.5D lane.", video: "assets/media/side-scroller/video/parkour.mp4", poster: "assets/media/side-scroller/img/poster-parkour.jpg", bullets: ["Vault", "Ledge climb", "Wall jump"] },
            { eyebrow: "Double jump", title: "Tight, responsive jumps.", text: "Jump and jump again in the air — the same feel on keyboard and gamepad.", video: "assets/media/side-scroller/video/jump.mp4", poster: "assets/media/side-scroller/img/poster-jump.jpg", bullets: ["Keyboard", "Gamepad"] },
            { eyebrow: "Push", title: "Move the world.", text: "Walk into a crate and push it onto a pressure plate to open the passage.", video: "assets/media/side-scroller/video/push.mp4", poster: "assets/media/side-scroller/img/poster-push.jpg", bullets: ["Pushable objects", "Triggers"] },
            { eyebrow: "Crouch & slide", title: "Go low, keep the flow.", text: "Crouch through service passages and slide under low roofs without breaking momentum.", video: "assets/media/side-scroller/video/slide.mp4", poster: "assets/media/side-scroller/img/poster-slide.jpg", bullets: ["C · Left Shoulder", "V · East Button"] },
            { eyebrow: "Glide & hook", title: "Cross the big gaps.", text: "Glide off a rooftop to a distant platform, then aim the hook at a hook point and swing across.", video: "assets/media/side-scroller/video/glide-hook.mp4", poster: "assets/media/side-scroller/img/poster-glide-hook.jpg", bullets: ["F · North Button", "Q · West Button"] }
          ]
        },
        {
          type: "media",
          id: "editor",
          eyebrow: "03 / Editor tools",
          title: "Built for the Unity editor.",
          intro: "Set up, preview and tune everything without leaving the Scene view.",
          items: [
            { eyebrow: "Setup", title: "One click. Complete structure.", text: "Create Structure builds every missing object — light, player, side-scroll character, camera, level and the 2.5D Manager — straight into your scene.", image: "assets/media/side-scroller/img/setup-structure.webp", bullets: ["Directional Light", "Player & Character", "Camera", "Level", "2.5D Manager"] },
            { eyebrow: "Checkpoint + respawn", title: "Fall, respawn, keep playing.", text: "Send the player back to the last checkpoint when they fall or die, with configurable death and respawn effects and a movement lock after respawning.", image: "assets/media/side-scroller/img/ui-respawn.webp", bullets: ["Checkpoint mode", "Death FX", "Respawn FX"] },
            { eyebrow: "Parkour by height", title: "Every height range picks its move.", text: "Configure parkour movements by obstacle height. Each range chooses the move it plays, so one controller adapts to the whole level.", image: "assets/media/side-scroller/img/ui-height.webp", bullets: ["Height ranges", "Wall jump settings"] },
            { eyebrow: "Scene preview", title: "Preview the move in the scene.", text: "Scrub a movement and see its trajectory drawn in the Scene view: takeoff → passage → landing.", video: "assets/media/side-scroller/video/scrub.mp4", poster: "assets/media/side-scroller/img/poster-scrub.jpg", bullets: ["Trajectory spline", "Live scrub"] },
            { eyebrow: "Timing", title: "Drag the markers. Nail the timing.", text: "Adjust the takeoff, passage and landing markers of each phase on a synced timeline.", image: "assets/media/side-scroller/img/ui-timing.webp", bullets: ["Takeoff", "Passage", "Landing"] },
            { eyebrow: "Animation variants", title: "Variety without the work.", text: "Give every parkour movement several animation clips with relative weights for natural-looking variation.", image: "assets/media/side-scroller/img/ui-variants.webp", bullets: ["Multiple clips", "Relative weights"] }
          ]
        },
        {
          type: "tiles",
          id: "elements",
          eyebrow: "04 / Level elements",
          title: "Drop-in level elements.",
          intro: "Add them straight from the editor and start designing levels in minutes.",
          items: [
            { title: "Checkpoint", text: "Saves the player position when they enter.", image: "assets/media/side-scroller/cards/checkpoint-thumb.webp" },
            { title: "Pit", text: "Kills the player and returns them to the last checkpoint.", image: "assets/media/side-scroller/cards/pit-thumb.webp" },
            { title: "Jumper", text: "Launches the character upward.", image: "assets/media/side-scroller/cards/jumper-thumb.webp" },
            { title: "Pushable", text: "A crate the character pushes along the side.", image: "assets/media/side-scroller/cards/pushable-thumb.webp" },
            { title: "Wall", text: "A solid cube the character sticks to and jumps off.", image: "assets/media/side-scroller/cards/wall-thumb.webp" },
            { title: "Hook Point", text: "The Hook grabs this spot when the aim passes inside its radius.", image: "assets/media/side-scroller/cards/hookpoint-thumb.webp" },
            { title: "Hook Surface", text: "A solid collider the Hook can grab along the aim.", image: "assets/media/side-scroller/cards/hooksurface-thumb.webp" },
            { title: "Gravity", text: "Adds gravity to the selected object.", image: "assets/media/side-scroller/cards/gravity-thumb.webp" },
            { title: "Touch Trigger", text: "Runs when the player enters. The instruction list starts empty.", image: "assets/media/side-scroller/cards/trigger-thumb.webp" }
          ]
        },
        {
          type: "gallery",
          id: "gallery",
          eyebrow: "05 / Gallery",
          title: "Screens & stills.",
          items: [
            { src: "assets/media/side-scroller/img/still-warmup.webp", alt: "Character jumping in the warm-up section of the sample level", caption: "Warm-up" },
            { src: "assets/media/side-scroller/img/still-push.webp", alt: "Character pushing an orange crate toward a pressure plate", caption: "Push puzzle" },
            { src: "assets/media/side-scroller/img/still-crouch.webp", alt: "Character crouch-walking under a low ceiling", caption: "Crouch" },
            { src: "assets/media/side-scroller/img/still-slide.webp", alt: "Character sliding under a low roof", caption: "Slide" },
            { src: "assets/media/side-scroller/img/still-parkour.webp", alt: "Character approaching barriers in the parkour section", caption: "Parkour" },
            { src: "assets/media/side-scroller/img/still-climb.webp", alt: "Character between two tall walls before a wall jump", caption: "Wall climb" },
            { src: "assets/media/side-scroller/img/still-glide.webp", alt: "Character gliding over the city", caption: "Glide" },
            { src: "assets/media/side-scroller/img/still-hook.webp", alt: "Character swinging from a hook point", caption: "Hook" },
            { src: "assets/media/side-scroller/img/still-scene-preview.webp", alt: "Scene view showing a parkour trajectory preview", caption: "Scene preview" },
            { src: "assets/media/side-scroller/img/setup-structure.webp", alt: "Setup & Structure window with all objects ready", caption: "Setup & Structure" },
            { src: "assets/media/side-scroller/img/player-components.webp", alt: "Player Components window listing the active abilities", caption: "Player Components" },
            { src: "assets/media/side-scroller/img/elements.webp", alt: "Level elements panel in the Unity editor", caption: "Level elements" }
          ]
        }
      ]
    }
    ,
    {
      slug: "xcg-advanced",
      title: "XCG Advanced",
      code: "PROJECT 002",
      category: "chrome-extensions",
      platform: "Chrome extension",
      status: "released",
      statusText: "Available on Chrome Web Store",
      featured: true,
      accent: "#3ee05a", // XCG green (from the extension icon)
      icon: "assets/media/xcg-advanced/img/icon.png",
      tagline: "Enhance your Xbox Cloud Gaming gameplay.",
      summary: "A Chrome extension that gives you total control over your Xbox Cloud Gaming stream — ultrawide fit, pro visual filters, precision adjustments and an immersive Ambient Light.",
      description: [
        "XCG Advanced gives you total control over your Xbox Cloud Gaming¹ stream. Fine-tune your visuals and break free from default display limitations with a suite of enhancement tools.",
        "Fill your entire screen with ultrawide support and a custom fit, clean up compression artifacts with real-time filters, and surround the stream with a dynamic Ambient Light — all from a sidebar you can open with the keyboard or your controller. Designed to be ultra-lightweight, so your visual upgrades never compromise your reaction time."
      ],
      tags: ["Ultrawide & custom fit", "Visual filters", "Ambient Light", "Keyboard + controller"],

      cover: "assets/media/xcg-advanced/img/poster-hero-loop.jpg",
      media: {
        heroVideo: "assets/media/xcg-advanced/video/hero-loop.mp4",   // promo 1:32.3–1:40.3, cropped to the stream area (no UI badge)
        heroPoster: "assets/media/xcg-advanced/img/poster-hero-loop.jpg",
        heroFocus: "18% 50%",                                          // object-position of the hero video (desktop)
        heroFocusMobile: "52% 50%",                                    // object-position on phones
        cardVideo: "assets/media/xcg-advanced/video/card-loop.mp4",   // promo 1:03.5–1:11.5, cropped to the stream area
        cardPoster: "assets/media/xcg-advanced/img/poster-card-loop.jpg",
        // Full promo video (1:49) re-encoded to 720p H.264 + AAC. The same video is on YouTube (youtubeLink).
        trailer: { src: "assets/media/xcg-advanced/video/trailer.mp4", poster: "assets/media/xcg-advanced/img/poster-hero-loop.jpg", youtube: null, youtubeLink: "https://www.youtube.com/watch?v=ajqWPkjUV4w", duration: "1:49", label: "Promo video", note: null }
      },

      links: [
        { label: "Add to Chrome", url: "https://chromewebstore.google.com/detail/xcg-advanced/ghadhbmalgldhgeidcbgpgbchcamhfco", primary: true },
        { label: "Watch on YouTube", url: "https://www.youtube.com/watch?v=ajqWPkjUV4w" },
        { label: "Contact the studio", url: "mailto:" }
      ],
      cta: { title: "Get XCG Advanced", text: "Published on the Chrome Web Store. Add it to Chrome, launch a game on Xbox Cloud Gaming and open the sidebar." },

      // Info strip (hero)
      specs: [
        { label: "Platform", value: "Chrome extension" },
        { label: "Works with", value: "Xbox Cloud Gaming" },
        { label: "Version", value: "1.03" },
        { label: "Status", value: "Available" }
      ],

      // Trademark / non-affiliation notice, shown on the project page
      disclaimer: "¹ Xbox Cloud Gaming® is a registered trademark or trademarks of Microsoft Corporation in the U.S.A. and other countries. XCG Advanced is not affiliated with Microsoft Corporation, Xbox, Xbox Cloud Gaming, or any of their brands.",

      sections: [
        {
          type: "highlights",
          id: "features",
          navLabel: "Features",
          eyebrow: "01 / Features",
          title: "Total control over your stream.",
          intro: "A suite of display tools that runs on top of Xbox Cloud Gaming in Chrome.",
          items: [
            { title: "Ultrawide Support & Custom Fit", meta: "Display", text: "Fill your entire screen. Adjust height and width manually to eliminate distortion and achieve the perfect aspect ratio." },
            { title: "Pro Visual Filters", meta: "Clarity", text: "Enhance clarity and neutralize stream compression artifacts in real-time." },
            { title: "Precision Adjustments", meta: "Image", text: "Fine-tune Brightness, Contrast, Saturation, Hue, and Sharpening to your preference." },
            { title: "Immersive Ambient Light", meta: "Atmosphere", text: "Say goodbye to boring black bars. A dynamic glow around your stream syncs colors in real-time — especially immersive on Wide and Ultrawide monitors." },
            { title: "Low Latency Performance", meta: "Performance", text: "Designed to be ultra-lightweight, ensuring your visual upgrades never compromise your reaction time." },
            { title: "Clean View", meta: "New in 1.03", text: "Remove the XCG button from gameplay — hide it anytime with a shortcut on your keyboard or controller." }
          ]
        },
        {
          type: "media",
          id: "in-action",
          navLabel: "In action",
          eyebrow: "02 / In action",
          title: "See the difference.",
          intro: "Captured from the XCG Advanced promo video.",
          items: [
            { eyebrow: "Ultrawide & custom fit", title: "Fill your entire screen.", text: "Switch the stream from its default frame to a full-width fit, then adjust height and width manually to get the aspect ratio right.", video: "assets/media/xcg-advanced/video/ultrawide.mp4", poster: "assets/media/xcg-advanced/img/poster-ultrawide.jpg", bullets: ["Width", "Height", "Fit"] },
            { eyebrow: "Pro visual filters", title: "Cleaner, sharper image.", text: "Enhance clarity and neutralize stream compression artifacts in real-time — compare the original stream with XCG Advanced on.", video: "assets/media/xcg-advanced/video/filters.mp4", poster: "assets/media/xcg-advanced/img/poster-filters.jpg", bullets: ["Off", "On"] },
            { eyebrow: "Precision adjustments", title: "Tune every value.", text: "Fine-tune Brightness, Contrast, Saturation, Hue, and Sharpening to your preference.", video: "assets/media/xcg-advanced/video/adjustments.mp4", poster: "assets/media/xcg-advanced/img/poster-adjustments.jpg", bullets: ["Brightness", "Contrast", "Saturation", "Hue", "Sharpening"] },
            { eyebrow: "Ambient Light", title: "No more black bars.", text: "Ambient Light creates a dynamic glow around your stream, syncing colors in real-time for a deeply immersive experience on Wide and Ultrawide monitors.", video: "assets/media/xcg-advanced/video/ambient.mp4", poster: "assets/media/xcg-advanced/img/poster-ambient.jpg", bullets: ["Real-time color sync", "Wide & Ultrawide"] },
            { eyebrow: "Customization sidebar", title: "Everything in one sidebar.", text: "Open the sidebar from the XCG Advanced button — or toggle it with Ctrl+Shift+J or View/Select + RB/R1 on your controller — and adjust while you play.", video: "assets/media/xcg-advanced/video/sidebar.mp4", poster: "assets/media/xcg-advanced/img/poster-sidebar.jpg", bullets: ["Keyboard", "Controller"] }
          ]
        },
        {
          type: "steps",
          id: "how-to-use",
          navLabel: "How to use",
          eyebrow: "03 / How to use",
          title: "Up and running in three steps.",
          items: [
            { title: "Launch a game", text: "Launch a game on Xbox Cloud Gaming in Chrome." },
            { title: "Find the button", text: "Locate the XCG Advanced button in the bottom right corner." },
            { title: "Open the sidebar", text: "Click it to open the customization sidebar and start tuning." }
          ]
        },
        {
          type: "shortcuts",
          id: "shortcuts",
          navLabel: "Shortcuts",
          eyebrow: "04 / Pro tips",
          title: "Shortcuts.",
          intro: "Keyboard or controller — your call.",
          items: [
            { action: "Quick Access", text: "Toggle the sidebar instantly.", keyboard: ["Ctrl", "Shift", "J"], controller: ["View/Select", "RB/R1"] },
            { action: "Clean View", text: "Hide the XCG button anytime.", keyboard: ["Ctrl", "Shift", "H"], controller: ["View/Select", "LB/L1"] }
          ]
        },
        {
          type: "changelog",
          id: "changelog",
          navLabel: "Changelog",
          eyebrow: "05 / Changelog",
          title: "What's new.",
          items: [
            { version: "1.03", label: "Latest", notes: ["Remove the XCG button from gameplay."] }
          ]
        },
        {
          type: "gallery",
          id: "gallery",
          navLabel: "Gallery",
          eyebrow: "06 / Gallery",
          title: "Screens & stills.",
          items: [
            { src: "assets/media/xcg-advanced/img/still-fit-on.webp", alt: "Racing game stream filling an ultrawide frame with XCG Advanced on", caption: "Ultrawide fit — on" },
            { src: "assets/media/xcg-advanced/img/still-fit-off.webp", alt: "The same racing game stream in its default frame with black bars, XCG Advanced off", caption: "Default frame — off" },
            { src: "assets/media/xcg-advanced/img/still-filters.webp", alt: "Split comparison of a game title screen with filters off and on", caption: "Visual filters — off / on" },
            { src: "assets/media/xcg-advanced/img/still-sidebar.webp", alt: "Customization sidebar open next to the game stream", caption: "Customization sidebar" },
            { src: "assets/media/xcg-advanced/img/still-sidebar-detail.webp", alt: "Close-up of the sidebar display options: fit, width and height", caption: "Screen options" },
            { src: "assets/media/xcg-advanced/img/still-ambient.webp", alt: "Ambient Light glow around the edges of the stream", caption: "Ambient Light" },
            { src: "assets/media/xcg-advanced/img/still-ride.webp", alt: "Open-world gameplay streamed with XCG Advanced", caption: "In-game" },
            { src: "assets/media/xcg-advanced/img/store-sidebar.webp", alt: "Chrome Web Store screenshot: configure during gameplay with the sidebar that supports gamepads", caption: "Sidebar with gamepad support" },
            { src: "assets/media/xcg-advanced/img/store-ultrawide.webp", alt: "Chrome Web Store screenshot: ultrawide support and ambient light", caption: "Ultrawide + Ambient Light" }
          ]
        }
      ]
    }

    /*
     * ---- TEMPLATE: copy, uncomment and fill to add a new project ----
     * ,{
     *   slug: "my-chrome-extension",          // URL: project.html?slug=my-chrome-extension
     *   title: "My Chrome Extension",
     *   code: "PROJECT 002",
     *   category: "chrome-extensions",        // must match a category id
     *   platform: "Chrome",
     *   status: "concept",
     *   featured: false,
     *   accent: "#087bfa",
     *   tagline: "One line that sells it.",
     *   summary: "Two sentences for cards and the page intro.",
     *   description: ["Paragraph 1", "Paragraph 2"],
     *   tags: ["Tag A", "Tag B"],
     *   cover: "assets/media/my-chrome-extension/cover.jpg",
     *   media: { heroVideo: null, heroPoster: "assets/media/my-chrome-extension/cover.jpg", cardVideo: null, trailer: { src: null } },
     *   links: [{ label: "Chrome Web Store", url: "#", primary: true, todo: true }],
     *   specs: [{ label: "Platform", value: "Chrome" }],
     *   sections: []
     * }
     */
  ]
};
