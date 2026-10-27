import type { L10n } from './types.ts';

/*
 * Standards & credentials.
 *
 * `standards` describes the EU and Irish rules that apply to this kind of
 * work and how Texture Dublin works to them. Read each one and delete or edit
 * anything that does not match how you actually work before launch.
 *
 * `credentials` are the business's own certificates and registrations. They
 * are shown on the live site ONLY when status is 'verified' and a number /
 * detail is filled in. In `npm run dev` the pending ones are shown with a
 * "to do" badge so you can see what is missing. Never mark a credential
 * verified unless you hold it.
 */

export type StandardGroup = 'materials' | 'safety' | 'electrical' | 'planning' | 'consumer';

export interface Standard {
  id: string;
  group: StandardGroup;
  title: L10n;
  ref: string;
  body: L10n;
  services: string[];
}

export const standardGroups: Record<StandardGroup, L10n> = {
  materials: { en: 'Materials & sustainability', ga: 'Ábhair agus inbhuanaitheacht' },
  safety: { en: 'Furniture & site safety', ga: 'Sábháilteacht troscáin agus láithreáin' },
  electrical: { en: 'Illuminated signage & electrical', ga: 'Comharthaíocht shoilsithe agus leictreachas' },
  planning: { en: 'Planning & signage regulation', ga: 'Pleanáil agus rialáil comharthaíochta' },
  consumer: { en: 'Your rights, privacy & accessibility', ga: 'Do chearta, príobháideachas agus inrochtaineacht' },
};

