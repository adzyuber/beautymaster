import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id)) throw createError({ statusCode: 400, message: 'Invalid id' })

  const body = await readBody(event)
  const data: any = {}

  if (body.slug !== undefined) {
    const slug = String(body.slug).trim().toLowerCase()
    if (!/^[a-z0-9-]+$/.test(slug)) {
      throw createError({ statusCode: 400, message: 'slug must contain only lowercase letters, digits and dashes' })
    }
    const dup = await prisma.category.findFirst({ where: { slug, NOT: { id } } })
    if (dup) throw createError({ statusCode: 409, message: 'Category with this slug already exists' })

    const current = await prisma.category.findUnique({ where: { id }, select: { slug: true } })
    if (current && current.slug !== slug) {
      await prisma.ad.updateMany({ where: { category: current.slug }, data: { category: slug } })
    }
    data.slug = slug
  }
  if (body.nameRu !== undefined) data.nameRu = String(body.nameRu).trim()
  if (body.nameEn !== undefined) data.nameEn = String(body.nameEn).trim()
  if (body.iconBg !== undefined) data.iconBg = String(body.iconBg)
  if (body.iconColor !== undefined) data.iconColor = String(body.iconColor)
  if (body.iconSvg !== undefined) data.iconSvg = String(body.iconSvg)
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl ? String(body.imageUrl) : null
  if (body.sortOrder !== undefined) data.sortOrder = Number(body.sortOrder)
  if (body.isActive !== undefined) data.isActive = !!body.isActive

  const cat = await prisma.category.update({ where: { id }, data })
  return cat
})
