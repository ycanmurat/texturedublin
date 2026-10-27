import type { Area, Locale, PriceItem, Service, ZoneId } from '../data/types.ts';
import { zones } from '../data/zones.ts';
import { serviceById } from '../data/services.ts';
import { ui } from '../i18n/ui.ts';

export function roundPrice(n: number) {
  if (n < 100) return Math.round(n);
  if (n < 1000) return Math.round(n / 5) * 5;
  if (n < 10000) return Math.round(n / 10) * 10;
  return Math.round(n / 50) * 50;
}

/** zone-adjusted "from" price. Small call-out jobs keep their price; the zone's minimum visit applies instead. */
export function priceFrom(item: PriceItem, zone?: ZoneId): number {
  if (!zone) return item.from;
  if (item.zoneMin) return zones[zone].minVisit;
  if (item.small) return item.from;
  return roundPrice(item.from * zones[zone].multiplier);
}

export function priceTo(item: PriceItem, zone?: ZoneId): number | undefined {
  if (item.to === undefined) return undefined;
  if (!zone || item.small) return item.to;
  return roundPrice(item.to * zones[zone].multiplier);
}

const nf = new Intl.NumberFormat('en-IE', { maximumFractionDigits: 0 });
export const euro = (n: number) => `€${nf.format(n)}`;

export const unitText = (locale: Locale, item: PriceItem) => ui[locale].units[item.unit];

export function vatText(locale: Locale, s: Service) {
  return s.vat === 'inc' ? ui[locale].price.incVat : ui[locale].price.exVat;
}

/** "from €1,150 per metre" */
export function fromLabel(locale: Locale, item: PriceItem, zone?: ZoneId, withFrom = true) {
  const u = unitText(locale, item);
  return `${withFrom ? ui[locale].price.from + ' ' : ''}${euro(priceFrom(item, zone))}${u ? ' ' + u : ''}`;
}

export function leadItem(s: Service) {
  return s.items.find((i) => i.id === s.lead) ?? s.items[0];
}

/** lowest representative price for a service (for cards and meta descriptions) */
export function leadLabel(locale: Locale, s: Service, zone?: ZoneId, withFrom = true) {
  return fromLabel(locale, leadItem(s), zone, withFrom);
}

/** replaces {from:id} {to:id} {unit:id} tokens inside FAQ answers etc. */
export function renderTokens(text: string, s: Service, locale: Locale, zone?: ZoneId) {
  return text.replace(/\{(from|to|unit):([\w-]+)(?:@([\w-]+))?\}/g, (m, kind, id, sid) => {
    const svc = sid ? serviceById[sid] : s;
    const item = svc?.items.find((i) => i.id === id);
    if (!item) return m;
    if (kind === 'from') return euro(priceFrom(item, zone));
    if (kind === 'to') return euro(priceTo(item, zone) ?? priceFrom(item, zone));
    return unitText(locale, item);
  });
}

/* ------------------------------------------------------------------ */
/*  "A typical project in {area}" — picks a realistic job for the     */
/*  local housing stock and prices it with the area's zone.            */
/* ------------------------------------------------------------------ */

interface Scenario {
  label: { en: string; ga: string };
  parts: Array<[itemId: string, qty: number]>;
}

const S = (en: string, ga: string, parts: Scenario['parts']): Scenario => ({ label: { en, ga }, parts });

