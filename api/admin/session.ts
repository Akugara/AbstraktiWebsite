import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdminRequest } from '../_lib/auth.js'
import { withHandler } from '../_lib/withHandler.js'

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const loggedIn = await isAdminRequest(req)
  return res.status(200).json({ loggedIn })
}

export default withHandler(handler)
