<template>
  <NuxtLink :to="`/ad/${ad.slug}`"
    class="group bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all duration-300 overflow-hidden block hover:-translate-y-1">
    <div class="relative aspect-[4/3] bg-gray-100 overflow-hidden">
      <img v-if="ad.images?.[0]"
        :src="ad.images[0].imageUrl"
        :alt="ad.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      <img v-else
        :src="fallbackImage"
        :alt="ad.subcategory"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      <span class="absolute top-3 left-3 bg-[#8FD9A8] text-[#2D4D3A] text-xs font-semibold px-3 py-1 rounded-full">
        {{ tSub(ad.subcategory) }}
      </span>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-[#2D4D3A] text-base mb-1 line-clamp-2 group-hover:text-[#3d6650] transition-colors">
        {{ ad.title }}
      </h3>
      <p class="text-[#5B5B5B] text-sm mb-3 line-clamp-2">{{ ad.description }}</p>
      <div class="flex items-center justify-between">
        <div class="text-[#2D4D3A] font-bold text-lg">
          {{ ad.price ? formatPrice(ad.price) : t('ad.price.negotiable') }}
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
const { t, tSub } = useLocale()

const keywordMap: Record<string, string> = {
  'Стоматология': 'dentist,dental',
  'Психология': 'psychology,therapy',
  'Терапия': 'doctor,clinic',
  'Гинекология': 'medical,healthcare',
  'Реабилитация': 'rehabilitation,physiotherapy',
  'Массаж': 'massage,spa',
  'Диетология': 'nutrition,healthy-food',
  'ЛФК': 'fitness,exercise',
  'Косметология': 'cosmetology,skincare',
  'Маникюр / Педикюр': 'manicure,nails',
  'Парикмахер': 'hairdresser,haircut',
  'Барбер': 'barbershop,barber',
  'Визажист': 'makeup,beauty',
  'Лазерная эпиляция': 'laser,beauty-salon',
  'Бровист / Лешмейкер': 'eyebrows,lashes',
  'SPA': 'spa,relaxation',
}

const fallbackImage = computed(() => {
  const kw = keywordMap[props.ad.subcategory] || 'beauty,health'
  const lock = props.ad.id % 50
  return `https://loremflickr.com/400/300/${kw}?lock=${lock}`
})

function formatPrice(price: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}
</script>
