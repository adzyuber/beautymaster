import prisma from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const languages = await prisma.language.findMany({
    orderBy: { sortOrder: 'asc' }
  })
  return { languages }
})
