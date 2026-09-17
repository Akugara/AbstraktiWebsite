import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildAdminLogoutCookie } from '../_lib/auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  res.setHeader('Set-Cookie', buildAdminLogoutCookie())
  return res.status(200).json({ ok: true })
}
