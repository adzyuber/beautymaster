import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const favorites = await prisma.favorite.findMany({
    where: { userId: auth.userId },
    select: { adId: true }
  })
  return favorites.map(f => f.adId)
})
