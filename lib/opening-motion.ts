import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { pageTurnFrame, PAGE_TURN_DURATION } from './page-turn';

export function installOpeningMotion(
  bookNavigate?: (
    hash: string,
    immediate?: boolean,
    focus?: boolean,
  ) => boolean,
) {
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
    const frame = pageTurnFrame(innerWidth, height, peel.progress);
    paper.style.transform = frame.paper;
    content.style.transform = frame.content;
    fold.style.transform = frame.fold;
  };
  const scatter = () => {
    const narrow = innerWidth <= 700;
    const xs = narrow ? [-0.18, 0.13, -0.03] : [-0.24, 0.23, -0.12];
    const ys = [-0.12, 0.03, 0.16];
    xs.forEach((x, index) =>
      gsap.set(`.opening-thesis-word:nth-child(${index + 1})`, {
        x: innerWidth * x,
        y: innerHeight * ys[index],
        opacity: 0.8,
      }),
    );
  };
  const resize = () => {
    height = innerHeight;
    if (!done) drawPeel();
    if (!done && !entering) scatter();
  };
  resize();

  const destinationFor = (hash: string) =>
    document.getElementById(hash === '#experience' ? 'thesis' : hash.slice(1));
  const navigateTo = (hash: string, immediate = false, focus = true) => {
    if (bookNavigate?.(hash, immediate, focus)) return;
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
    timeline = gsap.timeline({ paused: true, onComplete: () => finish() });
    timeline
      .to(
        '.opening-line span',
        {
          x: (index: number, word: HTMLElement) => {
            const rect = word.getBoundingClientRect();
            return (
              innerWidth / 2 -
              rect.left -
              rect.width / 2 +
              Math.sin(index * 2.4) * 36
            );
          },
          opacity: 0,
          duration: 1.1,
          stagger: { amount: 0.28, from: 'edges' },
          ease: 'power2.in',
        },
        0,
      )
      .to(
        '.opening-line span',
        {
          y: (index: number, word: HTMLElement) => {
            const rect = word.getBoundingClientRect();
            return (
              innerHeight / 2 -
              rect.top -
              rect.height / 2 +
              Math.cos(index * 2.4) * 70
            );
          },
          duration: 1.1,
          stagger: { amount: 0.28, from: 'edges' },
          ease: 'power2.out',
        },
        0,
      )
      .to(
        '.opening-thesis-word',
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.08,
          ease: 'power3.inOut',
          onStart: () => {
            overlay.dataset.step = 'gathering';
          },
          onComplete: () => {
            overlay.dataset.step = 'meaning';
          },
        },
        0,
      )
      .to(
        peel,
        {
          progress: 1,
          duration: PAGE_TURN_DURATION / 1000,
          ease: 'power2.inOut',
          onStart: () => {
            overlay.dataset.step = 'entering';
          },
          onUpdate: drawPeel,
        },
        1.71,
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
    if (bookNavigate?.(hash)) return;
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
    if (done) navigateTo(location.hash || '#site');
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
    gsap.set('.opening-thesis-word', { clearProps: 'transform,opacity' });
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
