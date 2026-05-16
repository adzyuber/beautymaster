import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      fromUser: { select: { id: true, name: true, avatarUrl: true } },
      toUser: { select: { id: true, name: true, avatarUrl: true } }
    }
  })

  const seen = new Set<string>()
  const conversations: any[] = []

  for (const msg of messages) {
    const key = [msg.fromUserId, msg.toUserId].sort((a, b) => a - b).join(':')
    if (!seen.has(key)) {
      seen.add(key)
      const [u1id, u2id] = key.split(':').map(Number)
      const user1 = msg.fromUserId === u1id ? msg.fromUser : msg.toUser
      const user2 = msg.fromUserId === u2id ? msg.fromUser : msg.toUser
      const count = await prisma.message.count({
        where: {
          OR: [
            { fromUserId: u1id, toUserId: u2id },
            { fromUserId: u2id, toUserId: u1id }
          ]
        }
      })
      conversations.push({
        key,
        user1: { id: user1.id, name: user1.name, avatarUrl: user1.avatarUrl },
        user2: { id: user2.id, name: user2.name, avatarUrl: user2.avatarUrl },
        lastMessage: msg.text,
        lastImageUrl: msg.imageUrl,
        lastAt: msg.createdAt,
        count
      })
    }
  }

  return { conversations }
})
