import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLang, homePath, hashPath, switchLangPath } from '../i18n/LanguageContext'
import { siteContent } from '../i18n/siteContent'

const Navigation = () => {
  const location = useLocation()
  const lang = useLang()
  const c = siteContent[lang].nav
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isHome = location.pathname === homePath(lang)

  const scrollToSection = (id: string) => {
    // Only scroll if on home page
    if (isHome) {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    // Close mobile menu when a link is clicked
    setIsMobileMenuOpen(false)

    if (id && isHome) {
      e.preventDefault()
      scrollToSection(id)
    }
  }

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to={homePath(lang)} className="logo">
            <img src="/logoabstrakti.svg" alt="Abstrakti creative studio" loading="eager" />
          </Link>

          {/* Hamburger menu button - only visible on mobile */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={c.toggleMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link
                to={homePath(lang)}
                onClick={(e) => {
                  handleLinkClick(e)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                {c.home}
              </Link>
            </li>
            <li>
              <Link
                to={hashPath(lang, 'portfolio')}
                onClick={(e) => handleLinkClick(e, 'portfolio')}
              >
                {c.portfolio}
              </Link>
            </li>
            <li>
              <Link
                to={hashPath(lang, 'services')}
                onClick={(e) => handleLinkClick(e, 'services')}
              >
                {c.services}
              </Link>
            </li>
            <li>
              <Link
                to={hashPath(lang, 'about')}
                onClick={(e) => handleLinkClick(e, 'about')}
              >
                {c.about}
              </Link>
            </li>
            <li>
              <Link
                to={hashPath(lang, 'team')}
                onClick={(e) => handleLinkClick(e, 'team')}
              >
                {c.team}
              </Link>
            </li>
            <li>
              <Link
                to={hashPath(lang, 'contact')}
                onClick={(e) => handleLinkClick(e, 'contact')}
              >
                {c.contact}
              </Link>
            </li>
            <li className="nav-lang-switch">
              <Link
                to={switchLangPath(location.pathname, location.search, location.hash, 'en')}
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                EN
              </Link>
              {' / '}
              <Link
                to={switchLangPath(location.pathname, location.search, location.hash, 'fi')}
                className={lang === 'fi' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FI
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
