<template>
  <NuxtLink :to="`/ad/${ad.slug}`"
    class="group flex gap-4 sm:gap-5 h-28 sm:h-48 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_6px_24px_rgba(45,77,58,0.13)] transition-all duration-200 overflow-hidden pr-3 sm:pr-4">
    <!-- Image -->
    <div class="relative w-28 sm:w-72 self-stretch shrink-0 overflow-hidden bg-gray-100">
      <img v-if="ad.images?.[0]"
        :src="ad.images[0].imageUrl"
        :alt="ad.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      <img v-else
        :src="fallbackImage"
        :alt="catName"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0 flex flex-col justify-between py-2.5 sm:py-4">
      <div>
        <div class="flex items-center justify-between gap-3 mb-1">
          <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded min-w-0 max-w-full overflow-hidden"
            :style="{ backgroundColor: cat.iconBg, color: cat.iconColor }">
            <svg v-if="cat.iconSvg" class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              v-html="cat.iconSvg" />
            <span class="truncate">{{ catName }}</span>
          </span>
          <div class="text-[#2D4D3A] font-bold text-sm sm:text-base shrink-0">
            {{ ad.price ? formatPrice(ad.price) : t('ad.price.negotiable') }}
          </div>
        </div>
        <h3 class="font-semibold text-[#2D4D3A] text-sm sm:text-base leading-snug line-clamp-2 sm:line-clamp-1 group-hover:text-[#3d6650] transition-colors">
          {{ ad.title }}
        </h3>
        <p class="hidden sm:line-clamp-2 text-[#5B5B5B] text-sm mt-1">{{ ad.description }}</p>
      </div>

      <div class="flex items-center mt-2 gap-2 min-w-0 flex-wrap">
        <span class="flex items-center gap-1 text-xs text-gray-400 min-w-0">
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="truncate">{{ ad.city }}</span>
        </span>
        <span class="text-xs text-gray-400 shrink-0">·</span>
        <span class="text-xs text-gray-400 shrink-0">{{ formatDate(ad.createdAt) }}</span>
        <template v-if="displayLanguages.length">
          <span class="text-xs text-gray-400 shrink-0">·</span>
          <div class="flex items-center gap-1 flex-wrap" :title="t('ad.speaks')">
            <span v-for="code in displayLanguages" :key="code"
              class="text-[10px] sm:text-[11px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              {{ code.toUpperCase() }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { parseLanguages } from '~/utils/languages'
const props = defineProps<{ ad: any }>()
const { t, locale } = useLocale()
const { getCategory } = await useCategories()
const { defaultCode } = await useLanguages()

const cat = computed(() => getCategory(props.ad.category))
const catName = computed(() => locale.value === 'en' ? cat.value.nameEn : cat.value.nameRu)
const authorLanguages = computed(() => parseLanguages(props.ad.user?.languages))
const displayLanguages = computed<string[]>(() => {
  if (authorLanguages.value.length) return authorLanguages.value
  return defaultCode.value ? [defaultCode.value] : []
})

const fallbackImage = computed(() => {
  return cat.value.imageUrl || `https://loremflickr.com/400/300/beauty,health?lock=${(props.ad.id % 50) || 1}`
})

function formatPrice(price: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
