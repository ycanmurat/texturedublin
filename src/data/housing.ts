import type { AdviceKey, CommercialId, HousingId, L10n } from './types.ts';

type WoodAdvice = Exclude<AdviceKey, 'signs'>;

export interface HousingProfile {
  name: L10n;
  advice: Record<WoodAdvice, L10n>;
}

/** Local building stock -> practical, service-specific advice (used on location pages). */
export const housing: Record<HousingId, HousingProfile> = {
  georgian: {
    name: { en: 'Georgian townhouses', ga: 'Tithe baile Seoirseacha' },
    advice: {
      wardrobes: {
        en: 'Georgian rooms are tall and beautifully proportioned, often with sash windows and deep shutters. We design floor-to-ceiling wardrobes with panelled doors that respect those proportions, and work around cornicing and original features with removable scribe panels.',
        ga: 'Bíonn seomraí Seoirseacha ard agus dea-chomhréireach, go minic le fuinneoga saise agus comhlaí doimhne. Dearaimid vardrúis ó urlár go síleáil le doirse painéalaithe a thugann ómós don chomhréir sin, agus oibrímid timpeall ar choirnis agus gnéithe bunaidh le painéil oiriúnaithe inbhainte.',
      },
      kitchens: {
        en: 'Kitchens in Georgian houses usually sit at garden level, with low windows and thick walls. In-frame or painted Shaker cabinetry suits the architecture; we template around uneven walls and plan services carefully where protected-structure rules apply.',
        ga: 'Is gnách go mbíonn cistineacha i dtithe Seoirseacha ag leibhéal an ghairdín, le fuinneoga ísle agus ballaí tiubha. Oireann caibinéid i bhfráma nó Shaker phéinteáilte don ailtireacht; déanaimid teimpléid timpeall ar bhallaí míchothroma agus pleanálaimid seirbhísí go cúramach nuair a bhaineann rialacha struchtúir chosanta leo.',
      },
      builtins: {
        en: 'Recessed alcoves, deep window reveals and tall ceilings are perfect for library-style shelving and panelled storage that looks original to the house.',
        ga: 'Tá cuasa cúlaithe, fuinneoga doimhne agus síleálacha arda foirfe do sheilfeanna i stíl leabharlainne agus do stóráil phainéalaithe a fhéachann bunaidh sa teach.',
      },
      assembly: {
        en: 'Many Georgian buildings are now apartments or offices with narrow staircases and no lift, so we carry components up by hand and assemble in the room.',
        ga: 'Is árasáin nó oifigí anois iad go leor foirgneamh Seoirseach le staighrí cúnga agus gan ardaitheoir, mar sin iompraímid na comhpháirteanna suas de láimh agus cóimeálaimid sa seomra iad.',
      },
    },
  },
  victorian: {
    name: { en: 'Victorian & Edwardian red-bricks', ga: 'Brící dearga Victeoiriacha agus Éadbhardacha' },
    advice: {
      wardrobes: {
        en: 'Victorian and Edwardian red-bricks have high ceilings, picture rails and a chimney breast in most bedrooms. Wardrobes built into the alcoves either side of the chimney are the classic solution, scribed around skirting and cornicing so nothing original is damaged.',
        ga: 'Bíonn síleálacha arda, ráillí pictiúr agus brollach simléir i bhformhór na seomraí leapa i dtithe bríce dearga Victeoiriacha agus Éadbhardacha. Is é an réiteach clasaiceach vardrúis tógtha isteach sna cuasa ar gach taobh den simléar, oiriúnaithe timpeall ar chláir sciorta agus ar choirnis ionas nach ndéantar dochar d’aon ghné bhunaidh.',
      },
      kitchens: {
        en: 'Kitchens in red-brick terraces are often in a narrow rear return or a modern extension. We design efficient galley layouts for returns and statement islands for extensions, with tall larders that make the most of the ceiling height.',
        ga: 'Is minic a bhíonn cistineacha in ardáin bríce dearga i síneadh cúil cúng nó i síneadh nua-aimseartha. Dearaimid leagan amach gailí éifeachtúil do shíntí cúil agus oileáin shuntasacha do shíntí nua, le lardrúis arda a bhaineann an leas is fearr as airde na síleála.',
      },
      builtins: {
        en: 'Chimney-breast alcoves are made for built-in units: cupboards below, floating shelves above, sized to line up with the mantelpiece and dado rail. They are one of the most popular upgrades in period homes.',
        ga: 'Tá cuasa brollach simléir déanta d’aonaid ionsuite: cófraí thíos, seilfeanna ar snámh thuas, tomhaiste le hailíniú leis an matal agus leis an ráille dado. Tá siad ar cheann de na huasghráduithe is coitianta i dtithe seanré.',
      },
      assembly: {
        en: 'Narrow hallways and steep stairs are common in terraced houses, so we assemble bulky items in the room and anchor tall pieces securely — important on older lath-and-plaster walls.',
        ga: 'Is coitianta hallaí cúnga agus staighrí géara i dtithe sraithe, mar sin cóimeálaimid earraí toirtiúla sa seomra agus daingnímid píosaí arda go slán — rud tábhachtach ar sheanbhallaí slat agus plástair.',
      },
    },
  },
  interwar: {
    name: { en: '1930s–50s semis & terraces', ga: 'Tithe leathscoite agus sraithe ó na 1930idí–50idí' },
    advice: {
      wardrobes: {
        en: 'Bedrooms in 1930s–50s houses are compact, with lower ceilings and a box room. Sliding-door wardrobes save floor space, and the stair bulkhead in the box room can become genuinely useful built-in storage.',
        ga: 'Bíonn seomraí leapa i dtithe ó na 1930idí–50idí dlúth, le síleálacha níos ísle agus seomra bosca. Sábhálann vardrúis le doirse sleamhnáin spás urláir, agus is féidir le cófra an staighre sa seomra bosca a bheith ina stóráil ionsuite fíorúsáideach.',
      },
      kitchens: {
        en: 'Many homes of this era have been extended to the rear. We design open-plan kitchens that link the original house and the extension, often with an island or peninsula facing the garden.',
        ga: 'Síníodh go leor tithe ón ré seo ar chúl. Dearaimid cistineacha oscailte a nascann an teach bunaidh agus an síneadh, go minic le hoileán nó leithinis os comhair an ghairdín.',
      },
      builtins: {
        en: 'Under-stairs cupboards, the alcoves beside the original fireplace and the space above the box-room stairs are ideal for made-to-measure storage.',
        ga: 'Tá cófraí faoin staighre, na cuasa in aice leis an tinteán bunaidh agus an spás os cionn staighre an tseomra bosca iontach do stóráil de réir tomhais.',
      },
      assembly: {
        en: 'Box rooms and compact bedrooms need careful planning; we assemble in situ and fit wardrobes tight to the ceiling so every centimetre counts.',
        ga: 'Teastaíonn pleanáil chúramach ó sheomraí bosca agus ó sheomraí leapa dlútha; cóimeálaimid san áit agus feistímid vardrúis go dlúth leis an tsíleáil ionas go gcomhairtear gach ceintiméadar.',
      },
    },
  },
  suburban: {
    name: { en: '1960s–80s suburban homes', ga: 'Tithe bruachbhailte ó na 1960idí–80idí' },
    advice: {
      wardrobes: {
        en: 'Suburban semis and bungalows from the 1960s–80s usually have regular, rectangular bedrooms — ideal for full-width sliding or hinged wardrobes. Replacing tired original built-ins with modern interiors is one of the most worthwhile upgrades.',
        ga: 'Is gnách go mbíonn seomraí leapa rialta dronuilleogacha i dtithe leathscoite agus bungalónna bruachbhailte ó na 1960idí–80idí — iontach do vardrúis sleamhnáin nó insí lánleithid. Tá sé ar cheann de na huasghráduithe is fiúntaí seanvardrúis ionsuite a athsholáthar le taobh istigh nua-aimseartha.',
      },
      kitchens: {
        en: 'These homes often have a separate kitchen and dining room. Opening them up and fitting a new L-shaped or island kitchen transforms how the house works for a family.',
        ga: 'Is minic a bhíonn cistin agus seomra bia ar leith sna tithe seo. Má osclaítear iad agus má fheistítear cistin nua i gcruth L nó le hoileán, athraítear go mór an chaoi a n-oibríonn an teach do theaghlach.',
      },
      builtins: {
        en: 'Living rooms with chimney breasts suit media walls and alcove units, while attic conversions benefit from eaves storage and built-in desks.',
        ga: 'Oireann ballaí meán agus aonaid chuasa do sheomraí suí le brollaigh simléir, agus baineann tiontuithe áiléir leas as stóráil faoin díon agus deasca ionsuite.',
      },
      assembly: {
        en: 'Off-street parking and easy access make assembly days quick and straightforward in most suburban roads.',
        ga: 'Déanann páirceáil lasmuigh den tsráid agus rochtain éasca laethanta cóimeála tapa agus simplí ar fhormhór na mbóithre bruachbhailte.',
      },
    },
  },
  estate: {
    name: { en: '1990s–2000s estates', ga: 'Eastáit ó na 1990idí–2000idí' },
    advice: {
      wardrobes: {
        en: 'Houses from the 1990s and 2000s tend to have standard 2.4 m ceilings and builder-grade wardrobes. Upgrading to floor-to-ceiling fitted wardrobes with proper drawers and lighting is one of the best-value improvements you can make.',
        ga: 'Is gnách go mbíonn síleálacha caighdeánacha 2.4 m agus vardrúis de ghrád tógálaí i dtithe ó na 1990idí agus 2000idí. Tá uasghrádú go vardrúis fheistithe ó urlár go síleáil le tarraiceáin cheart agus soilsiú ar cheann de na feabhsuithe is fearr luach is féidir leat a dhéanamh.',
      },
      kitchens: {
        en: 'Many original builder kitchens from this period are now more than twenty years old. A new bespoke kitchen — or new doors on sound carcasses — modernises the heart of the house.',
        ga: 'Tá go leor cistineacha bunaidh tógálaí ón tréimhse seo níos mó ná fiche bliain d’aois anois. Nuachóiríonn cistin shaincheaptha nua — nó doirse nua ar chonablaigh láidre — croí an tí.',
      },
      builtins: {
        en: 'Media walls, under-stairs pull-outs and home-office nooks make the most of open-plan ground floors and smaller fourth bedrooms.',
        ga: 'Baineann ballaí meán, tarraingtí faoin staighre agus cúinní oifige baile an leas is fearr as urláir talún oscailte agus as ceathrú seomraí leapa níos lú.',
      },
      assembly: {
        en: 'Driveway parking and modern plasterboard walls make for quick assembly; we use proper plasterboard fixings to anchor tall furniture safely.',
        ga: 'Déanann páirceáil chabhsa agus ballaí cláir phlástair nua-aimseartha cóimeáil thapa; úsáidimid daingneáin cheart do chlár plástair chun troscán ard a dhaingniú go sábháilte.',
      },
    },
  },
  newbuild: {
    name: { en: 'New-build homes', ga: 'Tithe nuathógtha' },
    advice: {
      wardrobes: {
        en: 'New-build homes often come with bare bedrooms or very basic wardrobes. We design fitted wardrobes that suit modern A-rated construction — fixing correctly into plasterboard and keeping vents and sockets accessible.',
        ga: 'Is minic a thagann tithe nuathógtha le seomraí leapa folmha nó le vardrúis an-bhunúsacha. Dearaimid vardrúis fheistithe a oireann do thógáil nua-aimseartha de ghrád A — á ndaingniú i gceart i gclár plástair agus ag coinneáil gaothairí agus soicéad inrochtana.',
      },
      kitchens: {
        en: 'New homes usually have compact, open-plan kitchen-living spaces. Extra tall units, a breakfast bar or a walk-in pantry cupboard can add a surprising amount of storage.',
        ga: 'Is gnách go mbíonn spásanna cistine agus maireachtála oscailte dlúth i dtithe nua. Is féidir le haonaid bhreise arda, beár bricfeasta nó cófra lardrúis a lán stórála a chur leis.',
      },
      builtins: {
        en: 'Plain new-build walls are a blank canvas for media walls, panelled feature walls and built-in desks.',
        ga: 'Is canbhás bán iad ballaí loma tithe nua do bhallaí meán, do bhallaí gné painéalaithe agus do dheasca ionsuite.',
      },
      assembly: {
        en: 'Moving into a new build? We can assemble a whole house of flat-pack furniture in a day or two, anchoring wardrobes and chests of drawers for child safety.',
        ga: 'Ag bogadh isteach i dteach nua? Is féidir linn troscán flat-pack tí iomláin a chóimeáil i lá nó dhó, ag daingniú vardrús agus cófraí tarraiceán ar mhaithe le sábháilteacht leanaí.',
      },
    },
  },
  apartment: {
    name: { en: 'City apartments', ga: 'Árasáin chathrach' },
    advice: {
      wardrobes: {
        en: 'Apartment bedrooms are tight, so sliding or mirrored doors, full-height storage and clever interiors make the biggest difference. We work within management-company rules for deliveries, lifts and working hours.',
        ga: 'Bíonn seomraí leapa árasán teann, mar sin is iad doirse sleamhnáin nó scátháin, stóráil lánairde agus taobh istigh cliste is mó a dhéanann difríocht. Oibrímid de réir rialacha na cuideachta bainistíochta maidir le seachadtaí, ardaitheoirí agus uaireanta oibre.',
      },
      kitchens: {
        en: 'Apartment kitchens are usually single-wall or galley layouts. Made-to-measure units let you add storage right up to the ceiling and integrate appliances neatly.',
        ga: 'Is gnách go mbíonn leagan amach balla aonair nó gailí ag cistineacha árasán. Ligeann aonaid de réir tomhais duit stóráil a chur suas go dtí an tsíleáil agus fearais a chomhtháthú go néata.',
      },
      builtins: {
        en: 'Hall storage, media units and fold-down desks help small apartments work harder without feeling cluttered.',
        ga: 'Cabhraíonn stóráil halla, aonaid mheán agus deasca infhillte le hárasáin bheaga oibriú níos fearr gan a bheith plódaithe.',
      },
      assembly: {
        en: 'We book lifts and loading bays with your management company, carry everything up and take all packaging away — no cardboard left in the bin store.',
        ga: 'Cuirimid ardaitheoirí agus bánna lódála in áirithe le do chuideachta bhainistíochta, iompraímid gach rud suas agus tógaimid an pacáistiú ar fad linn — gan aon chairtchlár fágtha sa stór bruscair.',
      },
    },
  },
  coastal: {
    name: { en: 'Coastal homes', ga: 'Tithe cois cósta' },
    advice: {
      wardrobes: {
        en: 'Coastal homes range from Victorian villas to modern houses with sea views. We specify moisture-resistant boards and quality finishes that cope with sea air, and design dressing rooms that make the most of larger bedrooms.',
        ga: 'Téann tithe cois cósta ó villaí Victeoiriacha go tithe nua-aimseartha le radharc ar an bhfarraige. Sonraímid cláir fhrithfhliuchra agus bailchríocha ardchaighdeáin a sheasann d’aer na farraige, agus dearaimid seomraí feistis a bhaineann an leas is fearr as seomraí leapa níos mó.',
      },
      kitchens: {
        en: 'Kitchens here often open onto gardens or views, so we plan layouts around the light — islands facing the window, tall storage on the back wall and durable finishes for a busy family home by the sea.',
        ga: 'Is minic a osclaíonn cistineacha anseo ar ghairdíní nó ar radharcanna, mar sin pleanálaimid an leagan amach timpeall an tsolais — oileáin os comhair na fuinneoige, stóráil ard ar an mballa cúil agus bailchríocha marthanacha do theach teaghlaigh gnóthach cois farraige.',
      },
      builtins: {
        en: 'Boot rooms, window seats and hallway storage are especially useful near the beach — for wetsuits, boots and bikes.',
        ga: 'Tá seomraí buataisí, suíocháin fuinneoige agus stóráil halla thar a bheith úsáideach in aice na trá — do chultacha fliucha, do bhuataisí agus do rothair.',
      },
      assembly: {
        en: 'Larger homes mean longer furniture lists; we schedule full-day visits and protect floors and staircases throughout.',
        ga: 'Ciallaíonn tithe níos mó liostaí troscáin níos faide; sceidealaímid cuairteanna lae iomláin agus cosnaímid urláir agus staighrí i gcaitheamh an ama.',
      },
    },
  },
  detached: {
    name: { en: 'Large detached homes', ga: 'Tithe móra scoite' },
    advice: {
      wardrobes: {
        en: 'Larger bedrooms and dressing rooms suit walk-in wardrobes with islands, glass-fronted display cabinets and integrated lighting. We work alongside your architect or interior designer where needed.',
        ga: 'Oireann vardrúis siúil isteach le hoileáin, caibinéid taispeána le haghaidh gloine agus soilsiú comhtháite do sheomraí leapa agus seomraí feistis níos mó. Oibrímid le d’ailtire nó le do dhearthóir intí nuair is gá.',
      },
      kitchens: {
        en: 'Premium homes call for statement kitchens: large islands, in-frame cabinetry, pantry larders and boot-room utilities built as one coordinated scheme.',
        ga: 'Éilíonn tithe den scoth cistineacha suntasacha: oileáin mhóra, caibinéid i bhfráma, lardrúis agus seomraí fóntais tógtha mar scéim chomhordaithe amháin.',
      },
      builtins: {
        en: 'Home offices, libraries, media rooms and wine storage are popular joinery projects in larger houses.',
        ga: 'Is tionscadail siúinéireachta coitianta i dtithe níos mó iad oifigí baile, leabharlanna, seomraí meán agus stóráil fíona.',
      },
      assembly: {
        en: 'For larger homes we coordinate multi-room installs over several days with minimal disruption.',
        ga: 'I dtithe níos mó, comhordaímid suiteálacha ilseomra thar roinnt laethanta leis an gcur isteach is lú.',
      },
    },
  },
  cottage: {
    name: { en: 'Artisan cottages', ga: 'Teachíní ceardaithe' },
    advice: {
      wardrobes: {
        en: 'Artisan cottages have small rooms, low ceilings and walls that are rarely straight. Bespoke wardrobes are often the only way to get proper storage without losing floor space, and we scribe every panel to the wall.',
        ga: 'Bíonn seomraí beaga, síleálacha ísle agus ballaí nach mbíonn díreach ach go hannamh i dteachíní ceardaithe. Is minic gurb iad vardrúis shaincheaptha an t-aon bhealach chun stóráil cheart a fháil gan spás urláir a chailleadh, agus oiriúnaímid gach painéal don bhalla.',
      },
      kitchens: {
        en: 'Cottage kitchens are compact and full of character. Made-to-measure units squeeze storage into spaces where standard cabinets won’t fit, and painted Shaker doors suit the period feel.',
        ga: 'Bíonn cistineacha teachín dlúth agus lán de charachtar. Cuireann aonaid de réir tomhais stóráil isteach i spásanna nach n-oireann gnáthchaibinéid dóibh, agus oireann doirse Shaker péinteáilte don mhothú seanré.',
      },
      builtins: {
        en: 'Alcoves, under-stairs space and attic eaves are valuable in small cottages; built-ins can double a home’s usable storage.',
        ga: 'Tá cuasa, an spás faoin staighre agus bun an dín luachmhar i dteachíní beaga; is féidir le haonaid ionsuite an stóráil inúsáidte i dteach a dhúbailt.',
      },
      assembly: {
        en: 'Narrow streets and limited parking are common, so we plan access carefully and assemble bulky items in the room.',
        ga: 'Is coitianta sráideanna cúnga agus páirceáil theoranta, mar sin pleanálaimid rochtain go cúramach agus cóimeálaimid earraí toirtiúla sa seomra.',
      },
    },
  },
};

