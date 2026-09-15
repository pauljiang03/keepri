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
    const originalText = await evaluate(
      "[...document.querySelectorAll('.book-page')].map(page=>page.textContent)",
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
    await shot(name + '-intro-word-exit');
    await waitFor("document.documentElement.dataset.intro==='done'");
    await settled('site');
    if (width > 700) {
      const centered = await evaluate(
        "(()=>{const p=document.querySelector('.home-overview').getBoundingClientRect();const t=document.querySelector('.home-message').getBoundingClientRect();return Math.abs((p.top+p.bottom-t.top-t.bottom)/2)})()",
      );
      assert(
        centered < 1,
        'Headline block is vertically centered beside the diagram',
      );
    }
    const ids = await evaluate(
      "[...document.querySelectorAll('.book-page')].map(e=>e.id)",
    );
    assert.deepEqual(ids, ['site', 'thesis', 'research'], 'Exactly three chapters in order');
    const layouts = [];
    for (let index = 0; index < ids.length; index++) {
      await settled(ids[index]);
      const layout = await evaluate(`(()=>{
        const page=document.querySelector('.book-page:not([hidden])');const box=page.getBoundingClientRect();
        const walker=document.createTreeWalker(page,NodeFilter.SHOW_TEXT);let node;const outside=[];
        while(node=walker.nextNode()) {if(!node.textContent.trim()||node.parentElement.closest('.process-track'))continue;const range=document.createRange();range.selectNodeContents(node);for(const r of range.getClientRects()){if(r.width&&r.height&&(r.top<box.top-1||r.bottom>box.bottom+1||r.left<box.left-1||r.right>box.right+1))outside.push({text:node.textContent.trim(),top:r.top,bottom:r.bottom,left:r.left,right:r.right});}}
        return {id:page.id,height:page.clientHeight,scrollHeight:page.scrollHeight,outside,scrollables:[...page.querySelectorAll('*')].filter(e=>/auto|scroll/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight).length};
      })()`);
      assert.deepEqual(
        layout.outside,
        [],
        name + ' ' + ids[index] + ' text must fit: ' + JSON.stringify(layout),
      );
      assert.equal(layout.scrollables, 0);
      assert(layout.scrollHeight <= layout.height + 1, name + ids[index] + ' cannot scroll');
      assert.equal(await evaluate('scrollY'), 0);
      assert.equal(
        await evaluate(
          "document.querySelector('.book-page:not([hidden])').textContent",
        ),
        originalText[index],
        'Word animation preserves original prose and whitespace',
      );
      assert.equal(
        await evaluate(
          "getComputedStyle(document.querySelector('.book-page:not([hidden])')).backgroundColor",
        ),
        'rgb(38, 49, 38)',
        'Every page uses the same green',
      );
      const cue = await evaluate(
        `(()=>{const c=document.querySelector('.page-swipe-cue').getBoundingClientRect();const p=document.querySelector('.book-page:not([hidden])').getBoundingClientRect();return {top:c.top,bottom:c.bottom,pageBottom:p.bottom,height:c.height};})()`,
      );
      assert(
        cue.height >= 28 && cue.bottom <= height && cue.top >= cue.pageBottom,
        'Swipe cue fits below the content',
      );
      layouts.push(layout);
      const tabCount=await evaluate(`document.querySelector('#${ids[index]}').querySelectorAll('[role="tab"]').length`);
      for(let tabIndex=0;tabIndex<tabCount;tabIndex++){
        await evaluate(`document.querySelector('#${ids[index]}').querySelectorAll('[role="tab"]')[${tabIndex}].click()`);
        await waitFor(`document.querySelector('#${ids[index]}').querySelectorAll('[role="tab"]')[${tabIndex}].getAttribute('aria-selected')==='true'`);
        const bounds=await evaluate(`(()=>{const page=document.querySelector('#${ids[index]}'),box=page.getBoundingClientRect(),panel=page.querySelector('[role="tabpanel"]:not([hidden])'),body=panel.querySelector('.panel-body').getBoundingClientRect();return {height:page.clientHeight,scroll:page.scrollHeight,bodyTop:body.top,bodyBottom:body.bottom,top:box.top,bottom:box.bottom}})()`);
        assert(bounds.scroll<=bounds.height+1&&bounds.bodyTop>=bounds.top-1&&bounds.bodyBottom<=bounds.bottom+1,'Every selected topic fits its page');
      }
      await evaluate(`document.querySelector('#${ids[index]}').querySelector('[role="tab"]').click()`);

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
          await delay(230);
          await shot(name + '-word-exit');
          const transition = await evaluate(
            `(()=>{const page=document.querySelector('[data-turning]');const word=page.querySelector('.transition-word');return {clip:page.style.clipPath,wordTransform:getComputedStyle(word).transform,wordOpacity:+getComputedStyle(word).opacity,fold:getComputedStyle(page,'::after').content};})()`,
          );
          assert.equal(transition.clip, '');
          assert.notEqual(transition.wordTransform, 'none');
          assert(transition.wordOpacity < 1);
          assert.equal(transition.fold, 'none');
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
      assert.equal(
        await evaluate(
          "document.querySelector('.book-page:not([hidden])').textContent",
        ),
        originalText[index],
        'Revisited pages preserve every space',
      );
      assert.equal(
        await evaluate("document.querySelectorAll('.transition-word').length"),
        0,
        'Temporary word wrappers are removed at rest',
      );
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
  await call('Emulation.setDeviceMetricsOverride',{width:375,height:812,deviceScaleFactor:1,mobile:false});
  await evaluate(`new Promise(async resolve=>{for(const deltaY of [90,70,55,40,30,22,16,12,8,3,10,2,-2,9,1,8]){window.dispatchEvent(new WheelEvent('wheel',{deltaY,cancelable:true}));await new Promise(r=>setTimeout(r,120));}resolve(true)})`);
  await settled('thesis');await key('ArrowLeft');await settled('site');
  const duration=await evaluate(`new Promise(resolve=>{const start=performance.now();document.querySelector('.page-swipe-cue').click();const timer=setInterval(()=>document.querySelector('.page-swipe-cue').click(),60);function check(){if(document.documentElement.dataset.bookTurning){requestAnimationFrame(check);return;}clearInterval(timer);resolve(performance.now()-start);}requestAnimationFrame(check);})`);
  assert(duration>=450&&duration<850);await settled('thesis');await delay(550);assert.equal(await active(),'thesis');
  await evaluate("document.querySelector('.page-swipe-cue').click()");await settled('research');
  const footer=await evaluate("(()=>{const f=document.querySelector('#contact').getBoundingClientRect(),p=document.querySelector('#research').getBoundingClientRect();return {top:f.top,bottom:f.bottom,pageTop:p.top,pageBottom:p.bottom}})()");
  assert(footer.top>=footer.pageTop&&footer.bottom<=footer.pageBottom+1,'Industry footer fits the viewport');
  await evaluate("document.querySelector('.page-swipe-cue').click()");await settled('thesis');
  await call('Emulation.setTouchEmulationEnabled',{enabled:true});
  await call('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:185,y:350}]});
  for(let i=1;i<=5;i++){await call('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:185,y:350+i*4}]});await delay(20);}
  await call('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await settled('site');
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await key('ArrowRight');assert.equal(await active(),'thesis');
  assert.equal(await evaluate('document.documentElement.dataset.bookTurning'),undefined);
  await call('Emulation.setEmulatedMedia',{features:[]});
  await key('ArrowRight');await delay(150);
  await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
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
  console.log('Three fixed interactive chapters passed.');
  await call('Browser.close');
} finally {
  ws?.close();
  chrome.kill('SIGTERM');
  server.close();
  setTimeout(() => chrome.kill('SIGKILL'), 1000).unref();
}
