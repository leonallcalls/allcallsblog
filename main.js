const track = document.querySelector('.feature-track');
const carouselControls = document.querySelector('.feature-controls');

if (track && carouselControls) {
  const slides = Array.from(track.querySelectorAll('.feature-slide'));
  const newer = carouselControls.querySelector('[data-newer]');
  const older = carouselControls.querySelector('[data-older]');
  const position = carouselControls.querySelector('.feature-position');
  const announcement = carouselControls.querySelector('.feature-announcement');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = -1;
  let pendingFrame = 0;

  function updateCarousel() {
    const next = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    if (next === current || !Number.isFinite(next)) return;

    current = next;
    newer.setAttribute('aria-disabled', String(current === 0));
    older.setAttribute('aria-disabled', String(current === slides.length - 1));
    position.textContent = `Latest ${current + 1} / ${slides.length}`;
    const headline = slides[current].querySelector('.feature-title').textContent;
    announcement.textContent = `Story ${current + 1} of ${slides.length}. ${headline}`;

    slides.forEach((slide, index) => {
      const active = index === current;
      if (!active && slide.contains(document.activeElement)) {
        track.focus({ preventScroll: true });
      }
      slide.inert = !active;
      slide.querySelector('a').tabIndex = active ? 0 : -1;
    });
  }

  function shiftCarousel(delta) {
    const target = Math.max(0, Math.min(slides.length - 1, current + delta));
    if (target === current) return;

    track.scrollTo({
      left: slides[target].offsetLeft - slides[0].offsetLeft,
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
  }

  track.dataset.enhanced = '';
  const startingSlide = slides[1] ?? slides[0];
  track.scrollTo({ left: startingSlide.offsetLeft - slides[0].offsetLeft, behavior: 'instant' });
  newer.addEventListener('click', () => shiftCarousel(-1));
  older.addEventListener('click', () => shiftCarousel(1));
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    shiftCarousel(event.key === 'ArrowLeft' ? -1 : 1);
  });
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(pendingFrame);
    pendingFrame = requestAnimationFrame(updateCarousel);
  }, { passive: true });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
  carouselControls.hidden = false;
}

const filters = document.querySelector('.archive-controls');

if (filters) {
  const query = filters.querySelector('input');
  const topic = filters.querySelector('select');
  const resultCount = filters.querySelector('.results-count');
  const emptyMessage = document.querySelector('.no-results');
  const archivePeriod = document.querySelector('.archive-period');
  const februaryCards = Array.from(document.querySelectorAll('[data-february-archive]'));
  const cards = Array.from(document.querySelectorAll('.card')).map((node) => ({
    node,
    topics: node.dataset.topics.split('|'),
    text: `${node.textContent} ${node.dataset.topics}`.toLocaleLowerCase('en-US')
  }));

  function filterArchive() {
    const terms = query.value.toLocaleLowerCase('en-US').trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(({ node, topics, text }) => {
      const matchesTopic = topic.value === '' || topics.includes(topic.value);
      const matchesText = terms.every((term) => text.includes(term));
      node.hidden = !matchesTopic || !matchesText;
      if (!node.hidden) visible += 1;
    });
    resultCount.textContent = `${visible} of ${cards.length} articles`;
    emptyMessage.hidden = visible !== 0;
    if (archivePeriod) archivePeriod.hidden = februaryCards.every((card) => card.hidden);
  }

  filters.addEventListener('submit', (event) => event.preventDefault());
  filters.addEventListener('reset', () => requestAnimationFrame(filterArchive));
  query.addEventListener('input', filterArchive);
  topic.addEventListener('change', filterArchive);
  filterArchive();
  filters.hidden = false;
}
