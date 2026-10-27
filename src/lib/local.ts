/** Area-specific content assembled from the area, housing and service data. */
import type { Area, FAQ, Locale, Service } from '../data/types.ts';
import { housing, commercial } from '../data/housing.ts';
import { serviceById } from '../data/services.ts';
import { councils } from '../data/zones.ts';
import { ui, fmt } from '../i18n/ui.ts';
import { placeVars } from './routes.ts';
import { lowerName } from './wa.ts';

/** services most relevant to the local building stock, in priority order */
const byHousing: Record<string, string[]> = {
  georgian: ['built-in-units', 'bespoke-kitchens', 'carpentry'],
  victorian: ['built-in-units', 'fitted-wardrobes', 'bespoke-kitchens'],
  interwar: ['fitted-wardrobes', 'bespoke-kitchens', 'built-in-units'],
  suburban: ['bespoke-kitchens', 'fitted-wardrobes', 'built-in-units'],
  estate: ['fitted-wardrobes', 'bespoke-kitchens', 'furniture-assembly'],
  newbuild: ['furniture-assembly', 'fitted-wardrobes', 'built-in-units'],
  apartment: ['fitted-wardrobes', 'furniture-assembly', 'built-in-units'],
  coastal: ['bespoke-kitchens', 'built-in-units', 'fitted-wardrobes'],
  detached: ['interior-design-complete-works', 'bespoke-kitchens', 'fitted-wardrobes'],
  cottage: ['fitted-wardrobes', 'built-in-units', 'made-to-measure-cabinets'],
};
const byCommercial: Record<string, string[]> = {
  cityRetail: ['shop-signs', 'wooden-signs', 'illuminated-led-signs'],
  village: ['shop-signs', 'wooden-signs', 'window-graphics-vinyl'],
  business: ['office-interior-signage', 'illuminated-led-signs', 'window-graphics-vinyl'],
  suburbanParade: ['shop-signs', 'illuminated-led-signs', 'window-graphics-vinyl'],
  town: ['shop-signs', 'illuminated-led-signs', 'window-graphics-vinyl'],
};

export function popularServices(a: Area): Service[] {
  const ids = [...new Set([...a.housing.flatMap((h) => byHousing[h] ?? []), ...(byCommercial[a.commercial] ?? [])])];
  return ids.map((id) => serviceById[id]).filter(Boolean);
}

const lowerFirst = (s: string) => (/^(Victorian|Georgian|Edwardian)/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

const list = (items: string[], l: Locale) => {
  if (items.length < 2) return items.join('');
  const and = ui[l].common.and;
  return `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
};

/** local FAQs for an area (or an area + service page) */
export function areaFaqs(a: Area, l: Locale, opts: { service?: Service } = {}): FAQ[] {
  const out: FAQ[] = [];
  const mk = (l2: Locale) => {
    const t = ui[l2].area;
    const v = placeVars(a, l2);
    const travel = l2 === 'en' ? `We quote travel, parking and access for ${a.name.en} as part of your project. Send your location and job details to Ali Onder; any charges are agreed in advance.` : `Cuirtear taisteal, páirceáil agus rochtain san áireamh sa luachan do ${a.name.ga}. Seol sonraí chuig Ali Onder agus aontaítear aon táillí roimh ré.`;
    return {
      travel: { q: fmt(t.faqTravelQ, v), a: travel },
      planning: { q: fmt(t.faqPlanningQ, v), a: fmt(t.faqPlanningA, { ...v, council: councils[a.council][l2] }) },
      start: { q: fmt(t.faqStartQ, v), a: fmt(t.faqStartA, v) },
      popular: {
        q: fmt(t.faqPopularQ, v),
        a: fmt(t.faqPopularA, {
          ...v,
          housing: lowerFirst(housing[a.housing[0]].name[l2]),
          services: list(popularServices(a).filter((s) => s.category === 'woodworks').slice(0, 3).map((s) => lowerName(s.name[l2])), l2),
          signs: list((byCommercial[a.commercial] ?? []).slice(0, 2).map((id) => lowerName(serviceById[id].name[l2])), l2),
        }),
      },
    };
  };
  const en = mk('en');
  const ga = mk('ga');
  const pair = (k: keyof typeof en): FAQ => ({ q: { en: en[k].q, ga: ga[k].q }, a: { en: en[k].a, ga: ga[k].a } });
  out.push(pair('travel'));
  if (!opts.service || opts.service.category === 'signage') out.push(pair('planning'));
  out.push(pair('start'));
  if (!opts.service) out.push(pair('popular'));
  void l;
  return out;
}

export const housingAdvice = (a: Area, s: Service, l: Locale) => {
  if (s.advice === 'signs') return [commercial[a.commercial].advice[l]];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const h of a.housing.slice(0, 2)) {
    const txt = housing[h].advice[s.advice][l];
    if (!seen.has(txt)) {
      seen.add(txt);
      out.push(txt);
    }
  }
  return out;
};
