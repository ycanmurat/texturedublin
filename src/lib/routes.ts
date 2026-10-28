import { withBase, withoutBase } from './paths.ts';
import type { Area, L10n, Locale } from '../data/types.ts';
import { services, serviceById } from '../data/services.ts';
import { areas, areaById } from '../data/areas.ts';

export const LOCALES: Locale[] = ['en', 'ga'];

/** translated URL segments — English lives at the root, Irish under /ga/ */
export const SEG = {
  furnitureHub: { en: 'furniture-carpentry', ga: 'troscan-siuineireacht' },
  signageHub: { en: 'signage', ga: 'comharthaiocht' },
  services: { en: 'services', ga: 'seirbhisi' },
  areas: { en: 'areas', ga: 'ceantair' },
  pricing: { en: 'pricing', ga: 'praghsanna' },
  quote: { en: 'quote', ga: 'luachan' },
  projects: { en: 'work', ga: 'saothar' },
  about: { en: 'about', ga: 'fuinn' },
  contact: { en: 'contact', ga: 'teagmhail' },
  standards: { en: 'standards-certifications', ga: 'caighdeain-deimhnithe' },
  guides: { en: 'blog', ga: 'blag' },
  privacy: { en: 'privacy-policy', ga: 'polasai-priobhaideachta' },
  cookies: { en: 'cookie-policy', ga: 'polasai-fianan' },
  terms: { en: 'terms', ga: 'tearmai' },
  accessibility: { en: 'accessibility', ga: 'inrochtaineacht' },
  sitemap: { en: 'sitemap', ga: 'learscail-an-tsuimh' },
} as const satisfies Record<string, L10n>;

export type StaticKey = keyof typeof SEG;
export type RouteKey = 'home' | StaticKey | 'service' | 'area' | 'areaService' | 'guide';
export interface RouteParams {
  service?: string;
  area?: string;
  guide?: L10n;
}
export interface RouteEntry extends RouteParams {
  key: RouteKey;
}

function routePath(locale: Locale, key: RouteKey, p: RouteParams = {}): string {
  const pre = locale === 'en' ? '' : '/ga';
  switch (key) {
    case 'home':
      return `${pre}/`;
    case 'service':
      return `${pre}/${SEG.services[locale]}/${serviceById[p.service!].slug[locale]}/`;
    case 'area':
      return `${pre}/${SEG.areas[locale]}/${areaById[p.area!].slug[locale]}/`;
    case 'areaService':
      return `${pre}/${SEG.areas[locale]}/${areaById[p.area!].slug[locale]}/${serviceById[p.service!].slug[locale]}/`;
    case 'guide':
      return `${pre}/${SEG.guides[locale]}/${p.guide![locale]}/`;
    default:
      return `${pre}/${SEG[key][locale]}/`;
  }
}

export const href = (locale: Locale, key: RouteKey, p: RouteParams = {}) => withBase(routePath(locale, key, p));

export const alternates = (e: RouteEntry): L10n => ({ en: href('en', e.key, e), ga: href('ga', e.key, e) });

/** every page of the site, in one place — used by the router, sitemap and HTML site map */
export function allRoutes(guides: L10n[]): RouteEntry[] {
  const list: RouteEntry[] = [{ key: 'home' }];
  for (const k of Object.keys(SEG) as StaticKey[]) list.push({ key: k });
  for (const s of services) list.push({ key: 'service', service: s.id });
  for (const a of areas) {
    list.push({ key: 'area', area: a.id });
    for (const s of services) if (s.areaPages) list.push({ key: 'areaService', area: a.id, service: s.id });
  }
  for (const g of guides) list.push({ key: 'guide', guide: g });
  return list;
}

/* ---- place-name helpers ---------------------------------------------- */

/** "Rathmines" | "Ráth Maonais" */
export const placeName = (a: Area, l: Locale) => a.name[l];

/** text for "{area}" in UI templates: EN name (templates contain "in"), GA locative ("i Ráth Maonais") */
export const placeIn = (a: Area, l: Locale) => (l === 'en' ? a.name.en.replace(/^The /, 'the ') : a.inGa);

/** "in Rathmines" | "i Ráth Maonais" */
export const inPlace = (a: Area, l: Locale) => (l === 'en' ? `in ${placeIn(a, 'en')}` : a.inGa);

export const placeVars = (a: Area, l: Locale) => ({ area: placeIn(a, l), name: placeName(a, l) });

export const localeFromPath = (path: string): Locale => (withoutBase(path) === '/ga' || withoutBase(path).startsWith('/ga/') ? 'ga' : 'en');
