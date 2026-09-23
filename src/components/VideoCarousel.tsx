import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import VideoPlayer from './VideoPlayer'
import type { Video } from '../data/portfolioData'

interface VideoCarouselProps {
  videos: Video[]
}

const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Stop the outgoing video immediately (before the remount) so it can never
  // keep playing/buffering underneath the newly selected one.
  const stopCurrentVideo = () => {
    containerRef.current?.querySelector('video')?.pause()
  }

  const goToPrevious = () => {
    stopCurrentVideo()
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    stopCurrentVideo()
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [videos.length])

  // If only one video, show it without carousel controls
  if (videos.length === 1) {
    return <VideoPlayer video={videos[0]} />
  }

  return (
    <div className="video-carousel" ref={containerRef}>
      <VideoPlayer key={videos[currentIndex].id} video={videos[currentIndex]} />

      <div className="carousel-controls">
        <button
          className="carousel-btn"
          onClick={goToPrevious}
          aria-label="Previous video"
        >
          <ChevronLeft size={16} /> PREV
        </button>

        <span className="carousel-indicator">
          Video {currentIndex + 1} of {videos.length}
        </span>

        <button
          className="carousel-btn"
          onClick={goToNext}
          aria-label="Next video"
        >
          NEXT <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default VideoCarousel
