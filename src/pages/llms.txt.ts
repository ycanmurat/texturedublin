/**
 * /llms.txt — a plain-text summary for AI assistants and answer engines
 * (ChatGPT search, Perplexity, Google AI Overviews...). Same data as the site.
 */
import type { APIRoute } from 'astro';
import { site } from '../config/site.ts';
import { services } from '../data/services.ts';
import { areas } from '../data/areas.ts';
import { zones } from '../data/zones.ts';
import { euro, priceFrom, priceTo } from '../lib/pricing.ts';
import { href } from '../lib/routes.ts';
import { ui } from '../i18n/ui.ts';

export const GET: APIRoute = () => {
  const L: string[] = [];
  L.push(`# ${site.name}`, '');
  L.push('> Bespoke wood works and branding in Dublin, Ireland: fitted wardrobes, bespoke kitchens, built-in units, made-to-measure cabinets, flat-pack furniture assembly, furniture & kitchen installation, carpentry, interior design & complete works, commercial fit-out, shop signs, illuminated & LED signs, wooden signs, office signage, window graphics and branding / logo design.', '');
  L.push(`- Website: ${site.url}${href('en', 'home')} (English) and ${site.url}${href('ga', 'home')} (Irish / Gaeilge)`);
  L.push(`- Contact: WhatsApp https://wa.me/${site.whatsapp} · phone ${site.phone.e164} · ${site.email}`);
  L.push('- Service area: Dublin City and County, plus Wicklow, Kildare and Meath commuter towns.');
  L.push(`- Prices: guide prices in euro, reviewed ${site.pricesReviewed}. Residential prices include VAT; commercial/signage prices exclude VAT. Fixed written quote after a free survey.`, '');
  L.push('## Pricing zones', '');
  for (const z of Object.values(zones)) L.push(`- Zone ${z.id} — ${z.name.en}: minimum visit ${euro(z.minVisit)}; project travel allowance ${Math.round((z.multiplier - 1) * 100)}%. ${z.description.en}`);
  L.push('', '## Services and guide prices', '');
  for (const s of services) {
    L.push(`### ${s.name.en}`, `${s.short.en} (${s.vat === 'inc' ? 'incl. VAT' : 'ex VAT'})`, `Page: ${site.url}${href('en', 'service', { service: s.id })}`);
    for (const it of s.items) {
      const to = priceTo(it);
      L.push(`- ${it.name.en}: from ${euro(priceFrom(it))}${to && to > it.from ? ` (typical up to ${euro(to)})` : ''} ${ui.en.units[it.unit]}`.trimEnd());
    }
    L.push('');
  }
  L.push('## Areas served (local price pages)', '');
  for (const a of areas) L.push(`- ${a.name.en} (${a.postal}, zone ${a.zone}): ${site.url}${href('en', 'area', { area: a.id })}`);
  L.push('', '## Key pages', '');
  L.push(`- Pricing: ${site.url}${href('en', 'pricing')}`, `- Get a quote: ${site.url}${href('en', 'quote')}`, `- Standards & certifications: ${site.url}${href('en', 'standards')}`, `- Guides: ${site.url}${href('en', 'guides')}`, '');
  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
