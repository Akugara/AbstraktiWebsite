export interface PublicGalleryFile {
  filename: string
  size: number
  contentType: string
  url: string
}

export interface PublicGalleryResponse {
  requiresPassword: boolean
  clientName: string
  type: 'photo' | 'video'
  expiresAt?: string
  files?: PublicGalleryFile[]
  coverUrl?: string
  coverSubtitle?: string
}

export async function getPublicGallery(slug: string, token?: string): Promise<PublicGalleryResponse> {
  const res = await fetch(`/api/gallery/${slug}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? 'This gallery has expired or does not exist.')
  }
  return data as PublicGalleryResponse
}

export async function verifyGalleryPassword(slug: string, password: string): Promise<string> {
  const res = await fetch(`/api/gallery/${slug}/verify-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? 'Incorrect password')
  }
  return data.token as string
}

export function gallerySessionKey(slug: string): string {
  return `abstrakti_gallery_token_${slug}`
}
