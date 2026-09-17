import type { VercelRequest, VercelResponse } from '@vercel/node'
import { listGalleries, deleteGalleryObjects, isExpired } from '../_lib/galleries'

const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const galleries = await listGalleries()
  const deleted: string[] = []

  for (const gallery of galleries) {
    const pastGrace = Date.now() - new Date(gallery.expiresAt).getTime() > GRACE_PERIOD_MS
    if (isExpired(gallery) && pastGrace) {
      await deleteGalleryObjects(gallery.slug)
      deleted.push(gallery.slug)
    }
  }

  return res.status(200).json({ checked: galleries.length, deleted })
}
