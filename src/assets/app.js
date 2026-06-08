/* ============================================================
   IDST — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- NAV: solid on scroll ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("solid");
    else nav.classList.remove("solid");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  const observeReveals = () =>
    document.querySelectorAll(".reveal:not(.in), .reveal-zoom:not(.in)").forEach((el) => io.observe(el));
  observeReveals();

  /* ---- Subtle parallax ---- */
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  let ticking = false;
  const runParallax = () => {
    const vh = window.innerHeight;
    parallax.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
      el.style.transform = `translateY(${offset.toFixed(1)}px)`;
    });
    ticking = false;
  };
  if (parallax.length && !document.documentElement.classList.contains("no-motion")) {
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(runParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    runParallax();
  }

  /* ---- Animated stat counters ---- */
  const counters = document.querySelectorAll("[data-count]");
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const dur = 1700;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          el.firstChild.textContent = Math.round(ease(p) * target).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => cio.observe(c));

  /* ---- Tabs ---- */
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".tab-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById("panel-" + tab.dataset.tab);
      if (panel) {
        panel.classList.add("active");
        panel.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      }
    });
  });

  /* ---- Footer year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
