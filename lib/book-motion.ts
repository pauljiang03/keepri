import { gsap } from 'gsap';
import { createWordSurfaces } from './transition-words';
import { createWheelGesture } from './wheel-gesture';

/** Every reading surface fits the viewport; gestures turn whole pages. */
export function installBookMotion() {
  const root = document.documentElement;
  const pages = [...document.querySelectorAll<HTMLElement>('.book-page')];
  const cue = document.querySelector<HTMLButtonElement>('.page-swipe-cue')!;
  const cueLabel = cue.querySelector('span')!;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const words = createWordSurfaces();
  let current = 0;
  let turning = false;
  let turnDirection = 0;
  let settle: (() => void) | undefined;
  let animation: gsap.core.Timeline | undefined;
  const quiet = () => preference.matches || root.dataset.motion === 'paused';
  const showCurrent = () => {
    pages.forEach((page, index) => {
      words.reset(page);
      page.hidden = index !== current;
      page.inert = index !== current;
      page.style.zIndex = '';
      page.style.transform = '';
      page.style.opacity = '';
      delete page.dataset.turning;
    });
    const id = pages[current].id;
    const lastPage = current === pages.length - 1;
    cue.setAttribute('aria-disabled', 'false');
    cue.dataset.direction = lastPage ? 'back' : 'forward';
    cueLabel.textContent = lastPage
      ? 'Swipe down to go back'
      : current === 0
        ? 'Swipe up to explore'
        : 'Swipe up · down to go back';
    cue.setAttribute(
      'aria-label',
      lastPage ? 'Return to the previous page' : 'Continue to the next page',
    );
    root.dataset.page = id;
    const chapter =
      id === 'thesis' || id.startsWith('principle-')
        ? 'thesis'
        : id.startsWith('research')
          ? 'research'
          : 'site';
    document
      .querySelectorAll<HTMLAnchorElement>('.navigation a, .brand')
      .forEach((link) => {
        if (link.hash === `#${chapter}`)
          link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
  };
  root.dataset.book = 'active';
  showCurrent();
  const navigate = (hash: string, immediate = false, focus = true) => {
    const id = [
      '',
      '#main',
      '#top',
      '#site',
      '#funding',
      '#funding-model',
      '#vision',
    ].includes(hash)
      ? 'site'
      : hash === '#experience'
        ? 'thesis'
        : /^#principle-\d+$/.test(hash)
          ? 'thesis'
          : hash.startsWith('#research-') || hash === '#contact'
            ? 'research'
            : hash.slice(1);
    const target = pages.findIndex((page) => page.id === id);
    if (target === -1) return false;
    const newHash = target === 0 ? '' : `#${id}`;
    if (turning && (target === current || location.hash !== newHash))
      return true;
    settle?.();
    const focusPage = () => {
      if (focus) pages[target].focus({ preventScroll: true });
    };
    if (location.hash !== newHash)
      history.pushState(
        null,
        '',
        location.pathname + location.search + newHash,
      );
    if (target === current) {
      focusPage();
      return true;
    }
    const outgoing = pages[current];
    const incoming = pages[target];
    incoming.scrollTop = 0;
    const forward = target > current;
    current = target;
    if (immediate || quiet()) {
      showCurrent();
      focusPage();
      return true;
    }
    turning = true;
    turnDirection = forward ? 1 : -1;
    root.dataset.bookTurning = 'true';
    cue.setAttribute('aria-disabled', 'true');
    outgoing.inert = true;
    incoming.hidden = false;
    incoming.inert = true;
    outgoing.style.zIndex = '2';
    incoming.style.zIndex = '1';
    outgoing.dataset.turning = forward ? 'forward' : 'back';
    incoming.dataset.turning = forward ? 'forward' : 'back';
    const leaving = words.prepare(outgoing);
    const arriving = words.prepare(incoming);
    gsap.set(incoming, { opacity: 0 });
    gsap.set(arriving, { y: turnDirection * 24, opacity: 0 });
    settle = () => {
      settle = undefined;
      animation?.kill();
      turning = false;
      delete root.dataset.bookTurning;
      showCurrent();
      focusPage();
    };
    animation = gsap
      .timeline({
        onComplete: () => settle?.(),
      })
      .to(
        leaving,
        {
          y: -turnDirection * 24,
          opacity: 0,
          duration: 0.16,
          stagger: { amount: 0.04 },
          ease: 'power2.in',
        },
        0,
      )
      .to(outgoing, { opacity: 0, duration: 0.08 }, 0.16)
      .to(incoming, { opacity: 1, duration: 0.08 }, 0.16)
      .to(
        arriving,
        {
          y: 0,
          opacity: 1,
          duration: 0.24,
          stagger: { amount: 0.06 },
          ease: 'power3.out',
        },
        0.22,
      );
    return true;
  };
  const step = (direction: number) => {
    if (root.dataset.intro !== 'done' || turning) return;
    const page = pages[current + direction];
    if (page) navigate(`#${page.id}`);
  };
  const interactive = (target: EventTarget | null) =>
    target instanceof Element &&
    !target.closest('.page-swipe-cue') &&
    target.closest(
      'a,button,input,textarea,select,summary,[contenteditable="true"]',
    );
  const wheelGesture = createWheelGesture();
  const wheel = (event: WheelEvent) => {
    if (event.ctrlKey) return;
    const delta =
      Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
    if (!delta) return;
    const blocked =
      root.dataset.intro !== 'done' || !!interactive(event.target);
    const direction = wheelGesture(
      delta *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1),
      performance.now(),
      blocked || turning,
    );
    if (blocked) return;
    event.preventDefault();
    if (direction) step(direction);
  };
  const keydown = (event: KeyboardEvent) => {
    if (
      root.dataset.intro !== 'done' ||
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      interactive(event.target)
    )
      return;
    const forward = ['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(
      event.key,
    );
    const back = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key);
    if (forward || back) {
      const direction = forward && !event.shiftKey ? 1 : -1;
      event.preventDefault();
      if (!event.repeat) step(direction);
    }
    if (event.key === 'Escape') settle?.();
  };
  let touch: { x: number; y: number } | undefined;
  const touchStart = (event: TouchEvent) => {
    touch =
      event.touches.length === 1 &&
      !interactive(event.target) &&
      root.dataset.intro === 'done' &&
      !turning
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
        : undefined;
  };
  const touchMove = (event: TouchEvent) => {
    if (!touch) return;
    if (event.touches.length !== 1) {
      touch = undefined;
      return;
    }
    const dx = touch.x - event.touches[0].clientX;
    const dy = touch.y - event.touches[0].clientY;
    const delta = Math.abs(dy) >= Math.abs(dx) ? dy : dx;
    if (Math.abs(delta) >= 14) {
      event.preventDefault();
      touch = undefined;
      step(delta > 0 ? 1 : -1);
    }
  };
  const touchEnd = () => {
    touch = undefined;
  };
  const finishTurn = () => settle?.();
  const cueClick = () => step(current === pages.length - 1 ? -1 : 1);
  const motionChange = () => {
    if (quiet()) finishTurn();
  };
  const visibility = () => {
    if (document.hidden) finishTurn();
  };
  window.addEventListener('wheel', wheel, { passive: false });
  cue.addEventListener('click', cueClick);
  window.addEventListener('keydown', keydown);
  window.addEventListener('resize', finishTurn);
  window.addEventListener('keepri:motionchange', motionChange);
  document.addEventListener('visibilitychange', visibility);
  preference.addEventListener('change', motionChange);
  const book = document.querySelector<HTMLElement>('.book')!;
  book.addEventListener('touchstart', touchStart, { passive: true });
  book.addEventListener('touchmove', touchMove, { passive: false });
  book.addEventListener('touchend', touchEnd);
  book.addEventListener('touchcancel', touchEnd);
  return {
    navigate,
    reveal: () => {
      if (quiet()) return;
      const page = pages[current];
      const arriving = words.prepare(page);
      turning = true;
      turnDirection = 1;
      root.dataset.bookTurning = 'true';
      cue.setAttribute('aria-disabled', 'true');
      settle = () => {
        settle = undefined;
        animation?.kill();
        turning = false;
        delete root.dataset.bookTurning;
        showCurrent();
      };
      gsap.set(arriving, { y: 24, opacity: 0 });
      animation = gsap
        .timeline({
          onComplete: () => settle?.(),
        })
        .to(arriving, {
          y: 0,
          opacity: 1,
          duration: 0.36,
          stagger: { amount: 0.1 },
          ease: 'power3.out',
        });
    },
    destroy: () => {
      finishTurn();
      delete root.dataset.book;
      delete root.dataset.page;
      pages.forEach((page) => {
        page.hidden = false;
        page.inert = false;
      });
      words.destroy();
      window.removeEventListener('wheel', wheel);
      cue.removeEventListener('click', cueClick);
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('resize', finishTurn);
      window.removeEventListener('keepri:motionchange', motionChange);
      document.removeEventListener('visibilitychange', visibility);
      preference.removeEventListener('change', motionChange);
      book.removeEventListener('touchstart', touchStart);
      book.removeEventListener('touchmove', touchMove);
      book.removeEventListener('touchend', touchEnd);
      book.removeEventListener('touchcancel', touchEnd);
    },
  };
}
