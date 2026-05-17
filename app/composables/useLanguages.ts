export interface ApiLanguage {
  code: string
  nameRu: string
  nameEn: string
  isDefault: boolean
}

export async function useLanguages() {
  const { data } = await useFetch<{ languages: ApiLanguage[]; defaultCode: string | null }>(
    '/api/languages',
    { key: 'languages-shared' }
  )

  const languages = computed<ApiLanguage[]>(() => data.value?.languages ?? [])
  const codes = computed<string[]>(() => languages.value.map(l => l.code))
  const defaultCode = computed<string | null>(() => data.value?.defaultCode ?? null)

  const labelMap = computed<Record<string, ApiLanguage>>(() => {
    const m: Record<string, ApiLanguage> = {}
    for (const l of languages.value) m[l.code] = l
    return m
  })

  function labelFor(code: string, locale: 'ru' | 'en'): string {
    const l = labelMap.value[code]
    if (!l) return code
    return locale === 'en' ? l.nameEn : l.nameRu
  }

  function defaultLanguage(): ApiLanguage | null {
    const d = defaultCode.value
    if (d && labelMap.value[d]) return labelMap.value[d]
    return languages.value[0] ?? null
  }

  return { languages, codes, defaultCode, labelFor, defaultLanguage, labelMap }
}
