import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPortfolioBySlug, tagLabel } from '../data/portfolioData'
import { useLang, hashPath } from '../i18n/LanguageContext'
import VideoCarousel from '../components/VideoCarousel'
import VideoPlayer from '../components/VideoPlayer'
import ClipStrip from '../components/ClipStrip'
import ImageGallery from '../components/ImageGallery'

const PortfolioDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const lang = useLang()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!slug) {
    return <Navigate to="/" replace />
  }

  const project = getPortfolioBySlug(slug)

  if (!project) {
    return (
      <div className="portfolio-detail">
        <Link to="/" className="portfolio-detail-back">← Back to Portfolio</Link>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '20px' }}>Project Not Found</h2>
          <p style={{ color: '#666' }}>The project you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const title = project.title[lang]
  const description = project.description[lang]
  const tagLabels = project.tags.map((tag) => tagLabel(tag, lang))
  const pageTitle = `${title} – ${tagLabels.join(', ')} | Abstrakti`
  const pageDesc = `${description.replace(/\n+/g, ' ').slice(0, 155).trim()}…`
  const ogImage = `https://abstrakti.eu${project.mainImage ?? project.image}`
  const canonicalUrl = `${lang === 'fi' ? 'https://abstrakti.eu/fi' : 'https://abstrakti.eu'}/portfolio/${project.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image: ogImage,
    url: canonicalUrl,
    dateCreated: String(project.year),
    creator: {
      '@type': 'Organization',
      name: 'Abstrakti',
      url: 'https://abstrakti.eu'
    },
    genre: tagLabels.join(', '),
    client: project.client
  }

  return (
    <div className="portfolio-detail">
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={`https://abstrakti.eu/portfolio/${project.slug}`} />
        <link rel="alternate" hrefLang="fi" href={`https://abstrakti.eu/fi/portfolio/${project.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://abstrakti.eu/portfolio/${project.slug}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Link to={hashPath(lang, 'portfolio')} className="portfolio-detail-back">
        {lang === 'fi' ? '← Takaisin töihin' : '← Back to Portfolio'}
      </Link>

      <div className="portfolio-detail-header">
        <div className="portfolio-detail-client">{project.client}</div>
        <h1 className="portfolio-detail-title">{title}</h1>
        <div className="portfolio-detail-year">{project.year}</div>
      </div>

      <div className="portfolio-detail-content">
        <div className="portfolio-detail-video-section">
          {project.mainImage ? (
            <img
              src={project.mainImage}
              alt={title}
              className="portfolio-detail-main-image"
              loading="eager"
            />
          ) : project.videos && project.videos.length > 0 ? (
            <VideoCarousel videos={project.videos} />
          ) : null}
        </div>

        <div className="portfolio-detail-meta">
          <div className="portfolio-detail-meta-item">
            <h4>{lang === 'fi' ? 'Tietoa' : 'About'}</h4>
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="portfolio-detail-meta-item">
            <h4>{lang === 'fi' ? 'Rooli' : 'Role'}</h4>
            <ul>
              {project.role.map((role, index) => (
                <li key={index}>{role[lang]}</li>
              ))}
            </ul>
          </div>

          {project.credits && project.credits.length > 0 && (
            <div className="portfolio-detail-meta-item">
              <h4>{lang === 'fi' ? 'Tekijät' : 'Credits'}</h4>
              <ul>
                {project.credits.map((credit, index) => (
                  <li key={index}>{credit.role[lang]}: {credit.names}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="portfolio-detail-meta-item">
            <h4>{lang === 'fi' ? 'Kategoria' : 'Category'}</h4>
            <p>{tagLabels.join(' · ')}</p>
          </div>
        </div>
      </div>

      {project.clips && project.clips.length > 0 && (
        <ClipStrip clips={project.clips} />
      )}

      {project.verticalVideos && project.verticalVideos.length > 0 && (
        <div className="vertical-video-pair">
          {project.verticalVideos.map((video) => (
            <VideoPlayer key={video.id} video={video} />
          ))}
        </div>
      )}

      {(project.imageRows || project.images) && (
        <ImageGallery images={project.images} imageRows={project.imageRows} projectTitle={title} lang={lang} />
      )}

      {project.endVideo && (
        <div className="portfolio-detail-end-video">
          <VideoPlayer video={project.endVideo} />
        </div>
      )}
    </div>
  )
}

export default PortfolioDetailPage
