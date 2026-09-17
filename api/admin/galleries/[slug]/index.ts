import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdminRequest } from '../../../_lib/auth.js'
import { getGalleryMeta, deleteGalleryObjects } from '../../../_lib/galleries.js'
import { withHandler } from '../../../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await isAdminRequest(req))) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const slug = req.query.slug as string

  if (req.method === 'GET') {
    const meta = await getGalleryMeta(slug)
    if (!meta) return res.status(404).json({ error: 'Gallery not found' })
    return res.status(200).json({ gallery: meta })
  }

  if (req.method === 'DELETE') {
    const meta = await getGalleryMeta(slug)
    if (!meta) return res.status(404).json({ error: 'Gallery not found' })
    await deleteGalleryObjects(slug)
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default withHandler(handler)
