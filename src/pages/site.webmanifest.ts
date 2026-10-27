export const prerender = true;
import type { APIRoute } from 'astro';
import { withBase } from '../lib/paths.ts';
const manifest = {
  "name": "Texture Dublin — bespoke wood works and branding",
  "short_name": "Texture Dublin",
  "description": "Fitted wardrobes, bespoke kitchens, built-in units, furniture assembly and shop signage across Dublin.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#f3eee6",
  "theme_color": "#15120f",
  "lang": "en-IE",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
};
export const GET: APIRoute = () => new Response(JSON.stringify({ ...manifest, id: withBase('/'), start_url: withBase('/'), scope: withBase('/'), icons: manifest.icons.map(icon => ({ ...icon, src: withBase(icon.src) })) }), { headers: { 'Content-Type': 'application/manifest+json' } });
