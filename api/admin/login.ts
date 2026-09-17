import type { VercelRequest, VercelResponse } from '@vercel/node'
import { comparePassword, signAdminSession, buildAdminSessionCookie } from '../_lib/auth.js'
import { withHandler } from '../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body ?? {}
  const passwordHash = process.env.ADMIN_PASSWORD_HASH

  if (!passwordHash) {
    return res.status(500).json({ error: 'Server is not configured' })
  }

  if (typeof password !== 'string' || !(await comparePassword(password, passwordHash))) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  const token = await signAdminSession()
  res.setHeader('Set-Cookie', buildAdminSessionCookie(token))
  return res.status(200).json({ ok: true })
}

export default withHandler(handler)
