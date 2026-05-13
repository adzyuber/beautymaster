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

  if (query.status) {
    const statuses = (query.status as string).split(',').map(s => s.trim()).filter(Boolean)
    where.status = statuses.length === 1 ? statuses[0] : { in: statuses }
  }

  if (query.category) where.category = query.category

  if (query.city) {
    const c = query.city as string
    const variants = [...new Set([c, c.toLowerCase(), c.toUpperCase(), c[0]?.toUpperCase() + c.slice(1).toLowerCase()])]
    where.city = { contains: variants[0] }
  }

  if (query.search) {
    const s = query.search as string
    const variants = [...new Set([s, s.toLowerCase(), s.toUpperCase(), s[0]?.toUpperCase() + s.slice(1).toLowerCase()])]
    where.title = { contains: variants[0] }
  }

  if (query.author) {
    const a = query.author as string
    where.user = {
      OR: [
        { name: { contains: a } },
        { email: { contains: a } }
      ]
    }
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
