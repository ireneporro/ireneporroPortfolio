const menuButton = document.querySelector(".premium-menu-button");
const menu = document.querySelector("#premium-menu");
const cosmicEntry = document.querySelector("[data-cosmic-entry]");
const cosmicStars = cosmicEntry?.querySelector(".cosmic-stars");
const entrySlider = cosmicEntry?.querySelector("[data-entry-slider]");
const entryHandle = entrySlider?.querySelector(".entry-slider-handle");

if (cosmicEntry && sessionStorage.getItem("portfolio-entered") !== "true") {
  document.body.classList.add("cosmic-entry-open");
  window.scrollTo(0, 0);

  for (let index = 0; index < 120; index += 1) {
    const star = document.createElement("span");
    star.className = "cosmic-star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--star-size", `${Math.random() * 2.8 + .8}px`);
    star.style.setProperty("--star-opacity", `${Math.random() * .6 + .38}`);
    star.style.setProperty("--star-speed", `${Math.random() * 2.2 + 1.1}s`);
    star.style.setProperty("--star-delay", `${Math.random() * -4}s`);
    cosmicStars?.append(star);
  }

  let dragStart = 0;
  let sliderPosition = 0;
  let dragging = false;
  let entered = false;

  const sliderLimit = () => Math.max(0, (entrySlider?.clientWidth || 0) - (entryHandle?.offsetWidth || 0) - 12);
  const setSliderPosition = (position) => {
    sliderPosition = Math.max(0, Math.min(position, sliderLimit()));
    entryHandle?.style.setProperty("--slider-x", `${sliderPosition}px`);
    const progress = sliderLimit() ? sliderPosition / sliderLimit() : 0;
    entrySlider?.style.setProperty("--slider-progress", progress.toFixed(3));
  };

  const playUnlockSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const start = context.currentTime;

    [659.25, 987.77].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const noteStart = start + index * .075;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(.001, noteStart);
      gain.gain.exponentialRampToValueAtTime(.055, noteStart + .018);
      gain.gain.exponentialRampToValueAtTime(.001, noteStart + .24);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + .26);
    });

    window.setTimeout(() => context.close(), 520);
  };

  const enterPortfolio = () => {
    if (entered) return;
    entered = true;
    setSliderPosition(sliderLimit());
    sessionStorage.setItem("portfolio-entered", "true");
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo(0, 0);
    playUnlockSound();
    cosmicEntry.classList.add("is-unlocking");
    window.setTimeout(() => {
      cosmicEntry.classList.add("is-dismissed");
      document.body.classList.remove("cosmic-entry-open");
    }, 280);
    window.setTimeout(() => cosmicEntry.remove(), 1100);
  };

  entryHandle?.addEventListener("pointerdown", (event) => {
    dragging = true;
    dragStart = event.clientX - sliderPosition;
    entryHandle.setPointerCapture(event.pointerId);
  });
  entryHandle?.addEventListener("pointermove", (event) => {
    if (dragging) setSliderPosition(event.clientX - dragStart);
  });
  entryHandle?.addEventListener("pointerup", (event) => {
    dragging = false;
    entryHandle.releasePointerCapture(event.pointerId);
    if (sliderPosition >= sliderLimit() * .72) enterPortfolio();
    else setSliderPosition(0);
  });
  entryHandle?.addEventListener("click", () => {
    if (!dragging && sliderPosition === 0) enterPortfolio();
  });
} else {
  cosmicEntry?.remove();
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  menu?.classList.toggle("open", !isOpen);
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  });
});

const revealItems = document.querySelectorAll(".reveal");
const processSection = document.querySelector(".section-process");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("visible"));
  processSection?.classList.add("process-active");
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  if (processSection) {
    const processObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          processSection.classList.add("process-active");
          processObserver.disconnect();
        }
      },
      { threshold: .32 }
    );
    processObserver.observe(processSection);
  }
}

document.querySelectorAll(".capability-list article").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  });
});
