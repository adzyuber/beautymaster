import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const [messages, notifications] = await Promise.all([
    prisma.message.count({
      where: { toUserId: auth.userId, isRead: false }
    }),
    prisma.notification.count({
      where: { userId: auth.userId, isRead: false }
    })
  ])
  return { count: messages, notifications }
})
