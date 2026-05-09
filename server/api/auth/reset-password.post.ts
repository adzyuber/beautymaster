import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'
import { setCookie } from 'h3'
import prisma from '../../utils/prisma'
import { signToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = typeof body?.token === 'string' ? body.token.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!token || !/^[a-f0-9]{64}$/i.test(token)) {
    throw createError({ statusCode: 400, message: 'Некорректная ссылка' })
  }

  if (!password || password.length < 6) {
    throw createError({ statusCode: 400, message: 'Пароль должен быть не короче 6 символов' })
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true }
  })

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    throw createError({ statusCode: 400, message: 'Ссылка недействительна или истекла' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const now = new Date()

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash, passwordChangedAt: now }
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: now }
    }),
    prisma.passwordResetToken.deleteMany({
      where: { userId: record.userId, usedAt: null, id: { not: record.id } }
    })
  ])

  const config = useRuntimeConfig()
  const authToken = signToken({ userId: record.user.id, role: record.user.role }, config.jwtSecret)

  setCookie(event, 'auth_token', authToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax'
  })

  return {
    user: {
      id: record.user.id,
      name: record.user.name,
      email: record.user.email,
      role: record.user.role
    }
  }
})
