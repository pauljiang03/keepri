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
  const active = () => evaluate('document.documentElement.dataset.page');
  const settled = async (id) =>
    waitFor(
      "!document.documentElement.dataset.bookTurning && document.documentElement.dataset.page==='" +
        id +
        "'",
    );
  const key = async (key) =>
    evaluate(
      `window.dispatchEvent(new KeyboardEvent('keydown',{key:${JSON.stringify(key)},bubbles:true,cancelable:true}))`,
    );
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
      await evaluate("document.querySelectorAll('.opening-line span').length"),
      60,
    );
    assert.equal(
      await evaluate(
        "+getComputedStyle(document.querySelector('.opening-thesis')).opacity",
      ),
      1,
    );
    assert.equal(
      await evaluate("document.querySelector('.book-navigation')"),
      null,
    );
    await shot(name + '-cover');
    await click();
    await click();
    await delay(200);
    assert.equal(await stage(), 'gathering');
    await shot(name + '-gathering');
    await delay(1180);
    assert.equal(await stage(), 'meaning');
    await shot(name + '-meaning');
    await delay(500);
    await shot(name + '-cover-flip');
    await waitFor("document.documentElement.dataset.intro==='done'");
    await settled('site');
    if (width > 700) {
      const centered = await evaluate(
        "(()=>{const p=document.querySelector('#site').getBoundingClientRect();const t=document.querySelector('.home-message').getBoundingClientRect();return Math.abs((p.top+p.bottom-t.top-t.bottom)/2)})()",
      );
      assert(
        centered < 1,
        'Headline block is vertically centered beside the diagram',
      );
    }
    const ids = await evaluate(
      "[...document.querySelectorAll('.book-page')].map(e=>e.id)",
    );
    const layouts = [];
    for (let index = 0; index < ids.length; index++) {
      await settled(ids[index]);
      const layout = await evaluate(`(()=>{
        const page=document.querySelector('.book-page:not([hidden])');const box=page.getBoundingClientRect();
        const walker=document.createTreeWalker(page,NodeFilter.SHOW_TEXT);let node;const outside=[];
        while(node=walker.nextNode()) {if(!node.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(node);for(const r of range.getClientRects()){if(r.width&&r.height&&(r.top<box.top-1||r.bottom>box.bottom+1||r.left<box.left-1||r.right>box.right+1))outside.push({text:node.textContent.trim(),top:r.top,bottom:r.bottom,left:r.left,right:r.right});}}
        return {id:page.id,height:page.clientHeight,scrollHeight:page.scrollHeight,outside,scrollables:[...page.querySelectorAll('*')].filter(e=>/auto|scroll/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight).length};
      })()`);
      assert.deepEqual(
        layout.outside,
        [],
        name + ' ' + ids[index] + ' text must fit: ' + JSON.stringify(layout),
      );
      assert.equal(layout.scrollables, 0);
      assert(
        layout.scrollHeight <= layout.height + 1,
        name + ' ' + ids[index] + ' must not overflow',
      );
      assert.equal(await evaluate('scrollY'), 0);
      layouts.push(layout);
      if (
        index === 0 ||
        ids[index] === 'thesis' ||
        ids[index] === 'research' ||
        name === 'small' ||
        name === 'landscape'
      )
        await shot(name + '-' + ids[index]);
      if (index < ids.length - 1) {
        await key('ArrowRight');
        if (index === 0) {
          await key('ArrowRight');
          await delay(230);
          await shot(name + '-page-flip');
          const flip = await evaluate(
            `(()=>{const page=document.querySelector('[data-turning]');const fold=getComputedStyle(page,'::after');return {clip:page.style.clipPath,curl:parseFloat(page.style.getPropertyValue('--fold-width')),transform:getComputedStyle(page.querySelector('.page-inner')).transform,fold:fold.opacity};})()`,
          );
          assert(flip.clip.startsWith('polygon('));
          assert(flip.curl > 0);
          assert.equal(flip.transform, 'none');
          assert.equal(flip.fold, '1');

          assert.equal(
            await evaluate('document.documentElement.dataset.bookTurning'),
            'true',
          );
        }
      }
    }
    await key('ArrowRight');
    assert.equal(await active(), ids.at(-1));
    for (let index = ids.length - 2; index >= 0; index--) {
      await key('ArrowLeft');
      await settled(ids[index]);
    }
    await key('ArrowLeft');
    assert.equal(await active(), 'site');
    assert.equal(await stage(), 'done');
    await evaluate(
      'document.querySelector(\'.navigation a[href="#research"]\').click()',
    );
    await settled('research');
    await evaluate('history.back()');
    await settled('site');
    await evaluate('history.forward()');
    await settled('research');
    await call('Page.reload');
    await ready();
    assert.equal(await stage(), 'idle');
    await click();
    await waitFor("document.documentElement.dataset.intro==='done'");
    await settled('research');
    await evaluate("document.querySelector('.brand').click()");
    await settled('site');
    results.push({
      name,
      viewport: [width, height],
      pages: layouts.length,
      noOverflow: true,
      forwardAndBack: true,
    });
    console.log(JSON.stringify(results.at(-1)));
  }
  await evaluate(
    `new Promise(resolve=>{let n=0;const timer=setInterval(()=>{window.dispatchEvent(new WheelEvent('wheel',{deltaY:90,cancelable:true}));if(++n===40){clearInterval(timer);resolve(true)}},30)})`,
  );
  await settled('funding');
  await delay(350);
  await evaluate(
    "window.dispatchEvent(new WheelEvent('wheel',{deltaY:-90,cancelable:true}))",
  );
  await settled('site');
  await call('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await call('Emulation.setTouchEmulationEnabled', { enabled: true });
  const swipe = async (y1, y2) => {
    await call('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: 185, y: y1 }],
    });
    for (let i = 1; i <= 5; i++) {
      await call('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: 185, y: y1 + ((y2 - y1) * i) / 5 }],
      });
      await delay(20);
    }
    await call('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
  };
  await swipe(600, 300);
  await settled('funding');
  await swipe(300, 600);
  await settled('site');
  await call('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await key('ArrowDown');
  assert.equal(await active(), 'funding');
  assert.equal(
    await evaluate('document.documentElement.dataset.bookTurning'),
    undefined,
  );
  await call('Emulation.setEmulatedMedia', { features: [] });
  await key('ArrowDown');
  await delay(150);
  await call('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await waitFor('!document.documentElement.dataset.bookTurning');
  await call('Emulation.setScriptExecutionDisabled', { value: true });
  await call('Page.navigate', { url: base + '?nojs=1' });
  await delay(600);
  assert.equal(
    await evaluate('document.documentElement.dataset.book'),
    undefined,
  );
  assert.equal(
    await evaluate("document.querySelectorAll('.book-page[hidden]').length"),
    0,
  );
  assert.deepEqual(errors, [], 'No runtime errors');
  await writeFile(
    `${folder}/results.json`,
    JSON.stringify(
      {
        results,
        wheelMomentum: true,
        touchBothDirections: true,
        reducedMotion: true,
        noJS: true,
        errors,
      },
      null,
      2,
    ),
  );
  console.log('Full-viewport page checks passed.');
  await call('Browser.close');
} finally {
  ws?.close();
  chrome.kill('SIGTERM');
  server.close();
  setTimeout(() => chrome.kill('SIGKILL'), 1000).unref();
}
