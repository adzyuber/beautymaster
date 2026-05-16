import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id)) throw createError({ statusCode: 400, message: 'Invalid id' })

  const cat = await prisma.category.findUnique({ where: { id } })
  if (!cat) throw createError({ statusCode: 404, message: 'Category not found' })

  const used = await prisma.ad.count({ where: { category: cat.slug } })
  if (used > 0) {
    throw createError({
      statusCode: 409,
      message: `Cannot delete: ${used} listings still use this category`,
      data: { code: 'category_in_use', adsCount: used },
    })
  }

  await prisma.category.delete({ where: { id } })
  return { success: true }
})
