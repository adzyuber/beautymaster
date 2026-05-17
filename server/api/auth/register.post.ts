import bcrypt from 'bcryptjs'
import { setCookie } from 'h3'
import prisma from '../../utils/prisma'
import { signToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password, organization } = body

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, message: 'Заполните все обязательные поля', data: { code: 'missing_fields' } })
  }
  if (password.length < 8) {
    throw createError({ statusCode: 400, message: 'Пароль должен содержать минимум 8 символов', data: { code: 'password_too_short' } })
  }

  const existing = await prisma.user.findFirst({ where: { email } })
  if (existing) {
    throw createError({ statusCode: 400, message: 'Email уже зарегистрирован', data: { code: 'duplicate_account' } })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, passwordHash, organization: organization || null }
  })

  await prisma.notification.create({
    data: { userId: user.id, type: 'profile_incomplete' }
  })

  const config = useRuntimeConfig()
  const token = signToken({ userId: user.id, role: user.role }, config.jwtSecret)

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax'
  })

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  }
})
