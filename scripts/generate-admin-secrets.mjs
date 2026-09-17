import bcrypt from 'bcryptjs'
import { randomBytes } from 'node:crypto'

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/generate-admin-secrets.mjs <your-admin-password>')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 10)
const jwtSecret = randomBytes(32).toString('hex')

console.log('\nAdd these to your .env.local and Vercel project env vars:\n')
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
console.log(`JWT_SECRET=${jwtSecret}`)
console.log()
