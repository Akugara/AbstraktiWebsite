import type { Lang } from './LanguageContext'

export interface SiteContent {
  nav: {
    home: string
    portfolio: string
    services: string
    about: string
    team: string
    contact: string
    toggleMenu: string
  }
  footer: {
    photography: string
    video: string
    design: string
    web: string
    copyright: string
  }
  home: {
    meta: { title: string; description: string; ogTitle: string; ogDescription: string }
    hero: { titleLine1: string; titleLine2: string; subtitle: string; cta: string; replay: string }
    portfolio: { heading: string; filterAll: string; filterDesign: string; filterPhoto: string; filterVideo: string }
    services: {
      heading: string
      introLine1: string
      introLine2: string
      introAlv: string
      togglePhotoVideo: string
      toggleDesign: string
      toggleWebDesign: string
      toggleSocial: string
      period3: string
      period6: string
      period12: string
      mostPopular: string
      photography: { title: string; price: string; description: string; features: string[]; learnMore: string; monthlyNote: string }
      video: { title: string; price: string; description: string; features: string[]; learnMore: string; monthlyNote: string }
      bundle: { title: string; price: string; description: string; features: string[]; monthlyNote: string }
      essentials: { title: string; price: string; description: string; features: string[]; learnMore: string; monthlyNote: string }
      brandIdentity: { title: string; price: string; description: string; features: string[]; learnMore: string; monthlyNote: string }
      fullStudio: { title: string; price: string; description: string; features: string[]; learnMore: string; monthlyNote: string }
      landingPage: { title: string; price: string; description: string; features: string[]; learnMore: string; monthlyNote: string }
      businessWebsite: { title: string; price: string; description: string; features: string[]; learnMore: string; monthlyNote: string }
      social: {
        starterTitle: string
        starterDescription: string
        growthTitle: string
        growthDescription: string
        fullManagementTitle: string
        fullManagementDescription: string
        fullPackageTitle: string
        fullPackageDescription: string
        getStarted: string
        save: string
        period3Commitment: string
        period6Commitment: string
        period12Commitment: string
        tableRows: {
          manager: string
          channels: string
          feedPosts: string
          stories: string
          shortForm: string
          shooting: string
          paidAds: string
          planning: string
          reporting: string
          price: string
        }
        channelsStarter: string
        channelsGrowth: string
        channelsFullManagement: string
        channelsFullPackage: string
        shootingFullManagement: string
        shootingFullPackage: string
        paidAdsFullPackage: string
        reportingStarter: string
        reportingGrowth: string
        reportingFullManagement: string
        reportingFullPackage: string
      }
      addShootNote: string
      eventsNote: string
      referenceNote: string
    }
    about: { heading: string; p1: string; p2: string; p3: string; servicesHeading: string; servicesList: string[] }
    team: {
      heading: string
      intro: string
      agustinRole: string
      frankRole: string
    }
    contact: {
      heading: string
      intro: string
      detailsHeading: string
      detailsText: string
      trustList: string[]
      emailLabel: string
      phoneLabel: string
      locationLabel: string
      locationNote: string
      followLabel: string
      successHeading: string
      successText: string
      form: {
        firstName: string
        lastName: string
        email: string
        phone: string
        optional: string
        company: string
        projectType: string
        budget: string
        message: string
        messagePlaceholder: string
        companyPlaceholder: string
        selectService: string
        serviceOptions: Record<string, string>
        selectBudget: string
        budgetOptions: Record<string, string>
        note: string
        submit: string
        sending: string
        emailDirectly: string
      }
      tagsHeading: string
      tags: string[]
    }
  }
}

