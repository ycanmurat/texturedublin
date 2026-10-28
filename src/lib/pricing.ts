import type { Locale, PriceItem, Service, ZoneId } from '../data/types.ts';
import { ui } from '../i18n/ui.ts';
const nf = new Intl.NumberFormat('en-IE', { maximumFractionDigits: 0 });
export const euro = (n: number) => `€${nf.format(n)}`;
export const enquiryLabel = (l: Locale) => l === 'en' ? 'Free written quote' : 'Luachan scríofa saor in aisce';
export const unitText = (l: Locale, item: PriceItem) => ui[l].units[item.unit];
export const vatText = (l: Locale, s: Service) => s.vat === 'inc' ? ui[l].price.incVat : ui[l].price.exVat;
export const leadItem = (s: Service) => s.items.find(i => i.id === s.lead) ?? s.items[0];
export const leadLabel = (l: Locale, _s: Service, _z?: ZoneId, _from = true) => enquiryLabel(l);
export const fromLabel = (l: Locale, _i: PriceItem, _z?: ZoneId, _from = true) => enquiryLabel(l);
export const renderTokens = (text: string, _s: Service, l: Locale, _z?: ZoneId) => text.replace(/\{(from|to|unit):[\w-]+(?:@[\w-]+)?\}/g, () => enquiryLabel(l));
export const startingRates = [
 { service: 'furniture-assembly', amount: 60, name: { en: 'Single-item furniture assembly', ga: 'Cóimeáil aon earra troscáin' }, unit: { en: 'per item', ga: 'in aghaidh an earra' } },
 { service: 'carpentry', amount: 48, name: { en: 'General carpentry', ga: 'Siúinéireacht ghinearálta' }, unit: { en: 'per hour', ga: 'in aghaidh na huaire' } },
 { service: 'wooden-signs', amount: 140, name: { en: 'Small wooden signs', ga: 'Comharthaí beaga adhmaid' }, unit: { en: 'per sign', ga: 'in aghaidh an chomhartha' } },
 { service: 'window-graphics-vinyl', amount: 150, name: { en: 'Simple window graphics', ga: 'Grafaicí simplí fuinneoige' }, unit: { en: 'per window', ga: 'in aghaidh na fuinneoige' } },
];
