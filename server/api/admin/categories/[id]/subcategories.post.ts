import prisma from '../../../../utils/prisma'
import { requireAdmin } from '../../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const categoryId = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(categoryId)) throw createError({ statusCode: 400, message: 'Invalid category id' })

  const body = await readBody(event)
  const slug = String(body.slug || '').trim().toLowerCase()
  const nameRu = String(body.nameRu || '').trim()
  const nameEn = String(body.nameEn || '').trim()

  if (!slug || !nameRu || !nameEn) {
    throw createError({ statusCode: 400, message: 'slug, nameRu, nameEn are required' })
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, message: 'slug must contain only lowercase letters, digits and dashes' })
  }

  const dup = await prisma.subcategory.findFirst({ where: { categoryId, slug } })
  if (dup) throw createError({ statusCode: 409, message: 'Subcategory with this slug already exists' })

  const maxOrder = await prisma.subcategory.aggregate({ where: { categoryId }, _max: { sortOrder: true } })
  const sub = await prisma.subcategory.create({
    data: {
      categoryId, slug, nameRu, nameEn,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      isActive: body.isActive !== false,
    },
  })
  return sub
})
