import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const rows = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      subcategories: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        select: { slug: true, nameRu: true, nameEn: true },
      },
    },
  })

  return {
    categories: rows.map(c => ({
      slug: c.slug,
      nameRu: c.nameRu,
      nameEn: c.nameEn,
      iconBg: c.iconBg,
      iconColor: c.iconColor,
      iconSvg: c.iconSvg,
      imageUrl: c.imageUrl,
      subcategories: c.subcategories,
    })),
  }
})
