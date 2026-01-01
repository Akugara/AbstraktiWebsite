import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Instagram } from 'lucide-react'
import { portfolioItems } from '../data/portfolioData'

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [serviceType, setServiceType] = useState('photo-video')

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
    const contactSection = document.getElementById('contact')

    if (servicesSection) observer.observe(servicesSection)
    if (aboutSection) observer.observe(aboutSection)
    if (contactSection) observer.observe(contactSection)

    return () => {
      if (servicesSection) observer.unobserve(servicesSection)
      if (aboutSection) observer.unobserve(aboutSection)
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
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Creative
          <br />
          Studio
        </h1>
        <p className="subtitle">Graphic Design · Photography · Video Production</p>
        <a href="#portfolio" className="cta" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio') }}>View work →</a>
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
            {filteredItems.map((item) => (
              <Link key={item.id} to={`/portfolio/${item.slug}`} className="portfolio-item">
                <div className="portfolio-item-image">
                  <img src={item.image} alt={item.title} />
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
          </p>

          <div className="services-promo">
            <span className="promo-badge">First-timers get 10% off!</span>
          </div>

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
          </div>

          {serviceType === 'photo-video' ? (
            <div className="services-grid">
            <div className="service-package">
              <h3>Photography</h3>
              <div className="package-price">€350</div>
              <p className="package-description">
                Professional photography services for products, events, portraits, or commercial needs.
              </p>
              <ul className="package-features">
                <li>Half day session (4 hours)</li>
                <li>Professional editing</li>
                <li>50+ high-resolution photos</li>
                <li>Online gallery access</li>
                <li>Commercial usage rights</li>
              </ul>
              <div className="package-monthly">
                <strong>Monthly package:</strong> €275/session (3-month commitment)
              </div>
            </div>

            <div className="service-package">
              <h3>Video</h3>
              <div className="package-price">€450</div>
              <p className="package-description">
                Cinematic video production for brands, events, or promotional content.
              </p>
              <ul className="package-features">
                <li>Half day filming (4 hours)</li>
                <li>Professional editing & color grading</li>
                <li>1-3 minute final video</li>
                <li>Background music & sound design</li>
                <li>Multiple format deliverables</li>
              </ul>
              <div className="package-monthly">
                <strong>Monthly package:</strong> €390/session (3-month commitment)
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Photography & Video</h3>
              <div className="package-price">€650</div>
              <p className="package-description">
                Complete visual storytelling combining both photography and videography.
                Perfect for comprehensive brand coverage.
              </p>
              <ul className="package-features">
                <li>6 hours coverage</li>
                <li>Professional photography</li>
                <li>Video production & editing</li>
                <li>High-resolution deliverables</li>
                <li>Online gallery & video files</li>
              </ul>
              <div className="package-monthly">
                <strong>Monthly package:</strong> €550/session (3-month commitment)
              </div>
            </div>

          </div>
          ) : (
            <div className="services-grid">
            <div className="service-package">
              <h3>Quick Branding</h3>
              <div className="package-price">€600</div>
              <p className="package-description">
                Essential brand identity for startups and small businesses looking to establish their visual presence.
              </p>
              <ul className="package-features">
                <li>Logo design (2 concepts)</li>
                <li>Basic brand guidelines</li>
                <li>Business card design</li>
                <li>Social media templates</li>
                <li>2 revision rounds</li>
              </ul>
              <div className="package-monthly">
                <strong>Add monthly design support:</strong> +€350/month for ongoing design work (social media, marketing materials, etc.)
              </div>
            </div>

            <div className="service-package featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Branding</h3>
              <div className="package-price">€1,200</div>
              <p className="package-description">
                Complete brand identity system with comprehensive visual guidelines and marketing materials.
              </p>
              <ul className="package-features">
                <li>Brand strategy & positioning</li>
                <li>Logo design (3+ concepts)</li>
                <li>Complete brand guidelines</li>
                <li>Stationery design suite</li>
                <li>Marketing collateral templates</li>
                <li>Social media brand kit</li>
                <li>Unlimited revisions</li>
              </ul>
            </div>

            <div className="service-package">
              <h3>Full Package</h3>
              <div className="package-price">€2,500</div>
              <p className="package-description">
                Everything you need to launch: complete branding, professional photography, video content, and a custom website.
              </p>
              <ul className="package-features">
                <li>Complete branding package</li>
                <li>Professional photography session</li>
                <li>Video production & editing</li>
                <li>Custom website design & development</li>
                <li>SEO optimization</li>
                <li>Social media content package</li>
                <li>3 months of ongoing support</li>
              </ul>
            </div>
          </div>
          )}

          <div className="services-note">
            <p>
              <strong>For events:</strong> Contact us directly for custom event coverage packages.
              <br />
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

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <p className="contact-intro">
            Ready to start your project? Let's talk about how we can help bring your vision to life.
          </p>

          <div className="contact-info-centered">
            <div className="contact-info-item">
              <h4>Email</h4>
              <a href="mailto:agustin.garagorry@abstrakti.eu" className="email-bold">agustin.garagorry@abstrakti.eu</a>
            </div>

            <div className="contact-info-item">
              <h4>Phone</h4>
              <a href="tel:+59841725929">+598 41 725 9298</a>
            </div>

            <div className="contact-info-item">
              <h4>Location</h4>
              <p>Turku, Finland</p>
              <p className="location-note">We work across Finland and Europe</p>
            </div>

            <div className="contact-info-item">
              <h4>Follow</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/abstrakti_wcts/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
