import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navigation = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    // Only scroll if on home page
    if (location.pathname === '/') {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    // Close mobile menu when a link is clicked
    setIsMobileMenuOpen(false)

    if (id && location.pathname === '/') {
      e.preventDefault()
      scrollToSection(id)
    }
  }

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <img src="/logoabstrakti.svg" alt="Abstrakti creative studio" loading="eager" />
          </Link>

          {/* Hamburger menu button - only visible on mobile */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  handleLinkClick(e)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/#portfolio"
                onClick={(e) => handleLinkClick(e, 'portfolio')}
              >
                PORTFOLIO
              </Link>
            </li>
            <li>
              <Link
                to="/#services"
                onClick={(e) => handleLinkClick(e, 'services')}
              >
                SERVICES
              </Link>
            </li>
            <li>
              <Link
                to="/#about"
                onClick={(e) => handleLinkClick(e, 'about')}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
