const scraps = document.querySelectorAll(
  ".polaroid, .process-step, .process-collage",
);

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
