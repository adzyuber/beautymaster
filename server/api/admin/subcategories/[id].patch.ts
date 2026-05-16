import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id)) throw createError({ statusCode: 400, message: 'Invalid id' })

  const body = await readBody(event)
  const current = await prisma.subcategory.findUnique({ where: { id } })
  if (!current) throw createError({ statusCode: 404, message: 'Subcategory not found' })

  const data: any = {}
  if (body.slug !== undefined) {
    const slug = String(body.slug).trim().toLowerCase()
    if (!/^[a-z0-9-]+$/.test(slug)) {
      throw createError({ statusCode: 400, message: 'slug must contain only lowercase letters, digits and dashes' })
    }
    const dup = await prisma.subcategory.findFirst({
      where: { categoryId: current.categoryId, slug, NOT: { id } },
    })
    if (dup) throw createError({ statusCode: 409, message: 'Subcategory with this slug already exists' })
    data.slug = slug
  }
  if (body.nameRu !== undefined) data.nameRu = String(body.nameRu).trim()
  if (body.nameEn !== undefined) data.nameEn = String(body.nameEn).trim()
  if (body.sortOrder !== undefined) data.sortOrder = Number(body.sortOrder)
  if (body.isActive !== undefined) data.isActive = !!body.isActive

  const sub = await prisma.subcategory.update({ where: { id }, data })
  return sub
})