/** Commercial streetscape -> signage advice */
export const commercial: Record<CommercialId, { name: L10n; advice: L10n }> = {
  cityRetail: {
    name: { en: 'City-centre retail & hospitality', ga: 'Miondíol agus fáilteachas i lár na cathrach' },
    advice: {
      en: 'City-centre frontages compete hard for attention and many sit within Architectural Conservation Areas, where the council expects high-quality, traditional-style signage. Hand-painted fascias, individual letters and discreet halo lighting usually go down best with planners.',
      ga: 'Bíonn aghaidheanna i lár na cathrach in iomaíocht ghéar ar son airde agus tá go leor acu laistigh de Limistéir Chaomhantais Ailtireachta, áit a mbíonn comharthaíocht ardchaighdeáin i stíl thraidisiúnta ag teastáil ón gcomhairle. Is gnách gurb iad cláir aghaidhe lámhphéinteáilte, litreacha aonair agus soilsiú halóige discréideach is fearr a thaitníonn le pleanálaithe.',
    },
  },
  village: {
    name: { en: 'Village main streets', ga: 'Príomhshráideanna sráidbhailte' },
    advice: {
      en: 'Village main streets mix independent cafés, salons and shops. Timber fascias, projecting signs and window lettering suit the streetscape, and good signage helps you stand out to passing foot traffic and weekend visitors.',
      ga: 'Meascann príomhshráideanna sráidbhailte caiféanna, salóin agus siopaí neamhspleácha. Oireann cláir aghaidhe adhmaid, comharthaí crochta agus litreoireacht fuinneoige don sráid-dreach, agus cabhraíonn comharthaíocht mhaith leat seasamh amach do choisithe agus do chuairteoirí deireadh seachtaine.',
    },
  },
  business: {
    name: { en: 'Business parks & office districts', ga: 'Páirceanna gnó agus ceantair oifige' },
    advice: {
      en: 'Business parks and office districts need clear building signage, reception logos and wayfinding for visitors. We work to landlords’ signage specifications and install out of hours.',
      ga: 'Teastaíonn comharthaíocht shoiléir foirgnimh, lógónna fáiltithe agus treoshuíomh do chuairteoirí i bpáirceanna gnó agus i gceantair oifige. Oibrímid de réir shonraíochtaí comharthaíochta na dtiarnaí talún agus suiteálaimid lasmuigh d’uaireanta gnó.',
    },
  },
  suburbanParade: {
    name: { en: 'Suburban parades & shopping centres', ga: 'Paráidí bruachbhailte agus ionaid siopadóireachta' },
    advice: {
      en: 'Suburban parades and shopping centres often have landlord signage rules and set fascia sizes. Bright, legible panel signs and lightboxes work well, and we can build signage to centre-management specification.',
      ga: 'Is minic a bhíonn rialacha comharthaíochta tiarna talún agus méideanna socraithe clár aghaidhe ag paráidí bruachbhailte agus ag ionaid siopadóireachta. Oibríonn comharthaí painéil gheala inléite agus boscaí solais go maith, agus is féidir linn comharthaíocht a thógáil de réir shonraíocht bhainistíocht an ionaid.',
    },
  },
  town: {
    name: { en: 'Town centres', ga: 'Lár bailte' },
    advice: {
      en: 'Town-centre businesses rely on locals and commuters alike. Strong fascia signage, vehicle graphics and window displays work together to build recognition, and each county council has its own shopfront guidance, which we’ll help you navigate.',
      ga: 'Bíonn gnólachtaí i lár bailte ag brath ar mhuintir na háite agus ar chomaitéirí araon. Oibríonn comharthaíocht aghaidhe láidir, grafaicí feithiclí agus taispeántais fuinneoige le chéile chun aitheantas a thógáil, agus bíonn a treoir féin ag gach comhairle contae maidir le haghaidheanna siopa, rud a gcabhróimid leat leis.',
    },
  },
};
