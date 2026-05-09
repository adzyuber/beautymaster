import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const query = getQuery(event)
  const withUserId = query.with ? Number(query.with) : null

  if (withUserId) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { fromUserId: auth.userId, toUserId: withUserId },
          { fromUserId: withUserId, toUserId: auth.userId }
        ]
      },
      orderBy: { createdAt: 'asc' },
      include: {
        fromUser: { select: { id: true, name: true } }
      }
    })
    await prisma.message.updateMany({
      where: { fromUserId: withUserId, toUserId: auth.userId, isRead: false },
      data: { isRead: true }
    })
    return { messages }
  }

  const allMessages = await prisma.message.findMany({
    where: {
      OR: [{ fromUserId: auth.userId }, { toUserId: auth.userId }]
    },
    orderBy: { createdAt: 'desc' },
    include: {
      fromUser: { select: { id: true, name: true } },
      toUser: { select: { id: true, name: true } }
    }
  })

  const seen = new Set<string>()
  const chats: any[] = []
  for (const msg of allMessages) {
    const otherId = msg.fromUserId === auth.userId ? msg.toUserId : msg.fromUserId
    const key = String(otherId)
    if (!seen.has(key)) {
      seen.add(key)
      const other = msg.fromUserId === auth.userId ? msg.toUser : msg.fromUser
      const unread = await prisma.message.count({
        where: { fromUserId: otherId, toUserId: auth.userId, isRead: false }
      })
      chats.push({ userId: otherId, userName: other.name, lastMessage: msg.text, createdAt: msg.createdAt, unread })
    }
  }
  return { chats }
})
