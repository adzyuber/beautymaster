import jwt from 'jsonwebtoken'
import { H3Event, getCookie, createError } from 'h3'
import prisma from './prisma'

export function signToken(payload: object, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyToken(token: string, secret: string) {
  return jwt.verify(token, secret) as { userId: number; role: string; iat: number }
}

export async function getAuthUser(event: H3Event) {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'auth_token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!token) return null
  let payload: { userId: number; role: string; iat: number }
  try {
    payload = verifyToken(token, config.jwtSecret)
  } catch {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, role: true, passwordChangedAt: true }
  })
  if (!user) return null

  const tokenIssuedMs = payload.iat * 1000
  if (tokenIssuedMs + 1000 < user.passwordChangedAt.getTime()) {
    return null
  }

  return { userId: user.id, role: user.role }
}

export async function requireAuth(event: H3Event) {
  const user = await getAuthUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })
  return user
}

export async function requireAdmin(event: H3Event) {
  const user = await requireAuth(event)
  if (user.role !== 'admin') throw createError({ statusCode: 403, message: 'Forbidden' })
  return user
}
