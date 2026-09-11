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
    else if (entry.name.endsWith('.js')) {
      assert(
        !readFileSync(file, 'utf8').includes('PAGES_BASE_PATH'),
        `Unresolved client asset prefix in ${file}`,
      );
    } else if (entry.name.endsWith('.css')) {
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
  'Closed beta',
  'Think for yourself.',
  'Learn without AI.',
  'Make the effort count.',
  'funded cash-prize events',
  'separate participant consent',
  'Human learning histories',
  'Executable environments',
  'Evaluation packages',
  'Free play and future prize eligibility remain independent',
  'research enrollment is not active',
  'Skip intro',
  'For industry',
  'Pause motion',
])
  assert(
    html.toLowerCase().includes(expected.toLowerCase()),
    `Missing primary content: ${expected}`,
  );
for (const file of [
  'licenses/lucide.txt',
  'licenses/GSAP-notice.txt',
  'licenses/lenis.txt',
  'fonts/DM-Sans-OFL.txt',
])
  assert(existsSync(join(root, file)), `Missing license: ${file}`);
for (const id of ['top', 'site', 'main', 'experience', 'research', 'thesis'])
  assert(ids.has(id), `Missing destination: ${id}`);
assert(
  !/testflight|join the beta|October 5|November 1|Paul Jiang|mailto:/i.test(
    html,
  ),
  'Public release or personal details remain',
);
assert(
  !/competition-arena|reasoning-assembly|arena-award/.test(html),
  'Retired artwork remains',
);
assert(
  html.includes('<noscript>'),
  'No-JavaScript content fallback is missing',
);
assert(
  html.includes('prefers-reduced-motion'),
  'Reduced-motion first-paint handling is missing',
);
assert(
  html.includes('keepri:opening-seen:v2'),
  'Opening session behavior is missing',
);
console.log(
  `Static validation passed: ${checks} asset/anchor references and product-status constraints.`,
);
