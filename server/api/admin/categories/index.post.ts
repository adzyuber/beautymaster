import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
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

  const exists = await prisma.category.findUnique({ where: { slug } })
  if (exists) throw createError({ statusCode: 409, message: 'Category with this slug already exists' })

  const maxOrder = await prisma.category.aggregate({ _max: { sortOrder: true } })
  const cat = await prisma.category.create({
    data: {
      slug,
      nameRu,
      nameEn,
      iconBg: String(body.iconBg || '#E0F7F6'),
      iconColor: String(body.iconColor || '#02282C'),
      iconSvg: String(body.iconSvg || ''),
      imageUrl: body.imageUrl ? String(body.imageUrl) : null,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      isActive: body.isActive !== false,
    },
  })
  return cat
})
