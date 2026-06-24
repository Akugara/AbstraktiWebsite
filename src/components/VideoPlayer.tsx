import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Play, Pause, Maximize, Minimize } from 'lucide-react'
import type { Video } from '../data/portfolioData'

interface VideoPlayerProps {
  video: Video
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev
      if (videoRef.current) videoRef.current.muted = next
      return next
    })
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v || !duration) return
    const time = (Number(e.target.value) / 100) * duration
    v.currentTime = time
    setCurrentTime(time)
  }

  const toggleFullscreen = () => {
    const el = containerRef.current
    const v = videoRef.current
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else if (el?.requestFullscreen) {
      el.requestFullscreen()
    } else if (v && 'webkitEnterFullscreen' in v) {
      // iOS Safari only supports fullscreen on the video element itself
      ;(v as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen()
    }
  }

  useEffect(() => {
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  // Determine aspect ratio class
  const getAspectClass = () => {
    if (video.aspectRatio === '1080/1920') return 'vertical-1920'
    if (video.aspectRatio === '1080/1350') return 'vertical-1350'
    if (video.aspectRatio === '1920/1080') return 'horizontal'
    return 'horizontal'
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div ref={containerRef} className={`video-container ${getAspectClass()}`}>
      <video
        ref={videoRef}
        muted={isMuted}
        loop={video.loop !== false}
        playsInline
        poster={video.posterImage}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <button className="video-play-overlay" onClick={togglePlay} aria-label="Play video">
          <Play size={28} strokeWidth={1.5} />
        </button>
      )}

      <div className="video-controls">
        <button className="video-control-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <span className="video-time">{formatTime(currentTime)}</span>

        <input
          type="range"
          className="video-progress"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={handleSeek}
          aria-label="Seek"
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
        />

        <span className="video-time">{formatTime(duration)}</span>

        <button className="video-control-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button className="video-control-btn" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer
