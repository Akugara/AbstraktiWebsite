export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  monthlyNote: string
  featured?: boolean
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ServicePageData {
  slug: 'photography' | 'video-production' | 'graphic-design' | 'web-design'
  name: string
  metaTitle: string
  metaDescription: string
  heroEyebrow: string
  heroIntro: string[]
  pricingTiers: PricingTier[]
  upsell?: { text: string; href: string }
  faq: FaqItem[]
  portfolioTags: string[]
  relatedTagCloudKeywords: string[]
  serviceType: string
  ogImage: string
}

export const servicesData: ServicePageData[] = [
  {
    slug: 'photography',
    name: 'Photography',
    metaTitle: 'Photography Services in Turku, Finland | Abstrakti',
    metaDescription: 'Professional photography based in Turku, Finland, serving clients across Finland, Europe and worldwide. Commercial usage rights included. Reference prices from €650.',
    heroEyebrow: 'Photography Services · Based in Finland, Available Worldwide',
    heroIntro: [
      "We're a Turku-based creative studio that treats every shoot as a chance to tell your brand's story with more clarity than a stock photo ever could. Over a decade of commercial and editorial work has taught us the same lesson every time: less is more — a handful of strong, deliberate images beats a memory card full of filler.",
      "Whether you need product photography for an e-commerce launch, portraits for your team page, or brand photography to go with a new identity, we run a focused half-day or full-day session, edit everything ourselves, and hand over commercial usage rights with the files — no licensing headaches later.",
      "Based in Turku, we work with clients across Finland, Europe and worldwide, and we're happy to travel for the right project.",
    ],
    pricingTiers: [
      {
        name: 'Photography',
        price: '€650',
        description: 'Professional photography services for products, portraits, or commercial needs.',
        features: [
          'Half day session (4 hours)',
          'Professional editing',
          '50+ high-resolution photos',
          'Commercial usage rights',
        ],
        monthlyNote: 'Monthly package: €465/session (3-month commitment)',
      },
    ],
    upsell: { text: 'Need video too? See our Photography & Video bundle pricing', href: '/#services' },
    faq: [
      {
        question: 'Do you only shoot in Turku?',
        answer: "We're based in Turku, Finland, but we work with clients across Finland, Europe and worldwide. Travel can be arranged for the right project — just mention your location when you get in touch.",
      },
      {
        question: 'Are the listed prices fixed?',
        answer: 'These are reference prices that can be adjusted to your specific needs and budget. A quick call usually gets you an accurate quote based on scope.',
      },
      {
        question: 'Do you shoot events?',
        answer: "Event photography is handled with a custom package rather than our standard session pricing — contact us directly and we'll put together a coverage plan for your event.",
      },
      {
        question: 'What do I get at the end of a session?',
        answer: 'A standard half-day session includes 50+ professionally edited, high-resolution photos delivered with full commercial usage rights, so you can use them across your website, social channels and print materials without extra licensing.',
      },
    ],
    portfolioTags: ['Photography'],
    relatedTagCloudKeywords: [
      'Professional Photography', 'Commercial Photography', 'Portrait Photography',
      'Product Photography', 'Brand Photography', 'Event Photography & Videography',
      'Real Estate Photography', 'Sports Photography', 'Pet Photography', 'Graduation Photography',
    ],
    serviceType: 'Photography',
    ogImage: '/FrameKaj.jpg',
  },
  {
    slug: 'video-production',
    name: 'Video Production',
    metaTitle: 'Video Production Services in Turku, Finland | Abstrakti',
    metaDescription: 'Brand films, promotional videos and short-form content produced in Turku, Finland, for clients across Finland, Europe and worldwide. Professional editing and color grading included. Reference prices from €720.',
    heroEyebrow: 'Video Production · Based in Finland, Available Worldwide',
    heroIntro: [
      "Good video does more than look nice — it tells a story people remember. We're a Turku-based studio producing brand films, promotional videos and short-form content for clients across Finland, Europe and worldwide, built around the same principle we apply to everything: less is more. A tight, well-shot minute beats five minutes of unfocused footage.",
      "A typical session is a half-day shoot followed by professional editing and color grading, delivered as a polished video in whatever format your channels need — landscape for YouTube, vertical for Instagram and TikTok, or both.",
      "We're based in Turku and regularly travel for shoots across Finland, Europe and worldwide.",
    ],
    pricingTiers: [
      {
        name: 'Video',
        price: '€720',
        description: 'Cinematic video production for brands or promotional content.',
        features: [
          'Half day filming (4 hours)',
          'Professional editing & color grading',
          '1-3 minute final video',
          'Background music & sound design',
          'Format tailored to your needs',
        ],
        monthlyNote: 'Monthly package: €585/session (3-month commitment)',
      },
    ],
    upsell: { text: 'Need photography too? See our Photography & Video bundle pricing', href: '/#services' },
    faq: [
      {
        question: 'How long is the final video?',
        answer: "Our standard Video package delivers a polished 1-3 minute final video, with the format (landscape, vertical, square) tailored to where you'll use it — website, YouTube, or social channels.",
      },
      {
        question: 'Do you handle event videography?',
        answer: "Event videography is quoted separately from our standard session pricing — contact us directly and we'll put together a coverage plan for your event.",
      },
      {
        question: 'Are the listed prices fixed?',
        answer: 'These are reference prices that can be adjusted to your specific needs and budget.',
      },
      {
        question: 'Do you only shoot in Turku?',
        answer: 'We’re based in Turku, Finland, but we work with clients across Finland, Europe and worldwide. Travel can be arranged for the right project.',
      },
    ],
    portfolioTags: ['Video'],
    relatedTagCloudKeywords: [
      'Video Production', 'Brand Films', 'Commercial Videos', 'Short-Form Video', 'Aftermovies',
      'Interview Videos', 'Event Videos', 'Drone Videos', 'Music Videos', 'Wedding Films', 'Video Editing Services',
    ],
    serviceType: 'Video Production',
    ogImage: '/FrameFuturePlay.jpg',
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design & Brand Identity',
    metaTitle: 'Graphic Design & Brand Identity in Turku, Finland | Abstrakti',
    metaDescription: 'Logo design, brand identity systems and visual guidelines for startups and businesses in Turku, Finland, serving clients across Finland, Europe and worldwide. Reference prices from €790.',
    heroEyebrow: 'Graphic Design & Brand Identity · Based in Finland, Available Worldwide',
    heroIntro: [
      "A brand is more than a logo — it's the visual language that makes people recognize and trust you at a glance. We're a Turku-based creative studio building brand identities for startups and established businesses alike, with the same philosophy behind every project: less is more. A focused, confident identity beats a cluttered one.",
      "Whether you need a quick logo and brand starter kit or a complete identity system with guidelines, business materials, and a custom website, our packages scale from Essentials up to a Full Studio launch package that bundles design, photography, video and web design into one engagement.",
      "Every project includes revision rounds, and ongoing monthly design support is available once you've launched. We're based in Turku, Finland, and work with clients across Finland, Europe and worldwide, collaborating remotely wherever you are.",
    ],
    pricingTiers: [
      {
        name: 'Essentials',
        price: '€790',
        description: 'Essential brand identity for startups and small businesses looking to establish their visual presence.',
        features: [
          'Logo design (2 concepts)',
          'Basic brand guidelines',
          'Business card design',
          'Social media templates',
          '1 revision round',
        ],
        monthlyNote: 'Add monthly design support: +€350/month for ongoing design work (social media, marketing materials, etc.)',
      },
      {
        name: 'Brand Identity',
        price: '€1,695',
        description: 'Complete brand identity system with comprehensive visual guidelines and marketing materials.',
        features: [
          'Brand strategy & positioning',
          'Logo design (3+ concepts)',
          'Complete brand guidelines',
          'Business card, letterhead & email signature',
          'Marketing collateral templates',
          'Social media brand kit',
          '2 revision rounds',
        ],
        monthlyNote: 'Add monthly design support: +€450/month for ongoing social media graphics, marketing materials & brand asset updates',
        featured: true,
      },
      {
        name: 'Full Studio',
        price: '€3,850',
        description: 'Everything you need to launch: complete branding, professional photography, video content, and a custom website.',
        features: [
          'Logo design',
          'Brand guidelines & visual identity',
          'Typography & color palette',
          '2 custom design pieces',
          'Social media templates',
          '1 hero piece video',
          '3 Instagram / TikTok short-form videos',
          '10 additional video clips',
          '25+ professionally edited photos',
          'Custom website design & development',
          'SEO optimization',
          '3 revision rounds',
          '3 months of ongoing support included',
        ],
        monthlyNote: 'Continue after launch: +€550/month for ongoing design, content creation & website updates',
      },
    ],
    faq: [
      {
        question: "What's the difference between Essentials and Brand Identity?",
        answer: "Essentials covers a focused logo and basic guidelines for startups just getting started. Brand Identity adds brand strategy, a complete guidelines document, more business materials, and a social media brand kit — it's our most popular package for businesses ready to look fully professional across every channel.",
      },
      {
        question: 'How many revision rounds are included?',
        answer: 'Essentials includes 1 revision round, Brand Identity includes 2, and Full Studio includes 3 — enough back-and-forth to get the identity right without scope creep.',
      },
      {
        question: 'Can I add photography or video to my branding project?',
        answer: 'Yes — the Full Studio package already bundles branding with photography, video and web design. Just ask when you reach out if you want to combine a smaller design package with photography or video.',
      },
      {
        question: 'Are the listed prices fixed?',
        answer: 'These are reference prices that can be adjusted to your specific needs and budget.',
      },
    ],
    portfolioTags: ['Graphic Design'],
    relatedTagCloudKeywords: ['Graphic Design', 'Brand Identity Design', 'Logo Design', 'Brand Consulting', 'Art Direction & Consulting'],
    serviceType: 'Graphic Design & Brand Identity',
    ogImage: '/FrameAloraBranding.jpg',
  },
  {
    slug: 'web-design',
    name: 'Web Design',
    metaTitle: 'Website Design in Turku, Finland | Abstrakti',
    metaDescription: 'Custom, responsive website design for businesses in Turku, Finland, serving clients across Finland, Europe and worldwide, from single-page launch sites to full multi-page business websites. Reference prices from €450.',
    heroEyebrow: 'Website Design · Based in Finland, Available Worldwide',
    heroIntro: [
      "Your website is often the first real impression of your business — and it should load fast, look sharp on every device, and make it obvious what to do next. We design and build focused, custom websites for businesses across Finland, Europe and worldwide, following the same principle as the rest of our work: less is more. A clean, fast site beats a bloated one every time.",
      "We offer everything from a single-page launch site to a complete multi-page business website with on-page SEO and analytics set up from day one, plus affordable ongoing hosting and maintenance so your site keeps running smoothly after launch.",
      "Based in Turku, we work with clients across Finland, Europe and worldwide — the entire process, from first brief to launch, runs comfortably remote.",
    ],
    pricingTiers: [
      {
        name: 'Landing Page',
        price: '€450',
        description: 'A focused single-page site to establish an online presence quickly.',
        features: [
          '1-page responsive site (up to 5 sections)',
          'Mobile-optimized design',
          'Contact form integration',
          'Basic on-page SEO setup',
          '1 revision round',
        ],
        monthlyNote: 'Add hosting & maintenance: +€10/month for hosting, updates & small edits',
      },
      {
        name: 'Business Website',
        price: '€890',
        description: 'A complete multi-page website for businesses ready to showcase their full offering.',
        features: [
          'Up to 6 pages (Home, About, Services, Portfolio, Contact)',
          'Custom responsive design',
          'Contact form integration',
          'On-page SEO optimization',
          'Google Analytics setup',
          '2 revision rounds',
        ],
        monthlyNote: 'Add hosting & maintenance: +€10/month for hosting, updates & content changes',
        featured: true,
      },
    ],
    faq: [
      {
        question: 'What does hosting and maintenance cost?',
        answer: 'Hosting, updates and small content edits are available for +€10/month on top of either package — an affordable way to keep your site running and up to date after launch.',
      },
      {
        question: "What's included in on-page SEO?",
        answer: "Both packages include on-page SEO setup — proper titles, meta descriptions, and structured content so your site is ready to be found on Google from day one. It's the same kind of setup we use on our own site.",
      },
      {
        question: 'Can I upgrade from a Landing Page to a full Business Website later?',
        answer: 'Yes — many clients start with a focused Landing Page and expand into a full multi-page Business Website as their needs grow. Just mention your landing page when you reach out and we’ll scope the upgrade.',
      },
      {
        question: 'Are the listed prices fixed?',
        answer: 'These are reference prices that can be adjusted to your specific needs and budget.',
      },
    ],
    portfolioTags: [],
    relatedTagCloudKeywords: ['Website Design'],
    serviceType: 'Web Design',
    ogImage: '/logoabstrakti.svg',
  },
]

export const getServiceBySlug = (slug: string): ServicePageData | undefined =>
  servicesData.find((service) => service.slug === slug)
