import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://carta-abierta.netlify.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
