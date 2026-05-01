import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 12
  const skip = (page - 1) * limit

  const where: any = { status: 'active' }
  if (query.category) where.category = query.category
  if (query.subcategory) where.subcategory = query.subcategory
  if (query.city) where.city = { contains: query.city as string }
  if (query.search) {
    const s = query.search as string
    const variants = [...new Set([s, s.toLowerCase(), s.toUpperCase(), s[0]?.toUpperCase() + s.slice(1).toLowerCase()])]
    where.OR = variants.flatMap(v => [
      { title: { contains: v } },
      { description: { contains: v } }
    ])
  }

  const [ads, total] = await Promise.all([
    prisma.ad.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        user: { select: { name: true, organization: true } }
      }
    }),
    prisma.ad.count({ where })
  ])

  return { ads, total, page, pages: Math.ceil(total / limit) }
})
