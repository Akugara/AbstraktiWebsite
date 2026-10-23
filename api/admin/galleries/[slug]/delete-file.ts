import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdminRequest } from '../../../_lib/auth.js'
import { deleteGalleryFile } from '../../../_lib/galleries.js'
import { withHandler } from '../../../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await isAdminRequest(req))) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const slug = req.query.slug as string
  const { filename } = req.body ?? {}

  if (typeof filename !== 'string' || !filename.trim()) {
    return res.status(400).json({ error: 'filename is required' })
  }

  const meta = await deleteGalleryFile(slug, filename)
  if (!meta) {
    return res.status(404).json({ error: 'Gallery not found' })
  }

  return res.status(200).json({ gallery: meta })
}

export default withHandler(handler)
