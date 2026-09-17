import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import type { VercelRequest } from '@vercel/node'

const ADMIN_COOKIE = 'abstrakti_admin_session'
const ADMIN_SESSION_TTL = '7d'
const GALLERY_ACCESS_TTL = '12h'

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('Missing required environment variable: JWT_SECRET')
  }
  return new TextEncoder().encode(secret)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function signAdminSession(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ADMIN_SESSION_TTL)
    .sign(getJwtSecret())
}

export async function signGalleryAccess(slug: string): Promise<string> {
  return new SignJWT({ role: 'gallery', slug })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(GALLERY_ACCESS_TTL)
    .sign(getJwtSecret())
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {}
  if (!cookieHeader) return cookies
  for (const part of cookieHeader.split(';')) {
    const [rawKey, ...rawVal] = part.trim().split('=')
    if (!rawKey) continue
    cookies[rawKey] = decodeURIComponent(rawVal.join('='))
  }
  return cookies
}

export async function isAdminRequest(req: VercelRequest): Promise<boolean> {
  const cookies = parseCookies(req.headers.cookie)
  const token = cookies[ADMIN_COOKIE]
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export function buildAdminSessionCookie(token: string): string {
  const maxAge = 60 * 60 * 24 * 7
  return `${ADMIN_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`
}

export function buildAdminLogoutCookie(): string {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
}

export async function verifyGalleryAccessToken(token: string | undefined, slug: string): Promise<boolean> {
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    return payload.role === 'gallery' && payload.slug === slug
  } catch {
    return false
  }
}

export function getBearerToken(req: VercelRequest): string | undefined {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) return undefined
  return header.slice('Bearer '.length)
}
