<template>
  <NuxtLink :to="`/ad/${ad.slug}`"
    class="group flex gap-5 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_6px_24px_rgba(45,77,58,0.13)] transition-all duration-200 overflow-hidden p-4">
    <!-- Image -->
    <div class="relative w-40 h-32 shrink-0 rounded overflow-hidden bg-gray-100">
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
    <div class="flex-1 min-w-0 flex flex-col justify-between py-0.5">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full min-w-0 max-w-full overflow-hidden"
            :style="{ backgroundColor: cat.iconBg, color: cat.iconColor }">
            <svg v-if="cat.iconSvg" class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              v-html="cat.iconSvg" />
            <span class="truncate">{{ catName }}</span>
          </span>
        </div>
        <h3 class="font-semibold text-[#2D4D3A] text-base leading-snug line-clamp-1 group-hover:text-[#3d6650] transition-colors">
          {{ ad.title }}
        </h3>
        <p class="text-[#5B5B5B] text-sm mt-1 line-clamp-2">{{ ad.description }}</p>
      </div>

      <div class="flex items-center justify-between mt-2">
        <div class="text-[#2D4D3A] font-bold text-base">
          {{ ad.price ? formatPrice(ad.price) : t('ad.price.negotiable') }}
        </div>
        <span class="flex items-center gap-1 text-xs text-gray-400 min-w-0">
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="truncate">{{ ad.city }}</span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ ad: any }>()
const { t, locale } = useLocale()
const { getCategory } = await useCategories()

const cat = computed(() => getCategory(props.ad.category))
const catName = computed(() => locale.value === 'en' ? cat.value.nameEn : cat.value.nameRu)

const fallbackImage = computed(() => {
  return cat.value.imageUrl || `https://loremflickr.com/400/300/beauty,health?lock=${(props.ad.id % 50) || 1}`
})

function formatPrice(price: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}
</script>
