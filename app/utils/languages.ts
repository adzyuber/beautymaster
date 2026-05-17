export function parseLanguages(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter((v): v is string => typeof v === 'string')
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
    } catch {
      return []
    }
  }
  return []
}
