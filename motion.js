(() => {
  const html = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  if (reduced.matches) {
    html.classList.remove("motion");
    return;
  }
  html.classList.add("motion");

  /* ---------- Split headings into masked words ---------- */
  function split(el, kind) {
    let wordIndex = 0;
    let lastInner = null;
    const makeWord = (text, accent) => {
      const outer = document.createElement("span");
      outer.className = "w";
      const inner = document.createElement("span");
      inner.className = "w-i";
      inner.style.setProperty("--wi", wordIndex++);
      if (accent) {
        const mark = document.createElement("span");
        mark.className = accent.className;
        mark.textContent = text;
        inner.append(mark);
      } else {
        inner.textContent = text;
      }
      outer.append(inner);
      lastInner = inner;
      return outer;
    };
    const walk = (node, accent) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          let text = child.textContent;
          const fragment = document.createDocumentFragment();
          // Punctuation glued to the previous word (e.g. "products.") stays on its line.
          const glued = text.match(/^[^\s]+/);
          if (glued && lastInner && child.previousSibling) {
            lastInner.append(glued[0]);
            text = text.slice(glued[0].length);
          }
          text.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            fragment.append(/^\s+$/.test(part) ? document.createTextNode(part) : makeWord(part, accent));
          });
          child.replaceWith(fragment);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
          if (child.classList.contains("hero-accent")) {
            const fragment = document.createDocumentFragment();
            const holder = document.createElement("span");
            holder.append(...child.childNodes);
            walk(holder, child);
            fragment.append(...holder.childNodes);
            child.replaceWith(fragment);
          } else {
            walk(child, accent);
          }
        }
      });
    };
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    walk(el, null);
    el.querySelectorAll(".w").forEach((w) => w.setAttribute("aria-hidden", "true"));
    el.classList.add("split", kind);
  }

  const heroTitle = document.querySelector(".premium-hero h1");
  if (heroTitle) split(heroTitle, "split-hero");
  document
    .querySelectorAll(".section-heading h2, .ai-assisted-intro h2, .about-content h2, .standards-intro h2, .contact-copy h2")
    .forEach((h) => split(h, "split-h"));

  /* ---------- Hero start: wait for fonts so words don't reflow mid-animation ---------- */
  const startHero = () => requestAnimationFrame(() => {
    html.classList.add("hero-go");
    setTimeout(() => {
      const first = document.querySelector(".studio-slide:not([hidden])");
      if (first && !document.querySelector(".studio-slide.is-active")) first.classList.add("is-active");
    }, 1450);
  });
  (document.fonts?.ready || Promise.resolve()).then(startHero);

  /* ---------- Focus pills ---------- */
  const pills = document.querySelector(".hero-pills");
  pills?.querySelectorAll("li").forEach((li, i) => {
    li.style.setProperty("--pi", i);
    li.addEventListener("pointermove", (event) => {
      const box = li.getBoundingClientRect();
      li.style.setProperty("--mx", `${event.clientX - box.left}px`);
      li.style.setProperty("--my", `${event.clientY - box.top}px`);
    });
  });
  setTimeout(() => pills?.classList.add("settled"), 3200);

  /* ---------- Staggered reveals ---------- */
  [".project-grid", ".ai-assisted-items", ".standards-list", ".contact-links"].forEach((selector) => {
    document.querySelectorAll(`${selector} > .reveal, ${selector}.reveal > *`).forEach((item, i) => {
      item.style.setProperty("--d", `${i * 110}ms`);
    });
  });
  const settle = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue("--d")) || 0;
      setTimeout(() => entry.target.classList.add("settled"), 1300 + delay);
      settle.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => settle.observe(el));

  /* ---------- Count-up numbers ---------- */
  const ease = (t) => 1 - Math.pow(1 - t, 4);
  function countUp(el, duration = 1400) {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * ease(t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  document.querySelectorAll(".project-details dd").forEach((dd) => {
    dd.innerHTML = dd.innerHTML.replace(/\b(\d+)\b/g, '<span data-count="$1">$1</span>');
  });
  const counters = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll("[data-count]").forEach((el, i) => setTimeout(() => countUp(el), 250 + i * 120));
      counters.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".project-details").forEach((el) => counters.observe(el));
  document.addEventListener("studio:enter", (event) => {
    event.target.querySelectorAll("[data-count]").forEach((el, i) => setTimeout(() => countUp(el, 1200), 380 + i * 90));
  });

  /* ---------- Nav: compact on scroll, active section pill, progress ---------- */
  const nav = document.querySelector(".premium-nav");
  const navLinks = [...document.querySelectorAll('#premium-menu a[href^="#"]')];
  const progress = document.createElement("div");
  progress.className = "home-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav?.classList.toggle("is-compact", y > 60);
      const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      progress.style.transform = `scaleX(${Math.min(y / max, 1)})`;
      parallax();
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) sectionObserver.observe(target);
  });
  document.querySelector(".premium-hero") &&
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) navLinks.forEach((a) => a.classList.remove("is-current"));
    }, { threshold: 0.5 }).observe(document.querySelector(".premium-hero"));

  /* ---------- Scroll parallax ---------- */
  const parallaxItems = [...document.querySelectorAll(".cover-laptop, .about-image img")];
  function parallax() {
    const vh = innerHeight;
    parallaxItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const centered = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.setProperty("--py", `${(centered * -36).toFixed(1)}px`);
    });
  }
  parallax();
  onScroll();

  if (!finePointer.matches) return;

  /* ---------- Hero: spotlight + laptop tilt ---------- */
  const hero = document.querySelector(".premium-hero");
  const laptop = document.querySelector(".studio-laptop");
  const display = document.querySelector(".studio-display");
  if (display) {
    const glare = document.createElement("span");
    glare.className = "studio-glare";
    glare.setAttribute("aria-hidden", "true");
    display.append(glare);
  }
  hero?.addEventListener("pointermove", (event) => {
    const box = hero.getBoundingClientRect();
    hero.style.setProperty("--hx", `${event.clientX - box.left}px`);
    hero.style.setProperty("--hy", `${event.clientY - box.top}px`);
    if (!laptop) return;
    const l = laptop.getBoundingClientRect();
    const tx = Math.max(-1, Math.min(1, (event.clientX - (l.left + l.width / 2)) / (l.width * 0.9)));
    const ty = Math.max(-1, Math.min(1, (event.clientY - (l.top + l.height / 2)) / (l.height * 1.2)));
    laptop.style.setProperty("--tx", tx.toFixed(3));
    laptop.style.setProperty("--ty", ty.toFixed(3));
  });
  hero?.addEventListener("pointerleave", () => {
    laptop?.style.setProperty("--tx", 0);
    laptop?.style.setProperty("--ty", 0);
  });

  /* ---------- Cards: tilt + spotlight ---------- */
  document.querySelectorAll(".project-card, .featured-project, .standards-list article, .process-list li").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.setProperty("--tx", (x - 0.5).toFixed(3));
      card.style.setProperty("--ty", (y - 0.5).toFixed(3));
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tx", 0);
      card.style.setProperty("--ty", 0);
    });
  });

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll(".button, .nav-contact, .contact-primary").forEach((button) => {
    button.classList.add("magnetic");
    button.addEventListener("pointermove", (event) => {
      const box = button.getBoundingClientRect();
      const x = event.clientX - box.left - box.width / 2;
      const y = event.clientY - box.top - box.height / 2;
      button.style.setProperty("--bx", `${(x * 0.22).toFixed(1)}px`);
      button.style.setProperty("--by", `${(y * 0.3).toFixed(1)}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--bx", "0px");
      button.style.setProperty("--by", "0px");
    });
  });
})();
