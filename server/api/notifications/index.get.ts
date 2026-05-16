import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const notifications = await prisma.notification.findMany({
    where: { userId: auth.userId },
    orderBy: { createdAt: 'desc' },
    take: 30
  })

  const missingImageIds = notifications
    .filter(n => !n.adImageUrl)
    .map(n => n.adId)

  if (missingImageIds.length) {
    const images = await prisma.adImage.findMany({
      where: { adId: { in: missingImageIds } },
      orderBy: { sortOrder: 'asc' }
    })
    const imageMap = new Map<number, string>()
    for (const img of images) {
      if (!imageMap.has(img.adId)) imageMap.set(img.adId, img.imageUrl)
    }
    return notifications.map(n => ({
      ...n,
      adImageUrl: n.adImageUrl || imageMap.get(n.adId) || null
    }))
  }

  return notifications
})
