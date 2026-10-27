import type { Area, Locale, Service } from '../data/types.ts';
import { site } from '../config/site.ts';
import { fmt, ui } from '../i18n/ui.ts';
import { placeIn } from './routes.ts';

/** "Fitted Wardrobes" -> "fitted wardrobes", keeps acronyms such as LED */
export const lowerName = (s: string) => s.replace(/(\p{Lu})(?=\p{Ll})/gu, (c) => c.toLowerCase());

export const waHref = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text.replace(/Hi Texture Dublin!|A Texture Dublin!/g, 'Hi Ali Onder / Texture Dublin!'))}`;

/** pre-filled WhatsApp message for the page context */
export function waMessage(locale: Locale, ctx: { service?: Service; area?: Area } = {}) {
  const t = ui[locale].wa;
  const service = ctx.service ? lowerName(ctx.service.name[locale]) : undefined;
  const area = ctx.area ? placeIn(ctx.area, locale) : undefined;
  if (service && area) return fmt(t.serviceArea, { service, area });
  if (service) return fmt(t.service, { service });
  if (area) return fmt(t.area, { area });
  return t.general;
}

export const waLink = (locale: Locale, ctx: { service?: Service; area?: Area } = {}) => waHref(waMessage(locale, ctx));

/** data-* attributes read by the click tracker (GA4 / Google Ads / Meta) */
export const waData = (placement: string, ctx: { service?: Service; area?: Area } = {}) => ({
  'data-track': 'whatsapp',
  'data-placement': placement,
  ...(ctx.service ? { 'data-service': ctx.service.id } : {}),
  ...(ctx.area ? { 'data-area': ctx.area.id } : {}),
});
