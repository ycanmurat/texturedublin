import { faq, sec, t, type ServiceContent } from './helpers.ts';

export const furnitureContent: Record<string, ServiceContent> = {
  'fitted-wardrobes': {
    menu: t('Hinged, sliding & walk-in wardrobes', 'Vardrúis insí, sleamhnáin agus siúil isteach'),
    description: t(
      'Fitted wardrobes in Dublin & Meath: hinged, sliding, walk-in and attic wardrobes made to measure in our Dunboyne workshop. Free survey and written quote.',
      'Vardrúis fheistithe i mBaile Átha Cliath agus sa Mhí: insí, sleamhnáin, siúil isteach agus áiléir, déanta de réir tomhais i nDún Búinne. Suirbhé saor in aisce.',
    ),
    answers: {
      'How much do fitted wardrobes cost in Dublin?': t(
        'The cost depends on the width and height of the run, the door style (hinged or sliding), the finish and the interior — drawers, shoe racks and lighting add to the price. After a free home survey you receive a fixed written quotation, so you know the full installed cost before anything is made.',
        'Braitheann an costas ar leithead agus ar airde an raoin, ar stíl na ndoirse (insí nó sleamhnáin), ar an mbailchríoch agus ar an leagan amach istigh — cuireann tarraiceáin, raic bróg agus soilsiú leis an bpraghas. Tar éis suirbhé baile saor in aisce faigheann tú luachan scríofa seasta, ionas go mbíonn an costas iomlán ar eolas agat roimh ré.',
      ),
    },
    sections: [
      sec('Hinged, sliding or walk-in?', 'Insí, sleamhnáin nó siúil isteach?', [
        'Hinged doors open the whole wardrobe at once and suit most bedrooms, especially where the run faces the bed. Sliding doors save floor space in narrower rooms and box rooms, and they can carry mirrors or glass panels to make a small bedroom feel larger.',
        'Walk-in wardrobes and dressing rooms turn a box room, an attic or part of a large bedroom into open hanging, shelving and drawers. We plan the layout around how you actually store clothes — long and short hanging, folded shelves, shoes and bags — so every section has a purpose.',
      ], [
        'Osclaíonn doirse insí an vardrús ar fad ag an am céanna agus oireann siad d’fhormhór na seomraí leapa. Sábhálann doirse sleamhnáin spás urláir i seomraí cúnga agus i seomraí bosca, agus is féidir scátháin nó painéil ghloine a chur iontu chun go mbraithfeadh seomra beag níos mó.',
        'Déanann vardrúis siúil isteach agus seomraí feistis crochadh oscailte, seilfeanna agus tarraiceáin as seomra bosca, áiléar nó cuid de sheomra mór. Pleanálaimid an leagan amach de réir an chaoi a stórálann tú éadaí — crochadh fada agus gearr, seilfeanna fillte, bróga agus málaí.',
      ]),
      sec('Wardrobes for awkward spaces', 'Vardrúis do spásanna achrannacha', [
        'Off-the-shelf wardrobes rarely suit Irish homes: ceilings slope in attic conversions, chimney breasts break up period bedrooms and new-build rooms are often a few centimetres too low for standard units. Made-to-measure carcasses are scribed to the walls, floor and ceiling, so there are no filler strips and no gaps for dust.',
        'We build eaves wardrobes for dormer bungalows and attic rooms, alcove wardrobes either side of a chimney, wardrobes around windows and bulkheads, and low-level storage under sloping ceilings.',
      ], [
        'Is annamh a oireann vardrúis réamhdhéanta do thithe na hÉireann: bíonn síleálacha claonta in áiléir athchóirithe, briseann brollaigh simléir seomraí leapa seanré agus is minic a bhíonn seomraí i dtithe nua cúpla ceintiméadar ró-íseal d’aonaid chaighdeánacha. Oiriúnaítear conablaigh de réir tomhais do na ballaí, don urlár agus don tsíleáil, gan stiallacha líonta ná bearnaí deannaigh.',
        'Tógaimid vardrúis faoi bhunsíleáil do bhungalónna agus do sheomraí áiléir, vardrúis chuasa ar gach taobh de shimléar, vardrúis timpeall ar fhuinneoga agus ar bhulcheannaí, agus stóráil íseal faoi shíleálacha claonta.',
      ]),
      sec('Interiors, doors and finishes', 'Leagan amach istigh, doirse agus bailchríocha', [
        'Inside, choose a mix of double hanging, long hanging, adjustable shelves, soft-close drawers, pull-out trouser rails, shoe racks, jewellery inserts and motion-sensor LED lighting. Outside, doors can be spray-painted in any colour, finished in oak or walnut veneer, or made in hard-wearing woodgrain and matt boards.',
        'If your existing carcasses are sound, replacement doors and a new interior can modernise a bedroom for far less than a full replacement. We measure each opening and make the new doors to fit.',
      ], [
        'Istigh, roghnaigh meascán de chrochadh dúbailte, crochadh fada, seilfeanna inchoigeartaithe, tarraiceáin bhog-dhúnta, ráillí brístí, raic bróg, roinnteoirí seodra agus soilsiú LED le braiteoir gluaiseachta. Lasmuigh, is féidir doirse a spraephéinteáil in aon dath, veiníre darach nó gallchnó a chur orthu, nó iad a dhéanamh as cláir gráin adhmaid nó neamhlonracha.',
        'Má tá na conablaigh atá agat láidir, is féidir le doirse nua agus leagan amach nua istigh seomra leapa a nuachóiriú ar chostas i bhfad níos lú ná athsholáthar iomlán. Tomhaisimid gach oscailt agus déanaimid na doirse nua dá réir.',
      ], [
        ['Soft-close hinges and full-extension runners', 'Integrated LED lighting', 'Mirrored, glass or panelled doors', 'Push-to-open or handles'],
        ['Insí bog-dhúnta agus ráillí lán-síneadh', 'Soilsiú LED comhtháite', 'Doirse scátháin, gloine nó painéalaithe', 'Brúigh-chun-oscailt nó hanlaí'],
      ]),
    ],
    faqs: [
      faq('Do you make built-in wardrobes for new-build homes?', 'An ndéanann sibh vardrúis ionsuite do thithe nua?',
        'Yes. We build fitted wardrobes for new homes across Dublin, Dunboyne, Ashbourne, Ratoath and the wider commuter belt. New-build bedrooms often have low ceilings, bulkheads and sockets in awkward places; a made-to-measure wardrobe fits around them and uses the full height of the room.',
        'Déanaimid. Tógaimid vardrúis fheistithe do thithe nua ar fud Bhaile Átha Cliath, Dhún Búinne, Chill Dhéagláin, Ráth Tó agus an chrios comaitéireachta. Is minic a bhíonn síleálacha ísle, bulcheannaí agus soicéid in áiteanna achrannacha i seomraí leapa nua; feistítear vardrús de réir tomhais timpeall orthu agus baintear úsáid as airde iomlán an tseomra.'),
      faq('Are bespoke fitted wardrobes better than IKEA PAX?', 'An fearr vardrúis shaincheaptha ná IKEA PAX?',
        'Both have their place. PAX is good value when your room suits its standard sizes, and we can assemble and fit PAX systems for you. A bespoke fitted wardrobe makes sense when the room has sloped ceilings, alcoves or uneven walls, when you want floor-to-ceiling storage with no gaps, or when you want painted or veneered doors that look like part of the house.',
        'Tá a n-áit féin ag an dá cheann. Is fiú PAX nuair a oireann a mhéideanna caighdeánacha do do sheomra, agus is féidir linn córais PAX a chóimeáil agus a fheistiú duit. Bíonn ciall le vardrús saincheaptha nuair a bhíonn síleálacha claonta, cuasa nó ballaí míchothroma sa seomra, nuair is mian leat stóráil ó urlár go síleáil gan bearnaí, nó doirse péinteáilte nó veiníre a fhéachann mar chuid den teach.'),
      faq('Is the wardrobe design visit free?', 'An bhfuil an chuairt deartha vardrúis saor in aisce?',
        'Yes. The survey and quotation are free, with no obligation. We measure the room, talk through door styles, finishes and interior layouts, and then send drawings with a fixed written quote.',
        'Tá. Tá an suirbhé agus an luachan saor in aisce, gan aon dualgas. Tomhaisimid an seomra, pléimid stíleanna doirse, bailchríocha agus leagan amach istigh, agus ansin seolaimid líníochtaí le luachan scríofa seasta.'),
      faq('Can you turn a box room into a walk-in wardrobe?', 'An féidir libh vardrús siúil isteach a dhéanamh as seomra bosca?',
        'Often, yes. A box room of around 2 m by 2 m can become a practical walk-in wardrobe with hanging on two walls and shelves or drawers on the third. We check the door swing, window, radiator and lighting during the survey and suggest the layout that gives the most usable storage.',
        'Is minic gur féidir. Is féidir seomra bosca de thart ar 2 m faoi 2 m a dhéanamh ina vardrús siúil isteach praiticiúil le crochadh ar dhá bhalla agus seilfeanna nó tarraiceáin ar an tríú ceann. Seiceálaimid luascadh an dorais, an fhuinneog, an radaitheoir agus an soilsiú le linn an tsuirbhé agus molaimid an leagan amach is úsáidí.'),
      faq('What materials do you use for fitted wardrobes?', 'Cé na hábhair a úsáideann sibh do vardrúis fheistithe?',
        'Carcasses are made from low-emission E1 melamine-faced board or MDF, which is stable and easy to clean. Doors are spray-painted MDF, real-wood veneer or high-quality woodgrain board, fitted with soft-close hinges and full-extension drawer runners.',
        'Déantar na conablaigh as clár E1 íseal-astaíochta faoi aghaidh meilimín nó as MDF, atá cobhsaí agus éasca le glanadh. Is é MDF spraephéinteáilte, veiníre adhmaid fíor nó clár gráin adhmaid ardchaighdeáin a úsáidtear do na doirse, le hinsí bog-dhúnta agus ráillí tarraiceán lán-síneadh.'),
      faq('Do you fit wardrobes in Meath and Kildare as well as Dublin?', 'An bhfeistíonn sibh vardrúis sa Mhí agus i gCill Dara chomh maith?',
        'Yes. Our workshop is in Dunboyne, Co. Meath, so Meath and north Kildare are local to us. We fit wardrobes throughout Dublin City and County and in towns such as Clonee, Ratoath, Ashbourne, Leixlip, Maynooth, Celbridge and Naas.',
        'Feistímid. Tá ár gceardlann i nDún Búinne, Co. na Mí, mar sin is áitiúil dúinn an Mhí agus tuaisceart Chill Dara. Feistímid vardrúis ar fud Chathair agus Chontae Bhaile Átha Cliath agus i mbailte ar nós Chluain Aodha, Ráth Tó, Chill Dhéagláin, Léim an Bhradáin, Mhaigh Nuad, Chill Droichid agus an Náis.'),
      faq('Can you add lighting inside a fitted wardrobe?', 'An féidir libh soilsiú a chur taobh istigh de vardrús feistithe?',
        'Yes. Low-voltage LED strips or rail lights can switch on automatically when a door opens or when a sensor detects movement. We plan the cable routes and power supply at the design stage, and any new mains connection is completed by a registered electrician.',
        'Is féidir. Is féidir le stiallacha LED ísealvoltais nó soilse ráille lasadh go huathoibríoch nuair a osclaítear doras nó nuair a bhraitear gluaiseacht. Pleanálaimid bealaí na gcáblaí agus an soláthar cumhachta ag céim an dearaidh, agus déanann leictreoir cláraithe aon nasc príomhlíonra nua.'),
    ],
  },

  'bespoke-kitchens': {
    menu: t('Designed, built & fitted to your room', 'Deartha, tógtha agus feistithe do do sheomra'),
    description: t(
      'Bespoke kitchens in Dublin & Meath: Shaker, handleless and painted kitchens, islands and utility rooms designed, built and fitted by one team. Free design visit.',
      'Cistineacha saincheaptha i mBaile Átha Cliath agus sa Mhí: Shaker, gan hanla, péinteáilte, oileáin agus seomraí fóntais — deartha, tógtha agus feistithe ag foireann amháin.',
    ),
    answers: {
      'How much does a bespoke kitchen cost in Dublin?': t(
        'Kitchen prices depend on the size and layout, the door style (slab, Shaker, handleless or in-frame), the worktop material, appliances and any building work such as moving plumbing. After the survey and design meeting you receive a fixed written quotation covering design, manufacture and installation.',
        'Braitheann praghas cistine ar an méid agus ar an leagan amach, ar stíl na ndoirse (leac, Shaker, gan hanla nó i bhfráma), ar ábhar an bharra oibre, ar na fearais agus ar aon obair thógála ar nós pluiméireacht a bhogadh. Tar éis an tsuirbhé agus an chruinnithe deartha faigheann tú luachan scríofa seasta a chlúdaíonn dearadh, déantúsaíocht agus suiteáil.',
      ),
      'Can I keep my cabinets and just change the doors?': t(
        'Often, yes. If your carcasses are sound and the layout still works, refacing with new made-to-measure doors, drawer fronts, end panels and handles can transform a kitchen without the disruption of a full replacement. We check the hinges, runners and carcasses during the survey before recommending it.',
        'Is minic is féidir. Má tá na conablaigh láidir agus má oibríonn an leagan amach fós, is féidir le doirse, aghaidheanna tarraiceán, painéil deiridh agus hanlaí nua de réir tomhais cistin a athrú gan cur isteach athsholáthair iomláin. Seiceálaimid na hinsí, na ráillí agus na conablaigh le linn an tsuirbhé sula molaimid é.',
      ),
    },
    sections: [
      sec('Kitchen styles we design and build', 'Stíleanna cistine a dhearaimid agus a thógaimid', [
        'Shaker kitchens with painted frame doors remain the most requested style in Dublin homes, from Victorian terraces to new family houses. Handleless kitchens with integrated rails suit modern extensions and open-plan living, while in-frame cabinetry gives period homes a traditional, furniture-like finish.',
        'Doors can be spray-painted in any colour, made in oak or walnut veneer, or produced in durable matt and woodgrain boards. We pair them with laminate, solid timber, compact laminate or quartz worktops, depending on budget and use.',
      ], [
        'Is iad cistineacha Shaker le doirse fráma péinteáilte an stíl is mó a iarrtar i dtithe Bhaile Átha Cliath, ó ardáin Victeoiriacha go tithe teaghlaigh nua. Oireann cistineacha gan hanla le ráillí comhtháite do shíntí nua-aimseartha agus do mhaireachtáil phlean oscailte, agus tugann caibinéid i bhfráma bailchríoch thraidisiúnta do thithe seanré.',
        'Is féidir doirse a spraephéinteáil in aon dath, iad a dhéanamh i veiníre darach nó gallchnó, nó i gcláir neamhlonracha agus gráin adhmaid. Cuirimid barraí oibre lannaigh, adhmaid sholadaigh, lannaigh dhlúith nó grianchloiche leo, ag brath ar an mbuiséad agus ar an úsáid.',
      ], [
        ['Shaker and painted kitchens', 'Handleless and modern kitchens', 'Kitchen islands and breakfast bars', 'Larders, pantries and utility rooms'],
        ['Cistineacha Shaker agus péinteáilte', 'Cistineacha gan hanla agus nua-aimseartha', 'Oileáin chistine agus barraí bricfeasta', 'Lardrúis, pantrís agus seomraí fóntais'],
      ]),
      sec('Planned around how you cook and live', 'Pleanáilte de réir mar a chócaráileann agus a mhaireann tú', [
        'A good kitchen starts with the working triangle between sink, hob and fridge, then adds storage where you need it: deep pan drawers beside the hob, a tall larder near the fridge, bins under the prep area and a place for small appliances that keeps worktops clear.',
        'For open-plan extensions we design islands with seating, storage on the living-room side and, where useful, a hob or sink with the services planned in advance. In compact apartments we make full use of the height with wall units to the ceiling and slim pull-outs.',
      ], [
        'Tosaíonn cistin mhaith leis an triantán oibre idir an doirteal, an t-oigheann agus an cuisneoir, agus ansin cuirtear stóráil san áit a dteastaíonn sí: tarraiceáin dhoimhne do phanna in aice leis an oigheann, lardrús ard in aice leis an gcuisneoir, boscaí bruscair faoin limistéar ullmhúcháin agus áit d’fhearais bheaga a choinníonn na barraí oibre glan.',
        'I gcás síntí plean oscailte dearaimid oileáin le suíocháin, stóráil ar thaobh an tseomra suí agus, nuair is úsáideach, oigheann nó doirteal leis na seirbhísí pleanáilte roimh ré. In árasáin bheaga bainimid úsáid iomlán as an airde le haonaid bhalla go dtí an tsíleáil agus tarraingtí caola.',
      ]),
      sec('One team from design to final fitting', 'Foireann amháin ón dearadh go dtí an feistiú deiridh', [
        'We survey the room, prepare 3D visuals and drawings, build the cabinetry to measure and fit it ourselves. Worktop templating, appliance installation, plumbing and electrics are coordinated as part of the project, with electrical work completed by a Safe Electric registered contractor.',
        'Before installation starts you get a clear plan for the order of work, so you know when the old kitchen comes out, when water and power will be off, and when the worktops will be templated and fitted.',
      ], [
        'Déanaimid suirbhé ar an seomra, ullmhaímid amharcanna 3T agus líníochtaí, tógaimid na caibinéid de réir tomhais agus feistímid féin iad. Comhordaítear teimpléadú barraí oibre, suiteáil fearas, pluiméireacht agus leictreachas mar chuid den tionscadal, agus déanann conraitheoir cláraithe le Safe Electric an obair leictreachais.',
        'Sula dtosaíonn an tsuiteáil faigheann tú plean soiléir d’ord na hoibre, ionas go mbeidh a fhios agat cathain a bhainfear an tseanchistin amach, cathain a bheidh an t-uisce agus an chumhacht múchta, agus cathain a dhéanfar teimpléid na mbarraí oibre agus a fheisteofar iad.',
      ]),
    ],
    faqs: [
      faq('Do you design Shaker and handleless kitchens?', 'An ndearann sibh cistineacha Shaker agus gan hanla?',
        'Yes. We design and build painted Shaker kitchens, handleless kitchens with J-pull or rail profiles, slab-door modern kitchens and traditional in-frame kitchens. You see the design in 3D before anything is made.',
        'Dearaimid. Dearaimid agus tógaimid cistineacha Shaker péinteáilte, cistineacha gan hanla le próifílí J nó ráille, cistineacha nua-aimseartha le doirse leac agus cistineacha traidisiúnta i bhfráma. Feiceann tú an dearadh i 3T sula ndéantar aon rud.'),
      faq('Can you build a kitchen island with seating?', 'An féidir libh oileán cistine le suíocháin a thógáil?',
        'Yes. Islands can include overhanging worktops for stools, storage on both sides, wine or bookshelves at the end, and a hob or sink if the services can be routed safely. We check clearances around the island so the kitchen stays comfortable to move around.',
        'Is féidir. Is féidir barraí oibre a ghobann amach do stólta, stóráil ar an dá thaobh, seilfeanna fíona nó leabhar ag an deireadh, agus oigheann nó doirteal a chur in oileán más féidir na seirbhísí a ródú go sábháilte. Seiceálaimid an spás timpeall an oileáin ionas go mbeidh sé compordach bogadh timpeall na cistine.'),
      faq('Do you make utility rooms and boot rooms?', 'An ndéanann sibh seomraí fóntais agus seomraí buataisí?',
        'Yes. We build utility rooms with housing for the washing machine and dryer, tall cupboards for the vacuum and ironing board, and boot rooms with benches, coat hooks and shoe storage — finished to match your kitchen.',
        'Déanaimid. Tógaimid seomraí fóntais le háit don mheaisín níocháin agus don triomadóir, cófraí arda don fholúsghlantóir agus don chlár iarnála, agus seomraí buataisí le binsí, crúcaí cótaí agus stóráil bróg — críochnaithe chun teacht le do chistin.'),
      faq('Which worktops do you recommend?', 'Cé na barraí oibre a mholann sibh?',
        'Laminate is affordable and practical; solid timber is warm and repairable but needs oiling; compact laminate is thin, tough and water-resistant; quartz is hard-wearing and low-maintenance. We explain the pros and cons for your kitchen and arrange templating and fitting.',
        'Tá lannach inacmhainne agus praiticiúil; tá adhmad soladach te agus is féidir é a dheisiú ach teastaíonn ola uaidh; tá lannach dlúth tanaí, láidir agus frithuisce; tá grianchloch marthanach agus éasca le cothabháil. Mínímid na buntáistí agus na míbhuntáistí do do chistin agus socraímid teimpléadú agus feistiú.'),
      faq('Can you supply the appliances, sink and taps?', 'An féidir libh na fearais, an doirteal agus na sconnaí a sholáthar?',
        'We can source appliances, sinks and taps for you or fit the ones you buy yourself. Either way we plan the cabinet sizes around the exact models, so integrated appliances, extractors and tall ovens fit properly.',
        'Is féidir linn fearais, doirteal agus sconnaí a fháil duit nó na cinn a cheannaíonn tú féin a fheistiú. Ar aon nós pleanálaimid méideanna na gcaibinéad de réir na samhlacha cruinne, ionas go n-oireann fearais chomhtháite, scagairí agus oighinn arda i gceart.'),
      faq('Do you fit kitchens in apartments and older terraced houses?', 'An bhfeistíonn sibh cistineacha in árasáin agus i seantithe sraithe?',
        'Yes. Apartment kitchens need careful planning for lifts, stairwells and management-company rules, while older terraces often have uneven walls and narrow returns. Building to measure means the kitchen fits the room rather than the room being forced around the kitchen.',
        'Feistímid. Teastaíonn pleanáil chúramach ó chistineacha árasáin maidir le hardaitheoirí, staighrí agus rialacha cuideachta bainistíochta, agus is minic a bhíonn ballaí míchothroma agus síntí cúil cúnga i seanardáin. Ciallaíonn tógáil de réir tomhais go n-oireann an chistin don seomra seachas a mhalairt.'),
    ],
  },

  'built-in-units': {
    menu: t('Alcoves, media walls & home offices', 'Cuasa, ballaí meán agus oifigí baile'),
    description: t(
      'Alcove units, media walls, TV units, bookcases, home offices and under-stairs storage made to measure for Dublin & Meath homes. Free survey and written quote.',
      'Aonaid chuasa, ballaí meán, aonaid teilifíse, leabhragáin, oifigí baile agus stóráil faoin staighre de réir tomhais do thithe i mBaile Átha Cliath agus sa Mhí.',
    ),
    answers: {
      'How much do alcove units cost in Dublin?': t(
        'Alcove units are priced on the width and height of each alcove, the mix of cupboards, drawers and shelves, the finish and any lighting or cabling. A single alcove and a matching pair are both common requests; you receive a fixed written quotation after the survey.',
        'Braitheann praghas aonad cuasa ar leithead agus ar airde gach cuasa, ar an meascán de chófraí, tarraiceáin agus seilfeanna, ar an mbailchríoch agus ar aon soilsiú nó cáblaí. Is minic a iarrtar cuas amháin nó péire meaitseáilte; faigheann tú luachan scríofa seasta tar éis an tsuirbhé.',
      ),
    },
    sections: [
      sec('Alcove units for period and modern homes', 'Aonaid chuasa do thithe seanré agus nua-aimseartha', [
        'The alcoves either side of a chimney breast are the classic place for built-in storage: cupboards below for toys, games consoles and paperwork, with floating or framed shelves above for books and display. We line the units up with the mantelpiece, skirting and window heights so they look original to the room.',
        'In newer homes without a chimney breast we create the same effect with a full-width wall of cupboards and shelving, often with a recess for the TV or a fireplace.',
      ], [
        'Is iad na cuasa ar gach taobh de bhrollach simléir an áit chlasaiceach do stóráil ionsuite: cófraí thíos do bhréagáin, do chonsóil chluichí agus do pháipéir, le seilfeanna ar snámh nó i bhfráma thuas do leabhair agus do thaispeántas. Ailínímid na haonaid leis an matal, leis na cláir sciorta agus le hairde na bhfuinneog ionas go bhféachann siad bunaidh sa seomra.',
        'I dtithe nua gan bhrollach simléir cruthaímid an éifeacht chéanna le balla iomlán de chófraí agus seilfeanna, go minic le cuasán don teilifís nó do theallach.',
      ]),
      sec('Media walls and TV units', 'Ballaí meán agus aonaid teilifíse', [
        'A media wall hides the clutter of a modern living room: cables run inside the unit, routers and consoles sit in ventilated cupboards, and soundbars and electric fires are recessed flush with the front. Shelves and LED lighting either side complete the look.',
        'We agree the TV size, viewing height, socket positions and any fire specification at the design stage, so the unit is built around your equipment rather than adapted on site.',
      ], [
        'Ceileann balla meán an tranglam i seomra suí nua-aimseartha: ritheann cáblaí taobh istigh den aonad, suíonn ródairí agus consóil i gcófraí aeráilte, agus cuirtear barraí fuaime agus tinte leictreacha isteach cothrom leis an tosach. Críochnaíonn seilfeanna agus soilsiú LED ar gach taobh an cuma.',
        'Aontaímid méid na teilifíse, airde féachana, suíomh na soicéad agus sonraíocht aon tine ag céim an dearaidh, ionas go dtógtar an t-aonad timpeall ar do threalamh seachas é a athrú ar an láthair.',
      ]),
      sec('Home offices, bookcases and hidden storage', 'Oifigí baile, leabhragáin agus stóráil cheilte', [
        'Built-in home offices fit a desk, filing drawers, shelving and cable management into a spare room, landing or the corner of a bedroom. Wall-to-wall bookcases, window seats with lift-up or drawer storage, hallway benches and under-stairs pull-outs make use of space that is usually wasted.',
      ], [
        'Cuireann oifigí baile ionsuite deasc, tarraiceáin chomhdaithe, seilfeanna agus bainistiú cáblaí isteach i seomra breise, ar léibheann nó i gcúinne seomra leapa. Baineann leabhragáin ó bhalla go balla, suíocháin fuinneoige le stóráil, binsí halla agus tarraingtí faoin staighre úsáid as spás a chuirtear amú de ghnáth.',
      ], [
        ['Alcove cupboards and shelving', 'Media walls with hidden cabling', 'Built-in desks and home offices', 'Window seats, hallway benches and under-stairs drawers'],
        ['Cófraí agus seilfeanna cuasa', 'Ballaí meán le cáblaí ceilte', 'Deasca ionsuite agus oifigí baile', 'Suíocháin fuinneoige, binsí halla agus tarraiceáin faoin staighre'],
      ]),
    ],
    faqs: [
      faq('Can you build a media wall with an electric fire?', 'An féidir libh balla meán le tine leictreach a thógáil?',
        'Yes. We build the recess to the fire manufacturer’s dimensions and ventilation requirements, plan the socket position and leave access for servicing. The TV position is set so it sits at a comfortable viewing height above or beside the fire.',
        'Is féidir. Tógaimid an cuasán de réir thoisí agus riachtanais aeraithe dhéantóir na tine, pleanálaimid suíomh an tsoicéid agus fágaimid rochtain le haghaidh seirbhísithe. Socraítear suíomh na teilifíse ionas go suíonn sí ag airde féachana chompordach os cionn na tine nó in aice léi.'),
      faq('Do you make under-stairs storage?', 'An ndéanann sibh stóráil faoin staighre?',
        'Yes. Under-stairs spaces can take full-depth pull-out drawers for coats, shoes and the vacuum, a cupboard for the meter or boiler with access kept clear, or an open nook for a desk or bench.',
        'Déanaimid. Is féidir tarraiceáin tarraingthe lándoimhneachta do chótaí, do bhróga agus don fholúsghlantóir a chur faoin staighre, cófra don mhéadar nó don choire le rochtain fágtha saor, nó cúinne oscailte do dheasc nó do bhinse.'),
      faq('Can built-in units be painted to match my walls?', 'An féidir aonaid ionsuite a phéinteáil chun teacht le mo bhallaí?',
        'Yes. Units can be spray-painted in a colour matched to your wall paint, finished in a contrasting tone, or delivered primed and ready for your decorator.',
        'Is féidir. Is féidir aonaid a spraephéinteáil i ndath a mheaitseálann péint do bhallaí, i dath codarsnach, nó iad a sheachadadh primeáilte réidh do do mhaisitheoir.'),
      faq('Do you build home office furniture for small rooms?', 'An dtógann sibh troscán oifige baile do sheomraí beaga?',
        'Yes. Even a 1.2 m alcove can hold a desk with shelving above, a drawer pedestal and hidden cable routes. For guest rooms we can combine a desk with wardrobe storage or a fold-down bed.',
        'Tógaimid. Is féidir deasc le seilfeanna os a chionn, tarraiceáin agus bealaí cábla ceilte a chur i gcuas fiú 1.2 m. I seomraí aíochta is féidir linn deasc a chur le stóráil vardrúis nó le leaba infhillte.'),
      faq('How long does it take to fit alcove units or a media wall?', 'Cá fhad a thógann sé aonaid chuasa nó balla meán a fheistiú?',
        'Most units are built in the workshop in two to four weeks after you approve the drawings. Installation usually takes a day for a pair of alcove units and one to two days for a full media wall, followed by filling and finishing.',
        'Tógtar formhór na n-aonad sa cheardlann i gceann dhá go ceithre seachtaine tar éis duit na líníochtaí a cheadú. Tógann an tsuiteáil lá de ghnáth do phéire aonad cuasa agus lá nó dhó do bhalla meán iomlán, agus ina dhiaidh sin líonadh agus bailchríochnú.'),
      faq('Can you add lighting to shelves and bookcases?', 'An féidir libh soilsiú a chur le seilfeanna agus le leabhragáin?',
        'Yes. Recessed LED strips under shelves or inside glazed cabinets add a soft display light. We plan the cable routes during manufacture and any new mains connection is completed by a registered electrician.',
        'Is féidir. Cuireann stiallacha LED cúlaithe faoi sheilfeanna nó i gcaibinéid ghloinithe solas taispeána bog leo. Pleanálaimid bealaí na gcáblaí le linn na déantúsaíochta agus déanann leictreoir cláraithe aon nasc príomhlíonra nua.'),
    ],
  },

  'made-to-measure-cabinets': {
    menu: t('Custom cabinets, supply-only or fitted', 'Caibinéid shaincheaptha, soláthar nó feistiú'),
    description: t(
      'Made-to-measure cabinets, vanity units, larders and cabinet doors built to your sizes in Dunboyne. Supply-only or supply and fit across Dublin and Meath.',
      'Caibinéid, aonaid niteora, lardrúis agus doirse caibinéid tógtha de réir do thomhais i nDún Búinne. Soláthar amháin nó soláthar agus feistiú.',
    ),
    answers: {
      'Can I order cabinets without installation?': t(
        'Yes. Cabinets can be ordered supply-only for collection from our Dunboyne workshop or for delivery, ready for your own builder or kitchen fitter. We can also quote supply and fit if you would rather we installed them.',
        'Is féidir. Is féidir caibinéid a ordú le soláthar amháin, le bailiú ónár gceardlann i nDún Búinne nó le seachadadh, réidh do do thógálaí nó do d’fheisteoir cistine féin. Is féidir linn luachan soláthair agus feistithe a thabhairt freisin más fearr leat go suiteálfaimis iad.',
      ),
    },
    sections: [
      sec('Cabinets in the sizes you actually need', 'Caibinéid sna méideanna a theastaíonn uait i ndáiríre', [
        'Standard flat-pack ranges jump in fixed widths and depths, which leaves gaps, filler panels and wasted space. We manufacture carcasses, doors and drawer fronts to your exact measurements — a 37 cm base unit, a shallow wall cabinet for a narrow hallway or a tall larder that reaches an unusually high ceiling.',
        'Cabinets are made for kitchens, utility rooms, bathrooms, bedrooms, offices and commercial spaces, in a range of board finishes, spray-painted MDF or real-wood veneer.',
      ], [
        'Léimeann raonta flat-pack caighdeánacha i leithid agus i ndoimhneachtaí seasta, rud a fhágann bearnaí, painéil líonta agus spás amú. Déanaimid conablaigh, doirse agus aghaidheanna tarraiceán de réir do thomhais chruinne — aonad bonn 37 cm, caibinéad balla tanaí do halla cúng nó lardrús ard a shroicheann síleáil an-ard.',
        'Déantar caibinéid do chistineacha, do sheomraí fóntais, do sheomraí folctha, do sheomraí leapa, d’oifigí agus do spásanna tráchtála, i raon bailchríocha clár, MDF spraephéinteáilte nó veiníre adhmaid fíor.',
      ]),
      sec('For homeowners, builders and designers', 'D’úinéirí tí, do thógálaithe agus do dhearthóirí', [
        'Homeowners use our cabinet service to finish a kitchen or utility room their own way. Builders, kitchen fitters and interior designers order supply-only cabinets made to their drawings, with consistent finishes and edge banding across a whole project.',
        'Send drawings, measurements or a sketch on WhatsApp and we will confirm the specification, finish, hardware and delivery before production.',
      ], [
        'Úsáideann úinéirí tí ár seirbhís caibinéad chun cistin nó seomra fóntais a chríochnú ar a mbealach féin. Ordaíonn tógálaithe, feisteoirí cistine agus dearthóirí intí caibinéid le soláthar amháin déanta de réir a gcuid líníochtaí, le bailchríocha comhsheasmhacha ar fud an tionscadail ar fad.',
        'Seol líníochtaí, tomhais nó sceitse ar WhatsApp agus deimhneoimid an tsonraíocht, an bhailchríoch, na crua-earraí agus an seachadadh roimh an táirgeadh.',
      ], [
        ['Kitchen and utility cabinets', 'Bathroom vanity units', 'Tall larders and appliance housings', 'Replacement cabinet doors and drawer fronts'],
        ['Caibinéid chistine agus fóntais', 'Aonaid niteora seomra folctha', 'Lardrúis arda agus cásanna fearas', 'Doirse caibinéid agus aghaidheanna tarraiceán nua'],
      ]),
    ],
    faqs: [
      faq('Do you make bathroom vanity units to measure?', 'An ndéanann sibh aonaid niteora seomra folctha de réir tomhais?',
        'Yes. We make wall-hung and floor-standing vanity units sized to your basin and room, using moisture-resistant board and finishes suited to bathrooms, with cut-outs planned for the waste and water supply.',
        'Déanaimid. Déanaimid aonaid niteora crochta ar an mballa agus aonaid ar an urlár de réir do bháisín agus do sheomra, as clár frith-thaise agus le bailchríocha a oireann do sheomraí folctha, agus pleanálaimid na poill don draenáil agus don soláthar uisce.'),
      faq('Can you make replacement kitchen cabinet doors?', 'An féidir libh doirse nua caibinéid chistine a dhéanamh?',
        'Yes. We make replacement doors and drawer fronts to the sizes of your existing cabinets, in painted, veneered or board finishes, and drill them for your hinges. It is a cost-effective way to update a kitchen with sound carcasses.',
        'Is féidir. Déanaimid doirse agus aghaidheanna tarraiceán nua de réir mhéideanna do chaibinéad reatha, i mbailchríocha péinteáilte, veiníre nó clár, agus druileálaimid iad do d’insí. Is bealach costéifeachtúil é cistin le conablaigh láidre a nuashonrú.'),
      faq('Which hardware do you use?', 'Cé na crua-earraí a úsáideann sibh?',
        'Cabinets are fitted with soft-close hinges and drawer runners from established European hardware makers. If you need a particular system to match existing units, tell us when you send your measurements.',
        'Feistítear caibinéid le hinsí agus ráillí tarraiceán bog-dhúnta ó dhéantóirí crua-earraí Eorpacha aitheanta. Má theastaíonn córas ar leith uait chun teacht le haonaid reatha, inis dúinn nuair a sheolann tú do thomhais.'),
      faq('Can I collect cabinets from your workshop?', 'An féidir liom caibinéid a bhailiú ón gceardlann?',
        'Yes. Collection from Barstown Commercial Park, Dunboyne, can be arranged by appointment during opening hours. Delivery across Dublin and Meath can also be quoted.',
        'Is féidir. Is féidir bailiú ó Pháirc Tráchtála Barstown, Dún Búinne, a shocrú trí choinne le linn uaireanta oscailte. Is féidir luachan a thabhairt freisin do sheachadadh ar fud Bhaile Átha Cliath agus na Mí.'),
      faq('Do you build cabinets for commercial premises?', 'An dtógann sibh caibinéid d’áitribh thráchtála?',
        'Yes. We make cabinets for offices, tea points, salons, clinics, cafés and retail back-of-house areas, using hard-wearing finishes that stand up to daily use.',
        'Tógaimid. Déanaimid caibinéid d’oifigí, do phointí tae, do shalóin, do chlinicí, do chaiféanna agus do limistéir chúil siopaí, le bailchríocha láidre a sheasann d’úsáid laethúil.'),
    ],
  },

  'furniture-assembly': {
    menu: t('IKEA, PAX & all flat-pack brands', 'IKEA, PAX agus gach branda flat-pack'),
    description: t(
      'Flat-pack furniture assembly in Dublin & Meath: IKEA, PAX wardrobes, beds, desks and office furniture assembled carefully, anchored and tidied up. Book on WhatsApp.',
      'Cóimeáil troscáin flat-pack i mBaile Átha Cliath agus sa Mhí: IKEA, vardrúis PAX, leapacha agus deasca, cóimeáilte go cúramach agus daingnithe. Cuir in áirithe ar WhatsApp.',
    ),
    answers: {
      'How much does flat-pack assembly cost in Dublin?': t(
        'Assembly is quoted on the items, their size and the number of pieces, plus access such as stairs or parking. A starting rate for single items is listed on our Enquiries page; send a list or photos of the boxes on WhatsApp and we will confirm the total before booking.',
        'Tugtar luachan ar chóimeáil de réir na n-earraí, a méid agus líon na bpíosaí, chomh maith le rochtain ar nós staighrí nó páirceála. Tá ráta tosaigh d’earraí aonair ar ár leathanach Fiosrúchán; seol liosta nó grianghraif de na boscaí ar WhatsApp agus deimhneoimid an t-iomlán roimh ré.',
      ),
    },
    sections: [
      sec('Every type of flat-pack furniture', 'Gach cineál troscáin flat-pack', [
        'We assemble wardrobes, beds, chests of drawers, desks, bookcases, TV units, dining sets, garden furniture, cots and bunk beds from IKEA, JYSK, Argos, Wayfair, Harvey Norman, DFS, Amazon and other brands. Large modular systems such as IKEA PAX, PLATSA and BESTÅ are a speciality.',
        'Tall and heavy items are anchored to the wall with fixings suited to the wall type — brick, block or plasterboard — to reduce the risk of tipping.',
      ], [
        'Cóimeálaimid vardrúis, leapacha, cófraí tarraiceán, deasca, leabhragáin, aonaid teilifíse, sraitheanna bia, troscán gairdín, cliabháin agus leapacha bunc ó IKEA, JYSK, Argos, Wayfair, Harvey Norman, DFS, Amazon agus brandaí eile. Is speisialtacht iad córais mhóra mhodúlacha ar nós IKEA PAX, PLATSA agus BESTÅ.',
        'Daingnítear earraí arda agus troma leis an mballa le daingneáin a oireann don chineál balla — brící, bloic nó clár plástair — chun an baol titim a laghdú.',
      ], [
        ['IKEA PAX, PLATSA and BESTÅ', 'Beds, bunk beds and cots', 'Desks and office furniture', 'Wall anchoring and packaging removal'],
        ['IKEA PAX, PLATSA agus BESTÅ', 'Leapacha, leapacha bunc agus cliabháin', 'Deasca agus troscán oifige', 'Daingniú balla agus pacáistiú a bhailiú'],
      ]),
      sec('Homes, landlords and offices', 'Tithe, tiarnaí talún agus oifigí', [
        'Moving into a new home is the most common reason people book assembly: several rooms of furniture can be built in one visit so the house is usable straight away. Landlords and letting agents use the service to furnish rental properties between tenancies.',
        'For offices we assemble desks, pedestals, storage and meeting-room furniture, and can work early or late to avoid disrupting staff.',
      ], [
        'Is é bogadh isteach i dteach nua an chúis is coitianta le cóimeáil a chur in áirithe: is féidir troscán roinnt seomraí a thógáil in aon chuairt amháin ionas gur féidir an teach a úsáid láithreach. Úsáideann tiarnaí talún agus gníomhairí ligin an tseirbhís chun áitribh ar cíos a fheistiú idir tionóntachtaí.',
        'D’oifigí cóimeálaimid deasca, tarraiceáin, stóráil agus troscán seomraí cruinnithe, agus is féidir linn oibriú go luath nó go déanach chun cur isteach ar fhoireann a sheachaint.',
      ]),
    ],
    faqs: [
      faq('Can you assemble furniture on the day it is delivered?', 'An féidir libh troscán a chóimeáil an lá a sheachadtar é?',
        'Often, yes. Tell us the delivery date and we will try to book assembly for the same day or the day after. Small jobs are frequently scheduled within the same week.',
        'Is minic is féidir. Inis dúinn dáta an tseachadta agus déanfaimid iarracht an chóimeáil a chur in áirithe don lá céanna nó don lá dár gcionn. Is minic a sceidealaítear jabanna beaga laistigh den tseachtain chéanna.'),
      faq('Do you anchor wardrobes and bookcases to the wall?', 'An ndaingníonn sibh vardrúis agus leabhragáin leis an mballa?',
        'Yes. Anti-tip anchoring is strongly recommended for tall furniture, especially in homes with children. We use fixings suited to your wall and check for pipes and cables before drilling.',
        'Daingnímid. Moltar go láidir daingniú frith-thitim do throscán ard, go háirithe i dtithe le leanaí. Úsáidimid daingneáin a oireann do do bhalla agus seiceálaimid le haghaidh píopaí agus cáblaí sula ndruileálaimid.'),
      faq('Can you take apart and rebuild furniture when I move house?', 'An féidir libh troscán a dhíchóimeáil agus a atógáil nuair a bhogaim teach?',
        'Yes. We can dismantle wardrobes, beds and other flat-pack furniture before the move, label the fittings and rebuild everything in your new home.',
        'Is féidir. Is féidir linn vardrúis, leapacha agus troscán flat-pack eile a dhíchóimeáil roimh an aistriú, na feistis a lipéadú agus gach rud a atógáil i do theach nua.'),
      faq('Do you assemble garden furniture, sheds and playsets?', 'An gcóimeálann sibh troscán gairdín, seideanna agus trealamh súgartha?',
        'We assemble garden tables, benches, storage boxes and many flat-pack timber items. For large sheds, garden rooms or climbing frames, send the product link so we can confirm the time and any base preparation needed.',
        'Cóimeálaimid boird gairdín, binsí, boscaí stórála agus go leor earraí adhmaid flat-pack. I gcás seideanna móra, seomraí gairdín nó frámaí dreapadóireachta, seol nasc an táirge ionas gur féidir linn an t-am agus aon ullmhú bonn a dheimhniú.'),
      faq('What if a part is missing or damaged?', 'Cad a tharlaíonn má tá páirt ar iarraidh nó damáistithe?',
        'We check the parts before starting. If something is missing or damaged we photograph it so you can claim a replacement from the retailer, and we finish the job once the part arrives.',
        'Seiceálaimid na páirteanna sula dtosaímid. Má tá rud ar iarraidh nó damáistithe tógaimid grianghraf de ionas gur féidir leat páirt nua a éileamh ón miondíoltóir, agus críochnaímid an jab nuair a thagann an pháirt.'),
      faq('Do you assemble office furniture for businesses?', 'An gcóimeálann sibh troscán oifige do ghnólachtaí?',
        'Yes. We assemble desks, pedestals, storage, meeting tables and reception furniture for offices, clinics and shops across Dublin and Meath, and can work outside business hours.',
        'Cóimeálaimid. Cóimeálaimid deasca, tarraiceáin, stóráil, boird chruinnithe agus troscán fáiltithe d’oifigí, do chlinicí agus do shiopaí ar fud Bhaile Átha Cliath agus na Mí, agus is féidir linn oibriú lasmuigh d’uaireanta gnó.'),
    ],
  },
};
