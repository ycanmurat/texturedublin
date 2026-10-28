import type { APIRoute } from 'astro';
import { site } from '../config/site.ts';
import { services, signage, woodworks } from '../data/services.ts';
import { href } from '../lib/routes.ts';
export const prerender = true;

// Markdown in the llms.txt layout (llmstxt.org): title, summary, details, then link lists.
const url = (path: string) => `${site.url}${path}`;
const item = (s: (typeof services)[number]) => `- [${s.name.en}](${url(href('en', 'service', { service: s.id }))}): ${s.short.en}`;

export const GET: APIRoute = () => new Response([
 '# Texture Dublin',
 '',
 '> Bespoke carpentry, made-to-measure furniture and specialist signage from a workshop in Dunboyne, Co. Meath, serving Dublin, Meath, Kildare and north Wicklow. Most projects are priced on enquiry with a free survey and a written quotation.',
 '',
 `- Contact: ${site.contactName}, ${site.phone.display}, WhatsApp https://wa.me/${site.whatsapp}${site.email ? `, email ${site.email}` : ''}`,
 `- Address: ${site.address.street}, ${site.address.locality}, ${site.address.region}, Ireland`,
 '- Hours: Monday–Friday 08:00–18:00, Saturday 09:00–14:00',
 '- Pricing: do not infer prices from old price lists; a few small-job starting rates are on the enquiries page.',
 `- Social: ${[site.socials.instagram, site.socials.facebook].filter(Boolean).join(', ')}`,
 '',
 '## Furniture & carpentry',
 '',
 ...woodworks.map(item),
 '',
 '## Signage & branding',
 '',
 ...signage.map(item),
 '',
 '## Key pages',
 '',
 `- [Furniture & carpentry](${url(href('en', 'furnitureHub'))}): overview of the furniture and joinery service`,
 `- [Signage](${url(href('en', 'signageHub'))}): overview of the specialist signage service`,
 `- [Areas we cover](${url(href('en', 'areas'))}): local pages for Dublin, Meath, Kildare and Wicklow`,
 `- [Enquiries](${url(href('en', 'pricing'))}): how quotations work and small-job starting rates`,
 `- [Contact](${url(href('en', 'contact'))}): WhatsApp, phone, email and opening hours`,
 '',
 '## Optional',
 '',
 `- [Project guides](${url(href('en', 'guides'))}): advice on wardrobes, kitchens, alcove units and shop signs`,
 `- [Irish-language site](${url(href('ga', 'home'))}): the same content in Irish`,
 `- [XML sitemap](${url('/sitemap.xml')}): every public page`,
 '',
].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
