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
      '.opening-content',
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
        plays: 0,
        play() {
          this.plays++;
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
    reveal: timelines[1],
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

const press = (env, key = ' ', repeat = false) =>
  env.window.emit('keydown', { key, repeat, preventDefault() {} });
const click = (env) => env.elements['.scroll-cue'].emit('click');
for (const hash of ['', '#site', '#research', '#thesis']) {
  test(`one input plays the full entry and reload resets it (${hash || 'homepage'})`, () => {
    for (let reload = 0; reload < 2; reload++) {
      const env = setup({ hash });
      assert.equal(env.timeline.paused, true);
      assert(env.blocked.every((e) => e.inert));
      click(env);
      assert.equal(env.timeline.paused, false);
      env.timeline.complete();
      assert.equal(env.root.dataset.intro, 'done');
      assert.equal(env.elements['.intro-overlay'].hidden, true);
      assert(env.blocked.every((e) => !e.inert));
      assert.equal(env.lenis.stopped, false);
      env.cleanup();
    }
  });
}
test('rapid clicks, wheel bursts and held keys cannot restart or skip the entry', () => {
  const env = setup();
  click(env);
  for (let i = 0; i < 80; i++) {
    click(env);
    press(env);
    press(env, ' ', true);
    env.window.emit('wheel', { deltaY: 90, preventDefault() {} });
    env.elapse(40);
  }
  assert.equal(env.timeline.plays, 1);
  assert.equal(env.timeline.position, 0);
  assert.equal(env.root.dataset.intro, 'active');
  env.timeline.complete();
  click(env);
  assert.equal(env.timeline.plays, 1);
  env.cleanup();
});
test('name is revealed and given reading time before the upward handoff', () => {
  const env = setup();
  const name = env.timeline.steps.find((s) => s.target === '.opening-wordmark');
  const peel = env.timeline.steps.find((s) => s.values.onUpdate);
  assert(name.at >= 0.5);
  assert(peel.at - name.at - name.values.duration >= 0.3);
  assert(peel.at + peel.values.duration <= 2.5);
  name.values.onStart();
  assert.equal(env.elements['.intro-overlay'].dataset.step, 'name');
  peel.values.onStart();
  assert.equal(env.elements['.intro-overlay'].dataset.step, 'entering');
  env.cleanup();
});
test('all meaningful intro text uses opacity only', () => {
  const env = setup();
  for (const step of env.timeline.steps.filter((s) =>
    /opening-thesis|opening-wordmark/.test(s.target),
  )) {
    assert(
      Object.keys(step.values).every((k) =>
        ['opacity', 'duration', 'ease', 'onStart'].includes(k),
      ),
    );
  }
  env.cleanup();
});
test('peeling counter-translates content and leaves text stationary', () => {
  const env = setup();
  const step = env.timeline.steps.find((s) => s.values.onUpdate);
  for (const p of [0, 0.25, 0.5, 0.75, 1]) {
    step.target.progress = p;
    step.values.onUpdate();
    assert.equal(
      env.elements['.opening-layer'].style.transform,
      `translate3d(0, ${-900 * p}px, 0)`,
    );
    assert.equal(
      env.elements['.opening-content'].style.transform,
      `translate3d(0, ${900 * p}px, 0)`,
    );
  }
  env.cleanup();
});
test('single upward touch starts the full entry and ignores a second touch', () => {
  const env = setup(),
    overlay = env.elements['.intro-overlay'];
  for (let i = 0; i < 2; i++) {
    overlay.emit('touchstart', { touches: [{ clientY: 400, clientX: 100 }] });
    overlay.emit('touchmove', {
      touches: [{ clientY: 250, clientX: 105 }],
      preventDefault() {},
    });
  }
  assert.equal(env.timeline.plays, 1);
  env.cleanup();
});
test('pinch zoom and sideways swipes do not trigger entry', () => {
  const env = setup(),
    overlay = env.elements['.intro-overlay'];
  overlay.emit('touchstart', {
    touches: [
      { clientY: 400, clientX: 100 },
      { clientY: 300, clientX: 200 },
    ],
  });
  overlay.emit('touchmove', {
    touches: [
      { clientY: 200, clientX: 100 },
      { clientY: 100, clientX: 200 },
    ],
    preventDefault() {},
  });
  overlay.emit('touchstart', { touches: [{ clientY: 400, clientX: 100 }] });
  overlay.emit('touchmove', {
    touches: [{ clientY: 350, clientX: 250 }],
    preventDefault() {},
  });
  env.window.emit('wheel', {
    deltaY: 90,
    ctrlKey: true,
    preventDefault() {
      throw Error('Zoom blocked');
    },
  });
  assert.equal(env.timeline.plays, 0);
  env.cleanup();
});
test('small wheel deltas accumulate into one start', () => {
  const env = setup();
  for (let i = 0; i < 6; i++) {
    env.window.emit('wheel', { deltaY: 2, preventDefault() {} });
    env.elapse(20);
  }
  assert.equal(env.timeline.plays, 1);
  env.cleanup();
});
test('reduced motion enters immediately after one input', () => {
  const env = setup({ reduced: true });
  assert.equal(env.root.dataset.intro, 'active');
  click(env);
  assert.equal(env.root.dataset.intro, 'done');
  assert.equal(env.timeline.plays, 0);
  env.cleanup();
});
test('runtime reduced-motion change only exits an already-started intro', () => {
  for (const started of [false, true]) {
    const env = setup();
    if (started) click(env);
    env.preference.matches = true;
    env.preference.emit('change');
    assert.equal(env.root.dataset.intro, started ? 'done' : 'active');
    env.cleanup();
  }
});
test('visibility pauses and resumes the same sequence without advancing it', () => {
  const env = setup();
  click(env);
  env.document.hidden = true;
  env.document.emit('visibilitychange');
  assert(env.timeline.paused);
  env.document.hidden = false;
  env.document.emit('visibilitychange');
  assert(!env.timeline.paused);
  assert.equal(env.timeline.plays, 1);
  assert.equal(env.root.dataset.intro, 'active');
  env.cleanup();
});
test('Escape skips from idle or running and restores focus', () => {
  for (const started of [false, true]) {
    const env = setup();
    if (started) click(env);
    press(env, 'Escape');
    assert.equal(env.root.dataset.intro, 'done');
    assert(env.elements['.hero-layer'].focused);
    env.cleanup();
  }
});
test('hash changes and upward scrolling cannot skip or replay the intro', () => {
  const env = setup();
  env.window.emit('hashchange');
  assert.equal(env.root.dataset.intro, 'active');
  click(env);
  env.window.emit('hashchange');
  assert.equal(env.root.dataset.intro, 'active');
  env.timeline.complete();
  press(env, 'Home');
  env.window.emit('wheel', { deltaY: -90, preventDefault() {} });
  assert.equal(env.root.dataset.intro, 'done');
  assert.equal(env.timeline.plays, 1);
  env.cleanup();
});
test('cleanup removes listeners and releases scrolling', () => {
  const env = setup();
  env.cleanup();
  assert.equal(
    env.window.listenerCount() +
      env.document.listenerCount() +
      env.preference.listenerCount() +
      env.elements['.intro-overlay'].listenerCount() +
      env.elements['.scroll-cue'].listenerCount(),
    0,
  );
  assert.equal(env.lenis.destroyed, true);
  assert.equal(env.history.scrollRestoration, 'auto');
});
