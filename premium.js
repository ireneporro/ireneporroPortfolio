const menuButton = document.querySelector(".premium-menu-button");
const menu = document.querySelector("#premium-menu");

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
