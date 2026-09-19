import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdminRequest } from '../../../_lib/auth.js'
import { getGalleryMeta, putGalleryMeta } from '../../../_lib/galleries.js'
import { withHandler } from '../../../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await isAdminRequest(req))) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const slug = req.query.slug as string
  const { filename, subtitle } = req.body ?? {}

  const meta = await getGalleryMeta(slug)
  if (!meta) {
    return res.status(404).json({ error: 'Gallery not found' })
  }

  if (filename === null) {
    delete meta.coverFilename
    delete meta.coverSubtitle
  } else {
    if (typeof filename !== 'string' || !meta.files.some((f) => f.filename === filename)) {
      return res.status(400).json({ error: 'filename must match an uploaded file' })
    }
    meta.coverFilename = filename
    meta.coverSubtitle = typeof subtitle === 'string' ? subtitle.trim() : undefined
  }

  await putGalleryMeta(meta)
  return res.status(200).json({ gallery: meta })
}

export default withHandler(handler)
