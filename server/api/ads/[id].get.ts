import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const ad = await prisma.ad.findFirst({
    where: { OR: [{ id: isNaN(Number(id)) ? -1 : Number(id) }, { slug: id! }] },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      user: { select: { id: true, name: true, email: true, phone: true, organization: true, website: true, avatarUrl: true } }
    }
  })

  if (!ad) throw createError({ statusCode: 404, message: 'Объявление не найдено' })
  return ad
})
