import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServiceBySlug } from '../data/servicesData'
import { portfolioItems } from '../data/portfolioData'

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!slug) {
    return <Navigate to="/" replace />
  }

  const service = getServiceBySlug(slug)

  if (!service) {
    return (
      <div className="service-page">
        <div className="container">
          <Link to="/" className="portfolio-detail-back">← Back to Home</Link>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '20px' }}>Service Not Found</h2>
            <p style={{ color: '#666' }}>The service you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  const canonicalUrl = `https://abstrakti.eu/services/${service.slug}`
  const ogImage = `https://abstrakti.eu${service.ogImage}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.serviceType,
    description: service.metaDescription,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: 'Abstrakti',
      url: 'https://abstrakti.eu',
      telephone: '+358458753911',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Turku',
        addressRegion: 'Southwest Finland',
        addressCountry: 'FI',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Turku' },
      { '@type': 'City', name: 'Helsinki' },
      { '@type': 'Country', name: 'Finland' },
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  }

  const relatedProjects = service.portfolioTags.length
    ? portfolioItems.filter((item) => item.tags.some((tag) => service.portfolioTags.includes(tag))).slice(0, 6)
    : []

  return (
    <div className="service-page">
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="container">
        <Link to="/" className="portfolio-detail-back">← Back to Home</Link>

        <div className="service-page-hero">
          <p className="service-page-eyebrow">{service.heroEyebrow}</p>
          <h1>{service.name}</h1>
          {service.heroIntro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="services-grid">
          {service.pricingTiers.map((tier) => (
            <div key={tier.name} className={`service-package${tier.featured ? ' featured' : ''}`}>
              {tier.featured && <div className="featured-badge">Most Popular</div>}
              <h3>{tier.name}</h3>
              <div className="package-price">{tier.price}</div>
              <p className="package-description">{tier.description}</p>
              <ul className="package-features">
                {tier.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="package-monthly">{tier.monthlyNote}</div>
            </div>
          ))}
        </div>

        {service.upsell && (
          <div className="services-note">
            <p><Link to={service.upsell.href}>{service.upsell.text}</Link></p>
          </div>
        )}

        <section className="service-faq">
          <h2>Frequently Asked Questions</h2>
          {service.faq.map((item, index) => (
            <details key={index} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>

        {relatedProjects.length > 0 && (
          <section className="service-related-work">
            <h2>Related Work</h2>
            <div className="portfolio-grid">
              {relatedProjects.map((item, index) => (
                <Link key={item.id} to={`/portfolio/${item.slug}`} className="portfolio-item">
                  <div className="portfolio-item-image">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                    <div className="portfolio-item-overlay">
                      <span className="portfolio-item-title-overlay">{item.title}</span>
                    </div>
                  </div>
                  <div className="portfolio-item-info">
                    <h3>{item.title}</h3>
                    <p className="category">{item.tags.join(' · ')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="service-tags">
          <h4>Related Keywords</h4>
          <ul className="tag-list">
            {service.relatedTagCloudKeywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>

        <div className="service-cta">
          <h2>Ready to start your project?</h2>
          <p>Tell us a few details about what you need and we'll get back to you with a clear idea of how we can help.</p>
          <Link to="/#contact" className="tier-cta">Get in touch</Link>
        </div>
      </div>
    </div>
  )
}

export default ServicePage
