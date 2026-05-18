import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const adId = Number(getRouterParam(event, 'adId'))
  if (!adId || Number.isNaN(adId)) {
    throw createError({ statusCode: 400, message: 'Invalid ad id' })
  }

  await prisma.favorite.deleteMany({
    where: { userId: auth.userId, adId }
  })

  return { ok: true, adId }
})
