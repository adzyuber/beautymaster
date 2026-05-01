import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const id = Number(getRouterParam(event, 'id'))
  if (id === auth.userId) throw createError({ statusCode: 400, message: 'Нельзя удалить себя' })

  await prisma.user.delete({ where: { id } })
  return { ok: true }
})
