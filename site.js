(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const elements = document.querySelectorAll(
    '.nav, .hero-copy, .hero-photo, .split, .section, .contact > div, .case-hero > div, .case-section, .case-footer > div'
  );

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  elements.forEach((element, index) => {
    element.classList.add('reveal');
    if (index < 4) element.style.setProperty('--reveal-delay', `${index * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
  );

  elements.forEach((element) => observer.observe(element));
})();
