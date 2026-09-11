import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import Lenis from 'lenis';
import { installParticleField } from './particle-field';

export const INTRO_STORAGE_KEY = 'keepri:opening-seen:v2';
export const MOTION = {
  introHeightVh: 480,
  headlineIntervalMs: 2800,
  headlineFadeMs: 800,
  headlineTravelMs: 900,
  heroMarqueePxPerSecond: 50,
  sectionMarqueePxPerSecond: 24,
};

export function installOpeningMotion(restoreInitialHash = true) {
  gsap.registerPlugin(Draggable, InertiaPlugin);
  const root = document.documentElement;
  const opening = document.querySelector<HTMLElement>('.opening')!;
  const stage = document.querySelector<HTMLElement>('.opening-stage')!;
  const hero = document.querySelector<HTMLElement>('.hero-layer')!;
  const keeper = document.querySelector<HTMLElement>('.reason-keeper')!;
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
  let locked = false;
  if (location.hash && location.hash !== '#top') entered = true;
  root.dataset.intro = entered ? 'seen' : 'active';
  hero.inert = !entered;
  const context = gsap.context(() => {
    if (!entered) {
      opening.dataset.enhanced = 'true';
      const bricks = gsap.utils.toArray<HTMLElement>(
        '.reason-brick:not(.reason-keeper)',
      );
      gsap.set(bricks, { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' });
      gsap.set('.color-blooms > i', { opacity: 0, scale: 0.8 });
      gsap.set(hero, { opacity: 0 });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: opening,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.dataset.intro = self.progress > 0.72 ? 'done' : 'active';
            hero.inert = self.progress <= 0.72;
            if (self.progress > 0.72) {
              try {
                sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
              } catch {
                /* Storage is optional. */
              }
            }
            if (self.progress > 0.9) locked = true;
            opening.dataset.clickable = String(
              self.progress > 0.185 && self.progress < 0.235,
            );
          },
        },
      });
      timeline
        .to('.scroll-cue', { opacity: 0, duration: 0.03 }, 0)
        .to(
          bricks,
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            ease: 'back.out(1.4)',
            stagger: { amount: 0.06, from: 'random' },
          },
          0.02,
        )
        .to(keeper, { backgroundColor: '#d5b473', duration: 0.06 }, 0.03)
        .to(
          bricks,
          {
            x: (_, el) =>
              Number(el.dataset.dx) * 0.7 * Math.hypot(innerWidth, innerHeight),
            y: (_, el) =>
              Number(el.dataset.dy) * 0.7 * Math.hypot(innerWidth, innerHeight),
            opacity: 0,
            scale: 0.85,
            duration: 0.1,
            ease: 'power2.in',
            stagger: { amount: 0.12, from: 'random' },
          },
          0.24,
        )
        .to(
          '.color-blooms > i',
          { opacity: 1, scale: 1.05, duration: 0.12 },
          0.4,
        )
        .to(stage, { backgroundColor: '#3c4435', duration: 0.12 }, 0.42)
        .to(
          keeper,
          {
            backgroundColor: 'rgba(213,180,115,0)',
            color: '#f6f3e9',
            duration: 0.1,
          },
          0.42,
        )
        .to('.color-blooms > i', { opacity: 0, duration: 0.1 }, 0.54)
        .to(stage, { backgroundColor: '#242820', duration: 0.1 }, 0.54)
        .to(
          keeper,
          { y: () => -0.03 * innerHeight, duration: 0.12, ease: 'power2.out' },
          0.46,
        )
        .fromTo(
          '.opening-subline',
          { y: () => 0.15 * innerHeight },
          {
            y: () => 0.05 * innerHeight,
            opacity: 1,
            duration: 0.14,
            ease: 'power2.out',
          },
          0.46,
        )
        .to('.opening-layer', { opacity: 0, duration: 0.06 }, 0.66)
        .to(hero, { opacity: 1, duration: 0.08 }, 0.74)
        .set(hero, { backgroundColor: '#242820' }, 0.74)
        .to(hero, { backgroundColor: '#3c4435', duration: 0.06 }, 0.8)
        .set(hero, { backgroundColor: '#3c4435' }, 0.865)
        .to({}, { duration: 0.2 });
      gsap.fromTo(
        '.chevrons i',
        { y: -4, opacity: 0.25 },
        {
          y: 5,
          opacity: 1,
          duration: 0.85,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.16,
        },
      );
      ScrollTrigger.create({
        trigger: opening,
        start: () => `top+=${0.96 * travel()} top`,
        end: () => `top+=${travel() + 0.45 * innerHeight} top`,
        onUpdate: (self) => {
          dotExit.value = self.progress;
        },
      });
      const clampIntro = () => {
        if (locked && lenis.scroll < 0.9 * travel() - 1)
          lenis.scrollTo(0.9 * travel(), { immediate: true, force: true });
      };
      lenis.on('scroll', clampIntro);
      const pop = (event: MouseEvent) => {
        const target = (event.target as HTMLElement).closest<HTMLElement>(
          '.reason-brick:not(.reason-keeper)',
        );
        if (
          !target ||
          opening.dataset.clickable !== 'true' ||
          target.dataset.popped
        )
          return;
        target.dataset.popped = 'true';
        gsap
          .timeline()
          .to(target, { scale: 1.28, duration: 0.09, ease: 'power2.out' })
          .to(target, {
            scale: 0,
            opacity: 0,
            rotation: 20,
            duration: 0.2,
            ease: 'back.in(2)',
          });
      };
      opening.addEventListener('click', pop);
      cleanups.push(() => opening.removeEventListener('click', pop));
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
    if (hash === '#research')
      window.dispatchEvent(new Event('keepri:industry'));
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
      const target = document.getElementById(initialHash.slice(1));
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
