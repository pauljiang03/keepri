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
    peelTimeline?.pause();
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
  let peelTimeline: gsap.core.Timeline;
  const context = gsap.context(() => {
    const points = gsap.utils.toArray<SVGCircleElement>(
      '.thought-points circle',
    );
    gsap.set(points, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
    gsap.set('.thought-connections path', {
      strokeDasharray: 1,
      strokeDashoffset: 1,
    });
    gsap.set('.opening-letter', { opacity: 0, yPercent: 105 });
    timeline = gsap.timeline({ paused: preference.matches });
    // The cover animation and the exit are independent timelines. Nothing
    // advances into the peel until the visitor explicitly enters.
    peelTimeline = gsap.timeline({ paused: true, onComplete: () => finish() });
    peelTimeline
      .to('.intro-skip, .scroll-cue', { opacity: 0, duration: 0.25 }, 0)
      .to(
        peel,
        {
          progress: 1,
          duration: 1.65,
          ease: 'power3.inOut',
          onUpdate: drawPeel,
        },
        0,
      );
    // Stage one: the mark turns once inside the spinning constellation.
    // Stage two begins only after the spin has settled and faded away.
    timeline
      .from(
        '.opening-wordmark',
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        0,
      )
      .to(
        '.opening-wordmark',
        {
          rotationY: 360,
          transformPerspective: 900,
          duration: 1.65,
          ease: 'power2.inOut',
        },
        0.15,
      )
      .to('.thought-orbits', { opacity: 0.8, duration: 0.45 }, 0)
      .to(
        points,
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0,
      )
      .to(
        '.thought-connections path',
        {
          strokeDashoffset: 0,
          duration: 0.7,
          stagger: 0.015,
          ease: 'power2.inOut',
        },
        0.1,
      )
      .to(
        '.thought-network',
        {
          rotation: 360,
          transformOrigin: '50% 50%',
          duration: 1.8,
          ease: 'power2.inOut',
        },
        0,
      )
      .to('.thought-glow', { opacity: 0.65, duration: 0.7 }, 0)
      .to(
        '.thought-field, .opening-wordmark, .thought-glow',
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        },
        1.85,
      )
      .to('.opening-spelling', { opacity: 1, duration: 0.01 }, 2.15)
      .to(
        '.opening-letter',
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power3.out',
        },
        2.15,
      )
      .to(
        '.opening-progress i',
        {
          scaleX: 1,
          duration: 3.6,
          ease: 'none',
        },
        0,
      );
    // Reduced motion rests on the completed spelling, still awaiting entry.
    if (preference.matches) timeline.progress(1).pause();
  });

  const advance = () => {
    if (done || entering) return;
    entering = true;
    timeline.pause();
    if (preference.matches) finish(true, true);
    else peelTimeline.play(0);
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
    if (done || event.ctrlKey || event.deltaY < 8) return;
    event.preventDefault();
    advance();
  };
  let touchY = 0;
  const touchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
  };
  const touchMove = (event: TouchEvent) => {
    if (done || event.touches.length !== 1) return;
    if (touchY - (event.touches[0]?.clientY ?? touchY) > 12) {
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
    if (document.hidden) {
      timeline.pause();
      peelTimeline.pause();
    } else if (entering) peelTimeline.resume();
    else if (!preference.matches) timeline.resume();
  };
  const preferenceChange = () => {
    lenis.options.smoothWheel = !preference.matches;
    if (preference.matches) {
      timeline.progress(1).pause();
      if (entering) finish();
    } else if (!done && !entering && !document.hidden) timeline.resume();
  };
  const hashChange = () => {
    if (!done) finish(false);
    navigateTo(location.hash);
  };
  const pageShow = (event: PageTransitionEvent) => {
    // BFCache restores the completed document; only real loads replay it.
    if (event.persisted) visibility();
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
