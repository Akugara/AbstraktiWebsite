export interface GalleryFile {
  key: string
  filename: string
  size: number
  contentType: string
}

export interface GalleryMeta {
  slug: string
  clientName: string
  type: 'photo' | 'video'
  createdAt: string
  expiresAt: string
  passwordHash?: string
  files: GalleryFile[]
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`)
  }
  return data as T
}

export function adminLogin(password: string) {
  return request<{ ok: true }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

export function adminLogout() {
  return request<{ ok: true }>('/api/admin/logout', { method: 'POST' })
}

export function getAdminSession() {
  return request<{ loggedIn: boolean }>('/api/admin/session')
}

export function listGalleries() {
  return request<{ galleries: GalleryMeta[] }>('/api/admin/galleries')
}

export function createGallery(input: {
  clientName: string
  type: 'photo' | 'video'
  expiryDays: number
  password?: string
}) {
  return request<{ gallery: GalleryMeta }>('/api/admin/galleries', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function getGallery(slug: string) {
  return request<{ gallery: GalleryMeta }>(`/api/admin/galleries/${slug}`)
}

export function deleteGallery(slug: string) {
  return request<{ ok: true }>(`/api/admin/galleries/${slug}`, { method: 'DELETE' })
}

export function getUploadUrl(slug: string, filename: string, contentType: string) {
  return request<{ uploadUrl: string; key: string; filename: string }>(
    `/api/admin/galleries/${slug}/upload-url`,
    { method: 'POST', body: JSON.stringify({ filename, contentType }) }
  )
}

export function confirmFile(slug: string, file: { filename: string; size: number; contentType: string }) {
  return request<{ gallery: GalleryMeta }>(`/api/admin/galleries/${slug}/confirm-file`, {
    method: 'POST',
    body: JSON.stringify(file),
  })
}

export function uploadFileToR2(uploadUrl: string, file: File, onProgress: (pct: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream')
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve()
      else reject(new Error(`Upload failed (${xhr.status})`))
    }
    xhr.onerror = () => reject(new Error('Upload failed'))
    xhr.send(file)
  })
}