export const siteContent: Record<Lang, SiteContent> = {
  en: {
    nav: {
      home: 'HOME',
      portfolio: 'PORTFOLIO',
      services: 'SERVICES',
      about: 'ABOUT',
      team: 'TEAM',
      contact: 'CONTACT',
      toggleMenu: 'Toggle menu',
    },
    footer: {
      photography: 'Photography',
      video: 'Video Production',
      design: 'Graphic Design',
      web: 'Web Design',
      copyright: 'Copyright © 2026 abstrakti.eu - All Rights Reserved.',
    },
    home: {
      meta: {
        title: 'Abstrakti – Creative Studio | Graphic Design, Photography & Video | Turku & Helsinki',
        description: 'Abstrakti is a creative studio based in Turku, Finland, serving clients across Helsinki and Europe. We specialise in graphic design, brand identity, photography, and video production.',
        ogTitle: 'Abstrakti – Creative Studio | Graphic Design, Photography & Video',
        ogDescription: 'Creative studio based in Turku and Helsinki. We help brands grow through graphic design, photography, and video production across Finland and Europe.',
      },
      hero: {
        titleLine1: 'Creative',
        titleLine2: 'Studio',
        subtitle: 'Graphic Design · Photography · Video Production',
        cta: 'View work →',
        replay: '↺ Play reel',
      },
      portfolio: {
        heading: 'Selected Work',
        filterAll: 'ALL',
        filterDesign: 'GRAPHIC DESIGN',
        filterPhoto: 'PHOTOGRAPHY',
        filterVideo: 'VIDEO',
      },
      services: {
        heading: 'Services & Packages',
        introLine1: 'Based in Turku, Finland, we work with clients across Finland and Europe.',
        introLine2: 'We offer flexible service packages tailored to your needs. All prices are reference points and can be adjusted to fit your specific project.',
        introAlv: 'ALV 0%',
        togglePhotoVideo: 'Photography & Video',
        toggleDesign: 'Graphic Design',
        toggleWebDesign: 'Web Design',
        toggleSocial: 'Social Media',
        period3: '3 Months',
        period6: '6 Months',
        period12: '12 Months',
        mostPopular: 'Most Popular',
        photography: {
          title: 'Photography',
          price: '€650',
          description: 'Professional photography services for products, portraits, or commercial needs.',
          features: ['Half day session (4 hours)', 'Professional editing', '50+ high-resolution photos', 'Commercial usage rights'],
          learnMore: 'Learn more about Photography →',
          monthlyNote: 'Monthly package: €465/session (3-month commitment)',
        },
        video: {
          title: 'Video',
          price: '€720',
          description: 'Cinematic video production for brands or promotional content.',
          features: ['Half day filming (4 hours)', 'Professional editing & color grading', '1-3 minute final video', 'Background music & sound design', 'Format tailored to your needs'],
          learnMore: 'Learn more about Video Production →',
          monthlyNote: 'Monthly package: €585/session (3-month commitment)',
        },
        bundle: {
          title: 'Photography & Video Bundle',
          price: '€1,090',
          description: 'A full shoot combining photography and videography for comprehensive brand coverage.',
          features: ['Full shoot (6 hours)', '3 professional videos', '5 short-form clips', '50+ high-resolution photos', 'Professional editing & color grading', 'Commercial usage rights', 'Format tailored to your needs'],
          monthlyNote: 'Monthly package: €925/session (3-month commitment)',
        },
        essentials: {
          title: 'Essentials',
          price: '€790',
          description: 'Essential brand identity for startups and small businesses looking to establish their visual presence.',
          features: ['Logo design (2 concepts)', 'Basic brand guidelines', 'Business card design', 'Social media templates', '1 revision round'],
          learnMore: 'Learn more about Graphic Design →',
          monthlyNote: 'Add monthly design support: +€350/month for ongoing design work (social media, marketing materials, etc.)',
        },
        brandIdentity: {
          title: 'Brand Identity',
          price: '€1,695',
          description: 'Complete brand identity system with comprehensive visual guidelines and marketing materials.',
          features: ['Brand strategy & positioning', 'Logo design (3+ concepts)', 'Complete brand guidelines', 'Business card, letterhead & email signature', 'Marketing collateral templates', 'Social media brand kit', '2 revision rounds'],
          learnMore: 'Learn more about Graphic Design →',
          monthlyNote: 'Add monthly design support: +€450/month for ongoing social media graphics, marketing materials & brand asset updates',
        },
        fullStudio: {
          title: 'Full Studio',
          price: '€3,850',
          description: 'Everything you need to launch: complete branding, professional photography, video content, and a custom website.',
          features: ['Logo design', 'Brand guidelines & visual identity', 'Typography & color palette', '2 custom design pieces', 'Social media templates', '1 hero piece video', '3 Instagram / TikTok short-form videos', '10 additional video clips', '25+ professionally edited photos', 'Custom website design & development', 'SEO optimization', '3 revision rounds', '3 months of ongoing support included'],
          learnMore: 'Learn more about Graphic Design →',
          monthlyNote: 'Continue after launch: +€550/month for ongoing design, content creation & website updates',
        },
        landingPage: {
          title: 'Landing Page',
          price: '€450',
          description: 'A focused single-page site to establish an online presence quickly.',
          features: ['1-page responsive site (up to 5 sections)', 'Mobile-optimized design', 'Contact form integration', 'Basic on-page SEO setup', '1 revision round'],
          learnMore: 'Learn more about Web Design →',
          monthlyNote: 'Add hosting & maintenance: +€10/month for hosting, updates & small edits',
        },
        businessWebsite: {
          title: 'Business Website',
          price: '€890',
          description: 'A complete multi-page website for businesses ready to showcase their full offering.',
          features: ['Up to 6 pages (Home, About, Services, Portfolio, Contact)', 'Custom responsive design', 'Contact form integration', 'On-page SEO optimization', 'Google Analytics setup', '2 revision rounds'],
          learnMore: 'Learn more about Web Design →',
          monthlyNote: 'Add hosting & maintenance: +€10/month for hosting, updates & content changes',
        },
        social: {
          starterTitle: 'Starter',
          starterDescription: 'A focused starting point for brands building a presence on one channel.',
          growthTitle: 'Growth',
          growthDescription: 'Active, multi-channel presence with short-form video included.',
          fullManagementTitle: 'Full Management',
          fullManagementDescription: 'Full social presence across all three platforms, fully produced by us.',
          fullPackageTitle: 'Full Package',
          fullPackageDescription: 'Everything in Full Management, plus a dedicated monthly shoot day and paid ad management.',
          getStarted: 'Get started',
          save: 'Save',
          period3Commitment: '3-month commitment',
          period6Commitment: '6-month commitment',
          period12Commitment: '12-month commitment',
          tableRows: {
            manager: 'Dedicated social media manager',
            channels: 'Channels',
            feedPosts: 'Feed posts / month',
            stories: 'Stories / month',
            shortForm: 'Short-form video / month',
            shooting: 'Content shooting',
            paidAds: 'Paid ad management',
            planning: 'Content planning & copywriting',
            reporting: 'Reporting',
            price: 'Price',
          },
          channelsStarter: 'Instagram or Facebook (1)',
          channelsGrowth: 'Instagram + Facebook',
          channelsFullManagement: 'Instagram + Facebook + TikTok',
          channelsFullPackage: 'Instagram + Facebook + TikTok',
          shootingFullManagement: '4h / month',
          shootingFullPackage: '6h / month',
          paidAdsFullPackage: '4 campaigns / month',
          reportingStarter: 'Basic report',
          reportingGrowth: 'Basic report + check-in',
          reportingFullManagement: 'Basic report + monthly call',
          reportingFullPackage: 'Basic report + monthly call',
        },
        addShootNote: 'Add a professional shoot: Photography €419, Video €527, Bundle €833/session — 10% off standard rates for Starter and Growth clients.',
        eventsNote: 'For events: Contact us directly for custom event coverage packages.',
        referenceNote: 'These are reference prices that can be adjusted to your specific needs and budget.',
      },
      about: {
        heading: 'About',
        p1: 'We are a solution-oriented creative studio specializing in graphic design, photography, and video production. We help our clients identify opportunities to communicate and grow by telling their stories with higher quality and impact.',
        p2: 'With over a decade of experience, our approach combines innovative aesthetics with powerful storytelling, creating compelling visual narratives that resonate with audiences and drive meaningful results.',
        p3: 'Our philosophy is simple: less is more. We believe in the power of simplicity and the impact of thoughtful design.',
        servicesHeading: 'SERVICES',
        servicesList: ['Brand Identity & Design', 'Editorial & Commercial Photography', 'Video Production & Cinematography', 'Art Direction & Consulting'],
      },
      team: {
        heading: 'The Team',
        intro: 'The people behind the camera and the craft.',
        agustinRole: 'Founder · Graphic Designer · Photo & Video',
        frankRole: 'Videographer · Content Creator',
      },
      contact: {
        heading: 'Get in Touch',
        intro: "Ready to start your project? Let's talk about how we can help bring your vision to life.",
        detailsHeading: 'Tell us about your project',
        detailsText: "Share a few details about what you need and your budget, and we'll get back to you with a clear idea of how we can help — no obligation, no pressure.",
        trustList: ['No obligation to book', 'No pushy sales — just honest advice', 'We usually reply within 1–2 business days'],
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        locationLabel: 'Location',
        locationNote: 'We work across Finland and Europe',
        followLabel: 'Follow',
        successHeading: 'Thanks — message sent!',
        successText: "We've received your details and will get back to you within 1–2 business days.",
        form: {
          firstName: 'First name',
          lastName: 'Last name',
          email: 'Email',
          phone: 'Phone',
          optional: '(optional)',
          company: 'Company',
          projectType: 'What do you need?',
          budget: 'Budget',
          message: 'What would you like to achieve?',
          messagePlaceholder: 'Tell us briefly about your project, goals, or what you need help with.',
          companyPlaceholder: 'Company name',
          selectService: 'Select a service',
          serviceOptions: {
            photography: 'Photography',
            video: 'Video Production',
            bundle: 'Photography & Video Bundle',
            design: 'Graphic Design & Brand Identity',
            web: 'Web Design',
            social: 'Social Media Marketing',
            fullStudio: 'Full Studio Package',
            event: 'Event Coverage',
            notSure: 'Not sure yet',
          },
          selectBudget: 'Select a range',
          budgetOptions: {
            under750: 'Under €750',
            r750to1500: '€750 – €1,500',
            r1500to3000: '€1,500 – €3,000',
            r3000to5000: '€3,000 – €5,000',
            over5000: '€5,000+',
            notSure: 'Not sure yet',
          },
          note: "Prices are reference points — sharing your budget just helps us tailor the right package for you.",
          submit: 'Send message',
          sending: 'Sending…',
          emailDirectly: 'You can also email us directly at',
        },
        tagsHeading: 'What we cover',
        tags: ['Graphic Design', 'Brand Identity Design', 'Logo Design', 'Brand Consulting', 'Art Direction & Consulting', 'Professional Photography', 'Commercial Photography', 'Event Photography & Videography', 'Drone Photography & Videography', 'Real Estate Photography', 'Portrait Photography', 'Sports Photography', 'Product Photography', 'Brand Photography', 'Pet Photography', 'Graduation Photography', 'Video Production', 'Brand Films', 'Commercial Videos', 'Short-Form Video', 'Aftermovies', 'Interview Videos', 'Event Videos', 'Drone Videos', 'Music Videos', 'Wedding Films', 'Video Editing Services', 'Content Production', 'Event Production', 'Social Media', 'UGC Content Creation', 'Website Design'],
      },
    },
  },
  fi: {
    nav: {
      home: 'KOTI',
      portfolio: 'TYÖT',
      services: 'PALVELUT',
      about: 'MEISTÄ',
      team: 'TIIMI',
      contact: 'YHTEYS',
      toggleMenu: 'Valikko',
    },
    footer: {
      photography: 'Valokuvaus',
      video: 'Videotuotanto',
      design: 'Graafinen suunnittelu',
      web: 'Verkkosivusuunnittelu',
      copyright: 'Copyright © 2026 abstrakti.eu - Kaikki oikeudet pidätetään.',
    },
    home: {
      meta: {
        title: 'Abstrakti – Luova studio | Graafinen suunnittelu, valokuvaus ja video | Turku ja Helsinki',
        description: 'Abstrakti on Turussa toimiva luova studio, joka palvelee asiakkaita Helsingissä ja ympäri Eurooppaa. Erikoisalaamme ovat graafinen suunnittelu, brändi-identiteetti, valokuvaus ja videotuotanto.',
        ogTitle: 'Abstrakti – Luova studio | Graafinen suunnittelu, valokuvaus ja video',
        ogDescription: 'Turkuun ja Helsinkiin sijoittuva luova studio. Autamme brändejä kasvamaan graafisen suunnittelun, valokuvauksen ja videotuotannon avulla ympäri Suomen ja Euroopan.',
      },
      hero: {
        titleLine1: 'Luova',
        titleLine2: 'Studio',
        subtitle: 'Graafinen suunnittelu · Valokuvaus · Videotuotanto',
        cta: 'Katso työt →',
        replay: '↺ Toista video',
      },
      portfolio: {
        heading: 'Valitut työt',
        filterAll: 'KAIKKI',
        filterDesign: 'GRAAFINEN SUUNNITTELU',
        filterPhoto: 'VALOKUVAUS',
        filterVideo: 'VIDEO',
      },
      services: {
        heading: 'Palvelut ja paketit',
        introLine1: 'Toimimme Turusta käsin ja palvelemme asiakkaita ympäri Suomen ja Euroopan.',
        introLine2: 'Tarjoamme joustavia palvelupaketteja, jotka räätälöidään tarpeisiisi sopiviksi. Kaikki hinnat ovat viitteellisiä ja niitä voidaan muokata projektisi mukaan.',
        introAlv: 'ALV 0%',
        togglePhotoVideo: 'Valokuvaus ja video',
        toggleDesign: 'Graafinen suunnittelu',
        toggleWebDesign: 'Verkkosivusuunnittelu',
        toggleSocial: 'Sosiaalinen media',
        period3: '3 kuukautta',
        period6: '6 kuukautta',
        period12: '12 kuukautta',
        mostPopular: 'Suosituin',
        photography: {
          title: 'Valokuvaus',
          price: '650 €',
          description: 'Ammattimaista valokuvauspalvelua tuotteille, muotokuville tai kaupallisiin tarpeisiin.',
          features: ['Puolen päivän kuvaussessio (4 tuntia)', 'Ammattimainen kuvankäsittely', '50+ korkearesoluutioista kuvaa', 'Kaupalliset käyttöoikeudet'],
          learnMore: 'Lue lisää valokuvauksesta →',
          monthlyNote: 'Kuukausipaketti: 465 €/sessio (3 kuukauden sitoumus)',
        },
        video: {
          title: 'Video',
          price: '720 €',
          description: 'Elokuvallista videotuotantoa brändeille tai mainossisältöön.',
          features: ['Puolen päivän kuvaus (4 tuntia)', 'Ammattimainen editointi ja värimäärittely', '1–3 minuutin lopullinen video', 'Taustamusiikki ja äänisuunnittelu', 'Formaatti räätälöitynä tarpeisiisi'],
          learnMore: 'Lue lisää videotuotannosta →',
          monthlyNote: 'Kuukausipaketti: 585 €/sessio (3 kuukauden sitoumus)',
        },
        bundle: {
          title: 'Valokuvaus- ja videopaketti',
          price: '1 090 €',
          description: 'Täysimittainen kuvaus, joka yhdistää valokuvauksen ja videokuvauksen kattavaan brändimateriaaliin.',
          features: ['Täysi kuvauspäivä (6 tuntia)', '3 ammattimaista videota', '5 lyhytmuotoista klippiä', '50+ korkearesoluutioista kuvaa', 'Ammattimainen editointi ja värimäärittely', 'Kaupalliset käyttöoikeudet', 'Formaatti räätälöitynä tarpeisiisi'],
          monthlyNote: 'Kuukausipaketti: 925 €/sessio (3 kuukauden sitoumus)',
        },
        essentials: {
          title: 'Essentials',
          price: '790 €',
          description: 'Peruslaatuinen brändi-identiteetti startupeille ja pienyrityksille, jotka haluavat rakentaa visuaalisen ilmeensä.',
          features: ['Logosuunnittelu (2 konseptia)', 'Peruskäyttöohjeet brändille', 'Käyntikortin suunnittelu', 'Sosiaalisen median mallipohjat', '1 korjauskierros'],
          learnMore: 'Lue lisää graafisesta suunnittelusta →',
          monthlyNote: 'Lisää kuukausittainen suunnittelutuki: +350 €/kk jatkuvaan suunnittelutyöhön (sosiaalinen media, markkinointimateriaalit, jne.)',
        },
        brandIdentity: {
          title: 'Brand Identity',
          price: '1 695 €',
          description: 'Täydellinen brändi-identiteettijärjestelmä kattavilla visuaalisilla ohjeistuksilla ja markkinointimateriaaleilla.',
          features: ['Brändistrategia ja asemointi', 'Logosuunnittelu (3+ konseptia)', 'Täydelliset brändiohjeet', 'Käyntikortti, kirjelomake ja sähköpostiallekirjoitus', 'Markkinointimateriaalien mallipohjat', 'Sosiaalisen median brändipaketti', '2 korjauskierrosta'],
          learnMore: 'Lue lisää graafisesta suunnittelusta →',
          monthlyNote: 'Lisää kuukausittainen suunnittelutuki: +450 €/kk jatkuviin sosiaalisen median grafiikoihin, markkinointimateriaaleihin ja brändimateriaalien päivityksiin',
        },
        fullStudio: {
          title: 'Full Studio',
          price: '3 850 €',
          description: 'Kaikki mitä tarvitset lanseeraukseen: täydellinen brändäys, ammattimainen valokuvaus, videosisältö ja räätälöity verkkosivusto.',
          features: ['Logosuunnittelu', 'Brändiohjeet ja visuaalinen identiteetti', 'Typografia ja värimaailma', '2 räätälöityä suunnittelukokonaisuutta', 'Sosiaalisen median mallipohjat', '1 pääasiallinen videotuotanto', '3 Instagram-/TikTok-lyhytvideota', '10 lisävideoklippiä', '25+ ammattimaisesti editoitua kuvaa', 'Räätälöity verkkosivuston suunnittelu ja toteutus', 'Hakukoneoptimointi (SEO)', '3 korjauskierrosta', '3 kuukautta jatkuvaa tukea mukana'],
          learnMore: 'Lue lisää graafisesta suunnittelusta →',
          monthlyNote: 'Jatka lanseerauksen jälkeen: +550 €/kk jatkuvaan suunnitteluun, sisällöntuotantoon ja verkkosivuston päivityksiin',
        },
        landingPage: {
          title: 'Landing Page',
          price: '450 €',
          description: 'Kohdistettu yksisivuinen sivusto, jolla saat verkkonäkyvyyden nopeasti käyntiin.',
          features: ['1-sivuinen responsiivinen sivusto (jopa 5 osiota)', 'Mobiilioptimoitu design', 'Yhteydenottolomakkeen integrointi', 'Perus-SEO-asetukset', '1 korjauskierros'],
          learnMore: 'Lue lisää verkkosivusuunnittelusta →',
          monthlyNote: 'Lisää ylläpito ja hosting: +10 €/kk hostingiin, päivityksiin ja pieniin muutoksiin',
        },
        businessWebsite: {
          title: 'Business Website',
          price: '890 €',
          description: 'Täysimittainen monisivuinen verkkosivusto yrityksille, jotka haluavat esitellä koko tarjontansa.',
          features: ['Jopa 6 sivua (Etusivu, Meistä, Palvelut, Portfolio, Yhteys)', 'Räätälöity responsiivinen design', 'Yhteydenottolomakkeen integrointi', 'On-page SEO -optimointi', 'Google Analytics -asetukset', '2 korjauskierrosta'],
          learnMore: 'Lue lisää verkkosivusuunnittelusta →',
          monthlyNote: 'Lisää ylläpito ja hosting: +10 €/kk hostingiin, päivityksiin ja sisällön muutoksiin',
        },
        social: {
          starterTitle: 'Starter',
          starterDescription: 'Kohdistettu aloituspiste brändeille, jotka rakentavat läsnäoloa yhdellä kanavalla.',
          growthTitle: 'Growth',
          growthDescription: 'Aktiivinen, monikanavainen läsnäolo, mukana lyhytvideosisältöä.',
          fullManagementTitle: 'Full Management',
          fullManagementDescription: 'Täysi sosiaalisen median läsnäolo kaikilla kolmella alustalla, kokonaan meidän tuottamana.',
          fullPackageTitle: 'Full Package',
          fullPackageDescription: 'Kaikki Full Management -paketin sisällöt, lisäksi kuukausittainen kuvauspäivä ja maksetun mainonnan hallinta.',
          getStarted: 'Aloita tästä',
          save: 'Säästä',
          period3Commitment: '3 kuukauden sitoumus',
          period6Commitment: '6 kuukauden sitoumus',
          period12Commitment: '12 kuukauden sitoumus',
          tableRows: {
            manager: 'Oma sosiaalisen median hoitaja',
            channels: 'Kanavat',
            feedPosts: 'Syötejulkaisut / kk',
            stories: 'Tarinat / kk',
            shortForm: 'Lyhytvideot / kk',
            shooting: 'Sisällön kuvaus',
            paidAds: 'Maksetun mainonnan hallinta',
            planning: 'Sisällönsuunnittelu ja copywriting',
            reporting: 'Raportointi',
            price: 'Hinta',
          },
          channelsStarter: 'Instagram tai Facebook (1)',
          channelsGrowth: 'Instagram + Facebook',
          channelsFullManagement: 'Instagram + Facebook + TikTok',
          channelsFullPackage: 'Instagram + Facebook + TikTok',
          shootingFullManagement: '4 h / kk',
          shootingFullPackage: '6 h / kk',
          paidAdsFullPackage: '4 kampanjaa / kk',
          reportingStarter: 'Perusraportti',
          reportingGrowth: 'Perusraportti + tarkistuspuhelu',
          reportingFullManagement: 'Perusraportti + kuukausipalaveri',
          reportingFullPackage: 'Perusraportti + kuukausipalaveri',
        },
        addShootNote: 'Lisää ammattimainen kuvaussessio: Valokuvaus 419 €, Video 527 €, Yhdistelmä 833 €/sessio — 10 % alennus normaalihinnoista Starter- ja Growth-asiakkaille.',
        eventsNote: 'Tapahtumiin: Ota suoraan yhteyttä räätälöityä tapahtumakuvauspakettia varten.',
        referenceNote: 'Nämä ovat viitteellisiä hintoja, joita voidaan muokata tarpeisiisi ja budjettiisi sopiviksi.',
      },
      about: {
        heading: 'Meistä',
        p1: 'Olemme ratkaisukeskeinen luova studio, joka erikoistuu graafiseen suunnitteluun, valokuvaukseen ja videotuotantoon. Autamme asiakkaitamme löytämään mahdollisuuksia viestiä ja kasvaa kertomalla heidän tarinansa laadukkaammin ja vaikuttavammin.',
        p2: 'Yli vuosikymmenen kokemuksella yhdistämme lähestymistavassamme innovatiivisen estetiikan voimakkaaseen tarinankerrontaan, luoden vaikuttavia visuaalisia kertomuksia, jotka resonoivat yleisön kanssa ja tuottavat merkityksellisiä tuloksia.',
        p3: 'Filosofiamme on yksinkertainen: vähemmän on enemmän. Uskomme yksinkertaisuuden voimaan ja harkitun suunnittelun vaikutukseen.',
        servicesHeading: 'PALVELUT',
        servicesList: ['Brändi-identiteetti ja suunnittelu', 'Toimituksellinen ja kaupallinen valokuvaus', 'Videotuotanto ja kuvaus', 'Taiteellinen johtaminen ja konsultointi'],
      },
      team: {
        heading: 'Tiimi',
        intro: 'Ihmiset kameran ja käsityön takana.',
        agustinRole: 'Perustaja · Graafinen suunnittelija · Kuva ja video',
        frankRole: 'Videokuvaaja · Sisällöntuottaja',
      },
      contact: {
        heading: 'Ota yhteyttä',
        intro: 'Valmiina aloittamaan projektisi? Keskustellaan siitä, miten voimme auttaa tuomaan visiosi todeksi.',
        detailsHeading: 'Kerro meille projektistasi',
        detailsText: 'Kerro meille lyhyesti, mitä tarvitset ja mikä on budjettisi, ja palaamme asiaan selkeällä ehdotuksella siitä, miten voimme auttaa — ei sitoumuksia, ei painostusta.',
        trustList: ['Ei sitoumusta varaamiseen', 'Ei tyrkyttävää myyntiä — vain rehellisiä neuvoja', 'Vastaamme tavallisesti 1–2 arkipäivän kuluessa'],
        emailLabel: 'Sähköposti',
        phoneLabel: 'Puhelin',
        locationLabel: 'Sijainti',
        locationNote: 'Toimimme ympäri Suomen ja Euroopan',
        followLabel: 'Seuraa',
        successHeading: 'Kiitos — viesti lähetetty!',
        successText: 'Olemme vastaanottaneet tietosi ja palaamme asiaan 1–2 arkipäivän kuluessa.',
        form: {
          firstName: 'Etunimi',
          lastName: 'Sukunimi',
          email: 'Sähköposti',
          phone: 'Puhelin',
          optional: '(valinnainen)',
          company: 'Yritys',
          projectType: 'Mitä tarvitset?',
          budget: 'Budjetti',
          message: 'Mitä haluaisit saavuttaa?',
          messagePlaceholder: 'Kerro lyhyesti projektistasi, tavoitteistasi tai mihin tarvitset apua.',
          companyPlaceholder: 'Yrityksen nimi',
          selectService: 'Valitse palvelu',
          serviceOptions: {
            photography: 'Valokuvaus',
            video: 'Videotuotanto',
            bundle: 'Valokuvaus- ja videopaketti',
            design: 'Graafinen suunnittelu ja brändi-identiteetti',
            web: 'Verkkosivusuunnittelu',
            social: 'Sosiaalisen median markkinointi',
            fullStudio: 'Full Studio -paketti',
            event: 'Tapahtumakuvaus',
            notSure: 'En ole varma',
          },
          selectBudget: 'Valitse hintahaarukka',
          budgetOptions: {
            under750: 'Alle 750 €',
            r750to1500: '750 – 1 500 €',
            r1500to3000: '1 500 – 3 000 €',
            r3000to5000: '3 000 – 5 000 €',
            over5000: '5 000 €+',
            notSure: 'En ole varma',
          },
          note: 'Hinnat ovat viitteellisiä — budjettisi kertominen auttaa meitä räätälöimään sinulle sopivan paketin.',
          submit: 'Lähetä viesti',
          sending: 'Lähetetään…',
          emailDirectly: 'Voit myös lähettää meille sähköpostia suoraan osoitteeseen',
        },
        tagsHeading: 'Mitä tarjoamme',
        tags: ['Graafinen suunnittelu', 'Brändi-identiteetin suunnittelu', 'Logosuunnittelu', 'Brändikonsultointi', 'Taiteellinen johtaminen ja konsultointi', 'Ammattivalokuvaus', 'Kaupallinen valokuvaus', 'Tapahtumakuvaus ja -video', 'Droonikuvaus ja -video', 'Kiinteistökuvaus', 'Muotokuvaus', 'Urheilukuvaus', 'Tuotekuvaus', 'Brändikuvaus', 'Lemmikkikuvaus', 'Valmistujaiskuvaus', 'Videotuotanto', 'Brändivideot', 'Mainosvideot', 'Lyhytvideot', 'Jälkimainosvideot', 'Haastatteluvideot', 'Tapahtumavideot', 'Droonivideot', 'Musiikkivideot', 'Häävideot', 'Videoeditointipalvelut', 'Sisällöntuotanto', 'Tapahtumatuotanto', 'Sosiaalinen media', 'UGC-sisällöntuotanto', 'Verkkosivusuunnittelu'],
      },
    },
  },
}
