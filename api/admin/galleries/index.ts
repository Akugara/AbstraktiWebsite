import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdminRequest, hashPassword } from '../../_lib/auth.js'
import { generateSlug, listGalleries, putGalleryMeta, type GalleryMeta, type GalleryType } from '../../_lib/galleries.js'
import { withHandler } from '../../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await isAdminRequest(req))) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const galleries = await listGalleries()
    return res.status(200).json({ galleries })
  }

  if (req.method === 'POST') {
    const { clientName, type, expiryDays, password } = req.body ?? {}

    if (typeof clientName !== 'string' || !clientName.trim()) {
      return res.status(400).json({ error: 'clientName is required' })
    }
    if (type !== 'photo' && type !== 'video') {
      return res.status(400).json({ error: 'type must be "photo" or "video"' })
    }
    const days = Number.isFinite(expiryDays) && expiryDays > 0 ? Number(expiryDays) : 7

    const slug = generateSlug()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    const meta: GalleryMeta = {
      slug,
      clientName: clientName.trim(),
      type: type as GalleryType,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      files: [],
    }

    if (typeof password === 'string' && password.trim()) {
      meta.passwordHash = await hashPassword(password.trim())
    }

    await putGalleryMeta(meta)
    return res.status(201).json({ gallery: meta })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default withHandler(handler)
