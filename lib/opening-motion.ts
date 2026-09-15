import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { peelGeometry } from './peel-geometry';

export function installOpeningMotion() {
  const root = document.documentElement;
  const overlay = document.querySelector<HTMLElement>('.intro-overlay')!;
  const paper = document.querySelector<HTMLElement>('.opening-layer')!;
  const content = document.querySelector<HTMLElement>('.opening-content')!;
  const fold = document.querySelector<HTMLElement>('.peel-fold')!;
  const hero = document.querySelector<HTMLElement>('.hero-layer')!;
  const cue = document.querySelector<HTMLButtonElement>('.scroll-cue')!;
  const cueLabel = document.querySelector<HTMLElement>('.intro-cue-label')!;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const initialHash = location.hash;
  const previousRestoration = history.scrollRestoration;
  const blocked = [
    ...document.querySelectorAll<HTMLElement>(
      '.site-header, .hero-layer, #main, .site-footer',
    ),
  ];
  let done = false;
  let entering = false;
  let disposed = false;
  let width = innerWidth;
  let height = innerHeight;
  let refreshFrame = 0;
  const peel = { progress: 0 };
  history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, behavior: 'instant' });
  root.dataset.intro = 'active';
  overlay.hidden = false;
  overlay.dataset.step = 'idle';
  cueLabel.textContent = 'Scroll to begin';
  cue.setAttribute('aria-disabled', 'false');
  blocked.forEach((element) => {
    element.inert = true;
  });

  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: !preference.matches,
    syncTouch: false,
    allowNestedScroll: true,
  });
  lenis.stop();
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  lenis.on('scroll', () => ScrollTrigger.update());

  const drawPeel = () => {
    const shape = peelGeometry(width, height, peel.progress);
    const lift = height - shape.edge;
    // Counter-translate the contents inside the moving, clipped sheet so the
    // type remains stationary. The paper and its curl only use transforms.
    paper.style.transform = `translate3d(0, ${-lift}px, 0)`;
    content.style.transform = `translate3d(0, ${lift}px, 0)`;
    fold.style.transform = `translate3d(0, ${-lift}px, 0) scaleY(${shape.curl / height})`;
  };
  const resize = () => {
    width = innerWidth;
    height = innerHeight;
    if (!done) drawPeel();
  };
  resize();

  const destinationFor = (hash: string) =>
    document.getElementById(hash === '#experience' ? 'thesis' : hash.slice(1));
  const navigateTo = (hash: string, immediate = false, focus = true) => {
    const destination = destinationFor(hash);
    if (!destination) return;
    lenis.scrollTo(hash === '#site' || hash === '#top' ? 0 : destination, {
      immediate: immediate || preference.matches,
      duration: 1.05,
      offset: hash === '#site' || hash === '#top' ? 0 : -80,
      onComplete: () => {
        if (focus) destination.focus({ preventScroll: true });
      },
    });
  };
  const finish = (restoreHash = true, focus = false) => {
    if (done || disposed) return;
    done = true;
    timeline?.pause();
    const focusWasInside = overlay.contains(document.activeElement);
    // Remove the intro from layout, hit testing and the accessibility tree.
    // There is no scroll range, history entry or reverse animation to re-enter.
    overlay.hidden = true;
    root.dataset.intro = 'done';
    overlay.dataset.step = 'done';
    blocked.forEach((element) => {
      element.inert = false;
    });
    lenis.start();
    lenis.resize();
    lenis.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
    if (restoreHash && initialHash && initialHash !== '#top')
      navigateTo(initialHash, true, focusWasInside);
    else if (focus || focusWasInside) hero.focus({ preventScroll: true });
  };
  let timeline: gsap.core.Timeline;
  const context = gsap.context(() => {
    gsap.set('.opening-wordmark', { opacity: 0 });
    // One input owns the entire entry: reasoning, the name, then the page.
    // Repeated input cannot seek, restart or skip any part of this timeline.
    timeline = gsap.timeline({ paused: true, onComplete: () => finish() });
    timeline
      .to('.scroll-cue', { opacity: 0, duration: 0.2 }, 0)
      .to(
        '.opening-line:nth-child(odd)',
        {
          xPercent: -8,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        0,
      )
      .to(
        '.opening-line:nth-child(even)',
        {
          xPercent: 8,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        0,
      )
      .to(
        '.opening-thesis',
        { opacity: 0, duration: 0.35, ease: 'power2.inOut' },
        0.45,
      )
      .to(
        '.opening-wordmark',
        {
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
          onStart: () => {
            overlay.dataset.step = 'name';
          },
        },
        0.65,
      )
      .to('.intro-skip', { opacity: 0, duration: 0.2 }, 1.55)
      .to(
        peel,
        {
          progress: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          onStart: () => {
            overlay.dataset.step = 'entering';
          },
          onUpdate: drawPeel,
        },
        1.55,
      );
  });
  const advance = () => {
    if (done || entering) return;
    entering = true;
    overlay.dataset.step = 'intro';
    cue.setAttribute('aria-disabled', 'true');
    cueLabel.textContent = 'Opening KeepRI';
    if (preference.matches) finish(true, true);
    else timeline.play(0);
  };
  const navigate = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    const hash = anchor?.getAttribute('href');
    if (!hash || !destinationFor(hash)) return;
    event.preventDefault();
    if (!done) finish(false, true);
    history.replaceState(
      null,
      '',
      hash === '#site' || hash === '#top'
        ? location.pathname + location.search
        : hash,
    );
    navigateTo(hash);
  };
  // Wheel events arrive in bursts, including trackpad momentum. A single
  // continuous gesture starts the sequence only once.
  let lastWheel = -Infinity;
  let wheelUsed = false;
  let wheelDistance = 0;
  const wheel = (event: WheelEvent) => {
    if (done || event.ctrlKey) return;
    const now = performance.now();
    const freshGesture = now - lastWheel > 240;
    lastWheel = now;
    if (freshGesture) {
      wheelUsed = entering;
      wheelDistance = 0;
    }
    const delta =
      event.deltaY *
      (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1);
    wheelDistance = Math.max(0, wheelDistance + delta);
    if (delta <= 0) return;
    event.preventDefault();
    if (!wheelUsed && wheelDistance >= 12) {
      wheelUsed = true;
      advance();
    }
  };
  let touchY = 0;
  let touchX = 0;
  let touchUsed = false;
  const touchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
    touchX = event.touches[0]?.clientX ?? 0;
    touchUsed = event.touches.length !== 1 || done || entering;
  };
  const touchMove = (event: TouchEvent) => {
    if (done || event.touches.length !== 1) return;
    if (touchUsed) {
      event.preventDefault();
      return;
    }
    const dy = touchY - (event.touches[0]?.clientY ?? touchY);
    const dx = Math.abs(touchX - (event.touches[0]?.clientX ?? touchX));
    if (dy > 28 && dy > dx) {
      event.preventDefault();
      touchUsed = true;
      advance();
    }
  };
  const keydown = (event: KeyboardEvent) => {
    if (done) return;
    if (
      event.repeat &&
      ['Enter', 'ArrowDown', 'PageDown', 'End', ' '].includes(event.key)
    ) {
      event.preventDefault();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      finish(false, true);
    } else if (['ArrowDown', 'PageDown', 'End', ' '].includes(event.key)) {
      event.preventDefault();
      advance();
    }
  };
  const visibility = () => {
    if (done) return;
    if (document.hidden) timeline.pause();
    else if (entering) timeline.resume();
  };
  const preferenceChange = () => {
    lenis.options.smoothWheel = !preference.matches;
    if (preference.matches && entering) finish(true, true);
  };
  const hashChange = () => {
    // Hash changes are navigation, not permission to skip an active intro.
    if (done) navigateTo(location.hash);
  };
  const pageShow = (event: PageTransitionEvent) => {
    // BFCache restores the completed document; only real loads replay it.
    if (event.persisted) visibility();
  };
  cue.addEventListener('click', advance);
  document.addEventListener('click', navigate);
  window.addEventListener('wheel', wheel, { passive: false });
  overlay.addEventListener('touchstart', touchStart, { passive: true });
  overlay.addEventListener('touchmove', touchMove, { passive: false });
  window.addEventListener('keydown', keydown);
  window.addEventListener('resize', resize);
  window.addEventListener('hashchange', hashChange);
  window.addEventListener('pageshow', pageShow);
  document.addEventListener('visibilitychange', visibility);
  preference.addEventListener('change', preferenceChange);
  visibility();
  const layout = new ResizeObserver(() => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
  });
  layout.observe(document.getElementById('main')!);
  void document.fonts.ready.then(() => {
    if (!disposed) {
      lenis.resize();
      ScrollTrigger.refresh();
    }
  });
  return () => {
    disposed = true;
    context.revert();
    gsap.ticker.remove(tick);
    lenis.destroy();
    blocked.forEach((element) => {
      element.inert = false;
    });
    overlay.hidden = true;
    paper.style.transform = '';
    content.style.transform = '';
    fold.style.transform = '';
    delete root.dataset.intro;
    history.scrollRestoration = previousRestoration;
    layout.disconnect();
    cancelAnimationFrame(refreshFrame);
    cue.removeEventListener('click', advance);
    document.removeEventListener('click', navigate);
    window.removeEventListener('wheel', wheel);
    overlay.removeEventListener('touchstart', touchStart);
    overlay.removeEventListener('touchmove', touchMove);
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('resize', resize);
    window.removeEventListener('hashchange', hashChange);
    window.removeEventListener('pageshow', pageShow);
    document.removeEventListener('visibilitychange', visibility);
    preference.removeEventListener('change', preferenceChange);
  };
}
