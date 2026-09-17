import type { VercelRequest, VercelResponse } from '@vercel/node'

type Handler = (req: VercelRequest, res: VercelResponse) => Promise<unknown> | unknown

export function withHandler(handler: Handler, exposeDetail = false): Handler {
  return async (req, res) => {
    try {
      return await handler(req, res)
    } catch (err) {
      console.error('Unhandled API error:', err)
      const detail = err instanceof Error ? err.message : String(err)
      return res.status(500).json({
        error: 'Internal server error',
        ...(exposeDetail ? { detail } : {}),
      })
    }
  }
}
