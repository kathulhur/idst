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

  /* ============================================================
     MEMBERS
     ============================================================ */
  const initials = (name) =>
    name
      .replace(/^(Sir|Ma'am|Coach)\s+/i, "")
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const card = (m, featured) => {
    const photo = m.slot
      ? `<image-slot id="${m.slot}" src="${m.img}" placeholder="Drop photo"></image-slot>`
      : `<div class="portrait-ph"><span class="mono">${initials(m.name)}</span></div>`;
    return `
      <div class="m-card reveal${featured ? " featured" : ""}">
        <div class="m-photo">
          ${m.badge ? `<span class="m-corner">${m.badge}</span>` : ""}
          ${photo}
        </div>
        <div class="m-meta">
          <div class="m-name">${m.name}</div>
          <div class="m-role">${m.role}</div>
          ${m.tag ? `<span class="m-tag">${m.tag}</span>` : ""}
        </div>
      </div>`;
  };

  const instructors = [
    { name: "Sir Wilmer Vargas", role: "Founder · Head Coach", tag: "Former DanceSport Athlete", badge: "Founder", slot: "ins-1", featured: true },
    { name: "Ma'am Liza Soriano", role: "Latin Technique Coach", tag: "Cha-cha · Rumba · Jive", slot: "ins-2", featured: true },
    { name: "Coach Marco Delfin", role: "Standard Coach", tag: "Waltz · Tango · Quickstep", slot: "ins-3", featured: true },
  ];

  const current = [
    { name: "Andrei Bautista", role: "Latin", tag: "Cha-cha · Samba" },
    { name: "Kyla Mendoza", role: "Standard", tag: "Waltz · Foxtrot" },
    { name: "Jericho Ramos", role: "Latin", tag: "Paso Doble" },
    { name: "Bea Villanueva", role: "Latin", tag: "Rumba · Jive" },
    { name: "Nathaniel Cruz", role: "Standard", tag: "Tango · Viennese" },
    { name: "Mariella Aquino", role: "Latin", tag: "Samba · Cha-cha" },
    { name: "Paolo Gutierrez", role: "Ten-Dance", tag: "All-rounder" },
    { name: "Trisha Domingo", role: "Standard", tag: "Quickstep" },
    { name: "Rafael Santos", role: "Latin", tag: "Jive · Paso" },
    { name: "Camille Reyes", role: "Latin", tag: "Rumba" },
    { name: "Joshua Fernandez", role: "Standard", tag: "Slow Foxtrot" },
    { name: "Erika Lualhati", role: "Latin", tag: "Cha-cha · Samba" },
    { name: "Daniel Pascual", role: "Standard", tag: "Waltz · Tango" },
    { name: "Sofia Caballero", role: "Latin", tag: "Jive" },
    { name: "Miguel Torres", role: "Ten-Dance", tag: "All-rounder" },
    { name: "Hannah Ocampo", role: "Standard", tag: "Viennese Waltz" },
  ];

  const alumni = [
    { name: "Carlo Magsino", role: "Alumnus · UP Diliman", tag: "Still competing" },
    { name: "Patricia Lim", role: "Alumna · Ateneo", tag: "Varsity DanceSport" },
    { name: "Reymart Ignacio", role: "Alumnus · UST", tag: "National qualifier" },
    { name: "Angeline Robles", role: "Alumna · DLSU", tag: "Latin specialist" },
    { name: "Vince Capili", role: "Alumnus · PUP", tag: "Coach in training" },
    { name: "Denise Aguilar", role: "Alumna · FEU", tag: "Standard" },
    { name: "Lorenzo Bides", role: "Alumnus · Mapúa", tag: "Ten-Dance" },
    { name: "Karla Espino", role: "Alumna · UE", tag: "Choreographer" },
    { name: "Francis Yatco", role: "Alumnus · CEU", tag: "Latin" },
    { name: "Monica Salud", role: "Alumna · NU", tag: "Standard" },
  ];

  // assign a slot + sample image to every member (users can drop their own over them)
  const P = ["img/p1.png", "img/p2.png", "img/p3.png", "img/p4.png", "img/p5.png", "img/p6.png"];
  instructors.forEach((m, i) => (m.img = P[i % P.length]));
  current.forEach((m, i) => { m.slot = "cur-" + i; m.img = P[(i + 1) % P.length]; });
  alumni.forEach((m, i) => { m.slot = "alu-" + i; m.img = P[(i + 3) % P.length]; });

  const elIns = document.getElementById("grid-instructors");
  const elCur = document.getElementById("grid-current");
  const elAlu = document.getElementById("grid-alumni");
  if (elIns) elIns.innerHTML = instructors.map((m) => card(m, true)).join("");
  if (elCur) elCur.innerHTML = current.map((m) => card(m, false)).join("");
  if (elAlu) elAlu.innerHTML = alumni.map((m) => card(m, false)).join("");

  // counts
  const setText = (id, v) => { const n = document.getElementById(id); if (n) n.textContent = v; };
  setText("count-current", current.length);
  setText("count-alumni", alumni.length);

  observeReveals();

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

  /* ---- Smooth anchor + year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
