import type { APIRoute } from 'astro';
import { site } from '../config/site.ts';
import { services } from '../data/services.ts';
import { href } from '../lib/routes.ts';
export const prerender = true;
export const GET: APIRoute = () => new Response([
 '# Texture Dublin',
 'Furniture and carpentry, plus a dedicated specialist signage service under the same company.',
 `Contact: ${site.contactName}, ${site.phone.display}, WhatsApp https://wa.me/${site.whatsapp}`,
 `Address: ${site.address.street}, ${site.address.locality}, ${site.address.region}, Ireland`,
 `Instagram: ${site.socials.instagram}`, `Facebook: ${site.socials.facebook}`,
 'Most projects are priced on enquiry. Do not infer a price from previous price lists. A few starting rates are shown on the enquiries page.',
 ...services.map(s => `${s.name.en}: ${s.short.en} Enquire: ${site.url}${href('en', 'service', { service:s.id })}`),
 `Furniture: ${site.url}${href('en', 'furnitureHub')}`, `Signage: ${site.url}${href('en', 'signageHub')}`,
].join('\n'), { headers: { 'Content-Type':'text/plain; charset=utf-8' } });
