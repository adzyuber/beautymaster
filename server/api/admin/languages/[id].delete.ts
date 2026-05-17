import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'Invalid id' })

  const target = await prisma.language.findUnique({ where: { id } })
  if (!target) throw createError({ statusCode: 404, message: 'Language not found' })
  if (target.isDefault) {
    throw createError({ statusCode: 400, message: 'Promote another language to default before deleting this one' })
  }

  await prisma.language.delete({ where: { id } })
  return { ok: true }
})
