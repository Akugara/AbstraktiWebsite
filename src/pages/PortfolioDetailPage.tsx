import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPortfolioBySlug } from '../data/portfolioData'
import VideoCarousel from '../components/VideoCarousel'
import VideoPlayer from '../components/VideoPlayer'
import ClipStrip from '../components/ClipStrip'
import ImageGallery from '../components/ImageGallery'

const PortfolioDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()

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

  const pageTitle = `${project.title} – ${project.tags.join(', ')} | Abstrakti`
  const pageDesc = `${project.description.slice(0, 155).trim()}…`
  const ogImage = `https://abstrakti.eu${project.mainImage ?? project.image}`
  const canonicalUrl = `https://abstrakti.eu/portfolio/${project.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: ogImage,
    url: canonicalUrl,
    dateCreated: String(project.year),
    creator: {
      '@type': 'Organization',
      name: 'Abstrakti',
      url: 'https://abstrakti.eu'
    },
    genre: project.tags.join(', '),
    client: project.client
  }

  return (
    <div className="portfolio-detail">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Link to="/#portfolio" className="portfolio-detail-back">← Back to Portfolio</Link>

      <div className="portfolio-detail-header">
        <div className="portfolio-detail-client">{project.client}</div>
        <h1 className="portfolio-detail-title">{project.title}</h1>
        <div className="portfolio-detail-year">{project.year}</div>
      </div>

      <div className="portfolio-detail-content">
        <div className="portfolio-detail-video-section">
          {project.mainImage ? (
            <img
              src={project.mainImage}
              alt={project.title}
              className="portfolio-detail-main-image"
              loading="eager"
            />
          ) : project.videos && project.videos.length > 0 ? (
            <VideoCarousel videos={project.videos} />
          ) : null}
        </div>

        <div className="portfolio-detail-meta">
          <div className="portfolio-detail-meta-item">
            <h4>About</h4>
            <p>{project.description}</p>
          </div>

          <div className="portfolio-detail-meta-item">
            <h4>Role</h4>
            <ul>
              {project.role.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </div>

          <div className="portfolio-detail-meta-item">
            <h4>Category</h4>
            <p>{project.tags.join(' · ')}</p>
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
        <ImageGallery images={project.images} imageRows={project.imageRows} projectTitle={project.title} />
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
