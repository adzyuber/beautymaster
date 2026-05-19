import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const [hides, notifications] = await Promise.all([
    prisma.chatHide.findMany({ where: { userId: auth.userId } }),
    prisma.notification.count({
      where: { userId: auth.userId, isRead: false }
    })
  ])
  const messages = await prisma.message.count({
    where: {
      toUserId: auth.userId,
      isRead: false,
      ...(hides.length
        ? {
            NOT: hides.map(h => ({
              fromUserId: h.otherUserId,
              createdAt: { lte: h.hiddenAt }
            }))
          }
        : {})
    }
  })
  return { count: messages, notifications }
})
