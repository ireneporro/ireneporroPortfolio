(() => {
  const root = document.querySelector('.hero-work');
  if (!root) return;
  const slides = [...root.querySelectorAll('.studio-slide')];
  const dots = [...root.querySelectorAll('[data-slide]')];
  const title = root.querySelector('.studio-project-title');
  const description = root.querySelector('.studio-project-description');
  const caption = root.querySelector('.studio-caption');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const DURATION = 8000;
  let index = 0, visible = true, timer, leaveTimer;
  root.style.setProperty('--slide-duration', `${DURATION}ms`);
  // With motion on, motion.js activates the first slide once the screen has powered on.
  if (!document.documentElement.classList.contains('motion')) slides[0].classList.add('is-active');

  function show(next) {
    if (next === index) return;
    const previous = slides[index];
    const incoming = slides[next];
    index = next;
    clearTimeout(leaveTimer);
    slides.forEach((slide) => { if (slide !== previous && slide !== incoming) { slide.hidden = true; slide.classList.remove('is-active', 'is-leaving'); } });
    incoming.hidden = false;
    incoming.classList.remove('is-leaving');
    void incoming.offsetWidth;
    incoming.classList.add('is-active');
    previous.classList.remove('is-active');
    if (motion.matches) {
      previous.hidden = true;
    } else {
      previous.classList.add('is-leaving');
      leaveTimer = setTimeout(() => { previous.hidden = true; previous.classList.remove('is-leaving'); }, 900);
    }
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    caption?.classList.remove('is-changing');
    void caption?.offsetWidth;
    caption?.classList.add('is-changing');
    title.textContent = incoming.dataset.title;
    description.textContent = incoming.dataset.description;
    incoming.dispatchEvent(new CustomEvent('studio:enter', { bubbles: true }));
  }

  function schedule() {
    clearInterval(timer);
    const playing = visible && !document.hidden && !motion.matches && !slides.some(slide => slide.contains(document.activeElement));
    root.classList.toggle('is-playing', playing);
    // Restart the dot progress bar so it always matches the next tick.
    root.classList.remove('is-ticking');
    void root.offsetWidth;
    if (playing) {
      root.classList.add('is-ticking');
      timer = setInterval(() => {
        show((index + 1) % slides.length);
        root.classList.remove('is-ticking');
        void root.offsetWidth;
        root.classList.add('is-ticking');
      }, DURATION);
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
