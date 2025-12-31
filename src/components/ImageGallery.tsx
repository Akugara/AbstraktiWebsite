import type { PortfolioImage, ImageRow } from '../data/portfolioData'

interface ImageGalleryProps {
  images?: PortfolioImage[]
  imageRows?: ImageRow[]
}

const ImageGallery = ({ images, imageRows }: ImageGalleryProps) => {
  // Use new imageRows structure if available, otherwise fall back to legacy images
  if (imageRows && imageRows.length > 0) {
    return (
      <div className="image-gallery">
        <h3 className="image-gallery-title">Project Images</h3>
        <div className="image-gallery-rows">
          {imageRows.map((row, rowIndex) => (
            <div key={rowIndex} className={`image-row image-row-${row.layout}`}>
              {row.images.map((image) => (
                <div key={image.id} className="image-gallery-item">
                  <img src={image.url} alt={image.caption || 'Project image'} />
                  {image.caption && (
                    <p className="image-gallery-caption">{image.caption}</p>
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
      <h3 className="image-gallery-title">Project Images</h3>
      <div className="image-gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="image-gallery-item">
            <img src={image.url} alt={image.caption || 'Project image'} />
            {image.caption && (
              <p className="image-gallery-caption">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
