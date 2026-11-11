// PyCon Tajikistan 2026: site motion.
// One material carries the page: atlas (adras) ikat, the silk whose dyed threads never quite line up.
// Content is visible without this script; it only plays sequences on top.
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Atlas ikat ─────────────────────────────────────────────────────
  // The warp is dyed in blocks before weaving, so every thread row shifts a few pixels:
  // that ragged, blurred edge is the whole look. We draw it thread by thread.
  const ATLAS = ["#D30D60", "#FEB702", "#00246C", "#F4F6FB", "#02822B", "#FD7C08", "#001848", "#FF9F02", "#DC0C24", "#F93C33"];
  const WIDTHS = [46, 22, 34, 8, 26, 14, 30, 10, 38, 18];

  function rng(seed) {
    let s = 0;
    for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  function weaveRows(len, depth, seed) {
    // A list of rows; each row is a list of [start, end, colour] segments along the band.
    const rand = rng(seed);
    const rows = [];
    const thread = 2;
    let drift = 0;
    for (let y = 0; y < depth; y += thread) {
      drift += (rand() - 0.5) * 3;
      drift *= 0.85;
      const flame = Math.sin((y / depth) * Math.PI) * 9; // motifs swell in the middle of the band
      const segs = [];
      let x = -60 + drift;
      let i = 0;
      while (x < len) {
        const w = WIDTHS[i % WIDTHS.length] + (i % 2 ? flame : -flame * 0.6) + (rand() - 0.5) * 5;
        segs.push([x, x + Math.max(4, w), ATLAS[i % ATLAS.length]]);
        x += Math.max(4, w);
        i++;
      }
      rows.push([y, segs]);
    }
    return rows;
  }

  function drawIkat(canvas, progress = 1) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const vertical = rect.height > rect.width;
    const len = vertical ? rect.height : rect.width;
    const depth = vertical ? rect.width : rect.height;
    if (vertical) ctx.transform(0, 1, 1, 0, 0, 0); // draw along the long side
    const key = canvas.dataset.ikat + len + "x" + depth;
    canvas._rows = canvas._key === key ? canvas._rows : weaveRows(len, depth, canvas.dataset.ikat || "atlas");
    canvas._key = key;
    const rand = rng("shuttle");
    ctx.clearRect(0, 0, len, depth);
    for (const [y, segs] of canvas._rows) {
      // the shuttle reaches each row a little early or late: the weave front is ragged too
      const front = progress >= 1 ? len : progress * (len + 120) - 60 + (rand() - 0.5) * 60;
      for (const [a, b, c] of segs) {
        if (a > front) break;
        ctx.fillStyle = c;
        ctx.fillRect(a, y, Math.min(b, front) - a + 0.6, 2.2);
      }
    }
  }

  const bands = [...document.querySelectorAll("canvas[data-ikat]")];
  const weave = (canvas, ms = 1400, delay = 0) => {
    if (reduce) return drawIkat(canvas, 1);
    const t0 = performance.now() + delay;
    const step = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / ms));
      drawIkat(canvas, 1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  bands.forEach((c) => { if (!c.hasAttribute("data-weave")) drawIkat(c, 1); });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => bands.forEach((c) => drawIkat(c, 1)), 150);
  });

  // ── Hero: the prompt types, Python answers in Tajik ─────────────────
  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const typed = hero.querySelector("[data-type]");
    const hello = hero.querySelector("[data-hello]");
    const band = hero.querySelector("canvas[data-ikat]");
    // split the greeting into letters for the stagger; screen readers keep the whole phrase
    if (hello) {
      const phrase = hello.textContent.replace(/\s+/g, " ").trim();
      hello.setAttribute("aria-label", phrase);
      let n = 0;
      hello.innerHTML = hello.innerHTML.split(/(<br>)/).map((part) => part === "<br>" ? part :
        [...part].map((ch) => `<span class="ch" aria-hidden="true" style="--n:${n++}">${ch === " " ? "&nbsp;" : ch}</span>`).join("")
      ).join("");
    }
    const play = () => { hero.classList.add("is-played"); if (band) weave(band, 1600, 500); };
    // the mountains follow the pointer a little, nearer ranges more than far ones
    const art = hero.querySelector("[data-parallax]");
    if (art && !reduce && window.matchMedia("(pointer: fine)").matches) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        art.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        art.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    }
    if (reduce || !typed) {
      hero.classList.add("is-played", "is-instant");
      if (band) drawIkat(band, 1);
    } else {
      const text = typed.textContent;
      typed.textContent = "";
      hero.classList.add("is-typing");
      let i = 0;
      const tick = () => {
        typed.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(tick, 34 + Math.random() * 40);
        else setTimeout(() => { hero.classList.remove("is-typing"); play(); }, 260);
      };
      setTimeout(tick, 450);
    }
  }

  // ── Scene loops (stars, windows, river, ripples) run only while on screen ──
  const inview = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle("is-inview", e.isIntersecting);
  });
  document.querySelectorAll("[data-scene]").forEach((el) => inview.observe(el));

  // ── December snow over the closing scene, only while it is on screen ──
  const snow = document.querySelector("[data-snow]");
  if (snow && !reduce) {
    const ctx = snow.getContext("2d");
    let flakes = [], on = false, W = 0, H = 0;
    const size = () => {
      const r = snow.getBoundingClientRect();
      W = r.width; H = r.height;
      snow.width = W; snow.height = H;
      flakes = Array.from({ length: Math.round(W / 12) }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2.4, s: 18 + Math.random() * 40, d: Math.random() * 6,
      }));
    };
    let last = 0;
    const frame = (now) => {
      if (!on) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = getComputedStyle(snow).getPropertyValue("--snowflake") || "rgba(244, 246, 251, 0.85)";
      for (const f of flakes) {
        f.y += f.s * dt; f.x += Math.sin(now / 1200 + f.d) * 8 * dt;
        if (f.y > H + 4) { f.y = -4; f.x = Math.random() * W; }
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(frame);
    };
    new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on) { if (!W) size(); last = 0; requestAnimationFrame(frame); }
    }).observe(snow);
    window.addEventListener("resize", () => { if (W) size(); });
  }

  // ── Things that happen once when they come into view ────────────────
  const once = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-seen");
      once.unobserve(e.target);
    }
  }, { threshold: 0.35 });
  document.querySelectorAll("[data-draw]").forEach((el) => reduce ? el.classList.add("is-seen") : once.observe(el));

  // ── Light / dark theme ─────────────────────────────────────────────
  const root = document.documentElement;
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const applyTheme = (t, animate) => {
    if (animate && !reduce) {
      root.classList.add("theme-anim");
      setTimeout(() => root.classList.remove("theme-anim"), 450);
    }
    root.setAttribute("data-theme", t);
    if (themeMeta) themeMeta.content = t === "light" ? "#EEF2FA" : "#001848";
    if (themeBtn) themeBtn.setAttribute("aria-label", t === "light" ? themeBtn.dataset.labelDark : themeBtn.dataset.labelLight);
  };
  applyTheme(root.getAttribute("data-theme") || "dark", false);
  themeBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", next); } catch (e) { /* private mode: the choice lasts for this page */ }
    applyTheme(next, true);
  });
  // follow the system setting live, until the visitor picks one themselves
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) { /* ignore */ }
    if (!saved) applyTheme(e.matches ? "light" : "dark", true);
  });

  // ── Header: solid once the page moves; phone menu ──────────────────
  const header = document.querySelector("[data-header]");
  if (header) {
    const solid = () => header.classList.toggle("is-solid", window.scrollY > 40);
    window.addEventListener("scroll", solid, { passive: true });
    solid();
    const toggle = header.querySelector("[data-menu]");
    toggle?.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
    header.querySelectorAll(".main-nav a").forEach((a) => a.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
        toggle.focus();
      }
    });
  }
})();
