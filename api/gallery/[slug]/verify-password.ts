import type { VercelRequest, VercelResponse } from '@vercel/node'
import { comparePassword, signGalleryAccess } from '../../_lib/auth.js'
import { getGalleryMeta, isExpired } from '../../_lib/galleries.js'
import { withHandler } from '../../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const slug = req.query.slug as string
  const { password } = req.body ?? {}

  const meta = await getGalleryMeta(slug)
  if (!meta || isExpired(meta)) {
    return res.status(404).json({ error: 'This gallery has expired or does not exist.' })
  }

  if (!meta.passwordHash) {
    return res.status(400).json({ error: 'This gallery is not password protected' })
  }

  if (typeof password !== 'string' || !(await comparePassword(password, meta.passwordHash))) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  const token = await signGalleryAccess(slug)
  return res.status(200).json({ token })
}

export default withHandler(handler)
