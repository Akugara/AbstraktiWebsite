import { useState, useRef } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import type { Video } from '../data/portfolioData'

interface VideoPlayerProps {
  video: Video
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  // Determine aspect ratio class
  const getAspectClass = () => {
    if (video.aspectRatio === '1080/1920') return 'vertical-1920'
    if (video.aspectRatio === '1080/1350') return 'vertical-1350'
    if (video.aspectRatio === '1920/1080') return 'horizontal'
    return 'horizontal'
  }

  return (
    <div className={`video-container ${getAspectClass()}`}>
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        poster={video.posterImage}
        onClick={togglePlay}
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <button className="video-play-overlay" onClick={togglePlay} aria-label="Play video">
          <Play size={28} strokeWidth={1.5} />
        </button>
      )}

      {isPlaying && (
        <button className="video-mute-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
