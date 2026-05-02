<template>
  <div>
    <!-- Hero (desktop only) -->
    <section class="bg-gray-50 border-b border-gray-100 hidden sm:block">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-xl sm:text-2xl font-bold mb-4 text-[#2D4D3A]">
          {{ t('home.hero.title') }} <span class="text-[#1EC3BD]">{{ t('home.hero.accent') }}</span>
        </h1>
        <div class="flex rounded overflow-hidden bg-white border-2 border-transparent shadow-[0_2px_16px_rgba(0,0,0,0.24)] transition-all duration-200 focus-within:border-[#1EC3BD] focus-within:shadow-[0_4px_24px_rgba(30,195,189,0.22)]">
          <div class="flex items-center pl-4 text-gray-400 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
          </div>
          <input v-model="search" type="text"
            :placeholder="t('home.hero.placeholder')"
            @keyup.enter="goSearch"
            class="flex-1 px-4 py-4 text-gray-800 text-lg outline-none placeholder-gray-400 min-w-0">
          <div class="w-px bg-gray-200 my-3 shrink-0"></div>
          <div class="flex items-center px-3 text-gray-400 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <input v-model="city" type="text"
            :placeholder="t('home.hero.city')"
            @keyup.enter="goSearch"
            class="w-56 py-4 pr-4 text-gray-800 text-lg outline-none placeholder-gray-400">
          <button @click="goSearch"
            class="bg-[#02282C] text-white font-bold px-8 py-4 hover:bg-[#011a1d] transition-all whitespace-nowrap text-lg shrink-0 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
            {{ t('home.hero.search') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Categories (mobile padding top) -->
    <section class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <h2 class="text-2xl font-bold text-[#2D4D3A] mb-2">{{ t('home.categories.title') }} <span class="sm:hidden">Beauty<span class="text-[#1EC3BD]">Master</span></span></h2>
      <p class="text-[#5B5B5B] mb-8">{{ t('home.categories.subtitle') }}</p>
      <!-- Mobile: 3 rows, horizontal scroll -->
      <div v-if="categories" class="sm:hidden overflow-x-auto -mx-4 px-4 pb-2">
        <div class="grid grid-rows-3 grid-flow-col gap-x-5 gap-y-4 w-max">
          <template v-for="cat in categories.categories" :key="cat.slug">
            <NuxtLink v-for="sub in cat.subcategories" :key="sub"
              :to="`/catalog?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`"
              class="group flex flex-col items-center gap-2 w-20">
              <div class="w-16 h-16 rounded-full flex items-center justify-center ring-2 ring-transparent group-active:ring-[#1EC3BD] transition-all shadow-sm"
                :style="{ backgroundColor: categoryIcons[sub]?.bg ?? '#E0F7F6' }">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor"
                  :style="{ color: categoryIcons[sub]?.color ?? '#02282C' }"
                  v-html="categoryIcons[sub]?.paths">
                </svg>
              </div>
              <div class="text-center text-xs font-black text-[#2D4D3A] leading-tight">{{ tSub(sub) }}</div>
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Desktop: grid -->
      <div v-if="categories" class="hidden sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        <template v-for="cat in categories.categories" :key="cat.slug">
          <NuxtLink v-for="sub in cat.subcategories" :key="sub"
            :to="`/catalog?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`"
            class="group flex flex-col items-center gap-3">
            <div class="w-20 h-20 rounded-full flex items-center justify-center ring-2 ring-transparent group-hover:ring-[#1EC3BD] transition-all duration-200 shadow-sm group-hover:shadow-md group-hover:-translate-y-1"
              :style="{ backgroundColor: categoryIcons[sub]?.bg ?? '#E0F7F6' }">
              <svg viewBox="0 0 24 24" class="w-10 h-10" fill="none" stroke="currentColor"
                :style="{ color: categoryIcons[sub]?.color ?? '#02282C' }"
                v-html="categoryIcons[sub]?.paths">
              </svg>
            </div>
            <div class="text-center">
              <div class="text-base font-black text-[#2D4D3A] group-hover:text-[#1EC3BD] leading-tight transition-colors">{{ tSub(sub) }}</div>
            </div>
          </NuxtLink>
        </template>
      </div>
      </div>
    </section>

    <!-- New ads -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold text-[#2D4D3A]">{{ t('home.ads.title') }}</h2>
          <p class="text-[#5B5B5B]">{{ t('home.ads.subtitle') }}</p>
        </div>
        <NuxtLink to="/catalog" class="text-[#2D4D3A] font-semibold hover:underline text-sm">{{ t('home.ads.all') }}</NuxtLink>
      </div>
      <div v-if="ads" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        <AdCard v-for="ad in ads.ads" :key="ad.id" :ad="ad" />
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div v-for="i in 4" :key="i" class="bg-white rounded h-48 animate-pulse"></div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-[#02282C] rounded p-12 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">{{ t('home.cta.title') }}</h2>
        <p class="text-white/60 mb-8 text-lg">{{ t('home.cta.subtitle') }}</p>
        <div class="flex gap-4 justify-center flex-col sm:flex-row">
          <NuxtLink to="/register"
            class="bg-white text-[#02282C] border-2 border-white px-8 py-3.5 rounded font-bold hover:bg-gray-400 hover:border-gray-400 transition-all">
            {{ t('home.cta.register') }}
          </NuxtLink>
          <NuxtLink to="/catalog"
            class="border-2 border-[#1EC3BD] text-[#1EC3BD] px-8 py-3.5 rounded font-bold hover:bg-[#1EC3BD] hover:text-white transition-all">
            {{ t('home.cta.find') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { categoryIcons } from '~/utils/categoryIcons'
const { t, tSub, tCat } = useLocale()
const search = ref('')
const city = ref('')
const router = useRouter()

const { data: categories } = await useFetch('/api/categories')
const { data: ads } = await useFetch('/api/ads', { query: { limit: 8 } })

function goSearch() {
  if (search.value.trim() || city.value.trim()) {
    const q = new URLSearchParams()
    if (search.value.trim()) q.set('search', search.value)
    if (city.value.trim()) q.set('city', city.value)
    router.push(`/catalog?${q.toString()}`)
  }
}

useSeoMeta({
  title: 'BeautyMaster — лучшие специалисты красоты и здоровья',
  description: 'Найдите лучших врачей, косметологов, массажистов и beauty-мастеров в вашем городе.'
})
</script>
