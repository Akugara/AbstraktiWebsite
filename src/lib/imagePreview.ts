const PREVIEW_SCALE = 0.7
const PREVIEW_QUALITY = 0.82

export async function generatePreviewBlob(file: File): Promise<Blob | null> {
  if (!file.type.startsWith('image/')) return null

  try {
    const bitmap = await createImageBitmap(file)
    const width = Math.max(1, Math.round(bitmap.width * PREVIEW_SCALE))
    const height = Math.max(1, Math.round(bitmap.height * PREVIEW_SCALE))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    return await new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/jpeg', PREVIEW_QUALITY))
  } catch {
    // Formats the browser can't decode (e.g. HEIC) simply skip preview generation.
    return null
  }
}
