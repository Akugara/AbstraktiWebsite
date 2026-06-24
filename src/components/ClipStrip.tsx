import type { Video } from '../data/portfolioData'

interface ClipStripProps {
  clips: Video[]
}

// Renders square (1:1) clips that autoplay on loop, muted, all in one horizontal strip.
const ClipStrip = ({ clips }: ClipStripProps) => {
  if (!clips || clips.length === 0) {
    return null
  }

  return (
    <div className="clip-strip">
      {clips.map((clip) => (
        <div key={clip.id} className="clip-strip-item">
          <video
            src={clip.url}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      ))}
    </div>
  )
}

export default ClipStrip
