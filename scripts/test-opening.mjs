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
  const elements = Object.fromEntries(
    [
      '.intro-overlay',
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
  let lenis;
  const gsap = {
    ticker: { add() {}, remove() {} },
    utils: { toArray: () => [] },
    set() {},
    context(callback) {
      callback();
      return { revert() {} };
    },
    timeline(options) {
      timeline = {
        position: 0,
        speed: 1,
        paused: false,
        complete: options.onComplete,
        to() {
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
    elements,
    blocked,
    window,
    document,
    preference,
    history,
    timeline,
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

test('scroll accelerates the peel; Escape dismisses it and restores focus', () => {
  const env = setup();
  let prevented = 0;
  const preventDefault = () => {
    prevented++;
  };
  env.window.emit('wheel', { deltaY: 120, preventDefault });
  assert.equal(env.timeline.position, 2.15);
  assert.equal(env.timeline.speed, 1.7);
  env.window.emit('keydown', { key: 'Escape', preventDefault });
  assert.equal(prevented, 2);
  assert.equal(env.elements['.hero-layer'].focused, true);
  assert.equal(env.root.dataset.intro, 'done');
  env.cleanup();
});

test('reduced motion retains a brief intro and preference changes never replay it', () => {
  const env = setup({ reduced: true });
  assert.equal(env.root.dataset.intro, 'active');
  env.timeline.complete();
  env.preference.matches = false;
  env.preference.emit('change');
  assert.equal(env.root.dataset.intro, 'done');
  assert.equal(env.lenis.options.smoothWheel, true);
  env.cleanup();
});

test('mid-intro preference change unlocks the page; teardown removes all listeners', () => {
  const env = setup();
  env.preference.matches = true;
  env.preference.emit('change');
  assert.equal(env.root.dataset.intro, 'done');
  assert.equal(env.lenis.stopped, false);
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
