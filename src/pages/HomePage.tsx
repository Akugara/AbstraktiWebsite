import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Instagram } from 'lucide-react'
import { portfolioItems, tagLabel } from '../data/portfolioData'
import { useLang, portfolioPath, servicePath } from '../i18n/LanguageContext'
import { siteContent } from '../i18n/siteContent'

const formatPrice = (n: number, lang: 'en' | 'fi') =>
  lang === 'fi' ? `${n.toLocaleString('fi-FI')} €` : `€${n.toLocaleString('en-US')}`

const HomePage = () => {
  const location = useLocation()
  const lang = useLang()
  const c = siteContent[lang].home
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [serviceType, setServiceType] = useState('photo-video')
  const [socialPeriod, setSocialPeriod] = useState<'3' | '6' | '12'>('3')
  const [videoEnded, setVideoEnded] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  const socialPricing: Record<string, Record<'3' | '6' | '12', number>> = {
    starter: { '3': 390, '6': 360, '12': 330 },
    growth: { '3': 650, '6': 590, '12': 520 },
    fullManagement: { '3': 950, '6': 850, '12': 750 },
    fullPackage: { '3': 1490, '6': 1370, '12': 1230 },
  }

  const periodLabels: Record<'3' | '6' | '12', string> = {
    '3': c.services.social.period3Commitment,
    '6': c.services.social.period6Commitment,
    '12': c.services.social.period12Commitment,
  }

  const getSavingsLabel = (tierKey: keyof typeof socialPricing) => {
    if (socialPeriod === '3') return null
    const basePrice = socialPricing[tierKey]['3']
    const currentPrice = socialPricing[tierKey][socialPeriod]
    const savings = Math.round((1 - currentPrice / basePrice) * 100)
    return `${c.services.social.save} ${savings}%`
  }

  const WEB3FORMS_ACCESS_KEY = 'dd872ed7-0fed-4ea6-89ae-8a3772dfb3bd'

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const botcheckRef = useRef<HTMLInputElement>(null)

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: real visitors never check/fill this hidden field, bots often do.
    if (botcheckRef.current?.checked) {
      setFormStatus('success')
      return
    }

    setFormStatus('submitting')
    setFormError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New project inquiry from ${formData.firstName} ${formData.lastName}`.trim(),
          from_name: `${formData.firstName} ${formData.lastName}`.trim(),
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          project_type: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setFormStatus('success')
      } else {
        throw new Error(result.message || 'Something went wrong. Please try again or email us directly.')
      }
    } catch (err) {
      setFormStatus('error')
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.'
      )
    }
  }

  const handleVideoEnd = () => setVideoEnded(true)

  const handleReplay = () => {
    setVideoEnded(false)
    if (heroVideoRef.current) {
      heroVideoRef.current.currentTime = 0
      heroVideoRef.current.play()
    }
  }

  // If autoplay is blocked or the video stalls, fall back to the static
  // (dark-on-light) hero state instead of leaving white text on a white background.
  useEffect(() => {
    const timer = setTimeout(() => {
      const video = heroVideoRef.current
      if (video && video.paused && video.currentTime === 0) {
        setVideoEnded(true)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Deep-links into a section (e.g. arriving at "/#services" from another page)
  // need to scroll there once the page has rendered.
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
    return () => clearTimeout(timer)
  }, [location.hash])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const servicesSection = document.getElementById('services')
    const aboutSection = document.getElementById('about')
    const teamSection = document.getElementById('team')
    const contactSection = document.getElementById('contact')

    if (servicesSection) observer.observe(servicesSection)
    if (aboutSection) observer.observe(aboutSection)
    if (teamSection) observer.observe(teamSection)
    if (contactSection) observer.observe(contactSection)

    return () => {
      if (servicesSection) observer.unobserve(servicesSection)
      if (aboutSection) observer.unobserve(aboutSection)
      if (teamSection) observer.unobserve(teamSection)
      if (contactSection) observer.unobserve(contactSection)
    }
  }, [])

  const filteredItems = activeFilter === 'ALL'
    ? portfolioItems
    : portfolioItems.filter(item =>
        item.tags.some(tag => tag.toUpperCase() === activeFilter)
      )

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const canonicalUrl = lang === 'fi' ? 'https://abstrakti.eu/fi' : 'https://abstrakti.eu/'

  return (
    <div>
      <Helmet>
        <html lang={lang} />
        <title>{c.meta.title}</title>
        <meta name="description" content={c.meta.description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href="https://abstrakti.eu/" />
        <link rel="alternate" hrefLang="fi" href="https://abstrakti.eu/fi" />
        <link rel="alternate" hrefLang="x-default" href="https://abstrakti.eu/" />
        <meta property="og:title" content={c.meta.ogTitle} />
        <meta property="og:description" content={c.meta.ogDescription} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <video
          ref={heroVideoRef}
          className={`hero-video-bg${videoEnded ? ' faded' : ''}`}
          src="/video/HEROFINAL.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onError={handleVideoEnd}
        />
        <div className={`hero-text${videoEnded ? ' video-ended' : ''}`}>
          <h1>
            {c.hero.titleLine1}
            <br />
            {c.hero.titleLine2}
          </h1>
          <p className="subtitle">{c.hero.subtitle}</p>
          <div className="hero-cta-group">
            <a href="#portfolio" className="cta" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio') }}>{c.hero.cta}</a>
            <button className="replay-btn" onClick={handleReplay}>{c.hero.replay}</button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <h2>{c.portfolio.heading}</h2>

          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              {c.portfolio.filterAll}
            </button>
            <button
              className={`filter-tab ${activeFilter === 'GRAPHIC DESIGN' ? 'active' : ''}`}
              onClick={() => setActiveFilter('GRAPHIC DESIGN')}
            >
              {c.portfolio.filterDesign}
            </button>
            <button
              className={`filter-tab ${activeFilter === 'PHOTOGRAPHY' ? 'active' : ''}`}
              onClick={() => setActiveFilter('PHOTOGRAPHY')}
            >
              {c.portfolio.filterPhoto}
            </button>
            <button
              className={`filter-tab ${activeFilter === 'VIDEO' ? 'active' : ''}`}
              onClick={() => setActiveFilter('VIDEO')}
            >
              {c.portfolio.filterVideo}
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((item, index) => (
              <Link key={item.id} to={portfolioPath(lang, item.slug)} className="portfolio-item">
                <div className="portfolio-item-image">
                  <img
                    src={item.image}
                    alt={item.title[lang]}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="portfolio-item-overlay">
                    <span className="portfolio-item-title-overlay">{item.title[lang]}</span>
                  </div>
                </div>
                <div className="portfolio-item-info">
                  <h3>{item.title[lang]}</h3>
                  <p className="category">{item.tags.map(tag => tagLabel(tag, lang)).join(' · ')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>{c.services.heading}</h2>
          <p className="services-intro">
            {c.services.introLine1}
            <br />
            {c.services.introLine2}
            <br />
            <span style={{ fontSize: '0.9em', opacity: 0.8 }}>{c.services.introAlv}</span>
          </p>

          <div className="services-toggle">
            <button
              className={`toggle-btn ${serviceType === 'photo-video' ? 'active' : ''}`}
              onClick={() => setServiceType('photo-video')}
            >
              {c.services.togglePhotoVideo}
            </button>
            <button
              className={`toggle-btn ${serviceType === 'design' ? 'active' : ''}`}
              onClick={() => setServiceType('design')}
            >
              {c.services.toggleDesign}
            </button>
            <button
              className={`toggle-btn ${serviceType === 'webdesign' ? 'active' : ''}`}
              onClick={() => setServiceType('webdesign')}
            >
              {c.services.toggleWebDesign}
            </button>
            <button
              className={`toggle-btn ${serviceType === 'social' ? 'active' : ''}`}
              onClick={() => setServiceType('social')}
            >
              {c.services.toggleSocial}
            </button>
          </div>

          {serviceType === 'social' && (
            <div className="period-toggle">
              <button
                className={`period-btn ${socialPeriod === '3' ? 'active' : ''}`}
                onClick={() => setSocialPeriod('3')}
              >
                {c.services.period3}
              </button>
              <button
                className={`period-btn ${socialPeriod === '6' ? 'active' : ''}`}
                onClick={() => setSocialPeriod('6')}
              >
                {c.services.period6}
              </button>
              <button
                className={`period-btn ${socialPeriod === '12' ? 'active' : ''}`}
                onClick={() => setSocialPeriod('12')}
              >
                {c.services.period12}
              </button>
            </div>
          )}

          {serviceType === 'photo-video' ? (
            <div className="services-grid">
            <div className="service-package">
              <h3>{c.services.photography.title}</h3>
              <div className="package-price">{c.services.photography.price}</div>
              <p className="package-description">
                {c.services.photography.description}
              </p>
              <ul className="package-features">
                {c.services.photography.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to={servicePath(lang, 'photography')} className="package-learn-more">{c.services.photography.learnMore}</Link>
              <div className="package-monthly">
                <strong>{c.services.photography.monthlyNote}</strong>
              </div>
            </div>

            <div className="service-package">
              <h3>{c.services.video.title}</h3>
              <div className="package-price">{c.services.video.price}</div>
              <p className="package-description">
                {c.services.video.description}
              </p>
              <ul className="package-features">
                {c.services.video.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to={servicePath(lang, 'video-production')} className="package-learn-more">{c.services.video.learnMore}</Link>
              <div className="package-monthly">
                <strong>{c.services.video.monthlyNote}</strong>
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">{c.services.mostPopular}</div>
              <h3>{c.services.bundle.title}</h3>
              <div className="package-price">{c.services.bundle.price}</div>
              <p className="package-description">
                {c.services.bundle.description}
              </p>
              <ul className="package-features">
                {c.services.bundle.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="package-monthly">
                <strong>{c.services.bundle.monthlyNote}</strong>
              </div>
            </div>

          </div>
          ) : serviceType === 'design' ? (
            <div className="services-grid">
            <div className="service-package">
              <h3>{c.services.essentials.title}</h3>
              <div className="package-price">{c.services.essentials.price}</div>
              <p className="package-description">
                {c.services.essentials.description}
              </p>
              <ul className="package-features">
                {c.services.essentials.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to={servicePath(lang, 'graphic-design')} className="package-learn-more">{c.services.essentials.learnMore}</Link>
              <div className="package-monthly">
                <strong>{c.services.essentials.monthlyNote}</strong>
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">{c.services.mostPopular}</div>
              <h3>{c.services.brandIdentity.title}</h3>
              <div className="package-price">{c.services.brandIdentity.price}</div>
              <p className="package-description">
                {c.services.brandIdentity.description}
              </p>
              <ul className="package-features">
                {c.services.brandIdentity.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to={servicePath(lang, 'graphic-design')} className="package-learn-more">{c.services.brandIdentity.learnMore}</Link>
              <div className="package-monthly">
                <strong>{c.services.brandIdentity.monthlyNote}</strong>
              </div>
            </div>

            <div className="service-package">
              <h3>{c.services.fullStudio.title}</h3>
              <div className="package-price">{c.services.fullStudio.price}</div>
              <p className="package-description">
                {c.services.fullStudio.description}
              </p>
              <ul className="package-features">
                {c.services.fullStudio.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to={servicePath(lang, 'graphic-design')} className="package-learn-more">{c.services.fullStudio.learnMore}</Link>
              <div className="package-monthly">
                <strong>{c.services.fullStudio.monthlyNote}</strong>
              </div>
            </div>
          </div>
          ) : serviceType === 'webdesign' ? (
            <div className="services-grid">
            <div className="service-package">
              <h3>{c.services.landingPage.title}</h3>
              <div className="package-price">{c.services.landingPage.price}</div>
              <p className="package-description">
                {c.services.landingPage.description}
              </p>
              <ul className="package-features">
                {c.services.landingPage.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to={servicePath(lang, 'web-design')} className="package-learn-more">{c.services.landingPage.learnMore}</Link>
              <div className="package-monthly">
                <strong>{c.services.landingPage.monthlyNote}</strong>
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">{c.services.mostPopular}</div>
              <h3>{c.services.businessWebsite.title}</h3>
              <div className="package-price">{c.services.businessWebsite.price}</div>
              <p className="package-description">
                {c.services.businessWebsite.description}
              </p>
              <ul className="package-features">
                {c.services.businessWebsite.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Link to={servicePath(lang, 'web-design')} className="package-learn-more">{c.services.businessWebsite.learnMore}</Link>
              <div className="package-monthly">
                <strong>{c.services.businessWebsite.monthlyNote}</strong>
              </div>
            </div>
          </div>
          ) : (
            <>
            <div className="tier-summary-grid">
              <div className="tier-summary-card">
                <h3>{c.services.social.starterTitle}</h3>
                <div className="package-price">
                  {formatPrice(socialPricing.starter[socialPeriod], lang)}<span className="price-period">/kk</span>
                </div>
                {getSavingsLabel('starter') && <div className="savings-badge">{getSavingsLabel('starter')}</div>}
                <p className="tier-summary-description">
                  {c.services.social.starterDescription}
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{c.services.social.getStarted}</a>
              </div>

              <div className="tier-summary-card">
                <h3>{c.services.social.growthTitle}</h3>
                <div className="package-price">
                  {formatPrice(socialPricing.growth[socialPeriod], lang)}<span className="price-period">/kk</span>
                </div>
                {getSavingsLabel('growth') && <div className="savings-badge">{getSavingsLabel('growth')}</div>}
                <p className="tier-summary-description">
                  {c.services.social.growthDescription}
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{c.services.social.getStarted}</a>
              </div>

              <div className="tier-summary-card featured">
                <div className="featured-badge">{c.services.mostPopular}</div>
                <h3>{c.services.social.fullManagementTitle}</h3>
                <div className="package-price">
                  {formatPrice(socialPricing.fullManagement[socialPeriod], lang)}<span className="price-period">/kk</span>
                </div>
                {getSavingsLabel('fullManagement') && <div className="savings-badge">{getSavingsLabel('fullManagement')}</div>}
                <p className="tier-summary-description">
                  {c.services.social.fullManagementDescription}
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{c.services.social.getStarted}</a>
              </div>

              <div className="tier-summary-card">
                <h3>{c.services.social.fullPackageTitle}</h3>
                <div className="package-price">
                  {formatPrice(socialPricing.fullPackage[socialPeriod], lang)}<span className="price-period">/kk</span>
                </div>
                {getSavingsLabel('fullPackage') && <div className="savings-badge">{getSavingsLabel('fullPackage')}</div>}
                <p className="tier-summary-description">
                  {c.services.social.fullPackageDescription}
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{c.services.social.getStarted}</a>
              </div>
            </div>

            <div className="pricing-table-wrapper">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>{c.services.social.starterTitle}</th>
                    <th>{c.services.social.growthTitle}</th>
                    <th>{c.services.social.fullManagementTitle}</th>
                    <th>{c.services.social.fullPackageTitle}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{c.services.social.tableRows.manager}</td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.channels}</td>
                    <td>{c.services.social.channelsStarter}</td>
                    <td>{c.services.social.channelsGrowth}</td>
                    <td>{c.services.social.channelsFullManagement}</td>
                    <td>{c.services.social.channelsFullPackage}</td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.feedPosts}</td>
                    <td>4</td>
                    <td>8</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.stories}</td>
                    <td>8</td>
                    <td>12</td>
                    <td>20</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.shortForm}</td>
                    <td>–</td>
                    <td>2</td>
                    <td>6</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.shooting}</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="tick">✓</span> {c.services.social.shootingFullManagement}</td>
                    <td><span className="tick">✓</span> {c.services.social.shootingFullPackage}</td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.paidAds}</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="tick">✓</span> {c.services.social.paidAdsFullPackage}</td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.planning}</td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                  </tr>
                  <tr>
                    <td>{c.services.social.tableRows.reporting}</td>
                    <td>{c.services.social.reportingStarter}</td>
                    <td>{c.services.social.reportingGrowth}</td>
                    <td>{c.services.social.reportingFullManagement}</td>
                    <td>{c.services.social.reportingFullPackage}</td>
                  </tr>
                  <tr className="price-row">
                    <td>{c.services.social.tableRows.price} ({periodLabels[socialPeriod]})</td>
                    <td>{formatPrice(socialPricing.starter[socialPeriod], lang)}/kk</td>
                    <td>{formatPrice(socialPricing.growth[socialPeriod], lang)}/kk</td>
                    <td>{formatPrice(socialPricing.fullManagement[socialPeriod], lang)}/kk</td>
                    <td>{formatPrice(socialPricing.fullPackage[socialPeriod], lang)}/kk</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="services-note">
              <p>
                <strong>{c.services.addShootNote}</strong>
              </p>
            </div>
            </>
          )}

          <div className="services-note">
            <p>
              {serviceType === 'photo-video' && (
                <>
                  <strong>{c.services.eventsNote}</strong>
                  <br />
                </>
              )}
              {c.services.referenceNote}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>{c.about.heading}</h2>
              <p>
                {c.about.p1}
              </p>
              <p>
                {c.about.p2}
              </p>
              <p>
                {c.about.p3}
              </p>
            </div>

            <div>
              <div className="about-services">
                <h3>{c.about.servicesHeading}</h3>
                <ul>
                  {c.about.servicesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="container">
          <h2>{c.team.heading}</h2>
          <p className="team-intro">
            {c.team.intro}
          </p>

          <div className="team-grid">
            <div className="team-member">
              <div className="team-photo">
                <img src="/abstraktipeople/Agustin.jpg" alt="Agustin, Founder at Abstrakti" loading="lazy" />
              </div>
              <h3 className="team-name">Agustin</h3>
              <p className="team-role">{c.team.agustinRole}</p>
            </div>

            <div className="team-member">
              <div className="team-photo">
                <img src="/abstraktipeople/Frank.jpg" alt="Frank, Videographer and Content Creator at Abstrakti" loading="lazy" />
              </div>
              <h3 className="team-name">Frank</h3>
              <p className="team-role">{c.team.frankRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>{c.contact.heading}</h2>
          <p className="contact-intro">
            {c.contact.intro}
          </p>

          <div className="contact-grid">
            <div className="contact-details">
              <h3>{c.contact.detailsHeading}</h3>
              <p>
                {c.contact.detailsText}
              </p>

              <ul className="contact-trust-list">
                {c.contact.trustList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="contact-details-info">
                <div className="contact-info-item">
                  <h4>{c.contact.emailLabel}</h4>
                  <a href="mailto:agustin.garagorry@abstrakti.eu" className="email-bold">agustin.garagorry@abstrakti.eu</a>
                </div>

                <div className="contact-info-item">
                  <h4>{c.contact.phoneLabel}</h4>
                  <a href="tel:+358458753911">+358 45 875 3911</a>
                </div>

                <div className="contact-info-item">
                  <h4>{c.contact.locationLabel}</h4>
                  <p>Turku, Finland</p>
                  <p className="location-note">{c.contact.locationNote}</p>
                </div>

                <div className="contact-info-item">
                  <h4>{c.contact.followLabel}</h4>
                  <div className="social-links">
                    <a href="https://www.instagram.com/abstrakti.eu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              {formStatus === 'success' ? (
                <div className="form-success">
                  <h3>{c.contact.successHeading}</h3>
                  <p>
                    {c.contact.successText}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate>
                  {/* Honeypot field for spam bots — hidden from real visitors */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    ref={botcheckRef}
                    className="botcheck-field"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">{c.contact.form.firstName}</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder={c.contact.form.firstName}
                        value={formData.firstName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">{c.contact.form.lastName}</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder={c.contact.form.lastName}
                        value={formData.lastName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">{c.contact.form.email}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">{c.contact.form.phone} <span className="optional-tag">{c.contact.form.optional}</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+358 ..."
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">{c.contact.form.company} <span className="optional-tag">{c.contact.form.optional}</span></label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder={c.contact.form.companyPlaceholder}
                        value={formData.company}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="projectType">{c.contact.form.projectType}</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="" disabled>{c.contact.form.selectService}</option>
                        <option value="Photography">{c.contact.form.serviceOptions.photography}</option>
                        <option value="Video Production">{c.contact.form.serviceOptions.video}</option>
                        <option value="Photography & Video Bundle">{c.contact.form.serviceOptions.bundle}</option>
                        <option value="Graphic Design & Brand Identity">{c.contact.form.serviceOptions.design}</option>
                        <option value="Web Design">{c.contact.form.serviceOptions.web}</option>
                        <option value="Social Media Marketing">{c.contact.form.serviceOptions.social}</option>
                        <option value="Full Studio Package">{c.contact.form.serviceOptions.fullStudio}</option>
                        <option value="Event Coverage">{c.contact.form.serviceOptions.event}</option>
                        <option value="Not sure yet">{c.contact.form.serviceOptions.notSure}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="budget">{c.contact.form.budget}</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="" disabled>{c.contact.form.selectBudget}</option>
                        <option value="Under €750">{c.contact.form.budgetOptions.under750}</option>
                        <option value="€750 – €1,500">{c.contact.form.budgetOptions.r750to1500}</option>
                        <option value="€1,500 – €3,000">{c.contact.form.budgetOptions.r1500to3000}</option>
                        <option value="€3,000 – €5,000">{c.contact.form.budgetOptions.r3000to5000}</option>
                        <option value="€5,000+">{c.contact.form.budgetOptions.over5000}</option>
                        <option value="Not sure yet">{c.contact.form.budgetOptions.notSure}</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">{c.contact.form.message}</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder={c.contact.form.messagePlaceholder}
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <p className="form-note">
                    {c.contact.form.note}
                  </p>

                  {formStatus === 'error' && (
                    <p className="form-error">
                      {formError} {c.contact.form.emailDirectly}{' '}
                      <a href="mailto:agustin.garagorry@abstrakti.eu">agustin.garagorry@abstrakti.eu</a>.
                    </p>
                  )}

                  <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? c.contact.form.sending : c.contact.form.submit}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="service-tags">
            <h4>{c.contact.tagsHeading}</h4>
            <ul className="tag-list">
              {c.contact.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
