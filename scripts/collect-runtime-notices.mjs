import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';

const siteRequire = createRequire(resolve('package.json'));
const visited = new Set();
const notices = [];
function collect(name, from = siteRequire, recurse = true) {
  const manifest = (from.resolve.paths(name) || [])
    .map((directory) => join(directory, name, 'package.json'))
    .find((file) => existsSync(file));
  if (!manifest) throw new Error(`Cannot locate license metadata for ${name}`);
  const pkg = JSON.parse(readFileSync(manifest, 'utf8'));
  const identity = `${pkg.name}@${pkg.version}`;
  if (visited.has(identity)) return;
  visited.add(identity);
  const directory = dirname(manifest);
  const files = readdirSync(directory).filter((file) =>
    /^(?:licen[sc]e|notice|copying)(?:[.-].*)?$/i.test(file),
  );
  if (name === 'gsap' && !files.length) {
    notices.push(
      `${identity}\n${readFileSync('public/licenses/GSAP-notice.txt', 'utf8')}`,
    );
    return;
  }
  const emblaFallback =
    !files.length &&
    [
      'embla-carousel-react',
      'embla-carousel',
      'embla-carousel-reactive-utils',
    ].includes(name) &&
    pkg.version === '8.5.2' &&
    pkg.license === 'MIT';
  if (!files.length && !emblaFallback)
    throw new Error(`No license/notice file found for ${identity}`);
  notices.push(
    `${identity}\nDeclared license: ${pkg.license}\n\n${
      emblaFallback
        ? readFileSync('public/licenses/embla-8.5.2.txt', 'utf8')
        : files
            .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
            .map(
              (file) =>
                `${file}\n${readFileSync(join(directory, file), 'utf8')}`,
            )
            .join('\n\n')
    }`,
  );
  if (recurse)
    for (const dependency of Object.keys(pkg.dependencies || {}))
      collect(dependency, createRequire(manifest));
}
for (const name of [
  'react',
  'react-dom',
  'embla-carousel-react',
  'react-server-dom-webpack',
  '@base-ui/react',
  'gsap',
  'lenis',
  'lucide-react',
  'clsx',
  'class-variance-authority',
  'tailwind-merge',
  'web-vitals',
])
  collect(name);
// Framework/generated component notices; their build-tool dependency trees are
// not distributed wholesale as client code.
for (const name of ['vinext', 'shadcn', 'tailwindcss'])
  collect(name, siteRequire, false);
writeFileSync(
  'public/licenses/runtime-notices.txt',
  `Third-party software notices for KeepRI\n\nRetained from the installed packages used by the site and their runtime dependencies. Separate font and icon notices are also retained.\n\n${notices.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join('\n\n' + '='.repeat(72) + '\n\n')}\n`,
);
console.log(
  `Retained license and notice files for ${visited.size} package versions.`,
);
