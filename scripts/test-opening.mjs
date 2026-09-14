import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { clipPaper, peelGeometry } from '../lib/peel-geometry.ts';

const source = ts
  .transpileModule(
    readFileSync(new URL('../lib/opening-motion.ts', import.meta.url), 'utf8'),
    {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    },
  )
  .outputText.replace(/^import .*;$/gm, '')
  .replace('export function', 'function');

function surface() {
  const listeners = new Map();
  return {
    style: {},
    dataset: {},
    hidden: false,
    inert: false,
    attributes: {},
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(callback);
    },
    removeEventListener(name, callback) {
      listeners.get(name)?.delete(callback);
    },
    emit(name, event = {}) {
      for (const callback of listeners.get(name) || []) callback(event);
    },
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    contains(target) {
      return target === this;
    },
    focus() {
      this.focused = true;
    },
    listenerCount() {
      return [...listeners.values()].reduce(
        (sum, callbacks) => sum + callbacks.size,
        0,
      );
    },
  };
}
function setup({ hash = '', reduced = false } = {}) {
  const root = surface();
  let now = 0;
  const elements = Object.fromEntries(
    [
      '.intro-overlay',
      '.scroll-cue',
      '.intro-cue-label',
      '.opening-layer',
      '.peel-fold',
      '#peel-shading',
      '.peel-surface',
      '.hero-layer',
      '.site-header',
      '#main',
      '.site-footer',
      '#research',
      '#thesis',
      '#top',
    ].map((name) => [name, surface()]),
  );
  elements['#site'] = elements['.hero-layer'];
  const blocked = ['.site-header', '.hero-layer', '#main', '.site-footer'].map(
    (name) => elements[name],
  );
  const window = { ...surface(), scrollTo() {} };
  const preference = { ...surface(), matches: reduced };
  const document = {
    ...surface(),
    documentElement: root,
    hidden: false,
    activeElement: null,
    fonts: { ready: Promise.resolve() },
    querySelector: (selector) => elements[selector],
    querySelectorAll: () => blocked,
    getElementById: (id) => elements[`#${id}`],
  };
  const history = { scrollRestoration: 'auto', replaceState() {} };
  let timeline;
  const timelines = [];
  let lenis;
  const gsap = {
    ticker: { add() {}, remove() {} },
    utils: { toArray: () => [] },
    set() {},
    context(callback) {
      callback();
      return { revert() {} };
    },
    timeline(options = {}) {
      timeline = {
        position: 0,
        steps: [],
        speed: 1,
        paused: options.paused || false,
        complete: options.onComplete || (() => {}),
        play() {
          this.paused = false;
        },
        to(target, values, at) {
          this.steps.push({ target, values, at });
          return this;
        },
        from() {
          return this;
        },
        set() {
          return this;
        },
        time(value) {
          if (value === undefined) return this.position;
          this.position = value;
          return this;
        },
        progress(value) {
          this.position = value;
          if (value === 1) this.complete();
          return this;
        },
        timeScale(value) {
          this.speed = value;
        },
        pause() {
          this.paused = true;
        },
        resume() {
          this.paused = false;
        },
      };
      timelines.push(timeline);
      return timeline;
    },
  };
  class Lenis {
    constructor(options) {
      this.options = options;
      this.scroll = 0;
      lenis = this;
    }
    stop() {
      this.stopped = true;
    }
    start() {
      this.stopped = false;
    }
    raf() {}
    on() {}
    resize() {}
    destroy() {
      this.destroyed = true;
    }
    scrollTo(destination, options) {
      this.scroll = destination;
      options.onComplete?.();
    }
  }
  const install = runInNewContext(`${source}; installOpeningMotion`, {
    document,
    window,
    history,
    location: { hash, pathname: '/', search: '' },
    innerWidth: 1440,
    innerHeight: 900,
    matchMedia: () => preference,
    performance: { now: () => now },
    gsap,
    Lenis,
    peelGeometry,
    ScrollTrigger: { refresh() {}, update() {} },
    ResizeObserver: class {
      observe() {}
      disconnect() {}
    },
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
  });
  const cleanup = install();
  return {
    root,
    elapse: (ms) => {
      now += ms;
    },
    elements,
    blocked,
    window,
    document,
    preference,
    history,
    timeline,
    cover: timelines[0],
    lenis,
    cleanup,
  };
}

