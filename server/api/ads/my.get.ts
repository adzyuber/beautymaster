import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const ads = await prisma.ad.findMany({
    where: { userId: auth.userId },
    orderBy: { createdAt: 'desc' },
    include: { images: { orderBy: { sortOrder: 'asc' }, take: 1 } }
  })
  return { ads }
})
