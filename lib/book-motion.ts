import { peelGeometry } from './peel-geometry';

/** Three mounted pages: native vertical reading, reversible bottom-edge peels. */
export function installBookMotion() {
  const root = document.documentElement;
  const pages = [...document.querySelectorAll<HTMLElement>('.book-page')];
  const previous = document.querySelector<HTMLButtonElement>('.book-previous')!;
  const next = document.querySelector<HTMLButtonElement>('.book-next')!;
  const number = document.querySelector<HTMLElement>('.book-number')!;
  const title = document.querySelector<HTMLElement>('.book-title')!;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let turning = false;
  let animations: Animation[] = [];
  let settle: (() => void) | undefined;
  const quiet = () => preference.matches || root.dataset.motion === 'paused';

  const updateControls = () => {
    previous.disabled = turning || current === 0;
    next.disabled = turning || current === pages.length - 1;
    previous.setAttribute(
      'aria-label',
      `Previous page${current ? ': ' + pages[current - 1].getAttribute('aria-label') : ''}`,
    );
    next.setAttribute(
      'aria-label',
      `Next page${current < pages.length - 1 ? ': ' + pages[current + 1].getAttribute('aria-label') : ''}`,
    );
    number.textContent = `${String(current + 1).padStart(2, '0')} / 03`;
    title.textContent = pages[current].getAttribute('aria-label');
    document
      .querySelectorAll<HTMLAnchorElement>('.navigation a, .brand')
      .forEach((link) => {
        if (link.hash === `#${pages[current].dataset.page}`)
          link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
  };
  const showCurrent = () => {
    pages.forEach((page, index) => {
      page.hidden = index !== current;
      page.inert = index !== current;
      page.style.zIndex = '';
      delete page.dataset.turning;
    });
    updateControls();
  };
  // The enhanced layout scrolls inside each region, so expose a keyboard stop.
  pages.forEach((page) => {
    page.querySelector<HTMLElement>('.book-scroll')!.tabIndex = 0;
  });
  root.dataset.book = 'active';
  showCurrent();

  const navigate = (hash: string, immediate = false, focus = true) => {
    const id = ['#main', '#top', '#site', ''].includes(hash)
      ? 'site'
      : hash === '#experience'
        ? 'thesis'
        : hash.slice(1);
    const target = pages.findIndex((page) => page.dataset.page === id);
    if (target === -1) return false;
    // History can settle an in-flight turn; repeated clicks cannot queue turns.
    const newHash = target === 0 ? '' : `#${id}`;
    if (turning && location.hash !== newHash) return true;
    settle?.();
    const destination = pages[target].querySelector<HTMLElement>(`#${id}`)!;
    const focusPage = () => {
      if (focus) destination.focus({ preventScroll: true });
    };
    if (location.hash !== newHash)
      history.pushState(
        null,
        '',
        location.pathname + location.search + newHash,
      );
    if (target === current) {
      if (hash === '#main')
        pages[current]
          .querySelector<HTMLElement>('.book-scroll')!
          .focus({ preventScroll: true });
      else focusPage();
      return true;
    }
    const outgoing = pages[current];
    const incoming = pages[target];
    const forward = target > current;
    current = target;
    if (immediate || quiet()) {
      showCurrent();
      focusPage();
      return true;
    }
    turning = true;
    root.dataset.bookTurning = 'true';
    outgoing.inert = true;
    incoming.hidden = false;
    incoming.inert = true;
    const sheet = forward ? outgoing : incoming;
    const underneath = forward ? incoming : outgoing;
    sheet.style.zIndex = '2';
    underneath.style.zIndex = '1';
    sheet.dataset.turning = forward ? 'forward' : 'back';
    updateControls();
    const height = sheet.clientHeight;
    const width = sheet.clientWidth;
    const contents = sheet.querySelector<HTMLElement>('.book-scroll')!;
    const options = {
      duration: 720,
      easing: 'cubic-bezier(.4,0,.2,1)',
      fill: 'both' as const,
    };
    // The sheet clips from the bottom while its contents counter-translate.
    // Text stays in place at its natural size, just as it does on the cover.
    const progress = forward ? [0, 1] : [1, 0];
    const foldFrames = Array.from({ length: 25 }, (_, index) => {
      const p = forward ? index / 24 : 1 - index / 24;
      const { curl } = peelGeometry(width, height, p);
      return { transform: `scaleY(${curl / height})`, offset: index / 24 };
    });
    animations = [
      sheet.animate(
        progress.map((p) => ({
          transform: `translate3d(0, ${-p * height}px, 0)`,
        })),
        options,
      ),
      contents.animate(
        progress.map((p) => ({
          transform: `translate3d(0, ${p * height}px, 0)`,
        })),
        options,
      ),
      sheet.animate(foldFrames, { ...options, pseudoElement: '::after' }),
    ];
    settle = () => {
      settle = undefined;
      animations.forEach((animation) => animation.cancel());
      animations = [];
      turning = false;
      delete root.dataset.bookTurning;
      showCurrent();
      focusPage();
    };
    animations[0].onfinish = () => settle?.();
    return true;
  };
  const step = (direction: number) => {
    if (root.dataset.intro !== 'done' || turning) return;
    const page = pages[current + direction];
    if (page) navigate(`#${page.dataset.page}`);
  };
  const backward = () => step(-1);
  const forward = () => step(1);
  const interactive = (target: EventTarget | null) =>
    target instanceof Element &&
    target.closest(
      'a, button, input, textarea, select, summary, [role="tablist"], [role="slider"], [contenteditable="true"], .model-flow, .philosophy-rail',
    );
  const keydown = (event: KeyboardEvent) => {
    if (
      root.dataset.intro !== 'done' ||
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      interactive(event.target)
    )
      return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (!event.repeat) step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };
  let touch: { x: number; y: number } | undefined;
  const touchStart = (event: TouchEvent) => {
    touch =
      event.touches.length === 1 &&
      !interactive(event.target) &&
      !turning &&
      root.dataset.intro === 'done'
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : undefined;
  };
  const touchMove = (event: TouchEvent) => {
    if (!touch) return;
    if (event.touches.length !== 1) {
      touch = undefined;
      return;
    }
    const dx = event.touches[0].clientX - touch.x;
    const dy = event.touches[0].clientY - touch.y;
    if (Math.abs(dy) > 20 && Math.abs(dy) > Math.abs(dx)) {
      touch = undefined;
      return;
    }
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      event.preventDefault();
      touch = undefined;
      step(dx < 0 ? 1 : -1);
    }
  };
  const touchEnd = () => {
    touch = undefined;
  };
  const finishTurn = () => settle?.();
  const motionChange = () => {
    if (quiet()) finishTurn();
  };
  previous.addEventListener('click', backward);
  next.addEventListener('click', forward);
  window.addEventListener('keydown', keydown);
  window.addEventListener('resize', finishTurn);
  window.addEventListener('keepri:motionchange', motionChange);
  preference.addEventListener('change', motionChange);
  const book = document.querySelector<HTMLElement>('.book')!;
  book.addEventListener('touchstart', touchStart, { passive: true });
  book.addEventListener('touchmove', touchMove, { passive: false });
  book.addEventListener('touchend', touchEnd);
  book.addEventListener('touchcancel', touchEnd);
  return {
    navigate,
    destroy: () => {
      finishTurn();
      delete root.dataset.book;
      pages.forEach((page) => {
        page.hidden = false;
        page.inert = false;
        page.querySelector('.book-scroll')!.removeAttribute('tabindex');
      });
      previous.removeEventListener('click', backward);
      next.removeEventListener('click', forward);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('resize', finishTurn);
      window.removeEventListener('keepri:motionchange', motionChange);
      preference.removeEventListener('change', motionChange);
      book.removeEventListener('touchstart', touchStart);
      book.removeEventListener('touchmove', touchMove);
      book.removeEventListener('touchend', touchEnd);
      book.removeEventListener('touchcancel', touchEnd);
    },
  };
}
