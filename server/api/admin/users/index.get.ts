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
  if (query.search) {
    const s = query.search as string
    const variants = [...new Set([s, s.toLowerCase(), s.toUpperCase(), s[0]?.toUpperCase() + s.slice(1).toLowerCase()])]
    where.OR = variants.flatMap(v => [
      { name: { contains: v } },
      { email: { contains: v } }
    ])
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true, phone: true,
        organization: true, role: true, createdAt: true,
        _count: { select: { ads: true } }
      }
    }),
    prisma.user.count({ where })
  ])

  return { users, total, page, pages: Math.ceil(total / limit) }
})
