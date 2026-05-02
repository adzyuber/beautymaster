<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="hidden sm:block text-3xl font-bold text-[#2D4D3A] mb-2">{{ t('catalog.title') }}</h1>
    <p class="hidden sm:block text-[#5B5B5B] mb-8">{{ t('catalog.subtitle') }}</p>

    <!-- Filters bar (desktop only) -->
    <div class="mb-6 hidden sm:block">
      <!-- Search row -->
      <div class="flex h-14 rounded overflow-hidden bg-white border-2 border-transparent shadow-[0_2px_16px_rgba(0,0,0,0.24)] transition-all duration-200 focus-within:border-[#1EC3BD] focus-within:shadow-[0_4px_24px_rgba(30,195,189,0.22)]">
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
        <div class="flex items-center w-40 shrink-0">
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

        <!-- Category select -->
        <select v-model="filters.category"
          class="h-full px-4 pr-8 text-sm text-gray-700 bg-transparent outline-none appearance-none border-r border-gray-200 cursor-pointer shrink-0"
          style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22 viewBox=%220 0 10 6%22><path d=%22M0 0l5 6 5-6z%22 fill=%22%239ca3af%22/></svg>'); background-repeat: no-repeat; background-position: right 12px center;">
          <option value="">{{ t('catalog.allCats') }}</option>
          <option v-for="cat in categories?.categories" :key="cat.slug" :value="cat.slug">{{ tCat(cat.slug) }}</option>
        </select>

        <!-- Subcategory select -->
        <select v-if="filters.category && currentCat" v-model="filters.subcategory"
          class="h-full px-4 pr-8 text-sm text-gray-700 bg-transparent outline-none appearance-none border-r border-gray-200 cursor-pointer shrink-0"
          style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22 viewBox=%220 0 10 6%22><path d=%22M0 0l5 6 5-6z%22 fill=%22%239ca3af%22/></svg>'); background-repeat: no-repeat; background-position: right 12px center;">
          <option value="">{{ t('catalog.allSubs') }}</option>
          <option v-for="sub in currentCat.subcategories" :key="sub" :value="sub">{{ tSub(sub) }}</option>
        </select>

        <!-- Search button -->
        <button @click="applyFilters"
          class="shrink-0 bg-[#02282C] text-white font-bold px-8 text-base hover:bg-[#011a1d] transition-colors flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
          {{ t('catalog.find') }}
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
          {{ tCat(filters.category) }}
          <button @click="filters.category = ''; filters.subcategory = ''; applyFilters()" class="hover:text-gray-900 text-base leading-none">×</button>
        </span>
        <span v-if="filters.subcategory" class="inline-flex items-center gap-1.5 text-sm font-semibold bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded">
          {{ tSub(filters.subcategory) }}
          <button @click="filters.subcategory = ''; applyFilters()" class="hover:text-gray-900 text-base leading-none">×</button>
        </span>
        <button @click="resetFilters" class="ml-auto text-sm font-semibold text-[#02282C] hover:text-[#1EC3BD] underline transition-colors">{{ t('catalog.reset') }}</button>
      </div>
    </div>

    <!-- Ads -->
    <div>
        <div v-if="pending" class="flex flex-col gap-3">
          <div v-for="i in 6" :key="i" class="bg-white rounded h-24 animate-pulse"></div>
        </div>

        <template v-else>
          <!-- New listings header (no filters) -->
          <div v-if="!hasActiveFilters" class="mb-6">
            <h2 class="text-2xl font-bold text-[#02282C]">New listings</h2>
            <p class="text-[#5B5B5B] mt-1">Fresh offers from specialists</p>
          </div>

          <div v-if="hasActiveFilters" class="flex items-center justify-between mb-4">
            <span class="text-2xl font-black text-[#02282C]">{{ t('catalog.found') }} {{ data?.total || 0 }} {{ t('catalog.ads') }}</span>
          </div>

          <!-- List view always -->
          <div v-if="data?.ads?.length" class="flex flex-col gap-3">
            <AdListItem v-for="ad in data.ads" :key="ad.id" :ad="ad" />
          </div>
          <div v-else class="text-center py-20 text-[#5B5B5B]">
            <div class="text-5xl mb-4">🔍</div>
            <p class="text-lg font-medium">{{ t('catalog.empty') }}</p>
            <p class="text-sm mt-1">{{ t('catalog.emptyHint') }}</p>
          </div>

          <!-- Pagination -->
          <div v-if="(data?.pages ?? 0) > 1" class="flex justify-center gap-2 mt-8">
            <button v-for="p in data!.pages" :key="p"
              @click="goPage(p)"
              :class="[
                'w-10 h-10 rounded text-sm font-semibold transition-all',
                p === currentPage
                  ? 'bg-[#2D4D3A] text-white'
                  : 'bg-white text-[#2D4D3A] hover:bg-[#8FD9A8]/20'
              ]">
              {{ p }}
            </button>
          </div>
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, tCat, tSub } = useLocale()
const route = useRoute()
const router = useRouter()

const filters = reactive({
  search: (route.query.search as string) || '',
  city: (route.query.city as string) || '',
  category: (route.query.category as string) || '',
  subcategory: (route.query.subcategory as string) || ''
})
const currentPage = ref(Number(route.query.page) || 1)

const { data: categories } = await useFetch('/api/categories')

const currentCat = computed(() =>
  categories.value?.categories.find((c: any) => c.slug === filters.category)
)

const hasActiveFilters = computed(() =>
  !!(filters.search || filters.city || filters.category || filters.subcategory)
)

const query = computed(() => ({
  page: currentPage.value,
  limit: 12,
  search: filters.search || undefined,
  city: filters.city || undefined,
  category: filters.category || undefined,
  subcategory: filters.subcategory || undefined
}))

const { data, pending, refresh } = await useFetch('/api/ads', { query })

function applyFilters() {
  currentPage.value = 1
  refresh()
  router.replace({ query: { ...filters, page: 1 } })
}

function resetFilters() {
  filters.search = ''
  filters.city = ''
  filters.category = ''
  filters.subcategory = ''
  currentPage.value = 1
  refresh()
  router.replace({ query: {} })
}

function goPage(p: number) {
  currentPage.value = p
  refresh()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useSeoMeta({ title: 'Каталог услуг — BeautyMaster' })
</script>
