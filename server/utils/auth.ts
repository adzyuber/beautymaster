import jwt from 'jsonwebtoken'
import { H3Event, getCookie, createError } from 'h3'

export function signToken(payload: object, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyToken(token: string, secret: string) {
  return jwt.verify(token, secret) as { userId: number; role: string }
}

export function getAuthUser(event: H3Event) {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'auth_token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!token) return null
  try {
    return verifyToken(token, config.jwtSecret)
  } catch {
    return null
  }
}

export function requireAuth(event: H3Event) {
  const user = getAuthUser(event)
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })
  return user
}
