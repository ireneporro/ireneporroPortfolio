const scraps = document.querySelectorAll(
  ".polaroid, .process-step, .process-collage",
);

document.querySelectorAll(".topbar").forEach((topbar) => {
  const toggle = topbar.querySelector(".nav-toggle");
  const nav = topbar.querySelector("nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      topbar.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("placed");
      }
    });
  },
  { threshold: 0.18 },
);

scraps.forEach((item, index) => {
  item.style.setProperty("--delay", `${index * 80}ms`);
  observer.observe(item);
});

const canUseSparkleTrail =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseSparkleTrail) {
  let lastSparkle = 0;

  window.addEventListener(
    "pointermove",
    (event) => {
      const now = window.performance.now();

      if (now - lastSparkle < 70) return;
      lastSparkle = now;

      const sparkle = document.createElement("span");
      sparkle.className = "cursor-sparkle";
      sparkle.style.left = `${event.clientX}px`;
      sparkle.style.top = `${event.clientY}px`;
      sparkle.style.setProperty("--sparkle-size", `${11 + Math.random() * 9}px`);
      sparkle.style.setProperty("--sparkle-x", `${(Math.random() - 0.5) * 22}px`);
      sparkle.style.setProperty("--sparkle-y", `${-10 - Math.random() * 18}px`);
      sparkle.style.setProperty("--sparkle-rotate", `${Math.random() * 90 - 45}deg`);

      document.body.appendChild(sparkle);
      sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
    },
    { passive: true },
  );
}
