import prisma from './prisma'

async function getAllowedCodes(): Promise<Set<string>> {
  const rows = await prisma.language.findMany({
    where: { isActive: true },
    select: { code: true }
  })
  return new Set(rows.map(r => r.code))
}

export async function sanitizeLanguages(input: unknown): Promise<string | null> {
  if (!Array.isArray(input)) return null
  const allowed = await getAllowedCodes()
  const cleaned = Array.from(new Set(
    input.filter((v): v is string => typeof v === 'string' && allowed.has(v))
  ))
  return cleaned.length ? JSON.stringify(cleaned) : null
}

export async function filterLangCodes(raw: unknown): Promise<string[]> {
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : String(raw).split(',')
  const cleaned = list.map(v => String(v).trim().toLowerCase()).filter(Boolean)
  if (!cleaned.length) return []
  const allowed = await getAllowedCodes()
  return cleaned.filter(v => allowed.has(v))
}

export async function getDefaultLanguageCode(): Promise<string | null> {
  const def = await prisma.language.findFirst({
    where: { isActive: true, isDefault: true },
    select: { code: true }
  })
  if (def) return def.code
  const fallback = await prisma.language.findFirst({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: { code: true }
  })
  return fallback?.code ?? null
}
