import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const scrollToSection = (id: string) => {
    // Only scroll if on home page
    if (location.pathname === '/') {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <img src="/logoabstrakti.svg" alt="Abstrakti creative studio" />
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/#portfolio"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault()
                    scrollToSection('portfolio')
                  }
                }}
              >
                PORTFOLIO
              </Link>
            </li>
            <li>
              <Link
                to="/#services"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault()
                    scrollToSection('services')
                  }
                }}
              >
                SERVICES
              </Link>
            </li>
            <li>
              <Link
                to="/#about"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault()
                    scrollToSection('about')
                  }
                }}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault()
                    scrollToSection('contact')
                  }
                }}
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
