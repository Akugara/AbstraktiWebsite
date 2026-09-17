import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import {
  getPublicGallery,
  verifyGalleryPassword,
  gallerySessionKey,
  type PublicGalleryFile,
} from '../lib/galleryApi'

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let value = bytes / 1024
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value.toFixed(1)} ${units[unitIndex]}`
}

const ClientGalleryPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requiresPassword, setRequiresPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [unlocking, setUnlocking] = useState(false)
  const [clientName, setClientName] = useState('')
  const [galleryType, setGalleryType] = useState<'photo' | 'video'>('photo')
  const [expiresAt, setExpiresAt] = useState<string | undefined>()
  const [files, setFiles] = useState<PublicGalleryFile[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [zipping, setZipping] = useState(false)

  const load = async (token?: string) => {
    if (!slug) return
    try {
      const data = await getPublicGallery(slug, token)
      setClientName(data.clientName)
      setGalleryType(data.type)
      if (data.requiresPassword) {
        setRequiresPassword(true)
      } else {
        setRequiresPassword(false)
        setExpiresAt(data.expiresAt)
        setFiles(data.files ?? [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'This gallery has expired or does not exist.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!slug) return
    const stored = sessionStorage.getItem(gallerySessionKey(slug)) ?? undefined
    load(stored)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!slug) return
    setUnlocking(true)
    setPasswordError('')
    try {
      const token = await verifyGalleryPassword(slug, passwordInput)
      sessionStorage.setItem(gallerySessionKey(slug), token)
      setLoading(true)
      await load(token)
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Incorrect password')
    } finally {
      setUnlocking(false)
    }
  }

  const handleDownloadAll = async () => {
    setZipping(true)
    try {
      const zip = new JSZip()
      for (const file of files) {
        const res = await fetch(file.url)
        const blob = await res.blob()
        zip.file(file.filename, blob)
      }
      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, `${clientName || 'gallery'}.zip`)
    } catch {
      setError('Could not create the zip file. Try downloading photos individually instead.')
    } finally {
      setZipping(false)
    }
  }

  if (loading) {
    return <div className="gallery-shell"><p className="gallery-status">Loading…</p></div>
  }

  if (error) {
    return (
      <div className="gallery-shell">
        <img src="/logoabstrakti.svg" alt="Abstrakti" className="gallery-logo" />
        <p className="gallery-status">{error}</p>
      </div>
    )
  }

  if (requiresPassword) {
    return (
      <div className="gallery-shell">
        <img src="/logoabstrakti.svg" alt="Abstrakti" className="gallery-logo" />
        <div className="gallery-password-card">
          <h1 className="gallery-title">{clientName}</h1>
          <p className="gallery-subtitle">This gallery is password protected.</p>
          <form onSubmit={handleUnlock}>
            <div className="form-group">
              <label htmlFor="gallery-password">Password</label>
              <input
                id="gallery-password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
              />
            </div>
            {passwordError && <p className="form-error">{passwordError}</p>}
            <button type="submit" className="submit-btn" disabled={unlocking}>
              {unlocking ? 'Checking…' : 'View gallery'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery-shell">
      <div className="gallery-header">
        <img src="/logoabstrakti.svg" alt="Abstrakti" className="gallery-logo" />
        <h1 className="gallery-title">{clientName}</h1>
        {expiresAt && (
          <p className="gallery-expiry">
            Available until {new Date(expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}
      </div>

      {galleryType === 'photo' && (
        <>
          {files.length > 0 && (
            <div className="gallery-toolbar">
              <button className="submit-btn gallery-download-all" onClick={handleDownloadAll} disabled={zipping}>
                {zipping ? 'Preparing zip…' : `Download all (${files.length})`}
              </button>
            </div>
          )}
          <div className="gallery-photo-grid">
            {files.map((file, i) => (
              <button key={file.filename} className="gallery-photo-item" onClick={() => setLightboxIndex(i)}>
                <img src={file.url} alt={file.filename} loading="lazy" />
              </button>
            ))}
          </div>
          {lightboxIndex !== null && files[lightboxIndex] && (
            <div className="gallery-lightbox" onClick={() => setLightboxIndex(null)}>
              <img src={files[lightboxIndex].url} alt={files[lightboxIndex].filename} onClick={(e) => e.stopPropagation()} />
              <a
                className="gallery-lightbox-download"
                href={files[lightboxIndex].url}
                onClick={(e) => e.stopPropagation()}
              >
                Download
              </a>
              <button className="gallery-lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close">×</button>
            </div>
          )}
        </>
      )}

      {galleryType === 'video' && (
        <div className="gallery-video-list">
          {files.map((file) => (
            <div key={file.filename} className="gallery-video-item">
              <video controls src={file.url} preload="metadata" />
              <div className="gallery-video-meta">
                <span>{file.filename}</span>
                <span className="gallery-file-size">{formatBytes(file.size)}</span>
                <a className="admin-link-btn" href={file.url}>Download</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ClientGalleryPage
