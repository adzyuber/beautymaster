import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)

  const [adGroups, favorites, notifUnread, hides] = await Promise.all([
    prisma.ad.groupBy({
      by: ['status'],
      where: { userId: auth.userId },
      _count: { _all: true }
    }),
    prisma.favorite.count({ where: { userId: auth.userId } }),
    prisma.notification.count({ where: { userId: auth.userId, isRead: false } }),
    prisma.chatHide.findMany({ where: { userId: auth.userId } })
  ])

  const messagesUnread = await prisma.message.count({
    where: {
      toUserId: auth.userId,
      isRead: false,
      ...(hides.length
        ? { NOT: hides.map(h => ({ fromUserId: h.otherUserId, createdAt: { lte: h.hiddenAt } })) }
        : {})
    }
  })

  const ads = { total: 0, active: 0, pending: 0, rejected: 0, inactive: 0 }
  for (const g of adGroups) {
    const n = g._count._all
    ads.total += n
    if (g.status === 'active') ads.active = n
    else if (g.status === 'pending') ads.pending = n
    else if (g.status === 'rejected') ads.rejected = n
    else if (g.status === 'inactive') ads.inactive = n
  }

  return {
    ads,
    favorites,
    messages: { unread: messagesUnread },
    notifications: { unread: notifUnread }
  }
})
