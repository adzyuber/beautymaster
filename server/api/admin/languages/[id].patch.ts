import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'Invalid id' })

  const body = await readBody(event)
  const data: any = {}

  if (typeof body.nameRu === 'string') data.nameRu = body.nameRu.trim()
  if (typeof body.nameEn === 'string') data.nameEn = body.nameEn.trim()
  if (typeof body.isActive === 'boolean') data.isActive = body.isActive

  if (typeof body.code === 'string') {
    const code = body.code.trim().toLowerCase()
    if (!/^[a-z]{2,8}(-[a-z0-9]{2,8})?$/.test(code)) {
      throw createError({ statusCode: 400, message: 'code must be a short language tag' })
    }
    const existing = await prisma.language.findUnique({ where: { code } })
    if (existing && existing.id !== id) {
      throw createError({ statusCode: 409, message: 'Another language already uses this code' })
    }
    data.code = code
  }

  if (body.isDefault === true) {
    await prisma.$transaction([
      prisma.language.updateMany({ data: { isDefault: false } }),
      prisma.language.update({ where: { id }, data: { ...data, isDefault: true, isActive: true } })
    ])
    return prisma.language.findUnique({ where: { id } })
  }

  if (body.isDefault === false) {
    const target = await prisma.language.findUnique({ where: { id } })
    if (target?.isDefault) {
      throw createError({ statusCode: 400, message: 'Promote another language to default before unsetting this one' })
    }
    data.isDefault = false
  }

  if (data.isActive === false) {
    const target = await prisma.language.findUnique({ where: { id } })
    if (target?.isDefault) {
      throw createError({ statusCode: 400, message: 'Cannot deactivate the default language' })
    }
  }

  return prisma.language.update({ where: { id }, data })
})
