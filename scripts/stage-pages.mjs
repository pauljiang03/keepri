import { cpSync, rmSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const source = resolve('dist/client');
const destination = resolve('docs');
if (!existsSync(`${source}/index.html`)) throw new Error('Build the website before staging Pages.');
// This repository's docs/ is generated public output, not authored documentation.
rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });
console.log('Staged the validated site in docs/. Commit and push to publish.');
