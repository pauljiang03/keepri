import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const folder =
  process.env.BOOK_REVIEW_DIR || resolve(tmpdir(), 'keepri-book-review');
const root = fileURLToPath(new URL('../docs', import.meta.url));
const profile = `${folder}/profile-${Date.now()}`;
await mkdir(profile, { recursive: true });
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = resolve(
    root,
    decodeURIComponent(url.pathname).replace(/^\/keepri\//, '') || 'index.html',
  );
  if (!file.startsWith(root + '/')) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res.setHeader(
      'Content-Type',
      {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.woff2': 'font/woff2',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
      }[extname(file)] || 'application/octet-stream',
    );
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/keepri/`;
const chrome = spawn(
  process.env.CHROME_PATH ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profile}`,
    '--remote-debugging-port=0',
    'about:blank',
  ],
  { stdio: 'ignore' },
);
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
try {
  let port;
  for (let i = 0; i < 80; i++) {
    try {
      port = (await readFile(`${profile}/DevToolsActivePort`, 'utf8')).split(
        '\n',
      )[0];
      break;
    } catch {
      await delay(100);
    }
  }
  assert(port, 'Isolated Chrome starts');
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r, j) => {
    ws.onopen = r;
    ws.onerror = j;
  });
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id) {
      const p = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) p.reject(Error(JSON.stringify(m.error)));
      else p.resolve(m.result);
    } else if (m.method === 'Runtime.exceptionThrown') errors.push(m.params);
  };
  const call = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, { resolve, reject });
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await call('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  await call('Page.enable');
  await call('Runtime.enable');
  const waitFor = async (expression) => {
    for (let i = 0; i < 100; i++) {
      if (await evaluate(expression)) return;
      await delay(50);
    }
    throw Error('Timed out: ' + expression);
  };
  const ready = async () => {
    await waitFor(
      "document.querySelector('.scroll-cue')?.getAttribute('aria-disabled')==='false' && document.documentElement.classList.contains('lenis')",
    );
    await evaluate('document.fonts.ready.then(()=>true)');
  };
  const stage = () =>
    evaluate("document.querySelector('.intro-overlay').dataset.step");
  const shot = async (name) => {
    const r = await call('Page.captureScreenshot', { format: 'png' });
    await writeFile(`${folder}/${name}.png`, Buffer.from(r.data, 'base64'));
  };
  const click = () => evaluate("document.querySelector('.scroll-cue').click()");
  const results = [];
  for (const [name, width, height] of [
    ['desktop', 1440, 900],
    ['tablet', 768, 1024],
    ['awkward', 1010, 780],
    ['mobile', 375, 812],
    ['small', 320, 568],
    ['landscape', 844, 390],
  ].filter(
    ([name]) =>
      !process.env.BOOK_VIEW || process.env.BOOK_VIEW.split(',').includes(name),
  )) {
    await call('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await call('Page.navigate', { url: base + '?view=' + name });
    await ready();
    assert.equal(
      await evaluate(
        "+getComputedStyle(document.querySelector('.opening-wordmark')).opacity",
      ),
      1,
    );
    assert.equal(
      await evaluate(
        "+getComputedStyle(document.querySelector('.opening-thesis')).opacity",
      ),
      0,
    );
    assert.equal(
      await evaluate("document.querySelectorAll('.opening-line span').length"),
      60,
    );
    await shot(name + '-idle');
    await click();
    await click();
    await delay(1000);
    assert.equal(await stage(), 'meaning');
    const phrase = await evaluate(
      "[...document.querySelectorAll('.opening-thesis-word')].map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,height:r.height,width:r.width,text:e.textContent}})",
    );
    assert(
      phrase.every((r) => r.left >= 0 && r.right <= width),
      'Intro phrase remains within viewport',
    );
    await shot(name + '-meaning');
    assert(
      await evaluate(
        "getComputedStyle(document.body).backgroundColor===getComputedStyle(document.querySelector('.opening-layer')).backgroundColor",
      ),
      'Cover and page share the dark base',
    );
    assert.equal(
      await evaluate(
        "+getComputedStyle(document.querySelector('.site-header')).opacity",
      ),
      1,
      'Header has no delayed white fade',
    );
    await delay(650);
    await shot(name + '-intro-peel');
    await waitFor("document.documentElement.dataset.intro==='done'");
    assert.equal(
      await evaluate('document.documentElement.scrollWidth-innerWidth'),
      0,
    );
    const arrows = await evaluate(
      `(()=>{const overlap=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;const nodes=[...document.querySelectorAll('.model-game,.model-lane h4,.model-reinvestment')].map(e=>e.getBoundingClientRect());return [...document.querySelectorAll('.model-circuit svg')].filter(e=>nodes.some(n=>overlap(e.getBoundingClientRect(),n))).length})()`,
    );
    assert.equal(arrows, 0, 'No arrow overlaps any flowchart node');
    const panels = await evaluate(
      "[...document.querySelectorAll('.model-panel')].map(e=>({border:getComputedStyle(e).borderTopWidth,width:e.clientWidth,scroll:e.scrollWidth}))",
    );
    assert.equal(panels.length, 2);
    assert(
      panels.every((p) => p.border === '1px' && p.scroll <= p.width),
      'Both views have contained borders',
    );
    await shot(name + '-main');
    const layout = () =>
      evaluate(
        `(()=>{const rect=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};return {headline:rect('#hero-title'),copy:rect('.hero-content'),figure:rect('.model-flow'),controls:rect('.model-switch'),height:document.querySelector('.hero').getBoundingClientRect().height}})()`,
      );
    const before = await layout();
    if (width >= 960)
      assert(
        before.copy.right + 30 <= before.figure.x,
        'Headline and figure gutter',
      );
    else
      assert(before.copy.bottom + 30 <= before.figure.y, 'Stacked figure gap');
    assert(before.figure.right <= width, 'Figure contained');
    if (width >= 960)
      assert(
        before.figure.bottom <= height - 66,
        'Full desktop diagram fits above page controls: ' +
          JSON.stringify(before.figure),
      );
    await evaluate(
      "[...document.querySelectorAll('.model-switch button')].find(b=>b.textContent.includes('Research')).click()",
    );
    await delay(650);
    const after = await layout();
    assert(
      Math.abs(before.headline.y - after.headline.y) < 0.1,
      'Carousel must not move headline',
    );
    assert(
      Math.abs(before.height - after.height) < 0.1,
      'Carousel must not change hero height',
    );
    await shot(name + '-funding');
    assert.equal(
      await evaluate(
        'document.querySelector(\'.navigation a[href="#research"]\').textContent.trim()',
      ),
      'Industry',
    );
    assert.equal(
      await evaluate(
        "document.querySelector('.industry-label').textContent.trim()",
      ),
      'Industry',
    );
    const currentPage = () =>
      evaluate(
        "document.querySelector('.book-page:not([hidden]):not([inert])')?.dataset.page",
      );
    const settled = async (id) => {
      await waitFor(
        "!document.documentElement.dataset.bookTurning && document.querySelector('.book-page:not([hidden]):not([inert])')?.dataset.page==='" +
          id +
          "'",
      );
    };
    const bookScroll = () =>
      evaluate(
        "document.querySelector('.book-page:not([hidden]) .book-scroll').scrollTop",
      );
    assert.equal(await currentPage(), 'site');
    assert.equal(
      await evaluate("document.querySelector('.book-previous').disabled"),
      true,
    );
    await evaluate(
      "document.querySelector('[data-page=site] .book-scroll').scrollTop=160",
    );
    const remembered = await bookScroll();
    await evaluate(
      "document.querySelector('.book-next').click(); document.querySelector('.book-next').click()",
    );
    await delay(230);
    assert.equal(
      await evaluate('document.documentElement.dataset.bookTurning'),
      'true',
    );
    const peelFrame = await evaluate(
      `(()=>{const sheet=document.querySelector('.book-page[data-turning]');const matrix=new DOMMatrix(getComputedStyle(sheet).transform);const content=new DOMMatrix(getComputedStyle(sheet.querySelector('.book-scroll')).transform);return {x:matrix.m41,y:matrix.m42,scaleX:matrix.a,scaleY:matrix.d,counter:content.m42}})()`,
    );
    assert.equal(peelFrame.x, 0, 'Peel never travels sideways');
    assert(peelFrame.y < 0, 'Bottom edge travels upward');
    assert.equal(peelFrame.scaleX, 1);
    assert.equal(peelFrame.scaleY, 1);
    assert(
      Math.abs(peelFrame.y + peelFrame.counter) < 1,
      'Content remains stationary during peel',
    );
    await shot(name + '-turn-forward');
    await settled('thesis');
    assert.equal(await evaluate('location.hash'), '#thesis');
    assert.equal(await evaluate('document.activeElement.id'), 'thesis');
    assert.equal(
      await evaluate(
        "document.querySelectorAll('.book-page:not([hidden])').length",
      ),
      1,
    );
    await shot(name + '-philosophies');
    await evaluate("document.querySelector('.book-next').click()");
    await settled('research');
    assert.equal(
      await evaluate("document.querySelector('.book-next').disabled"),
      true,
    );
    await shot(name + '-industry');
    await evaluate(
      "document.querySelector('[data-page=research] .book-scroll').scrollTop=99999",
    );
    await delay(80);
    assert(
      await evaluate(
        "document.querySelector('.site-footer').getBoundingClientRect().bottom<=document.querySelector('.book-navigation').getBoundingClientRect().top+1",
      ),
      'Footer reachable above controls',
    );
    await evaluate("document.querySelector('.book-previous').click()");
    await delay(230);
    await shot(name + '-turn-back');
    await settled('thesis');
    await evaluate("document.querySelector('.book-previous').click()");
    await settled('site');
    assert.equal(
      await bookScroll(),
      remembered,
      'Each page retains its scroll position',
    );
    assert.equal(
      await evaluate("document.querySelector('.intro-overlay').hidden"),
      true,
    );
    await evaluate('history.back()');
    await settled('thesis');
    await evaluate('history.forward()');
    await settled('site');
    await evaluate(
      'document.querySelector(\'.navigation a[href="#research"]\').click()',
    );
    await settled('research');
    await call('Page.reload');
    await ready();
    assert.equal(await stage(), 'idle');
    await evaluate("document.querySelector('.intro-skip').click()");
    await settled('site');
    await evaluate(
      'document.querySelector(\'.navigation a[href="#research"]\').click()',
    );
    await settled('research');
    await call('Page.reload');
    await ready();
    await click();
    await waitFor("document.documentElement.dataset.intro==='done'");
    await settled('research');
    await evaluate("document.querySelector('.brand').click()");
    await settled('site');
    await evaluate(
      "document.querySelector('[data-page=site] .book-scroll').scrollTop=0;document.querySelector('#site').focus({preventScroll:true})",
    );
    await call('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'ArrowRight',
      code: 'ArrowRight',
    });
    await call('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'ArrowRight',
      code: 'ArrowRight',
    });
    await settled('thesis');
    await call('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'ArrowLeft',
      code: 'ArrowLeft',
    });
    await call('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'ArrowLeft',
      code: 'ArrowLeft',
    });
    await settled('site');
    assert.equal(
      await evaluate('scrollY'),
      0,
      'Window stays fixed; pages scroll internally',
    );
    await call('Page.reload');
    await ready();
    assert.equal(await stage(), 'idle');
    results.push({
      name,
      viewport: [width, height],
      layout: before,
      stableCarousel: true,
      continuousEntry: true,
      zeroOverflow: true,
    });
    console.log(JSON.stringify(results.at(-1)));
  }
  await call('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    x: 200,
    y: 180,
    deltaX: 0,
    deltaY: 90,
  });
  await delay(100);
  await call('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    x: 200,
    y: 180,
    deltaX: 0,
    deltaY: 90,
  });
  await delay(900);
  assert.equal(await stage(), 'meaning');
  await waitFor("document.documentElement.dataset.intro==='done'");
  await call('Page.reload');
  await ready();
  await call('Emulation.setTouchEmulationEnabled', { enabled: true });
  const swipe = async () => {
    await call('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: 200, y: 240 }],
    });
    await call('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: 200, y: 140 }],
    });
    await call('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
  };
  await swipe();
  await swipe();
  await delay(900);
  assert.equal(await stage(), 'meaning');
  await waitFor("document.documentElement.dataset.intro==='done'");
  await call('Emulation.setTouchEmulationEnabled', { enabled: false });
  await call('Page.reload');
  await ready();
  await call('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
  });
  await call('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
  });
  assert.equal(
    await evaluate('document.documentElement.dataset.intro'),
    'done',
  );
  await call('Page.reload');
  await ready();
  await call('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: ' ',
    code: 'Space',
  });
  await call('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: ' ',
    code: 'Space',
  });
  await waitFor("document.documentElement.dataset.intro==='done'");
  await call('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await call('Page.reload');
  await ready();
  await click();
  assert.equal(
    await evaluate('document.documentElement.dataset.intro'),
    'done',
  );
  await evaluate("document.querySelector('.book-next').click()");
  assert.equal(
    await evaluate('document.documentElement.dataset.bookTurning'),
    undefined,
  );
  assert.equal(
    await evaluate(
      "document.querySelector('.book-page:not([hidden])').dataset.page",
    ),
    'thesis',
  );
  await evaluate("document.querySelector('.book-previous').click()");
  await call('Emulation.setEmulatedMedia', { features: [] });
  await call('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await call('Emulation.setTouchEmulationEnabled', { enabled: true });
  const horizontalSwipe = async (x1, x2, y) => {
    await call('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: x1, y }],
    });
    for (let i = 1; i <= 5; i++) {
      await call('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x1 + ((x2 - x1) * i) / 5, y }],
      });
      await delay(20);
    }
    await call('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
  };
  await call('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    x: 180,
    y: 200,
    deltaX: 0,
    deltaY: 150,
  });
  await delay(250);
  assert(
    await evaluate(
      "document.querySelector('[data-page=site] .book-scroll').scrollTop>50",
    ),
    'Native wheel scrolls inside page',
  );
  await evaluate(
    "document.querySelector('[data-page=site] .book-scroll').scrollTop=0",
  );
  await horizontalSwipe(300, 80, 170);
  await waitFor(
    "!document.documentElement.dataset.bookTurning && document.querySelector('.book-page:not([hidden])').dataset.page==='thesis'",
  );
  await horizontalSwipe(300, 80, 500);
  await delay(500);
  assert.equal(
    await evaluate(
      "document.querySelector('.book-page:not([hidden])').dataset.page",
    ),
    'thesis',
    'Philosophy swipe stays in its page',
  );
  assert(
    await evaluate("document.querySelector('.philosophy-rail').scrollLeft>100"),
    'Philosophy cards retain native horizontal touch scrolling',
  );
  await horizontalSwipe(80, 300, 170);
  await waitFor(
    "!document.documentElement.dataset.bookTurning && document.querySelector('.book-page:not([hidden])').dataset.page==='site'",
  );
  await evaluate(
    "document.querySelector('[data-page=site] .book-scroll').scrollTop=380",
  );
  await horizontalSwipe(300, 80, 300);
  await delay(700);
  assert.equal(
    await evaluate(
      "document.querySelector('.book-page:not([hidden])').dataset.page",
    ),
    'site',
    'Diagram swipe does not turn book',
  );
  await evaluate("document.querySelector('.book-next').click()");
  await delay(150);
  await call('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await waitFor('!document.documentElement.dataset.bookTurning');
  assert.equal(
    await evaluate(
      "document.querySelectorAll('.book-page:not([hidden])').length",
    ),
    1,
    'Resize settles to a single page',
  );
  await call('Emulation.setScriptExecutionDisabled', { value: true });
  await call('Page.navigate', { url: base + '?nojs=1' });
  await delay(600);
  assert.equal(
    await evaluate('document.documentElement.dataset.book'),
    undefined,
  );
  assert.equal(
    await evaluate(
      "getComputedStyle(document.querySelector('.intro-overlay')).display",
    ),
    'none',
  );
  assert.equal(
    await evaluate("document.querySelectorAll('.book-page[hidden]').length"),
    0,
    'All content available without JavaScript',
  );
  assert.deepEqual(errors, [], 'No runtime exceptions');
  await writeFile(
    `${folder}/results.json`,
    JSON.stringify(
      {
        results,
        wheelAndTouch: true,
        keyboard: true,
        reducedMotion: true,
        errors,
      },
      null,
      2,
    ),
  );
  console.log('Browser checks passed.');
  await call('Browser.close');
} finally {
  ws?.close();
  chrome.kill('SIGTERM');
  server.close();
  setTimeout(() => chrome.kill('SIGKILL'), 1000).unref();
}
