import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  await prisma.notification.updateMany({
    where: { userId: auth.userId, isRead: false },
    data: { isRead: true }
  })
  return { ok: true }
})
