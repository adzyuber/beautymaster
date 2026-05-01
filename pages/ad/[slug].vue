<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div v-if="pending" class="animate-pulse space-y-4">
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
      <div class="h-96 bg-gray-200 rounded-[18px]"></div>
    </div>

    <div v-else-if="ad">
      <!-- Breadcrumb -->
      <nav class="text-sm text-[#5B5B5B] mb-6 flex gap-2">
        <NuxtLink to="/" class="hover:text-[#2D4D3A]">Главная</NuxtLink>
        <span>/</span>
        <NuxtLink to="/catalog" class="hover:text-[#2D4D3A]">Каталог</NuxtLink>
        <span>/</span>
        <span class="text-[#2D4D3A] font-medium truncate">{{ ad.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Images -->
          <div class="bg-white rounded-[18px] overflow-hidden shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <div class="relative aspect-video bg-gray-100">
              <img v-if="ad.images?.[activeImg]"
                :src="ad.images[activeImg].imageUrl"
                :alt="ad.title"
                class="w-full h-full object-cover">
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <!-- Thumbnails -->
            <div v-if="ad.images?.length > 1" class="flex gap-2 p-3 overflow-x-auto">
              <button v-for="(img, i) in ad.images" :key="i"
                @click="activeImg = i"
                :class="['w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0',
                  i === activeImg ? 'border-[#2D4D3A]' : 'border-transparent opacity-60 hover:opacity-100']">
                <img :src="img.imageUrl" class="w-full h-full object-cover">
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h2 class="font-bold text-[#2D4D3A] text-lg mb-3">Описание</h2>
            <p class="text-[#5B5B5B] whitespace-pre-line leading-relaxed">{{ ad.description }}</p>
          </div>

          <!-- Details -->
          <div class="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h2 class="font-bold text-[#2D4D3A] text-lg mb-4">Детали</h2>
            <dl class="space-y-3">
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">Категория</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.category === 'medicine' ? 'Медицина' : 'Beauty' }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">Направление</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.subcategory }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">Город</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.city }}</dd>
              </div>
              <div v-if="ad.address" class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">Адрес</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.address }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">Дата публикации</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ formatDate(ad.createdAt) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-4">
          <!-- Price + title -->
          <div class="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <span class="inline-block bg-[#8FD9A8]/20 text-[#2D4D3A] text-xs font-semibold px-3 py-1 rounded-full mb-3">{{ ad.subcategory }}</span>
            <h1 class="text-xl font-bold text-[#2D4D3A] mb-3">{{ ad.title }}</h1>
            <div class="text-2xl font-bold text-[#2D4D3A]">
              {{ ad.price ? formatPrice(ad.price) : 'Цена договорная' }}
            </div>
          </div>

          <!-- Contacts -->
          <div class="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h3 class="font-bold text-[#2D4D3A] mb-4">Контакты</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[#8FD9A8]/20 rounded-full flex items-center justify-center text-lg font-bold text-[#2D4D3A]">
                  {{ ad.user?.name?.charAt(0) }}
                </div>
                <div>
                  <div class="font-semibold text-[#2D4D3A] text-sm">{{ ad.user?.name }}</div>
                  <div v-if="ad.user?.organization" class="text-xs text-[#5B5B5B]">{{ ad.user?.organization }}</div>
                </div>
              </div>
              <a :href="`tel:${ad.user?.phone}`"
                class="flex items-center gap-3 p-3 rounded-xl bg-[#f8faf9] hover:bg-[#8FD9A8]/10 transition-all group">
                <span class="text-xl">📞</span>
                <span class="font-semibold text-[#2D4D3A] text-sm group-hover:text-[#3d6650]">{{ ad.user?.phone }}</span>
              </a>
              <a :href="`mailto:${ad.user?.email}`"
                class="flex items-center gap-3 p-3 rounded-xl bg-[#f8faf9] hover:bg-[#8FD9A8]/10 transition-all group">
                <span class="text-xl">✉️</span>
                <span class="font-medium text-[#5B5B5B] text-sm group-hover:text-[#2D4D3A] truncate">{{ ad.user?.email }}</span>
              </a>
            </div>

            <!-- Message button -->
            <div v-if="authStore.isLoggedIn && authStore.user?.id !== ad.userId" class="mt-4">
              <button @click="openMessage = true"
                class="w-full bg-[#2D4D3A] text-white py-3 rounded-xl font-semibold hover:bg-[#3d6650] transition-all">
                Написать сообщение
              </button>
            </div>
            <div v-else-if="!authStore.isLoggedIn" class="mt-4">
              <NuxtLink to="/login"
                class="block w-full text-center border-2 border-[#2D4D3A] text-[#2D4D3A] py-2.5 rounded-xl font-semibold hover:bg-[#2D4D3A] hover:text-white transition-all text-sm">
                Войдите чтобы написать
              </NuxtLink>
            </div>
          </div>

          <!-- Own ad actions -->
          <div v-if="authStore.user?.id === ad.userId" class="bg-white rounded-[18px] p-4 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <div class="flex gap-2">
              <NuxtLink :to="`/account/edit/${ad.id}`"
                class="flex-1 text-center bg-[#8FD9A8]/20 text-[#2D4D3A] py-2 rounded-xl font-semibold text-sm hover:bg-[#8FD9A8]/40 transition-all">
                Редактировать
              </NuxtLink>
              <button @click="deleteAd"
                class="flex-1 bg-red-50 text-red-500 py-2 rounded-xl font-semibold text-sm hover:bg-red-100 transition-all">
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message modal -->
    <div v-if="openMessage" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-[24px] p-6 w-full max-w-md shadow-2xl">
        <h3 class="font-bold text-[#2D4D3A] text-lg mb-4">Написать сообщение</h3>
        <textarea v-model="msgText" rows="4" placeholder="Введите ваше сообщение..."
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8] resize-none mb-4"></textarea>
        <div class="flex gap-3">
          <button @click="openMessage = false"
            class="flex-1 border border-gray-200 text-[#5B5B5B] py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50">
            Отмена
          </button>
          <button @click="sendMessage"
            :disabled="!msgText.trim() || sendingMsg"
            class="flex-1 bg-[#2D4D3A] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3d6650] transition-all disabled:opacity-50">
            {{ sendingMsg ? 'Отправляем...' : 'Отправить' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const { data: ad, pending } = await useFetch(`/api/ads/${route.params.slug}`)

const activeImg = ref(0)
const openMessage = ref(false)
const msgText = ref('')
const sendingMsg = ref(false)

async function sendMessage() {
  if (!msgText.value.trim() || !ad.value) return
  sendingMsg.value = true
  try {
    await $fetch('/api/messages', {
      method: 'POST',
      body: { toUserId: ad.value.userId, text: msgText.value }
    })
    openMessage.value = false
    msgText.value = ''
    router.push('/account/messages')
  } catch (e: any) {
    alert(e.data?.message || 'Ошибка')
  } finally {
    sendingMsg.value = false
  }
}

async function deleteAd() {
  if (!confirm('Удалить объявление?')) return
  await $fetch(`/api/ads/${ad.value?.id}`, { method: 'DELETE' })
  router.push('/account/ads')
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: () => ad.value ? `${ad.value.title} — MedBeauty Board` : 'MedBeauty Board',
  description: () => ad.value?.description?.slice(0, 160) || ''
})
</script>
