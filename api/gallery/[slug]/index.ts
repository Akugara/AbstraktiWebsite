import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getBearerToken, verifyGalleryAccessToken } from '../../_lib/auth'
import { getGalleryMeta, isExpired } from '../../_lib/galleries'
import { getR2Client, getBucketName } from '../../_lib/r2'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const slug = req.query.slug as string
  const meta = await getGalleryMeta(slug)

  if (!meta || isExpired(meta)) {
    return res.status(404).json({ error: 'This gallery has expired or does not exist.' })
  }

  if (meta.passwordHash) {
    const token = getBearerToken(req)
    const authorized = await verifyGalleryAccessToken(token, slug)
    if (!authorized) {
      return res.status(200).json({
        requiresPassword: true,
        clientName: meta.clientName,
        type: meta.type,
      })
    }
  }

  const client = getR2Client()
  const bucket = getBucketName()
  const files = await Promise.all(
    meta.files.map(async (file) => {
      const url = await getSignedUrl(
        client,
        new GetObjectCommand({
          Bucket: bucket,
          Key: file.key,
          ResponseContentDisposition: `attachment; filename="${file.filename}"`,
        }),
        { expiresIn: 15 * 60 }
      )
      return { filename: file.filename, size: file.size, contentType: file.contentType, url }
    })
  )

  return res.status(200).json({
    requiresPassword: false,
    clientName: meta.clientName,
    type: meta.type,
    expiresAt: meta.expiresAt,
    files,
  })
}
