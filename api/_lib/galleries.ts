import {
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3'
import { customAlphabet } from 'nanoid'
import { getR2Client, getBucketName } from './r2.js'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export type GalleryType = 'photo' | 'video'

export interface GalleryFile {
  key: string
  filename: string
  size: number
  contentType: string
}

export interface GalleryMeta {
  slug: string
  clientName: string
  type: GalleryType
  createdAt: string
  expiresAt: string
  passwordHash?: string
  files: GalleryFile[]
}

export function generateSlug(): string {
  return nanoid()
}

export function metaKey(slug: string): string {
  return `galleries/${slug}/meta.json`
}

export function sanitizeFilename(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? name
  return base.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200) || 'file'
}

export function fileKey(slug: string, filename: string): string {
  return `galleries/${slug}/files/${sanitizeFilename(filename)}`
}

async function streamToString(body: unknown): Promise<string> {
  const chunks: Buffer[] = []
  // @ts-expect-error - Node stream from AWS SDK
  for await (const chunk of body) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf-8')
}

export async function getGalleryMeta(slug: string): Promise<GalleryMeta | null> {
  try {
    const result = await getR2Client().send(
      new GetObjectCommand({ Bucket: getBucketName(), Key: metaKey(slug) })
    )
    const text = await streamToString(result.Body)
    return JSON.parse(text) as GalleryMeta
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'NoSuchKey') return null
    if (typeof err === 'object' && err !== null && '$metadata' in err) {
      const meta = (err as { $metadata?: { httpStatusCode?: number } }).$metadata
      if (meta?.httpStatusCode === 404) return null
    }
    throw err
  }
}

export async function putGalleryMeta(meta: GalleryMeta): Promise<void> {
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getBucketName(),
      Key: metaKey(meta.slug),
      Body: JSON.stringify(meta),
      ContentType: 'application/json',
    })
  )
}

export async function listGalleries(): Promise<GalleryMeta[]> {
  const client = getR2Client()
  const bucket = getBucketName()
  const galleries: GalleryMeta[] = []
  let continuationToken: string | undefined

  do {
    const result = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: 'galleries/',
        ContinuationToken: continuationToken,
      })
    )

    const metaKeys = (result.Contents ?? [])
      .map((obj) => obj.Key)
      .filter((key): key is string => !!key && key.endsWith('/meta.json'))

    for (const key of metaKeys) {
      const slug = key.split('/')[1]
      const meta = await getGalleryMeta(slug)
      if (meta) galleries.push(meta)
    }

    continuationToken = result.IsTruncated ? result.NextContinuationToken : undefined
  } while (continuationToken)

  return galleries.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function deleteGalleryObjects(slug: string): Promise<void> {
  const client = getR2Client()
  const bucket = getBucketName()
  const prefix = `galleries/${slug}/`
  let continuationToken: string | undefined

  do {
    const result = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: continuationToken })
    )
    const objects = (result.Contents ?? [])
      .map((obj) => obj.Key)
      .filter((key): key is string => !!key)
      .map((Key) => ({ Key }))

    if (objects.length > 0) {
      await client.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: objects } }))
    }

    continuationToken = result.IsTruncated ? result.NextContinuationToken : undefined
  } while (continuationToken)
}

export function isExpired(meta: GalleryMeta): boolean {
  return new Date(meta.expiresAt).getTime() < Date.now()
}
