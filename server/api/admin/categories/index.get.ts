import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const rows = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      subcategories: { orderBy: { sortOrder: 'asc' } },
      _count: { select: { subcategories: true } },
    },
  })
  return { categories: rows }
})
