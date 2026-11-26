import type { Lang } from '../i18n/LanguageContext'

export interface LocalizedText {
  en: string
  fi: string
}

export interface Video {
  id: number
  url: string
  aspectRatio: string // '1080/1920', '1080/1350', or '1920/1080'
  posterImage?: string
  loop?: boolean // defaults to true; set false to play through once
}

export interface PortfolioImage {
  id: number
  url: string
  caption?: LocalizedText
}

export interface ImageRow {
  layout: 'full' | 'two-column' | 'three-column'
  images: PortfolioImage[]
}

export interface Credit {
  role: LocalizedText
  names: string
}

const tagLabels: Record<string, LocalizedText> = {
  Photography: { en: 'Photography', fi: 'Valokuvaus' },
  Video: { en: 'Video', fi: 'Video' },
  'Graphic Design': { en: 'Graphic Design', fi: 'Graafinen suunnittelu' },
}

export const tagLabel = (tag: string, lang: Lang) => tagLabels[tag]?.[lang] ?? tag

export interface PortfolioItem {
  id: number
  slug: string
  title: LocalizedText
  client: string
  year: number
  description: LocalizedText
  role: LocalizedText[]
  credits?: Credit[]
  tags: string[]
  image: string
  videos?: Video[]
  mainImage?: string          // Main featured image (alternative to videos)
  images?: PortfolioImage[]  // Legacy support
  imageRows?: ImageRow[]      // New structured layout
  clips?: Video[]            // Looping 1:1 clips shown in a single horizontal strip
  verticalVideos?: Video[]   // Vertical videos shown side by side
  endVideo?: Video           // Closing video shown after the image gallery
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 14,
    slug: 'slush-2026',
    title: { en: 'Slush 2026 – Event Photography', fi: 'Slush 2026 – Tapahtumakuvaus' },
    client: 'Slush',
    year: 2026,
    description: {
      en: "Slush brings together Europe's most ambitious founders, investors and innovators. It's one of the world's leading startup conferences.\n\nAs part of the official photography team, we covered the scale and energy of the event. That meant keynotes and panels, startup pitches, networking sessions and the atmosphere around the venue. Speakers ranged from Alexander Stubb, President of Finland, to Lovable's CEO.\n\nWorking closely with the other photographers, we captured the moments that showed what Slush is about: a diverse community and new ideas in action.",
      fi: "Slush kokoaa yhteen Euroopan kunnianhimoisimmat perustajat, sijoittajat ja innovaattorit. Se on yksi maailman johtavista startup-konferensseista.\n\nVirallisen valokuvaustiimin jäsenenä kuvasimme tapahtuman mittakaavaa ja energiaa. Se tarkoitti pääpuheenvuoroja ja paneelikeskusteluja, startup-pitchejä, verkostoitumistilaisuuksia ja tunnelmaa tapahtumapaikan ympärillä. Puhujien joukossa oli muun muassa Suomen presidentti Alexander Stubb ja Lovablen toimitusjohtaja.\n\nTyöskentelemällä tiiviisti muiden valokuvaajien kanssa tallensimme hetket, jotka kertoivat, mistä Slush on kyse: moninainen yhteisö ja uudet ideat käytännössä.",
    },
    role: [{ en: 'Photographer', fi: 'Valokuvaaja' }],
    tags: ['Photography'],
    image: '/FrameSlush2026.jpg',
    mainImage: '/projects/slush2026/mainimage.jpg',
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/slush2026/stubb-21.jpg', caption: { en: 'President of Finland Alexander Stubb on the Founder Stage', fi: 'Suomen presidentti Alexander Stubb Founder Stagella' } }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 2, url: '/projects/slush2026/reck-12.jpg' },
          { id: 3, url: '/projects/slush2026/reck-31.jpg' },
          { id: 4, url: '/projects/slush2026/reck-6.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 5, url: '/projects/slush2026/hinchy-16.jpg' },
          { id: 6, url: '/projects/slush2026/finalists-51.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 7, url: '/projects/slush2026/hinchy-5.jpg' },
          { id: 8, url: '/projects/slush2026/stubb-1.jpg' },
          { id: 9, url: '/projects/slush2026/finalists-10.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 10, url: '/projects/slush2026/impact-wilhelm-25.jpg' },
          { id: 11, url: '/projects/slush2026/impact-wilhelm-5.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 12, url: '/projects/slush2026/finalists-19.jpg' },
          { id: 13, url: '/projects/slush2026/opening-show-5.jpg' },
          { id: 14, url: '/projects/slush2026/big-team-3.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 15, url: '/projects/slush2026/atmosphere-10.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 16, url: '/projects/slush2026/framery-20.jpg' },
          { id: 17, url: '/projects/slush2026/framery-27.jpg' },
          { id: 18, url: '/projects/slush2026/impact-mishin-das-13.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 19, url: '/projects/slush2026/impact-wilhelm-29.jpg' }
        ]
      }
    ]
  },
  {
    id: 13,
    slug: 'since-ai-2026',
    title: { en: 'Since AI 2026 – Event Photography & Video', fi: 'Since AI 2026 – Tapahtumakuvaus ja video' },
    client: 'Since AI',
    year: 2026,
    description: {
      en: 'Since AI is the largest hackathon in the Nordics. More than a thousand participants from around the world spend two intensive days building and designing solutions to real AI challenges.\n\nAbstrakti handled the full content production: planning, photo and video coverage, and post-production. We delivered the YouTube aftermovie, a social media aftermovie, short-form videos, interviews, and an image bank Since AI will use to market its 2027 event.\n\nA team of three photographers and videographers covered the event.',
      fi: 'Since AI on Pohjoismaiden suurin hackathon. Yli tuhat osallistujaa ympäri maailmaa viettää kaksi intensiivistä päivää rakentaen ja suunnitellen ratkaisuja todellisiin tekoälyn haasteisiin.\n\nAbstrakti vastasi koko sisällöntuotannosta: suunnittelusta, valokuva- ja videokuvauksesta sekä jälkituotannosta. Toimitimme YouTube-jälkimainosvideon, sosiaalisen median jälkimainosvideon, lyhytvideoita, haastatteluja ja kuvapankin, jota Since AI käyttää vuoden 2027 tapahtumansa markkinoinnissa.\n\nKolmen valokuvaajan ja videokuvaajan tiimi kuvasi tapahtuman.',
    },
    role: [{ en: 'Photographer', fi: 'Valokuvaaja' }, { en: 'Videographer', fi: 'Videokuvaaja' }],
    credits: [
      { role: { en: 'Creative Direction & Photography', fi: 'Luova suunnittelu ja valokuvaus' }, names: 'Agustin Garagorry' },
      { role: { en: 'Videography', fi: 'Videokuvaus' }, names: 'Frank Rios, Jere Alanen' },
      { role: { en: 'Video Editing', fi: 'Videoeditointi' }, names: 'Agustin Garagorry, Jere Alanen' }
    ],
    tags: ['Photography', 'Video'],
    image: '/FrameSinceAI.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/sinceai2026/MainVideo.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/sinceai2026/poster-MainVideo.jpg',
        loop: false
      }
    ],
    verticalVideos: [
      {
        id: 1,
        url: '/projects/sinceai2026/since_ai_short_recap.mp4',
        aspectRatio: '1080/1920',
        posterImage: '/projects/sinceai2026/poster-since_ai_short_recap.jpg',
        loop: false
      },
      {
        id: 2,
        url: '/projects/sinceai2026/since-ai-partners-short.mp4',
        aspectRatio: '1080/1350',
        posterImage: '/projects/sinceai2026/poster-since-ai-partners-short.jpg',
        loop: false
      },
      {
        id: 3,
        url: '/projects/sinceai2026/since-ai-people-short.mp4',
        aspectRatio: '1080/1350',
        posterImage: '/projects/sinceai2026/poster-since-ai-people-short.jpg',
        loop: false
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/sinceai2026/SinceAIDay5-159.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 2, url: '/projects/sinceai2026/SinceAIDay5-4.jpg' },
          { id: 3, url: '/projects/sinceai2026/SinceAIDay5-44.jpg' },
          { id: 4, url: '/projects/sinceai2026/SinceAIDay5-95.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 5, url: '/projects/sinceai2026/SinceAiFourthBadge-77.jpg' },
          { id: 6, url: '/projects/sinceai2026/SinceAiFourthBadge-78.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 7, url: '/projects/sinceai2026/SinceAiThirdBadge-44.jpg' },
          { id: 8, url: '/projects/sinceai2026/SinceAiThirdBadge-81.jpg' },
          { id: 9, url: '/projects/sinceai2026/SinceAIDay5-29.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 10, url: '/projects/sinceai2026/SinceAIDay5-17.jpg' },
          { id: 11, url: '/projects/sinceai2026/SinceAIDay5-19.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 12, url: '/projects/sinceai2026/SinceAiSpeakerJason-17.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 13, url: '/projects/sinceai2026/SinceAIDay5-139.jpg' },
          { id: 14, url: '/projects/sinceai2026/SinceAIDay5-164.jpg' },
          { id: 15, url: '/projects/sinceai2026/SinceAiSpeakerJason-25.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 16, url: '/projects/sinceai2026/SinceAiSpeakerJason-69.jpg' },
          { id: 17, url: '/projects/sinceai2026/SinceAiThirdBadge-64.jpg' },
          { id: 18, url: '/projects/sinceai2026/SinceAiThirdBadge-93.jpg' }
        ]
      }
    ]
  },
  {
    id: 12,
    slug: 'nosejob',
    title: { en: 'A Nose Job for Soile', fi: 'A Nose Job for Soile' },
    client: 'Björkholm Cottages',
    year: 2026,
    description: {
      en: 'A Nose Job for Soile is a project in collaboration with Björkholm Cottages for the Saaristo campaign. We shot a creative video telling the story of Soile, a sheep in the archipelago who would love to travel around and discover the smells of other islands. With a hint of wholesome humor, we launched a 2-day production with lovely storytelling.',
      fi: 'A Nose Job for Soile on yhteistyöprojekti Björkholmin mökkien kanssa Saaristo-kampanjaa varten. Kuvasimme luovan videon Soilen tarinasta – saariston lampaasta, joka haluaisi matkustaa ympäriinsä ja tutustua muiden saarten tuoksuihin. Lämminhenkisellä huumorilla toteutimme kaksipäiväisen tuotannon kaunista tarinankerrontaa unohtamatta.',
    },
    role: [{ en: 'Videographer', fi: 'Videokuvaaja' }],
    tags: ['Video'],
    image: '/FrameNoseJob.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/nosejob/NoseJobForSoile.mp4',
        aspectRatio: '2880/2160',
        posterImage: '/projects/nosejob/poster-NoseJobForSoile.jpg',
        loop: false
      }
    ],
    clips: [
      {
        id: 1,
        url: '/projects/nosejob/projectclip1.mp4',
        aspectRatio: '2880/2160',
        posterImage: '/projects/nosejob/poster-projectclip1.jpg'
      },
      {
        id: 2,
        url: '/projects/nosejob/projectclip2.mp4',
        aspectRatio: '2880/2160',
        posterImage: '/projects/nosejob/poster-projectclip2.jpg'
      },
      {
        id: 3,
        url: '/projects/nosejob/projectclip3.mp4',
        aspectRatio: '2880/2160',
        posterImage: '/projects/nosejob/poster-projectclip3.jpg'
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/nosejob/web/default_1.2.1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 2, url: '/projects/nosejob/web/default_1.4.1.jpg' },
          { id: 3, url: '/projects/nosejob/web/default_1.5.1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 4, url: '/projects/nosejob/web/default_1.7.1.jpg' },
          { id: 5, url: '/projects/nosejob/web/default_1.8.1.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 6, url: '/projects/nosejob/web/default_1.10.1.jpg' },
          { id: 7, url: '/projects/nosejob/web/default_1.12.1.jpg' },
          { id: 8, url: '/projects/nosejob/web/default_1.13.1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 9, url: '/projects/nosejob/web/default_1.15.1.jpg' },
          { id: 10, url: '/projects/nosejob/web/default_1.16.1.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 11, url: '/projects/nosejob/web/default_2.1.1.jpg' }
        ]
      }
    ]
  },
  {
    id: 11,
    slug: 'futureplay',
    title: { en: 'FuturePlay – Global Gathering Hero Film', fi: 'FuturePlay – Globaalin tapaamisen hero-video' },
    client: 'FuturePlay',
    year: 2026,
    description: {
      en: 'FuturePlay is a mobile game developing company based in Helsinki with offices across Europe. Once a year, colleagues from every office and country travel to come together, work side by side, and celebrate as one team. We produced this hero film for FuturePlay\'s website to capture the energy of that gathering — the commute, the collaboration, and the camaraderie that defines the event.',
      fi: 'FuturePlay on Helsingissä toimiva mobiilipelejä kehittävä yritys, jolla on toimistoja ympäri Eurooppaa. Kerran vuodessa kollegat kaikista toimistoista ja maista matkustavat yhteen paikkaan työskentelemään vierekkäin ja juhlimaan yhtenä tiiminä. Tuotimme tämän hero-videon FuturePlayn verkkosivuille tallentamaan tapaamisen energian – matkan, yhteistyön ja yhteishenkeä, joka määrittää tapahtuman.',
    },
    role: [{ en: 'Videographer', fi: 'Videokuvaaja' }],
    tags: ['Video'],
    image: '/FrameFuturePlay.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/futureplay/futureplay.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/futureplay/poster-futureplay.jpg',
        loop: false
      }
    ]
  },
  {
    id: 10,
    slug: 'underdog',
    title: { en: 'Underdog Store – Photography & Social Media Clips', fi: 'Underdog Store – Valokuvaus ja sosiaalisen median klipit' },
    client: 'Underdog Store',
    year: 2026,
    description: {
      en: 'Underdog Store is a passion project led by Ari Lautanen, a golf player who wants to share his passion for the game. Like many entrepreneurs, he started with his own funds, and from our studio we believe in playing the long game. We built him a personalized growth strategy pack that prioritizes high-quality images, accompanied by multiple clips centered around the concept of underdog player situations.',
      fi: 'Underdog Store on golfinpelaaja Ari Lautasen vetämä sydämen projekti, jonka tavoitteena on jakaa hänen rakkautensa lajiin. Monien yrittäjien tavoin hän aloitti omalla rahoituksellaan, ja meidän studiossamme uskomme pitkän tähtäimen peliin. Rakensimme hänelle räätälöidyn kasvustrategiapaketin, joka priorisoi korkealaatuisia kuvia, täydennettynä useilla klipeillä, jotka keskittyvät altavastaaja-pelaajan tilanteiden teemaan.',
    },
    role: [{ en: 'Photographer', fi: 'Valokuvaaja' }, { en: 'Videographer', fi: 'Videokuvaaja' }],
    tags: ['Photography', 'Video'],
    image: '/FrameUnderdog.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/underdog/clip1.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/underdog/poster-clip1.jpg'
      },
      {
        id: 2,
        url: '/projects/underdog/clip2.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/underdog/poster-clip2.jpg'
      },
      {
        id: 3,
        url: '/projects/underdog/clip3.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/underdog/poster-clip3.jpg'
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/underdog/1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 2, url: '/projects/underdog/2.jpg' },
          { id: 3, url: '/projects/underdog/3.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 4, url: '/projects/underdog/4.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 5, url: '/projects/underdog/5.jpg' },
          { id: 6, url: '/projects/underdog/6.jpg' },
          { id: 7, url: '/projects/underdog/7.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 8, url: '/projects/underdog/8.jpg' },
          { id: 9, url: '/projects/underdog/9.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 10, url: '/projects/underdog/10.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 11, url: '/projects/underdog/11.jpg' },
          { id: 12, url: '/projects/underdog/12.jpg' },
          { id: 13, url: '/projects/underdog/13.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 14, url: '/projects/underdog/14.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 15, url: '/projects/underdog/15.jpg' },
          { id: 16, url: '/projects/underdog/16.jpg' },
          { id: 17, url: '/projects/underdog/17.jpg' }
        ]
      }
    ]
  },
  {
    id: 8,
    slug: 'bjorkholm',
    title: { en: 'Björkholm 1964', fi: 'Björkholm 1964' },
    client: 'Björkholm',
    year: 2026,
    description: {
      en: 'Leave your worries on the mainland. In 1935, a ship pilot and his wife claimed a stretch of island in the Finnish archipelago — a place shaped by tides, seasons, and the quiet rhythm of self-sufficient life. The family fished, tended hayfields, kept farm animals, and raised their children among fruit trees and open water. School meant rowing to the neighboring island of Heisala. As decades passed and the archipelago changed, their son Kurt Kronehag followed his father into the waters as a ship pilot. In 1964, Kurt and his wife Gulli built the first summer cabin on the island\'s south shore, opening their home to visitors. Over the next fifty years, that single cabin grew into a holiday village of eleven cottages. In 2018, a new generation took the helm. Johanna and Matthijs arrived as entrepreneurs with deep respect for what Kurt and Gulli built. Farm animals have returned to the island: horses graze the fields, sheep wander the paths, and chickens scratch near the cottages. Their son Jelmer was born here in 2021, their daughter Fenna in 2023. The island is raising a family again. Björkholm is not a resort. It is a place where life slows to the pace of the archipelago — sauna smoke drifting over still water, horses moving through morning light, oars pulling quietly across the lake. Nearly a century of one family\'s connection to this island, offered to you.',
      fi: 'Jätä huolesi mantereelle. Vuonna 1935 luotsi ja hänen vaimonsa ottivat haltuunsa saaren kaistaleen Suomen saaristossa – paikan, jota muovaavat vuorovedet, vuodenajat ja omavaraisen elämän hiljainen rytmi. Perhe kalasti, hoiti niittyjä, piti kotieläimiä ja kasvatti lapsiaan hedelmäpuiden ja avoimen veden keskellä. Koulunkäynti tarkoitti soutamista naapurisaarelle Heisalaan. Vuosikymmenten kuluessa ja saariston muuttuessa heidän poikansa Kurt Kronehag seurasi isänsä jalanjälkiä luotsina. Vuonna 1964 Kurt ja hänen vaimonsa Gulli rakensivat ensimmäisen kesämökin saaren etelärannalle ja avasivat kotinsa vierailijoille. Seuraavan viidenkymmenen vuoden aikana tästä yhdestä mökistä kasvoi yhdentoista mökin lomakylä. Vuonna 2018 uusi sukupolvi otti ohjat käsiinsä. Johanna ja Matthijs saapuivat yrittäjinä, joilla oli syvä kunnioitus sitä kohtaan, mitä Kurt ja Gulli olivat rakentaneet. Kotieläimet ovat palanneet saarelle: hevoset laiduntavat pelloilla, lampaat vaeltavat poluilla ja kanat kuopsuttelevat mökkien lähellä. Heidän poikansa Jelmer syntyi täällä vuonna 2021, tyttärensä Fenna vuonna 2023. Saari kasvattaa taas perhettä. Björkholm ei ole lomakeskus. Se on paikka, jossa elämä hidastuu saariston tahtiin – saunan savu leijuu tyynen veden yllä, hevoset liikkuvat aamun valossa ja airot soutavat hiljaa järven yli. Lähes vuosisadan mittainen yhden perheen yhteys tähän saareen, tarjottuna sinulle.',
    },
    role: [{ en: 'Videographer', fi: 'Videokuvaaja' }, { en: 'Photographer', fi: 'Valokuvaaja' }],
    tags: ['Video', 'Photography'],
    image: '/FrameBjorkholm.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/bjorkholm/Bjorkholm1964-Horizontal.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/bjorkholm/poster-Bjorkholm1964-Horizontal.jpg',
        loop: false
      }
    ],
    clips: [
      { id: 1, url: '/projects/bjorkholm/Clip1.mp4', aspectRatio: '1080/1080' },
      { id: 2, url: '/projects/bjorkholm/Clip2.mp4', aspectRatio: '1080/1080' },
      { id: 3, url: '/projects/bjorkholm/Clip3.mp4', aspectRatio: '1080/1080' }
    ],
    verticalVideos: [
      {
        id: 1,
        url: '/projects/bjorkholm/Bjorkholm1964-Second-Vertical.mp4',
        aspectRatio: '1080/1920',
        posterImage: '/projects/bjorkholm/poster-Bjorkholm1964-Second-Vertical.jpg',
        loop: false
      },
      {
        id: 2,
        url: '/projects/bjorkholm/Bjorkholm1964-Sensations-Vertical.mp4',
        aspectRatio: '1080/1920',
        posterImage: '/projects/bjorkholm/poster-Bjorkholm1964-Sensations-Vertical.jpg',
        loop: false
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/bjorkholm/1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 2, url: '/projects/bjorkholm/2.jpg' },
          { id: 3, url: '/projects/bjorkholm/3.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 4, url: '/projects/bjorkholm/4.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 5, url: '/projects/bjorkholm/5.jpg' },
          { id: 6, url: '/projects/bjorkholm/6.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 7, url: '/projects/bjorkholm/7.jpg' }
        ]
      },
      {
        layout: 'three-column',
        images: [
          { id: 8, url: '/projects/bjorkholm/8.jpg' },
          { id: 9, url: '/projects/bjorkholm/9.jpg' },
          { id: 10, url: '/projects/bjorkholm/10.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 11, url: '/projects/bjorkholm/11.jpg' },
          { id: 12, url: '/projects/bjorkholm/12.jpg' }
        ]
      },
      {
        layout: 'full',
        images: [
          { id: 13, url: '/projects/bjorkholm/13.jpg' }
        ]
      }
    ],
    endVideo: {
      id: 2,
      url: '/projects/bjorkholm/Bjorkholm1964-Second-Horizontal.mp4',
      aspectRatio: '1920/1080',
      posterImage: '/projects/bjorkholm/poster-Bjorkholm1964-Second-Horizontal.jpg',
      loop: false
    }
  },
  {
    id: 9,
    slug: 'through-the-gate',
    title: { en: 'Through the Gate', fi: 'Through the Gate' },
    client: 'Through the Gate',
    year: 2026,
    description: {
      en: 'Alongside the exhibition, we produced a documentary-style interview series capturing the six photographers as they reflect on their work and the four moments — Dawn, Movement, Contemplation, and Dream — that shape the exhibition\'s narrative. Shot in an intimate, observational style, the interviews trace each artist\'s process and perspective, giving viewers a deeper entry point into the vulnerability at the heart of the show: the same gate the exhibition itself invites us to open. We also designed, built, and deployed the exhibition\'s website, optimized for a seamless experience across desktop, tablet, and mobile. The site integrates real-time visitor statistics, allowing us to track engagement and refine the experience throughout the exhibition\'s run. From concept to launch, the goal was a digital space that felt as considered and immersive as the physical exhibition at Kluuvi Shopping Centre.',
      fi: 'Näyttelyn rinnalla tuotimme dokumentaarisen haastattelusarjan, jossa kuusi valokuvaajaa pohtii työtään ja neljää hetkeä – Aamunkoitto, Liike, Mietiskely ja Unelma – jotka muodostavat näyttelyn kertomuksen. Intiimillä, havainnoivalla kuvaustyylillä toteutetut haastattelut avaavat kunkin taiteilijan prosessia ja näkökulmaa, tarjoten katsojalle syvemmän pääsyn näyttelyn ytimessä olevaan haavoittuvuuteen: samaan porttiin, jonka näyttely itse kutsuu meidät avaamaan. Suunnittelimme, rakensimme ja julkaisimme myös näyttelyn verkkosivuston, optimoituna saumattomaan käyttökokemukseen tietokoneella, tabletilla ja mobiilissa. Sivusto hyödyntää reaaliaikaista kävijätilastointia, jonka avulla pystyimme seuraamaan sitoutumista ja hioimaan kokemusta näyttelyn keston ajan. Konseptista julkaisuun asti tavoitteena oli digitaalinen tila, joka tuntui yhtä harkitulta ja mukaansatempaavalta kuin fyysinen näyttely Kluuvin kauppakeskuksessa.',
    },
    role: [{ en: 'Videographer', fi: 'Videokuvaaja' }, { en: 'Photographer', fi: 'Valokuvaaja' }, { en: 'Web Designer', fi: 'Verkkosivusuunnittelija' }],
    tags: ['Video', 'Photography', 'Graphic Design'],
    image: '/FrameThroughTheGate.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/throughthegate/throughthegate.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/throughthegate/poster-throughthegate.jpg',
        loop: false
      }
    ],
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/throughthegate/Through1.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 2, url: '/projects/throughthegate/Through2.jpg' },
          { id: 3, url: '/projects/throughthegate/Through3.jpg' }
        ]
      },
      {
        layout: 'two-column',
        images: [
          { id: 4, url: '/projects/throughthegate/Through4.jpg' },
          { id: 5, url: '/projects/throughthegate/Through5.jpg' }
        ]
      }
    ]
  },
  {
    id: 1,
    slug: 'alora',
    title: { en: 'Ravintola Alora', fi: 'Ravintola Alora' },
    client: 'Alora Restaurant',
    year: 2025,
    description: {
      en: 'Alora is a kebab restaurant that showcases high-quality kebab, fully handmade. It combines local meat providers with Italian flour for their pizzas to bring the image of kebab to another level. Throughout the project, we created a script and aesthetics that align with the branding strategy designed to pursue their strategic goals. The result is unique, high-end visuals of their restaurant.',
      fi: 'Alora on kebab-ravintola, joka tarjoaa korkealaatuista, täysin käsintehtyä kebabia. Se yhdistää paikalliset lihantoimittajat italialaiseen pizzajauhoon nostaen kebabin mielikuvan uudelle tasolle. Projektin aikana loimme käsikirjoituksen ja visuaalisen ilmeen, jotka tukevat heidän brändistrategiaansa ja strategisia tavoitteitaan. Tulos on ainutlaatuinen, korkealaatuinen visuaalinen kuvasto ravintolasta.',
    },
    role: [{ en: 'Photographer', fi: 'Valokuvaaja' }, { en: 'Videographer', fi: 'Videokuvaaja' }],
    tags: ['Photography', 'Video'],
    image: '/FrameAlora.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/alora/AloraFlavours2.mp4',
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
    title: { en: 'Slush 2025 – Event Photography', fi: 'Slush 2025 – Tapahtumakuvaus' },
    client: 'Slush',
    year: 2025,
    description: {
      en: 'Slush 2025 brought together Europe\'s most ambitious entrepreneurs, investors, and innovators for three days of breakthrough moments and inspiring connections. As part of an amazing group of photographers, we covered the hectic energy and scale of one of the world\'s leading startup conferences—capturing everything from keynote speakers and panel discussions to networking sessions, startup pitches, and the vibrant atmosphere that defined the event. Working collaboratively across multiple photographers, we documented authentic moments that reflected the diverse community and transformative potential of Slush, creating a comprehensive visual narrative of innovation in action.',
      fi: 'Slush 2025 kokosi yhteen Euroopan kunnianhimoisimmat yrittäjät, sijoittajat ja innovaattorit kolmeksi päiväksi läpimurtohetkiä ja inspiroivia kohtaamisia. Osana upeaa valokuvaajaryhmää kuvasimme yhden maailman johtavista startup-konferensseista vilskettä ja mittakaavaa – kaikkea pääpuheenvuoroista ja paneelikeskusteluista verkostoitumistilaisuuksiin, startup-pitcheihin ja tapahtuman eloisaan tunnelmaan. Työskentelemällä yhdessä useiden valokuvaajien kanssa tallensimme aitoja hetkiä, jotka heijastivat Slushin moninaista yhteisöä ja muutosvoimaa, luoden kattavan visuaalisen kertomuksen innovaatiosta käytännössä.',
    },
    role: [{ en: 'Photographer', fi: 'Valokuvaaja' }],
    tags: ['Photography'],
    image: '/FrameSlush.jpg',
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
    title: { en: 'Mutate Renace – Brand Revival & Lifestyle Identity', fi: 'Mutate Renace – Brändin uudistuminen ja lifestyle-identiteetti' },
    client: 'Mutate',
    year: 2025,
    description: {
      en: 'Mutate is more than a clothing store—it\'s a curated lifestyle concept born from a nomadic vision and global sensibility. When fire devastated the original space, we saw an opportunity for transformation. Working alongside founder Gonzalo, we developed Mutate Renace—a reborn identity that honors the store\'s core values while embracing renewal and resilience. The single Buddha statue that survived the fire became a symbolic anchor, representing continuity through change. Our comprehensive rebrand encompassed a refined visual identity, atmospheric photography showcasing each piece\'s narrative, a thoughtfully designed catalog, and a digital presence that captures the nomadic spirit. The result is a brand that celebrates heritage, craftsmanship, and the stories embedded in every carefully selected garment.',
      fi: 'Mutate on enemmän kuin vaateliike – se on huolella koottu lifestyle-konsepti, joka syntyi nomadisesta visiosta ja globaalista herkkyydestä. Kun tulipalo tuhosi alkuperäisen tilan, näimme siinä mahdollisuuden muutokseen. Yhdessä perustaja Gonzalon kanssa kehitimme Mutate Renacen – uudestisyntyneen identiteetin, joka kunnioittaa liikkeen perusarvoja uudistumista ja sietokykyä unohtamatta. Ainoa tulipalosta säilynyt Buddha-patsas muodostui symboliseksi ankkuriksi, joka edustaa jatkuvuutta muutoksen keskellä. Kattava uudelleenbrändäyksemme käsitti hienostuneen visuaalisen ilmeen, tunnelmallisen valokuvauksen, joka tuo esiin jokaisen vaatteen tarinan, harkitusti suunnitellun katalogin ja digitaalisen läsnäolon, joka vangitsee nomadisen hengen. Tulos on brändi, joka juhlistaa perintöä, käsityötaitoa ja tarinoita, jotka kätkeytyvät jokaiseen huolella valittuun vaatekappaleeseen.',
    },
    role: [{ en: 'Brand Designer', fi: 'Brändisuunnittelija' }, { en: 'Photographer', fi: 'Valokuvaaja' }, { en: 'Creative Director', fi: 'Luova johtaja' }],
    tags: ['Graphic Design', 'Photography'],
    image: '/FrameMutate.jpg',
    mainImage: '/projects/mutate/mainimage.jpg',
    imageRows: [
      {
        layout: 'full',
        images: [
          { id: 1, url: '/projects/mutate/1.jpg' }
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
    title: { en: 'Ravintola Alora – Brand Identity & Campaign', fi: 'Ravintola Alora – Brändi-identiteetti ja kampanja' },
    client: 'Alora Restaurant',
    year: 2025,
    description: {
      en: 'Alora represents a shift in fast-food culture: a family-owned kebab and pizza restaurant that honors old-world traditions while embracing contemporary appeal. We developed a comprehensive rebranding strategy that repositions Alora as a premium, handcrafted alternative in the fast-food market. The visual identity centers on striking monochromatic photography that captures the craft and authenticity behind every dish. Our campaign taglines—"Real Handmade Kebab," "Real Handmade Pizza," and the provocative "Real Fast Food"—challenge industry conventions by celebrating quality over speed.',
      fi: 'Alora edustaa muutosta pikaruokakulttuurissa: perheyrityksenä toimiva kebab- ja pizzaravintola, joka kunnioittaa vanhoja perinteitä samalla kun se omaksuu nykyaikaisen vetovoiman. Kehitimme kattavan uudelleenbrändäysstrategian, joka asemoi Aloran premium-tason, käsintehdyksi vaihtoehdoksi pikaruokamarkkinoilla. Visuaalinen ilme keskittyy vaikuttavaan mustavalkoiseen valokuvaukseen, joka tuo esiin käsityötaidon ja aitouden jokaisen annoksen takana. Kampanjamme iskulauseet – "Real Handmade Kebab", "Real Handmade Pizza" ja provosoiva "Real Fast Food" – haastavat alan totutut käytännöt juhlistamalla laatua nopeuden kustannuksella.',
    },
    role: [{ en: 'Brand Designer', fi: 'Brändisuunnittelija' }, { en: 'Photographer', fi: 'Valokuvaaja' }, { en: 'Creative Director', fi: 'Luova johtaja' }],
    tags: ['Graphic Design', 'Photography', 'Video'],
    image: '/FrameAloraBranding.jpg',
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
    title: { en: '5 Mexican Artists in Finland', fi: '5 meksikolaista taiteilijaa Suomessa' },
    client: 'Embassy of Mexico',
    year: 2025,
    description: {
      en: 'Short video footage showcasing the inauguration of the art exhibition at Kluuvi Helsinki Shopping Center, organized by the Embassy of Mexico.',
      fi: 'Lyhyt videomateriaali Kluuvin kauppakeskuksessa Helsingissä järjestetyn taidenäyttelyn avajaisista, jonka organisoi Meksikon suurlähetystö.',
    },
    role: [{ en: 'Videographer', fi: 'Videokuvaaja' }],
    tags: ['Video'],
    image: '/projects/Frame2.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/5mexicans/5mexicanos.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/projects/Frame2.jpg'
      }
    ]
  },
  {
    id: 6,
    slug: 'kaj',
    title: { en: 'KAJ – Live Music Photography', fi: 'KAJ – Livemusiikkikuvaus' },
    client: 'KAJ',
    year: 2025,
    description: {
      en: 'KAJ, the Finnish-Swedish speaking Eurovision band, delivered an electrifying performance as part of Slush 2025. As part of a talented photography team, we captured the raw energy and unique moments of the live show from both top and bottom stage positions, documenting the band\'s dynamic presence and connection with the audience in real time.',
      fi: 'KAJ, suomenruotsalainen Euroviisu-yhtye, esiintyi sähköisesti osana Slush 2025 -tapahtumaa. Osana taitavaa valokuvaustiimiä tallensimme livenäytöksen raakaa energiaa ja ainutlaatuisia hetkiä molemmilta lavan puolilta, dokumentoiden yhtyeen dynaamista läsnäoloa ja yhteyttä yleisöön reaaliajassa.',
    },
    role: [{ en: 'Photographer', fi: 'Valokuvaaja' }],
    tags: ['Photography'],
    image: '/FrameKaj.jpg',
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
    title: { en: 'Helsinki in My Eyes – Art Exhibition Inauguration', fi: 'Helsinki in My Eyes – Taidenäyttelyn avajaiset' },
    client: 'Jorge Vega - Heritage Art Gallery',
    year: 2025,
    description: {
      en: 'Helsinki in My Eyes documented the vibrant inauguration of a contemporary art exhibition, capturing the opening moments, atmosphere, and attendees through both photography and video. Our coverage showcased the energy of the event, the artwork on display, and the community gathered to celebrate the exhibition\'s launch. The assignment focused on telling the story of the opening night—preserving authentic moments that reflected the artistic vision and cultural significance of the exhibition.',
      fi: 'Helsinki in My Eyes dokumentoi nykytaidenäyttelyn eloisat avajaiset, tallentaen avajaishetket, tunnelman ja vierailijat valokuvin ja videoin. Kuvauksemme toi esiin tapahtuman energian, esillä olevat teokset ja näyttelyn avausta juhlimaan kokoontuneen yhteisön. Toimeksianto keskittyi avajaisillan tarinan kertomiseen – aitojen hetkien tallentamiseen, jotka heijastivat näyttelyn taiteellista visiota ja kulttuurista merkitystä.',
    },
    role: [{ en: 'Photographer', fi: 'Valokuvaaja' }, { en: 'Videographer', fi: 'Videokuvaaja' }],
    tags: ['Video', 'Photography'],
    image: '/FrameJorge.jpg',
    videos: [
      {
        id: 1,
        url: '/projects/helsinkiinmyeyes/himevideo.mp4',
        aspectRatio: '1920/1080',
        posterImage: '/FrameJorge.jpg'
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
