import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const ad = await prisma.ad.findUnique({ where: { id } })
  if (!ad) throw createError({ statusCode: 404, message: 'Не найдено' })
  if (ad.userId !== auth.userId && auth.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Нет доступа' })
  }

  const { title, category, subcategory, description, price, city, address, images } = body

  const updated = await prisma.ad.update({
    where: { id },
    data: { title, category, subcategory, description, price: price ? Number(price) : null, city, address: address || null }
  })

  if (images !== undefined) {
    await prisma.adImage.deleteMany({ where: { adId: id } })
    if (images.length) {
      await prisma.adImage.createMany({
        data: images.map((url: string, i: number) => ({ adId: id, imageUrl: url, sortOrder: i }))
      })
    }
  }

  return updated
})
