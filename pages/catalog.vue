<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold text-[#2D4D3A] mb-2">Каталог услуг</h1>
    <p class="text-[#5B5B5B] mb-8">Найдите специалиста под ваши задачи</p>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters sidebar -->
      <aside class="w-full lg:w-64 shrink-0">
        <div class="bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6 sticky top-20">
          <h3 class="font-bold text-[#2D4D3A] mb-4">Фильтры</h3>

          <!-- Search -->
          <div class="mb-4">
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Поиск</label>
            <input v-model="filters.search" type="text" placeholder="Название..."
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
          </div>

          <!-- City -->
          <div class="mb-4">
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Город</label>
            <input v-model="filters.city" type="text" placeholder="Любой город"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
          </div>

          <!-- Category -->
          <div class="mb-4">
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Категория</label>
            <select v-model="filters.category"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
              <option value="">Все</option>
              <option v-for="cat in categories?.categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
            </select>
          </div>

          <!-- Subcategory -->
          <div v-if="filters.category && currentCat" class="mb-4">
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Подкатегория</label>
            <select v-model="filters.subcategory"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
              <option value="">Все</option>
              <option v-for="sub in currentCat.subcategories" :key="sub" :value="sub">{{ sub }}</option>
            </select>
          </div>

          <button @click="applyFilters"
            class="w-full bg-[#2D4D3A] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3d6650] transition-all mt-2">
            Применить
          </button>
          <button @click="resetFilters"
            class="w-full text-[#5B5B5B] py-2 text-sm mt-2 hover:text-[#2D4D3A] transition-colors">
            Сбросить
          </button>
        </div>
      </aside>

      <!-- Ads grid -->
      <div class="flex-1">
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="bg-white rounded-[18px] h-64 animate-pulse"></div>
        </div>

        <template v-else>
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-[#5B5B5B]">Найдено: <b class="text-[#2D4D3A]">{{ data?.total || 0 }}</b> объявлений</span>
          </div>

          <div v-if="data?.ads?.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AdCard v-for="ad in data.ads" :key="ad.id" :ad="ad" />
          </div>
          <div v-else class="text-center py-20 text-[#5B5B5B]">
            <div class="text-5xl mb-4">🔍</div>
            <p class="text-lg font-medium">Объявлений не найдено</p>
            <p class="text-sm mt-1">Попробуйте изменить параметры поиска</p>
          </div>

          <!-- Pagination -->
          <div v-if="data?.pages > 1" class="flex justify-center gap-2 mt-8">
            <button v-for="p in data.pages" :key="p"
              @click="goPage(p)"
              :class="[
                'w-10 h-10 rounded-xl text-sm font-semibold transition-all',
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
  </div>
</template>

<script setup lang="ts">
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

useSeoMeta({ title: 'Каталог услуг — MedBeauty Board' })
</script>
