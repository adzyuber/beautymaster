import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const ids: number[] = Array.isArray(body.ids) ? body.ids.map((n: any) => Number(n)).filter(Boolean) : []
  if (!ids.length) throw createError({ statusCode: 400, message: 'ids array required' })

  await prisma.$transaction(
    ids.map((id, idx) =>
      prisma.language.update({ where: { id }, data: { sortOrder: idx } })
    )
  )
  return { ok: true }
})
