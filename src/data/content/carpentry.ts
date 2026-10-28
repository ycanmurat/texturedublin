import { faq, sec, t, type ServiceContent } from './helpers.ts';

export const carpentryContent: Record<string, ServiceContent> = {
  'furniture-installation': {
    menu: t('Kitchen fitting, wall-mounting & more', 'Feistiú cistine, crochadh ar bhallaí agus eile'),
    description: t(
      'Kitchen fitters and furniture installers in Dublin & Meath: IKEA kitchens, wardrobe systems, TV wall-mounting, shelves, blinds and interior doors fitted properly.',
      'Feisteoirí cistine agus suiteálaithe troscáin: cistineacha IKEA, córais vardrúis, teilifíseáin ar bhallaí, seilfeanna, dallóga agus doirse inmheánacha.',
    ),
    answers: {
      'Do you install IKEA kitchens in Dublin?': t(
        'Yes. We assemble and install IKEA METOD and other flat-pack kitchens, including levelling the cabinets, fitting doors and drawers, cutting laminate worktops and fitting panels and plinths. The quote depends on the number of cabinets, worktop work and appliance connections — send your kitchen plan for a written price.',
        'Déanaimid. Cóimeálaimid agus suiteálaimid cistineacha IKEA METOD agus cistineacha flat-pack eile, lena n-áirítear na caibinéid a leibhéaladh, doirse agus tarraiceáin a fheistiú, barraí oibre lannaigh a ghearradh agus painéil agus bunchláir a fheistiú. Braitheann an luachan ar líon na gcaibinéad, ar obair na mbarraí oibre agus ar naisc fearas — seol plean do chistine le haghaidh praghas scríofa.',
      ),
    },
    sections: [
      sec('Kitchen installation for supplied kitchens', 'Suiteáil cistineacha a sholáthraítear', [
        'If you have bought a kitchen from IKEA, Howdens, B&Q, Woodie’s or an online supplier, our fitters assemble the cabinets, level and fix them to the wall, hang the doors, fit drawers, cut and join laminate worktops and finish with plinths, end panels and cornice. Appliance connections and plumbing are coordinated with qualified trades.',
        'We check the delivery against the plan before starting, so missing items are spotted early and fitting days are not wasted.',
      ], [
        'Má cheannaigh tú cistin ó IKEA, Howdens, B&Q, Woodie’s nó ó sholáthraí ar líne, cóimeálann ár bhfeisteoirí na caibinéid, leibhéalann agus daingníonn siad leis an mballa iad, crochann siad na doirse, feistíonn siad tarraiceáin, gearrann agus nascann siad barraí oibre lannaigh agus críochnaíonn siad le bunchláir, painéil deiridh agus coirnis. Comhordaítear naisc fearas agus pluiméireacht le ceardaithe cáilithe.',
        'Seiceálaimid an seachadadh i gcoinne an phlean sula dtosaímid, ionas go n-aimsítear earraí ar iarraidh go luath agus nach gcuirtear laethanta feistithe amú.',
      ]),
      sec('Wall-mounting, shelves and finishing touches', 'Crochadh ar bhallaí, seilfeanna agus mionsonraí', [
        'We mount TVs on brick, block and plasterboard walls, hang floating shelves, mirrors, artwork and wall cabinets, and fit curtain poles and blinds. Fixings are chosen for the wall type and weight, and we check for pipes and cables before drilling.',
        'Interior doors can be hung with new hinges and handles, and wardrobe systems such as PAX or PLATSA can be installed into alcoves with scribed panels for a built-in look.',
      ], [
        'Crochaimid teilifíseáin ar bhallaí brící, bloc agus clár plástair, crochaimid seilfeanna ar snámh, scátháin, saothar ealaíne agus caibinéid bhalla, agus feistímid cuaillí cuirtíní agus dallóga. Roghnaítear daingneáin de réir chineál an bhalla agus an mheáchain, agus seiceálaimid le haghaidh píopaí agus cáblaí sula ndruileálaimid.',
        'Is féidir doirse inmheánacha a chrochadh le hinsí agus hanlaí nua, agus is féidir córais vardrúis ar nós PAX nó PLATSA a shuiteáil i gcuasa le painéil oiriúnaithe chun cuma ionsuite a thabhairt.',
      ], [
        ['IKEA and flat-pack kitchen installation', 'TV wall-mounting and media units', 'Floating shelves, mirrors and wall cabinets', 'Curtain poles, blinds and interior doors'],
        ['Suiteáil cistineacha IKEA agus flat-pack', 'Teilifíseáin ar bhallaí agus aonaid mheán', 'Seilfeanna ar snámh, scátháin agus caibinéid bhalla', 'Cuaillí cuirtíní, dallóga agus doirse inmheánacha'],
      ]),
    ],
    faqs: [
      faq('Do you fit Howdens and B&Q kitchens as well as IKEA?', 'An bhfeistíonn sibh cistineacha Howdens agus B&Q chomh maith le IKEA?',
        'Yes. We install supplied kitchens from most retailers and trade suppliers. Send the kitchen plan or order list and we will confirm the fitting time and what is included.',
        'Feistímid. Suiteálaimid cistineacha a sholáthraítear ón gcuid is mó de mhiondíoltóirí agus de sholáthraithe trádála. Seol plean na cistine nó an liosta ordaithe agus deimhneoimid an t-am feistithe agus cad atá san áireamh.'),
      faq('Can you fit laminate and timber worktops?', 'An féidir libh barraí oibre lannaigh agus adhmaid a fheistiú?',
        'Yes. We cut, join and seal laminate and solid timber worktops, including cut-outs for sinks and hobs. Quartz and stone worktops are templated and fitted by specialist fabricators, which we can coordinate.',
        'Is féidir. Gearraimid, nascaimid agus séalaimid barraí oibre lannaigh agus adhmaid sholadaigh, lena n-áirítear poill do dhoirteal agus d’oigheann. Déanann déantóirí speisialaithe teimpléid agus feistiú barraí grianchloiche agus cloiche, agus is féidir linn é sin a chomhordú.'),
      faq('Can you install a wardrobe system into an alcove?', 'An féidir libh córas vardrúis a shuiteáil i gcuas?',
        'Yes. Modular systems such as PAX can be fitted between walls with infill panels scribed to the ceiling and walls, giving a built-in finish at a lower cost than fully bespoke furniture.',
        'Is féidir. Is féidir córais mhodúlacha ar nós PAX a fheistiú idir ballaí le painéil líonta oiriúnaithe don tsíleáil agus do na ballaí, rud a thugann bailchríoch ionsuite ar chostas níos ísle ná troscán iomlán saincheaptha.'),
      faq('Do you hang interior doors?', 'An gcrochann sibh doirse inmheánacha?',
        'Yes. We hang new interior doors, trimming them to fit the frame, fitting hinges, latches and handles, and adjusting doors that stick or no longer close properly. Fire doors are fitted to the manufacturer’s instructions with the correct certified hardware.',
        'Crochaimid. Crochaimid doirse inmheánacha nua, á mbearradh chun teacht leis an bhfráma, ag feistiú insí, laistí agus hanlaí, agus coigeartaímid doirse a ghreamaíonn nó nach ndúnann i gceart. Feistítear doirse dóiteáin de réir threoracha an déantóra leis na crua-earraí deimhnithe cearta.'),
      faq('Can you mount a TV above a fireplace?', 'An féidir libh teilifís a chrochadh os cionn teallaigh?',
        'Often, yes, but we check the wall construction, heat from the fire and the viewing height first. Where cables need to be hidden, a media wall or a chased cable route can be planned with your electrician.',
        'Is minic is féidir, ach seiceálaimid tógáil an bhalla, an teas ón tine agus an airde féachana ar dtús. Nuair is gá cáblaí a cheilt, is féidir balla meán nó bealach cábla a phleanáil le do leictreoir.'),
    ],
  },

  carpentry: {
    menu: t('Doors, skirting, shelving & repairs', 'Doirse, cláir sciorta, seilfeanna agus deisiúcháin'),
    description: t(
      'Carpenter in Dublin & Meath for door hanging, skirting and architrave, boxing-in, stud walls, staircase repairs and general joinery. Ask Ali Onder for a quote.',
      'Siúinéir i mBaile Átha Cliath agus sa Mhí: doirse, cláir sciorta, frámaí, píopaí a cheilt, ballaí deighilte, staighrí agus siúinéireacht ghinearálta.',
    ),
    answers: {
      'How much does a carpenter cost per hour in Dublin?': t(
        'Small carpentry jobs can be booked by the hour, and larger jobs by the day or as a fixed price. Our published starting rate for general carpentry is on the Enquiries page; for anything bigger, send photos and a short description and you will receive a written quote that includes materials.',
        'Is féidir jabanna beaga siúinéireachta a chur in áirithe in aghaidh na huaire, agus jabanna níos mó in aghaidh an lae nó ar phraghas seasta. Tá ár ráta tosaigh foilsithe do shiúinéireacht ghinearálta ar an leathanach Fiosrúchán; d’aon rud níos mó, seol grianghraif agus cur síos gearr agus gheobhaidh tú luachan scríofa a chuimsíonn ábhair.',
      ),
    },
    sections: [
      sec('General carpentry for homes and businesses', 'Siúinéireacht ghinearálta do thithe agus do ghnólachtaí', [
        'A good carpenter saves you calling several trades. We hang and adjust doors, fit skirting boards and architrave, box in pipes and soil stacks, build stud partitions, fit shelving and cupboards, repair sash-window boxes and stair parts, and fix sticking drawers, loose hinges and broken locks.',
        'Jobs can be booked by the hour or day, or quoted as a fixed price when the scope is clear. Bundling several small jobs into one visit is usually the most cost-effective approach.',
      ], [
        'Sábhálann siúinéir maith ort glaoch ar roinnt ceardaithe. Crochaimid agus coigeartaímid doirse, feistímid cláir sciorta agus frámaí, ceilimid píopaí agus stácaí séarachais, tógaimid ballaí deighilte, feistímid seilfeanna agus cófraí, deisímid boscaí fuinneoga saise agus páirteanna staighre, agus deisímid tarraiceáin a ghreamaíonn, insí scaoilte agus glais bhriste.',
        'Is féidir jabanna a chur in áirithe in aghaidh na huaire nó an lae, nó luachan praghais sheasta a fháil nuair is léir an obair. De ghnáth is é an bealach is costéifeachtúla roinnt jabanna beaga a chur le chéile in aon chuairt amháin.',
      ], [
        ['Door hanging and adjustment', 'Skirting, architrave and mouldings', 'Boxing-in and stud partitions', 'Stair spindles, handrails and treads'],
        ['Doirse a chrochadh agus a choigeartú', 'Cláir sciorta, frámaí agus múnlaí', 'Píopaí a cheilt agus ballaí deighilte', 'Fearsaidí, ráillí láimhe agus céimeanna staighre'],
      ]),
      sec('Period joinery and matching mouldings', 'Siúinéireacht sheanré agus múnlaí meaitseáilte', [
        'Victorian and Edwardian homes in Rathmines, Ranelagh, Drumcondra and Clontarf often need skirting, architrave or panelling repaired to match the original profile. We match existing mouldings as closely as possible, splice in new timber where sections are damaged and prepare everything ready for painting.',
      ], [
        'Is minic a theastaíonn cláir sciorta, frámaí nó painéil a dheisiú chun teacht leis an bpróifíl bhunaidh i dtithe Victeoiriacha agus Éadbhardacha i Ráth Maonais, i Raghnallach, i nDroim Conrach agus i gCluain Tarbh. Meaitseálaimid múnlaí reatha chomh gar agus is féidir, cuirimid adhmad nua isteach nuair atá codanna damáistithe agus ullmhaímid gach rud réidh le péinteáil.',
      ]),
    ],
    faqs: [
      faq('Do you do small carpentry jobs?', 'An ndéanann sibh jabanna beaga siúinéireachta?',
        'Yes. Small jobs such as adjusting doors, fixing hinges, fitting a shelf or replacing a section of skirting are welcome. Grouping several small jobs together makes the best use of a visit.',
        'Déanaimid. Tá fáilte roimh jabanna beaga ar nós doirse a choigeartú, insí a dheisiú, seilf a fheistiú nó cuid de chlár sciorta a athsholáthar. Baintear an leas is fearr as cuairt nuair a chuirtear roinnt jabanna beaga le chéile.'),
      faq('Can you box in pipes and a boiler?', 'An féidir libh píopaí agus coire a cheilt?',
        'Yes. We box in pipes, soil stacks and meters with removable access panels where needed, and build boiler cupboards that keep the clearances the manufacturer requires.',
        'Is féidir. Ceilimid píopaí, stácaí séarachais agus méadair le painéil rochtana inbhainte nuair is gá, agus tógaimid cófraí coire a choinníonn an spás a éilíonn an déantóir.'),
      faq('Do you build stud walls and partitions?', 'An dtógann sibh ballaí stoda agus deighiltí?',
        'Yes. We build timber stud partitions to divide rooms, create a utility or en-suite space, or form a wardrobe recess, ready for plastering. Where a wall affects fire safety or structure, we work to your engineer’s or builder’s specification.',
        'Tógaimid. Tógaimid deighiltí stoda adhmaid chun seomraí a roinnt, chun spás fóntais nó en-suite a chruthú, nó chun cuasán vardrúis a dhéanamh, réidh le plástráil. Nuair a théann balla i bhfeidhm ar shábháilteacht dóiteáin nó ar struchtúr, oibrímid de réir shonraíocht d’innealtóra nó do thógálaí.'),
      faq('Can you repair a staircase or replace spindles?', 'An féidir libh staighre a dheisiú nó fearsaidí a athsholáthar?',
        'Yes. We repair creaking or loose treads, replace broken spindles, fit new handrails and update balustrades, matching the existing timber or changing the style to suit a renovation.',
        'Is féidir. Deisímid céimeanna scaoilte nó díoscánacha, athsholáthraímid fearsaidí briste, feistímid ráillí láimhe nua agus nuashonraímid balastráidí, ag meaitseáil an adhmaid reatha nó ag athrú na stíle chun teacht le hathchóiriú.'),
      faq('Are you a handyman or a qualified carpenter?', 'An fear cúnta nó siúinéir cáilithe sibh?',
        'Texture Dublin is a furniture and joinery business with its own workshop, so carpentry is our core trade rather than a sideline. Small handyman-style tasks are welcome alongside carpentry work.',
        'Is gnó troscáin agus siúinéireachta é Texture Dublin lena cheardlann féin, mar sin is í an tsiúinéireacht ár gceird lárnach seachas obair bhreise. Tá fáilte roimh mhionjabanna cúnta in éineacht le hobair siúinéireachta.'),
    ],
  },

  'interior-design-complete-works': {
    menu: t('3D design to turnkey interiors', 'Ó dhearadh 3T go hintí iomlána'),
    description: t(
      'Interior design and complete joinery works in Dublin & Meath: room planning, 3D visuals and turnkey kitchens, wardrobes and built-ins managed by one team.',
      'Dearadh intí agus oibreacha siúinéireachta iomlána: pleanáil seomraí, amharcanna 3T agus cistineacha, vardrúis agus aonaid ionsuite ó fhoireann amháin.',
    ),
    answers: {},
    sections: [
      sec('Design that is built by the same team', 'Dearadh a thógann an fhoireann chéanna', [
        'Many interior projects stall between the designer’s drawings and the builder’s price. Because we design and build joinery ourselves, the 3D visuals you approve are the furniture we make — kitchens, wardrobes, media walls, panelling and storage — with materials, finishes and lighting agreed in advance.',
        'We start with a consultation in your home, measure the rooms, discuss how you live and prepare layouts and visuals. Once approved, the project moves straight into manufacture and installation.',
      ], [
        'Is minic a stopann tionscadail intí idir líníochtaí an dearthóra agus praghas an tógálaí. Toisc go ndearaimid agus go dtógaimid siúinéireacht muid féin, is é an troscán a dhéanaimid na hamharcanna 3T a cheadaíonn tú — cistineacha, vardrúis, ballaí meán, painéil agus stóráil — le hábhair, bailchríocha agus soilsiú aontaithe roimh ré.',
        'Tosaímid le comhairliúchán i do theach, tomhaisimid na seomraí, pléimid an chaoi a maireann tú agus ullmhaímid leagan amach agus amharcanna. Nuair a cheadaítear iad, téann an tionscadal díreach isteach sa déantúsaíocht agus sa tsuiteáil.',
      ], [
        ['Home consultation and measured survey', 'Layouts, 3D visuals and material boards', 'Joinery manufacture and installation', 'Coordination with builders and trades'],
        ['Comhairliúchán baile agus suirbhé tomhaiste', 'Leagan amach, amharcanna 3T agus cláir ábhar', 'Déantúsaíocht agus suiteáil siúinéireachta', 'Comhordú le tógálaithe agus ceardaithe'],
      ]),
      sec('Renovations, extensions and new homes', 'Athchóirithe, síntí agus tithe nua', [
        'Complete works suit whole-house renovations, new extensions and new homes that need several rooms of fitted furniture at once. We sequence the joinery with plastering, flooring, electrics and decorating so each trade can finish on time.',
      ], [
        'Oireann oibreacha iomlána d’athchóirithe tí iomláin, do shíntí nua agus do thithe nua a dteastaíonn troscán feistithe ó roinnt seomraí acu ag an am céanna. Socraímid an tsiúinéireacht in ord le plástráil, urláir, leictreachas agus maisiú ionas gur féidir le gach ceird críochnú in am.',
      ]),
    ],
    faqs: [
      faq('Do you provide 3D interior design visuals?', 'An gcuireann sibh amharcanna 3T dearadh intí ar fáil?',
        'Yes. We prepare 3D visuals and drawings for kitchens, wardrobes, media walls and complete rooms, so you can see layouts, colours and finishes before anything is made.',
        'Cuirimid. Ullmhaímid amharcanna 3T agus líníochtaí do chistineacha, do vardrúis, do bhallaí meán agus do sheomraí iomlána, ionas gur féidir leat an leagan amach, na dathanna agus na bailchríocha a fheiceáil sula ndéantar aon rud.'),
      faq('Can you manage a whole-house joinery project?', 'An féidir libh tionscadal siúinéireachta tí iomláin a bhainistiú?',
        'Yes. We can design and install the kitchen, utility, wardrobes, built-ins and doors as one coordinated project, with a single point of contact and an agreed programme.',
        'Is féidir. Is féidir linn an chistin, an seomra fóntais, na vardrúis, na haonaid ionsuite agus na doirse a dhearadh agus a shuiteáil mar thionscadal comhordaithe amháin, le pointe teagmhála amháin agus clár aontaithe.'),
      faq('Do you help choose colours and materials?', 'An gcabhraíonn sibh le dathanna agus ábhair a roghnú?',
        'Yes. We bring door samples, veneers and colour options to the consultation and recommend combinations that suit the room’s light, flooring and the rest of the house.',
        'Cabhraímid. Tugaimid samplaí doirse, veiníri agus roghanna dathanna chuig an gcomhairliúchán agus molaimid teaglaim a oireann do sholas an tseomra, don urlár agus don chuid eile den teach.'),
      faq('Is interior design charged separately?', 'An ngearrtar táille ar leith ar dhearadh intí?',
        'Design work is quoted according to the size of the project. When the design leads to a joinery order, the design stage is agreed as part of the overall quotation.',
        'Tugtar luachan ar obair deartha de réir mhéid an tionscadail. Nuair a eascraíonn ordú siúinéireachta as an dearadh, aontaítear céim an dearaidh mar chuid den luachan iomlán.'),
    ],
  },

  'commercial-fit-out': {
    menu: t('Counters, displays & reception desks', 'Cuntair, taispeántais agus deasca fáiltithe'),
    description: t(
      'Shop, café and office fit-out joinery in Dublin & Meath: bespoke counters, reception desks, retail displays, bar fronts and timber shopfronts, with signage on request.',
      'Siúinéireacht feistithe siopaí, caiféanna agus oifigí: cuntair, deasca fáiltithe, taispeántais mhiondíola, aghaidheanna beáir agus aghaidheanna siopa adhmaid.',
    ),
    answers: {},
    sections: [
      sec('Joinery that works as hard as your business', 'Siúinéireacht a oibríonn chomh crua le do ghnó', [
        'Commercial joinery has to look good and stand up to daily use. We build café and bar counters, retail display bays, shelving and gondolas, reception desks, office storage walls, tea points and timber shopfronts using hard-wearing boards, laminates and veneers specified for commercial use.',
        'Designs take account of accessibility, staff workflow, cable management for tills and screens, and the brand finish you want customers to see.',
      ], [
        'Caithfidh siúinéireacht tráchtála cuma mhaith a bheith uirthi agus seasamh d’úsáid laethúil. Tógaimid cuntair chaifé agus bheáir, báanna taispeána miondíola, seilfeanna, deasca fáiltithe, ballaí stórála oifige, pointí tae agus aghaidheanna siopa adhmaid as cláir, lannaigh agus veiníri láidre atá sonraithe d’úsáid tráchtála.',
        'Cuirtear inrochtaineacht, sreabhadh oibre na foirne, bainistiú cáblaí do thillí agus do scáileáin, agus bailchríoch an bhranda san áireamh sa dearadh.',
      ], [
        ['Café, bar and shop counters', 'Retail displays and shelving', 'Reception desks and office joinery', 'Traditional timber shopfronts'],
        ['Cuntair chaifé, bheáir agus siopa', 'Taispeántais agus seilfeanna miondíola', 'Deasca fáiltithe agus siúinéireacht oifige', 'Aghaidheanna siopa adhmaid traidisiúnta'],
      ]),
      sec('Fit-out and signage from one company', 'Feistiú agus comharthaíocht ó chomhlacht amháin', [
        'Texture Dublin has a dedicated signage specialist alongside the joinery team, so a new shop, café or office can have its counter, displays, fascia sign, window graphics and reception logo delivered together, with one point of contact and a coordinated installation programme.',
      ], [
        'Tá saineolaí comharthaíochta tiomnaithe ag Texture Dublin in éineacht leis an bhfoireann siúinéireachta, ionas gur féidir an cuntar, na taispeántais, an clár aghaidhe, na grafaicí fuinneoige agus an lógó fáiltithe a sheachadadh le chéile do shiopa, do chaifé nó d’oifig nua, le pointe teagmhála amháin agus clár suiteála comhordaithe.',
      ]),
    ],
    faqs: [
      faq('Do you build bespoke reception desks?', 'An dtógann sibh deasca fáiltithe saincheaptha?',
        'Yes. Reception desks are designed around your space, branding and staff needs, with a lower accessible section, cable management for screens and phones, lockable storage and optional lighting or a logo panel.',
        'Tógaimid. Dearadh deasca fáiltithe timpeall ar do spás, do bhranda agus riachtanais na foirne, le cuid íseal inrochtana, bainistiú cáblaí do scáileáin agus do ghutháin, stóráil faoi ghlas agus soilsiú nó painéal lógó roghnach.'),
      faq('Can you make café and bar counters?', 'An féidir libh cuntair chaifé agus bheáir a dhéanamh?',
        'Yes. We build counters with durable worktops, storage for equipment, space for coffee machines and display fridges, and fronts in timber, panelling or branded finishes.',
        'Is féidir. Tógaimid cuntair le barraí oibre marthanacha, stóráil do threalamh, spás do mheaisíní caife agus do chuisneoirí taispeána, agus aghaidheanna adhmaid, painéalaithe nó le bailchríocha branda.'),
      faq('Can you work around opening hours?', 'An féidir libh oibriú timpeall ar uaireanta oscailte?',
        'Yes. Joinery is built in our workshop to minimise time on site, and installation can be scheduled early in the morning, in the evening or over a closed day to reduce disruption.',
        'Is féidir. Tógtar an tsiúinéireacht inár gceardlann chun an t-am ar an láthair a laghdú, agus is féidir an tsuiteáil a sceidealú go luath ar maidin, sa tráthnóna nó ar lá dúnta chun cur isteach a laghdú.'),
      faq('Do you make traditional timber shopfronts?', 'An ndéanann sibh aghaidheanna siopa adhmaid traidisiúnta?',
        'Yes. We make timber shopfronts with pilasters, fascia boards and stall risers, painted in heritage colours with hand-painted or applied lettering. Shopfront changes often need planning permission, which should be confirmed with the council first.',
        'Déanaimid. Déanaimid aghaidheanna siopa adhmaid le piléir, cláir aghaidhe agus bunphainéil, péinteáilte i ndathanna oidhreachta le litreoireacht lámhphéinteáilte nó ghreamaithe. Is minic a theastaíonn cead pleanála d’athruithe ar aghaidh siopa, rud ba chóir a dheimhniú leis an gcomhairle ar dtús.'),
    ],
  },
};
