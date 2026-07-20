// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sgurgul.dev',
  redirects: {
    '/projects/high-tps-generator': '/projects/shared-liquidity-zk-rollups',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});