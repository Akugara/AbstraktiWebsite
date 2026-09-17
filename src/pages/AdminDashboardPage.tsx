import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  getAdminSession,
  listGalleries,
  createGallery,
  deleteGallery,
  adminLogout,
  type GalleryMeta,
} from '../lib/adminApi'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const [galleries, setGalleries] = useState<GalleryMeta[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [clientName, setClientName] = useState('')
  const [type, setType] = useState<'photo' | 'video'>('photo')
  const [expiryDays, setExpiryDays] = useState(7)
  const [password, setPassword] = useState('')
  const [creating, setCreating] = useState(false)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const session = await getAdminSession().catch(() => ({ loggedIn: false }))
      if (!session.loggedIn) {
        navigate('/admin')
        return
      }
      try {
        const { galleries } = await listGalleries()
        setGalleries(galleries)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load galleries')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [navigate])

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    if (!clientName.trim()) return
    setCreating(true)
    setError('')
    try {
      const { gallery } = await createGallery({
        clientName: clientName.trim(),
        type,
        expiryDays,
        password: password.trim() || undefined,
      })
      navigate(`/admin/galleries/${gallery.slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create gallery')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this gallery and all its files? This cannot be undone.')) return
    await deleteGallery(slug)
    setGalleries((prev) => prev?.filter((g) => g.slug !== slug) ?? null)
  }

  const handleCopy = (slug: string) => {
    const url = `${window.location.origin}/gallery/${slug}`
    navigator.clipboard.writeText(url)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 1500)
  }

  const handleLogout = async () => {
    await adminLogout()
    navigate('/admin')
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <img src="/logoabstrakti.svg" alt="Abstrakti" className="admin-logo" />
        <button className="admin-link-btn" onClick={handleLogout}>Log out</button>
      </div>

      <div className="admin-content">
        <section className="admin-panel">
          <h2 className="admin-panel-title">New Gallery</h2>
          <form onSubmit={handleCreate}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="clientName">Client name</label>
                <input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Smith Wedding"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Gallery type</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value as 'photo' | 'video')}>
                  <option value="photo">Photos</option>
                  <option value="video">Videos</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDays">Available for (days)</label>
                <input
                  id="expiryDays"
                  type="number"
                  min={1}
                  max={90}
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password <span className="optional-tag">(optional)</span></label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank for no password"
                />
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="submit-btn" disabled={creating}>
              {creating ? 'Creating…' : 'Create gallery & upload files'}
            </button>
          </form>
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel-title">Galleries</h2>
          {loading && <p>Loading…</p>}
          {!loading && galleries && galleries.length === 0 && <p>No galleries yet.</p>}
          {!loading && galleries && galleries.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Files</th>
                    <th>Expires</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {galleries.map((g) => {
                    const expired = new Date(g.expiresAt).getTime() < Date.now()
                    return (
                      <tr key={g.slug}>
                        <td>{g.clientName}</td>
                        <td>{g.type}</td>
                        <td>{g.files.length}</td>
                        <td>{formatDate(g.expiresAt)}</td>
                        <td>
                          <span className={`admin-status ${expired ? 'expired' : 'active'}`}>
                            {expired ? 'Expired' : 'Active'}
                          </span>
                        </td>
                        <td className="admin-table-actions">
                          <Link to={`/admin/galleries/${g.slug}`}>Manage</Link>
                          <button className="admin-link-btn" onClick={() => handleCopy(g.slug)}>
                            {copiedSlug === g.slug ? 'Copied!' : 'Copy link'}
                          </button>
                          <button className="admin-link-btn admin-link-btn-danger" onClick={() => handleDelete(g.slug)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AdminDashboardPage
