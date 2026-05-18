<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
    <div class="mb-6 sm:mb-8 flex items-center gap-2">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('favorites.title') }}</h1>
      <span v-if="ads.length" class="text-base text-[#5B5B5B]">· {{ ads.length }}</span>
    </div>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <p class="text-[#5B5B5B] mb-4">{{ t('favorites.loginToSave') }}</p>
      <NuxtLink to="/login"
        class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        {{ t('common.loginRequired') }}
      </NuxtLink>
    </div>

    <div v-else-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded h-72 animate-pulse"></div>
    </div>

    <div v-else-if="!ads.length" class="flex flex-col items-center text-center px-4 py-10 sm:py-16">
      <div class="relative mb-6">
        <div class="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
        <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
          <svg class="w-12 h-12 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
        </div>
      </div>

      <h2 class="text-xl sm:text-2xl font-bold text-[#2D4D3A]">{{ t('favorites.empty') }}</h2>
      <p class="text-sm sm:text-base text-[#5B5B5B] mt-2 max-w-md leading-relaxed">{{ t('favorites.emptyHint') }}</p>

      <div v-if="categories.length" class="w-full mt-10">
        <p class="text-xs font-semibold tracking-wider uppercase text-[#5B5B5B]/80 mb-4 text-center">{{ t('favorites.emptyExplore') }}</p>

        <!-- Mobile: horizontal scroll -->
        <div class="sm:hidden relative -mx-4">
          <div class="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 py-2">
            <div class="flex gap-4 w-max mx-auto">
              <NuxtLink v-for="cat in categories" :key="cat.slug"
                :to="`/catalog?category=${encodeURIComponent(cat.slug)}`"
                class="group flex flex-col items-center gap-2 w-20 shrink-0">
                <div class="w-16 h-16 rounded-full flex items-center justify-center ring-2 ring-transparent group-active:ring-[#1EC3BD] transition-all duration-200 shadow-sm"
                  :style="{ backgroundColor: cat.iconBg }">
                  <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor"
                    :style="{ color: cat.iconColor }"
                    v-html="cat.iconSvg"></svg>
                </div>
                <span class="text-center text-xs font-semibold text-[#2D4D3A] leading-tight line-clamp-2">{{ locale === 'en' ? cat.nameEn : cat.nameRu }}</span>
              </NuxtLink>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#f8faf9] to-transparent" aria-hidden="true"></div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f8faf9] to-transparent" aria-hidden="true"></div>
        </div>

        <!-- Desktop: horizontal scroll with arrows -->
        <div class="hidden sm:block relative">
          <div ref="desktopScroller" @scroll="updateScrollState"
            class="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 py-2 scroll-smooth">
            <div class="flex gap-5 w-max mx-auto">
              <NuxtLink v-for="cat in categories" :key="cat.slug"
                :to="`/catalog?category=${encodeURIComponent(cat.slug)}`"
                class="group flex flex-col items-center gap-2 w-24 shrink-0">
                <div class="w-[72px] h-[72px] rounded-full flex items-center justify-center ring-2 ring-transparent group-hover:ring-[#1EC3BD] transition-all duration-200 shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5"
                  :style="{ backgroundColor: cat.iconBg }">
                  <svg viewBox="0 0 24 24" class="w-9 h-9" fill="none" stroke="currentColor"
                    :style="{ color: cat.iconColor }"
                    v-html="cat.iconSvg"></svg>
                </div>
                <span class="text-center text-xs font-semibold text-[#2D4D3A] leading-tight line-clamp-2">{{ locale === 'en' ? cat.nameEn : cat.nameRu }}</span>
              </NuxtLink>
            </div>
          </div>
          <div class="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#f8faf9] to-transparent" aria-hidden="true"></div>
          <div class="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#f8faf9] to-transparent" aria-hidden="true"></div>

          <button type="button" v-show="canScrollLeft" @click="scrollDesktopBy(-1)"
            :aria-label="t('favorites.scrollPrev')"
            class="absolute -left-2 top-[44px] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-[#02282C] flex items-center justify-center shadow-[0_2px_8px_rgba(2,40,44,0.06),0_8px_24px_rgba(2,40,44,0.10)] hover:shadow-[0_4px_12px_rgba(2,40,44,0.10),0_12px_32px_rgba(2,40,44,0.18)] hover:text-[#1EC3BD] hover:scale-105 active:scale-95 transition-all duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>
          <button type="button" v-show="canScrollRight" @click="scrollDesktopBy(1)"
            :aria-label="t('favorites.scrollNext')"
            class="absolute -right-2 top-[44px] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white text-[#02282C] flex items-center justify-center shadow-[0_2px_8px_rgba(2,40,44,0.06),0_8px_24px_rgba(2,40,44,0.10)] hover:shadow-[0_4px_12px_rgba(2,40,44,0.10),0_12px_32px_rgba(2,40,44,0.18)] hover:text-[#1EC3BD] hover:scale-105 active:scale-95 transition-all duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>
        </div>
      </div>

      <NuxtLink to="/catalog"
        class="mt-10 inline-block bg-[#02282C] text-white border-2 border-[#02282C] px-8 py-3.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        {{ t('favorites.openCatalog') }}
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <AdCard v-for="ad in ads" :key="ad.id" :ad="ad" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t, locale } = useLocale()
const authStore = useAuthStore()
const { ids } = useFavorites()
const { categories } = await useCategories()

const desktopScroller = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScrollState() {
  const el = desktopScroller.value
  if (!el) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }
  canScrollLeft.value = el.scrollLeft > 8
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 8
}

function scrollDesktopBy(dir: -1 | 1) {
  const el = desktopScroller.value
  if (!el) return
  el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.7), behavior: 'smooth' })
}

onMounted(() => {
  nextTick(updateScrollState)
  window.addEventListener('resize', updateScrollState)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScrollState)
})

const { data: fetched, pending, refresh } = await useFetch<any[]>('/api/favorites/list', {
  default: () => [],
  immediate: authStore.isLoggedIn
})
const ads = computed(() => fetched.value ?? [])

watch(() => authStore.isLoggedIn, (loggedIn) => {
  if (loggedIn) refresh()
  else fetched.value = []
})

watch([ads, categories], () => {
  nextTick(updateScrollState)
}, { flush: 'post' })

watch(ids, (next, prev) => {
  if (!prev) return
  const nextSet = new Set(next)
  if (next.length < prev.length && fetched.value) {
    fetched.value = fetched.value.filter(ad => nextSet.has(ad.id))
  } else if (next.length > prev.length) {
    refresh()
  }
})

useSeoMeta({ title: () => `${t('favorites.title')} — BeautyMaster` })
</script>
