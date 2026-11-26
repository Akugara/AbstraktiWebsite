import type { PortfolioImage, ImageRow } from '../data/portfolioData'
import type { Lang } from '../i18n/LanguageContext'

interface ImageGalleryProps {
  images?: PortfolioImage[]
  imageRows?: ImageRow[]
  projectTitle?: string
  lang?: Lang
}

const ImageGallery = ({ images, imageRows, projectTitle, lang = 'en' }: ImageGalleryProps) => {
  const galleryTitle = lang === 'fi' ? 'Projektin kuvat' : 'Project Images'
  const fallbackAlt = (index: number) =>
    projectTitle
      ? (lang === 'fi' ? `${projectTitle} – kuva ${index + 1}, Abstrakti` : `${projectTitle} – photo ${index + 1} by Abstrakti`)
      : (lang === 'fi' ? `Portfoliokuva ${index + 1}, Abstrakti` : `Portfolio photo ${index + 1} by Abstrakti`)
  const altFor = (image: PortfolioImage, index: number) => image.caption?.[lang] ?? fallbackAlt(index)
  // Use new imageRows structure if available, otherwise fall back to legacy images
  if (imageRows && imageRows.length > 0) {
    return (
      <div className="image-gallery">
        <h3 className="image-gallery-title">{galleryTitle}</h3>
        <div className="image-gallery-rows">
          {imageRows.map((row, rowIndex) => (
            <div key={rowIndex} className={`image-row image-row-${row.layout}`}>
              {row.images.map((image, i) => (
                <div key={image.id} className="image-gallery-item">
                  <img
                    src={image.url}
                    alt={altFor(image, i)}
                    loading="lazy"
                  />
                  {image.caption && (
                    <p className="image-gallery-caption">{image.caption[lang]}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Legacy grid layout
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="image-gallery">
      <h3 className="image-gallery-title">{galleryTitle}</h3>
      <div className="image-gallery-grid">
        {images.map((image, i) => (
          <div key={image.id} className="image-gallery-item">
            <img
              src={image.url}
              alt={altFor(image, i)}
              loading="lazy"
            />
            {image.caption && (
              <p className="image-gallery-caption">{image.caption[lang]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
