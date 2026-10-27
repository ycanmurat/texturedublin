import type { Locale, PriceItem, Unit, ZoneId } from '../data/types.ts';
import { euro, priceFrom } from './pricing.ts';

const short: Record<Locale, Partial<Record<Unit, string>>> = {
  en: { perMetre: '/m', perHour: '/hr', perDoor: '/door', perSqm: '/m²', perUnit: '/unit', perAlcove: '/alcove', perRoom: '/room', perWindow: '/window', perShelf: '/shelf', perDay: '/day' },
  ga: { perMetre: '/m', perHour: '/uair', perDoor: '/doras', perSqm: '/m²', perUnit: '/aonad', perAlcove: '/cuas', perRoom: '/seomra', perWindow: '/fuinneog', perShelf: '/seilf', perDay: '/lá' },
};

/** "€1,150/m" for titles and meta descriptions */
export const shortPrice = (l: Locale, item: PriceItem, zone?: ZoneId) => `${euro(priceFrom(item, zone))}${short[l][item.unit] ?? ''}`;

/** appends the brand when the title stays under ~65 characters */
export const withBrand = (s: string) => (s.length <= 48 ? `${s} | Texture Dublin` : s);

/** first candidate that fits 65 chars (with brand) or 68 (without) */
export function fitTitle(...candidates: string[]) {
  for (const c of candidates) if (c.length + 17 <= 65) return `${c} | Texture Dublin`;
  for (const c of candidates) if (c.length <= 62) return c;
  for (const c of candidates) if (c.length <= 68) return c;
  return candidates[candidates.length - 1].slice(0, 68);
}

/** trims a meta description to ~158 characters on a word boundary */
export function metaDesc(s: string, max = 158) {
  const clean = s.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(' ', max - 1)).replace(/[,;:—–-]\s*$/, '') + '…';
}
