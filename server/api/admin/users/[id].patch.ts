import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  if (id === auth.userId) throw createError({ statusCode: 400, message: 'Нельзя изменить свою роль' })

  const user = await prisma.user.update({
    where: { id },
    data: { role: body.role },
    select: { id: true, name: true, role: true }
  })

  return user
})
