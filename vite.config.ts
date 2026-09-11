import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// Static export for GitHub Pages; no application server or runtime bindings.
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [vinext()],
  server: { host: '127.0.0.1', watch: { useFsEvents: false, usePolling: true } },
});
