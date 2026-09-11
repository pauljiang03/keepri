import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IntroGestureGate } from './intro-gesture';
import { morphSignal, fieldParallax } from './field-motion';
import { signalPath } from './signal-shape';

export function installIntroduction() {
  const intro = document.querySelector<HTMLElement>('.introduction');
  const site = document.getElementById('site');
  if (!intro || !site) return () => {};
  gsap.registerPlugin(ScrollToPlugin);
  const scenes = Array.from(
    intro.querySelectorAll<HTMLElement>('.intro-scene'),
  );
  const links = Array.from(
    intro.querySelectorAll<HTMLElement>('[data-scene-link]'),
  );
  const words = Array.from(
    intro.querySelectorAll<HTMLElement>('.intro-word-inner'),
  );
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const gate = new IntroGestureGate();
  const field = intro.querySelector<HTMLElement>('.intro-field');
  let fieldTransition: gsap.core.Timeline | undefined;
  let exitArt: gsap.core.Tween | undefined;
  const pointerMedia = gsap.matchMedia();
  let current = 0;
  let busy = false;
  let completed = false;
  let touchY: number | null = null;
  let touchX = 0;
  let transition: gsap.core.Timeline | undefined;
  let exit: gsap.core.Tween | undefined;
  let frame = 0;
  const siteTop = () => site.getBoundingClientRect().top + window.scrollY;
  const inside = () => !completed && window.scrollY < siteTop() - 1;

  function activate(index: number) {
    current = index;
    scenes.forEach((scene, i) => {
      scene.dataset.active = String(i === index);
      scene.inert = i !== index;
      scene.setAttribute('aria-hidden', String(i !== index));
    });
    links.forEach((link) => {
      if (link.dataset.sceneLink === scenes[index].id)
        link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    intro!.style.setProperty(
      '--intro-progress',
      String((index + 1) / scenes.length),
    );
  }

  function finish() {
    if (completed) return;
    const offset = Math.max(0, window.scrollY - siteTop());
    completed = true;
    busy = false;
    transition?.kill();
    exit?.kill();
    fieldTransition?.kill();
    exitArt?.kill();
    pointerMedia.kill();
    // Removing the entrance from layout makes the main site the top of the page.
    intro!.hidden = true;
    intro!.inert = true;
    window.scrollTo({ top: offset, behavior: 'instant' });
    site!.focus({ preventScroll: true });
    ScrollTrigger.refresh();
  }

  function enterMain() {
    if (completed) return;
    transition?.kill();
    exit?.kill();
    exitArt?.kill();
    busy = true;
    if (preference.matches) {
      window.scrollTo({ top: siteTop(), behavior: 'instant' });
      finish();
      return;
    }
    fieldTransition?.kill();
    if (field)
      exitArt = gsap.to(field.querySelector('svg'), {
        scale: 1.6,
        rotation: 12,
        opacity: 0,
        duration: 0.95,
        ease: 'power2.inOut',
      });
    exit = gsap.to(window, {
      scrollTo: { y: site!, autoKill: false },
      duration: 1,
      ease: 'power2.inOut',
      onComplete: finish,
    });
  }

  function show(index: number, focus = false) {
    if (completed || index < 0 || index >= scenes.length) return;
    transition?.kill();
    exit?.kill();
    exitArt?.kill();
    if (field) gsap.set(field.querySelector('svg'), { opacity: 1 });
    window.scrollTo({ top: 0, behavior: 'instant' });
    const direction = index >= current ? 1 : -1;
    const outgoing = scenes[current].querySelectorAll('.intro-word-inner');
    const incoming = scenes[index].querySelectorAll('.intro-word-inner');
    const change = () => {
      activate(index);
      if (focus) scenes[index].focus({ preventScroll: true });
    };
    if (preference.matches) {
      gsap.set(words, { clearProps: 'transform,opacity' });
      if (field)
        gsap.set(field.querySelectorAll('.signal-thread'), {
          attr: { d: (i: number) => signalPath(i, index) },
        });
      change();
      busy = false;
      return;
    }
    fieldTransition?.kill();
    if (field) fieldTransition = morphSignal(field, index);
    busy = true;
    transition = gsap.timeline({
      onComplete: () => {
        busy = false;
      },
    });
    if (index !== current) {
      transition.to(outgoing, {
        yPercent: -105 * direction,
        rotationX: -18 * direction,
        opacity: 0,
        duration: 0.34,
        stagger: 0.022,
        ease: 'power2.inOut',
      });
    }
    transition.call(change).fromTo(
      incoming,
      { yPercent: 105 * direction, rotationX: 24 * direction, opacity: 0 },
      {
        yPercent: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.78,
        stagger: 0.04,
        ease: 'power3.out',
        immediateRender: false,
      },
    );
  }

  function advance(direction: number) {
    if (busy || completed) return;
    if (current + direction === scenes.length) enterMain();
    else show(Math.max(0, current + direction));
  }

  function wheel(event: WheelEvent) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
    )
      return;
    const tail = gate.continuingWheel(event.timeStamp);
    if (!inside() && !tail) return;
    event.preventDefault();
    const unit =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? window.innerHeight
          : 1;
    const step = gate.wheel(
      event.deltaY * unit,
      event.timeStamp,
      busy || completed,
    );
    if (step && !completed) advance(step);
  }

  function touchStart(event: TouchEvent) {
    touchY =
      inside() && event.touches.length === 1 ? event.touches[0].clientY : null;
    touchX = event.touches[0]?.clientX ?? 0;
    gate.startTouch();
  }

  function touchMove(event: TouchEvent) {
    if (touchY === null || event.touches.length !== 1) return;
    const distance = touchY - event.touches[0].clientY;
    if (Math.abs(distance) < Math.abs(touchX - event.touches[0].clientX))
      return;
    if (event.cancelable) event.preventDefault();
    const step = gate.touch(distance, busy || completed);
    if (step && !completed) advance(step);
  }

  function touchEnd() {
    touchY = null;
  }

  function key(event: KeyboardEvent) {
    if (!inside() || event.ctrlKey || event.metaKey || event.altKey) return;
    if (
      (event.target as Element)?.closest(
        'input, textarea, select, button, summary, [contenteditable="true"]',
      )
    )
      return;
    const direction =
      ['ArrowDown', 'PageDown'].includes(event.key) ||
      (event.key === ' ' && !event.shiftKey)
        ? 1
        : ['ArrowUp', 'PageUp'].includes(event.key) ||
            (event.key === ' ' && event.shiftKey)
          ? -1
          : 0;
    if (!direction) return;
    event.preventDefault();
    if (!event.repeat) advance(direction);
  }

  function click(event: MouseEvent) {
    if (
      completed ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const anchor = (event.target as Element)?.closest<HTMLAnchorElement>('a');
    if (!anchor || !intro!.contains(anchor)) return;
    const hash = anchor.getAttribute('href');
    const index = scenes.findIndex((scene) => `#${scene.id}` === hash);
    if (index >= 0 || hash === '#top') {
      event.preventDefault();
      show(Math.max(0, index), true);
    } else if (hash === '#site') {
      event.preventDefault();
      enterMain();
    }
  }

  function scroll() {
    if (!completed && !exit?.isActive() && window.scrollY >= siteTop() - 1)
      finish();
  }

  function reducedMotionChanged() {
    if (!preference.matches) return;
    transition?.kill();
    fieldTransition?.kill();
    exitArt?.kill();
    gsap.set(words, { clearProps: 'transform,opacity' });
    if (field) {
      gsap.set(field.querySelectorAll('.signal-thread'), {
        attr: { d: (i: number) => signalPath(i, current) },
      });
      gsap.set(field.querySelector('svg'), { clearProps: 'transform,opacity' });
    }
    busy = false;
    if (exit?.isActive()) {
      exit.kill();
      window.scrollTo({ top: siteTop(), behavior: 'instant' });
      finish();
    }
  }

  intro.dataset.enhanced = 'true';
  const initial = scenes.findIndex(
    (scene) => `#${scene.id}` === window.location.hash,
  );
  activate(Math.max(0, initial));
  const destination = window.location.hash
    ? document.getElementById(window.location.hash.slice(1))
    : null;
  if (destination && site.contains(destination)) {
    intro.hidden = true;
    intro.inert = true;
    completed = true;
    frame = requestAnimationFrame(() =>
      destination.scrollIntoView({ behavior: 'instant' }),
    );
  } else if (window.scrollY < siteTop()) {
    show(current);
  } else {
    finish();
  }
  pointerMedia.add(
    '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)',
    () => {
      if (field && !completed) return fieldParallax(intro, field, 30);
    },
  );
  window.addEventListener('wheel', wheel, { passive: false });
  window.addEventListener('touchstart', touchStart, { passive: true });
  window.addEventListener('touchmove', touchMove, { passive: false });
  window.addEventListener('touchend', touchEnd);
  window.addEventListener('touchcancel', touchEnd);
  window.addEventListener('keydown', key);
  window.addEventListener('click', click);
  window.addEventListener('scroll', scroll, { passive: true });
  preference.addEventListener('change', reducedMotionChanged);

  return () => {
    cancelAnimationFrame(frame);
    pointerMedia.kill();
    fieldTransition?.kill();
    exitArt?.kill();
    if (field)
      gsap.set(field.querySelector('svg'), { clearProps: 'transform,opacity' });
    transition?.kill();
    exit?.kill();
    window.removeEventListener('wheel', wheel);
    window.removeEventListener('touchstart', touchStart);
    window.removeEventListener('touchmove', touchMove);
    window.removeEventListener('touchend', touchEnd);
    window.removeEventListener('touchcancel', touchEnd);
    window.removeEventListener('keydown', key);
    window.removeEventListener('click', click);
    window.removeEventListener('scroll', scroll);
    preference.removeEventListener('change', reducedMotionChanged);
    delete intro.dataset.enhanced;
    intro.hidden = false;
    intro.inert = false;
    intro.style.removeProperty('--intro-progress');
    scenes.forEach((scene) => {
      delete scene.dataset.active;
      scene.inert = false;
      scene.removeAttribute('aria-hidden');
    });
    links.forEach((link) => link.removeAttribute('aria-current'));
    gsap.set(words, { clearProps: 'transform,opacity' });
  };
}
