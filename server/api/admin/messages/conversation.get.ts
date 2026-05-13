import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const query = getQuery(event)
  const user1 = Number(query.user1)
  const user2 = Number(query.user2)

  if (!user1 || !user2) throw createError({ statusCode: 400, message: 'user1 and user2 required' })

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: user1, toUserId: user2 },
        { fromUserId: user2, toUserId: user1 }
      ]
    },
    orderBy: { createdAt: 'asc' },
    include: {
      fromUser: { select: { id: true, name: true } }
    }
  })

  return { messages }
})
