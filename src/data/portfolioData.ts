export interface Video {
  id: number
  url: string
  aspectRatio: string // '1080/1920', '1080/1350', or '1920/1080'
  posterImage?: string
}

export interface PortfolioImage {
  id: number
  url: string
  caption?: string
}

export interface ImageRow {
  layout: 'full' | 'two-column' | 'three-column'
  images: PortfolioImage[]
}

export interface PortfolioItem {
  id: number
  slug: string
  title: string
  client: string
  year: number
  description: string
  role: string[]
  tags: string[]
  image: string
  videos?: Video[]
  mainImage?: string          // Main featured image (alternative to videos)
  images?: PortfolioImage[]  // Legacy support
  imageRows?: ImageRow[]      // New structured layout
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    slug: 'alora',
    title: 'Ravintola Alora',
    client: 'Alora Restaurant',
    year: 2025,
    description: 'Alora is a kebab restaurant that showcases high-quality kebab, fully handmade. It combines local meat providers with Italian flour for their pizzas to bring the image of kebab to another level. Throughout the project, we created a script and aesthetics that align with the branding strategy designed to pursue their strategic goals. The result is unique, high-end visuals of their restaurant.',
    role: ['Photographer', 'Videographer'],
    tags: ['Photography', 'Video'],
    image: 'FrameAlora.png',
    videos: [
      {
        id: 1,
        url: '/projects/alora/AloraFlavours2.mov',
        aspectRatio: '1080/1920',
        posterImage: '/projects/alora/1.jpg'
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/alora/1.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 2, url: '/projects/alora/2.jpg' },
          { id: 3, url: '/projects/alora/3.jpg' },
          { id: 4, url: '/projects/alora/4.jpg'}
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 5, url: '/projects/alora/5.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 6, url: '/projects/alora/6.jpg' },
          { id: 7, url: '/projects/alora/7.jpg' },
          { id: 8, url: '/projects/alora/8.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 9, url: '/projects/alora/9.jpg' }
        ]
      }
    ]
  },
  {
    id: 2,
    slug: 'slush-2025',
    title: 'Slush 2025 – Event Photography',
    client: 'Slush',
    year: 2025,
    description: 'Slush 2025 brought together Europe\'s most ambitious entrepreneurs, investors, and innovators for three days of breakthrough moments and inspiring connections. As part of an amazing group of photographers, we covered the hectic energy and scale of one of the world\'s leading startup conferences—capturing everything from keynote speakers and panel discussions to networking sessions, startup pitches, and the vibrant atmosphere that defined the event. Working collaboratively across multiple photographers, we documented authentic moments that reflected the diverse community and transformative potential of Slush, creating a comprehensive visual narrative of innovation in action.',
    role: ['Photographer'],
    tags: ['Photography'],
    image: '/FrameSlush.png',
    mainImage: '/projects/slush2025/mainimage.jpg',
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/slush2025/1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 2, url: '/projects/slush2025/2.jpg' },
          { id: 3, url: '/projects/slush2025/3.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 4, url: '/projects/slush2025/4.jpg' },
          { id: 5, url: '/projects/slush2025/5.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 6, url: '/projects/slush2025/6.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 7, url: '/projects/slush2025/7.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 8, url: '/projects/slush2025/8.jpg' },
          { id: 9, url: '/projects/slush2025/9.jpg' },
          { id: 10, url: '/projects/slush2025/10.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 11, url: '/projects/slush2025/11.jpg' },
          { id: 12, url: '/projects/slush2025/12.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 13, url: '/projects/slush2025/13.jpg' },
          { id: 14, url: '/projects/slush2025/14.jpg' },
          { id: 15, url: '/projects/slush2025/15.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 16, url: '/projects/slush2025/16.jpg' },
          { id: 17, url: '/projects/slush2025/17.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 18, url: '/projects/slush2025/18.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 19, url: '/projects/slush2025/19.jpg' },
          { id: 20, url: '/projects/slush2025/20.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 21, url: '/projects/slush2025/21.jpg' }
        ]
      }
    ]
  },
  {
    id: 3,
    slug: 'mutate',
    title: 'Mutate Renace – Brand Revival & Lifestyle Identity',
    client: 'Mutate',
    year: 2025,
    description: 'Mutate is more than a clothing store—it\'s a curated lifestyle concept born from a nomadic vision and global sensibility. When fire devastated the original space, we saw an opportunity for transformation. Working alongside founder Gonzalo, we developed Mutate Renace—a reborn identity that honors the store\'s core values while embracing renewal and resilience. The single Buddha statue that survived the fire became a symbolic anchor, representing continuity through change. Our comprehensive rebrand encompassed a refined visual identity, atmospheric photography showcasing each piece\'s narrative, a thoughtfully designed catalog, and a digital presence that captures the nomadic spirit. The result is a brand that celebrates heritage, craftsmanship, and the stories embedded in every carefully selected garment.',
    role: ['Brand Designer', 'Photographer', 'Creative Director'],
    tags: ['Graphic Design', 'Photography'],
    image: '/FrameMutate.png',
    mainImage: '/projects/mutate/mainimage.jpg',
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/mutate/1.png' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 2, url: '/projects/mutate/2.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 3, url: '/projects/mutate/3.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 4, url: '/projects/mutate/4.jpg' },
          { id: 5, url: '/projects/mutate/5.jpg' },
          { id: 6, url: '/projects/mutate/6.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 7, url: '/projects/mutate/7.jpg' },
          { id: 8, url: '/projects/mutate/8.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 9, url: '/projects/mutate/9.jpg' },
          { id: 10, url: '/projects/mutate/10.jpg' },
          { id: 11, url: '/projects/mutate/11.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 12, url: '/projects/mutate/12.jpg' },
          { id: 13, url: '/projects/mutate/13.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 14, url: '/projects/mutate/14.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 15, url: '/projects/mutate/15.jpg' },
          { id: 16, url: '/projects/mutate/16.jpg' },
          { id: 17, url: '/projects/mutate/17.jpg' }
        ]
      }
    ]
  },
  {
    id: 4,
    slug: 'alora-branding',
    title: 'Ravintola Alora – Brand Identity & Campaign',
    client: 'Alora Restaurant',
    year: 2025,
    description: 'Alora represents a shift in fast-food culture: a family-owned kebab and pizza restaurant that honors old-world traditions while embracing contemporary appeal. We developed a comprehensive rebranding strategy that repositions Alora as a premium, handcrafted alternative in the fast-food market. The visual identity centers on striking monochromatic photography that captures the craft and authenticity behind every dish. Our campaign taglines—"Real Handmade Kebab," "Real Handmade Pizza," and the provocative "Real Fast Food"—challenge industry conventions by celebrating quality over speed.',
    role: ['Brand Designer', 'Photographer', 'Creative Director'],
    tags: ['Graphic Design', 'Photography', 'Video'],
    image: '/FrameAloraBranding.png',
    videos: [
      {
        id: 1,
        url: '/projects/alorabranding/AloraRealFood1.mp4',
        aspectRatio: '1080/1920',
        posterImage: '/projects/alorabranding/1.jpg'
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/alorabranding/1.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 2, url: '/projects/alorabranding/2.jpg' },
          { id: 3, url: '/projects/alorabranding/3.jpg' },
          { id: 4, url: '/projects/alorabranding/4.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 5, url: '/projects/alorabranding/5.jpg' },
          { id: 6, url: '/projects/alorabranding/6.jpg' },
          { id: 7, url: '/projects/alorabranding/7.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 8, url: '/projects/alorabranding/8.jpg' },
          { id: 9, url: '/projects/alorabranding/9.jpg' },
          { id: 10, url: '/projects/alorabranding/10.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 11, url: '/projects/alorabranding/11.jpg' },
          { id: 12, url: '/projects/alorabranding/12.jpg' },
          { id: 13, url: '/projects/alorabranding/13.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 14, url: '/projects/alorabranding/14.jpg' }
        ]
      }
    ]
  },
  {
    id: 5,
    slug: '5-mexicans-in-finland',
    title: '5 Mexican Artists  in Finland',
    client: 'Embassy of Mexico',
    year: 2025,
    description: 'Short video footage showcasing the inauguration of the art exhibition at Kluuvi Helsinki Shopping Center, organized by the Embassy of Mexico.',
    role: ['Videographer'],
    tags: ['Video'],
    image: '/Frame2.png',
    videos: [
      {
        id: 1,
        url: '/projects/5mexicans/5mexicanos.mov',
        aspectRatio: '1920/1080',
        posterImage: '/Frame2.png'
      }
    ]
  },
  {
    id: 6,
    slug: 'kaj',
    title: 'KAJ – Live Music Photography',
    client: 'KAJ',
    year: 2025,
    description: 'KAJ, the Finnish-Swedish speaking Eurovision band, delivered an electrifying performance as part of Slush 2025. As part of a talented photography team, we captured the raw energy and unique moments of the live show from both top and bottom stage positions, documenting the band\'s dynamic presence and connection with the audience in real time.',
    role: ['Photographer'],
    tags: ['Photography'],
    image: '/FrameKaj.png',
    mainImage: '/projects/kaj/mainimage.jpg',
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/kaj/1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 2, url: '/projects/kaj/2.jpg' },
          { id: 3, url: '/projects/kaj/3.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 4, url: '/projects/kaj/4.jpg' },
          { id: 5, url: '/projects/kaj/5.jpg' },
          { id: 6, url: '/projects/kaj/6.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 7, url: '/projects/kaj/7.jpg' },
          { id: 8, url: '/projects/kaj/8.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 9, url: '/projects/kaj/9.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 10, url: '/projects/kaj/10.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 11, url: '/projects/kaj/11.jpg' },
          { id: 12, url: '/projects/kaj/12.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 13, url: '/projects/kaj/13.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 15, url: '/projects/kaj/15.jpg' },
          { id: 16, url: '/projects/kaj/16.jpg' },
          { id: 17, url: '/projects/kaj/17.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 14, url: '/projects/kaj/14.jpg' }
        ]
      }

    ]
  },
  {
    id: 7,
    slug: 'helsinki-in-my-eyes',
    title: 'Helsinki in My Eyes – Art Exhibition Inauguration',
    client: 'Jorge Vega - Heritage Art Gallery',
    year: 2025,
    description: 'Helsinki in My Eyes documented the vibrant inauguration of a contemporary art exhibition, capturing the opening moments, atmosphere, and attendees through both photography and video. Our coverage showcased the energy of the event, the artwork on display, and the community gathered to celebrate the exhibition\'s launch. The assignment focused on telling the story of the opening night—preserving authentic moments that reflected the artistic vision and cultural significance of the exhibition.',
    role: ['Photographer', 'Videographer'],
    tags: ['Video', 'Photography'],
    image: '/FrameJorge.png',
    videos: [
      {
        id: 1,
        url: '/projects/helsinkiinmyeyes/himevideo.mov',
        aspectRatio: '1920/1080',
        posterImage: '/FrameJorge.png'
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/helsinkiinmyeyes/1.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 2, url: '/projects/helsinkiinmyeyes/2.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 3, url: '/projects/helsinkiinmyeyes/3.jpg' },
          { id: 4, url: '/projects/helsinkiinmyeyes/4.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 5, url: '/projects/helsinkiinmyeyes/5.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 6, url: '/projects/helsinkiinmyeyes/6.jpg' },
          { id: 7, url: '/projects/helsinkiinmyeyes/7.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 8, url: '/projects/helsinkiinmyeyes/8.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 9, url: '/projects/helsinkiinmyeyes/9.jpg' },
          { id: 10, url: '/projects/helsinkiinmyeyes/10.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 11, url: '/projects/helsinkiinmyeyes/11.jpg' }
        ]
      }
    ]
  }
]

export const getPortfolioBySlug = (slug: string): PortfolioItem | undefined => {
  return portfolioItems.find(item => item.slug === slug)
}
