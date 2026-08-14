import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ki-cfo.ch',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
