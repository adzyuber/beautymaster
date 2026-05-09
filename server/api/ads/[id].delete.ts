import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))

  const ad = await prisma.ad.findUnique({ where: { id } })
  if (!ad) throw createError({ statusCode: 404, message: 'Не найдено' })
  if (ad.userId !== auth.userId && auth.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Нет доступа' })
  }

  await prisma.ad.delete({ where: { id } })
  return { ok: true }
})
