(() => {
  const root = document.querySelector('.hero-work');
  if (!root) return;
  const slides = [...root.querySelectorAll('.studio-slide')];
  const dots = [...root.querySelectorAll('[data-slide]')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, visible = true, timer;
  function show(next) {
    index = next;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    root.querySelector('.studio-project-title').textContent = slides[index].dataset.title;
    root.querySelector('.studio-project-description').textContent = slides[index].dataset.description;
  }
  function schedule() {
    clearInterval(timer);
    if (visible && !document.hidden && !motion.matches && !slides.some(slide => slide.contains(document.activeElement))) {
      timer = setInterval(() => show((index + 1) % slides.length), 10000);
    }
  }
  dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.slide)); schedule(); }));
  root.addEventListener('focusin', schedule);
  root.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', schedule);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }).observe(root);
  schedule();
})();
