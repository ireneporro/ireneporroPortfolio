const progress = document.createElement("div");
progress.className = "reading-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

const revealTargets = document.querySelectorAll(
  ".case-hero-copy, .case-summary, .case-story, .case-section, .case-next",
);
const mediaTargets = document.querySelectorAll(".case-hero-visual, .case-shot");

revealTargets.forEach((target) => target.classList.add("premium-reveal"));
mediaTargets.forEach((target) => target.classList.add("premium-media-reveal"));

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
    { threshold: 0.08, rootMargin: "0px 0px -6%" },
  );
  [...revealTargets, ...mediaTargets].forEach((target) => observer.observe(target));
}

const dialog = document.createElement("dialog");
dialog.className = "case-dialog";
dialog.innerHTML = '<form method="dialog"><button type="submit">Close</button></form><img alt=""><p></p>';
document.body.append(dialog);
const dialogImage = dialog.querySelector("img");
const dialogCaption = dialog.querySelector("p");
let activeTrigger;

document.querySelectorAll("figure.case-hero-visual, figure.case-shot").forEach((figure) => {
  const image = figure.querySelector("img");
  if (!image) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "case-zoom";
  button.setAttribute("aria-label", `Enlarge: ${image.alt}`);
  image.before(button);
  button.append(image);

  if (!figure.querySelector("figcaption")) {
    const caption = document.createElement("figcaption");
    caption.innerHTML = `<span>${image.alt}</span><span>Enlarge screen ↗</span>`;
    figure.append(caption);
  }

  button.addEventListener("click", () => {
    activeTrigger = button;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = image.alt;
    dialog.showModal();
    document.body.style.overflow = "hidden";
  });
});

dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  activeTrigger?.focus({ preventScroll: true });
});
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

function updateProgress() {
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  progress.style.transform = `scaleX(${Math.min(Math.max(window.scrollY / scrollable, 0), 1)})`;
}
window.addEventListener("scroll", () => requestAnimationFrame(updateProgress), { passive: true });
updateProgress();
