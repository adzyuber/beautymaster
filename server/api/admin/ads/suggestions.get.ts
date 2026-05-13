import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const { field, q } = getQuery(event) as { field: string; q: string }
  if (!field || !q?.trim()) return { suggestions: [] }

  const term = q.trim()

  if (field === 'city') {
    const rows = await prisma.ad.findMany({
      where: { city: { contains: term } },
      select: { city: true },
      distinct: ['city'],
      take: 8,
      orderBy: { city: 'asc' }
    })
    return { suggestions: rows.map(r => r.city) }
  }

  if (field === 'title') {
    const rows = await prisma.ad.findMany({
      where: { title: { contains: term } },
      select: { title: true },
      distinct: ['title'],
      take: 8,
      orderBy: { title: 'asc' }
    })
    return { suggestions: rows.map(r => r.title) }
  }

  if (field === 'author') {
    const rows = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: term } }, { email: { contains: term } }],
        ads: { some: {} }
      },
      select: { name: true, email: true },
      take: 8,
      orderBy: { name: 'asc' }
    })
    return { suggestions: rows.map(r => ({ name: r.name, email: r.email })) }
  }

  return { suggestions: [] }
})
