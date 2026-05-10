import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const settings = await prisma.setting.findMany()
  return Object.fromEntries(settings.map(s => [s.key, s.value]))
})
