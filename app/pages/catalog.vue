<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="hidden sm:block text-3xl font-bold text-[#2D4D3A] mb-2">{{ t('catalog.title') }}</h1>
    <p class="hidden sm:block text-[#5B5B5B] mb-8">{{ t('catalog.subtitle') }}</p>

    <!-- Filters bar (desktop only) -->
    <div class="mb-6 hidden sm:block">
      <!-- Search row -->
      <div class="flex h-14 rounded bg-white border-2 border-transparent shadow-[0_2px_16px_rgba(0,0,0,0.24)] transition-all duration-200 focus-within:border-[#1EC3BD] focus-within:shadow-[0_4px_24px_rgba(30,195,189,0.22)]">
        <!-- Search input -->
        <div class="flex items-center flex-1 min-w-0">
          <div class="pl-4 text-gray-400 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
          </div>
          <input v-model="filters.search" @keyup.enter="applyFilters" type="text"
            :placeholder="t('catalog.search')"
            class="w-full h-full px-3 text-lg text-gray-900 placeholder-gray-400 outline-none bg-transparent">
        </div>

        <!-- Divider -->
        <div class="w-px bg-gray-200 my-2 shrink-0"></div>

        <!-- City input -->
        <div class="flex items-center w-52 shrink-0">
          <div class="pl-3 text-gray-400 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <input v-model="filters.city" @keyup.enter="applyFilters" type="text" :placeholder="t('catalog.city')"
            class="w-full h-full px-3 text-lg text-gray-900 placeholder-gray-400 outline-none bg-transparent">
        </div>

        <!-- Divider -->
        <div class="w-px bg-gray-200 my-2 shrink-0"></div>

        <!-- Category combobox -->
        <div class="relative h-full w-52 shrink-0 border-r border-gray-200">
          <ComboboxField
            v-model="filters.category"
            :options="categoryOptions"
            :placeholder="t('catalog.allCats')"
            wrap-class="relative h-full"
            input-class="w-full h-full px-3 pr-8 text-base text-gray-700 bg-transparent outline-none placeholder-gray-400"
            @update:model-value="applyFilters"
          />
        </div>

        <!-- Search button -->
        <button @click="applyFilters"
          class="shrink-0 bg-[#02282C] text-white font-bold px-8 text-base hover:bg-[#011a1d] transition-colors flex items-center gap-2 rounded-r">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
          {{ t('catalog.find') }}
        </button>
      </div>

      <!-- Language chips row -->
      <div class="flex items-center gap-2 mt-3 flex-wrap">
        <span class="text-sm font-semibold text-[#5B5B5B] mr-1">{{ t('catalog.languageFilter') }}</span>
        <button v-for="lang in languages" :key="lang.code"
          type="button"
          @click="toggleLanguage(lang.code)"
          :class="[
            'inline-flex items-center px-3 py-1 rounded text-sm font-medium border transition-all',
            filters.languages.includes(lang.code)
              ? 'bg-[#02282C] text-white border-[#02282C]'
              : 'bg-white text-[#5B5B5B] border-gray-200 hover:border-[#1EC3BD]'
          ]">
          {{ labelFor(lang.code, locale === 'en' ? 'en' : 'ru') }}
        </button>
      </div>

      <!-- Active filter / reset row -->
      <div v-if="hasActiveFilters" class="flex items-center gap-3 mt-3 flex-wrap">
        <span class="text-sm font-semibold text-[#02282C]">{{ t('catalog.activeFilters') }}</span>
        <span v-if="filters.search" class="inline-flex items-center gap-1.5 text-sm font-semibold bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded">
          {{ filters.search }}
          <button @click="filters.search = ''; applyFilters()" class="hover:text-gray-900 text-base leading-none">×</button>
        </span>
        <span v-if="filters.city" class="inline-flex items-center gap-1.5 text-sm font-semibold bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded">
          {{ filters.city }}
          <button @click="filters.city = ''; applyFilters()" class="hover:text-gray-900 text-base leading-none">×</button>
        </span>
        <span v-if="filters.category" class="inline-flex items-center gap-1.5 text-sm font-semibold bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded">
          {{ catName(filters.category) }}
          <button @click="filters.category = ''; applyFilters()" class="hover:text-gray-900 text-base leading-none">×</button>
        </span>
        <button @click="resetFilters" class="ml-auto text-sm font-semibold text-[#02282C] hover:text-[#1EC3BD] underline transition-colors">{{ t('catalog.reset') }}</button>
      </div>
    </div>

    <!-- Ads -->
    <div>
        <div v-if="initialPending" class="flex flex-col gap-3">
          <div v-for="i in 6" :key="i" class="bg-white rounded h-24 animate-pulse"></div>
        </div>

        <template v-else>
          <!-- New listings header (no filters) -->
          <div v-if="!hasActiveFilters" class="mb-6">
            <h2 class="text-2xl font-bold text-[#02282C]">New listings</h2>
            <p class="text-[#5B5B5B] mt-1">Fresh offers from specialists</p>
          </div>

          <div v-if="hasActiveFilters" class="flex items-center justify-between mb-4">
            <span class="text-2xl font-black text-[#02282C]">{{ t('catalog.found') }} {{ total }} {{ t('catalog.ads') }}</span>
          </div>

          <!-- List view always -->
          <div v-if="ads.length" class="flex flex-col gap-3">
            <AdListItem v-for="ad in ads" :key="ad.id" :ad="ad" />
          </div>
          <div v-else class="text-center py-20 text-[#5B5B5B]">
            <div class="text-5xl mb-4">🔍</div>
            <p class="text-lg font-medium">{{ t('catalog.empty') }}</p>
            <p class="text-sm mt-1">{{ t('catalog.emptyHint') }}</p>
          </div>

          <!-- Lazy load sentinel -->
          <div v-if="hasMore" ref="sentinel" class="h-10 mt-6"></div>
          <div v-if="loadingMore" class="flex flex-col gap-3 mt-3">
            <div v-for="i in 3" :key="i" class="bg-white rounded h-24 animate-pulse"></div>
          </div>
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useLocale()
const { languages, codes, labelFor } = await useLanguages()
const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 12