test('paper coverage decreases continuously on desktop, mobile and landscape', () => {
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
    [844, 390],
    [320, 900],
  ]) {
    const rectangle = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: width, y: height },
      { x: 0, y: height },
    ];
    const area = (points) =>
      Math.abs(
        points.reduce((sum, p, i) => {
          const next = points[(i + 1) % points.length];
          return sum + p.x * next.y - next.x * p.y;
        }, 0),
      ) / 2;
    let previous = width * height;
    for (let i = 0; i <= 100; i++) {
      const shape = peelGeometry(width, height, i / 100);
      const current = area(clipPaper(rectangle, shape.edge));
      assert(current <= previous + 0.001);
      assert(!/NaN|Infinity/.test(shape.clip + shape.fold));
      assert(shape.curl >= 0);
      assert(
        shape.clip.split(',').length >= 3,
        'CSS polygons need at least three vertices',
      );
      previous = current;
    }
    assert.equal(previous, 0);
  }
});

for (const hash of ['', '#site', '#research', '#thesis']) {
  test(`load and reload always start the cover (${hash || 'homepage'})`, () => {
    for (let reload = 0; reload < 2; reload++) {
      const env = setup({ hash });
      assert.equal(env.root.dataset.intro, 'active');
      assert.equal(env.lenis.stopped, true);
      assert(env.blocked.every((element) => element.inert));
      assert.equal(env.cover.paused, true);
      env.window.emit('wheel', { deltaY: 100, preventDefault() {} });
      assert.equal(env.cover.paused, false);
      assert.equal(env.timeline.paused, true);
      env.cover.complete();
      env.elapse(300);
      assert.equal(
        env.root.dataset.intro,
        'active',
        'The cover must wait for visitor input',
      );
      assert.equal(env.timeline.paused, true);
      env.window.emit('wheel', { deltaY: 100, preventDefault() {} });
      env.timeline.complete();
      assert.equal(env.elements['.intro-overlay'].hidden, true);
      assert.equal(env.root.dataset.intro, 'done');
      assert.equal(env.lenis.stopped, false);
      assert(env.blocked.every((element) => !element.inert));
      if (hash && hash !== '#site')
        assert.equal(env.lenis.scroll, env.elements[hash]);
      env.cleanup();
    }
  });
}

test('upward scrolling and Home cannot return to a completed introduction', () => {
  const env = setup();
  env.timeline.complete();
  const preventDefault = () =>
    assert.fail('Completed intro must not intercept page input');
  env.window.emit('wheel', { deltaY: -500, preventDefault });
  env.window.emit('keydown', { key: 'Home', preventDefault });
  assert.equal(env.root.dataset.intro, 'done');
  assert.equal(env.elements['.intro-overlay'].hidden, true);
  env.cleanup();
});

test('first scroll starts the spin; Escape dismisses it and restores focus', () => {
  const env = setup();
  let prevented = 0;
  const preventDefault = () => {
    prevented++;
  };
  env.window.emit('wheel', { deltaY: 120, preventDefault });
  assert.equal(env.timeline.paused, true);
  assert.equal(env.cover.paused, false);
  env.window.emit('keydown', { key: 'Escape', preventDefault });
  assert.equal(prevented, 2);
  assert.equal(env.elements['.hero-layer'].focused, true);
  assert.equal(env.root.dataset.intro, 'done');
  env.cleanup();
});

test('reduced motion waits for entry and preference changes never replay it', () => {
  const env = setup({ reduced: true });
  assert.equal(env.root.dataset.intro, 'active');
  env.window.emit('keydown', { key: 'ArrowDown', preventDefault() {} });
  assert.equal(env.root.dataset.intro, 'active');
  env.window.emit('keydown', { key: 'ArrowDown', preventDefault() {} });
  env.preference.matches = false;
  env.preference.emit('change');
  assert.equal(env.root.dataset.intro, 'done');
  assert.equal(env.lenis.options.smoothWheel, true);
  env.cleanup();
});

test('preference changes do not enter the page; teardown removes all listeners', () => {
  const env = setup();
  env.preference.matches = true;
  env.preference.emit('change');
  assert.equal(env.root.dataset.intro, 'active');
  assert.equal(env.lenis.stopped, true);
  env.cleanup();
  assert.equal(
    env.window.listenerCount() +
      env.document.listenerCount() +
      env.preference.listenerCount() +
      env.elements['.intro-overlay'].listenerCount(),
    0,
  );
  assert.equal(env.lenis.destroyed, true);
  assert.equal(env.history.scrollRestoration, 'auto');
});

test('upward input and visibility changes never start the peel', () => {
  const env = setup();
  env.window.emit('wheel', {
    deltaY: -100,
    preventDefault() {
      assert.fail('Upward wheel must not enter');
    },
  });
  env.document.hidden = true;
  env.document.emit('visibilitychange');
  env.document.hidden = false;
  env.document.emit('visibilitychange');
  assert.equal(env.timeline.paused, true);
  assert.equal(env.cover.paused, true);
  assert.equal(env.root.dataset.intro, 'active');
  env.cleanup();
});

