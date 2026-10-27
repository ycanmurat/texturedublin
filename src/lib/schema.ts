import { withBase } from './paths.ts';
/**
 * schema.org JSON-LD builders. Every page gets one @graph containing the
 * business, website, web page, breadcrumbs and page-specific entities
 * (services with priced offers, areas served, FAQs, articles).
 */
import type { Area, FAQ, Locale, PriceItem, Service, ZoneId } from '../data/types.ts';
import { site } from '../config/site.ts';
import { areas } from '../data/areas.ts';
import { services } from '../data/services.ts';
import { ui } from '../i18n/ui.ts';
import { priceFrom, priceTo, renderTokens } from './pricing.ts';
import { href } from './routes.ts';

type Node = Record<string, unknown>;

export const BUSINESS_ID = `${abs('/')}#business`;
export const WEBSITE_ID = `${abs('/')}#website`;
export function abs(path: string) { return path.startsWith('http') ? path : `${site.url}${withBase(path)}`; }

const sameAs = () => Object.values(site.socials).filter(Boolean);

const dayMap: Record<string, string> = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };

const dublinPlace = { '@type': 'City', name: 'Dublin', sameAs: 'https://en.wikipedia.org/wiki/Dublin' };

export const placeNode = (a: Area, l: Locale): Node => ({
  '@type': 'Place',
  name: a.name[l],
  geo: { '@type': 'GeoCoordinates', latitude: a.lat, longitude: a.lng },
  address: { '@type': 'PostalAddress', addressLocality: a.name.en, addressRegion: a.postal.startsWith('Co.') ? a.postal.replace('Co.', 'County') : 'County Dublin', addressCountry: 'IE' },
});

/** the business entity. `full` adds opening hours, areas served and the full offer catalogue */
export function business(l: Locale, full = false): Node {
  const node: Node = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
    image: abs('/og-default.png'),
    description:
      l === 'en'
        ? 'Bespoke carpentry, fitted wardrobes, kitchens, built-in units, furniture assembly and installation, shop signs, LED signage and branding across Dublin.'
        : 'Siúinéireacht shaincheaptha, vardrúis fheistithe, cistineacha, aonaid ionsuite, cóimeáil agus suiteáil troscáin, comharthaí siopa, comharthaíocht LED agus brandáil ar fud Bhaile Átha Cliath.',
    slogan: l === 'en' ? 'Bespoke wood works and branding' : 'Obair adhmaid shaincheaptha agus brandáil',
    telephone: site.phone.e164,
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      ...(site.showAddress && site.address.street ? { streetAddress: site.address.street, postalCode: site.address.postalCode } : {}),
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    knowsLanguage: ['en-IE', 'ga-IE'],
    ...(site.vatNumber ? { vatID: site.vatNumber } : {}),
  };
  const same = sameAs();
  if (same.length) node.sameAs = same;
  if (full) {
    node.openingHoursSpecification = site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => dayMap[d]),
      opens: h.opens,
      closes: h.closes,
    }));
    node.areaServed = [dublinPlace, ...areas.map((a) => ({ '@type': 'Place', name: a.name.en }))];
    node.hasOfferCatalog = offerCatalog(l);
    node.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.phone.e164,
      email: site.email,
      areaServed: 'IE',
      availableLanguage: ['English', 'Irish'],
    };
  }
  return node;
}

export const website = (): Node => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: abs('/'),
  name: site.name,
  inLanguage: ['en-IE', 'ga-IE'],
  publisher: { '@id': BUSINESS_ID },
});

export function webPage(o: { path: string; title: string; description: string; locale: Locale; type?: string; image?: string; breadcrumb?: boolean; about?: Node; modified?: string }): Node {
  const url = abs(o.path);
  return {
    '@type': o.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: o.title,
    description: o.description,
    inLanguage: ui[o.locale].meta.htmlLang,
    isPartOf: { '@id': WEBSITE_ID },
    ...(o.breadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(o.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: abs(o.image) } } : {}),
    ...(o.about ? { about: o.about } : {}),
    ...(o.modified ? { dateModified: o.modified } : {}),
  };
}

export function breadcrumbs(path: string, items: Array<{ name: string; href: string }>): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(path)}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

function priceSpec(item: PriceItem, s: Service, l: Locale, zone?: ZoneId): Node {
  const unit = ui.en.units[item.unit];
  const spec: Node = {
    '@type': unit ? 'UnitPriceSpecification' : 'PriceSpecification',
    priceCurrency: 'EUR',
    price: priceFrom(item, zone),
    minPrice: priceFrom(item, zone),
    ...(item.to ? { maxPrice: priceTo(item, zone) } : {}),
    valueAddedTaxIncluded: s.vat === 'inc',
  };
  if (unit) spec.unitText = ui[l].units[item.unit] || unit;
  return spec;
}

export function offers(s: Service, l: Locale, zone?: ZoneId, area?: Area): Node[] {
  return s.items.map((item) => ({
    '@type': 'Offer',
    name: item.name[l],
    priceCurrency: 'EUR',
    price: priceFrom(item, zone),
    priceSpecification: priceSpec(item, s, l, zone),
    availability: 'https://schema.org/InStock',
    seller: { '@id': BUSINESS_ID },
    ...(area ? { areaServed: { '@type': 'Place', name: area.name[l] } } : {}),
  }));
}

export function serviceNode(s: Service, l: Locale, o: { path: string; area?: Area } = { path: '' }): Node {
  const url = abs(o.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: o.area ? `${s.name[l]} — ${o.area.name[l]}` : s.name[l],
    serviceType: s.name.en,
    description: s.short[l],
    url,
    provider: { '@id': BUSINESS_ID },
    areaServed: o.area ? placeNode(o.area, l) : dublinPlace,
    category: s.category === 'woodworks' ? 'Carpentry & Joinery' : 'Signage & Branding',
    offers: offers(s, l, o.area?.zone, o.area),
  };
}

export function offerCatalog(l: Locale, zone?: ZoneId, area?: Area): Node {
  return {
    '@type': 'OfferCatalog',
    name: l === 'en' ? 'Carpentry, furniture & signage services' : 'Seirbhísí siúinéireachta, troscáin agus comharthaíochta',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name[l],
        url: abs(href(l, area && s.areaPages ? 'areaService' : 'service', { service: s.id, area: area?.id })),
      },
      priceSpecification: priceSpec(s.items.find((i) => i.id === s.lead) ?? s.items[0], s, l, zone),
      ...(area ? { areaServed: { '@type': 'Place', name: area.name[l] } } : {}),
    })),
  };
}

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');

export function faqPage(path: string, faqs: FAQ[], l: Locale, ctx?: { service?: Service; zone?: ZoneId }): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q[l],
      acceptedAnswer: { '@type': 'Answer', text: stripTags(ctx?.service ? renderTokens(f.a[l], ctx.service, l, ctx.zone) : f.a[l]) },
    })),
  };
}

export function article(o: { path: string; title: string; description: string; locale: Locale; published: Date; updated: Date; image: string }): Node {
  const url = abs(o.path);
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: o.title,
    description: o.description,
    inLanguage: ui[o.locale].meta.htmlLang,
    datePublished: o.published.toISOString().slice(0, 10),
    dateModified: o.updated.toISOString().slice(0, 10),
    author: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
    image: abs(o.image),
    mainEntityOfPage: { '@id': `${url}#webpage` },
  };
}

export const graph = (nodes: Node[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
