import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  site: 'https://www.sbabuyersagency.com',
  devToolbar: {
    enabled: false,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    server: {
      fs: {
        allow: [projectRoot],
      },
    },
    optimizeDeps: {
      exclude: ['aria-query', 'axobject-query'],
    },
  },
});
