import { gsap } from 'gsap';
import { pageTurnTransform, PAGE_TURN_DURATION } from './page-turn';

/** Every reading surface fits the viewport; gestures turn whole pages. */
export function installBookMotion() {
  const root = document.documentElement;
  const pages = [...document.querySelectorAll<HTMLElement>('.book-page')];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let turning = false;
  let settle: (() => void) | undefined;
  let animation: gsap.core.Tween | undefined;
  const quiet = () => preference.matches || root.dataset.motion === 'paused';
  const showCurrent = () => {
    pages.forEach((page, index) => {
      page.hidden = index !== current;
      page.inert = index !== current;
      page.style.zIndex = '';
      page.style.transform = '';
      delete page.dataset.turning;
    });
    const id = pages[current].id;
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
    const id = ['', '#main', '#top', '#site'].includes(hash)
      ? 'site'
      : hash === '#experience'
        ? 'thesis'
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
    const turn = { progress: forward ? 0 : 1 };
    sheet.style.transform = pageTurnTransform(turn.progress);
    settle = () => {
      settle = undefined;
      animation?.kill();
      turning = false;
      delete root.dataset.bookTurning;
      showCurrent();
      focusPage();
    };
    animation = gsap.to(turn, {
      progress: forward ? 1 : 0,
      duration: PAGE_TURN_DURATION / 1000,
      ease: 'power2.inOut',
      onUpdate: () => {
        sheet.style.transform = pageTurnTransform(turn.progress);
      },
      onComplete: () => settle?.(),
    });
    return true;
  };
  const step = (direction: number) => {
    if (root.dataset.intro !== 'done' || turning) return;
    const page = pages[current + direction];
    if (page) navigate(`#${page.id}`);
  };
  const interactive = (target: EventTarget | null) =>
    target instanceof Element &&
    target.closest(
      'a,button,input,textarea,select,summary,[contenteditable="true"]',
    );
  let lastWheel = -Infinity;
  let wheelUsed = false;
  let wheelDistance = 0;
  const wheel = (event: WheelEvent) => {
    if (event.ctrlKey) return;
    const now = performance.now();
    if (now - lastWheel > 280) {
      wheelUsed = turning || root.dataset.intro !== 'done';
      wheelDistance = 0;
    }
    lastWheel = now;
    if (root.dataset.intro !== 'done' || interactive(event.target)) return;
    event.preventDefault();
    if (turning || wheelUsed) return;
    const delta =
      Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
    wheelDistance +=
      delta *
      (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (Math.abs(wheelDistance) >= 45) {
      wheelUsed = true;
      step(wheelDistance > 0 ? 1 : -1);
    }
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
      event.preventDefault();
      if (!event.repeat) step(forward && !event.shiftKey ? 1 : -1);
    }
    if (event.key === 'Escape') settle?.();
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
    const dx = touch.x - event.touches[0].clientX;
    const dy = touch.y - event.touches[0].clientY;
    const delta = Math.abs(dy) >= Math.abs(dx) ? dy : dx;
    if (Math.abs(delta) >= 55) {
      event.preventDefault();
      touch = undefined;
      step(delta > 0 ? 1 : -1);
    }
  };
  const touchEnd = () => {
    touch = undefined;
  };
  const finishTurn = () => settle?.();
  const motionChange = () => {
    if (quiet()) finishTurn();
  };
  const visibility = () => {
    if (document.hidden) finishTurn();
  };
  window.addEventListener('wheel', wheel, { passive: false });
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
    destroy: () => {
      finishTurn();
      delete root.dataset.book;
      delete root.dataset.page;
      pages.forEach((page) => {
        page.hidden = false;
        page.inert = false;
      });
      window.removeEventListener('wheel', wheel);
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
