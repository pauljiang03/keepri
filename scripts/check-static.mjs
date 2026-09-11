import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist/client');
const base = (process.env.PAGES_BASE_PATH || '').replace(/\/$/, '');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
let checks = 0;
function verifyLocal(ref, from) {
  if (/^(?:https?:|mailto:|data:)/.test(ref)) return;
  if (ref.startsWith('#')) {
    assert(!ref.slice(1) || ids.has(ref.slice(1)), `Missing anchor ${ref}`);
    checks++;
    return;
  }
  let target;
  if (ref.startsWith('/')) {
    assert(
      !base || ref.startsWith(`${base}/`),
      `Missing repository prefix: ${ref}`,
    );
    target = join(
      root,
      decodeURIComponent(ref.slice(base.length).split(/[?#]/)[0]),
    );
  } else {
    target = resolve(dirname(from), ref.split(/[?#]/)[0]);
  }
  assert(target.startsWith(root), `Asset escaped public output: ${ref}`);
  assert(existsSync(target), `Missing asset ${ref} (${target})`);
  checks++;
}
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g))
  verifyLocal(match[1], join(root, 'index.html'));
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.css')) {
      for (const match of readFileSync(file, 'utf8').matchAll(
        /url\(["']?([^"')]+)["']?\)/g,
      ))
        verifyLocal(match[1], file);
    }
  }
}
walk(root);
for (const expected of [
  'Keep reasoning',
  'Human learning histories',
  'Closed beta',
  'The player experience',
  'Start with a question.',
  'Learn from every attempt.',
  'Find your own way through.',
  'Skip intro',
]) {
  assert(html.includes(expected), `Missing primary content: ${expected}`);
}
assert(!html.includes('Building your site'), 'Starter content remains');
assert(
  !/signal-field|signal-thread|intro-frame/.test(html),
  'Unrelated graphics remain',
);
assert(
  (html.match(/aria-pressed="(?:true|false)"/g) || []).length === 4 &&
    (html.match(/aria-pressed="true"/g) || []).length === 1,
  'Learning controls need four stages and one selection',
);
assert(
  !/About your visit|Website privacy|website-privacy/.test(html),
  'Removed visitor disclosure remains',
);
assert(
  html.includes('Learning through play') &&
    html.includes('Explore the learning process'),
  'Learning illustration or its controls are missing',
);
for (const id of ['intro-1', 'intro-2', 'intro-3', 'site', 'main']) {
  assert(ids.has(id), `Missing introduction destination: ${id}`);
}
assert(
  html.indexOf('id="intro-3"') < html.indexOf('id="site"'),
  'Introduction must precede main site',
);
assert(
  !/(?:crossing|lockout|founder|university|mailto:)/i.test(html),
  'Game-specific or personal content remains',
);
assert(
  !existsSync(join(root, 'assets/keepri-brand/crossing.png')),
  'Retired game asset remains',
);
assert(
  !existsSync(join(root, 'assets/keepri-brand/lockout.png')),
  'Retired game asset remains',
);
assert(
  (html.match(/name="research-deliverables"/g) || []).length === 3,
  'Research disclosures are incomplete',
);
assert(
  !/testflight|join the beta|join our beta|October 5|November 1/i.test(html),
  'Public beta installation or release-detail copy remains',
);
assert(
  html.includes('research enrollment is not active'),
  'Research status disclosure is missing',
);
console.log(
  `Static validation passed: ${checks} assets and anchors; all primary content present.`,
);
