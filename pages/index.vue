<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-gradient-to-br from-[#2D4D3A] to-[#3d6650] text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#8FD9A8]"></div>
        <div class="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-[#8FD9A8]"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div class="max-w-2xl">
          <h1 class="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Найдите лучших специалистов в сфере
            <span class="text-[#8FD9A8]"> красоты и здоровья</span>
          </h1>
          <p class="text-lg text-gray-300 mb-8">
            Тысячи проверенных специалистов по медицине и beauty-услугам в вашем городе
          </p>
          <!-- Search bar -->
          <div class="flex gap-3 flex-col sm:flex-row">
            <input v-model="search" type="text" placeholder="Поиск специалиста..."
              @keyup.enter="goSearch"
              class="flex-1 px-5 py-3.5 rounded-xl text-gray-800 text-base outline-none focus:ring-2 focus:ring-[#8FD9A8]">
            <button @click="goSearch"
              class="bg-[#8FD9A8] text-[#2D4D3A] font-bold px-8 py-3.5 rounded-xl hover:bg-[#7bcf9a] transition-all whitespace-nowrap">
              Найти услугу
            </button>
          </div>
          <div class="mt-4">
            <NuxtLink to="/account/create"
              class="inline-block border-2 border-white text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white hover:text-[#2D4D3A] transition-all">
              Разместить объявление
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-2xl font-bold text-[#2D4D3A] mb-2">Популярные категории</h2>
      <p class="text-[#5B5B5B] mb-8">Выберите направление которое вас интересует</p>
      <div v-if="categories" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <template v-for="cat in categories.categories" :key="cat.slug">
          <NuxtLink v-for="sub in cat.subcategories" :key="sub"
            :to="`/catalog?category=${cat.slug}&subcategory=${encodeURIComponent(sub)}`"
            class="group bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] p-5 text-center transition-all hover:-translate-y-1">
            <div class="text-3xl mb-2">{{ cat.icon }}</div>
            <div class="text-sm font-semibold text-[#2D4D3A] group-hover:text-[#3d6650]">{{ sub }}</div>
            <div class="text-xs text-gray-400 mt-1">{{ cat.name }}</div>
          </NuxtLink>
        </template>
      </div>
    </section>

    <!-- New ads -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold text-[#2D4D3A]">Новые объявления</h2>
          <p class="text-[#5B5B5B]">Свежие предложения специалистов</p>
        </div>
        <NuxtLink to="/catalog" class="text-[#2D4D3A] font-semibold hover:underline text-sm">Смотреть все →</NuxtLink>
      </div>
      <div v-if="ads" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AdCard v-for="ad in ads.ads" :key="ad.id" :ad="ad" />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="bg-white rounded-[18px] h-64 animate-pulse"></div>
      </div>
    </section>

    <!-- Why us -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-[#2D4D3A] text-center mb-12">Почему выбирают нас</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="item in features" :key="item.title" class="text-center">
            <div class="w-16 h-16 bg-[#8FD9A8]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              {{ item.icon }}
            </div>
            <h3 class="font-bold text-[#2D4D3A] text-lg mb-2">{{ item.title }}</h3>
            <p class="text-[#5B5B5B] text-sm">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-gradient-to-r from-[#2D4D3A] to-[#3d6650] rounded-[24px] p-12 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Готовы разместить объявление?</h2>
        <p class="text-gray-300 mb-8 text-lg">Присоединяйтесь к тысячам специалистов на нашей платформе</p>
        <div class="flex gap-4 justify-center flex-col sm:flex-row">
          <NuxtLink to="/register"
            class="bg-[#8FD9A8] text-[#2D4D3A] px-8 py-3.5 rounded-xl font-bold hover:bg-[#7bcf9a] transition-all">
            Зарегистрироваться
          </NuxtLink>
          <NuxtLink to="/catalog"
            class="border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-[#2D4D3A] transition-all">
            Найти специалиста
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const search = ref('')
const router = useRouter()

const { data: categories } = await useFetch('/api/categories')
const { data: ads } = await useFetch('/api/ads', { query: { limit: 8 } })

function goSearch() {
  if (search.value.trim()) {
    router.push(`/catalog?search=${encodeURIComponent(search.value)}`)
  }
}

const features = [
  { icon: '🔍', title: 'Простой поиск', text: 'Находите специалистов по городу, категории и цене за секунды' },
  { icon: '✅', title: 'Прямые контакты', text: 'Связывайтесь со специалистами напрямую без посредников' },
  { icon: '📱', title: 'Удобно с телефона', text: 'Оптимизировано для мобильных устройств' }
]

useSeoMeta({
  title: 'MedBeauty Board — лучшие специалисты красоты и здоровья',
  description: 'Найдите лучших врачей, косметологов, массажистов и beauty-мастеров в вашем городе.'
})
</script>
