import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getBearerToken, verifyGalleryAccessToken } from '../../_lib/auth.js'
import { getGalleryMeta, isExpired } from '../../_lib/galleries.js'
import { getR2Client, getBucketName } from '../../_lib/r2.js'
import { withHandler } from '../../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
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
      const previewUrl = file.previewKey
        ? await getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: file.previewKey }), { expiresIn: 15 * 60 })
        : url
      return { filename: file.filename, size: file.size, contentType: file.contentType, url, previewUrl }
    })
  )

  const cover = meta.coverFilename
    ? files.find((f) => f.filename === meta.coverFilename)
    : undefined

  return res.status(200).json({
    requiresPassword: false,
    clientName: meta.clientName,
    type: meta.type,
    expiresAt: meta.expiresAt,
    files,
    coverUrl: cover?.previewUrl,
    coverSubtitle: meta.coverSubtitle,
  })
}

export default withHandler(handler)