const scenarios: Record<string, (a: Area) => Scenario> = {
  'fitted-wardrobes': (a) => {
    const h = a.housing[0];
    if (h === 'victorian' || h === 'georgian')
      return S('A pair of hinged alcove wardrobes either side of the chimney breast (2 × 1.1 m, floor to ceiling)', 'Péire vardrús le doirse insí sna cuasa ar gach taobh den bhrollach simléir (2 × 1.1 m, urlár go síleáil)', [['hinged', 2.2]]);
    if (h === 'apartment' || h === 'cottage')
      return S('A 1.8 m sliding-door wardrobe with mirror panels and a full internal layout', 'Vardrús 1.8 m le doirse sleamhnáin, painéil scátháin agus leagan amach iomlán istigh', [['sliding', 1.8], ['interior', 1]]);
    if (h === 'detached')
      return S('A walk-in wardrobe / dressing room with island and lighting', 'Vardrús siúil isteach / seomra feistis le hoileán agus soilsiú', [['walkin', 1]]);
    return S('A 2.4 m floor-to-ceiling hinged wardrobe for a double bedroom', 'Vardrús 2.4 m le doirse insí ó urlár go síleáil do sheomra leapa dúbailte', [['hinged', 2.4]]);
  },
  'bespoke-kitchens': (a) => {
    const h = a.housing[0];
    if (h === 'apartment') return S('A compact single-wall apartment kitchen with full-height storage', 'Cistin árasáin bheag ar bhalla aonair le stóráil lánairde', [['compact', 1]]);
    if (h === 'detached' || h === 'coastal') return S('A large kitchen with island, larder and utility units', 'Cistin mhór le hoileán, lardrús agus aonaid fóntais', [['island', 1], ['utility', 1]]);
    return S('A family L-shaped kitchen opening onto a rear extension', 'Cistin teaghlaigh i gcruth L a osclaíonn isteach ar shíneadh cúil', [['family', 1]]);
  },
  'built-in-units': (a) => {
    const h = a.housing[0];
    if (h === 'victorian' || h === 'georgian' || h === 'interwar') return S('A matching pair of alcove units with cupboards and floating shelves', 'Péire meaitseáilte aonad cuasa le cófraí agus seilfeanna ar snámh', [['alcovePair', 1]]);
    if (h === 'cottage') return S('Under-stairs pull-out storage plus a window seat', 'Stóráil tharraingthe faoin staighre agus suíochán fuinneoige', [['understairs', 1], ['windowSeat', 1]]);
    if (h === 'detached') return S('A built-in home office with desk, shelving and storage', 'Oifig bhaile ionsuite le deasc, seilfeanna agus stóráil', [['office', 1]]);
    if (h === 'coastal') return S('A hallway boot-room bench with coat storage', 'Binse seomra buataisí sa halla le stóráil cótaí', [['bootroom', 1]]);
    return S('A media wall with concealed cabling and storage', 'Balla meán le cáblaí ceilte agus stóráil', [['media', 1]]);
  },
  'furniture-assembly': (a) => {
    const h = a.housing[0];
    if (h === 'apartment' || h === 'newbuild')
      return S('Moving-in bundle: double bed, 2-door wardrobe, chest of drawers and desk', 'Pacáiste bogtha isteach: leaba dhúbailte, vardrús 2 dhoras, cófra tarraiceán agus deasc', [['bed', 1], ['wardrobe2', 1], ['drawers', 1], ['desk', 1]]);
    if (h === 'estate' || h === 'suburban')
      return S('A 3 m modular wardrobe system with doors, anchored to the wall', 'Córas vardrúis modúlach 3 m le doirse, daingnithe leis an mballa', [['wardrobeLarge', 3], ['anchor', 1]]);
    return S('A bed frame, two bedside tables and a chest of drawers', 'Fráma leapa, dhá bhord taobh leapa agus cófra tarraiceán', [['bed', 1], ['drawers', 3]]);
  },
  'furniture-installation': (a) => {
    const h = a.housing[0];
    if (h === 'estate' || h === 'suburban' || h === 'newbuild')
      return S('Installing a 14-cabinet flat-pack kitchen with two worktop lengths', 'Cistin flat-pack 14 chaibinéad le dhá fhad barra oibre a shuiteáil', [['kitchenFit', 14], ['worktop', 2]]);
    if (h === 'apartment') return S('Fitting a small supplied kitchen and wall-mounting the TV', 'Cistin bheag a sholáthraítear a fheistiú agus an teilifís a chrochadh ar an mballa', [['kitchenSmall', 1], ['tv', 1]]);
    return S('Installing a supplied wardrobe system and hanging three interior doors', 'Córas vardrúis a sholáthraítear a shuiteáil agus trí dhoras inmheánacha a chrochadh', [['wardrobeFit', 1], ['door', 3]]);
  },
  'shop-signs': (a) => {
    switch (a.commercial) {
      case 'cityRetail':
        return S('A hand-painted timber fascia with a matching projecting sign', 'Clár aghaidhe adhmaid lámhphéinteáilte le comhartha crochta meaitseáilte', [['painted', 1], ['projecting', 1], ['install', 1]]);
      case 'village':
        return S('A painted timber fascia plus window lettering', 'Clár aghaidhe adhmaid péinteáilte agus litreoireacht fuinneoige', [['painted', 1], ['install', 1]]);
      case 'business':
        return S('Built-up 3D letters for a building entrance', 'Litreacha 3T tógtha do bhealach isteach foirgnimh', [['letters', 1], ['install', 1]]);
      default:
        return S('A printed aluminium fascia sign (3 m) with an A-board', 'Comhartha aghaidhe alúmanaim clóite (3 m) le comhartha cosáin', [['panel', 1], ['aboard', 1], ['install', 1]]);
    }
  },
};

export function typicalProject(s: Service, a: Area) {
  const make = scenarios[s.id];
  if (!make) return null;
  const sc = make(a);
  let low = 0;
  let high = 0;
  for (const [id, qty] of sc.parts) {
    const it = s.items.find((i) => i.id === id);
    if (!it) continue;
    low += priceFrom(it, a.zone) * qty;
    high += (priceTo(it, a.zone) ?? priceFrom(it, a.zone)) * qty;
  }
  const min = zones[a.zone].minVisit;
  if (s.id === 'furniture-assembly' && low < min) low = min;
  if (high < low) high = low;
  return { label: sc.label, low: roundPrice(low), high: roundPrice(high) };
}
