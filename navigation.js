(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  function samePage(first, second) {
    return first.origin === second.origin &&
      first.pathname.replace(/index\.html$/, '') === second.pathname.replace(/index\.html$/, '');
  }

  function routeDirection(from, to, incoming) {
    if (to.hash === '#articles') return 'archive';
    const other = incoming ? from : to;
    for (const direction of ['newer', 'older']) {
      const neighbor = document.querySelector(`[data-story-direction="${direction}"]`);
      if (neighbor && samePage(new URL(neighbor.href), other)) {
        const forward = direction === 'older';
        return (incoming ? !forward : forward) ? 'forward' : 'backward';
      }
    }
    return 'forward';
  }

  function markTransition(transition, activation, incoming) {
    if (!transition?.types || !activation?.from || !activation.entry) return;
    const from = new URL(activation.from.url);
    const to = new URL(activation.entry.url);
    transition.types.add(routeDirection(from, to, incoming));
  }

  window.addEventListener('pageswap', (event) =>
    markTransition(event.viewTransition, event.activation, false));
  window.addEventListener('pagereveal', (event) =>
    markTransition(event.viewTransition, window.navigation?.activation, true));

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey || reducedMotion.matches || !document.startViewTransition) return;

    const link = event.target.closest('a[data-browse-articles]');
    if (!link) return;
    const destination = new URL(link.href);
    if (!samePage(new URL(location.href), destination)) return;

    const archive = document.getElementById('articles');
    if (!archive) return;
    event.preventDefault();
    const transition = document.startViewTransition(() => {
      if (location.hash !== destination.hash) history.pushState(null, '', destination.hash);
      archive.scrollIntoView({ behavior: 'instant', block: 'start' });
      document.getElementById('archive-title')?.focus({ preventScroll: true });
    });
    transition.types?.add('archive');
  });
})();
