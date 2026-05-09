import crypto from 'node:crypto'
import prisma from '../../utils/prisma'
import { sendPasswordResetEmail } from '../../utils/mailer'

const TOKEN_TTL_MIN = 30
const RATE_LIMIT_PER_HOUR = 3

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const locale: 'ru' | 'en' = body?.locale === 'en' ? 'en' : 'ru'

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Введите корректный email' })
  }

  const config = useRuntimeConfig()
  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const recentCount = await prisma.passwordResetToken.count({
      where: { userId: user.id, createdAt: { gte: oneHourAgo } }
    })

    if (recentCount < RATE_LIMIT_PER_HOUR) {
      const rawToken = crypto.randomBytes(32).toString('hex')
      const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
      const expiresAt = new Date(Date.now() + TOKEN_TTL_MIN * 60 * 1000)

      await prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt }
      })

      const resetUrl = `${config.appUrl.replace(/\/+$/, '')}/reset-password?token=${rawToken}`

      try {
        await sendPasswordResetEmail({
          to: user.email,
          name: user.name,
          resetUrl,
          locale
        })
      } catch (e: any) {
        console.error('[forgot-password] Failed to send email:', e?.message ?? e)
      }
    } else {
      console.warn(`[forgot-password] Rate limit exceeded for userId=${user.id}`)
    }
  }

  return { ok: true }
})
