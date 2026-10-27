import type { CouncilId, L10n, Zone, ZoneId } from './types.ts';

/**
 * Service zones. Prices across Dublin are the same for the work itself;
 * zones only reflect travel time, parking and logistics, so the figures stay
 * honest and easy to explain on every location page.
 */
export const zones: Record<ZoneId, Zone> = {
  1: {
    id: 1,
    name: { en: 'City Centre', ga: 'Lár na Cathrach' },
    description: {
      en: 'Dublin 1, 2, 7 and 8 and the Docklands. Parking, loading and access are planned with your quotation.',
      ga: 'Baile Átha Cliath 1, 2, 7 agus 8 agus na Duganna. Deimhnítear páirceáil agus rochtain sa luachan.',
    },
    multiplier: 1,
    minVisit: 75,
  },
  2: {
    id: 2,
    name: { en: 'Dublin Suburbs', ga: 'Bruachbhailte Bhaile Átha Cliath' },
    description: {
      en: 'Inner and middle suburbs north and south of Dublin. Tell us your address and installation requirements.',
      ga: 'Bruachbhailte ó thuaidh agus ó dheas de Bhaile Átha Cliath. Seol do sheoladh agus riachtanais suiteála.',
    },
    multiplier: 1,
    minVisit: 65,
  },
  3: {
    id: 3,
    name: { en: 'County Dublin', ga: 'Contae Bhaile Átha Cliath' },
    description: {
      en: 'Outer suburbs and County Dublin towns. We confirm the site visit, access and installation in your quote.',
      ga: 'Bruachbhailte seachtracha agus bailte Chontae Bhaile Átha Cliath. Deimhnítear an chuairt agus suiteáil sa luachan.',
    },
    multiplier: 1.03,
    minVisit: 75,
  },
  4: {
    id: 4,
    name: { en: 'Commuter Belt', ga: 'An Crios Comaitéireachta' },
    description: {
      en: 'Dunboyne and surrounding towns in Meath, Kildare and Wicklow. Travel and delivery are quoted for your location.',
      ga: 'Dún Búinne agus bailte sa Mhí, i gCill Dara agus i gCill Mhantáin. Luachan taistil agus seachadta de réir suímh.',
    },
    multiplier: 1.06,
    minVisit: 95,
  },
};

export const councils: Record<CouncilId, L10n> = {
  dcc: { en: 'Dublin City Council', ga: 'Comhairle Cathrach Bhaile Átha Cliath' },
  dlr: { en: 'Dún Laoghaire-Rathdown County Council', ga: 'Comhairle Contae Dhún Laoghaire-Ráth an Dúin' },
  fingal: { en: 'Fingal County Council', ga: 'Comhairle Contae Fhine Gall' },
  sdcc: { en: 'South Dublin County Council', ga: 'Comhairle Contae Átha Cliath Theas' },
  wicklow: { en: 'Wicklow County Council', ga: 'Comhairle Contae Chill Mhantáin' },
  kildare: { en: 'Kildare County Council', ga: 'Comhairle Contae Chill Dara' },
  meath: { en: 'Meath County Council', ga: 'Comhairle Chontae na Mí' },
};
