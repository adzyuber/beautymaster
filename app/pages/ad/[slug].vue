<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div v-if="pending" class="animate-pulse space-y-4">
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
      <div class="h-96 bg-gray-200 rounded"></div>
    </div>

    <div v-else-if="ad">
      <!-- Breadcrumb -->
      <nav class="text-sm text-[#5B5B5B] mb-6 flex gap-2">
        <NuxtLink to="/" class="hover:text-[#2D4D3A]">{{ t('nav.home') }}</NuxtLink>
        <span>/</span>
        <NuxtLink to="/catalog" class="hover:text-[#2D4D3A]">{{ t('nav.catalog') }}</NuxtLink>
        <span>/</span>
        <span class="text-[#2D4D3A] font-medium truncate">{{ ad.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Images -->
          <div class="bg-white rounded overflow-hidden shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <div class="relative aspect-video bg-gray-100">
              <img
                :src="ad.images?.[activeImg]?.imageUrl || adFallbackImage"
                :alt="ad.title"
                class="w-full h-full object-cover">
            </div>
            <!-- Thumbnails -->
            <div v-if="ad.images?.length > 1" class="flex gap-2 p-3 overflow-x-auto">
              <button v-for="(img, i) in ad.images" :key="i"
                @click="activeImg = i"
                :class="['w-16 h-16 rounded overflow-hidden border-2 transition-all shrink-0',
                  i === activeImg ? 'border-[#2D4D3A]' : 'border-transparent opacity-60 hover:opacity-100']">
                <img :src="img.imageUrl" class="w-full h-full object-cover">
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h2 class="font-bold text-[#2D4D3A] text-lg mb-3">{{ t('ad.description') }}</h2>
            <p class="text-[#5B5B5B] whitespace-pre-line leading-relaxed">{{ ad.description }}</p>
          </div>

          <!-- Details -->
          <div class="bg-white rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h2 class="font-bold text-[#2D4D3A] text-lg mb-4">{{ t('ad.details') }}</h2>
            <dl class="space-y-3">
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.category') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ tCat(ad.category) }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.subcategory') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ tSub(ad.subcategory) }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.city') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.city }}</dd>
              </div>
              <div v-if="ad.address" class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.address') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.address }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.date') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ formatDate(ad.createdAt) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-4">
          <!-- Price + title -->
          <div class="bg-white rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <span class="inline-block bg-[#8FD9A8]/20 text-[#2D4D3A] text-xs font-semibold px-3 py-1 rounded-full mb-3">{{ tSub(ad.subcategory) }}</span>
            <h1 class="text-xl font-bold text-[#2D4D3A] mb-3">{{ ad.title }}</h1>
            <div class="text-2xl font-bold text-[#2D4D3A]">
              {{ ad.price ? formatPrice(ad.price) : t('ad.price.negotiable') }}
            </div>
          </div>

          <!-- Contacts -->
          <div class="bg-white rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h3 class="font-bold text-[#2D4D3A] mb-4">{{ t('ad.contacts') }}</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[#8FD9A8] rounded-full overflow-hidden flex items-center justify-center text-[#2D4D3A] text-lg font-bold">
                  <img v-if="ad.user?.avatarUrl" :src="ad.user.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ ad.user?.name?.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-semibold text-[#2D4D3A] text-sm">{{ ad.user?.name }}</div>
                  <div v-if="ad.user?.organization" class="text-xs text-[#5B5B5B]">{{ ad.user?.organization }}</div>
                </div>
              </div>
              <a :href="`tel:${ad.user?.phone}`"
                class="flex items-center gap-3 p-3 rounded bg-[#f8faf9] hover:bg-[#8FD9A8]/10 transition-all group">
                <span class="text-xl">📞</span>
                <span class="font-semibold text-[#2D4D3A] text-sm group-hover:text-[#3d6650]">{{ ad.user?.phone }}</span>
              </a>
              <a :href="`mailto:${ad.user?.email}`"
                class="flex items-center gap-3 p-3 rounded bg-[#f8faf9] hover:bg-[#8FD9A8]/10 transition-all group">
                <span class="text-xl">✉️</span>
                <span class="font-medium text-[#5B5B5B] text-sm group-hover:text-[#2D4D3A] truncate">{{ ad.user?.email }}</span>
              </a>
              <a v-if="ad.user?.website" :href="ad.user.website" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded bg-[#f8faf9] hover:bg-[#8FD9A8]/10 transition-all group">
                <span class="text-xl">🌐</span>
                <span class="font-medium text-[#5B5B5B] text-sm group-hover:text-[#2D4D3A] truncate">{{ ad.user.website.replace(/^https?:\/\//, '') }}</span>
              </a>
            </div>

            <!-- Message button -->
            <div v-if="authStore.isLoggedIn && authStore.user?.id !== ad.userId" class="mt-4">
              <button @click="openMessage = true"
                class="w-full bg-[#02282C] text-white border-2 border-[#02282C] py-3 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
                {{ t('ad.writeMsg') }}
              </button>
            </div>
            <div v-else-if="!authStore.isLoggedIn" class="mt-4">
              <NuxtLink to="/login"
                class="block w-full text-center bg-[#02282C] text-white border-2 border-[#02282C] py-3 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
                {{ t('ad.loginToWrite') }}
              </NuxtLink>
            </div>
          </div>

          <!-- Own ad actions -->
          <div v-if="authStore.user?.id === ad.userId" class="bg-white rounded p-4 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <div class="flex gap-2">
              <NuxtLink :to="`/account/edit/${ad.id}`"
                class="flex-1 text-center bg-[#8FD9A8]/20 text-[#2D4D3A] py-2 rounded font-semibold text-sm hover:bg-[#8FD9A8]/40 transition-all">
                {{ t('ad.edit') }}
              </NuxtLink>
              <button @click="deleteAd"
                class="flex-1 bg-red-50 text-red-500 py-2 rounded font-semibold text-sm hover:bg-red-100 transition-all">
                {{ t('ad.delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message modal -->
    <div v-if="openMessage" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded p-6 w-full max-w-md shadow-2xl">
        <h3 class="font-bold text-[#2D4D3A] text-lg mb-4">{{ t('ad.writeMsg') }}</h3>
        <textarea v-model="msgText" rows="4" :placeholder="t('common.msgPlaceholder')"
          class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] resize-none mb-4"></textarea>
        <div class="flex gap-3">
          <button @click="openMessage = false"
            class="flex-1 border border-gray-200 text-[#5B5B5B] py-2.5 rounded font-semibold text-sm hover:bg-gray-50">
            {{ t('common.cancel') }}
          </button>
          <button @click="sendMessage"
            :disabled="!msgText.trim() || sendingMsg"
            class="flex-1 bg-[#02282C] text-white border-2 border-[#02282C] py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all disabled:opacity-50">
            {{ sendingMsg ? t('common.sending') : t('common.send') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t, tCat, tSub } = useLocale()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const keywordMap: Record<string, string> = {
  'Стоматология': 'dentist,dental', 'Психология': 'psychology,therapy',
  'Терапия': 'doctor,clinic', 'Гинекология': 'medical,healthcare',
  'Реабилитация': 'rehabilitation,physiotherapy', 'Массаж': 'massage,spa',
  'Диетология': 'nutrition,healthy-food', 'ЛФК': 'fitness,exercise',
  'Косметология': 'cosmetology,skincare', 'Маникюр / Педикюр': 'manicure,nails',
  'Парикмахер': 'hairdresser,haircut', 'Барбер': 'barbershop,barber',
  'Визажист': 'makeup,beauty', 'Лазерная эпиляция': 'laser,beauty-salon',
  'Бровист / Лешмейкер': 'eyebrows,lashes', 'SPA': 'spa,relaxation',
}

const adFallbackImage = computed(() => {
  const sub = (ad.value as any)?.subcategory
  const kw = keywordMap[sub] || 'beauty,health'
  const lock = (ad.value as any)?.id % 50 || 1
  return `https://loremflickr.com/800/500/${kw}?lock=${lock}`
})

const { data: ad, pending } = await useFetch<{
  id: number
  title: string
  description: string
  category: string
  subcategory: string
  city: string
  address: string | null
  price: number | null
  userId: number
  slug: string
  createdAt: string
  images: Array<{ id: number; sortOrder: number; adId: number; imageUrl: string }>
  user: { id: number; name: string; email: string; phone: string; organization: string | null; website: string | null; avatarUrl: string | null }
}>(`/api/ads/${route.params.slug}`)

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
  if (!confirm(t('common.deleteConfirm'))) return
  await $fetch(`/api/ads/${ad.value?.id}`, { method: 'DELETE' })
  router.push('/account/ads')
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: () => ad.value ? `${ad.value.title} — MedBeauty Board` : 'MedBeauty Board',
  description: () => ad.value?.description?.slice(0, 160) || ''
})
</script>
