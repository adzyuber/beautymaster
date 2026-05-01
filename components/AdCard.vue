<template>
  <NuxtLink :to="`/ad/${ad.slug}`"
    class="group bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all duration-300 overflow-hidden block hover:-translate-y-1">
    <div class="relative aspect-[4/3] bg-gray-100 overflow-hidden">
      <img v-if="ad.images?.[0]"
        :src="ad.images[0].imageUrl"
        :alt="ad.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      <span class="absolute top-3 left-3 bg-[#8FD9A8] text-[#2D4D3A] text-xs font-semibold px-3 py-1 rounded-full">
        {{ ad.subcategory }}
      </span>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-[#2D4D3A] text-base mb-1 line-clamp-2 group-hover:text-[#3d6650] transition-colors">
        {{ ad.title }}
      </h3>
      <p class="text-[#5B5B5B] text-sm mb-3 line-clamp-2">{{ ad.description }}</p>
      <div class="flex items-center justify-between">
        <div class="text-[#2D4D3A] font-bold text-lg">
          {{ ad.price ? formatPrice(ad.price) : 'Цена договорная' }}
        </div>
        <div class="text-xs text-gray-400 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {{ ad.city }}
        </div>
      </div>
      <div class="mt-2 text-xs text-gray-400">{{ ad.user?.name || 'Специалист' }}</div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ ad: any }>()

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}
</script>
