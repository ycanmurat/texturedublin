import type { Product } from '../data/products.ts';
import type { Locale } from '../data/types.ts';
import { href } from './routes.ts';
import { site } from '../config/site.ts';
export const productHref=(locale:Locale,slug:string)=>`${href(locale,'shop')}${slug}/`;
export const productText=(p:Product,locale:Locale,key:'name'|'summary'|'description')=>locale==='ga'?(p[`${key}Ga`]||p[key]):p[key];
export const productPrice=(p:Product,locale:Locale)=>p.priceCents===null?(locale==='en'?'Price on enquiry':'Praghas ar fhiosrúchán'):new Intl.NumberFormat(locale==='en'?'en-IE':'ga-IE',{style:'currency',currency:'EUR',maximumFractionDigits: p.priceCents%100===0?0:2}).format(p.priceCents/100);
export function orderMessage(p:Product,locale:Locale,url:string,quantity=1,finish=p.finishes[0]||'',location='',notes='') {
 return [locale==='en'?`Hi ${site.contactName}, I’d like to enquire about this product:`:`Dia duit ${site.contactName}, ba mhaith liom fiosrú faoin táirge seo:`,p.name,url,`Quantity / Cainníocht: ${quantity}`,finish&&`Finish / Bailchríoch: ${finish}`,[p.width,p.height,p.depth].every(Boolean)&&`Design size / Toisí: ${p.width} × ${p.height} × ${p.depth} mm (W × H × D)`,location&&`Location / Suíomh: ${location}`,notes&&`Notes / Nótaí: ${notes}`,p.example?'I understand this is an example design and any displayed price is illustrative.':'',locale==='en'?'Please confirm the specification, final price, delivery and installation before an order is agreed.':'Deimhnigh na sonraí, an praghas deiridh, seachadadh agus suiteáil sula n-aontaítear ordú.'].filter(Boolean).join('\n');
}
