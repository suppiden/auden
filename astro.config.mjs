import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import auth from 'auth-astro';

export default defineConfig({
  site: 'https://audensonic.com',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    // Auth.js — injects /api/auth/* routes (Google login for /admin).
    auth(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Hybrid: every page is prerendered (static) by default. Only the future
  // /admin app and /api routes will opt into server rendering via
  // `export const prerender = false`. The public site stays 100% static.
  output: 'hybrid',
  adapter: vercel(),
});
