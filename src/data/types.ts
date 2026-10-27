export type Locale = 'en' | 'ga';
export type L10n<T = string> = Record<Locale, T>;

export type Unit =
  | 'project'
  | 'perMetre'
  | 'perItem'
  | 'perUnit'
  | 'perDoor'
  | 'perHour'
  | 'perDay'
  | 'perSqm'
  | 'perRoom'
  | 'perSign'
  | 'perAlcove'
  | 'perWindow'
  | 'perShelf'
  | 'perVisit';

export interface PriceItem {
  id: string;
  name: L10n;
  /** guide "from" price in euro */
  from: number;
  /** typical upper end, optional */
  to?: number;
  unit: Unit;
  /** small call-out jobs: shown without zone uplift, minimum visit charge applies */
  small?: boolean;
  /** price equals the zone's minimum visit charge */
  zoneMin?: boolean;
}

export interface FAQ {
  q: L10n;
  a: L10n;
}

export type AdviceKey = 'wardrobes' | 'kitchens' | 'builtins' | 'assembly' | 'signs';
export type Category = 'woodworks' | 'signage';

export interface Service {
  id: string;
  category: Category;
  slug: L10n;
  name: L10n;
  /** shorter name for page titles when space is tight */
  titleName?: L10n;
  short: L10n;
  headline: L10n;
  intro: L10n<string[]>;
  includes: L10n<string[]>;
  items: PriceItem[];
  factors: L10n<string[]>;
  leadTime: L10n;
  faqs: FAQ[];
  illustration: string;
  /** generate /areas/{area}/{service}/ landing pages */
  areaPages: boolean;
  advice: AdviceKey;
  /** residential prices include VAT; trade/commercial shown ex VAT */
  vat: 'inc' | 'ex';
  /** the item used for "from €X" headlines */
  lead: string;
  related: string[];
  keywords: string[];
}

export type ZoneId = 1 | 2 | 3 | 4;
export type CouncilId = 'dcc' | 'dlr' | 'fingal' | 'sdcc' | 'wicklow' | 'kildare' | 'meath';
export type HousingId =
  | 'georgian'
  | 'victorian'
  | 'interwar'
  | 'suburban'
  | 'estate'
  | 'newbuild'
  | 'apartment'
  | 'coastal'
  | 'detached'
  | 'cottage';
export type CommercialId = 'cityRetail' | 'village' | 'business' | 'suburbanParade' | 'town';

export interface Area {
  id: string;
  name: L10n;
  /** Irish locative, e.g. "i Ráth Maonais", "sa Charraig Dhubh" */
  inGa: string;
  slug: L10n;
  postal: string;
  eircode?: string;
  council: CouncilId;
  zone: ZoneId;
  lat: number;
  lng: number;
  housing: HousingId[];
  commercial: CommercialId;
  intro: L10n;
  insight: L10n;
}

export interface Zone {
  id: ZoneId;
  name: L10n;
  description: L10n;
  /** uplift applied to project prices (travel time, logistics) */
  multiplier: number;
  /** minimum visit / call-out charge for small jobs */
  minVisit: number;
}