function parseLangQuery(raw: unknown): string[] {
  if (!raw) return []
  const allowed = new Set<string>(codes.value)
  return String(raw).split(',').map(v => v.trim().toLowerCase()).filter(v => allowed.has(v))
}

const filters = reactive({
  search: (route.query.search as string) || '',
  city: (route.query.city as string) || '',
  category: (route.query.category as string) || '',
  languages: parseLangQuery(route.query.languages)
})

function toggleLanguage(code: string) {
  filters.languages = filters.languages.includes(code) ? [] : [code]
  applyFilters()
}

const { categories, getCategory } = await useCategories()

function catName(slug: string) {
  const c = getCategory(slug)
  return locale.value === 'en' ? c.nameEn : c.nameRu
}

const categoryOptions = computed(() => [
  { value: '', label: t('catalog.allCats') },
  ...categories.value.map(c => ({ value: c.slug, label: locale.value === 'en' ? c.nameEn : c.nameRu }))
])

const hasActiveFilters = computed(() =>
  !!(filters.search || filters.city || filters.category || filters.languages.length)
)

type Ad = any
type AdsResponse = { ads: Ad[]; total: number; page: number; pages: number }

const ads = ref<Ad[]>([])
const total = ref(0)
const pagesTotal = ref(0)
const currentPage = ref(0)
const loadingMore = ref(false)
const hasMore = computed(() => currentPage.value < pagesTotal.value)

function buildQuery(page: number) {
  return {
    page,
    limit: PAGE_SIZE,
    search: filters.search || undefined,
    city: filters.city || undefined,
    category: filters.category || undefined,
    languages: filters.languages.length ? filters.languages.join(',') : undefined
  }
}

const { data: initial, pending: initialPending, refresh: refreshInitial } = await useAsyncData<AdsResponse>(
  'catalog-list',
  () => $fetch('/api/ads', { query: buildQuery(1) })
)

function applyResponse(res: AdsResponse | null, append: boolean) {
  if (!res) return
  total.value = res.total
  pagesTotal.value = res.pages
  currentPage.value = res.page
  if (append) {
    const existing = new Set(ads.value.map(a => a.id))
    ads.value.push(...res.ads.filter(a => !existing.has(a.id)))
  } else {
    ads.value = res.ads
  }
}

applyResponse(initial.value, false)
watch(initial, (v) => applyResponse(v, false))

async function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true
  try {
    const res = await $fetch<AdsResponse>('/api/ads', { query: buildQuery(currentPage.value + 1) })
    applyResponse(res, true)
    await nextTick()
    if (observer && sentinel.value && hasMore.value) {
      observer.unobserve(sentinel.value)
      observer.observe(sentinel.value)
    }
  } finally {
    loadingMore.value = false
  }
}

function applyFilters() {
  router.replace({
    query: {
      ...(filters.search ? { search: filters.search } : {}),
      ...(filters.city ? { city: filters.city } : {}),
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.languages.length ? { languages: filters.languages.join(',') } : {})
    }
  })
  refreshInitial()
}

function resetFilters() {
  filters.search = ''
  filters.city = ''
  filters.category = ''
  filters.languages = []
  router.replace({ query: {} })
  refreshInitial()
}

watch(() => route.query, (q) => {
  filters.search = (q.search as string) || ''
  filters.city = (q.city as string) || ''
  filters.category = (q.category as string) || ''
  filters.languages = parseLangQuery(q.languages)
  refreshInitial()
})

const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) loadMore()
  }, { rootMargin: '400px 0px' })

  watch(sentinel, (el, prev) => {
    if (prev) observer?.unobserve(prev)
    if (el) observer?.observe(el)
  }, { immediate: true, flush: 'post' })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})

useSeoMeta({ title: 'Каталог услуг — BeautyMaster' })
</script>
