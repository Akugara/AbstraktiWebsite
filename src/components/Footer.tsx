import { Link } from 'react-router-dom'
import { useLang, servicePath } from '../i18n/LanguageContext'
import { siteContent } from '../i18n/siteContent'

const Footer = () => {
  const lang = useLang()
  const c = siteContent[lang].footer

  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to={servicePath(lang, 'photography')}>{c.photography}</Link>
        <Link to={servicePath(lang, 'video-production')}>{c.video}</Link>
        <Link to={servicePath(lang, 'graphic-design')}>{c.design}</Link>
        <Link to={servicePath(lang, 'web-design')}>{c.web}</Link>
      </div>
      <p>{c.copyright}</p>
    </footer>
  )
}

export default Footer
