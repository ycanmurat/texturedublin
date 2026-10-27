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
      en: 'Dublin 1, 2, 7 and 8 and the Docklands. No travel charge — city-centre parking and access are built into the minimum visit.',
      ga: 'Baile Átha Cliath 1, 2, 7 agus 8 agus na Duganna. Gan táille taistil — tá páirceáil agus rochtain i lár na cathrach san áireamh sa chuairt íosta.',
    },
    multiplier: 1,
    minVisit: 75,
  },
  2: {
    id: 2,
    name: { en: 'Dublin Suburbs', ga: 'Bruachbhailte Bhaile Átha Cliath' },
    description: {
      en: 'Inner and middle suburbs north and south of the city. No travel charge and our lowest minimum visit.',
      ga: 'Bruachbhailte inmheánacha agus lárnacha ó thuaidh agus ó dheas den chathair. Gan táille taistil agus an chuairt íosta is ísle againn.',
    },
    multiplier: 1,
    minVisit: 65,
  },
  3: {
    id: 3,
    name: { en: 'County Dublin', ga: 'Contae Bhaile Átha Cliath' },
    description: {
      en: 'Outer suburbs and towns across Dún Laoghaire-Rathdown, Fingal and South Dublin. A small travel allowance (3%) is included in project prices.',
      ga: 'Bruachbhailte seachtracha agus bailte ar fud Dhún Laoghaire-Ráth an Dúin, Fhine Gall agus Átha Cliath Theas. Tá liúntas taistil beag (3%) san áireamh i bpraghsanna tionscadail.',
    },
    multiplier: 1.03,
    minVisit: 75,
  },
  4: {
    id: 4,
    name: { en: 'Commuter Belt', ga: 'An Crios Comaitéireachta' },
    description: {
      en: 'Towns in Wicklow, Kildare and Meath within easy reach of Dublin. A 6% travel allowance is included in project prices.',
      ga: 'Bailte i gCill Mhantáin, i gCill Dara agus sa Mhí atá furasta a bhaint amach ó Bhaile Átha Cliath. Tá liúntas taistil 6% san áireamh i bpraghsanna tionscadail.',
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
