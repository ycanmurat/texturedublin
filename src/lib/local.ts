/** Area-specific content assembled from the area, housing and service data. */
import type { Area, FAQ, Locale, Service } from '../data/types.ts';
import { housing, commercial } from '../data/housing.ts';
import { distanceKm, nearby } from '../data/areas.ts';
import { serviceById, services } from '../data/services.ts';
import { councils } from '../data/zones.ts';
import { site } from '../config/site.ts';
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

/** the Dunboyne workshop, used for "how far" answers on location pages */
const WORKSHOP = { lat: 53.4197, lng: -6.4733 };
const roughKm = (a: Area) => {
  const d = distanceKm(a, WORKSHOP);
  return d < 10 ? Math.max(1, Math.round(d)) : Math.round(d / 5) * 5;
};

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
  out.push(...extraFaqs(a, opts.service));
  void l;
  return out;
}

const mail = (l: Locale) => (site.email ? (l === 'en' ? ` or by email to ${site.email}` : ` nó trí ríomhphost chuig ${site.email}`) : '');

/** distance, neighbouring areas, available services and how to start — built from the area data */
function extraFaqs(a: Area, s?: Service): FAQ[] {
  const near = nearby(a, 5);
  const nearList = (l: Locale) => list(near.map((n) => n.name[l]), l);
  const km = roughKm(a);
  const home = a.id === 'dunboyne';
  const out: FAQ[] = [];
  if (s) {
    const svc = (l: Locale) => lowerName(s.name[l]);
    out.push({
      q: { en: `Do you provide ${svc('en')} in ${a.name.en}?`, ga: `An gcuireann sibh ${svc('ga')} ar fáil ${a.inGa}?` },
      a: {
        en: `Yes. We provide ${svc('en')} throughout ${a.name.en} (${a.postal}) and in nearby ${nearList('en')}. Surveys, delivery and installation are planned around your address, and everything is confirmed in your written quotation.`,
        ga: `Cuirimid. Cuirimid ${svc('ga')} ar fáil ${a.inGa} (${a.postal}) agus sna ceantair in aice láimhe: ${nearList('ga')}. Pleanáiltear suirbhéanna, seachadadh agus suiteáil de réir do sheolta, agus deimhnítear gach rud sa luachan scríofa.`,
      },
    });
    out.push({
      q: { en: `How do I get a quote for ${svc('en')} in ${a.name.en}?`, ga: `${s.name.ga} ${a.inGa}: conas a fhaighim luachan?` },
      a: {
        en: `Send a few photos, rough measurements and your street or Eircode in ${a.name.en} on WhatsApp${mail('en')}. Ali Onder will confirm the next step — usually a free survey for made-to-measure work — and you receive a fixed written quotation before anything is made.`,
        ga: `Seol cúpla grianghraf, tomhais gharbha agus do shráid nó d’Eircode ar WhatsApp${mail('ga')}. Deimhneoidh Ali Onder an chéad chéim eile — suirbhé saor in aisce de ghnáth d’obair de réir tomhais — agus gheobhaidh tú luachan scríofa seasta sula ndéantar aon rud.`,
      },
    });
  } else {
    const names = (l: Locale) => list(services.map((x) => lowerName(x.name[l])), l);
    out.push({
      q: { en: `Which services can I book in ${a.name.en}?`, ga: `Cé na seirbhísí is féidir liom a chur in áirithe ${a.inGa}?` },
      a: {
        en: `Every Texture Dublin service is available in ${a.name.en}: ${names('en')}. Choose a service on this page for local advice and a quotation.`,
        ga: `Tá gach seirbhís de chuid Texture Dublin ar fáil ${a.inGa}: ${names('ga')}. Roghnaigh seirbhís ar an leathanach seo le haghaidh comhairle áitiúil agus luachana.`,
      },
    });
    out.push({
      q: { en: `Do you also cover areas near ${a.name.en}?`, ga: `An gclúdaíonn sibh ceantair in aice láimhe chomh maith le hobair ${a.inGa}?` },
      a: {
        en: `Yes. Besides ${a.name.en}, we cover nearby ${nearList('en')}, the rest of the ${councils[a.council].en} area and all of Dublin, Meath, Kildare and north Wicklow.`,
        ga: `Clúdaímid. Seachas obair ${a.inGa}, clúdaímid na ceantair in aice láimhe — ${nearList('ga')} — chomh maith le Baile Átha Cliath, an Mhí, Cill Dara agus tuaisceart Chill Mhantáin ar fad.`,
      },
    });
  }
  out.push({
    q: home
      ? { en: 'Where is your Dunboyne workshop?', ga: 'Cá bhfuil bhur gceardlann i nDún Búinne?' }
      : { en: `How far is ${a.name.en} from your workshop?`, ga: `Cá fhad é ó bhur gceardlann go dtí ${a.name.ga}?` },
    a: home
      ? {
          en: 'Our workshop is here in Dunboyne, at Barstown Commercial Park, so surveys, fitting days and follow-up visits are easy to arrange. Visits to the workshop are by appointment.',
          ga: 'Tá ár gceardlann anseo i nDún Búinne, i bPáirc Tráchtála Barstown, mar sin is furasta suirbhéanna, laethanta feistithe agus cuairteanna leantacha a shocrú. Is trí choinne amháin a thugtar cuairt ar an gceardlann.',
        }
      : {
          en: `${a.name.en} is roughly ${km} km in a straight line from our workshop at Barstown Commercial Park, Dunboyne. We plan surveys and installation days around your location, and travel is included in your written quotation.`,
          ga: `Tá ${a.name.ga} thart ar ${km} km i líne dhíreach ónár gceardlann i bPáirc Tráchtála Barstown, Dún Búinne. Pleanálaimid suirbhéanna agus laethanta suiteála de réir do shuímh, agus cuirtear taisteal san áireamh sa luachan scríofa.`,
        },
  });
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
