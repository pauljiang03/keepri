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
    checks++; return;
  }
  let target;
  if (ref.startsWith('/')) {
    assert(!base || ref.startsWith(`${base}/`), `Missing repository prefix: ${ref}`);
    target = join(root, decodeURIComponent(ref.slice(base.length).split(/[?#]/)[0]));
  } else {
    target = resolve(dirname(from), ref.split(/[?#]/)[0]);
  }
  assert(target.startsWith(root), `Asset escaped public output: ${ref}`);
  assert(existsSync(target), `Missing asset ${ref} (${target})`);
  checks++;
}
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) verifyLocal(match[1], join(root, 'index.html'));
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.css')) {
      for (const match of readFileSync(file, 'utf8').matchAll(/url\(["']?([^"')]+)["']?\)/g)) verifyLocal(match[1], file);
    }
  }
}
walk(root);
for (const expected of ['Your mind.', 'Human learning histories', 'Thinking for yourself.', 'mailto:pj1433@princeton.edu', 'https://testflight.apple.com/join/AhdBBYAG']) {
  assert(html.includes(expected), `Missing primary content: ${expected}`);
}
assert(!html.includes('Building your site'), 'Starter content remains');
console.log(`Static validation passed: ${checks} assets and anchors; all primary content present.`);
