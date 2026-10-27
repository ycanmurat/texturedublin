/**
 * XML sitemap with hreflang alternates (en-IE / ga-IE / x-default) for every
 * page, generated from the same route table as the pages themselves.
 */
import type { APIRoute } from 'astro';
import { site } from '../config/site.ts';
import { allRoutes, alternates, type RouteEntry } from '../lib/routes.ts';
import { guideSlugs } from '../lib/guides.ts';

const priority = (r: RouteEntry) =>
  r.key === 'home' ? '1.0'
    : ['services', 'areas', 'pricing'].includes(r.key) ? '0.9'
      : r.key === 'service' || r.key === 'area' ? '0.8'
        : r.key === 'areaService' || r.key === 'guide' ? '0.7'
          : ['privacy', 'cookies', 'terms', 'accessibility', 'sitemap'].includes(r.key) ? '0.2'
            : '0.6';

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const routes = allRoutes(await guideSlugs());
  const urls: string[] = [];
  for (const r of routes) {
    const alt = alternates(r);
    for (const loc of [alt.en, alt.ga]) {
      urls.push(
        `<url><loc>${site.url}${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority(r)}</priority>` +
          `<xhtml:link rel="alternate" hreflang="en-IE" href="${site.url}${alt.en}"/>` +
          `<xhtml:link rel="alternate" hreflang="ga-IE" href="${site.url}${alt.ga}"/>` +
          `<xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${alt.en}"/></url>`,
      );
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
