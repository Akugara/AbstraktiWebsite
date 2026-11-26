import type { LocalizedText } from './portfolioData'

export interface PricingTier {
  name: string
  price: LocalizedText
  description: LocalizedText
  features: LocalizedText[]
  monthlyNote: LocalizedText
  featured?: boolean
}

export interface FaqItem {
  question: LocalizedText
  answer: LocalizedText
}

export interface ServicePageData {
  slug: 'photography' | 'video-production' | 'graphic-design' | 'web-design'
  name: LocalizedText
  metaTitle: LocalizedText
  metaDescription: LocalizedText
  heroEyebrow: LocalizedText
  heroIntro: LocalizedText[]
  pricingTiers: PricingTier[]
  upsell?: { text: LocalizedText }
  faq: FaqItem[]
  portfolioTags: string[]
  relatedTagCloudKeywords: LocalizedText[]
  serviceType: LocalizedText
  ogImage: string
}

export const servicesData: ServicePageData[] = [
  {
    slug: 'photography',
    name: { en: 'Photography', fi: 'Valokuvaus' },
    metaTitle: { en: 'Photography Services in Turku, Finland | Abstrakti', fi: 'Valokuvauspalvelut Turussa | Abstrakti' },
    metaDescription: {
      en: 'Professional photography based in Turku, Finland, serving clients across Finland, Europe and worldwide. Commercial usage rights included. Reference prices from €650.',
      fi: 'Ammattimaista valokuvausta Turusta, palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman. Kaupalliset käyttöoikeudet sisältyvät. Viitteelliset hinnat alkaen 650 €.',
    },
    heroEyebrow: { en: 'Photography Services · Based in Finland, Available Worldwide', fi: 'Valokuvauspalvelut · Suomesta käsin, saatavilla maailmanlaajuisesti' },
    heroIntro: [
      {
        en: "We're a Turku-based creative studio that treats every shoot as a chance to tell your brand's story with more clarity than a stock photo ever could. Over a decade of commercial and editorial work has taught us the same lesson every time: less is more — a handful of strong, deliberate images beats a memory card full of filler.",
        fi: 'Olemme Turussa toimiva luova studio, joka näkee jokaisen kuvaussession mahdollisuutena kertoa brändisi tarina selkeämmin kuin yksikään kuvapankkikuva koskaan voisi. Yli vuosikymmenen kaupallinen ja toimituksellinen kokemus on opettanut meille aina samaa: vähemmän on enemmän – muutama vahva, harkittu kuva voittaa muistikortin täynnä täytekuvia.',
      },
      {
        en: "Whether you need product photography for an e-commerce launch, portraits for your team page, or brand photography to go with a new identity, we run a focused half-day or full-day session, edit everything ourselves, and hand over commercial usage rights with the files — no licensing headaches later.",
        fi: 'Tarvitsetpa tuotekuvausta verkkokauppaa varten, muotokuvia tiimisivulle tai brändikuvausta uuden identiteetin tueksi, toteutamme kohdistetun puolen päivän tai koko päivän kuvaussession, editoimme kaiken itse ja luovutamme kaupalliset käyttöoikeudet tiedostojen mukana — ei lisenssiongelmia jälkikäteen.',
      },
      {
        en: "Based in Turku, we work with clients across Finland, Europe and worldwide, and we're happy to travel for the right project.",
        fi: 'Toimimme Turusta käsin ja palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman. Matkustamme mielellämme oikean projektin puolesta.',
      },
    ],
    pricingTiers: [
      {
        name: 'Photography',
        price: { en: '€650', fi: '650 €' },
        description: { en: 'Professional photography services for products, portraits, or commercial needs.', fi: 'Ammattimaista valokuvauspalvelua tuotteille, muotokuville tai kaupallisiin tarpeisiin.' },
        features: [
          { en: 'Half day session (4 hours)', fi: 'Puolen päivän kuvaussessio (4 tuntia)' },
          { en: 'Professional editing', fi: 'Ammattimainen kuvankäsittely' },
          { en: '50+ high-resolution photos', fi: '50+ korkearesoluutioista kuvaa' },
          { en: 'Commercial usage rights', fi: 'Kaupalliset käyttöoikeudet' },
        ],
        monthlyNote: { en: 'Monthly package: €465/session (3-month commitment)', fi: 'Kuukausipaketti: 465 €/sessio (3 kuukauden sitoumus)' },
      },
    ],
    upsell: { text: { en: 'Need video too? See our Photography & Video bundle pricing', fi: 'Tarvitsetko myös videota? Katso valokuvaus- ja videopaketin hinnoittelu' } },
    faq: [
      {
        question: { en: 'Do you only shoot in Turku?', fi: 'Kuvaatteko vain Turussa?' },
        answer: {
          en: "We're based in Turku, Finland, but we work with clients across Finland, Europe and worldwide. Travel can be arranged for the right project — just mention your location when you get in touch.",
          fi: 'Olemme Turusta, mutta palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman. Matkustaminen voidaan järjestää oikean projektin puolesta — mainitse sijaintisi ottaessasi yhteyttä.',
        },
      },
      {
        question: { en: 'Are the listed prices fixed?', fi: 'Ovatko ilmoitetut hinnat kiinteitä?' },
        answer: {
          en: 'These are reference prices that can be adjusted to your specific needs and budget. A quick call usually gets you an accurate quote based on scope.',
          fi: 'Nämä ovat viitteellisiä hintoja, joita voidaan muokata tarpeisiisi ja budjettiisi sopiviksi. Lyhyt puhelu riittää usein tarkan tarjouksen laskemiseen laajuuden perusteella.',
        },
      },
      {
        question: { en: 'Do you shoot events?', fi: 'Kuvaatteko tapahtumia?' },
        answer: {
          en: "Event photography is handled with a custom package rather than our standard session pricing — contact us directly and we'll put together a coverage plan for your event.",
          fi: 'Tapahtumakuvaus hoidetaan räätälöidyllä paketilla normaalin sessiohinnoittelun sijaan — ota suoraan yhteyttä, ja kokoamme kuvaussuunnitelman tapahtumaasi varten.',
        },
      },
      {
        question: { en: 'What do I get at the end of a session?', fi: 'Mitä saan sessioni päätteeksi?' },
        answer: {
          en: 'A standard half-day session includes 50+ professionally edited, high-resolution photos delivered with full commercial usage rights, so you can use them across your website, social channels and print materials without extra licensing.',
          fi: 'Normaali puolen päivän sessio sisältää 50+ ammattimaisesti editoitua, korkearesoluutioista kuvaa täysin kaupallisin käyttöoikeuksin, joten voit käyttää niitä verkkosivuillasi, sosiaalisessa mediassa ja painomateriaaleissa ilman lisälisensointia.',
        },
      },
    ],
    portfolioTags: ['Photography'],
    relatedTagCloudKeywords: [
      { en: 'Professional Photography', fi: 'Ammattivalokuvaus' },
      { en: 'Commercial Photography', fi: 'Kaupallinen valokuvaus' },
      { en: 'Portrait Photography', fi: 'Muotokuvaus' },
      { en: 'Product Photography', fi: 'Tuotekuvaus' },
      { en: 'Brand Photography', fi: 'Brändikuvaus' },
      { en: 'Event Photography & Videography', fi: 'Tapahtumakuvaus ja -video' },
      { en: 'Real Estate Photography', fi: 'Kiinteistökuvaus' },
      { en: 'Sports Photography', fi: 'Urheilukuvaus' },
      { en: 'Pet Photography', fi: 'Lemmikkikuvaus' },
      { en: 'Graduation Photography', fi: 'Valmistujaiskuvaus' },
    ],
    serviceType: { en: 'Photography', fi: 'Valokuvaus' },
    ogImage: '/FrameKaj.jpg',
  },
  {
    slug: 'video-production',
    name: { en: 'Video Production', fi: 'Videotuotanto' },
    metaTitle: { en: 'Video Production Services in Turku, Finland | Abstrakti', fi: 'Videotuotantopalvelut Turussa | Abstrakti' },
    metaDescription: {
      en: 'Brand films, promotional videos and short-form content produced in Turku, Finland, for clients across Finland, Europe and worldwide. Professional editing and color grading included. Reference prices from €720.',
      fi: 'Brändivideot, mainosvideot ja lyhytmuotoinen sisältö tuotettuna Turussa, palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman. Ammattimainen editointi ja värimäärittely sisältyvät. Viitteelliset hinnat alkaen 720 €.',
    },
    heroEyebrow: { en: 'Video Production · Based in Finland, Available Worldwide', fi: 'Videotuotanto · Suomesta käsin, saatavilla maailmanlaajuisesti' },
    heroIntro: [
      {
        en: "Good video does more than look nice — it tells a story people remember. We're a Turku-based studio producing brand films, promotional videos and short-form content for clients across Finland, Europe and worldwide, built around the same principle we apply to everything: less is more. A tight, well-shot minute beats five minutes of unfocused footage.",
        fi: 'Hyvä video tekee enemmän kuin näyttää hyvältä – se kertoo tarinan, jonka ihmiset muistavat. Olemme Turussa toimiva studio, joka tuottaa brändivideoita, mainosvideoita ja lyhytmuotoista sisältöä asiakkaille ympäri Suomen, Euroopan ja maailman, saman periaatteen mukaisesti kuin kaikessa muussakin työssämme: vähemmän on enemmän. Tiivis, hyvin kuvattu minuutti voittaa viisi minuuttia hajanaista materiaalia.',
      },
      {
        en: "A typical session is a half-day shoot followed by professional editing and color grading, delivered as a polished video in whatever format your channels need — landscape for YouTube, vertical for Instagram and TikTok, or both.",
        fi: 'Tyypillinen sessio on puolen päivän kuvaus, jota seuraa ammattimainen editointi ja värimäärittely, ja lopputuloksena on viimeistelty video missä tahansa kanaviesi tarvitsemassa formaatissa – vaaka YouTubeen, pysty Instagramiin ja TikTokiin, tai molemmat.',
      },
      {
        en: "We're based in Turku and regularly travel for shoots across Finland, Europe and worldwide.",
        fi: 'Toimimme Turusta käsin ja matkustamme säännöllisesti kuvauksiin ympäri Suomen, Euroopan ja maailman.',
      },
    ],
    pricingTiers: [
      {
        name: 'Video',
        price: { en: '€720', fi: '720 €' },
        description: { en: 'Cinematic video production for brands or promotional content.', fi: 'Elokuvallista videotuotantoa brändeille tai mainossisältöön.' },
        features: [
          { en: 'Half day filming (4 hours)', fi: 'Puolen päivän kuvaus (4 tuntia)' },
          { en: 'Professional editing & color grading', fi: 'Ammattimainen editointi ja värimäärittely' },
          { en: '1-3 minute final video', fi: '1–3 minuutin lopullinen video' },
          { en: 'Background music & sound design', fi: 'Taustamusiikki ja äänisuunnittelu' },
          { en: 'Format tailored to your needs', fi: 'Formaatti räätälöitynä tarpeisiisi' },
        ],
        monthlyNote: { en: 'Monthly package: €585/session (3-month commitment)', fi: 'Kuukausipaketti: 585 €/sessio (3 kuukauden sitoumus)' },
      },
    ],
    upsell: { text: { en: 'Need photography too? See our Photography & Video bundle pricing', fi: 'Tarvitsetko myös valokuvausta? Katso valokuvaus- ja videopaketin hinnoittelu' } },
    faq: [
      {
        question: { en: 'How long is the final video?', fi: 'Kuinka pitkä lopullinen video on?' },
        answer: {
          en: "Our standard Video package delivers a polished 1-3 minute final video, with the format (landscape, vertical, square) tailored to where you'll use it — website, YouTube, or social channels.",
          fi: 'Vakiomallinen Video-pakettimme toimittaa viimeistellyn 1–3 minuutin lopullisen videon, jonka formaatti (vaaka, pysty, neliö) räätälöidään käyttökohteen mukaan – verkkosivu, YouTube tai sosiaalinen media.',
        },
      },
      {
        question: { en: 'Do you handle event videography?', fi: 'Hoidatteko tapahtumien videokuvauksen?' },
        answer: {
          en: "Event videography is quoted separately from our standard session pricing — contact us directly and we'll put together a coverage plan for your event.",
          fi: 'Tapahtumien videokuvaus hinnoitellaan erikseen normaalista sessiohinnoittelusta – ota suoraan yhteyttä, ja kokoamme kuvaussuunnitelman tapahtumaasi varten.',
        },
      },
      {
        question: { en: 'Are the listed prices fixed?', fi: 'Ovatko ilmoitetut hinnat kiinteitä?' },
        answer: { en: 'These are reference prices that can be adjusted to your specific needs and budget.', fi: 'Nämä ovat viitteellisiä hintoja, joita voidaan muokata tarpeisiisi ja budjettiisi sopiviksi.' },
      },
      {
        question: { en: 'Do you only shoot in Turku?', fi: 'Kuvaatteko vain Turussa?' },
        answer: {
          en: "We're based in Turku, Finland, but we work with clients across Finland, Europe and worldwide. Travel can be arranged for the right project.",
          fi: 'Olemme Turusta, mutta palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman. Matkustaminen voidaan järjestää oikean projektin puolesta.',
        },
      },
    ],
    portfolioTags: ['Video'],
    relatedTagCloudKeywords: [
      { en: 'Video Production', fi: 'Videotuotanto' },
      { en: 'Brand Films', fi: 'Brändivideot' },
      { en: 'Commercial Videos', fi: 'Mainosvideot' },
      { en: 'Short-Form Video', fi: 'Lyhytvideot' },
      { en: 'Aftermovies', fi: 'Jälkimainosvideot' },
      { en: 'Interview Videos', fi: 'Haastatteluvideot' },
      { en: 'Event Videos', fi: 'Tapahtumavideot' },
      { en: 'Drone Videos', fi: 'Droonivideot' },
      { en: 'Music Videos', fi: 'Musiikkivideot' },
      { en: 'Wedding Films', fi: 'Häävideot' },
      { en: 'Video Editing Services', fi: 'Videoeditointipalvelut' },
    ],
    serviceType: { en: 'Video Production', fi: 'Videotuotanto' },
    ogImage: '/FrameFuturePlay.jpg',
  },
  {
    slug: 'graphic-design',
    name: { en: 'Graphic Design & Brand Identity', fi: 'Graafinen suunnittelu ja brändi-identiteetti' },
    metaTitle: { en: 'Graphic Design & Brand Identity in Turku, Finland | Abstrakti', fi: 'Graafinen suunnittelu ja brändi-identiteetti Turussa | Abstrakti' },
    metaDescription: {
      en: 'Logo design, brand identity systems and visual guidelines for startups and businesses in Turku, Finland, serving clients across Finland, Europe and worldwide. Reference prices from €790.',
      fi: 'Logosuunnittelua, brändi-identiteettijärjestelmiä ja visuaalisia ohjeistuksia startupeille ja yrityksille Turussa, palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman. Viitteelliset hinnat alkaen 790 €.',
    },
    heroEyebrow: { en: 'Graphic Design & Brand Identity · Based in Finland, Available Worldwide', fi: 'Graafinen suunnittelu ja brändi-identiteetti · Suomesta käsin, saatavilla maailmanlaajuisesti' },
    heroIntro: [
      {
        en: "A brand is more than a logo — it's the visual language that makes people recognize and trust you at a glance. We're a Turku-based creative studio building brand identities for startups and established businesses alike, with the same philosophy behind every project: less is more. A focused, confident identity beats a cluttered one.",
        fi: 'Brändi on enemmän kuin logo – se on visuaalinen kieli, joka saa ihmiset tunnistamaan ja luottamaan sinuun silmänräpäyksessä. Olemme Turussa toimiva luova studio, joka rakentaa brändi-identiteettejä sekä startupeille että vakiintuneille yrityksille, samalla filosofialla kaikissa projekteissa: vähemmän on enemmän. Kohdistettu, vakuuttava identiteetti voittaa sekavan.',
      },
      {
        en: "Whether you need a quick logo and brand starter kit or a complete identity system with guidelines, business materials, and a custom website, our packages scale from Essentials up to a Full Studio launch package that bundles design, photography, video and web design into one engagement.",
        fi: 'Tarvitsetpa nopean logon ja brändin aloituspaketin tai täydellisen identiteettijärjestelmän ohjeistuksineen, liiketoimintamateriaaleineen ja räätälöidyn verkkosivuston, pakettimme skaalautuvat Essentials-tasosta Full Studio -lanseerauspakettiin, joka yhdistää suunnittelun, valokuvauksen, videon ja verkkosivusuunnittelun yhdeksi kokonaisuudeksi.',
      },
      {
        en: "Every project includes revision rounds, and ongoing monthly design support is available once you've launched. We're based in Turku, Finland, and work with clients across Finland, Europe and worldwide, collaborating remotely wherever you are.",
        fi: 'Joka projektiin sisältyy korjauskierroksia, ja jatkuva kuukausittainen suunnittelutuki on saatavilla lanseerauksen jälkeen. Toimimme Turusta käsin ja palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman, yhteistyössä etänä missä tahansa oletkin.',
      },
    ],
    pricingTiers: [
      {
        name: 'Essentials',
        price: { en: '€790', fi: '790 €' },
        description: { en: 'Essential brand identity for startups and small businesses looking to establish their visual presence.', fi: 'Peruslaatuinen brändi-identiteetti startupeille ja pienyrityksille, jotka haluavat rakentaa visuaalisen ilmeensä.' },
        features: [
          { en: 'Logo design (2 concepts)', fi: 'Logosuunnittelu (2 konseptia)' },
          { en: 'Basic brand guidelines', fi: 'Peruskäyttöohjeet brändille' },
          { en: 'Business card design', fi: 'Käyntikortin suunnittelu' },
          { en: 'Social media templates', fi: 'Sosiaalisen median mallipohjat' },
          { en: '1 revision round', fi: '1 korjauskierros' },
        ],
        monthlyNote: { en: 'Add monthly design support: +€350/month for ongoing design work (social media, marketing materials, etc.)', fi: 'Lisää kuukausittainen suunnittelutuki: +350 €/kk jatkuvaan suunnittelutyöhön (sosiaalinen media, markkinointimateriaalit, jne.)' },
      },
      {
        name: 'Brand Identity',
        price: { en: '€1,695', fi: '1 695 €' },
        description: { en: 'Complete brand identity system with comprehensive visual guidelines and marketing materials.', fi: 'Täydellinen brändi-identiteettijärjestelmä kattavilla visuaalisilla ohjeistuksilla ja markkinointimateriaaleilla.' },
        features: [
          { en: 'Brand strategy & positioning', fi: 'Brändistrategia ja asemointi' },
          { en: 'Logo design (3+ concepts)', fi: 'Logosuunnittelu (3+ konseptia)' },
          { en: 'Complete brand guidelines', fi: 'Täydelliset brändiohjeet' },
          { en: 'Business card, letterhead & email signature', fi: 'Käyntikortti, kirjelomake ja sähköpostiallekirjoitus' },
          { en: 'Marketing collateral templates', fi: 'Markkinointimateriaalien mallipohjat' },
          { en: 'Social media brand kit', fi: 'Sosiaalisen median brändipaketti' },
          { en: '2 revision rounds', fi: '2 korjauskierrosta' },
        ],
        monthlyNote: { en: 'Add monthly design support: +€450/month for ongoing social media graphics, marketing materials & brand asset updates', fi: 'Lisää kuukausittainen suunnittelutuki: +450 €/kk jatkuviin sosiaalisen median grafiikoihin, markkinointimateriaaleihin ja brändimateriaalien päivityksiin' },
        featured: true,
      },
      {
        name: 'Full Studio',
        price: { en: '€3,850', fi: '3 850 €' },
        description: { en: 'Everything you need to launch: complete branding, professional photography, video content, and a custom website.', fi: 'Kaikki mitä tarvitset lanseeraukseen: täydellinen brändäys, ammattimainen valokuvaus, videosisältö ja räätälöity verkkosivusto.' },
        features: [
          { en: 'Logo design', fi: 'Logosuunnittelu' },
          { en: 'Brand guidelines & visual identity', fi: 'Brändiohjeet ja visuaalinen identiteetti' },
          { en: 'Typography & color palette', fi: 'Typografia ja värimaailma' },
          { en: '2 custom design pieces', fi: '2 räätälöityä suunnittelukokonaisuutta' },
          { en: 'Social media templates', fi: 'Sosiaalisen median mallipohjat' },
          { en: '1 hero piece video', fi: '1 pääasiallinen videotuotanto' },
          { en: '3 Instagram / TikTok short-form videos', fi: '3 Instagram-/TikTok-lyhytvideota' },
          { en: '10 additional video clips', fi: '10 lisävideoklippiä' },
          { en: '25+ professionally edited photos', fi: '25+ ammattimaisesti editoitua kuvaa' },
          { en: 'Custom website design & development', fi: 'Räätälöity verkkosivuston suunnittelu ja toteutus' },
          { en: 'SEO optimization', fi: 'Hakukoneoptimointi (SEO)' },
          { en: '3 revision rounds', fi: '3 korjauskierrosta' },
          { en: '3 months of ongoing support included', fi: '3 kuukautta jatkuvaa tukea mukana' },
        ],
        monthlyNote: { en: 'Continue after launch: +€550/month for ongoing design, content creation & website updates', fi: 'Jatka lanseerauksen jälkeen: +550 €/kk jatkuvaan suunnitteluun, sisällöntuotantoon ja verkkosivuston päivityksiin' },
      },
    ],
    faq: [
      {
        question: { en: "What's the difference between Essentials and Brand Identity?", fi: 'Mikä on ero Essentialsin ja Brand Identityn välillä?' },
        answer: {
          en: "Essentials covers a focused logo and basic guidelines for startups just getting started. Brand Identity adds brand strategy, a complete guidelines document, more business materials, and a social media brand kit — it's our most popular package for businesses ready to look fully professional across every channel.",
          fi: 'Essentials kattaa kohdistetun logon ja peruskäyttöohjeet aloittaville startupeille. Brand Identity lisää brändistrategian, täydellisen ohjeistusdokumentin, enemmän liiketoimintamateriaaleja ja sosiaalisen median brändipaketin – se on suosituin pakettimme yrityksille, jotka haluavat näyttää täysin ammattimaisilta kaikilla kanavilla.',
        },
      },
      {
        question: { en: 'How many revision rounds are included?', fi: 'Kuinka monta korjauskierrosta sisältyy?' },
        answer: {
          en: 'Essentials includes 1 revision round, Brand Identity includes 2, and Full Studio includes 3 — enough back-and-forth to get the identity right without scope creep.',
          fi: 'Essentials sisältää 1 korjauskierroksen, Brand Identity 2 ja Full Studio 3 – riittävästi edestakaista viilausta identiteetin hionta loppuun saakka laajuuden paisumatta.',
        },
      },
      {
        question: { en: 'Can I add photography or video to my branding project?', fi: 'Voinko lisätä valokuvauksen tai videon brändäysprojektiini?' },
        answer: {
          en: 'Yes — the Full Studio package already bundles branding with photography, video and web design. Just ask when you reach out if you want to combine a smaller design package with photography or video.',
          fi: 'Kyllä – Full Studio -paketti yhdistää brändäyksen jo valokuvaukseen, videoon ja verkkosivusuunnitteluun. Mainitse vain yhteydenotossa, jos haluat yhdistää pienemmän suunnittelupaketin valokuvaukseen tai videoon.',
        },
      },
      {
        question: { en: 'Are the listed prices fixed?', fi: 'Ovatko ilmoitetut hinnat kiinteitä?' },
        answer: { en: 'These are reference prices that can be adjusted to your specific needs and budget.', fi: 'Nämä ovat viitteellisiä hintoja, joita voidaan muokata tarpeisiisi ja budjettiisi sopiviksi.' },
      },
    ],
    portfolioTags: ['Graphic Design'],
    relatedTagCloudKeywords: [
      { en: 'Graphic Design', fi: 'Graafinen suunnittelu' },
      { en: 'Brand Identity Design', fi: 'Brändi-identiteetin suunnittelu' },
      { en: 'Logo Design', fi: 'Logosuunnittelu' },
      { en: 'Brand Consulting', fi: 'Brändikonsultointi' },
      { en: 'Art Direction & Consulting', fi: 'Taiteellinen johtaminen ja konsultointi' },
    ],
    serviceType: { en: 'Graphic Design & Brand Identity', fi: 'Graafinen suunnittelu ja brändi-identiteetti' },
    ogImage: '/FrameAloraBranding.jpg',
  },
  {
    slug: 'web-design',
    name: { en: 'Web Design', fi: 'Verkkosivusuunnittelu' },
    metaTitle: { en: 'Website Design in Turku, Finland | Abstrakti', fi: 'Verkkosivusuunnittelu Turussa | Abstrakti' },
    metaDescription: {
      en: 'Custom, responsive website design for businesses in Turku, Finland, serving clients across Finland, Europe and worldwide, from single-page launch sites to full multi-page business websites. Reference prices from €450.',
      fi: 'Räätälöityä, responsiivista verkkosivusuunnittelua yrityksille Turussa, palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman, yksisivuisista lanseeraussivustoista täysimittaisiin monisivuisiin yrityssivustoihin. Viitteelliset hinnat alkaen 450 €.',
    },
    heroEyebrow: { en: 'Website Design · Based in Finland, Available Worldwide', fi: 'Verkkosivusuunnittelu · Suomesta käsin, saatavilla maailmanlaajuisesti' },
    heroIntro: [
      {
        en: "Your website is often the first real impression of your business — and it should load fast, look sharp on every device, and make it obvious what to do next. We design and build focused, custom websites for businesses across Finland, Europe and worldwide, following the same principle as the rest of our work: less is more. A clean, fast site beats a bloated one every time.",
        fi: 'Verkkosivustosi on usein ensimmäinen todellinen vaikutelma yrityksestäsi – ja sen pitäisi latautua nopeasti, näyttää terävältä jokaisella laitteella ja tehdä selväksi, mitä seuraavaksi kannattaa tehdä. Suunnittelemme ja rakennamme kohdistettuja, räätälöityjä verkkosivustoja yrityksille ympäri Suomen, Euroopan ja maailman, saman periaatteen mukaisesti kuin kaikessa muussakin työssämme: vähemmän on enemmän. Siisti, nopea sivusto voittaa aina paisuneen.',
      },
      {
        en: "We offer everything from a single-page launch site to a complete multi-page business website with on-page SEO and analytics set up from day one, plus affordable ongoing hosting and maintenance so your site keeps running smoothly after launch.",
        fi: 'Tarjoamme kaiken yksisivuisesta lanseeraussivustosta täydelliseen monisivuiseen yrityssivustoon, jossa on sivun sisäinen SEO ja analytiikka asennettuna alusta alkaen, sekä edullinen jatkuva hosting ja ylläpito, jotta sivustosi pysyy toiminnassa sujuvasti lanseerauksen jälkeen.',
      },
      {
        en: "Based in Turku, we work with clients across Finland, Europe and worldwide — the entire process, from first brief to launch, runs comfortably remote.",
        fi: 'Toimimme Turusta käsin ja palvelemme asiakkaita ympäri Suomen, Euroopan ja maailman – koko prosessi ensimmäisestä briiffistä lanseeraukseen asti sujuu mukavasti etänä.',
      },
    ],
    pricingTiers: [
      {
        name: 'Landing Page',
        price: { en: '€450', fi: '450 €' },
        description: { en: 'A focused single-page site to establish an online presence quickly.', fi: 'Kohdistettu yksisivuinen sivusto, jolla saat verkkonäkyvyyden nopeasti käyntiin.' },
        features: [
          { en: '1-page responsive site (up to 5 sections)', fi: '1-sivuinen responsiivinen sivusto (jopa 5 osiota)' },
          { en: 'Mobile-optimized design', fi: 'Mobiilioptimoitu design' },
          { en: 'Contact form integration', fi: 'Yhteydenottolomakkeen integrointi' },
          { en: 'Basic on-page SEO setup', fi: 'Perus-SEO-asetukset' },
          { en: '1 revision round', fi: '1 korjauskierros' },
        ],
        monthlyNote: { en: 'Add hosting & maintenance: +€10/month for hosting, updates & small edits', fi: 'Lisää ylläpito ja hosting: +10 €/kk hostingiin, päivityksiin ja pieniin muutoksiin' },
      },
      {
        name: 'Business Website',
        price: { en: '€890', fi: '890 €' },
        description: { en: 'A complete multi-page website for businesses ready to showcase their full offering.', fi: 'Täysimittainen monisivuinen verkkosivusto yrityksille, jotka haluavat esitellä koko tarjontansa.' },
        features: [
          { en: 'Up to 6 pages (Home, About, Services, Portfolio, Contact)', fi: 'Jopa 6 sivua (Etusivu, Meistä, Palvelut, Portfolio, Yhteys)' },
          { en: 'Custom responsive design', fi: 'Räätälöity responsiivinen design' },
          { en: 'Contact form integration', fi: 'Yhteydenottolomakkeen integrointi' },
          { en: 'On-page SEO optimization', fi: 'On-page SEO -optimointi' },
          { en: 'Google Analytics setup', fi: 'Google Analytics -asetukset' },
          { en: '2 revision rounds', fi: '2 korjauskierrosta' },
        ],
        monthlyNote: { en: 'Add hosting & maintenance: +€10/month for hosting, updates & content changes', fi: 'Lisää ylläpito ja hosting: +10 €/kk hostingiin, päivityksiin ja sisällön muutoksiin' },
        featured: true,
      },
    ],
    faq: [
      {
        question: { en: 'What does hosting and maintenance cost?', fi: 'Paljonko hosting ja ylläpito maksavat?' },
        answer: {
          en: 'Hosting, updates and small content edits are available for +€10/month on top of either package — an affordable way to keep your site running and up to date after launch.',
          fi: 'Hosting, päivitykset ja pienet sisältömuutokset ovat saatavilla +10 €/kk kummankin paketin lisäksi – edullinen tapa pitää sivustosi käynnissä ja ajan tasalla lanseerauksen jälkeen.',
        },
      },
      {
        question: { en: "What's included in on-page SEO?", fi: 'Mitä sivun sisäinen SEO sisältää?' },
        answer: {
          en: "Both packages include on-page SEO setup — proper titles, meta descriptions, and structured content so your site is ready to be found on Google from day one. It's the same kind of setup we use on our own site.",
          fi: 'Molemmat paketit sisältävät sivun sisäisen SEO-asetuksen – asianmukaiset otsikot, metakuvaukset ja jäsennelty sisältö, jotta sivustosi on valmis löytymään Googlesta ensimmäisestä päivästä alkaen. Käytämme samanlaista asetusta omalla sivustollamme.',
        },
      },
      {
        question: { en: 'Can I upgrade from a Landing Page to a full Business Website later?', fi: 'Voinko päivittää Landing Pagesta täyteen Business Websiteen myöhemmin?' },
        answer: {
          en: "Yes — many clients start with a focused Landing Page and expand into a full multi-page Business Website as their needs grow. Just mention your landing page when you reach out and we'll scope the upgrade.",
          fi: 'Kyllä – monet asiakkaat aloittavat kohdistetusta Landing Pagesta ja laajentavat täyteen monisivuiseen Business Websiteen tarpeiden kasvaessa. Mainitse vain nykyinen sivustosi yhteydenotossa, ja määrittelemme päivityksen laajuuden.',
        },
      },
      {
        question: { en: 'Are the listed prices fixed?', fi: 'Ovatko ilmoitetut hinnat kiinteitä?' },
        answer: { en: 'These are reference prices that can be adjusted to your specific needs and budget.', fi: 'Nämä ovat viitteellisiä hintoja, joita voidaan muokata tarpeisiisi ja budjettiisi sopiviksi.' },
      },
    ],
    portfolioTags: [],
    relatedTagCloudKeywords: [{ en: 'Website Design', fi: 'Verkkosivusuunnittelu' }],
    serviceType: { en: 'Web Design', fi: 'Verkkosivusuunnittelu' },
    ogImage: '/logoabstrakti.svg',
  },
]

export const getServiceBySlug = (slug: string): ServicePageData | undefined =>
  servicesData.find((service) => service.slug === slug)