test('the spin finishes before spelling starts, and completion still waits for input', () => {
  const env = setup();
  const spins = env.cover.steps.filter(
    ({ values }) => values.rotation || values.rotationY,
  );
  const spelling = env.cover.steps.find(
    ({ target }) => target === '.opening-letter',
  );
  assert(spins.length > 0);
  assert(spelling);
  const spinEnd = Math.max(
    ...spins.map(({ at, values }) => at + values.duration),
  );
  assert(spelling.at >= spinEnd, 'Spelling must follow the completed spin');
  env.cover.complete();
  assert.equal(env.elements['.intro-overlay'].hidden, false);
  assert.equal(env.timeline.paused, true);
  env.cleanup();
});

test('reduced motion settles the spelling without entering or restarting the intro', () => {
  for (const reduced of [false, true]) {
    const env = setup({ reduced });
    if (!reduced) {
      env.preference.matches = true;
      env.preference.emit('change');
    }
    assert.equal(env.cover.position, 0);
    env.window.emit('keydown', { key: 'ArrowDown', preventDefault() {} });
    assert.equal(env.cover.position, 1);
    assert.equal(env.cover.paused, true);
    assert.equal(env.timeline.paused, true);
    assert.equal(env.root.dataset.intro, 'active');
    env.preference.matches = false;
    env.preference.emit('change');
    assert.equal(env.cover.position, 1);
    env.cleanup();
  }
});

test('one continuous trackpad gesture cannot perform both steps', () => {
  const env = setup();
  const wheel = () =>
    env.window.emit('wheel', { deltaY: 90, preventDefault() {} });
  wheel();
  assert.equal(env.elements['.intro-overlay'].dataset.step, 'spinning');
  for (let i = 0; i < 100; i++) {
    env.elapse(40);
    wheel();
  }
  env.cover.complete();
  for (let i = 0; i < 20; i++) {
    env.elapse(40);
    wheel();
  }
  assert.equal(env.timeline.paused, true);
  assert.equal(env.elements['.intro-cue-label'].textContent, 'Peel to enter');
  env.elapse(300);
  wheel();
  assert.equal(env.timeline.paused, false);
  env.cleanup();
});

test('a held touch cannot peel after starting the spin; a fresh swipe can', () => {
  const env = setup();
  const overlay = env.elements['.intro-overlay'];
  overlay.emit('touchstart', { touches: [{ clientY: 400 }] });
  overlay.emit('touchmove', {
    touches: [{ clientY: 300 }],
    preventDefault() {},
  });
  assert.equal(env.cover.paused, false);
  env.cover.complete();
  overlay.emit('touchmove', {
    touches: [{ clientY: 100 }],
    preventDefault() {},
  });
  assert.equal(env.timeline.paused, true);
  overlay.emit('touchstart', { touches: [{ clientY: 400 }] });
  overlay.emit('touchmove', {
    touches: [{ clientY: 300 }],
    preventDefault() {},
  });
  assert.equal(env.timeline.paused, false);
  env.cleanup();
});

test('held keys cannot cross both stages', () => {
  const env = setup();
  env.window.emit('keydown', { key: ' ', repeat: false, preventDefault() {} });
  env.cover.complete();
  env.window.emit('keydown', { key: ' ', repeat: true, preventDefault() {} });
  assert.equal(env.timeline.paused, true);
  env.window.emit('keydown', { key: ' ', repeat: false, preventDefault() {} });
  assert.equal(env.timeline.paused, false);
  env.cleanup();
});

test('cue clicks perform the two steps and ignore clicks during the spin', () => {
  const env = setup();
  const anchor = {
    getAttribute: () => '#site',
    classList: { contains: () => true },
  };
  const click = () =>
    env.document.emit('click', {
      button: 0,
      target: { closest: () => anchor },
      preventDefault() {},
    });
  assert.equal(env.elements['.intro-cue-label'].textContent, 'Swipe to spin');
  click();
  click();
  assert.equal(env.timeline.paused, true);
  env.cover.complete();
  click();
  assert.equal(env.timeline.paused, false);
  env.cleanup();
});

test('small trackpad deltas accumulate into one deliberate gesture', () => {
  const env = setup();
  for (let i = 0; i < 6; i++) {
    env.window.emit('wheel', { deltaY: 2, preventDefault() {} });
    env.elapse(20);
  }
  assert.equal(env.cover.paused, false);
  assert.equal(env.timeline.paused, true);
  env.cleanup();
});
