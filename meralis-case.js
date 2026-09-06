(() => {
  const dialog = document.querySelector('.image-dialog');
  const image = dialog.querySelector('img');
  let trigger;
  document.querySelectorAll('[data-zoom]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    trigger = link;
    image.src = link.href;
    image.alt = link.dataset.alt || link.querySelector('img')?.alt || 'Meralis product screenshot';
    dialog.querySelector('p').textContent = image.alt;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; trigger?.focus({preventScroll:true}); });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
})();
