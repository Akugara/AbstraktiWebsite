import { S3Client } from '@aws-sdk/client-s3'

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getBucketName(): string {
  return requiredEnv('R2_BUCKET_NAME')
}

let client: S3Client | null = null

export function getR2Client(): S3Client {
  if (client) return client

  const accountId = requiredEnv('R2_ACCOUNT_ID')

  client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
      secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
    },
  })

  return client
}
