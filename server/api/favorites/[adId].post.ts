import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const adId = Number(getRouterParam(event, 'adId'))
  if (!adId || Number.isNaN(adId)) {
    throw createError({ statusCode: 400, message: 'Invalid ad id' })
  }

  const ad = await prisma.ad.findUnique({ where: { id: adId }, select: { id: true } })
  if (!ad) throw createError({ statusCode: 404, message: 'Ad not found' })

  await prisma.favorite.upsert({
    where: { userId_adId: { userId: auth.userId, adId } },
    create: { userId: auth.userId, adId },
    update: {}
  })

  return { ok: true, adId }
})
