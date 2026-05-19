import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const query = getQuery(event)
  const withUserId = query.with ? Number(query.with) : null

  if (withUserId) {
    const hide = await prisma.chatHide.findUnique({
      where: { userId_otherUserId: { userId: auth.userId, otherUserId: withUserId } }
    })
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { fromUserId: auth.userId, toUserId: withUserId },
          { fromUserId: withUserId, toUserId: auth.userId }
        ],
        ...(hide ? { createdAt: { gt: hide.hiddenAt } } : {})
      },
      orderBy: { createdAt: 'asc' },
      include: {
        fromUser: { select: { id: true, name: true, avatarUrl: true } }
      }
    })
    await prisma.message.updateMany({
      where: { fromUserId: withUserId, toUserId: auth.userId, isRead: false },
      data: { isRead: true }
    })
    return { messages }
  }

  const hides = await prisma.chatHide.findMany({ where: { userId: auth.userId } })
  const hideByOther = new Map<number, Date>(hides.map(h => [h.otherUserId, h.hiddenAt]))

  const allMessages = await prisma.message.findMany({
    where: {
      OR: [{ fromUserId: auth.userId }, { toUserId: auth.userId }]
    },
    orderBy: { createdAt: 'desc' },
    include: {
      fromUser: { select: { id: true, name: true, avatarUrl: true } },
      toUser: { select: { id: true, name: true, avatarUrl: true } }
    }
  })

  const seen = new Set<string>()
  const chats: any[] = []
  for (const msg of allMessages) {
    const otherId = msg.fromUserId === auth.userId ? msg.toUserId : msg.fromUserId
    const key = String(otherId)
    if (seen.has(key)) continue
    const hiddenAt = hideByOther.get(otherId)
    if (hiddenAt && msg.createdAt <= hiddenAt) continue
    seen.add(key)
    const other = msg.fromUserId === auth.userId ? msg.toUser : msg.fromUser
    const unread = await prisma.message.count({
      where: {
        fromUserId: otherId,
        toUserId: auth.userId,
        isRead: false,
        ...(hiddenAt ? { createdAt: { gt: hiddenAt } } : {})
      }
    })
    chats.push({ userId: otherId, userName: other.name, userAvatarUrl: other.avatarUrl, lastMessage: msg.text, lastImageUrl: msg.imageUrl, createdAt: msg.createdAt, unread })
  }
  return { chats }
})
