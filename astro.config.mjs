// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/current-season': '/meet-the-team',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});