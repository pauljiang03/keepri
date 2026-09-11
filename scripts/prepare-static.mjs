import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve('dist/client');
const prefix = (process.env.PAGES_BASE_PATH || '').replace(/^\/+|\/+$/g, '');
if (prefix) {
  if (!/^[a-zA-Z0-9_-]+$/.test(prefix)) throw new Error('Expected a single repository path segment.');
  // Vinext emits prefixed bundle directories. Pages already mounts the artifact
  // at the repository path, so its _next directory must be at the artifact root.
  const nestedAssets = join(root, prefix, '_next');
  if (existsSync(nestedAssets)) {
    cpSync(nestedAssets, join(root, '_next'), { recursive: true });
    rmSync(join(root, prefix), { recursive: true });
  }
}
if (!existsSync(join(root, 'index.html'))) throw new Error('Static export did not generate the homepage.');
writeFileSync(join(root, '.nojekyll'), '');
console.log('Prepared static website for', prefix ? `/${prefix}/` : '/');
