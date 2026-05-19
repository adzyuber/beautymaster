import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const otherUserId = Number(getRouterParam(event, 'userId'))
  if (!otherUserId || otherUserId === auth.userId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user id' })
  }
  await prisma.chatHide.upsert({
    where: { userId_otherUserId: { userId: auth.userId, otherUserId } },
    update: { hiddenAt: new Date() },
    create: { userId: auth.userId, otherUserId }
  })
  return { ok: true }
})
