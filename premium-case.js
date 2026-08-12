const caseTopbar = document.querySelector(".topbar");
const caseMain = document.querySelector(".case-page");

const progress = document.createElement("div");
progress.className = "reading-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

const revealTargets = document.querySelectorAll(
  ".case-hero-copy, .case-summary, .case-story, .case-section, .case-next"
);
const heroMedia = document.querySelectorAll(".case-hero-visual");
const mediaTargets = document.querySelectorAll(".case-shot");

revealTargets.forEach((target) => target.classList.add("premium-reveal"));
mediaTargets.forEach((target) => target.classList.add("premium-media-reveal"));
heroMedia.forEach((target) => target.classList.add("premium-hero-media"));

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  [...revealTargets, ...mediaTargets].forEach((target) => target.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6%" }
  );

  [...revealTargets, ...mediaTargets].forEach((target) => observer.observe(target));
}

let frameRequested = false;

function updateReadingState() {
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const ratio = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
  progress.style.transform = `scaleX(${ratio})`;
  caseTopbar?.classList.toggle("is-scrolled", window.scrollY > 32);

  if (caseMain && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    caseMain.style.setProperty("--premium-hero-shift", Math.min(window.scrollY * 0.055, 34));
  }
  frameRequested = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (frameRequested) return;
    frameRequested = true;
    requestAnimationFrame(updateReadingState);
  },
  { passive: true }
);

updateReadingState();
