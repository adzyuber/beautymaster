import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const code = String(body.code || '').trim().toLowerCase()
  const nameRu = String(body.nameRu || '').trim()
  const nameEn = String(body.nameEn || '').trim()

  if (!code || !nameRu || !nameEn) {
    throw createError({ statusCode: 400, message: 'code, nameRu, nameEn are required' })
  }
  if (!/^[a-z]{2,8}(-[a-z0-9]{2,8})?$/.test(code)) {
    throw createError({ statusCode: 400, message: 'code must be a short language tag (e.g. "en", "pt-br")' })
  }

  const exists = await prisma.language.findUnique({ where: { code } })
  if (exists) throw createError({ statusCode: 409, message: 'Language with this code already exists' })

  const maxOrder = await prisma.language.aggregate({ _max: { sortOrder: true } })

  const hasAny = await prisma.language.count()
  const isDefault = hasAny === 0 ? true : !!body.isDefault

  const result = await prisma.$transaction(async (tx) => {
    if (isDefault) {
      await tx.language.updateMany({ data: { isDefault: false } })
    }
    return tx.language.create({
      data: {
        code,
        nameRu,
        nameEn,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
        isDefault,
        isActive: body.isActive !== false
      }
    })
  })

  return result
})
