import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const rows = await prisma.language.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: { code: true, nameRu: true, nameEn: true, isDefault: true }
  })
  const defaultLang = rows.find(l => l.isDefault) ?? rows[0] ?? null
  return {
    languages: rows,
    defaultCode: defaultLang?.code ?? null
  }
})
