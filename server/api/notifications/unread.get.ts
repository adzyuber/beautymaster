import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const count = await prisma.message.count({
    where: { toUserId: auth.userId, isRead: false }
  })
  return { count }
})
