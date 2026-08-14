import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ki-buechhaltig.ch',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
