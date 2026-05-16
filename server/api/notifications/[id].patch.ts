import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  await prisma.notification.updateMany({
    where: { id, userId: auth.userId },
    data: { isRead: true }
  })
  return { ok: true }
})
