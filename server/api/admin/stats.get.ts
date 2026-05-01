import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const [users, ads, activeAds, messages] = await Promise.all([
    prisma.user.count(),
    prisma.ad.count(),
    prisma.ad.count({ where: { status: 'active' } }),
    prisma.message.count()
  ])

  return { users, ads, activeAds, messages }
})
