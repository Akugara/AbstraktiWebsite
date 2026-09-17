import type { VercelRequest, VercelResponse } from '@vercel/node'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { isAdminRequest } from '../../../_lib/auth'
import { getGalleryMeta, fileKey, sanitizeFilename } from '../../../_lib/galleries'
import { getR2Client, getBucketName } from '../../../_lib/r2'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await isAdminRequest(req))) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const slug = req.query.slug as string
  const { filename, contentType } = req.body ?? {}

  if (typeof filename !== 'string' || !filename.trim()) {
    return res.status(400).json({ error: 'filename is required' })
  }

  const meta = await getGalleryMeta(slug)
  if (!meta) {
    return res.status(404).json({ error: 'Gallery not found' })
  }

  const key = fileKey(slug, filename)
  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ContentType: typeof contentType === 'string' ? contentType : 'application/octet-stream',
  })

  const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 60 * 60 })

  return res.status(200).json({ uploadUrl, key, filename: sanitizeFilename(filename) })
}
