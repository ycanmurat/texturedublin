import type { APIRoute } from 'astro';
import { serveMedia } from '../../lib/server/media.ts';
export const prerender=false;
export const GET:APIRoute=({params})=>serveMedia(`${params.name||''}.glb`);
