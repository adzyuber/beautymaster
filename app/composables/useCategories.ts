export interface ApiSubcategory {
  slug: string
  nameRu: string
  nameEn: string
}

export interface ApiCategory {
  slug: string
  nameRu: string
  nameEn: string
  iconBg: string
  iconColor: string
  iconSvg: string
  imageUrl: string | null
  subcategories: ApiSubcategory[]
}

const FALLBACK: ApiCategory = {
  slug: '',
  nameRu: '',
  nameEn: '',
  iconBg: '#E0F7F6',
  iconColor: '#02282C',
  iconSvg: '',
  imageUrl: null,
  subcategories: [],
}

export async function useCategories() {
  const { data } = await useFetch<{ categories: ApiCategory[] }>('/api/categories', {
    key: 'categories-shared',
  })

  const categories = computed<ApiCategory[]>(() => data.value?.categories ?? [])
  const bySlug = computed<Record<string, ApiCategory>>(() => {
    const map: Record<string, ApiCategory> = {}
    for (const c of categories.value) map[c.slug] = c
    return map
  })

  function getCategory(slug: string | undefined | null): ApiCategory {
    if (!slug) return FALLBACK
    return bySlug.value[slug] ?? { ...FALLBACK, slug, nameRu: slug, nameEn: slug }
  }

  return { categories, bySlug, getCategory }
}
