import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdminRequest } from '../../../_lib/auth.js'
import { getGalleryMeta, putGalleryMeta, fileKey, previewKey, sanitizeFilename } from '../../../_lib/galleries.js'
import { withHandler } from '../../../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await isAdminRequest(req))) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const slug = req.query.slug as string
  const { filename, size, contentType, hasPreview } = req.body ?? {}

  if (typeof filename !== 'string' || !filename.trim() || typeof size !== 'number') {
    return res.status(400).json({ error: 'filename and size are required' })
  }

  const meta = await getGalleryMeta(slug)
  if (!meta) {
    return res.status(404).json({ error: 'Gallery not found' })
  }

  const cleanName = sanitizeFilename(filename)
  meta.files = meta.files.filter((f) => f.filename !== cleanName)
  meta.files.push({
    key: fileKey(slug, filename),
    filename: cleanName,
    size,
    contentType: typeof contentType === 'string' ? contentType : 'application/octet-stream',
    previewKey: hasPreview === true ? previewKey(slug, filename) : undefined,
  })

  await putGalleryMeta(meta)
  return res.status(200).json({ gallery: meta })
}

export default withHandler(handler)
