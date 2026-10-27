import type { APIRoute } from 'astro';
import { abs } from '../lib/schema.ts';
export const prerender=true;
export const GET:APIRoute=()=>new Response([
 '# Texture Dublin public pages', 'User-agent: *','Allow: /',
 '',`Sitemap: ${abs('/sitemap.xml')}`,'',
].join('\n'),{headers:{'Content-Type':'text/plain; charset=utf-8'}});