export const standards: Standard[] = [
  {
    id: 'cpr',
    group: 'materials',
    title: { en: 'CE-marked construction products', ga: 'Táirgí tógála le marc CE' },
    ref: 'Regulation (EU) No 305/2011 & (EU) 2024/3110 · EN 13986',
    body: {
      en: 'Wood-based panels, worktops and other construction products we install carry CE marking and a Declaration of Performance wherever EU law requires it, so their properties are tested and documented.',
      ga: 'Bíonn marc CE agus Dearbhú Feidhmíochta ar phainéil adhmadbhunaithe, ar bharraí oibre agus ar tháirgí tógála eile a shuiteálaimid aon áit a n-éilíonn dlí an AE é, ionas go ndéantar a n-airíonna a thástáil agus a dhoiciméadú.',
    },
    services: ['fitted-wardrobes', 'bespoke-kitchens', 'built-in-units', 'made-to-measure-cabinets', 'commercial-fit-out'],
  },
  {
    id: 'formaldehyde',
    group: 'materials',
    title: { en: 'Low-formaldehyde boards (E1 & EU REACH limit)', ga: 'Cláir íseal-fhormaildéad (E1 agus teorainn REACH an AE)' },
    ref: 'EN 13986 / EN 717-1 · Commission Regulation (EU) 2023/1464',
    body: {
      en: 'Since 6 August 2026 furniture and wood-based articles sold in the EU must not release more than 0.062 mg/m³ of formaldehyde. We specify E1-class (or better) MDF, chipboard and plywood from suppliers who certify compliance — better air quality in bedrooms, nurseries and kitchens.',
      ga: 'Ó 6 Lúnasa 2026, ní ceadmhach do throscán ná d’earraí adhmadbhunaithe a dhíoltar san AE níos mó ná 0.062 mg/m³ formaildéad a scaoileadh. Sonraímid MDF, clár sliseanna agus sraithadhmad d’aicme E1 (nó níos fearr) ó sholáthraithe a dheimhníonn comhlíonadh — cáilíocht aeir níos fearr i seomraí leapa, i seomraí leanaí agus i gcistineacha.',
    },
    services: ['fitted-wardrobes', 'bespoke-kitchens', 'built-in-units', 'made-to-measure-cabinets'],
  },
  {
    id: 'timber',
    group: 'materials',
    title: { en: 'Responsibly sourced timber', ga: 'Adhmad ó fhoinsí freagracha' },
    ref: 'EU Timber Regulation (EU) No 995/2010 → EU Deforestation Regulation (EU) 2023/1115',
    body: {
      en: 'We buy timber and panels from established merchants operating under EU timber legislation, and can specify chain-of-custody certified, sustainably managed timber on request.',
      ga: 'Ceannaímid adhmad agus painéil ó cheannaithe seanbhunaithe a fheidhmíonn faoi reachtaíocht adhmaid an AE, agus is féidir linn adhmad faoi bhainistiú inbhuanaithe le deimhniú slabhra coimeádta a shonrú ar iarratas.',
    },
    services: ['fitted-wardrobes', 'bespoke-kitchens', 'built-in-units', 'wooden-signs', 'carpentry'],
  },
  {
    id: 'voc',
    group: 'materials',
    title: { en: 'Low-VOC paints and lacquers', ga: 'Péinteanna agus laicir íseal-VOC' },
    ref: 'Directive 2004/42/EC (VOC in decorative coatings)',
    body: {
      en: 'Spray-painted and lacquered finishes use coatings that meet EU limits on volatile organic compounds, and we allow proper curing time before installation.',
      ga: 'Úsáideann bailchríocha spraephéinteáilte agus laicearaithe bratuithe a chomhlíonann teorainneacha an AE ar chomhdhúile orgánacha so-ghalaithe, agus tugaimid am triomaithe ceart roimh shuiteáil.',
    },
    services: ['fitted-wardrobes', 'bespoke-kitchens', 'built-in-units'],
  },
  {
    id: 'en14749',
    group: 'safety',
    title: { en: 'Storage furniture safety', ga: 'Sábháilteacht troscáin stórála' },
    ref: 'EN 14749 · EN 16122 · General Product Safety Regulation (EU) 2023/988',
    body: {
      en: 'Wardrobes, kitchen units and cabinets are designed around the stability, strength and durability principles of EN 14749, and tall furniture is anchored to the wall to prevent tipping — especially important in homes with children.',
      ga: 'Dearaimid vardrúis, aonaid chistine agus caibinéid timpeall ar phrionsabail chobhsaíochta, nirt agus mharthanachta EN 14749, agus daingnítear troscán ard leis an mballa chun nach dtitfidh sé — rud atá thar a bheith tábhachtach i dtithe le leanaí.',
    },
    services: ['fitted-wardrobes', 'bespoke-kitchens', 'built-in-units', 'furniture-assembly', 'furniture-installation', 'made-to-measure-cabinets'],
  },
  {
    id: 'shww',
    group: 'safety',
    title: { en: 'Safe working on site and at height', ga: 'Obair shábháilte ar an láithreán agus ag airde' },
    ref: 'Safety, Health and Welfare at Work Act 2005 · S.I. No. 299/2007 (Work at Height)',
    body: {
      en: 'Installations are planned and risk-assessed under Irish health and safety law. Sign installations use appropriate access equipment — ladders, towers or mobile elevating work platforms — operated by trained staff.',
      ga: 'Pleanáiltear suiteálacha agus déantar measúnú riosca orthu faoi dhlí sláinte agus sábháilteachta na hÉireann. Úsáideann suiteálacha comharthaí trealamh rochtana oiriúnach — dréimirí, túir nó ardáin oibre ingluaiste — á n-oibriú ag foireann oilte.',
    },
    services: ['shop-signs', 'illuminated-led-signs', 'commercial-fit-out', 'office-interior-signage', 'window-graphics-vinyl'],
  },
  {
    id: 'electrical',
    group: 'electrical',
    title: { en: 'CE-marked LED components', ga: 'Comhpháirteanna LED le marc CE' },
    ref: 'Low Voltage Directive 2014/35/EU · EMC Directive 2014/30/EU · RoHS 2011/65/EU · EN 60529 (IP rating)',
    body: {
      en: 'Illuminated signs are built with CE-marked LED modules and drivers. Outdoor signs use components rated IP65 or higher for Irish weather.',
      ga: 'Tógtar comharthaí soilsithe le modúil agus tiománaithe LED a bhfuil marc CE orthu. Úsáideann comharthaí seachtracha comhpháirteanna atá rátáilte IP65 nó níos airde d’aimsir na hÉireann.',
    },
    services: ['illuminated-led-signs'],
  },
  {
    id: 'safeelectric',
    group: 'electrical',
    title: { en: 'Certified electrical connection', ga: 'Nasc leictreachais deimhnithe' },
    ref: 'I.S. 10101 National Rules for Electrical Installations · Safe Electric (CRU) scheme',
    body: {
      en: 'In Ireland, connecting an illuminated sign is controlled electrical work. It is carried out and certified by a Safe Electric registered electrical contractor in line with I.S. 10101.',
      ga: 'In Éirinn, is obair leictreachais rialaithe é comhartha soilsithe a nascadh. Déanann conraitheoir leictreachais atá cláraithe le Safe Electric í agus deimhníonn sé í de réir I.S. 10101.',
    },
    services: ['illuminated-led-signs', 'bespoke-kitchens'],
  },
  {
    id: 'weee',
    group: 'electrical',
    title: { en: 'Responsible disposal of old signs', ga: 'Seanchomharthaí a dhiúscairt go freagrach' },
    ref: 'WEEE Directive 2012/19/EU',
    body: {
      en: 'Old lightboxes, LEDs and drivers removed during a project are recycled through authorised WEEE channels rather than landfill.',
      ga: 'Athchúrsáiltear seanbhoscaí solais, LEDanna agus tiománaithe a bhaintear le linn tionscadail trí bhealaí údaraithe WEEE seachas iad a chur sa líonadh talún.',
    },
    services: ['illuminated-led-signs', 'shop-signs'],
  },
  {
    id: 'planning',
    group: 'planning',
    title: { en: 'Planning permission for signs', ga: 'Cead pleanála do chomharthaí' },
    ref: 'Planning and Development Regulations 2001 (Schedule 2, Part 2) · Architectural Conservation Areas',
    body: {
      en: 'Many signs — especially illuminated, projecting or large fascia signs, and any sign on a protected structure or in an Architectural Conservation Area — need planning permission. We check what applies to your building and prepare drawings for Dublin City Council, Dún Laoghaire-Rathdown, Fingal, South Dublin and neighbouring councils.',
      ga: 'Teastaíonn cead pleanála ó go leor comharthaí — go háirithe comharthaí soilsithe, comharthaí crochta nó cláir aghaidhe mhóra, agus aon chomhartha ar struchtúr cosanta nó i Limistéar Caomhantais Ailtireachta. Seiceálaimid cad a bhaineann le d’fhoirgneamh agus ullmhaímid líníochtaí do Chomhairle Cathrach Bhaile Átha Cliath, do Dhún Laoghaire-Ráth an Dúin, d’Fhine Gall, d’Átha Cliath Theas agus do chomhairlí comharsanacha.',
    },
    services: ['shop-signs', 'illuminated-led-signs', 'wooden-signs'],
  },
  {
    id: 'consumer',
    group: 'consumer',
    title: { en: 'Clear quotes and your consumer rights', ga: 'Luachana soiléire agus do chearta tomhaltóra' },
    ref: 'Consumer Rights Act 2022 · Directive 2011/83/EU',
    body: {
      en: 'You receive a written quote and specification before work starts. Your statutory rights — services provided with reasonable care and skill, goods that match their description — are never affected by our terms. Note that made-to-measure items are exempt from the 14-day cancellation right once production has begun.',
      ga: 'Faigheann tú luachan agus sonraíocht scríofa sula dtosaíonn an obair. Ní dhéanann ár dtéarmaí difear go deo do do chearta reachtúla — seirbhísí a sholáthraítear le cúram agus scil réasúnta, earraí a mheaitseálann a dtuairisc. Tabhair faoi deara go bhfuil earraí de réir tomhais díolmhaithe ón gceart cealaithe 14 lá a luaithe a thosaíonn an táirgeadh.',
    },
    services: [],
  },
  {
    id: 'gdpr',
    group: 'consumer',
    title: { en: 'GDPR and cookie consent', ga: 'GDPR agus toiliú fianán' },
    ref: 'Regulation (EU) 2016/679 · Data Protection Act 2018 · S.I. No. 336/2011',
    body: {
      en: 'We collect only what we need to quote and deliver your project. Analytics and advertising cookies are set only after you consent, with “Reject all” as easy as “Accept all”, and Google Consent Mode v2 respects your choice.',
      ga: 'Ní bhailímid ach an méid a theastaíonn uainn chun luachan a thabhairt agus do thionscadal a sheachadadh. Ní shocraítear fianáin anailísíochta ná fógraíochta ach amháin tar éis duit toiliú, agus tá “Diúltaigh do gach ceann” chomh héasca le “Glac le gach ceann”, agus tugann Mód Toilithe Google v2 ómós do do rogha.',
    },
    services: [],
  },
  {
    id: 'accessibility',
    group: 'consumer',
    title: { en: 'An accessible website', ga: 'Suíomh gréasáin inrochtana' },
    ref: 'WCAG 2.2 AA · EN 301 549 · European Accessibility Act (Directive (EU) 2019/882)',
    body: {
      en: 'This website is built to WCAG 2.2 level AA: keyboard navigation, screen-reader labels, sufficient colour contrast and reduced motion for visitors who prefer it.',
      ga: 'Tá an suíomh gréasáin seo tógtha de réir WCAG 2.2 leibhéal AA: nascleanúint méarchláir, lipéid do léitheoirí scáileáin, codarsnacht dathanna leordhóthanach agus gluaiseacht laghdaithe do chuairteoirí ar fearr leo é.',
    },
    services: [],
  },
];

