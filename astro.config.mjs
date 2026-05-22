// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://humacappella.netlify.app',
  redirects: {
    '/current-season': '/meet-the-team',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});