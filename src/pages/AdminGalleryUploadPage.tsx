import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  getGallery,
  getUploadUrl,
  confirmFile,
  uploadFileToR2,
  type GalleryMeta,
} from '../lib/adminApi'

interface UploadItem {
  id: string
  name: string
  progress: number
  status: 'uploading' | 'done' | 'error'
  error?: string
}

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

const AdminGalleryUploadPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [gallery, setGallery] = useState<GalleryMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [copied, setCopied] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!slug) return
    getGallery(slug)
      .then(({ gallery }) => setGallery(gallery))
      .catch((err) => {
        if (err instanceof Error && err.message.includes('Unauthorized')) {
          navigate('/admin')
          return
        }
        setLoadError(err instanceof Error ? err.message : 'Failed to load gallery')
      })
      .finally(() => setLoading(false))
  }, [slug, navigate])

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      if (!slug) return
      const fileArray = Array.from(files)

      for (const file of fileArray) {
        const id = `${file.name}-${file.size}-${Date.now()}`
        setUploads((prev) => [...prev, { id, name: file.name, progress: 0, status: 'uploading' }])

        try {
          const { uploadUrl } = await getUploadUrl(slug, file.name, file.type)
          await uploadFileToR2(uploadUrl, file, (pct) => {
            setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, progress: pct } : u)))
          })
          const { gallery: updated } = await confirmFile(slug, {
            filename: file.name,
            size: file.size,
            contentType: file.type || 'application/octet-stream',
          })
          setGallery(updated)
          setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, status: 'done', progress: 100 } : u)))
        } catch (err) {
          setUploads((prev) =>
            prev.map((u) =>
              u.id === id ? { ...u, status: 'error', error: err instanceof Error ? err.message : 'Upload failed' } : u
            )
          )
        }
      }
    },
    [slug]
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files)
  }

  const handleCopyLink = () => {
    if (!slug) return
    navigator.clipboard.writeText(`${window.location.origin}/gallery/${slug}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (loading) return <div className="admin-shell"><p className="admin-content">Loading…</p></div>
  if (loadError || !gallery) {
    return (
      <div className="admin-shell">
        <div className="admin-content">
          <p className="form-error">{loadError || 'Gallery not found'}</p>
          <Link to="/admin/galleries">Back to dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <img src="/logoabstrakti.svg" alt="Abstrakti" className="admin-logo" />
        <Link to="/admin/galleries" className="admin-link-btn">Back to dashboard</Link>
      </div>

      <div className="admin-content">
        <section className="admin-panel">
          <h2 className="admin-panel-title">{gallery.clientName}</h2>
          <p className="admin-meta-line">
            {gallery.type === 'photo' ? 'Photo gallery' : 'Video gallery'} · expires{' '}
            {new Date(gallery.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
            {gallery.passwordHash ? ' · password protected' : ''}
          </p>
          <div className="admin-share-row">
            <code className="admin-share-link">{`${window.location.origin}/gallery/${gallery.slug}`}</code>
            <button className="admin-link-btn" onClick={handleCopyLink}>{copied ? 'Copied!' : 'Copy link'}</button>
          </div>
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel-title">Upload files</h2>
          <div
            className={`admin-dropzone ${dragActive ? 'active' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <p>Drag files here, or click to choose files</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            />
          </div>

          {uploads.length > 0 && (
            <ul className="admin-upload-list">
              {uploads.map((u) => (
                <li key={u.id} className={`admin-upload-item ${u.status}`}>
                  <span className="admin-upload-name">{u.name}</span>
                  {u.status === 'uploading' && (
                    <div className="admin-progress-track">
                      <div className="admin-progress-fill" style={{ width: `${u.progress}%` }} />
                    </div>
                  )}
                  {u.status === 'done' && <span className="admin-upload-status">Done</span>}
                  {u.status === 'error' && <span className="admin-upload-status error">{u.error}</span>}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel-title">Files in this gallery ({gallery.files.length})</h2>
          {gallery.files.length === 0 && <p>No files uploaded yet.</p>}
          {gallery.files.length > 0 && (
            <ul className="admin-file-list">
              {gallery.files.map((f) => (
                <li key={f.key}>
                  <span>{f.filename}</span>
                  <span className="admin-file-size">{formatBytes(f.size)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default AdminGalleryUploadPage
