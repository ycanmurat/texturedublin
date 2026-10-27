// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';

// Set SITE_URL in .env (or your host's environment) to the final domain.
const SITE = process.env.SITE_URL || 'https://texturedublin.com';

export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  security: {
    allowedDomains: [
      { hostname: new URL(SITE).hostname },
      { hostname: `www.${new URL(SITE).hostname.replace(/^www\./, '')}` },
      { hostname: 'localhost' },
      { hostname: '127.0.0.1' },
    ],
  },
  build: { format: 'directory', inlineStylesheets: 'auto' },
  // keep classic whitespace handling between inline elements
  compressHTML: true,
  integrations: [mdx()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Jost',
      cssVariable: '--font-jost',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['@fontsource-variable/jost/files/jost-latin-wght-normal.woff2'], weight: '100 900', style: 'normal' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { src: ['@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2'], weight: '100 900', style: 'normal' },
          { src: ['@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2'], weight: '100 900', style: 'italic' },
        ],
      },
    },
  ],
  vite: {
    build: { assetsInlineLimit: 2048 },
  },
});
