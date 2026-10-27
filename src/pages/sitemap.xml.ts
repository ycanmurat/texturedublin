import type { APIRoute } from 'astro';
import { site } from '../config/site.ts';
import { allRoutes, alternates, href } from '../lib/routes.ts';
import { guideSlugs } from '../lib/guides.ts';
import { products } from '../lib/server/store.ts';
import { productHref } from '../lib/shop.ts';
export const prerender=false;
const escape=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export const GET:APIRoute=async()=>{
 const entries=allRoutes(await guideSlugs()).map(r=>({alt:alternates(r),updated:undefined as string|undefined}));
 entries.push({alt:{en:href('en','shop'),ga:href('ga','shop')},updated:undefined});
 for(const p of products())entries.push({alt:{en:productHref('en',p.slug),ga:productHref('ga',p.slug)},updated:p.updated.slice(0,10)});
 const urls=entries.flatMap(({alt,updated})=>[alt.en,alt.ga].map(path=>`<url><loc>${escape(site.url+path)}</loc>${updated?`<lastmod>${updated}</lastmod>`:''}${[['en-IE',alt.en],['ga-IE',alt.ga],['x-default',alt.en]].map(([lang,url])=>`<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(site.url+url)}"/>`).join('')}</url>`));
 return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('\n')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-cache, no-transform'}});
};
