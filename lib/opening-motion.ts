import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { peelGeometry } from './peel-geometry';

export function installOpeningMotion() {
  const root = document.documentElement;
  const overlay = document.querySelector<HTMLElement>('.intro-overlay')!;
  const paper = document.querySelector<HTMLElement>('.opening-layer')!;
  const fold = document.querySelector<SVGPolygonElement>('.peel-fold')!;
  const gradient =
    document.querySelector<SVGLinearGradientElement>('#peel-shading')!;
  const foldSvg = document.querySelector<SVGSVGElement>('.peel-surface')!;
  const hero = document.querySelector<HTMLElement>('.hero-layer')!;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const initialHash = location.hash;
  const previousRestoration = history.scrollRestoration;
  const blocked = [
    ...document.querySelectorAll<HTMLElement>(
      '.site-header, .hero-layer, #main, .site-footer',
    ),
  ];
  let done = false;
  let disposed = false;
  let width = innerWidth;
  let height = innerHeight;
  let refreshFrame = 0;
  const peel = { progress: 0 };
  history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, behavior: 'instant' });
  root.dataset.intro = 'active';
  overlay.hidden = false;
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
    paper.style.clipPath = shape.clip;
    fold.setAttribute('points', shape.fold);
    gradient.setAttribute('x1', String(shape.edge / 2));
    gradient.setAttribute('y1', String(-shape.edge / 2));
    gradient.setAttribute('x2', String((shape.edge - shape.curl) / 2));
    gradient.setAttribute('y2', String(-(shape.edge - shape.curl) / 2));
  };
  const resize = () => {
    width = innerWidth;
    height = innerHeight;
    foldSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
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
    const points = gsap.utils.toArray<SVGCircleElement>(
      '.thought-points circle',
    );
    gsap.set(points, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
    gsap.set('.thought-connections path', {
      strokeDasharray: 1,
      strokeDashoffset: 1,
    });
    timeline = gsap.timeline({ onComplete: () => finish() });
    if (preference.matches) {
      // Every load still gets an opening, without the spatial animation.
      timeline
        .set('.opening-wordmark', { opacity: 1 })
        .to({}, { duration: 0.45 });
      return;
    }
    timeline
      .from(
        '.opening-wordmark',
        { opacity: 0, y: 15, duration: 0.7, ease: 'power3.out' },
        0,
      )
      .to('.thought-orbits', { opacity: 0.8, duration: 0.8 }, 0.1)
      .to(
        points,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.035,
          ease: 'power2.out',
        },
        0.15,
      )
      .to(
        '.thought-connections path',
        {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.018,
          ease: 'power2.inOut',
        },
        0.25,
      )
      .to('.thought-word', { opacity: 1, duration: 0.5, stagger: 0.09 }, 0.6)
      .to('.thought-glow', { opacity: 0.8, duration: 1.2 }, 0.1)
      .to(
        '.thought-network',
        {
          rotation: 12,
          transformOrigin: '50% 50%',
          duration: 3.5,
          ease: 'none',
        },
        0,
      )
      .to('.opening-progress i', { scaleX: 1, duration: 2.15, ease: 'none' }, 0)
      .to('.intro-skip, .scroll-cue', { opacity: 0, duration: 0.25 }, 2.05)
      .to(
        peel,
        {
          progress: 1,
          duration: 1.65,
          ease: 'power3.inOut',
          onUpdate: drawPeel,
        },
        2.15,
      );
  });

  const advance = () => {
    if (done) return;
    if (preference.matches) finish(false, true);
    else {
      timeline.time(Math.max(timeline.time(), 2.15));
      timeline.timeScale(1.7);
    }
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
    if (!done && anchor?.classList.contains('scroll-cue')) {
      advance();
      return;
    }
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
  const wheel = (event: WheelEvent) => {
    if (done || event.ctrlKey || Math.abs(event.deltaY) < 8) return;
    event.preventDefault();
    advance();
  };
  let touchY = 0;
  const touchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
  };
  const touchMove = (event: TouchEvent) => {
    if (done || event.touches.length !== 1) return;
    if (Math.abs((event.touches[0]?.clientY ?? touchY) - touchY) > 12) {
      event.preventDefault();
      advance();
    }
  };
  const keydown = (event: KeyboardEvent) => {
    if (done) return;
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
    else timeline.resume();
  };
  const preferenceChange = () => {
    lenis.options.smoothWheel = !preference.matches;
    if (preference.matches) finish();
  };
  const hashChange = () => {
    if (!done) finish(false);
    navigateTo(location.hash);
  };
  const pageShow = (event: PageTransitionEvent) => {
    // BFCache restores the completed document; only real loads replay it.
    if (event.persisted && !done) finish();
  };
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
    paper.style.clipPath = '';
    delete root.dataset.intro;
    history.scrollRestoration = previousRestoration;
    layout.disconnect();
    cancelAnimationFrame(refreshFrame);
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
