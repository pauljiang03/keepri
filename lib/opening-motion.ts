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
  const cue = document.querySelector<HTMLAnchorElement>('.scroll-cue')!;
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
  let stage: 'idle' | 'spinning' | 'spun' | 'revealing' | 'ready' = 'idle';
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
  cueLabel.textContent = 'Swipe to spin';
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
    paper.style.clipPath = shape.clip;
    fold.setAttribute('points', shape.fold);
    gradient.setAttribute('x1', '0');
    gradient.setAttribute('y1', String(shape.edge));
    gradient.setAttribute('x2', '0');
    gradient.setAttribute('y2', String(shape.edge - shape.curl));
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
    revealTimeline?.pause();
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
  const readyToReveal = () => {
    if (done || disposed || stage !== 'spinning') return;
    stage = 'spun';
    overlay.dataset.step = 'spun';
    cueLabel.textContent = 'Swipe to reveal';
    cue.setAttribute('aria-disabled', 'false');
  };
  const readyToPeel = () => {
    if (done || disposed || stage !== 'revealing') return;
    stage = 'ready';
    overlay.dataset.step = 'ready';
    cueLabel.textContent = 'Peel to enter';
    cue.setAttribute('aria-disabled', 'false');
  };
  let timeline: gsap.core.Timeline;
  let revealTimeline: gsap.core.Timeline;
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
    gsap.set('.opening-spelling-word', { opacity: 0 });
    timeline = gsap.timeline({ paused: true, onComplete: readyToReveal });
    revealTimeline = gsap.timeline({ paused: true, onComplete: readyToPeel });
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
    // The constellation spins; the wordmark and words never transform.
    // Each stage waits for its own gesture; no text is revealed by the spin.
    timeline
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
        '.opening-progress i',
        { scaleX: 0.5, duration: 1.8, ease: 'none' },
        0,
      );
    // A second, fresh gesture reveals the stationary words at a slower pace.
    revealTimeline
      .to(
        '.thought-field, .opening-wordmark, .thought-glow',
        {
          opacity: 0,
          duration: 1.1,
          ease: 'sine.inOut',
        },
        0,
      )
      .to('.opening-spelling', { opacity: 1, duration: 0.01 }, 1.1)
      .to(
        '.opening-spelling-word',
        {
          opacity: 1,
          duration: 1.8,
          stagger: 0.8,
          ease: 'sine.inOut',
        },
        1.1,
      )
      .to(
        '.opening-progress i',
        {
          scaleX: 1,
          duration: 4.5,
          ease: 'none',
        },
        0,
      );
    // Reduced motion preserves all three deliberate input steps.
  });

  const advance = () => {
    if (done || entering || stage === 'spinning' || stage === 'revealing')
      return;
    if (stage === 'idle') {
      stage = 'spinning';
      overlay.dataset.step = 'spinning';
      cueLabel.textContent = 'Spinning…';
      cue.setAttribute('aria-disabled', 'true');
      if (preference.matches) timeline.progress(1).pause();
      else timeline.play(0);
      return;
    }
    if (stage === 'spun') {
      stage = 'revealing';
      overlay.dataset.step = 'revealing';
      cueLabel.textContent = 'Revealing…';
      cue.setAttribute('aria-disabled', 'true');
      if (preference.matches) revealTimeline.progress(1).pause();
      else revealTimeline.play(0);
      return;
    }
    entering = true;
    timeline.pause();
    revealTimeline.pause();
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
  // Wheel events arrive in bursts, including trackpad momentum. A single
  // continuous gesture must never trigger both the spin and the peel.
  let lastWheel = -Infinity;
  let wheelUsed = false;
  let wheelDistance = 0;
  const wheel = (event: WheelEvent) => {
    if (done || event.ctrlKey) return;
    const now = performance.now();
    const freshGesture = now - lastWheel > 240;
    lastWheel = now;
    if (freshGesture) {
      wheelUsed = false;
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
  let touchUsed = false;
  const touchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
    touchUsed = event.touches.length !== 1;
  };
  const touchMove = (event: TouchEvent) => {
    if (done || touchUsed || event.touches.length !== 1) return;
    if (touchY - (event.touches[0]?.clientY ?? touchY) > 12) {
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
    if (document.hidden) {
      timeline.pause();
      revealTimeline.pause();
      peelTimeline.pause();
    } else if (entering) peelTimeline.resume();
    else if (stage === 'spinning' && !preference.matches) timeline.resume();
    else if (stage === 'revealing' && !preference.matches)
      revealTimeline.resume();
  };
  const preferenceChange = () => {
    lenis.options.smoothWheel = !preference.matches;
    if (preference.matches) {
      if (stage === 'spinning') timeline.progress(1).pause();
      else if (stage === 'revealing') revealTimeline.progress(1).pause();
      if (entering) finish();
    } else if (!done && !entering && !document.hidden) {
      if (stage === 'spinning') timeline.resume();
      else if (stage === 'revealing') revealTimeline.resume();
    }
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
