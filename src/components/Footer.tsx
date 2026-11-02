import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/services/photography">Photography</Link>
        <Link to="/services/video-production">Video Production</Link>
        <Link to="/services/graphic-design">Graphic Design</Link>
        <Link to="/services/web-design">Web Design</Link>
      </div>
      <p>Copyright © 2026 abstrakti.eu - All Rights Reserved.</p>
    </footer>
  )
}

export default Footer
