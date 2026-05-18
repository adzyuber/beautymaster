import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const favorites = await prisma.favorite.findMany({
    where: { userId: auth.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      ad: {
        include: {
          images: { orderBy: { sortOrder: 'asc' }, take: 1 },
          user: { select: { name: true, organization: true, languages: true } }
        }
      }
    }
  })
  return favorites
    .filter(f => f.ad && f.ad.status === 'active')
    .map(f => f.ad)
})
