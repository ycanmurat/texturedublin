import type { FAQ } from './types.ts';

const f = (qEn: string, qGa: string, aEn: string, aGa: string): FAQ => ({ q: { en: qEn, ga: qGa }, a: { en: aEn, ga: aGa } });

export const homeFaqs: FAQ[] = [
  f('Which areas do you cover?', 'Cé na ceantair a chlúdaíonn sibh?',
    'All of Dublin City and County — from Balbriggan to Shankill and from Lucan to Howth — plus commuter towns in Wicklow, Kildare and Meath such as Bray, Greystones, Maynooth, Celbridge, Naas and Ashbourne. Every area has its own page with local prices.',
    'Cathair agus Contae Bhaile Átha Cliath ar fad — ó Bhaile Brigín go Seanchill agus ó Leamhcán go Binn Éadair — chomh maith le bailte comaitéireachta i gCill Mhantáin, i gCill Dara agus sa Mhí ar nós Bré, na gClocha Liatha, Mhaigh Nuad, Chill Droichid, an Náis agus Chill Dhéagláin. Tá a leathanach féin le praghsanna áitiúla ag gach ceantar.'),
  f('How do I get a quote?', 'Conas a fhaighim luachan?',
    'Send us a WhatsApp with a few photos and rough measurements. We’ll reply with a guide price and, if you’d like to go ahead, book a free survey followed by a fixed written quote.',
    'Seol WhatsApp chugainn le cúpla grianghraf agus tomhais gharbha. Tabharfaimid praghas treorach duit agus, más mian leat leanúint ar aghaidh, socróimid suirbhé saor in aisce agus ina dhiaidh sin luachan scríofa seasta.'),
  f('Are the prices on this website fixed?', 'An bhfuil na praghsanna ar an suíomh seo seasta?',
    'They are guide prices based on typical projects. After the survey you receive a fixed written quote, and that is the price you pay unless you change the specification.',
    'Is praghsanna treorach iad bunaithe ar thionscadail thipiciúla. Tar éis an tsuirbhé faigheann tú luachan scríofa seasta, agus is é sin an praghas a íocann tú mura n-athraíonn tú an tsonraíocht.'),
  f('Do you work for businesses as well as homeowners?', 'An n-oibríonn sibh do ghnólachtaí chomh maith le húinéirí tí?',
    'Yes — we work for homeowners, landlords, shops, cafés, offices and builders. Our signage and branding services are designed for businesses of every size, and we can deliver joinery and signage together for a fit-out.',
    'Oibrímid — oibrímid d’úinéirí tí, do thiarnaí talún, do shiopaí, do chaiféanna, d’oifigí agus do thógálaithe. Tá ár seirbhísí comharthaíochta agus brandála deartha do ghnólachtaí de gach méid, agus is féidir linn siúinéireacht agus comharthaíocht a sheachadadh le chéile d’fheistiú.'),
  f('Which standards do you work to?', 'Cé na caighdeáin a gcloíonn sibh leo?',
    'We specify low-formaldehyde E1 boards that meet the EU REACH limit, CE-marked components and low-VOC finishes, anchor tall furniture to the wall, and illuminated signs are connected by a Safe Electric registered contractor. Our standards page has the details.',
    'Sonraímid cláir E1 íseal-fhormaildéad a chomhlíonann teorainn REACH an AE, comhpháirteanna le marc CE agus bailchríocha íseal-VOC, daingnímid troscán ard leis an mballa, agus nascann conraitheoir atá cláraithe le Safe Electric comharthaí soilsithe. Tá na sonraí ar ár leathanach caighdeán.'),
  f('How long does a made-to-measure project take?', 'Cá fhad a thógann tionscadal de réir tomhais?',
    'Most built-in units take 2–4 weeks from design sign-off, fitted wardrobes 3–5 weeks and bespoke kitchens 6–8 weeks. Flat-pack assembly and small installation jobs can often be booked within days.',
    'Tógann formhór na n-aonad ionsuite 2–4 seachtaine ó cheadú an dearaidh, vardrúis fheistithe 3–5 seachtaine agus cistineacha saincheaptha 6–8 seachtaine. Is minic is féidir cóimeáil flat-pack agus jabanna beaga suiteála a chur in áirithe laistigh de laethanta.'),
];

export const pricingFaqs: FAQ[] = [
  f('Why do prices change slightly between areas?', 'Cén fáth a n-athraíonn praghsanna beagán idir ceantair?',
    'The work itself costs the same everywhere. Areas further from the city include a small travel allowance on project prices (3% in County Dublin, 6% in the commuter belt), and small jobs carry a minimum visit charge that reflects parking and travel time.',
    'Cosnaíonn an obair féin an méid céanna i ngach áit. Cuimsíonn ceantair níos faide ón gcathair liúntas taistil beag ar phraghsanna tionscadail (3% i gContae Bhaile Átha Cliath, 6% sa chrios comaitéireachta), agus bíonn táille chuairte íosta ar jabanna beaga a léiríonn páirceáil agus am taistil.'),
  f('Do your prices include VAT?', 'An gcuimsíonn bhur bpraghsanna CBL?',
    'Residential prices include VAT. Commercial, signage and branding prices are shown excluding VAT, because most business customers reclaim it.',
    'Cuimsíonn praghsanna cónaithe CBL. Taispeántar praghsanna tráchtála, comharthaíochta agus brandála gan CBL, toisc go n-éilíonn formhór na gcustaiméirí gnó ar ais é.'),
  f('Do you ask for a deposit?', 'An iarrann sibh éarlais?',
    'For made-to-measure work we take a deposit when you approve the design, so materials can be ordered. Small jobs such as assembly are paid on completion. The exact terms are written on your quote.',
    'D’obair de réir tomhais glacaimid éarlais nuair a cheadaíonn tú an dearadh, ionas gur féidir na hábhair a ordú. Íoctar as jabanna beaga ar nós cóimeála ar chríochnú. Tá na téarmaí cruinne scríofa ar do luachan.'),
  f('Is the survey really free?', 'An bhfuil an suirbhé saor in aisce i ndáiríre?',
    'Yes. Surveys and quotes for made-to-measure furniture, kitchens and signage are free and there is no obligation to go ahead.',
    'Tá. Tá suirbhéanna agus luachana do throscán de réir tomhais, do chistineacha agus do chomharthaíocht saor in aisce agus níl aon dualgas ort leanúint ar aghaidh.'),
];
