import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const ids: number[] = Array.isArray(body.ids) ? body.ids.map(Number).filter(Number.isFinite) : []
  if (!ids.length) throw createError({ statusCode: 400, message: 'ids[] required' })

  await prisma.$transaction(
    ids.map((id, i) => prisma.category.update({ where: { id }, data: { sortOrder: i } }))
  )
  return { success: true }
})
