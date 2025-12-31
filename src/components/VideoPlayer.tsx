import { useState, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import type { Video } from '../data/portfolioData'

interface VideoPlayerProps {
  video: Video
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
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
        autoPlay
        muted={isMuted}
        loop
        playsInline
        poster={video.posterImage}
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="video-mute-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  )
}

export default VideoPlayer
