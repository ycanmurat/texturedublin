import { faq, sec, t, type ServiceContent } from './helpers.ts';

export const signageContent: Record<string, ServiceContent> = {
  'shop-signs': {
    menu: t('Fascias, 3D letters & projecting signs', 'Cláir aghaidhe, litreacha 3T agus comharthaí crochta'),
    description: t(
      'Shop signs in Dublin & Meath: fascia signs, built-up 3D letters, projecting signs, hand-painted shopfronts and A-boards designed, made and installed.',
      'Comharthaí siopa i mBaile Átha Cliath agus sa Mhí: cláir aghaidhe, litreacha 3T, comharthaí crochta, aghaidheanna lámhphéinteáilte agus A-chláir.',
    ),
    answers: {
      'How much does a shop sign cost in Dublin?': t(
        'Shop sign prices depend on the size of the fascia, the materials (printed panel, painted timber or built-up letters), illumination, access for installation and any planning work. Send a straight-on photo of the shopfront, approximate measurements and your logo for a written quotation.',
        'Braitheann praghas comhartha siopa ar mhéid an chláir aghaidhe, ar na hábhair (painéal clóite, adhmad péinteáilte nó litreacha tógtha), ar shoilsiú, ar rochtain don tsuiteáil agus ar aon obair phleanála. Seol grianghraf díreach den aghaidh siopa, tomhais gharbha agus do lógó le haghaidh luachan scríofa.',
      ),
    },
    sections: [
      sec('Shopfront signs that get noticed', 'Comharthaí aghaidhe siopa a thugtar faoi deara', [
        'Your fascia is the first thing passers-by read. We design and make printed aluminium-composite fascia panels, hand-painted timber fascias, built-up 3D letters in acrylic, metal or timber, projecting and hanging signs, and A-boards for the pavement.',
        'Every sign starts with a scaled mock-up on a photo of your shopfront, so you can judge size, colour and legibility from across the street before it goes into production.',
      ], [
        'Is é do chlár aghaidhe an chéad rud a léann daoine atá ag dul thar bráid. Dearaimid agus déanaimid painéil aghaidhe ilchodacha alúmanaim clóite, cláir aghaidhe adhmaid lámhphéinteáilte, litreacha 3T tógtha in aicrileach, i miotal nó in adhmad, comharthaí crochta, agus A-chláir don chosán.',
        'Tosaíonn gach comhartha le samhail ar scála ar ghrianghraf de d’aghaidh siopa, ionas gur féidir leat méid, dath agus inléiteacht a mheas ón taobh eile den tsráid sula dtéann sé chun táirgthe.',
      ], [
        ['Printed and routed fascia panels', 'Built-up 3D letters', 'Projecting and hanging signs', 'Hand-painted timber fascias'],
        ['Painéil aghaidhe clóite agus gearrtha', 'Litreacha 3T tógtha', 'Comharthaí crochta', 'Cláir aghaidhe adhmaid lámhphéinteáilte'],
      ]),
      sec('Planning, landlords and installation', 'Pleanáil, tiarnaí talún agus suiteáil', [
        'Many shop signs need planning permission, particularly illuminated and projecting signs and signs on protected structures or in architectural conservation areas. We prepare drawings and photomontages to support an application, and the proposal should be checked with the local council and your landlord before manufacture.',
        'Installation includes safe access, removal of the old sign where agreed, fixings suited to the wall and making good. Illuminated signs are connected by a Safe Electric registered contractor.',
      ], [
        'Teastaíonn cead pleanála ó go leor comharthaí siopa, go háirithe comharthaí soilsithe agus crochta agus comharthaí ar struchtúir chosanta nó i limistéir chaomhantais ailtireachta. Ullmhaímid líníochtaí agus fótamontáis chun tacú le hiarratas, agus ba chóir an togra a sheiceáil leis an gcomhairle áitiúil agus le do thiarna talún roimh an déantúsaíocht.',
        'Áirítear sa tsuiteáil rochtain shábháilte, an seanchomhartha a bhaint más aontaithe, daingneáin a oireann don bhalla agus deisiú ina dhiaidh. Nascann conraitheoir cláraithe le Safe Electric comharthaí soilsithe.',
      ]),
    ],
    faqs: [
      faq('Can you remove my old shop sign?', 'An féidir libh mo sheanchomhartha siopa a bhaint?',
        'Yes. We can remove and dispose of the existing sign, repair the fascia board where needed and install the new sign in the same visit where access allows.',
        'Is féidir. Is féidir linn an comhartha reatha a bhaint agus a dhiúscairt, an clár aghaidhe a dheisiú nuair is gá agus an comhartha nua a shuiteáil sa chuairt chéanna nuair a cheadaíonn an rochtain é.'),
      faq('What are built-up 3D letters made from?', 'Cad as a ndéantar litreacha 3T tógtha?',
        'Built-up letters can be made from acrylic, aluminium, stainless steel, brass-effect finishes or timber, fixed flat to the fascia or on stand-off locators for a floating shadow. They can be non-illuminated, face-lit or halo-lit.',
        'Is féidir litreacha tógtha a dhéanamh as aicrileach, alúmanam, cruach dhosmálta, bailchríocha cosúil le prás nó adhmad, daingnithe cothrom leis an gclár aghaidhe nó ar sheasaimh amach chun scáth ar snámh a thabhairt. Is féidir iad a bheith gan soilsiú, le soilsiú aghaidhe nó le soilsiú halóige.'),
      faq('Do you make A-boards and pavement signs?', 'An ndéanann sibh A-chláir agus comharthaí cosáin?',
        'Yes. We make A-boards with printed, chalkboard or hand-painted faces. Pavement signs on public footpaths may need a licence from the council, so check local rules before placing one outside.',
        'Déanaimid. Déanaimid A-chláir le haghaidheanna clóite, cláir chailce nó lámhphéinteáilte. D’fhéadfadh go mbeadh ceadúnas ón gcomhairle ag teastáil do chomharthaí ar chosáin phoiblí, mar sin seiceáil na rialacha áitiúla sula gcuireann tú ceann amuigh.'),
      faq('Can you make signs for shopping centres and retail parks?', 'An féidir libh comharthaí a dhéanamh d’ionaid siopadóireachta agus do pháirceanna miondíola?',
        'Yes. Shopping centres usually have a signage design guide and installation rules. Send us the landlord’s requirements and we will design the sign to comply and coordinate access with centre management.',
        'Is féidir. De ghnáth bíonn treoir dearaidh comharthaíochta agus rialacha suiteála ag ionaid siopadóireachta. Seol riachtanais an tiarna talún chugainn agus dearfaimid an comhartha dá réir agus comhordóimid rochtain le bainistíocht an ionaid.'),
      faq('How long does it take to make a shop sign?', 'Cá fhad a thógann sé comhartha siopa a dhéanamh?',
        'Most fascia signs are produced within one to three weeks of artwork approval, depending on materials and illumination. Planning permission, where required, adds to the timeline and should be allowed for when opening a new shop.',
        'Táirgtear formhór na gclár aghaidhe laistigh de sheachtain go trí seachtaine ó cheadú an dearaidh, ag brath ar ábhair agus ar shoilsiú. Cuireann cead pleanála, nuair is gá, leis an scála ama agus ba chóir é a chur san áireamh agus siopa nua á oscailt.'),
    ],
  },

  'illuminated-led-signs': {
    menu: t('Lightboxes, halo-lit letters & LED neon', 'Boscaí solais, litreacha soilsithe agus neon LED'),
    description: t(
      'Illuminated and LED signs in Dublin & Meath: lightbox fascias, halo-lit and face-lit 3D letters, projecting signs and custom LED neon, safely installed and connected.',
      'Comharthaí soilsithe agus LED: boscaí solais, litreacha 3T le soilsiú halóige agus aghaidhe, comharthaí crochta agus neon LED saincheaptha.',
    ),
    answers: {
      'How much do illuminated shop signs cost?': t(
        'Illuminated signs are quoted on size, construction (lightbox, face-lit or halo-lit letters, LED neon), the power supply and controls, access and the electrical connection. Send a photo of the location, measurements and artwork for a written quotation.',
        'Tugtar luachan ar chomharthaí soilsithe de réir méide, tógála (bosca solais, litreacha le soilsiú aghaidhe nó halóige, neon LED), an tsoláthair cumhachta agus na rialuithe, rochtana agus an naisc leictreachais. Seol grianghraf den suíomh, tomhais agus an saothar ealaíne le haghaidh luachan scríofa.',
      ),
    },
    sections: [
      sec('Lightboxes, lit letters and LED neon', 'Boscaí solais, litreacha soilsithe agus neon LED', [
        'LED lightboxes give an even, bright fascia that reads clearly at night. Face-lit acrylic letters glow through their faces, while halo-lit letters shine onto the wall behind them for a refined, premium look. Custom LED neon brings colour and personality to cafés, bars, salons and interiors without the fragility of glass neon.',
        'All illuminated signs use energy-efficient LEDs, can run on timers, and are connected by a Safe Electric registered contractor.',
      ], [
        'Tugann boscaí solais LED clár aghaidhe cothrom geal a léitear go soiléir san oíche. Lonraíonn litreacha aicrileacha le soilsiú aghaidhe trína n-aghaidh, agus lonraíonn litreacha le soilsiú halóige ar an mballa taobh thiar díobh chun cuma ghalánta a thabhairt. Tugann neon LED saincheaptha dath agus pearsantacht do chaiféanna, do bheáir, do shalóin agus d’intí gan leochaileacht neon gloine.',
        'Úsáideann gach comhartha soilsithe LEDanna atá tíosach ar fhuinneamh, is féidir iad a rith ar amadóirí, agus nascann conraitheoir cláraithe le Safe Electric iad.',
      ], [
        ['LED lightbox fascias', 'Halo-lit and face-lit 3D letters', 'Illuminated projecting signs', 'Custom LED neon for interiors'],
        ['Cláir aghaidhe bosca solais LED', 'Litreacha 3T le soilsiú halóige agus aghaidhe', 'Comharthaí crochta soilsithe', 'Neon LED saincheaptha d’intí'],
      ]),
      sec('Planning and responsible lighting', 'Pleanáil agus soilsiú freagrach', [
        'Illuminated signs generally need planning permission in Ireland, and councils pay close attention to brightness, colour and hours of operation, especially near homes and in conservation areas. We specify sensible brightness levels, use timers and dimming where useful, and supply drawings to support your application.',
      ], [
        'De ghnáth teastaíonn cead pleanála ó chomharthaí soilsithe in Éirinn, agus tugann comhairlí aird ghéar ar ghile, ar dhath agus ar uaireanta oibríochta, go háirithe in aice le tithe agus i limistéir chaomhantais. Sonraímid leibhéil chiallmhara gile, úsáidimid amadóirí agus maolú nuair is úsáideach, agus cuirimid líníochtaí ar fáil chun tacú le d’iarratas.',
      ]),
    ],
    faqs: [
      faq('What is the difference between halo-lit and face-lit letters?', 'Cén difríocht atá idir litreacha le soilsiú halóige agus le soilsiú aghaidhe?',
        'Face-lit letters have translucent acrylic faces that glow directly toward the street. Halo-lit letters have solid faces and shine light backwards onto the wall, creating a soft outline. Halo lighting suits premium brands and period buildings; face lighting gives maximum visibility.',
        'Bíonn aghaidheanna aicrileacha tréshoilseacha ar litreacha le soilsiú aghaidhe a lonraíonn díreach i dtreo na sráide. Bíonn aghaidheanna soladacha ar litreacha le soilsiú halóige agus caitheann siad solas siar ar an mballa, ag cruthú imlíne bhog. Oireann soilsiú halóige do bhrandaí den scoth agus d’fhoirgnimh sheanré; tugann soilsiú aghaidhe an infheictheacht is mó.'),
      faq('Can you make a custom LED neon sign for an interior?', 'An féidir libh comhartha neon LED saincheaptha a dhéanamh do sheomra?',
        'Yes. LED neon can follow your logo, a word or a slogan in a wide range of colours, mounted on a clear or coloured acrylic backing with a low-voltage power supply. It is popular for cafés, bars, salons, offices and events.',
        'Is féidir. Is féidir le neon LED do lógó, focal nó mana a leanúint i raon leathan dathanna, suite ar chúl aicrileach soiléir nó daite le soláthar cumhachta ísealvoltais. Tá tóir air i gcaiféanna, i mbeáir, i salóin, in oifigí agus ag imeachtaí.'),
      faq('Can an existing lightbox be refaced or converted to LED?', 'An féidir aghaidh nua a chur ar bhosca solais reatha nó é a athrú go LED?',
        'Often, yes. If the lightbox frame is sound we can fit a new printed face and replace old fluorescent tubes with LED modules, which use less power and need less maintenance.',
        'Is minic is féidir. Má tá fráma an bhosca solais láidir is féidir linn aghaidh chlóite nua a fheistiú agus seanfheadáin fhluaraiseacha a athsholáthar le modúil LED, a úsáideann níos lú cumhachta agus a éilíonn níos lú cothabhála.'),
      faq('Do illuminated signs need maintenance?', 'An dteastaíonn cothabháil ó chomharthaí soilsithe?',
        'LED signs need very little maintenance. An occasional clean of the faces and a check of fixings and connections keeps them looking their best; power supplies are the part most likely to need replacing over the sign’s life.',
        'Is beag cothabháil a theastaíonn ó chomharthaí LED. Coinníonn glanadh ó am go chéile ar na haghaidheanna agus seiceáil ar na daingneáin agus ar na naisc iad ag breathnú go maith; is iad na soláthairtí cumhachta an chuid is dóichí a mbeidh athsholáthar ag teastáil uaithi le linn shaolré an chomhartha.'),
    ],
  },

  'wooden-signs': {
    menu: t('Carved, painted & gold-leaf signs', 'Comharthaí snoite, péinteáilte agus órdhuille'),
    description: t(
      'Wooden and carved signs made in Dunboyne: house signs, pub and café signs, gold-leaf lettering, reclaimed timber signs and laser-cut logo walls for Dublin & Meath.',
      'Comharthaí adhmaid agus snoite: comharthaí tí, comharthaí tithe tábhairne agus caiféanna, litreoireacht órdhuille agus ballaí lógó gearrtha le léasar.',
    ),
    answers: {},
    sections: [
      sec('Handcrafted timber signs', 'Comharthaí adhmaid lámhdhéanta', [
        'Timber signs suit period buildings, village streets, pubs, cafés, farms, estates and homes. We make carved and engraved house signs, painted business signs, gold-leaf lettering, rustic signs from reclaimed timber and laser-cut wooden logos for interiors.',
        'Each sign is drawn to scale first, so lettering, borders and any carved details are agreed before the timber is cut.',
      ], [
        'Oireann comharthaí adhmaid d’fhoirgnimh sheanré, do shráideanna sráidbhailte, do thithe tábhairne, do chaiféanna, d’fheirmeacha, d’eastáit agus do thithe. Déanaimid comharthaí tí snoite agus greanta, comharthaí gnó péinteáilte, litreoireacht órdhuille, comharthaí tuaithe as adhmad athchúrsáilte agus lógónna adhmaid gearrtha le léasar d’intí.',
        'Tarraingítear gach comhartha ar scála ar dtús, ionas go n-aontaítear an litreoireacht, na himeallbhoird agus aon mhionsonraí snoite sula ngearrtar an t-adhmad.',
      ], [
        ['Carved and engraved house signs', 'Pub, café and shop signs', 'Gold-leaf and hand-painted lettering', 'Laser-cut wooden logo walls'],
        ['Comharthaí tí snoite agus greanta', 'Comharthaí tithe tábhairne, caiféanna agus siopaí', 'Litreoireacht órdhuille agus lámhphéinteáilte', 'Ballaí lógó adhmaid gearrtha le léasar'],
      ]),
      sec('Timber, finishes and weatherproofing', 'Adhmad, bailchríocha agus díonadh aimsire', [
        'Outdoor signs are made from durable timbers such as oak, iroko or accoya and sealed with exterior-grade oils, paints or varnishes. Indoor signs can use a wider range of woods and finishes. Regular cleaning and an occasional re-oil keep a timber sign looking its best in the Irish climate.',
      ], [
        'Déantar comharthaí amuigh as adhmaid mharthanacha ar nós darach, iroko nó accoya agus séalaítear iad le holaí, péinteanna nó vearnaisí d’úsáid sheachtrach. Is féidir raon níos leithne adhmad agus bailchríocha a úsáid do chomharthaí istigh. Coinníonn glanadh rialta agus ola nua ó am go chéile comhartha adhmaid ag breathnú go maith in aeráid na hÉireann.',
      ]),
    ],
    faqs: [
      faq('Do you make personalised house name signs?', 'An ndéanann sibh comharthaí ainm tí pearsantaithe?',
        'Yes. House signs can be carved, engraved or painted with your house name or number, in English or Irish, with optional borders, motifs and fixings for walls, gate piers or posts.',
        'Déanaimid. Is féidir comharthaí tí a shnoí, a ghreanadh nó a phéinteáil le hainm nó uimhir do thí, i mBéarla nó i nGaeilge, le himeallbhoird, móitífeanna agus daingneáin roghnacha do bhallaí, do philéir gheata nó do chuaillí.'),
      faq('Can you make traditional pub and café signs?', 'An féidir libh comharthaí traidisiúnta do thithe tábhairne agus do chaiféanna a dhéanamh?',
        'Yes. We make hand-painted fascias, hanging signs with brackets, gilded lettering and menu boards in traditional styles that suit Irish streetscapes.',
        'Is féidir. Déanaimid cláir aghaidhe lámhphéinteáilte, comharthaí crochta le lúibíní, litreoireacht órnite agus cláir bhiachláir i stíleanna traidisiúnta a oireann do shráid-dreach na hÉireann.'),
      faq('Can you laser-cut our logo in wood for an office wall?', 'An féidir libh ár lógó a ghearradh le léasar in adhmad do bhalla oifige?',
        'Yes. Logos can be laser-cut from plywood, oak or walnut veneered board, layered for depth and mounted on stand-offs, making a warm alternative to acrylic or metal reception signs.',
        'Is féidir. Is féidir lógónna a ghearradh le léasar as sraithadhmad, as clár veiníre darach nó gallchnó, i sraitheanna chun doimhneacht a thabhairt agus suite ar sheasaimh amach, rogha te seachas comharthaí fáiltithe aicrileacha nó miotail.'),
      faq('Do you make signs in Irish?', 'An ndéanann sibh comharthaí i nGaeilge?',
        'Yes. We make house, business and bilingual signs in Irish and English and take care with síntí fada and spelling. Send the exact wording and we will set it in a layout to suit the sign.',
        'Déanaimid. Déanaimid comharthaí tí, gnó agus dátheangacha i nGaeilge agus i mBéarla agus tugaimid aire do na síntí fada agus don litriú. Seol an fhoclaíocht chruinn agus leagfaimid amach í chun teacht leis an gcomhartha.'),
    ],
  },

  'office-interior-signage': {
    menu: t('Logo walls, wayfinding & graphics', 'Ballaí lógó, treoshuíomh agus grafaicí'),
    description: t(
      'Office and interior signage in Dublin & Meath: reception logo signs, 3D logo walls, wayfinding, door signs, wall graphics and manifestation for workplaces.',
      'Comharthaíocht oifige agus intí: comharthaí lógó fáiltithe, ballaí lógó 3T, treoshuíomh, comharthaí doirse, grafaicí balla agus marcáil ghloine.',
    ),
    answers: {
      'How much is a reception logo sign?': t(
        'Reception signs are priced on size, materials (acrylic, metal, timber or preserved moss), the number of layers, any lighting and installation. Send your logo file and a photo of the wall with its approximate width for a written quotation.',
        'Braitheann praghas comhartha fáiltithe ar mhéid, ar ábhair (aicrileach, miotal, adhmad nó caonach caomhnaithe), ar líon na sraitheanna, ar aon soilsiú agus ar shuiteáil. Seol comhad do lógó agus grianghraf den bhalla lena leithead garbh le haghaidh luachan scríofa.',
      ),
    },
    sections: [
      sec('First impressions in reception', 'An chéad tuiscint sa limistéar fáiltithe', [
        'A reception logo sign tells visitors they are in the right place and sets the tone for your brand. We make logo signs in layered acrylic, brushed metal, timber and preserved moss, mounted on stand-offs or fixed flat, with optional halo lighting.',
        'For larger spaces, full logo walls combine 3D lettering with printed graphics or timber slats to create a feature wall that photographs well.',
      ], [
        'Insíonn comhartha lógó fáiltithe do chuairteoirí go bhfuil siad san áit cheart agus leagann sé ton do bhranda. Déanaimid comharthaí lógó in aicrileach sraitheach, i miotal scuabtha, in adhmad agus i gcaonach caomhnaithe, suite ar sheasaimh amach nó daingnithe cothrom, le soilsiú halóige roghnach.',
        'I spásanna níos mó, cuireann ballaí lógó iomlána litreoireacht 3T le grafaicí clóite nó le stiallacha adhmaid chun balla gné a chruthú a fhéachann go maith i ngrianghraif.',
      ]),
      sec('Wayfinding, doors and wall graphics', 'Treoshuíomh, doirse agus grafaicí balla', [
        'Clear wayfinding helps staff and visitors move around offices, clinics, schools and multi-tenant buildings. We supply directory boards, directional signs, door and room signs, meeting-room names and toilet signs, with tactile and high-contrast options to support accessibility.',
        'Printed wall graphics, murals and glass manifestation add brand colour and privacy, and help meet safety requirements for glazed doors and screens.',
      ], [
        'Cuidíonn treoshuíomh soiléir le foireann agus le cuairteoirí bogadh timpeall oifigí, clinicí, scoileanna agus foirgnimh ilthionóntaí. Cuirimid cláir eolais, comharthaí treo, comharthaí doirse agus seomraí, ainmneacha seomraí cruinnithe agus comharthaí leithris ar fáil, le roghanna tadhlacha agus ard-chodarsnachta chun tacú le hinrochtaineacht.',
        'Cuireann grafaicí balla clóite, múrmhaisiúcháin agus marcáil ghloine dath branda agus príobháideachas leis, agus cuidíonn siad le riachtanais sábháilteachta do dhoirse agus do scáileáin ghloinithe a chomhlíonadh.',
      ], [
        ['Reception logo signs and logo walls', 'Wayfinding and directory boards', 'Door, room and toilet signs', 'Wall graphics and glass manifestation'],
        ['Comharthaí lógó fáiltithe agus ballaí lógó', 'Treoshuíomh agus cláir eolais', 'Comharthaí doirse, seomraí agus leithris', 'Grafaicí balla agus marcáil ghloine'],
      ]),
    ],
    faqs: [
      faq('What is a preserved-moss logo sign?', 'Cad is comhartha lógó caonaigh chaomhnaithe ann?',
        'It is a living-wall effect made from real moss that has been preserved, so it needs no watering or light. Your logo is cut into or applied over the moss panel, creating a natural feature for receptions and meeting rooms.',
        'Is éifeacht balla beo é atá déanta as caonach fíor a caomhnaíodh, mar sin ní theastaíonn uisce ná solas uaidh. Gearrtar do lógó isteach sa phainéal caonaigh nó cuirtear air é, ag cruthú gné nádúrtha do limistéir fáiltithe agus do sheomraí cruinnithe.'),
      faq('Can you supply signs for a new office fit-out?', 'An féidir libh comharthaí a sholáthar d’fheistiú oifige nua?',
        'Yes. We can survey the floor plan, schedule every sign — reception, wayfinding, doors, toilets and manifestation — and install them in one programme with the rest of the fit-out.',
        'Is féidir. Is féidir linn suirbhé a dhéanamh ar phlean an urláir, sceideal a dhéanamh do gach comhartha — fáiltiú, treoshuíomh, doirse, leithris agus marcáil — agus iad a shuiteáil in aon chlár amháin leis an gcuid eile den fheistiú.'),
      faq('Do you print wall murals and branded graphics?', 'An bpriontálann sibh múrmhaisiúcháin bhalla agus grafaicí branda?',
        'Yes. We print and install wall murals, brand values, timelines and decorative graphics on durable wall vinyl, sized to the wall and applied without visible joins wherever possible.',
        'Priontálaimid. Priontálaimid agus suiteálaimid múrmhaisiúcháin bhalla, luachanna branda, amlínte agus grafaicí maisiúla ar vinil bhalla mharthanach, de réir mhéid an bhalla agus curtha gan uamanna infheicthe nuair is féidir.'),
      faq('Can you install office signs without damaging the walls?', 'An féidir libh comharthaí oifige a shuiteáil gan dochar do na ballaí?',
        'We choose fixings to suit the wall and the lease conditions. Lightweight door and room signs can be fixed with high-bond tape, and larger signs use concealed mechanical fixings that are easy to make good when you move.',
        'Roghnaímid daingneáin a oireann don bhalla agus do choinníollacha an léasa. Is féidir comharthaí éadroma doirse agus seomraí a ghreamú le téip ard-ghreamaitheach, agus úsáideann comharthaí níos mó daingneáin mheicniúla cheilte atá éasca a dheisiú nuair a bhogann tú.'),
    ],
  },

  'window-graphics-vinyl': {
    menu: t('Frosted film, window & van vinyl', 'Scannán sioctha, vinil fuinneoige agus veain'),
    description: t(
      'Window graphics and vinyl in Dublin & Meath: shop window lettering, frosted privacy film, printed window displays, opening-hours vinyl and van livery fitted.',
      'Grafaicí fuinneoige agus vinil: litreoireacht fuinneoige siopa, scannán príobháideachta sioctha, grafaicí clóite, vinil uaireanta oscailte agus maisiú veain.',
    ),
    answers: {
      'How much do window graphics cost?': t(
        'Window graphics are quoted on the area of glass, the type of vinyl (cut lettering, frosted film or full-colour print), the complexity of the design and access. Send a photo of the window with its approximate width and height for a written quotation.',
        'Tugtar luachan ar ghrafaicí fuinneoige de réir achar na gloine, chineál na vinile (litreoireacht ghearrtha, scannán sioctha nó prionta lándaite), chastacht an dearaidh agus rochtana. Seol grianghraf den fhuinneog lena leithead agus a hairde gharbh le haghaidh luachan scríofa.',
      ),
    },
    sections: [
      sec('Shop windows that sell', 'Fuinneoga siopa a dhíolann', [
        'Window lettering, opening hours, logos and printed graphics turn glass into advertising space that works day and night. We cut vinyl lettering in a wide range of colours and metallic finishes, print full-colour window displays and fit one-way vision film that shows graphics outside while staff can still see out.',
      ], [
        'Déanann litreoireacht fuinneoige, uaireanta oscailte, lógónna agus grafaicí clóite spás fógraíochta den ghloine a oibríonn de lá agus d’oíche. Gearraimid litreoireacht vinile i raon leathan dathanna agus bailchríocha miotalacha, priontálaimid taispeántais fuinneoige lándaite agus feistímid scannán radhairc aontreo a thaispeánann grafaicí lasmuigh agus a ligeann don fhoireann feiceáil amach fós.',
      ]),
      sec('Privacy film and vehicle graphics', 'Scannán príobháideachta agus grafaicí feithiclí', [
        'Frosted privacy film gives offices, clinics, bathrooms and street-facing rooms privacy without blocking daylight, and it can include a logo, stripes or a pattern. For vehicles, we design and fit van livery from simple lettering to partial and full wraps, keeping your branding consistent with your shop and signage.',
      ], [
        'Tugann scannán príobháideachta sioctha príobháideachas d’oifigí, do chlinicí, do sheomraí folctha agus do sheomraí atá os comhair na sráide gan solas an lae a bhac, agus is féidir lógó, stríoca nó patrún a chur ann. D’fheithiclí, dearaimid agus feistímid maisiú veain ó litreoireacht shimplí go clúdaigh pháirteacha agus iomlána, ag coinneáil do bhrandála comhsheasmhach le do shiopa agus le do chomharthaíocht.',
      ], [
        ['Shop window lettering and logos', 'Frosted and decorative privacy film', 'Full-colour printed window graphics', 'Van lettering and vehicle wraps'],
        ['Litreoireacht agus lógónna fuinneoige siopa', 'Scannán príobháideachta sioctha agus maisiúil', 'Grafaicí fuinneoige clóite lándaite', 'Litreoireacht veain agus clúdaigh fheithiclí'],
      ]),
    ],
    faqs: [
      faq('Can frosted film be cut into a pattern or logo?', 'An féidir scannán sioctha a ghearradh i bpatrún nó i lógó?',
        'Yes. Frosted film can be cut to leave your logo clear, or applied as bands, stripes or a decorative pattern, giving privacy at eye level while letting light through above and below.',
        'Is féidir. Is féidir scannán sioctha a ghearradh chun do lógó a fhágáil glan, nó é a chur mar bhandaí, mar stríoca nó mar phatrún maisiúil, ag tabhairt príobháideachais ag leibhéal na súl agus ag ligean solais tríd os a chionn agus faoi.'),
      faq('Do you do van signage and vehicle wraps?', 'An ndéanann sibh comharthaíocht veain agus clúdaigh fheithiclí?',
        'Yes. We design and fit van lettering, partial wraps and full vehicle wraps using vinyl made for vehicles, so the graphics follow curves and can be removed later without damaging the paintwork when applied to original factory paint.',
        'Déanaimid. Dearaimid agus feistímid litreoireacht veain, clúdaigh pháirteacha agus clúdaigh iomlána feithiclí le vinil atá déanta d’fheithiclí, ionas go leanann na grafaicí na cuair agus gur féidir iad a bhaint níos déanaí gan dochar don phéint nuair a chuirtear ar phéint bhunaidh na monarchan iad.'),
      faq('Can you fit window graphics on upper floors?', 'An féidir libh grafaicí fuinneoige a fheistiú ar urláir uachtaracha?',
        'Yes. Most upper-floor windows can be fitted from inside. Where external access is needed we plan safe access equipment and include it in the quotation.',
        'Is féidir. Is féidir formhór na bhfuinneog ar urláir uachtaracha a fheistiú ón taobh istigh. Nuair is gá rochtain sheachtrach pleanálaimid trealamh rochtana sábháilte agus cuirimid san áireamh sa luachan é.'),
      faq('How long do window graphics last?', 'Cá fhad a mhaireann grafaicí fuinneoige?',
        'Quality cut vinyl and frosted film last for years on glass. Printed promotional graphics are often changed seasonally, so we can supply them on removable vinyl that peels off cleanly when the campaign ends.',
        'Maireann vinil ghearrtha agus scannán sioctha ardchaighdeáin ar feadh blianta ar ghloine. Is minic a athraítear grafaicí bolscaireachta clóite de réir an tséasúir, mar sin is féidir linn iad a sholáthar ar vinil inbhainte a bhaintear go glan nuair a chríochnaíonn an feachtas.'),
    ],
  },

  'branding-logo-design': {
    menu: t('Logos, brand identity & mock-ups', 'Lógónna, féiniúlacht branda agus samhlacha'),
    description: t(
      'Logo design and brand identity in Dublin & Meath, drawn to work on signs, vans, windows, menus and social media. Concepts, revisions and final files included.',
      'Dearadh lógó agus féiniúlacht branda a oibríonn ar chomharthaí, ar veaineanna, ar fhuinneoga, ar bhiachláir agus ar na meáin shóisialta.',
    ),
    answers: {
      'How much does a logo cost in Dublin?': t(
        'Logo design is quoted on the number of concepts, revision rounds and the files you need, and identity packs add colours, typography and guidelines. Tell us about your business and what you need the brand for, and you will receive a written quotation with the deliverables listed.',
        'Tugtar luachan ar dhearadh lógó de réir líon na gcoincheap, na mbabhtaí athbhreithnithe agus na gcomhad a theastaíonn uait, agus cuireann pacáistí féiniúlachta dathanna, clóghrafaíocht agus treoirlínte leis. Inis dúinn faoi do ghnó agus cad chuige a dteastaíonn an branda uait, agus gheobhaidh tú luachan scríofa leis na seachadáin liostaithe.',
      ),
    },
    sections: [
      sec('A brand designed for the real world', 'Branda deartha don saol fíor', [
        'Because we also make signs, we design logos that work in physical materials: legible from across the street, clear when cut in vinyl, effective when lit, and simple enough to carve or laser-cut in timber. The same identity then carries through to your website, social media, menus, uniforms and vehicles.',
        'Projects start with a discovery conversation about your business, customers and competitors, followed by initial concepts, refinement rounds and final artwork.',
      ], [
        'Toisc go ndéanaimid comharthaí freisin, dearaimid lógónna a oibríonn in ábhair fhisiciúla: inléite ón taobh eile den tsráid, soiléir nuair a ghearrtar i vinil iad, éifeachtach nuair a shoilsítear iad, agus simplí go leor le snoí nó le gearradh le léasar in adhmad. Leanann an fhéiniúlacht chéanna ar aghaidh chuig do shuíomh gréasáin, chuig na meáin shóisialta, chuig biachláir, chuig éidí agus chuig feithiclí.',
        'Tosaíonn tionscadail le comhrá fionnachtana faoi do ghnó, do chustaiméirí agus d’iomaitheoirí, agus ina dhiaidh sin coincheapa tosaigh, babhtaí mionchoigeartaithe agus saothar ealaíne deiridh.',
      ], [
        ['Logo design and refreshes', 'Brand identity and guidelines', 'Social media brand kits', 'Signage design and photo mock-ups'],
        ['Dearadh agus athnuachan lógó', 'Féiniúlacht branda agus treoirlínte', 'Trealamh branda na meán sóisialta', 'Dearadh comharthaíochta agus samhlacha grianghraf'],
      ]),
    ],
    faqs: [
      faq('Which files will I receive with my logo?', 'Cé na comhaid a gheobhaidh mé le mo lógó?',
        'You receive vector files (SVG, PDF and EPS) for print and signage, plus PNG files for web and social media, in full colour, single colour and reversed versions.',
        'Gheobhaidh tú comhaid veicteora (SVG, PDF agus EPS) do chló agus do chomharthaíocht, chomh maith le comhaid PNG don ghréasán agus do na meáin shóisialta, i leaganacha lándaite, aondaite agus droim ar ais.'),
      faq('Can you refresh an existing logo rather than start again?', 'An féidir libh lógó reatha a athnuachan seachas tosú as an nua?',
        'Yes. A refresh keeps the recognition you have built while improving legibility, proportions and colours, and it is often the right choice for established businesses.',
        'Is féidir. Coinníonn athnuachan an t-aitheantas atá tógtha agat agus feabhsaíonn sé inléiteacht, comhréireanna agus dathanna, agus is minic gurb é an rogha cheart é do ghnólachtaí seanbhunaithe.'),
      faq('Do you design social media profile images and covers?', 'An ndearann sibh íomhánna próifíle agus clúdaigh do na meáin shóisialta?',
        'Yes. Social media brand kits include profile images, cover banners and post templates for Instagram, Facebook and LinkedIn, so your business looks consistent from the shopfront to the feed.',
        'Dearaimid. Áirítear i dtrealamh branda na meán sóisialta íomhánna próifíle, meirgí clúdaigh agus teimpléid postálacha do Instagram, Facebook agus LinkedIn, ionas go mbíonn cuma chomhsheasmhach ar do ghnó ón aghaidh siopa go dtí an fotha.'),
      faq('Do you design menus, flyers and printed material?', 'An ndearann sibh biachláir, bileoga agus ábhar clóite?',
        'Yes. We design menus, flyers, business cards, price lists and other print in your brand style and prepare print-ready files.',
        'Dearaimid. Dearaimid biachláir, bileoga, cártaí gnó, liostaí praghsanna agus ábhar clóite eile i stíl do bhranda agus ullmhaímid comhaid réidh le priontáil.'),
    ],
  },
};
