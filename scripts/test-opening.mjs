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

function press(env, repeat = false) {
  env.window.emit('keydown', { key: ' ', repeat, preventDefault() {} });
}
function completeIntro(env) {
  press(env);
  env.cover.complete();
  press(env);
  env.reveal.complete();
  press(env);
  env.timeline.complete();
}
for (const hash of ['', '#site', '#research', '#thesis']) {
  test(`three input stages reset on every load (${hash || 'homepage'})`, () => {
    for (let reload = 0; reload < 2; reload++) {
      const env = setup({ hash });
      assert(env.cover.paused && env.reveal.paused && env.timeline.paused);
      assert(env.blocked.every((e) => e.inert));
      press(env);
      assert.equal(env.cover.paused, false);
      assert.equal(env.reveal.paused, true);
      env.cover.complete();
      assert.equal(
        env.elements['.intro-cue-label'].textContent,
        'Swipe to reveal',
      );
      assert.equal(env.reveal.paused, true);
      press(env);
      assert.equal(env.reveal.paused, false);
      assert.equal(env.timeline.paused, true);
      env.reveal.complete();
      assert.equal(
        env.elements['.intro-cue-label'].textContent,
        'Peel to enter',
      );
      assert.equal(env.root.dataset.intro, 'active');
      press(env);
      assert.equal(env.timeline.paused, false);
      env.timeline.complete();
      assert.equal(env.root.dataset.intro, 'done');
      assert(env.blocked.every((e) => !e.inert));
      if (hash && hash !== '#site')
        assert.equal(env.lenis.scroll, env.elements[hash]);
      env.cleanup();
    }
  });
}

test('upward scrolling and Home cannot return to the completed intro', () => {
  const env = setup();
  completeIntro(env);
  const preventDefault = () => assert.fail('Completed intro intercepted input');
  env.window.emit('wheel', { deltaY: -500, preventDefault });
  env.window.emit('keydown', { key: 'Home', preventDefault });
  assert.equal(env.elements['.intro-overlay'].hidden, true);
  env.cleanup();
});

test('Escape exits during either animation and restores focus', () => {
  for (const reveal of [false, true]) {
    const env = setup();
    press(env);
    if (reveal) {
      env.cover.complete();
      press(env);
    }
    env.window.emit('keydown', { key: 'Escape', preventDefault() {} });
    assert.equal(env.root.dataset.intro, 'done');
    assert.equal(env.elements['.hero-layer'].focused, true);
    assert(env.cover.paused && env.reveal.paused && env.timeline.paused);
    env.cleanup();
  }
});

test('reduced motion preserves three separate gestures', () => {
  const env = setup({ reduced: true });
  press(env);
  assert.equal(env.elements['.intro-overlay'].dataset.step, 'spun');
  assert.equal(env.reveal.position, 0);
  press(env);
  assert.equal(env.elements['.intro-overlay'].dataset.step, 'ready');
  assert.equal(env.root.dataset.intro, 'active');
  press(env);
  assert.equal(env.root.dataset.intro, 'done');
  env.preference.matches = false;
  env.preference.emit('change');
  assert.equal(env.root.dataset.intro, 'done');
  env.cleanup();
});

test('motion preference changes finish only the running stage', () => {
  for (const revealing of [false, true]) {
    const env = setup();
    press(env);
    if (revealing) {
      env.cover.complete();
      press(env);
    }
    env.preference.matches = true;
    env.preference.emit('change');
    assert.equal(
      env.elements['.intro-overlay'].dataset.step,
      revealing ? 'ready' : 'spun',
    );
    assert.equal(env.timeline.paused, true);
    assert.equal(env.root.dataset.intro, 'active');
    env.cleanup();
  }
});

test('visibility changes never advance a waiting stage', () => {
  const env = setup();
  for (const stage of ['idle', 'spun', 'ready']) {
    if (stage === 'spun') {
      press(env);
      env.cover.complete();
    }
    if (stage === 'ready') {
      press(env);
      env.reveal.complete();
    }
    env.document.hidden = true;
    env.document.emit('visibilitychange');
    env.document.hidden = false;
    env.document.emit('visibilitychange');
    assert(env.cover.paused && env.reveal.paused && env.timeline.paused);
    assert.equal(env.elements['.intro-overlay'].dataset.step, stage);
  }
  env.cleanup();
});

