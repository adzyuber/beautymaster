import bcrypt from 'bcryptjs'
import { setCookie } from 'h3'
import prisma from '../../utils/prisma'
import { signToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password } = body

  if (!login || !password) {
    throw createError({ statusCode: 400, message: 'Введите логин и пароль' })
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: login },
        { phone: login }
      ]
    }
  })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Неверный логин или пароль' })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    throw createError({ statusCode: 401, message: 'Неверный логин или пароль' })
  }

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
