import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const ad = await prisma.ad.update({
    where: { id },
    data: { status: body.status },
    select: { id: true, title: true, status: true }
  })

  return ad
})
