import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Instagram } from 'lucide-react'
import { portfolioItems } from '../data/portfolioData'

const formatPrice = (n: number) => n.toLocaleString('en-US')

const HomePage = () => {
  const location = useLocation()
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
    '3': '3-month commitment',
    '6': '6-month commitment',
    '12': '12-month commitment',
  }

  const getSavingsLabel = (tierKey: keyof typeof socialPricing) => {
    if (socialPeriod === '3') return null
    const basePrice = socialPricing[tierKey]['3']
    const currentPrice = socialPricing[tierKey][socialPeriod]
    const savings = Math.round((1 - currentPrice / basePrice) * 100)
    return `Save ${savings}%`
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

  return (
    <div>
      <Helmet>
        <title>Abstrakti – Creative Studio | Graphic Design, Photography & Video | Turku & Helsinki</title>
        <meta name="description" content="Abstrakti is a creative studio based in Turku, Finland, serving clients across Helsinki and Europe. We specialise in graphic design, brand identity, photography, and video production." />
        <link rel="canonical" href="https://abstrakti.eu/" />
        <meta property="og:title" content="Abstrakti – Creative Studio | Graphic Design, Photography & Video" />
        <meta property="og:description" content="Creative studio based in Turku and Helsinki. We help brands grow through graphic design, photography, and video production across Finland and Europe." />
        <meta property="og:url" content="https://abstrakti.eu/" />
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
            Creative
            <br />
            Studio
          </h1>
          <p className="subtitle">Graphic Design · Photography · Video Production</p>
          <div className="hero-cta-group">
            <a href="#portfolio" className="cta" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio') }}>View work →</a>
            <button className="replay-btn" onClick={handleReplay}>↺ Play reel</button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <h2>Selected Work</h2>

          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ALL')}
            >
              ALL
            </button>
            <button
              className={`filter-tab ${activeFilter === 'GRAPHIC DESIGN' ? 'active' : ''}`}
              onClick={() => setActiveFilter('GRAPHIC DESIGN')}
            >
              GRAPHIC DESIGN
            </button>
            <button
              className={`filter-tab ${activeFilter === 'PHOTOGRAPHY' ? 'active' : ''}`}
              onClick={() => setActiveFilter('PHOTOGRAPHY')}
            >
              PHOTOGRAPHY
            </button>
            <button
              className={`filter-tab ${activeFilter === 'VIDEO' ? 'active' : ''}`}
              onClick={() => setActiveFilter('VIDEO')}
            >
              VIDEO
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((item, index) => (
              <Link key={item.id} to={`/portfolio/${item.slug}`} className="portfolio-item">
                <div className="portfolio-item-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading={index < 3 ? "eager" : "lazy"}
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
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Services & Packages</h2>
          <p className="services-intro">
            Based in Turku, Finland, we work with clients across Finland and Europe.
            <br />
            We offer flexible service packages tailored to your needs. All prices are reference points and can be adjusted to fit your specific project.
            <br />
            <span style={{ fontSize: '0.9em', opacity: 0.8 }}>ALV 0%</span>
          </p>

          <div className="services-toggle">
            <button
              className={`toggle-btn ${serviceType === 'photo-video' ? 'active' : ''}`}
              onClick={() => setServiceType('photo-video')}
            >
              Photography & Video
            </button>
            <button
              className={`toggle-btn ${serviceType === 'design' ? 'active' : ''}`}
              onClick={() => setServiceType('design')}
            >
              Graphic Design
            </button>
            <button
              className={`toggle-btn ${serviceType === 'webdesign' ? 'active' : ''}`}
              onClick={() => setServiceType('webdesign')}
            >
              Web Design
            </button>
            <button
              className={`toggle-btn ${serviceType === 'social' ? 'active' : ''}`}
              onClick={() => setServiceType('social')}
            >
              Social Media
            </button>
          </div>

          {serviceType === 'social' && (
            <div className="period-toggle">
              <button
                className={`period-btn ${socialPeriod === '3' ? 'active' : ''}`}
                onClick={() => setSocialPeriod('3')}
              >
                3 Months
              </button>
              <button
                className={`period-btn ${socialPeriod === '6' ? 'active' : ''}`}
                onClick={() => setSocialPeriod('6')}
              >
                6 Months
              </button>
              <button
                className={`period-btn ${socialPeriod === '12' ? 'active' : ''}`}
                onClick={() => setSocialPeriod('12')}
              >
                12 Months
              </button>
            </div>
          )}

          {serviceType === 'photo-video' ? (
            <div className="services-grid">
            <div className="service-package">
              <h3>Photography</h3>
              <div className="package-price">€650</div>
              <p className="package-description">
                Professional photography services for products, portraits, or commercial needs.
              </p>
              <ul className="package-features">
                <li>Half day session (4 hours)</li>
                <li>Professional editing</li>
                <li>50+ high-resolution photos</li>
                <li>Commercial usage rights</li>
              </ul>
              <div className="package-monthly">
                <strong>Monthly package:</strong> €465/session (3-month commitment)
              </div>
            </div>

            <div className="service-package">
              <h3>Video</h3>
              <div className="package-price">€720</div>
              <p className="package-description">
                Cinematic video production for brands or promotional content.
              </p>
              <ul className="package-features">
                <li>Half day filming (4 hours)</li>
                <li>Professional editing & color grading</li>
                <li>1-3 minute final video</li>
                <li>Background music & sound design</li>
                <li>Format tailored to your needs</li>
              </ul>
              <div className="package-monthly">
                <strong>Monthly package:</strong> €585/session (3-month commitment)
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Photography & Video Bundle</h3>
              <div className="package-price">€1,090</div>
              <p className="package-description">
                A full shoot combining photography and videography for comprehensive brand coverage.
              </p>
              <ul className="package-features">
                <li>Full shoot (6 hours)</li>
                <li>3 professional videos</li>
                <li>5 short-form clips</li>
                <li>50+ high-resolution photos</li>
                <li>Professional editing & color grading</li>
                <li>Commercial usage rights</li>
                <li>Format tailored to your needs</li>
              </ul>
              <div className="package-monthly">
                <strong>Monthly package:</strong> €925/session (3-month commitment)
              </div>
            </div>

          </div>
          ) : serviceType === 'design' ? (
            <div className="services-grid">
            <div className="service-package">
              <h3>Essentials</h3>
              <div className="package-price">€790</div>
              <p className="package-description">
                Essential brand identity for startups and small businesses looking to establish their visual presence.
              </p>
              <ul className="package-features">
                <li>Logo design (2 concepts)</li>
                <li>Basic brand guidelines</li>
                <li>Business card design</li>
                <li>Social media templates</li>
                <li>1 revision round</li>
              </ul>
              <div className="package-monthly">
                <strong>Add monthly design support:</strong> +€350/month for ongoing design work (social media, marketing materials, etc.)
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Brand Identity</h3>
              <div className="package-price">€1,695</div>
              <p className="package-description">
                Complete brand identity system with comprehensive visual guidelines and marketing materials.
              </p>
              <ul className="package-features">
                <li>Brand strategy & positioning</li>
                <li>Logo design (3+ concepts)</li>
                <li>Complete brand guidelines</li>
                <li>Business card, letterhead & email signature</li>
                <li>Marketing collateral templates</li>
                <li>Social media brand kit</li>
                <li>2 revision rounds</li>
              </ul>
              <div className="package-monthly">
                <strong>Add monthly design support:</strong> +€450/month for ongoing social media graphics, marketing materials & brand asset updates
              </div>
            </div>

            <div className="service-package">
              <h3>Full Studio</h3>
              <div className="package-price">€3,850</div>
              <p className="package-description">
                Everything you need to launch: complete branding, professional photography, video content, and a custom website.
              </p>
              <ul className="package-features">
                <li>Logo design</li>
                <li>Brand guidelines & visual identity</li>
                <li>Typography & color palette</li>
                <li>2 custom design pieces</li>
                <li>Social media templates</li>
                <li>1 hero piece video</li>
                <li>3 Instagram / TikTok short-form videos</li>
                <li>10 additional video clips</li>
                <li>25+ professionally edited photos</li>
                <li>Custom website design & development</li>
                <li>SEO optimization</li>
                <li>3 revision rounds</li>
                <li>3 months of ongoing support included</li>
              </ul>
              <div className="package-monthly">
                <strong>Continue after launch:</strong> +€550/month for ongoing design, content creation & website updates
              </div>
            </div>
          </div>
          ) : serviceType === 'webdesign' ? (
            <div className="services-grid">
            <div className="service-package">
              <h3>Landing Page</h3>
              <div className="package-price">€450</div>
              <p className="package-description">
                A focused single-page site to establish an online presence quickly.
              </p>
              <ul className="package-features">
                <li>1-page responsive site (up to 5 sections)</li>
                <li>Mobile-optimized design</li>
                <li>Contact form integration</li>
                <li>Basic on-page SEO setup</li>
                <li>1 revision round</li>
              </ul>
              <div className="package-monthly">
                <strong>Add hosting & maintenance:</strong> +€40/month for hosting, updates & small edits
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Business Website</h3>
              <div className="package-price">€890</div>
              <p className="package-description">
                A complete multi-page website for businesses ready to showcase their full offering.
              </p>
              <ul className="package-features">
                <li>Up to 6 pages (Home, About, Services, Portfolio, Contact)</li>
                <li>Custom responsive design</li>
                <li>Contact form integration</li>
                <li>On-page SEO optimization</li>
                <li>Google Analytics setup</li>
                <li>2 revision rounds</li>
              </ul>
              <div className="package-monthly">
                <strong>Add hosting & maintenance:</strong> +€60/month for hosting, updates & content changes
              </div>
            </div>
          </div>
          ) : (
            <>
            <div className="tier-summary-grid">
              <div className="tier-summary-card">
                <h3>Starter</h3>
                <div className="package-price">
                  €{formatPrice(socialPricing.starter[socialPeriod])}<span className="price-period">/mo</span>
                </div>
                {getSavingsLabel('starter') && <div className="savings-badge">{getSavingsLabel('starter')}</div>}
                <p className="tier-summary-description">
                  A focused starting point for brands building a presence on one channel.
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Get started</a>
              </div>

              <div className="tier-summary-card">
                <h3>Growth</h3>
                <div className="package-price">
                  €{formatPrice(socialPricing.growth[socialPeriod])}<span className="price-period">/mo</span>
                </div>
                {getSavingsLabel('growth') && <div className="savings-badge">{getSavingsLabel('growth')}</div>}
                <p className="tier-summary-description">
                  Active, multi-channel presence with short-form video included.
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Get started</a>
              </div>

              <div className="tier-summary-card featured">
                <div className="featured-badge">Most Popular</div>
                <h3>Full Management</h3>
                <div className="package-price">
                  €{formatPrice(socialPricing.fullManagement[socialPeriod])}<span className="price-period">/mo</span>
                </div>
                {getSavingsLabel('fullManagement') && <div className="savings-badge">{getSavingsLabel('fullManagement')}</div>}
                <p className="tier-summary-description">
                  Full social presence across all three platforms, fully produced by us.
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Get started</a>
              </div>

              <div className="tier-summary-card">
                <h3>Full Package</h3>
                <div className="package-price">
                  €{formatPrice(socialPricing.fullPackage[socialPeriod])}<span className="price-period">/mo</span>
                </div>
                {getSavingsLabel('fullPackage') && <div className="savings-badge">{getSavingsLabel('fullPackage')}</div>}
                <p className="tier-summary-description">
                  Everything in Full Management, plus a dedicated monthly shoot day and paid ad management.
                </p>
                <a href="#contact" className="tier-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Get started</a>
              </div>
            </div>

            <div className="pricing-table-wrapper">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Starter</th>
                    <th>Growth</th>
                    <th>Full Management</th>
                    <th>Full Package</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dedicated social media manager</td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                  </tr>
                  <tr>
                    <td>Channels</td>
                    <td>Instagram or Facebook (1)</td>
                    <td>Instagram + Facebook</td>
                    <td>Instagram + Facebook + TikTok</td>
                    <td>Instagram + Facebook + TikTok</td>
                  </tr>
                  <tr>
                    <td>Feed posts / month</td>
                    <td>4</td>
                    <td>8</td>
                    <td>12</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>Stories / month</td>
                    <td>8</td>
                    <td>12</td>
                    <td>20</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>Short-form video / month</td>
                    <td>–</td>
                    <td>2</td>
                    <td>6</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>Content shooting</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="tick">✓</span> 4h / month</td>
                    <td><span className="tick">✓</span> 6h / month</td>
                  </tr>
                  <tr>
                    <td>Paid ad management</td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="cross">✗</span></td>
                    <td><span className="tick">✓</span> 4 campaigns / month</td>
                  </tr>
                  <tr>
                    <td>Content planning & copywriting</td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                    <td><span className="tick">✓</span></td>
                  </tr>
                  <tr>
                    <td>Reporting</td>
                    <td>Basic report</td>
                    <td>Basic report + check-in</td>
                    <td>Basic report + monthly call</td>
                    <td>Basic report + monthly call</td>
                  </tr>
                  <tr className="price-row">
                    <td>Price ({periodLabels[socialPeriod]})</td>
                    <td>€{formatPrice(socialPricing.starter[socialPeriod])}/mo</td>
                    <td>€{formatPrice(socialPricing.growth[socialPeriod])}/mo</td>
                    <td>€{formatPrice(socialPricing.fullManagement[socialPeriod])}/mo</td>
                    <td>€{formatPrice(socialPricing.fullPackage[socialPeriod])}/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="services-note">
              <p>
                <strong>Add a professional shoot:</strong> Photography €419, Video €527, Bundle €833/session — 10% off standard rates for Starter and Growth clients.
              </p>
            </div>
            </>
          )}

          <div className="services-note">
            <p>
              {serviceType === 'photo-video' && (
                <>
                  <strong>For events:</strong> Contact us directly for custom event coverage packages.
                  <br />
                </>
              )}
              These are reference prices that can be adjusted to your specific needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About</h2>
              <p>
                We are a solution-oriented creative studio specializing in graphic design,
                photography, and video production. We help our clients identify opportunities
                to communicate and grow by telling their stories with higher quality and impact.
              </p>
              <p>
                With over a decade of experience, our approach combines innovative aesthetics
                with powerful storytelling, creating compelling visual narratives that resonate
                with audiences and drive meaningful results.
              </p>
              <p>
                Our philosophy is simple: less is more. We believe in the power of simplicity and
                the impact of thoughtful design.
              </p>
            </div>

            <div>
              <div className="about-services">
                <h3>SERVICES</h3>
                <ul>
                  <li>Brand Identity & Design</li>
                  <li>Editorial & Commercial Photography</li>
                  <li>Video Production & Cinematography</li>
                  <li>Art Direction & Consulting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="container">
          <h2>The Team</h2>
          <p className="team-intro">
            The people behind the camera and the craft.
          </p>

          <div className="team-grid">
            <div className="team-member">
              <div className="team-photo">
                <img src="/abstraktipeople/Agustin.jpg" alt="Agustin, Founder at Abstrakti" loading="lazy" />
              </div>
              <h3 className="team-name">Agustin</h3>
              <p className="team-role">Founder · Graphic Designer · Photo &amp; Video</p>
            </div>

            <div className="team-member">
              <div className="team-photo">
                <img src="/abstraktipeople/Frank.jpg" alt="Frank, Videographer and Content Creator at Abstrakti" loading="lazy" />
              </div>
              <h3 className="team-name">Frank</h3>
              <p className="team-role">Videographer · Content Creator</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <p className="contact-intro">
            Ready to start your project? Let's talk about how we can help bring your vision to life.
          </p>

          <div className="contact-grid">
            <div className="contact-details">
              <h3>Tell us about your project</h3>
              <p>
                Share a few details about what you need and your budget, and we'll get back to
                you with a clear idea of how we can help &mdash; no obligation, no pressure.
              </p>

              <ul className="contact-trust-list">
                <li>No obligation to book</li>
                <li>No pushy sales &mdash; just honest advice</li>
                <li>We usually reply within 1&ndash;2 business days</li>
              </ul>

              <div className="contact-details-info">
                <div className="contact-info-item">
                  <h4>Email</h4>
                  <a href="mailto:agustin.garagorry@abstrakti.eu" className="email-bold">agustin.garagorry@abstrakti.eu</a>
                </div>

                <div className="contact-info-item">
                  <h4>Phone</h4>
                  <a href="tel:+358417259298">+358 41 725 9298</a>
                </div>

                <div className="contact-info-item">
                  <h4>Location</h4>
                  <p>Turku, Finland</p>
                  <p className="location-note">We work across Finland and Europe</p>
                </div>

                <div className="contact-info-item">
                  <h4>Follow</h4>
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
                  <h3>Thanks &mdash; message sent!</h3>
                  <p>
                    We've received your details and will get back to you within 1&ndash;2 business days.
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
                      <label htmlFor="firstName">First name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
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
                      <label htmlFor="phone">Phone <span className="optional-tag">(optional)</span></label>
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
                      <label htmlFor="company">Company <span className="optional-tag">(optional)</span></label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="projectType">What do you need?</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="Photography">Photography</option>
                        <option value="Video Production">Video Production</option>
                        <option value="Photography & Video Bundle">Photography &amp; Video Bundle</option>
                        <option value="Graphic Design & Brand Identity">Graphic Design &amp; Brand Identity</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Social Media Marketing">Social Media Marketing</option>
                        <option value="Full Studio Package">Full Studio Package</option>
                        <option value="Event Coverage">Event Coverage</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="budget">Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="" disabled>Select a range</option>
                        <option value="Under €750">Under €750</option>
                        <option value="€750 – €1,500">€750 &ndash; €1,500</option>
                        <option value="€1,500 – €3,000">€1,500 &ndash; €3,000</option>
                        <option value="€3,000 – €5,000">€3,000 &ndash; €5,000</option>
                        <option value="€5,000+">€5,000+</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">What would you like to achieve?</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us briefly about your project, goals, or what you need help with."
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <p className="form-note">
                    Prices are reference points &mdash; sharing your budget just helps us tailor
                    the right package for you.
                  </p>

                  {formStatus === 'error' && (
                    <p className="form-error">
                      {formError} You can also email us directly at{' '}
                      <a href="mailto:agustin.garagorry@abstrakti.eu">agustin.garagorry@abstrakti.eu</a>.
                    </p>
                  )}

                  <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? 'Sending…' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