test('visibility pauses and resumes the active text reveal only', () => {
  const env = setup();
  press(env);
  env.cover.complete();
  press(env);
  env.document.hidden = true;
  env.document.emit('visibilitychange');
  assert.equal(env.reveal.paused, true);
  env.document.hidden = false;
  env.document.emit('visibilitychange');
  assert.equal(env.reveal.paused, false);
  assert.equal(env.timeline.paused, true);
  env.cleanup();
});

test('continuous trackpad momentum cannot cross either gesture boundary', () => {
  const env = setup();
  const wheel = () =>
    env.window.emit('wheel', { deltaY: 90, preventDefault() {} });
  wheel();
  for (const [animation, next] of [
    [env.cover, env.reveal],
    [env.reveal, env.timeline],
  ]) {
    for (let i = 0; i < 80; i++) {
      env.elapse(40);
      wheel();
    }
    animation.complete();
    for (let i = 0; i < 20; i++) {
      env.elapse(40);
      wheel();
    }
    assert.equal(next.paused, true);
    env.elapse(300);
    wheel();
    assert.equal(next.paused, false);
  }
  env.cleanup();
});

test('touch needs a fresh swipe for each stage', () => {
  const env = setup();
  const overlay = env.elements['.intro-overlay'];
  const move = () =>
    overlay.emit('touchmove', {
      touches: [{ clientY: 200 }],
      preventDefault() {},
    });
  const swipe = () => {
    overlay.emit('touchstart', { touches: [{ clientY: 400 }] });
    move();
  };
  swipe();
  env.cover.complete();
  move();
  assert.equal(env.reveal.paused, true);
  swipe();
  env.reveal.complete();
  move();
  assert.equal(env.timeline.paused, true);
  swipe();
  assert.equal(env.timeline.paused, false);
  env.cleanup();
});

test('held keys cannot skip the reveal or peel step', () => {
  const env = setup();
  press(env);
  env.cover.complete();
  press(env, true);
  assert.equal(env.reveal.paused, true);
  press(env);
  env.reveal.complete();
  press(env, true);
  assert.equal(env.timeline.paused, true);
  press(env);
  assert.equal(env.timeline.paused, false);
  env.cleanup();
});

test('cue clicks advance three stages and ignore input during animation', () => {
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
  click();
  click();
  assert.equal(env.reveal.paused, true);
  env.cover.complete();
  click();
  click();
  assert.equal(env.timeline.paused, true);
  env.reveal.complete();
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
  assert.equal(env.reveal.paused, true);
  env.cleanup();
});

test('text appears only in the reveal timeline and never transforms', () => {
  const env = setup();
  assert(
    !env.cover.steps.some(
      ({ target }) =>
        typeof target === 'string' && /opening-spelling/.test(target),
    ),
  );
  const steps = env.reveal.steps.filter(
    ({ target }) =>
      typeof target === 'string' &&
      /opening-wordmark|opening-spelling/.test(target),
  );
  assert(steps.length > 0);
  for (const { values } of steps) {
    for (const property of Object.keys(values)) {
      assert(
        ['opacity', 'duration', 'stagger', 'ease'].includes(property),
        `Text must not animate ${property}`,
      );
    }
  }
  const words = steps.find(({ target }) => target === '.opening-spelling-word');
  assert(words.values.duration >= 1, 'Words should reveal slowly');
  env.cleanup();
});

test('teardown removes all intro input listeners', () => {
  const env = setup();
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

test('peeling reveals the bottom first with a level crease across every viewport', () => {
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
    [844, 390],
    [320, 900],
  ]) {
    assert.equal(peelGeometry(width, height, 0).edge, height);
    assert.equal(peelGeometry(width, height, 1).edge, 0);
    for (const progress of [0.1, 0.5, 0.9]) {
      const shape = peelGeometry(width, height, progress);
      const paper = clipPaper(
        [
          { x: 0, y: 0 },
          { x: width, y: 0 },
          { x: width, y: height },
          { x: 0, y: height },
        ],
        shape.edge,
      );
      assert(paper.some((p) => p.x === 0 && p.y === 0));
      assert(paper.some((p) => p.x === width && p.y === 0));
      assert(paper.some((p) => p.x === 0 && p.y === shape.edge));
      assert(paper.some((p) => p.x === width && p.y === shape.edge));
      assert(paper.every((p) => p.y <= shape.edge));
      assert(shape.edge - shape.curl >= 0);
    }
  }
});
