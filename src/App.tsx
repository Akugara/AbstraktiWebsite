import { useState, useEffect } from 'react'
import { Instagram, Twitter, Linkedin } from 'lucide-react'

function App() {
  const [activeFilter, setActiveFilter] = useState('ALL')

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

    const aboutSection = document.getElementById('about')
    const contactSection = document.getElementById('contact')

    if (aboutSection) observer.observe(aboutSection)
    if (contactSection) observer.observe(contactSection)

    return () => {
      if (aboutSection) observer.unobserve(aboutSection)
      if (contactSection) observer.unobserve(contactSection)
    }
  }, [])

  const portfolioItems = [
    { id: 1, title: 'Brand Identity', tags: ['Graphic Design'], image: '/Frame1.png' },
    { id: 2, title: 'Studio Session', tags: ['Photography'], image: '/Frame2.png' },
    { id: 3, title: 'Commercial Film', tags: ['Video', 'Photography'], image: '/Frame3.png' },
    { id: 4, title: 'Abstract Series', tags: ['Graphic Design'], image: '/Frame4.png' },
    { id: 5, title: 'Architecture', tags: ['Photography'], image: '/Frame5.png' },
  ]

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
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">Abstrakti creative studio</div>
            <ul className="nav-links">
              <li><a href="#home">HOME</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio') }}>PORTFOLIO</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>ABOUT</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>CONTACT</a></li>
            </ul>
          </div>
        </div>
      </nav>

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
              <div key={item.id} className="portfolio-item">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Studio</h2>
              <p>
                We are a multidisciplinary creative studio specializing in graphic design,
                photography, and video production. Our approach combines innovative aesthetics
                with powerful storytelling.
              </p>
              <p>
                With over a decade of experience, we've collaborated with brands and individuals
                worldwide to create compelling visual narratives that resonate with audiences.
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

              <div className="about-recognition">
                <h3>RECOGNITION</h3>
                <ul>
                  <li>Awwwards Site of the Day</li>
                  <li>FWA Featured Project</li>
                  <li>Communication Arts Award</li>
                  <li>Design Excellence Award</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>
            Let's Work
            <br />
            Together
          </h2>
          <p className="intro">
            Have a project in mind? We'd love to hear about it.
            <br />
            Drop us a line and let's create something amazing.
          </p>

          <div className="contact-info">
            <div className="contact-info-item">
              <h4>EMAIL</h4>
              <a href="mailto:hello@studio.com">abstrakti_wcts@gmail.com</a>
            </div>

            <div className="contact-info-item">
              <h4>PHONE</h4>
              <a href="tel:+1234567890">+598  41 725 9298</a>
            </div>

            <div className="contact-info-item">
              <h4>LOCATION</h4>
              <p>
                Turku, Finland
                <br />
                Finland
              </p>
            </div>

            <div className="contact-info-item">
              <h4>FOLLOW</h4>
              <div className="social-links">
                <a href="#"><Instagram size={18} /></a>
                <a href="#"><Twitter size={18} /></a>
                <a href="#"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>

          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" />
              </div>
            </div>

            <div className="form-group">
              <textarea placeholder="Tell us about your project" rows={4}></textarea>
            </div>

            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Studio. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
