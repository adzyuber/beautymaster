import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 20
  const skip = (page - 1) * limit

  const where: any = {}
  if (query.status) where.status = query.status
  if (query.search) {
    const s = query.search as string
    const variants = [...new Set([s, s.toLowerCase(), s.toUpperCase(), s[0]?.toUpperCase() + s.slice(1).toLowerCase()])]
    where.OR = variants.flatMap(v => [
      { title: { contains: v } },
      { city: { contains: v } }
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
        user: { select: { id: true, name: true, email: true } }
      }
    }),
    prisma.ad.count({ where })
  ])

  return { ads, total, page, pages: Math.ceil(total / limit) }
})
