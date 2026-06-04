import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// We use a RELATIVE base ('./') so the built site works no matter what
// subpath GitHub Pages serves it from (e.g. https://user.github.io/<repo>/).
// Combined with HashRouter this means zero configuration for deployment —
// no need to hardcode the repository name. See README for details.
//
// You may override the base by setting the BASE_PATH env var at build time,
// e.g. `BASE_PATH=/my-repo/ npm run build`.
export default defineConfig({
  base: process.env.BASE_PATH ?? './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
