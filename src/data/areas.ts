import type { Area, CommercialId, CouncilId, HousingId, ZoneId } from './types.ts';

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

interface Def {
  id: string;
  en: string;
  ga: string;
  inGa: string;
  postal: string;
  eircode?: string;
  council: CouncilId;
  zone: ZoneId;
  lat: number;
  lng: number;
  housing: HousingId[];
  commercial: CommercialId;
  intro: [string, string];
  insight: [string, string];
}

const a = (d: Def): Area => ({
  id: d.id,
  name: { en: d.en, ga: d.ga },
  inGa: d.inGa,
  slug: { en: d.id, ga: slugify(d.ga) },
  postal: d.postal,
  eircode: d.eircode,
  council: d.council,
  zone: d.zone,
  lat: d.lat,
  lng: d.lng,
  housing: d.housing,
  commercial: d.commercial,
  intro: { en: d.intro[0], ga: d.intro[1] },
  insight: { en: d.insight[0], ga: d.insight[1] },
});

export const areas: Area[] = [
  /* ------------------------------------------------------------ Zone 1 */
  a({
    id: 'dublin-city-centre', en: 'Dublin City Centre', ga: 'Lár na Cathrach', inGa: 'i Lár na Cathrach',
    postal: 'Dublin 1 & 2', eircode: 'D01 · D02', council: 'dcc', zone: 1, lat: 53.3498, lng: -6.2603,
    housing: ['georgian', 'apartment'], commercial: 'cityRetail',
    intro: [
      'From Georgian offices around Merrion Square to apartments off Capel Street, the city centre keeps us busy with fitted storage for compact homes and signage for shops, cafés and bars competing for attention on some of Ireland’s busiest streets.',
      'Ó oifigí Seoirseacha timpeall Chearnóg Mhuirfean go hárasáin in aice le Sráid Chéipil, coinníonn lár na cathrach gnóthach sinn le stóráil fheistithe do thithe beaga agus le comharthaíocht do shiopaí, do chaiféanna agus do bheáir atá san iomaíocht ar chuid de na sráideanna is gnóthaí in Éirinn.',
    ],
    insight: [
      'Parking and access take planning here, so our city-centre minimum visit includes parking. Many frontages sit within Architectural Conservation Areas, where Dublin City Council expects traditional, well-crafted signage — a brief we love.',
      'Bíonn pleanáil ag teastáil le haghaidh páirceála agus rochtana anseo, mar sin cuimsíonn ár gcuairt íosta i lár na cathrach páirceáil. Tá go leor aghaidheanna siopa laistigh de Limistéir Chaomhantais Ailtireachta, áit a mbíonn comharthaíocht thraidisiúnta ardchaighdeáin ag teastáil ó Chomhairle Cathrach Bhaile Átha Cliath — dúshlán a thaitníonn linn.',
    ],
  }),
  a({
    id: 'grand-canal-dock', en: 'Grand Canal Dock', ga: 'Duga na Canálach Móire', inGa: 'i nDuga na Canálach Móire',
    postal: 'Dublin 2 & 4', eircode: 'D02 · D04', council: 'dcc', zone: 1, lat: 53.3394, lng: -6.2386,
    housing: ['apartment', 'newbuild'], commercial: 'business',
    intro: [
      'Home to tech campuses, waterside apartments and a growing restaurant scene, Grand Canal Dock and the wider Docklands combine compact modern living with some of the city’s most image-conscious businesses.',
      'Is baile é do champais teicneolaíochta, d’árasáin cois uisce agus do radharc bialann atá ag fás, agus cuireann Duga na Canálach Móire agus na Duganna i gcoitinne maireachtáil nua-aimseartha dhlúth le chéile le cuid de na gnólachtaí sa chathair is mó a thugann aird ar a n-íomhá.',
    ],
    insight: [
      'Most homes here are apartments with management companies, so we pre-book lifts and loading bays and keep noise to agreed hours. For offices we produce reception logos, wayfinding and glass manifestation to building specifications.',
      'Árasáin le cuideachtaí bainistíochta is ea formhór na dtithe anseo, mar sin cuirimid ardaitheoirí agus bánna lódála in áirithe roimh ré agus coinnímid torann laistigh de na huaireanta comhaontaithe. D’oifigí, déanaimid lógónna fáiltithe, treoshuíomh agus marcáil gloine de réir shonraíochtaí an fhoirgnimh.',
    ],
  }),
  a({
    id: 'smithfield', en: 'Smithfield', ga: 'Margadh na Feirme', inGa: 'i Margadh na Feirme',
    postal: 'Dublin 7', eircode: 'D07', council: 'dcc', zone: 1, lat: 53.3478, lng: -6.2785,
    housing: ['apartment', 'cottage'], commercial: 'cityRetail',
    intro: [
      'Smithfield’s cobbled square, distillery heritage and new apartment blocks make it one of Dublin’s most characterful neighbourhoods — and a great fit for craft-led signage and space-saving joinery.',
      'Lena cearnóg dhuirlinge, a hoidhreacht drioglainne agus a bloic nua árasán, tá Margadh na Feirme ar cheann de na comharsanachtaí is mó carachtar i mBaile Átha Cliath — agus oireann sé go maith do chomharthaíocht cheardaíochta agus do shiúinéireacht a shábhálann spás.',
    ],
    insight: [
      'Apartments around the square often have open-plan living spaces that benefit from media walls and hall storage, while the independent bars, cafés and studios nearby suit carved timber and hand-painted signs.',
      'Is minic a bhíonn spásanna maireachtála oscailte in árasáin timpeall na cearnóige a bhaineann leas as ballaí meán agus stóráil halla, agus oireann comharthaí adhmaid snoite agus lámhphéinteáilte do na beáir, caiféanna agus stiúideonna neamhspleácha in aice láimhe.',
    ],
  }),
  a({
    id: 'stoneybatter', en: 'Stoneybatter', ga: 'Bóthar na gCloch', inGa: 'i mBóthar na gCloch',
    postal: 'Dublin 7', eircode: 'D07', council: 'dcc', zone: 1, lat: 53.3519, lng: -6.2854,
    housing: ['cottage', 'victorian'], commercial: 'village',
    intro: [
      'Stoneybatter’s artisan cottages and red-brick terraces are full of character — and full of small rooms where every centimetre of storage matters. It’s a neighbourhood made for bespoke joinery.',
      'Tá teachíní ceardaithe agus ardáin bríce dearga Bhóthar na gCloch lán de charachtar — agus lán de sheomraí beaga ina bhfuil gach ceintiméadar stórála tábhachtach. Is comharsanacht í atá déanta do shiúinéireacht shaincheaptha.',
    ],
    insight: [
      'Low ceilings, uneven walls and narrow streets are the norm, so we measure precisely, scribe units on site and plan deliveries carefully. The local café and pub scene suits traditional painted and carved signage.',
      'Is gnách síleálacha ísle, ballaí míchothroma agus sráideanna cúnga anseo, mar sin tomhaisimid go beacht, oiriúnaímid aonaid ar an láthair agus pleanálaimid seachadtaí go cúramach. Oireann comharthaíocht thraidisiúnta phéinteáilte agus shnoite do na caiféanna agus tithe tábhairne áitiúla.',
    ],
  }),
  a({
    id: 'phibsborough', en: 'Phibsborough', ga: 'Baile Phib', inGa: 'i mBaile Phib',
    postal: 'Dublin 7', eircode: 'D07', council: 'dcc', zone: 1, lat: 53.3601, lng: -6.2731,
    housing: ['victorian', 'interwar'], commercial: 'village',
    intro: [
      'Phibsborough mixes Victorian terraces, 1930s houses and a lively village centre near the Royal Canal and Dalymount Park. We build alcove units, fitted wardrobes and kitchen upgrades for its period homes.',
      'Meascann Baile Phib ardáin Victeoiriacha, tithe ó na 1930idí agus lár sráidbhaile bríomhar in aice leis an gCanáil Ríoga agus le Páirc Dalymount. Tógaimid aonaid chuasa, vardrúis fheistithe agus uasghráduithe cistine dá thithe seanré.',
    ],
    insight: [
      'Many Phibsborough houses have tall front rooms with chimney breasts — perfect for alcove cupboards and shelving. On-street parking is tight, so we schedule visits to keep disruption for neighbours to a minimum.',
      'Bíonn seomraí tosaigh arda le brollaigh simléir ag go leor tithe i mBaile Phib — iontach do chófraí cuasa agus do sheilfeanna. Bíonn páirceáil ar an tsráid teoranta, mar sin sceidealaímid cuairteanna chun an cur isteach ar chomharsana a choinneáil chomh híseal agus is féidir.',
    ],
  }),
  a({
    id: 'the-liberties', en: 'The Liberties', ga: 'Na Saoirsí', inGa: 'sna Saoirsí',
    postal: 'Dublin 8', eircode: 'D08', council: 'dcc', zone: 1, lat: 53.3404, lng: -6.2769,
    housing: ['cottage', 'apartment'], commercial: 'cityRetail',
    intro: [
      'One of Dublin’s oldest neighbourhoods, the Liberties blends artisan cottages, new apartments, markets and distilleries. Its makers and independent traders appreciate signage and joinery with real craft behind it.',
      'Ar cheann de na comharsanachtaí is sine i mBaile Átha Cliath, cuireann na Saoirsí teachíní ceardaithe, árasáin nua, margaí agus drioglanna le chéile. Is mór ag a ndéantóirí agus a dtrádálaithe neamhspleácha comharthaíocht agus siúinéireacht a bhfuil fíorcheird taobh thiar di.',
    ],
    insight: [
      'Cottage interiors here reward made-to-measure storage that fits low ceilings and irregular walls, while the area’s heritage streetscape suits traditional signwriting, timber fascias and projecting signs.',
      'Tugann taobh istigh na dteachíní anseo luach saothair do stóráil de réir tomhais a oireann do shíleálacha ísle agus do bhallaí neamhrialta, agus oireann sráid-dreach oidhreachta an cheantair do litreoireacht thraidisiúnta, do chláir aghaidhe adhmaid agus do chomharthaí crochta.',
    ],
  }),
  a({
    id: 'kilmainham', en: 'Kilmainham & Inchicore', ga: 'Cill Mhaighneann', inGa: 'i gCill Mhaighneann',
    postal: 'Dublin 8', eircode: 'D08', council: 'dcc', zone: 1, lat: 53.3416, lng: -6.3075,
    housing: ['cottage', 'victorian', 'apartment'], commercial: 'village',
    intro: [
      'From the railway cottages of Inchicore to new apartments near the Royal Hospital, Kilmainham is a mix of old and new — and a steady source of fitted wardrobe, alcove and kitchen projects.',
      'Ó theachíní iarnróid Inse Chór go hárasáin nua in aice leis an Ospidéal Ríoga, is meascán den sean agus den nua é Cill Mhaighneann — agus foinse leanúnach tionscadal vardrús feistithe, cuas agus cistineacha.',
    ],
    insight: [
      'Railway-era cottages have compact rooms where built-in storage makes a real difference. We often recommend sliding-door wardrobes and under-stairs pull-outs to free up floor space.',
      'Bíonn seomraí dlútha i dteachíní ó ré an iarnróid, áit a ndéanann stóráil ionsuite fíordhifríocht. Is minic a mholaimid vardrúis le doirse sleamhnáin agus tarraingtí faoin staighre chun spás urláir a shaoradh.',
    ],
  }),

  /* ------------------------------------------------------------ Zone 2 */
  a({
    id: 'ringsend', en: 'Ringsend & Irishtown', ga: 'An Rinn', inGa: 'sa Rinn',
    postal: 'Dublin 4', eircode: 'D04', council: 'dcc', zone: 2, lat: 53.3417, lng: -6.2263,
    housing: ['cottage', 'apartment'], commercial: 'village',
    intro: [
      'Ringsend and Irishtown combine fishermen’s cottages, red-brick terraces and modern waterside apartments, minutes from the Docklands and Sandymount Strand.',
      'Cuireann an Rinn agus Irishtown teachíní iascairí, ardáin bríce dearga agus árasáin nua-aimseartha cois uisce le chéile, cúpla nóiméad ó na Duganna agus ó Thrá Dhumhach Thrá.',
    ],
    insight: [
      'Small cottage rooms benefit from wardrobes and storage built tight to the ceiling, and nearby apartment blocks need careful delivery planning — both of which we plan for from the first survey.',
      'Baineann seomraí beaga teachíní leas as vardrúis agus as stóráil tógtha go dtí an tsíleáil, agus teastaíonn pleanáil chúramach seachadta ó bhloic árasán in aice láimhe — rudaí a phleanálaimid ón gcéad suirbhé.',
    ],
  }),
  a({
    id: 'ballsbridge', en: 'Ballsbridge', ga: 'Droichead na Dothra', inGa: 'i nDroichead na Dothra',
    postal: 'Dublin 4', eircode: 'D04', council: 'dcc', zone: 2, lat: 53.3289, lng: -6.2311,
    housing: ['victorian', 'detached', 'apartment'], commercial: 'business',
    intro: [
      'Embassy-lined avenues, grand Victorian and Edwardian houses and high-spec apartments make Ballsbridge one of Dublin’s most prestigious addresses — and a place where joinery has to be flawless.',
      'Le hascaillí lán d’ambasáidí, le tithe móra Victeoiriacha agus Éadbhardacha agus le hárasáin ardsonraíochta, tá Droichead na Dothra ar cheann de na seoltaí is mó le rá i mBaile Átha Cliath — agus áit nach mór don siúinéireacht a bheith gan locht.',
    ],
    insight: [
      'Large period rooms suit walk-in wardrobes, library shelving and in-frame kitchens. Many properties are protected structures, so we design fitted furniture that installs without altering original features.',
      'Oireann seomraí móra seanré do vardrúis siúil isteach, do sheilfeanna leabharlainne agus do chistineacha i bhfráma. Is struchtúir chosanta iad go leor foirgneamh, mar sin dearaimid troscán feistithe a shuiteáiltear gan gnéithe bunaidh a athrú.',
    ],
  }),
  a({
    id: 'donnybrook', en: 'Donnybrook', ga: 'Domhnach Broc', inGa: 'i nDomhnach Broc',
    postal: 'Dublin 4', eircode: 'D04', council: 'dcc', zone: 2, lat: 53.3215, lng: -6.2369,
    housing: ['victorian', 'detached'], commercial: 'village',
    intro: [
      'Donnybrook’s leafy roads of Victorian and Edwardian homes and its village of delis, salons and restaurants make it a natural home for premium joinery and refined shopfront signage.',
      'Le bóithre duilleacha de thithe Victeoiriacha agus Éadbhardacha agus a shráidbhaile siopaí bia, salón agus bialann, is áit nádúrtha é Domhnach Broc do shiúinéireacht den scoth agus do chomharthaíocht aghaidhe siopa scagtha.',
    ],
    insight: [
      'Bay-windowed bedrooms and tall living rooms are ideal for bespoke wardrobes and alcove units, while the village’s independent businesses favour elegant, understated signage.',
      'Tá seomraí leapa le fuinneoga bá agus seomraí suí arda iontach do vardrúis shaincheaptha agus d’aonaid chuasa, agus is fearr le gnólachtaí neamhspleácha an tsráidbhaile comharthaíocht ghalánta shrianta.',
    ],
  }),
  a({
    id: 'sandymount', en: 'Sandymount', ga: 'Dumhach Thrá', inGa: 'i nDumhach Thrá',
    postal: 'Dublin 4', eircode: 'D04', council: 'dcc', zone: 2, lat: 53.333, lng: -6.2153,
    housing: ['victorian', 'coastal', 'cottage'], commercial: 'village',
    intro: [
      'With its village green, seafront and streets of red-brick terraces, Sandymount is one of Dublin’s best-loved neighbourhoods. Its period homes are perfect for fitted wardrobes, alcove units and garden-facing kitchens.',
      'Le faiche an tsráidbhaile, an cladach agus sráideanna d’ardáin bríce dearga, tá Dumhach Thrá ar cheann de na comharsanachtaí is ansa le muintir Bhaile Átha Cliath. Tá a thithe seanré foirfe do vardrúis fheistithe, d’aonaid chuasa agus do chistineacha os comhair an ghairdín.',
    ],
    insight: [
      'Sea air near the strand means we specify moisture-resistant boards and durable finishes. Village shops around the green suit painted timber fascias and projecting signs.',
      'Ciallaíonn aer na farraige in aice na trá go sonraímid cláir fhrithfhliuchra agus bailchríocha marthanacha. Oireann cláir aghaidhe adhmaid phéinteáilte agus comharthaí crochta do shiopaí an tsráidbhaile timpeall na faiche.',
    ],
  }),
  a({
    id: 'rathmines', en: 'Rathmines', ga: 'Ráth Maonais', inGa: 'i Ráth Maonais',
    postal: 'Dublin 6', eircode: 'D06', council: 'dcc', zone: 2, lat: 53.3215, lng: -6.2655,
    housing: ['victorian', 'apartment'], commercial: 'village',
    intro: [
      'Rathmines is red-brick Dublin at its best: Victorian terraces, converted flats and a busy main street beneath the old town hall clock tower. Its period homes are made for alcove units, built-in wardrobes and clever storage.',
      'Is é Ráth Maonais Baile Átha Cliath na mbrící dearga ar a fheabhas: ardáin Victeoiriacha, árasáin athchóirithe agus príomhshráid ghnóthach faoi thúr cloig an tseanhalla baile. Tá a thithe seanré déanta d’aonaid chuasa, do vardrúis ionsuite agus do stóráil chliste.',
    ],
    insight: [
      'Many Rathmines houses are divided into flats with tight rooms and high ceilings, so storage that goes up rather than out is key. The main street’s cafés, salons and shops are a natural fit for our signage work.',
      'Tá go leor tithe i Ráth Maonais roinnte ina n-árasáin le seomraí teanna agus síleálacha arda, mar sin is é stóráil a théann suas seachas amach an eochair. Oireann caiféanna, salóin agus siopaí na príomhshráide go nádúrtha dár gcuid oibre comharthaíochta.',
    ],
  }),
  a({
    id: 'ranelagh', en: 'Ranelagh', ga: 'Raghnallach', inGa: 'i Raghnallach',
    postal: 'Dublin 6', eircode: 'D06', council: 'dcc', zone: 2, lat: 53.326, lng: -6.256,
    housing: ['victorian', 'cottage'], commercial: 'village',
    intro: [
      'Ranelagh’s village of restaurants, wine bars and boutiques sits among some of Dublin’s most sought-after Victorian and Edwardian streets — homes where owners invest in quality joinery that lasts.',
      'Tá sráidbhaile bialann, beár fíona agus siopaí faisin Raghnallach suite i measc cuid de na sráideanna Victeoiriacha agus Éadbhardacha is mó éileamh i mBaile Átha Cliath — tithe ina n-infheistíonn úinéirí i siúinéireacht ardchaighdeáin a mhaireann.',
    ],
    insight: [
      'Rear returns and kitchen extensions are common, so we design kitchens that bridge old and new. Chimney-breast alcoves in front rooms are ideal for media units and bookcases.',
      'Is coitianta síntí cúil agus síntí cistine, mar sin dearaimid cistineacha a nascann an sean agus an nua. Tá cuasa brollach simléir sna seomraí tosaigh iontach d’aonaid mheán agus do leabhragáin.',
    ],
  }),
  a({
    id: 'rathgar', en: 'Rathgar', ga: 'Ráth Garbh', inGa: 'i Ráth Garbh',
    postal: 'Dublin 6', eircode: 'D06', council: 'dcc', zone: 2, lat: 53.3125, lng: -6.2742,
    housing: ['victorian', 'detached'], commercial: 'village',
    intro: [
      'Rathgar’s wide avenues of substantial Victorian houses are some of the finest in the city. Owners here value craftsmanship — bespoke wardrobes, library shelving and kitchens that respect the character of the house.',
      'Tá ascaillí leathana Ráth Garbh, lena dtithe móra Victeoiriacha, i measc na n-ascaillí is breátha sa chathair. Is mór ag na húinéirí anseo ceardaíocht — vardrúis shaincheaptha, seilfeanna leabharlainne agus cistineacha a thugann ómós do charachtar an tí.',
    ],
    insight: [
      'Ceilings above three metres are common, so we build wardrobes and bookcases with top sections or library ladders to use the full height. The village shops on Rathgar Road suit classic painted signage.',
      'Is coitianta síleálacha os cionn trí mhéadar, mar sin tógaimid vardrúis agus leabhragáin le rannóga uachtaracha nó le dréimirí leabharlainne chun an airde iomlán a úsáid. Oireann comharthaíocht phéinteáilte chlasaiceach do shiopaí an tsráidbhaile ar Bhóthar Ráth Garbh.',
    ],
  }),
  a({
    id: 'terenure', en: 'Terenure', ga: 'Tír an Iúir', inGa: 'i dTír an Iúir',
    postal: 'Dublin 6W', eircode: 'D6W', council: 'dcc', zone: 2, lat: 53.3095, lng: -6.2848,
    housing: ['victorian', 'interwar', 'suburban'], commercial: 'village',
    intro: [
      'Terenure blends Edwardian red-bricks, 1930s semis and family homes around Bushy Park, with a lively village crossroads. It’s one of the most varied areas we work in for wardrobes, kitchens and built-ins.',
      'Meascann Tír an Iúir brící dearga Éadbhardacha, tithe leathscoite ó na 1930idí agus tithe teaghlaigh timpeall ar Pháirc Bushy, le crosbhóthar sráidbhaile bríomhar. Tá sé ar cheann de na ceantair is éagsúla a n-oibrímid iontu do vardrúis, do chistineacha agus d’aonaid ionsuite.',
    ],
    insight: [
      'Family homes here often need storage that grows with the household — fitted wardrobes in every bedroom, boot-room benches and under-stairs pull-outs. The village’s shops and cafés suit warm, crafted signage.',
      'Is minic a bhíonn stóráil ag teastáil ó thithe teaghlaigh anseo a fhásann leis an teaghlach — vardrúis fheistithe i ngach seomra leapa, binsí seomra buataisí agus tarraingtí faoin staighre. Oireann comharthaíocht theolaí cheardaithe do shiopaí agus do chaiféanna an tsráidbhaile.',
    ],
  }),
  a({
    id: 'harolds-cross', en: 'Harold’s Cross', ga: 'Cros Araild', inGa: 'i gCros Araild',
    postal: 'Dublin 6W', eircode: 'D6W', council: 'dcc', zone: 2, lat: 53.3258, lng: -6.2792,
    housing: ['victorian', 'cottage'], commercial: 'village',
    intro: [
      'Just south of the Grand Canal, Harold’s Cross is a neighbourhood of red-brick terraces and cottages where clever, made-to-measure storage makes compact homes work.',
      'Díreach ó dheas den Chanáil Mhór, is comharsanacht ardán bríce dearga agus teachíní é Cros Araild, áit a gcuireann stóráil chliste de réir tomhais tithe dlútha ag obair.',
    ],
    insight: [
      'Two-up, two-down terraces and cottages benefit most from wardrobes built into alcoves, storage over the stair bulkhead and under-stairs pull-outs — space a standard wardrobe can never use.',
      'Is iad ardáin agus teachíní beaga is mó a bhaineann leas as vardrúis tógtha isteach i gcuasa, as stóráil os cionn chófra an staighre agus as tarraingtí faoin staighre — spás nach féidir le gnáthvardrús a úsáid riamh.',
    ],
  }),
  a({
    id: 'templeogue', en: 'Templeogue', ga: 'Teach Mealóg', inGa: 'i dTeach Mealóg',
    postal: 'Dublin 6W', eircode: 'D6W', council: 'sdcc', zone: 2, lat: 53.2952, lng: -6.306,
    housing: ['suburban', 'interwar'], commercial: 'suburbanParade',
    intro: [
      'Templeogue’s quiet roads of 1950s–70s family homes along the River Dodder are classic territory for kitchen extensions, fitted wardrobes and attic-conversion storage.',
      'Is talamh clasaiceach do shíntí cistine, do vardrúis fheistithe agus do stóráil tiontaithe áiléir iad bóithre ciúine Theach Mealóg, lena dtithe teaghlaigh ó na 1950idí–70idí feadh Abhainn na Dothra.',
    ],
    insight: [
      'Original built-in wardrobes from the 1970s are often due for replacement; we strip them out and build full-height wardrobes with modern interiors. Easy parking makes installation days straightforward.',
      'Is minic go bhfuil vardrúis ionsuite bunaidh ó na 1970idí in am a n-athsholáthair; bainimid amach iad agus tógaimid vardrúis lánairde le taobh istigh nua-aimseartha. Déanann páirceáil éasca laethanta suiteála simplí.',
    ],
  }),
  a({
    id: 'crumlin', en: 'Crumlin', ga: 'Cromghlinn', inGa: 'i gCromghlinn',
    postal: 'Dublin 12', eircode: 'D12', council: 'dcc', zone: 2, lat: 53.3205, lng: -6.3135,
    housing: ['interwar'], commercial: 'suburbanParade',
    intro: [
      'Crumlin’s 1930s and 1940s terraces and semis are some of Dublin’s best-built homes, and many are now being extended and modernised by a new generation of owners.',
      'Tá ardáin agus tithe leathscoite Chromghlinn ó na 1930idí agus na 1940idí i measc na dtithe is fearr tógtha i mBaile Átha Cliath, agus tá go leor acu á síneadh agus á nuachóiriú anois ag glúin nua úinéirí.',
    ],
    insight: [
      'Compact bedrooms make sliding-door wardrobes a smart choice, and rear extensions open the door to new kitchens. Local shopping parades suit bright, legible panel signs and lightboxes.',
      'Fágann seomraí leapa dlútha gur rogha chliste iad vardrúis le doirse sleamhnáin, agus osclaíonn síntí cúil an doras do chistineacha nua. Oireann comharthaí painéil gheala inléite agus boscaí solais do pharáidí siopadóireachta áitiúla.',
    ],
  }),
  a({
    id: 'rathfarnham', en: 'Rathfarnham', ga: 'Ráth Fearnáin', inGa: 'i Ráth Fearnáin',
    postal: 'Dublin 14', eircode: 'D14', council: 'sdcc', zone: 2, lat: 53.2985, lng: -6.2835,
    housing: ['suburban', 'interwar', 'detached'], commercial: 'village',
    intro: [
      'From the village and Rathfarnham Castle to family estates rising towards the mountains, Rathfarnham is full of homes ready for new kitchens, fitted wardrobes and media walls.',
      'Ón sráidbhaile agus Caisleán Ráth Fearnáin go heastáit teaghlaigh ag dul i dtreo na sléibhte, tá Ráth Fearnáin lán de thithe atá réidh do chistineacha nua, do vardrúis fheistithe agus do bhallaí meán.',
    ],
    insight: [
      'Many 1960s–80s houses here have been extended, creating open-plan spaces that suit islands and media walls. Attic conversions with sloped ceilings are ideal for made-to-measure eaves storage.',
      'Síníodh go leor tithe ó na 1960idí–80idí anseo, rud a chruthaíonn spásanna oscailte a oireann d’oileáin agus do bhallaí meán. Tá tiontuithe áiléir le síleálacha claonta foirfe do stóráil de réir tomhais faoin díon.',
    ],
  }),
  a({
    id: 'churchtown', en: 'Churchtown', ga: 'Baile Thaidhg', inGa: 'i mBaile Thaidhg',
    postal: 'Dublin 14', eircode: 'D14', council: 'dlr', zone: 2, lat: 53.297, lng: -6.256,
    housing: ['suburban'], commercial: 'suburbanParade',
    intro: [
      'Churchtown’s well-kept 1950s–70s semis and bungalows, close to Dundrum and the Luas, are popular with families upgrading kitchens, wardrobes and home offices.',
      'Is mór ag teaghlaigh tithe leathscoite agus bungalónna dea-choimeádta Bhaile Thaidhg ó na 1950idí–70idí, gar do Dhún Droma agus don Luas, agus iad ag uasghrádú cistineacha, vardrús agus oifigí baile.',
    ],
    insight: [
      'Bungalows here often have generous attics and wide bedrooms — great for full-width sliding wardrobes and converted-attic storage. We also fit out home offices for people working remotely.',
      'Is minic a bhíonn áiléir fhairsinge agus seomraí leapa leathana i mbungalónna anseo — iontach do vardrúis sleamhnáin lánleithid agus do stóráil áiléir thiontaithe. Feistímid oifigí baile freisin do dhaoine atá ag cianobair.',
    ],
  }),
  a({
    id: 'dundrum', en: 'Dundrum', ga: 'Dún Droma', inGa: 'i nDún Droma',
    postal: 'Dublin 14 & 16', eircode: 'D14 · D16', council: 'dlr', zone: 2, lat: 53.2893, lng: -6.2441,
    housing: ['suburban', 'apartment'], commercial: 'suburbanParade',
    intro: [
      'Dundrum combines one of Ireland’s biggest shopping centres with an old village core, modern apartments and established family suburbs — a mix that calls for both home joinery and retail signage.',
      'Cuireann Dún Droma ceann de na hionaid siopadóireachta is mó in Éirinn le chéile le croílár seanshráidbhaile, le hárasáin nua-aimseartha agus le bruachbhailte teaghlaigh seanbhunaithe — meascán a éilíonn siúinéireacht baile agus comharthaíocht mhiondíola araon.',
    ],
    insight: [
      'Apartments near the Luas need compact, high-capacity wardrobes and media units, while older semis suit kitchen extensions. Retail units here often work to centre-management signage specifications, which we can follow.',
      'Teastaíonn vardrúis agus aonaid mheán dhlútha ardtoillte ó árasáin in aice leis an Luas, agus oireann síntí cistine do thithe leathscoite níos sine. Is minic a oibríonn aonaid mhiondíola anseo de réir shonraíochtaí comharthaíochta bhainistíocht an ionaid, rud is féidir linn a leanúint.',
    ],
  }),
  a({
    id: 'drumcondra', en: 'Drumcondra', ga: 'Droim Conrach', inGa: 'i nDroim Conrach',
    postal: 'Dublin 9', eircode: 'D09', council: 'dcc', zone: 2, lat: 53.37, lng: -6.2542,
    housing: ['victorian', 'interwar'], commercial: 'village',
    intro: [
      'Close to Croke Park and DCU, Drumcondra’s red-brick terraces and 1930s homes are a favourite with families and young professionals renovating period houses.',
      'Gar do Pháirc an Chrócaigh agus do DCU, is mór ag teaghlaigh agus ag gairmithe óga atá ag athchóiriú tithe seanré ardáin bríce dearga agus tithe 1930idí Dhroim Conrach.',
    ],
    insight: [
      'Terraced houses here have tall front rooms with alcoves and deep return kitchens. Match-day traffic means we plan installations around Croke Park fixtures.',
      'Bíonn seomraí tosaigh arda le cuasa agus cistineacha domhaine sa síneadh cúil i dtithe sraithe anseo. Ciallaíonn trácht laethanta cluiche go bpleanálaimid suiteálacha timpeall ar chluichí i bPáirc an Chrócaigh.',
    ],
  }),
  a({
    id: 'glasnevin', en: 'Glasnevin', ga: 'Glas Naíon', inGa: 'i nGlas Naíon',
    postal: 'Dublin 9 & 11', eircode: 'D09 · D11', council: 'dcc', zone: 2, lat: 53.3727, lng: -6.2723,
    housing: ['victorian', 'interwar', 'suburban'], commercial: 'village',
    intro: [
      'Glasnevin, home to the Botanic Gardens and leafy roads of Edwardian and 1930s houses, is a neighbourhood where homeowners invest in kitchens, wardrobes and built-ins that suit the house.',
      'Is comharsanacht é Glas Naíon, baile na nGairdíní Luibheolaíochta agus bóithre duilleacha de thithe Éadbhardacha agus 1930idí, ina n-infheistíonn úinéirí tí i gcistineacha, i vardrúis agus in aonaid ionsuite a oireann don teach.',
    ],
    insight: [
      'Bay-windowed bedrooms and chimney breasts are common, so fitted wardrobes are designed around them rather than against them. Garden-facing extensions are ideal for new kitchens with an island.',
      'Is coitianta seomraí leapa le fuinneoga bá agus brollaigh simléir, mar sin dearaimid vardrúis fheistithe timpeall orthu seachas ina gcoinne. Tá síntí os comhair an ghairdín iontach do chistineacha nua le hoileán.',
    ],
  }),
  a({
    id: 'clontarf', en: 'Clontarf', ga: 'Cluain Tarbh', inGa: 'i gCluain Tarbh',
    postal: 'Dublin 3', eircode: 'D03', council: 'dcc', zone: 2, lat: 53.3646, lng: -6.208,
    housing: ['victorian', 'coastal', 'suburban'], commercial: 'village',
    intro: [
      'Clontarf’s seafront promenade, Victorian villas and family homes make it one of the northside’s most desirable suburbs — and a place where quality fitted furniture is expected.',
      'Le promanáid cois farraige, villaí Victeoiriacha agus tithe teaghlaigh, tá Cluain Tarbh ar cheann de na bruachbhailte is inmhianaithe ar an taobh ó thuaidh — agus áit a mbítear ag súil le troscán feistithe ardchaighdeáin.',
    ],
    insight: [
      'Sea-facing homes benefit from moisture-resistant materials and finishes. Larger period houses suit walk-in wardrobes and boot rooms, while the shops on Vernon Avenue suit elegant timber signage.',
      'Baineann tithe os comhair na farraige leas as ábhair agus bailchríocha frithfhliuchra. Oireann vardrúis siúil isteach agus seomraí buataisí do thithe seanré níos mó, agus oireann comharthaíocht adhmaid ghalánta do na siopaí ar Ascaill Vernon.',
    ],
  }),
  a({
    id: 'raheny', en: 'Raheny', ga: 'Ráth Eanaigh', inGa: 'i Ráth Eanaigh',
    postal: 'Dublin 5', eircode: 'D05', council: 'dcc', zone: 2, lat: 53.3815, lng: -6.176,
    housing: ['suburban'], commercial: 'village',
    intro: [
      'Raheny’s family estates, village centre and St Anne’s Park make it a popular northside suburb for families renovating 1950s–70s homes.',
      'Lena eastáit teaghlaigh, lár an tsráidbhaile agus Páirc Naomh Anna, is bruachbhaile coitianta ar an taobh ó thuaidh é Ráth Eanaigh do theaghlaigh atá ag athchóiriú tithe ó na 1950idí–70idí.',
    ],
    insight: [
      'Typical three-bed semis here suit full-height sliding wardrobes and kitchen extensions that open into the garden. Village shops suit classic fascias and projecting signs.',
      'Oireann vardrúis sleamhnáin lánairde agus síntí cistine a osclaíonn amach ar an ngairdín do ghnáth-thithe leathscoite trí sheomra leapa anseo. Oireann cláir aghaidhe chlasaiceacha agus comharthaí crochta do shiopaí an tsráidbhaile.',
    ],
  }),
  a({
    id: 'santry', en: 'Santry', ga: 'Seantrabh', inGa: 'i Seantrabh',
    postal: 'Dublin 9', eircode: 'D09', council: 'dcc', zone: 2, lat: 53.394, lng: -6.248,
    housing: ['suburban', 'apartment', 'estate'], commercial: 'business',
    intro: [
      'Between the airport and the city, Santry combines established estates, new apartment developments and busy business parks — homes and workplaces that both need smart joinery and signage.',
      'Idir an t-aerfort agus an chathair, cuireann Seantrabh eastáit sheanbhunaithe, forbairtí nua árasán agus páirceanna gnó gnóthacha le chéile — tithe agus áiteanna oibre a dteastaíonn siúinéireacht agus comharthaíocht chliste uathu araon.',
    ],
    insight: [
      'New apartments here benefit from space-saving wardrobes and media units, while the business parks and hotels around Santry need reception signage and wayfinding.',
      'Baineann árasáin nua anseo leas as vardrúis agus as aonaid mheán a shábhálann spás, agus teastaíonn comharthaíocht fáiltithe agus treoshuíomh ó na páirceanna gnó agus ó na hóstáin timpeall Sheantrabh.',
    ],
  }),
  a({
    id: 'cabra', en: 'Cabra', ga: 'An Chabrach', inGa: 'sa Chabrach',
    postal: 'Dublin 7', eircode: 'D07', council: 'dcc', zone: 2, lat: 53.3651, lng: -6.2947,
    housing: ['interwar'], commercial: 'suburbanParade',
    intro: [
      'Cabra’s solid 1930s–40s houses near the Phoenix Park are increasingly popular with young families, many of whom are extending and modernising.',
      'Tá tóir ag éirí i measc teaghlach óg ar thithe láidre na Cabraí ó na 1930idí–40idí in aice le Páirc an Fhionnuisce, agus tá go leor acu á síneadh agus á nuachóiriú.',
    ],
    insight: [
      'Compact bedrooms suit sliding-door wardrobes, and box rooms often have a stair bulkhead we can build storage over. New rear extensions are the perfect spot for a family kitchen.',
      'Oireann vardrúis le doirse sleamhnáin do sheomraí leapa dlútha, agus is minic a bhíonn cófra staighre i seomraí bosca ar féidir linn stóráil a thógáil os a chionn. Is iad síntí cúil nua an áit fhoirfe do chistin teaghlaigh.',
    ],
  }),
  a({
    id: 'finglas', en: 'Finglas', ga: 'Fionnghlas', inGa: 'i bhFionnghlas',
    postal: 'Dublin 11', eircode: 'D11', council: 'dcc', zone: 2, lat: 53.39, lng: -6.298,
    housing: ['interwar', 'suburban', 'estate'], commercial: 'suburbanParade',
    intro: [
      'One of the northside’s largest suburbs, Finglas has a mix of 1950s–70s family homes, newer estates and a busy village and shopping centre.',
      'Ar cheann de na bruachbhailte is mó ar an taobh ó thuaidh, tá meascán i bhFionnghlas de thithe teaghlaigh ó na 1950idí–70idí, d’eastáit níos nuaí agus de shráidbhaile agus ionad siopadóireachta gnóthach.',
    ],
    insight: [
      'Families here often want the most storage for the money: fitted wardrobes, under-stairs pull-outs and flat-pack assembly. Local shops and takeaways suit bright fascia panels and lightboxes.',
      'Is minic a bhíonn an stóráil is mó ar an airgead ag teastáil ó theaghlaigh anseo: vardrúis fheistithe, tarraingtí faoin staighre agus cóimeáil flat-pack. Oireann painéil aghaidhe gheala agus boscaí solais do shiopaí agus do bhialanna beir leat áitiúla.',
    ],
  }),

  /* ------------------------------------------------------------ Zone 3 */
  a({
    id: 'blackrock', en: 'Blackrock', ga: 'An Charraig Dhubh', inGa: 'sa Charraig Dhubh',
    postal: 'Co. Dublin', eircode: 'A94', council: 'dlr', zone: 3, lat: 53.3015, lng: -6.1778,
    housing: ['victorian', 'coastal', 'apartment'], commercial: 'village',
    intro: [
      'Blackrock’s seafront villas, period terraces and busy village of shops and markets make it a southside favourite — and a natural fit for our wardrobes, kitchens and shopfront signs.',
      'Is rogha mhór ar an taobh ó dheas í an Charraig Dhubh lena villaí cois farraige, a hardáin seanré agus a sráidbhaile gnóthach siopaí agus margaí — agus oireann sí go nádúrtha dár vardrúis, dár gcistineacha agus dár gcomharthaí siopa.',
    ],
    insight: [
      'Period houses near the coast benefit from moisture-resistant boards and robust finishes. The village’s independent shops and restaurants suit crafted timber and gilded signage.',
      'Baineann tithe seanré in aice leis an gcósta leas as cláir fhrithfhliuchra agus as bailchríocha láidre. Oireann comharthaíocht adhmaid cheardaithe agus órnite do shiopaí agus do bhialanna neamhspleácha an tsráidbhaile.',
    ],
  }),
  a({
    id: 'stillorgan', en: 'Stillorgan', ga: 'Stigh Lorgan', inGa: 'i Stigh Lorgan',
    postal: 'Co. Dublin', eircode: 'A94', council: 'dlr', zone: 3, lat: 53.2888, lng: -6.199,
    housing: ['suburban', 'apartment'], commercial: 'suburbanParade',
    intro: [
      'Stillorgan’s 1950s–70s family homes and new apartment schemes around the village centre keep demand high for kitchen upgrades, sliding wardrobes and media walls.',
      'Coinníonn tithe teaghlaigh Stigh Lorgan ó na 1950idí–70idí agus na scéimeanna nua árasán timpeall lár an tsráidbhaile an t-éileamh ard ar uasghráduithe cistine, ar vardrúis sleamhnáin agus ar bhallaí meán.',
    ],
    insight: [
      'Many original houses here were among Dublin’s first modern suburbs and are now being extended. We design kitchens for these extensions and replace dated built-ins with modern fitted wardrobes.',
      'Bhí go leor de na tithe bunaidh anseo i measc na gcéad bhruachbhailte nua-aimseartha i mBaile Átha Cliath agus tá siad á síneadh anois. Dearaimid cistineacha do na síntí seo agus cuirimid vardrúis fheistithe nua-aimseartha in ionad seanaonad ionsuite.',
    ],
  }),
  a({
    id: 'dun-laoghaire', en: 'Dún Laoghaire', ga: 'Dún Laoghaire', inGa: 'i nDún Laoghaire',
    postal: 'Co. Dublin', eircode: 'A96', council: 'dlr', zone: 3, lat: 53.294, lng: -6.134,
    housing: ['victorian', 'coastal', 'apartment'], commercial: 'town',
    intro: [
      'With its harbour, piers and People’s Park, Dún Laoghaire is a seaside town of Victorian terraces, apartments and independent businesses along George’s Street.',
      'Lena chuan, a chéanna agus Páirc an Phobail, is baile cois farraige é Dún Laoghaire d’ardáin Victeoiriacha, d’árasáin agus de ghnólachtaí neamhspleácha feadh Shráid Sheoirse.',
    ],
    insight: [
      'Victorian houses here have high ceilings and chimney-breast alcoves — perfect for built-ins. Retailers and cafés on George’s Street benefit from striking signage that stands out to locals and visitors alike.',
      'Bíonn síleálacha arda agus cuasa brollach simléir i dtithe Victeoiriacha anseo — foirfe d’aonaid ionsuite. Baineann miondíoltóirí agus caiféanna ar Shráid Sheoirse leas as comharthaíocht shuntasach a sheasann amach do mhuintir na háite agus do chuairteoirí araon.',
    ],
  }),
  a({
    id: 'dalkey', en: 'Dalkey', ga: 'Deilginis', inGa: 'i nDeilginis',
    postal: 'Co. Dublin', eircode: 'A96', council: 'dlr', zone: 3, lat: 53.2775, lng: -6.1004,
    housing: ['coastal', 'detached', 'cottage'], commercial: 'village',
    intro: [
      'Dalkey’s medieval village, castle and coastal villas make it one of Ireland’s most picturesque places to live — and one where bespoke joinery has to match exceptional homes.',
      'Lena sráidbhaile meánaoiseach, a caisleán agus a villaí cósta, tá Deilginis ar cheann de na háiteanna is pictiúrtha in Éirinn le cónaí ann — agus áit nach mór do shiúinéireacht shaincheaptha a bheith inchurtha le tithe eisceachtúla.',
    ],
    insight: [
      'From fishermen’s cottages to clifftop houses, properties here vary hugely, so we design walk-in wardrobes, boot rooms and kitchens to suit each one. The heritage village centre suits hand-painted and gilded signage.',
      'Ó theachíní iascairí go tithe ar bharr na n-aillte, bíonn éagsúlacht mhór sna háitribh anseo, mar sin dearaimid vardrúis siúil isteach, seomraí buataisí agus cistineacha a oireann do gach ceann acu. Oireann comharthaíocht lámhphéinteáilte agus órnite do chroílár oidhreachta an tsráidbhaile.',
    ],
  }),
  a({
    id: 'killiney', en: 'Killiney', ga: 'Cill Iníon Léinín', inGa: 'i gCill Iníon Léinín',
    postal: 'Co. Dublin', eircode: 'A96', council: 'dlr', zone: 3, lat: 53.2633, lng: -6.1127,
    housing: ['detached', 'coastal'], commercial: 'village',
    intro: [
      'Killiney Hill and its sweeping bay views are home to some of Dublin’s most impressive houses — homes that call for dressing rooms, statement kitchens and libraries built to the highest standard.',
      'Tá cuid de na tithe is suntasaí i mBaile Átha Cliath ar Chnoc Chill Iníon Léinín agus a radharcanna leathana ar an gcuan — tithe a éilíonn seomraí feistis, cistineacha suntasacha agus leabharlanna tógtha ar an gcaighdeán is airde.',
    ],
    insight: [
      'Large rooms and high-end finishes call for detailed design and careful installation; we protect floors and staircases throughout and coordinate with architects and interior designers.',
      'Éilíonn seomraí móra agus bailchríocha ardleibhéil dearadh mionsonraithe agus suiteáil chúramach; cosnaímid urláir agus staighrí i gcaitheamh an ama agus comhordaímid le hailtirí agus le dearthóirí intí.',
    ],
  }),
  a({
    id: 'sandyford', en: 'Sandyford', ga: 'Áth an Ghainimh', inGa: 'in Áth an Ghainimh',
    postal: 'Dublin 18', eircode: 'D18', council: 'dlr', zone: 3, lat: 53.277, lng: -6.219,
    housing: ['apartment', 'newbuild'], commercial: 'business',
    intro: [
      'Sandyford’s business district, Luas-side apartments and new residential quarters make it a hub for both office signage and space-smart home joinery.',
      'Déanann ceantar gnó Áth an Ghainimh, na hárasáin in aice leis an Luas agus na ceathrúna cónaithe nua mol de do chomharthaíocht oifige agus do shiúinéireacht chliste don bhaile araon.',
    ],
    insight: [
      'Apartments here suit sliding and mirrored wardrobes, media units and hall storage. For the business park we produce building signage, reception logos and wayfinding to landlord specifications, installed out of hours.',
      'Oireann vardrúis sleamhnáin agus scátháin, aonaid mheán agus stóráil halla d’árasáin anseo. Don pháirc ghnó, déanaimid comharthaíocht foirgnimh, lógónna fáiltithe agus treoshuíomh de réir shonraíochtaí an tiarna talún, suiteáilte lasmuigh d’uaireanta gnó.',
    ],
  }),
  a({
    id: 'foxrock', en: 'Foxrock', ga: 'Carraig an tSionnaigh', inGa: 'i gCarraig an tSionnaigh',
    postal: 'Dublin 18', eircode: 'D18', council: 'dlr', zone: 3, lat: 53.2667, lng: -6.1739,
    housing: ['detached'], commercial: 'village',
    intro: [
      'Foxrock’s large detached houses on generous, tree-lined plots are among the most sought-after homes in Dublin. Projects here are about quality: walk-in wardrobes, in-frame kitchens and bespoke libraries.',
      'Tá tithe móra scoite Charraig an tSionnaigh ar cheapacha fairsinge crannacha i measc na dtithe is mó éileamh i mBaile Átha Cliath. Baineann tionscadail anseo le cáilíocht: vardrúis siúil isteach, cistineacha i bhfráma agus leabharlanna saincheaptha.',
    ],
    insight: [
      'Many homes are being extended or remodelled, so we coordinate joinery with architects and main contractors. Wide driveways and good access make larger installations efficient.',
      'Tá go leor tithe á síneadh nó á n-athmhúnlú, mar sin comhordaímid siúinéireacht le hailtirí agus le príomhchonraitheoirí. Déanann cabhsaí leathana agus rochtain mhaith suiteálacha móra éifeachtúil.',
    ],
  }),
  a({
    id: 'howth', en: 'Howth', ga: 'Binn Éadair', inGa: 'i mBinn Éadair',
    postal: 'Dublin 13', eircode: 'D13', council: 'fingal', zone: 3, lat: 53.3868, lng: -6.0656,
    housing: ['coastal', 'detached', 'cottage'], commercial: 'village',
    intro: [
      'Howth’s harbour village, cliff walks and hillside homes make it one of Dublin’s most distinctive places. Its seafood restaurants and shops need signage that stands up to the weather and the views.',
      'Lena sráidbhaile cuain, a siúlóidí aillte agus a tithe ar thaobh an chnoic, tá Binn Éadair ar cheann de na háiteanna is sainiúla i mBaile Átha Cliath. Teastaíonn comharthaíocht óna bhialanna bia mara agus óna shiopaí a sheasann suas don aimsir agus do na radharcanna.',
    ],
    insight: [
      'Salt air and exposed sites mean exterior signs need marine-grade fixings and finishes, which we specify as standard here. Hillside homes often have steep access, which we plan for at survey.',
      'Ciallaíonn aer goirt agus láithreáin nochta go dteastaíonn daingneáin agus bailchríocha de ghrád mara ó chomharthaí seachtracha, rud a shonraímid mar ghnáthchleachtas anseo. Is minic a bhíonn rochtain ghéar ar thithe ar an gcnoc, rud a phleanálaimid ag an suirbhé.',
    ],
  }),
  a({
    id: 'malahide', en: 'Malahide', ga: 'Mullach Íde', inGa: 'i Mullach Íde',
    postal: 'Co. Dublin', eircode: 'K36', council: 'fingal', zone: 3, lat: 53.4508, lng: -6.1544,
    housing: ['coastal', 'detached', 'estate'], commercial: 'village',
    intro: [
      'Malahide’s marina, castle and buzzing village make it one of north County Dublin’s most popular addresses, with everything from period homes to modern family estates.',
      'Le muiríne, caisleán agus sráidbhaile bríomhar, tá Mullach Íde ar cheann de na seoltaí is mó tóir i dtuaisceart Chontae Bhaile Átha Cliath, le gach rud ó thithe seanré go heastáit teaghlaigh nua-aimseartha.',
    ],
    insight: [
      'Family homes here often want a full upgrade — kitchen, wardrobes and media wall — which we can deliver as one coordinated project. The village’s boutiques and restaurants suit premium signage.',
      'Is minic a bhíonn uasghrádú iomlán ag teastáil ó thithe teaghlaigh anseo — cistin, vardrúis agus balla meán — rud is féidir linn a sheachadadh mar thionscadal comhordaithe amháin. Oireann comharthaíocht den scoth do shiopaí faisin agus do bhialanna an tsráidbhaile.',
    ],
  }),
  a({
    id: 'swords', en: 'Swords', ga: 'Sord', inGa: 'i Sord',
    postal: 'Co. Dublin', eircode: 'K67', council: 'fingal', zone: 3, lat: 53.4597, lng: -6.2181,
    housing: ['estate', 'newbuild', 'apartment'], commercial: 'town',
    intro: [
      'Fingal’s county town has grown fast, with large estates, new developments and a busy main street and shopping centres close to Dublin Airport.',
      'D’fhás príomhbhaile Fhine Gall go tapa, le heastáit mhóra, forbairtí nua agus príomhshráid agus ionaid siopadóireachta gnóthacha gar d’Aerfort Bhaile Átha Cliath.',
    ],
    insight: [
      'Houses from the 1990s and 2000s are ready for new kitchens and fitted wardrobes, and new builds need furniture assembled quickly. Main Street businesses and retail parks keep demand high for fascia signs and lightboxes.',
      'Tá tithe ó na 1990idí agus 2000idí réidh do chistineacha nua agus do vardrúis fheistithe, agus teastaíonn cóimeáil thapa troscáin ó thithe nua. Coinníonn gnólachtaí na Príomhshráide agus páirceanna miondíola an t-éileamh ard ar chláir aghaidhe agus ar bhoscaí solais.',
    ],
  }),
  a({
    id: 'castleknock', en: 'Castleknock', ga: 'Caisleán Cnucha', inGa: 'i gCaisleán Cnucha',
    postal: 'Dublin 15', eircode: 'D15', council: 'fingal', zone: 3, lat: 53.3725, lng: -6.3628,
    housing: ['suburban', 'detached', 'estate'], commercial: 'village',
    intro: [
      'Bordering the Phoenix Park, Castleknock is a leafy suburb of established family homes and larger detached houses, where kitchens, dressing rooms and home offices are popular projects.',
      'Ar theorainn Pháirc an Fhionnuisce, is bruachbhaile duilleach é Caisleán Cnucha de thithe teaghlaigh seanbhunaithe agus de thithe scoite níos mó, áit a bhfuil an-tóir ar chistineacha, ar sheomraí feistis agus ar oifigí baile.',
    ],
    insight: [
      'Many 1970s–90s homes here are being extended and remodelled, creating space for island kitchens and media walls. Larger bedrooms suit walk-in wardrobes.',
      'Tá go leor tithe ó na 1970idí–90idí anseo á síneadh agus á n-athmhúnlú, rud a chruthaíonn spás do chistineacha le hoileán agus do bhallaí meán. Oireann vardrúis siúil isteach do sheomraí leapa níos mó.',
    ],
  }),
  a({
    id: 'blanchardstown', en: 'Blanchardstown', ga: 'Baile Bhlainséir', inGa: 'i mBaile Bhlainséir',
    postal: 'Dublin 15', eircode: 'D15', council: 'fingal', zone: 3, lat: 53.3881, lng: -6.3772,
    housing: ['estate', 'newbuild', 'apartment'], commercial: 'business',
    intro: [
      'With one of Ireland’s largest shopping centres, major business parks and thousands of family homes, Blanchardstown needs home joinery and business signage in equal measure.',
      'Le ceann de na hionaid siopadóireachta is mó in Éirinn, páirceanna gnó móra agus na mílte teach teaghlaigh, teastaíonn siúinéireacht baile agus comharthaíocht ghnó araon i mBaile Bhlainséir.',
    ],
    insight: [
      'Estates from the 1990s–2000s suit kitchen and wardrobe upgrades, and new-build apartments need efficient storage. Business parks and retail units here often require signage to landlord specifications.',
      'Oireann uasghráduithe cistine agus vardrús d’eastáit ó na 1990idí–2000idí, agus teastaíonn stóráil éifeachtúil ó árasáin nua. Is minic a bhíonn comharthaíocht de réir shonraíochtaí an tiarna talún ag teastáil ó pháirceanna gnó agus ó aonaid mhiondíola anseo.',
    ],
  }),
  a({
    id: 'lucan', en: 'Lucan', ga: 'Leamhcán', inGa: 'i Leamhcán',
    postal: 'Co. Dublin', eircode: 'K78', council: 'sdcc', zone: 3, lat: 53.3574, lng: -6.4483,
    housing: ['estate', 'newbuild', 'cottage'], commercial: 'village',
    intro: [
      'Lucan’s historic village on the River Liffey is surrounded by large modern estates and new communities such as Adamstown — one of the busiest areas in west Dublin for family home upgrades.',
      'Tá sráidbhaile stairiúil Leamhcáin ar Abhainn na Life timpeallaithe ag eastáit mhóra nua-aimseartha agus ag pobail nua ar nós Bhaile Adaim — ceann de na ceantair is gnóthaí in iarthar Bhaile Átha Cliath d’uasghráduithe ar thithe teaghlaigh.',
    ],
    insight: [
      'Homes from the 1990s and 2000s here are prime candidates for new kitchens and fitted wardrobes, and new builds in Adamstown need furniture assembly and media walls. The village shops suit traditional fascias.',
      'Is iarrthóirí den scoth iad tithe ó na 1990idí agus 2000idí anseo do chistineacha nua agus do vardrúis fheistithe, agus teastaíonn cóimeáil troscáin agus ballaí meán ó thithe nua i mBaile Adaim. Oireann cláir aghaidhe thraidisiúnta do shiopaí an tsráidbhaile.',
    ],
  }),
  a({
    id: 'clondalkin', en: 'Clondalkin', ga: 'Cluain Dolcáin', inGa: 'i gCluain Dolcáin',
    postal: 'Dublin 22', eircode: 'D22', council: 'sdcc', zone: 3, lat: 53.3203, lng: -6.3944,
    housing: ['estate', 'suburban'], commercial: 'suburbanParade',
    intro: [
      'Clondalkin’s historic round-tower village is surrounded by family estates and business parks, making it a busy area for both home joinery and commercial signage.',
      'Tá sráidbhaile stairiúil an chloigthí i gCluain Dolcáin timpeallaithe ag eastáit teaghlaigh agus ag páirceanna gnó, rud a fhágann gur ceantar gnóthach é do shiúinéireacht baile agus do chomharthaíocht thráchtála araon.',
    ],
    insight: [
      'Families here look for practical, good-value storage — fitted wardrobes, under-stairs units and flat-pack assembly — while nearby industrial estates need durable building signs.',
      'Bíonn teaghlaigh anseo ag lorg stórála praiticiúla ar luach maith — vardrúis fheistithe, aonaid faoin staighre agus cóimeáil flat-pack — agus teastaíonn comharthaí foirgnimh marthanacha ó na heastáit thionsclaíocha in aice láimhe.',
    ],
  }),
  a({
    id: 'tallaght', en: 'Tallaght', ga: 'Tamhlacht', inGa: 'i dTamhlacht',
    postal: 'Dublin 24', eircode: 'D24', council: 'sdcc', zone: 3, lat: 53.288, lng: -6.373,
    housing: ['estate', 'suburban', 'apartment'], commercial: 'suburbanParade',
    intro: [
      'One of the largest communities in Ireland, Tallaght has everything from 1970s estates to new apartments around The Square, along with major hospitals, colleges and retail.',
      'Ar cheann de na pobail is mó in Éirinn, tá gach rud i dTamhlacht ó eastáit ó na 1970idí go hárasáin nua timpeall The Square, chomh maith le hospidéil, coláistí agus miondíol móra.',
    ],
    insight: [
      'With so many family homes, demand for fitted wardrobes, kitchen upgrades and flat-pack assembly is constant. Retail units and businesses around The Square often need lightboxes and fascia signs to centre specifications.',
      'Leis an oiread sin tithe teaghlaigh, bíonn éileamh leanúnach ar vardrúis fheistithe, ar uasghráduithe cistine agus ar chóimeáil flat-pack. Is minic a theastaíonn boscaí solais agus cláir aghaidhe de réir shonraíochtaí an ionaid ó aonaid mhiondíola agus ó ghnólachtaí timpeall The Square.',
    ],
  }),
  a({
    id: 'skerries', en: 'Skerries', ga: 'Na Sceirí', inGa: 'sna Sceirí',
    postal: 'Co. Dublin', eircode: 'K34', council: 'fingal', zone: 3, lat: 53.5826, lng: -6.1083,
    housing: ['coastal', 'estate', 'cottage'], commercial: 'village',
    intro: [
      'Skerries is a coastal town of harbour cottages, seaside terraces and newer family estates, with a strong community of independent shops, cafés and restaurants.',
      'Is baile cósta iad na Sceirí le teachíní cuain, ardáin cois farraige agus eastáit teaghlaigh níos nuaí, agus pobal láidir siopaí, caiféanna agus bialann neamhspleách.',
    ],
    insight: [
      'Harbour-front premises need signage built for salt air and strong winds, and coastal homes benefit from moisture-resistant joinery. We plan full-day visits here to make the most of each trip.',
      'Teastaíonn comharthaíocht ó áitribh ar bhruach an chuain atá tógtha d’aer goirt agus do ghaoth láidir, agus baineann tithe cósta leas as siúinéireacht fhrithfhliuchra. Pleanálaimid cuairteanna lae iomláin anseo chun an leas is fearr a bhaint as gach turas.',
    ],
  }),
  a({
    id: 'balbriggan', en: 'Balbriggan', ga: 'Baile Brigín', inGa: 'i mBaile Brigín',
    postal: 'Co. Dublin', eircode: 'K32', council: 'fingal', zone: 3, lat: 53.612, lng: -6.181,
    housing: ['estate', 'newbuild'], commercial: 'town',
    intro: [
      'Balbriggan has grown rapidly, with many new family estates alongside a revitalised town centre and harbour.',
      'D’fhás Baile Brigín go tapa, le go leor eastát teaghlaigh nua in éineacht le lár baile agus cuan athbheoite.',
    ],
    insight: [
      'Newer homes here are perfect for fitted wardrobes, media walls and furniture assembly, while town-centre businesses benefit from fresh fascia signage and window graphics.',
      'Tá tithe níos nuaí anseo foirfe do vardrúis fheistithe, do bhallaí meán agus do chóimeáil troscáin, agus baineann gnólachtaí i lár an bhaile leas as comharthaíocht aghaidhe agus grafaicí fuinneoige úra.',
    ],
  }),

  /* ------------------------------------------------------------ Zone 4 */
  a({
    id: 'bray', en: 'Bray', ga: 'Bré', inGa: 'i mBré',
    postal: 'Co. Wicklow', eircode: 'A98', council: 'wicklow', zone: 4, lat: 53.2028, lng: -6.0983,
    housing: ['victorian', 'coastal', 'estate'], commercial: 'town',
    intro: [
      'Just over the Dublin border, Bray’s Victorian seafront, Main Street and growing estates make it a natural part of our service area.',
      'Díreach thar theorainn Bhaile Átha Cliath, is cuid nádúrtha dár limistéar seirbhíse é Bré lena chladach Victeoiriach, a Phríomhshráid agus a eastáit atá ag fás.',
    ],
    insight: [
      'Victorian terraces near the promenade suit alcove units and fitted wardrobes, while Main Street shops benefit from refreshed fascias and projecting signs. Signage applications here go to Wicklow County Council.',
      'Oireann aonaid chuasa agus vardrúis fheistithe d’ardáin Victeoiriacha in aice leis an bpromanáid, agus baineann siopaí na Príomhshráide leas as cláir aghaidhe athnuaite agus as comharthaí crochta. Téann iarratais chomharthaíochta anseo chuig Comhairle Contae Chill Mhantáin.',
    ],
  }),
  a({
    id: 'greystones', en: 'Greystones', ga: 'Na Clocha Liatha', inGa: 'sna Clocha Liatha',
    postal: 'Co. Wicklow', eircode: 'A63', council: 'wicklow', zone: 4, lat: 53.144, lng: -6.063,
    housing: ['coastal', 'newbuild', 'detached'], commercial: 'village',
    intro: [
      'Greystones’ harbour, beaches and newer residential areas such as Charlesland have made it one of the most popular commuter towns south of Dublin.',
      'Rinne cuan, tránna agus ceantair chónaithe níos nuaí na gClocha Liatha, ar nós Charlesland, ceann de na bailte comaitéireachta is mó tóir ó dheas de Bhaile Átha Cliath de.',
    ],
    insight: [
      'Modern family homes here suit fitted wardrobes, media walls and island kitchens, and the busy cafés of Church Road and the harbour suit stylish timber signage.',
      'Oireann vardrúis fheistithe, ballaí meán agus cistineacha le hoileán do thithe teaghlaigh nua-aimseartha anseo, agus oireann comharthaíocht adhmaid stíleach do chaiféanna gnóthacha Church Road agus an chuain.',
    ],
  }),
  a({
    id: 'maynooth', en: 'Maynooth', ga: 'Maigh Nuad', inGa: 'i Maigh Nuad',
    postal: 'Co. Kildare', eircode: 'W23', council: 'kildare', zone: 4, lat: 53.3813, lng: -6.5918,
    housing: ['estate', 'newbuild', 'victorian'], commercial: 'town',
    intro: [
      'A university town with a historic main street and fast-growing estates, Maynooth is an easy run from Dublin and a growing part of our service area.',
      'Is baile ollscoile é Maigh Nuad le príomhshráid stairiúil agus eastáit atá ag fás go tapa, turas éasca ó Bhaile Átha Cliath agus cuid dár limistéar seirbhíse atá ag fás.',
    ],
    insight: [
      'Student and rental properties need durable, practical furniture assembly and storage, while family estates suit kitchens and fitted wardrobes. Shopfronts on Main Street benefit from heritage-style signage.',
      'Teastaíonn cóimeáil troscáin agus stóráil mharthanach phraiticiúil ó áitribh mac léinn agus ó áitribh ar cíos, agus oireann cistineacha agus vardrúis fheistithe d’eastáit teaghlaigh. Baineann aghaidheanna siopa ar an bPríomhshráid leas as comharthaíocht i stíl oidhreachta.',
    ],
  }),
  a({
    id: 'celbridge', en: 'Celbridge', ga: 'Cill Droichid', inGa: 'i gCill Droichid',
    postal: 'Co. Kildare', eircode: 'W23', council: 'kildare', zone: 4, lat: 53.3399, lng: -6.5394,
    housing: ['estate', 'newbuild', 'cottage'], commercial: 'village',
    intro: [
      'Celbridge combines a historic village beside Castletown House with large family estates — a commuter town where many homes are ready for kitchen and wardrobe upgrades.',
      'Cuireann Cill Droichid sráidbhaile stairiúil in aice le Teach Bhaile an Chaisleáin le chéile le heastáit mhóra teaghlaigh — baile comaitéireachta ina bhfuil go leor tithe réidh d’uasghráduithe cistine agus vardrús.',
    ],
    insight: [
      'Estates from the 1990s–2000s here suit full-height fitted wardrobes and new kitchens, and the mix of shops on Main Street suits classic signage.',
      'Oireann vardrúis fheistithe lánairde agus cistineacha nua d’eastáit ó na 1990idí–2000idí anseo, agus oireann comharthaíocht chlasaiceach don mheascán siopaí ar an bPríomhshráid.',
    ],
  }),
  a({
    id: 'naas', en: 'Naas', ga: 'An Nás', inGa: 'sa Nás',
    postal: 'Co. Kildare', eircode: 'W91', council: 'kildare', zone: 4, lat: 53.2159, lng: -6.6669,
    housing: ['estate', 'newbuild', 'detached'], commercial: 'town',
    intro: [
      'Kildare’s county town is a busy commercial centre with a lively main street and large, modern residential areas along the M7 corridor.',
      'Is ionad tráchtála gnóthach é príomhbhaile Chill Dara le príomhshráid bhríomhar agus ceantair chónaithe mhóra nua-aimseartha feadh chonair an M7.',
    ],
    insight: [
      'Modern family homes here suit island kitchens, walk-in wardrobes and media walls. Town-centre retailers and hospitality venues benefit from striking illuminated and fascia signage.',
      'Oireann cistineacha le hoileán, vardrúis siúil isteach agus ballaí meán do thithe teaghlaigh nua-aimseartha anseo. Baineann miondíoltóirí agus ionaid fáilteachais i lár an bhaile leas as comharthaíocht shoilsithe agus aghaidhe shuntasach.',
    ],
  }),
  a({
    id: 'ashbourne', en: 'Ashbourne', ga: 'Cill Dhéagláin', inGa: 'i gCill Dhéagláin',
    postal: 'Co. Meath', eircode: 'A84', council: 'meath', zone: 4, lat: 53.511, lng: -6.397,
    housing: ['newbuild', 'estate'], commercial: 'town',
    intro: [
      'One of the fastest-growing towns in the commuter belt, Ashbourne is full of newer family homes just north of Dublin on the N2.',
      'Ar cheann de na bailte is tapúla fás sa chrios comaitéireachta, tá Cill Dhéagláin lán de thithe teaghlaigh níos nuaí díreach ó thuaidh de Bhaile Átha Cliath ar an N2.',
    ],
    insight: [
      'New builds here often need everything at once — fitted wardrobes, media walls and furniture assembly — and we can schedule it all as one project. Town-centre businesses suit modern fascia panels and window graphics.',
      'Is minic a theastaíonn gach rud ag an am céanna ó thithe nua anseo — vardrúis fheistithe, ballaí meán agus cóimeáil troscáin — agus is féidir linn é ar fad a sceidealú mar thionscadal amháin. Oireann painéil aghaidhe nua-aimseartha agus grafaicí fuinneoige do ghnólachtaí i lár an bhaile.',
    ],
  }),
];

export const areaById = Object.fromEntries(areas.map((x) => [x.id, x])) as Record<string, Area>;

const R = 6371;
export function distanceKm(a1: { lat: number; lng: number }, a2: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(a2.lat - a1.lat);
  const dLng = toRad(a2.lng - a1.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a1.lat)) * Math.cos(toRad(a2.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const CITY_CENTRE = { lat: 53.3498, lng: -6.2603 };

/** nearest areas, for "nearby" internal links */
export function nearby(area: Area, count = 6): Area[] {
  return areas
    .filter((x) => x.id !== area.id)
    .map((x) => ({ x, d: distanceKm(area, x) }))
    .sort((p, q) => p.d - q.d)
    .slice(0, count)
    .map((p) => p.x);
}