export type CredentialStatus = 'pending' | 'verified';

export interface Credential {
  id: string;
  name: L10n;
  issuer: string;
  description: L10n;
  /** registration / policy / certificate number, or a short detail like "€6.5m cover" */
  detail: string;
  status: CredentialStatus;
  url?: string;
}

export const credentials: Credential[] = [
  {
    id: 'safepass',
    name: { en: 'SOLAS Safe Pass', ga: 'Safe Pass SOLAS' },
    issuer: 'SOLAS',
    description: {
      en: 'Health and safety awareness card held by everyone working on site.',
      ga: 'Cárta feasachta sláinte agus sábháilteachta atá ag gach duine a oibríonn ar an láithreán.',
    },
    detail: '',
    status: 'pending',
  },
  {
    id: 'public-liability',
    name: { en: 'Public liability insurance', ga: 'Árachas dliteanais phoiblí' },
    issuer: '',
    description: {
      en: 'Cover for accidental damage to your property during our work.',
      ga: 'Clúdach do dhamáiste de thimpiste do d’áitreabh le linn ár gcuid oibre.',
    },
    detail: '',
    status: 'pending',
  },
  {
    id: 'employers-liability',
    name: { en: 'Employer’s liability insurance', ga: 'Árachas dliteanais fostóra' },
    issuer: '',
    description: { en: 'Cover for our team while they work in your home or premises.', ga: 'Clúdach dár bhfoireann agus iad ag obair i do theach nó i d’áitreabh.' },
    detail: '',
    status: 'pending',
  },
  {
    id: 'tax-clearance',
    name: { en: 'Revenue tax clearance (eTC)', ga: 'Imréiteach cánach ó na Coimisinéirí Ioncaim (eTC)' },
    issuer: 'Revenue',
    description: { en: 'Required for public-sector and many commercial contracts.', ga: 'Ag teastáil do chonarthaí san earnáil phoiblí agus do go leor conarthaí tráchtála.' },
    detail: '',
    status: 'pending',
    url: 'https://www.revenue.ie/en/starting-a-business/tax-clearance/index.aspx',
  },
  {
    id: 'cro',
    name: { en: 'Companies Registration Office', ga: 'Oifig Clárúcháin Cuideachtaí' },
    issuer: 'CRO',
    description: { en: 'Registered company or business name.', ga: 'Ainm cuideachta nó gnó cláraithe.' },
    detail: '',
    status: 'pending',
    url: 'https://core.cro.ie/',
  },
  {
    id: 'safe-electric',
    name: { en: 'Safe Electric registered contractor (illuminated signs)', ga: 'Conraitheoir cláraithe Safe Electric (comharthaí soilsithe)' },
    issuer: 'Safe Electric / CRU',
    description: {
      en: 'Our own registration, or the registered contractor we partner with for sign connections.',
      ga: 'Ár gclárú féin, nó an conraitheoir cláraithe a bhfuil comhpháirtíocht againn leis do naisc chomharthaí.',
    },
    detail: '',
    status: 'pending',
    url: 'https://www.safeelectric.ie/',
  },
  {
    id: 'ipaf',
    name: { en: 'IPAF / MEWP operator training', ga: 'Oiliúint oibreora IPAF / MEWP' },
    issuer: 'IPAF',
    description: { en: 'Training for safe use of cherry pickers and scissor lifts on sign installs.', ga: 'Oiliúint chun ardaitheoirí agus ardáin siosúir a úsáid go sábháilte ar shuiteálacha comharthaí.' },
    detail: '',
    status: 'pending',
  },
  {
    id: 'chain-of-custody',
    name: { en: 'Timber chain-of-custody certificate (optional)', ga: 'Deimhniú slabhra coimeádta adhmaid (roghnach)' },
    issuer: '',
    description: { en: 'Only if your business holds its own chain-of-custody certification.', ga: 'Ach amháin má tá a dheimhniú slabhra coimeádta féin ag do ghnó.' },
    detail: '',
    status: 'pending',
  },
];

/** credentials that may be displayed (production shows verified only) */
export function visibleCredentials(dev: boolean) {
  return credentials.filter((c) => dev || (c.status === 'verified' && c.detail.trim() !== ''));
}
