import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import Lenis from 'lenis';
import { installParticleField } from './particle-field';

export const INTRO_STORAGE_KEY = 'keepri:opening-seen:v3';
export const MOTION = {
  introHeightVh: 280,
  introMobileHeightVh: 240,
  headlineIntervalMs: 2800,
  headlineFadeMs: 800,
  headlineTravelMs: 900,
  heroMarqueePxPerSecond: 50,
};

export function installOpeningMotion(restoreInitialHash = true) {
  gsap.registerPlugin(Draggable, InertiaPlugin);
  const root = document.documentElement;
  const opening = document.querySelector<HTMLElement>('.opening')!;
  const hero = document.querySelector<HTMLElement>('.hero-layer')!;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const dotExit = { value: 0 };
  const cleanups: (() => void)[] = [];
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: !preference.matches,
    syncTouch: false,
    allowNestedScroll: true,
  });
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', () => ScrollTrigger.update());
  const travel = () => opening.offsetHeight - window.innerHeight;
  let entered = root.dataset.intro === 'seen' || preference.matches;
  try {
    entered ||= sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
  } catch {
    /* Optional storage. */
  }
  if (location.hash && location.hash !== '#top') entered = true;
  root.dataset.intro = entered ? 'seen' : 'active';
  hero.inert = !entered;
  const context = gsap.context(() => {
    if (!entered) {
      opening.dataset.enhanced = 'true';
      // Three scroll-controlled beats: connect, gather, open. The complete
      // timeline is one unit so its positions are fractions of scroll travel.
      const points = gsap.utils.toArray<SVGCircleElement>(
        '.thought-points circle',
      );
      const paths = gsap.utils.toArray<SVGPathElement>(
        '.thought-connections path',
      );
      gsap.set(points, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
      gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set('.thought-orbits', {
        opacity: 0,
        scale: 0.8,
        transformOrigin: '50% 50%',
      });
      gsap.set('.thought-word', { opacity: 0, y: 12 });
      gsap.set(hero, { opacity: 1, clipPath: 'circle(0% at 50% 50%)' });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: opening,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.dataset.intro = self.progress > 0.82 ? 'done' : 'active';
            hero.inert = self.progress <= 0.82;
            if (self.progress > 0.82) {
              try {
                sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
              } catch {
                /* Optional storage. */
              }
            }
          },
        },
      });
      timeline
        .to('.scroll-cue', { autoAlpha: 0, duration: 0.07 }, 0)
        .to(
          '.thought-orbits',
          { opacity: 1, scale: 1, duration: 0.24, ease: 'power2.out' },
          0.02,
        )
        .to(
          points,
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            stagger: 0.008,
            ease: 'back.out(1.5)',
          },
          0.04,
        )
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 0.22,
            stagger: 0.006,
            ease: 'power1.inOut',
          },
          0.08,
        )
        .to(
          '.thought-word',
          {
            opacity: 1,
            y: 0,
            duration: 0.12,
            stagger: 0.025,
            ease: 'power2.out',
          },
          0.14,
        )
        .to(
          '.thought-glow',
          { opacity: 0.75, scale: 1.15, duration: 0.34 },
          0.1,
        )
        .to(
          '.thought-network',
          {
            rotation: 32,
            duration: 0.42,
            transformOrigin: '50% 50%',
            ease: 'power1.inOut',
          },
          0.18,
        )
        .to(
          '.thought-word',
          { opacity: 0, y: -8, duration: 0.12, stagger: 0.018 },
          0.42,
        )
        .to('.thought-connections', { opacity: 0, duration: 0.16 }, 0.44)
        .to(
          points,
          {
            x: (_, el) => 400 - Number(el.getAttribute('cx')),
            y: (_, el) => 400 - Number(el.getAttribute('cy')),
            scale: 0.4,
            duration: 0.2,
            stagger: 0.003,
            ease: 'power2.inOut',
          },
          0.43,
        )
        .to(
          '.thought-orbits',
          { scale: 0.12, opacity: 0, duration: 0.22, ease: 'power2.in' },
          0.43,
        )
        .to(
          '.opening-wordmark',
          { opacity: 0, scale: 0.94, duration: 0.12, ease: 'power1.in' },
          0.48,
        )
        .to(
          hero,
          {
            clipPath: 'circle(75% at 50% 50%)',
            duration: 0.28,
            ease: 'power2.inOut',
          },
          0.58,
        )
        .to('.opening-layer', { opacity: 0, duration: 0.16 }, 0.68)
        .set(hero, { clipPath: 'none' }, 0.86)
        .to('.opening-progress i', { scaleX: 1, duration: 0.58 }, 0)
        .to({}, { duration: 0.14 }, 0.86);
      ScrollTrigger.create({
        trigger: opening,
        start: () => `top+=${0.96 * travel()} top`,
        end: () => `top+=${travel() + 0.45 * innerHeight} top`,
        onUpdate: (self) => {
          dotExit.value = self.progress;
        },
      });
    }
    if (!preference.matches) {
      document.querySelectorAll<HTMLElement>('.marquee').forEach((marquee) => {
        const track = marquee.querySelector<HTMLElement>('.marquee-track')!;
        const group = track.firstElementChild as HTMLElement;
        let tween: gsap.core.Tween;
        function build() {
          tween?.kill();
          const width = group.getBoundingClientRect().width;
          if (!width) return;
          gsap.set(track, { x: 0 });
          tween = gsap.to(track, {
            x: -width,
            duration: width / Number(marquee.dataset.speed || 24),
            ease: 'none',
            repeat: -1,
            paused: root.dataset.motion === 'paused',
          });
        }
        build();
        const observer = new ResizeObserver(build);
        observer.observe(group);
        let progress = 0;
        const proxy = document.createElement('div');
        const synchronize = function (this: Draggable) {
          tween?.progress(
            gsap.utils.wrap(0, 1, progress - this.x / group.offsetWidth),
          );
        };
        const [drag] = Draggable.create(proxy, {
          trigger: marquee,
          type: 'x',
          inertia: true,
          overshootTolerance: 0,
          snap: function (this: Draggable, value: number) {
            return Math.round(
              gsap.utils.clamp(this.x - 1000, this.x + 1000, value),
            );
          },
          allowNativeTouchScrolling: true,
          onPressInit() {
            progress = tween?.progress() || 0;
            gsap.set(proxy, { x: 0 });
            this.update();
            tween?.pause();
          },
          onDrag: synchronize,
          onThrowUpdate: synchronize,
          onRelease() {
            if (!this.isThrowing && root.dataset.motion !== 'paused')
              tween?.resume();
          },
          onThrowComplete() {
            if (root.dataset.motion !== 'paused') tween?.resume();
          },
        });
        const steer = (event: WheelEvent) => {
          if (!event.deltaX || Math.abs(event.deltaX) <= Math.abs(event.deltaY))
            return;
          event.preventDefault();
          const scale =
            event.deltaMode === 1
              ? 16
              : event.deltaMode === 2
                ? marquee.clientWidth
                : 1;
          tween?.progress(
            gsap.utils.wrap(
              0,
              1,
              tween.progress() + (event.deltaX * scale) / group.offsetWidth,
            ),
          );
        };
        marquee.addEventListener('wheel', steer, { passive: false });
        const toggle = () => {
          if (root.dataset.motion === 'paused') {
            drag.tween?.kill();
            tween?.pause();
          } else tween?.resume();
        };
        window.addEventListener('keepri:motionchange', toggle);
        cleanups.push(() => {
          drag.kill();
          gsap.killTweensOf(proxy);
          tween?.kill();
          observer.disconnect();
          marquee.removeEventListener('wheel', steer);
          window.removeEventListener('keepri:motionchange', toggle);
        });
      });
    }
  });
  const navigate = (event: MouseEvent) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    if (!anchor || event.metaKey || event.ctrlKey) return;
    const hash = anchor.getAttribute('href')!;
    const destination = document.querySelector<HTMLElement>(hash);
    if (!destination) return;
    event.preventDefault();
    const target = hash === '#site' && !entered ? travel() * 0.91 : destination;
    lenis.scrollTo(target, {
      immediate: preference.matches,
      duration: 1.2,
      offset: hash === '#site' ? 0 : -80,
      onComplete: () => {
        history.replaceState(
          null,
          '',
          hash === '#site' ? location.pathname + location.search : hash,
        );
        destination.focus({ preventScroll: true });
      },
    });
  };
  document.addEventListener('click', navigate);
  document
    .querySelectorAll<HTMLCanvasElement>('.particle-field')
    .forEach((canvas) => cleanups.push(installParticleField(canvas, dotExit)));
  let lastY = lenis.scroll,
    introEndedAt = 0;
  const header = document.querySelector<HTMLElement>('.site-header')!;
  const revealHeader = gsap.quickTo(header, 'yPercent', {
    duration: 0.25,
    ease: 'power2.out',
  });
  const focusHeader = () => revealHeader(0);
  header.addEventListener('focusin', focusHeader);
  cleanups.push(() => header.removeEventListener('focusin', focusHeader));
  const headerScroll = () => {
    const y = lenis.scroll;
    if (root.dataset.intro === 'active') {
      lastY = y;
      return;
    }
    if (!introEndedAt) introEndedAt = performance.now();
    if (
      performance.now() - introEndedAt < 1200 ||
      header.matches(':hover,:focus-within') ||
      y < 20
    )
      revealHeader(0);
    else if (Math.abs(y - lastY) > 1) revealHeader(y > lastY ? -100 : 0);
    lastY = y;
  };
  lenis.on('scroll', headerScroll);
  let layoutFrame = 0;
  const layoutObserver = new ResizeObserver(() => {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
  });
  layoutObserver.observe(document.getElementById('main')!);
  cleanups.push(() => {
    layoutObserver.disconnect();
    cancelAnimationFrame(layoutFrame);
  });
  const initialHash = restoreInitialHash ? location.hash : '';
  let interacted = false;
  let disposed = false;
  let anchorFrame = 0;
  const cancelAnchorRestore = () => {
    interacted = true;
  };
  const inputEvents = [
    'pointerdown',
    'touchstart',
    'wheel',
    'keydown',
  ] as const;
  inputEvents.forEach((name) =>
    window.addEventListener(name, cancelAnchorRestore, {
      once: true,
      passive: true,
    }),
  );
  void document.fonts.ready.then(() => {
    if (disposed) return;
    anchorFrame = requestAnimationFrame(() => {
      if (disposed) return;
      ScrollTrigger.refresh();
      lenis.resize();
      if (
        interacted ||
        !initialHash ||
        initialHash === '#top' ||
        location.hash !== initialHash
      )
        return;
      const target = document.getElementById(
        initialHash === '#experience' ? 'thesis' : initialHash.slice(1),
      );
      if (target)
        lenis.scrollTo(target, {
          immediate: true,
          offset: initialHash === '#site' ? 0 : -80,
        });
    });
  });
  cleanups.push(() => {
    disposed = true;
    cancelAnimationFrame(anchorFrame);
    inputEvents.forEach((name) =>
      window.removeEventListener(name, cancelAnchorRestore),
    );
  });
  return () => {
    cleanups.forEach((cleanup) => cleanup());
    context.revert();
    gsap.ticker.remove(tick);
    lenis.destroy();
    document.removeEventListener('click', navigate);
    delete opening.dataset.enhanced;
    delete root.dataset.intro;
  };
}
