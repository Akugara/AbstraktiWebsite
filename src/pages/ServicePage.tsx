import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServiceBySlug } from '../data/servicesData'
import { portfolioItems, tagLabel } from '../data/portfolioData'
import { useLang, portfolioPath, hashPath, homePath } from '../i18n/LanguageContext'

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const lang = useLang()

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
          <Link to={homePath(lang)} className="portfolio-detail-back">← Back to Home</Link>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '20px' }}>Service Not Found</h2>
            <p style={{ color: '#666' }}>The service you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  const metaTitle = service.metaTitle[lang]
  const metaDescription = service.metaDescription[lang]
  const canonicalUrl = `${lang === 'fi' ? 'https://abstrakti.eu/fi' : 'https://abstrakti.eu'}/services/${service.slug}`
  const ogImage = `https://abstrakti.eu${service.ogImage}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name[lang],
    serviceType: service.serviceType[lang],
    description: metaDescription,
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
        <html lang={lang} />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={`https://abstrakti.eu/services/${service.slug}`} />
        <link rel="alternate" hrefLang="fi" href={`https://abstrakti.eu/fi/services/${service.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://abstrakti.eu/services/${service.slug}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="container">
        <Link to={homePath(lang)} className="portfolio-detail-back">
          {lang === 'fi' ? '← Takaisin etusivulle' : '← Back to Home'}
        </Link>

        <div className="service-page-hero">
          <p className="service-page-eyebrow">{service.heroEyebrow[lang]}</p>
          <h1>{service.name[lang]}</h1>
          {service.heroIntro.map((paragraph, index) => (
            <p key={index}>{paragraph[lang]}</p>
          ))}
        </div>

        <div className="services-grid">
          {service.pricingTiers.map((tier) => (
            <div key={tier.name} className={`service-package${tier.featured ? ' featured' : ''}`}>
              {tier.featured && <div className="featured-badge">{lang === 'fi' ? 'Suosituin' : 'Most Popular'}</div>}
              <h3>{tier.name}</h3>
              <div className="package-price">{tier.price[lang]}</div>
              <p className="package-description">{tier.description[lang]}</p>
              <ul className="package-features">
                {tier.features.map((feature, index) => (
                  <li key={index}>{feature[lang]}</li>
                ))}
              </ul>
              <div className="package-monthly">{tier.monthlyNote[lang]}</div>
            </div>
          ))}
        </div>

        {service.upsell && (
          <div className="services-note">
            <p><Link to={hashPath(lang, 'services')}>{service.upsell.text[lang]}</Link></p>
          </div>
        )}

        <section className="service-faq">
          <h2>{lang === 'fi' ? 'Usein kysytyt kysymykset' : 'Frequently Asked Questions'}</h2>
          {service.faq.map((item, index) => (
            <details key={index} className="faq-item">
              <summary>{item.question[lang]}</summary>
              <p>{item.answer[lang]}</p>
            </details>
          ))}
        </section>

        {relatedProjects.length > 0 && (
          <section className="service-related-work">
            <h2>{lang === 'fi' ? 'Aiheeseen liittyvät työt' : 'Related Work'}</h2>
            <div className="portfolio-grid">
              {relatedProjects.map((item, index) => (
                <Link key={item.id} to={portfolioPath(lang, item.slug)} className="portfolio-item">
                  <div className="portfolio-item-image">
                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                    <div className="portfolio-item-overlay">
                      <span className="portfolio-item-title-overlay">{item.title[lang]}</span>
                    </div>
                  </div>
                  <div className="portfolio-item-info">
                    <h3>{item.title[lang]}</h3>
                    <p className="category">{item.tags.map((tag) => tagLabel(tag, lang)).join(' · ')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="service-tags">
          <h4>{lang === 'fi' ? 'Aiheeseen liittyvät hakusanat' : 'Related Keywords'}</h4>
          <ul className="tag-list">
            {service.relatedTagCloudKeywords.map((keyword, index) => (
              <li key={index}>{keyword[lang]}</li>
            ))}
          </ul>
        </div>

        <div className="service-cta">
          <h2>{lang === 'fi' ? 'Valmiina aloittamaan projektisi?' : 'Ready to start your project?'}</h2>
          <p>
            {lang === 'fi'
              ? "Kerro meille muutama tieto siitä, mitä tarvitset, ja palaamme asiaan selkeällä ehdotuksella siitä, miten voimme auttaa."
              : "Tell us a few details about what you need and we'll get back to you with a clear idea of how we can help."}
          </p>
          <Link to={hashPath(lang, 'contact')} className="tier-cta">{lang === 'fi' ? 'Ota yhteyttä' : 'Get in touch'}</Link>
        </div>
      </div>
    </div>
  )
}

export default ServicePage
