<template>
  <div class="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-10">
    <div v-if="pending" class="animate-pulse space-y-4">
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
      <div class="h-96 bg-gray-200 rounded"></div>
    </div>

    <div v-else-if="ad">
      <!-- Breadcrumb -->
      <nav class="hidden sm:flex text-sm text-[#5B5B5B] mb-6 gap-2">
        <NuxtLink to="/" class="hover:text-[#2D4D3A]">{{ t('nav.home') }}</NuxtLink>
        <span>/</span>
        <NuxtLink to="/catalog" class="hover:text-[#2D4D3A]">{{ t('nav.catalog') }}</NuxtLink>
        <span>/</span>
        <span class="text-[#2D4D3A] font-medium truncate">{{ ad.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-px sm:gap-8">
        <!-- Left -->
        <div class="lg:col-span-2 space-y-px sm:space-y-6">
          <!-- Images -->
          <div class="bg-white sm:rounded overflow-hidden shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <div class="relative aspect-video bg-gray-100">
              <img
                :src="ad.images?.[activeImg]?.imageUrl || adFallbackImage"
                :alt="ad.title"
                @click="ad.images?.length && openLightbox(activeImg)"
                :class="['w-full h-full object-cover', ad.images?.length && 'cursor-zoom-in']">
              <button @click="router.back()"
                class="sm:hidden absolute top-3 left-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
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

          <!-- Mobile + tablet title + price -->
          <div class="lg:hidden bg-white sm:rounded px-5 py-4 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
              :style="{ backgroundColor: categoryIcons[ad.category]?.bg ?? '#E0F7F6', color: categoryIcons[ad.category]?.color ?? '#02282C' }">
              <svg v-if="categoryIcons[ad.category]" class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                v-html="categoryIcons[ad.category].paths" />
              <span>{{ tCat(ad.category) }}</span>
            </span>
            <div class="text-[13px] text-[#5B5B5B] mb-1">{{ t('ad.publishedOn') }} {{ formatDate(ad.createdAt) }}</div>
            <h1 class="text-lg font-normal text-[#2D4D3A] leading-snug mb-2">{{ ad.title }}</h1>
            <div class="text-2xl font-bold text-[#2D4D3A]">
              {{ ad.price ? formatPrice(ad.price) : t('ad.price.negotiable') }}
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white sm:rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h2 class="font-bold text-[#2D4D3A] text-lg mb-3">{{ t('ad.description') }}</h2>
            <p class="text-[15px] sm:text-base text-[#5B5B5B] whitespace-pre-line leading-relaxed">{{ ad.description }}</p>
          </div>

          <!-- Details -->
          <div class="bg-white sm:rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h2 class="font-bold text-[#2D4D3A] text-lg mb-4">{{ t('ad.details') }}</h2>
            <dl class="space-y-3">
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.category') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ tCat(ad.category) }}</dd>
              </div>
              <div class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.city') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.city }}</dd>
              </div>
              <div v-if="ad.address" class="flex gap-4">
                <dt class="text-[#5B5B5B] text-sm w-32 shrink-0">{{ t('ad.address') }}</dt>
                <dd class="font-medium text-[#2D4D3A] text-sm">{{ ad.address }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Right sidebar -->
        <div class="space-y-px sm:space-y-4">
          <!-- Price + title (desktop sidebar) -->
          <div class="hidden lg:block bg-white rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <span class="inline-block bg-[#8FD9A8]/20 text-[#2D4D3A] text-xs font-semibold px-3 py-1 rounded-full mb-3">{{ tCat(ad.category) }}</span>
            <div class="text-[13px] text-[#5B5B5B] mb-1">{{ t('ad.publishedOn') }} {{ formatDate(ad.createdAt) }}</div>
            <h1 class="text-xl font-bold text-[#2D4D3A] mb-3">{{ ad.title }}</h1>
            <div class="text-2xl font-bold text-[#2D4D3A]">
              {{ ad.price ? formatPrice(ad.price) : t('ad.price.negotiable') }}
            </div>
          </div>

          <!-- Contacts -->
          <div class="bg-white sm:rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <h3 class="font-bold text-[#2D4D3A] mb-4">{{ t('ad.contacts') }}</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-lg font-bold"
                  :style="userColor(ad.user?.name)">
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
          <div v-if="authStore.user?.id === ad.userId" class="bg-white sm:rounded p-4 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
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

          <!-- Admin controls -->
          <div v-if="authStore.isAdmin" class="bg-white sm:rounded p-4 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
            <div class="text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide mb-3">Admin</div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-[#2D4D3A]">Status</span>
              <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', adStatusClass(ad.status)]">
                {{ adStatusLabel(ad.status) }}
              </span>
            </div>
            <button
              @click="ad.status === 'active' ? deactivateModal = true : activateAd()"
              :disabled="togglingStatus"
              :class="['w-full py-2 rounded font-semibold text-sm transition-all disabled:opacity-50',
                ad.status === 'active'
                  ? 'bg-gray-100 text-[#5B5B5B] hover:bg-gray-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200']"
            >
              {{ togglingStatus ? 'Saving...' : ad.status === 'active' ? 'Deactivate' : 'Activate' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image lightbox -->
    <ImageLightbox
      v-model:open="lightboxOpen"
      :images="ad?.images?.map(i => i.imageUrl) || []"
      :initial-index="activeImg"
      :alt="ad?.title" />

    <!-- Deactivate modal -->
    <Teleport to="body">
      <div v-if="deactivateModal" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" @click.self="deactivateModal = false">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h2 class="text-lg font-bold text-[#2D4D3A] mb-1">Deactivate listing</h2>
          <p class="text-sm text-[#5B5B5B] mb-4 truncate">« {{ ad.title }} »</p>
          <label class="block text-sm font-medium text-[#2D2D2D] mb-1.5">
            Reason <span class="text-[#5B5B5B] font-normal">(optional)</span>
          </label>
          <textarea
            v-model="deactivateReason"
            rows="3"
            placeholder="Explain why the listing is being deactivated..."
            class="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none resize-none focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
          />
          <div class="flex gap-3 mt-4 justify-end">
            <button @click="deactivateModal = false"
              class="px-4 py-2 text-sm text-[#5B5B5B] border border-gray-200 rounded hover:bg-gray-50 font-medium transition-all">
              Cancel
            </button>
            <button @click="confirmDeactivate" :disabled="togglingStatus"
              class="px-4 py-2 text-sm bg-gray-700 text-white rounded hover:bg-gray-800 font-medium transition-all disabled:opacity-50">
              {{ togglingStatus ? 'Saving...' : 'Deactivate' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

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
import { categoryIcons } from '~/utils/categoryIcons'
import { userColor } from '~/utils/userColor'
const { t, tCat, locale } = useLocale()
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
  const cat = (ad.value as any)?.category
  const kw = keywordMap[cat] || 'beauty,health'
  const lock = (ad.value as any)?.id % 50 || 1
  return `https://loremflickr.com/800/500/${kw}?lock=${lock}`
})

const { data: ad, pending, refresh } = await useFetch<{
  id: number
  title: string
  description: string
  category: string
  city: string
  address: string | null
  price: number | null
  userId: number
  slug: string
  status: string
  createdAt: string
  images: Array<{ id: number; sortOrder: number; adId: number; imageUrl: string }>
  user: { id: number; name: string; email: string; phone: string; organization: string | null; website: string | null; avatarUrl: string | null }
}>(`/api/ads/${route.params.slug}`)

const activeImg = ref(0)
const openMessage = ref(false)
const msgText = ref('')
const sendingMsg = ref(false)
const togglingStatus = ref(false)
const deactivateModal = ref(false)
const deactivateReason = ref('')

const lightboxOpen = ref(false)
function openLightbox(i: number) {
  activeImg.value = i
  lightboxOpen.value = true
}

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

async function activateAd() {
  if (!ad.value) return
  togglingStatus.value = true
  try {
    await $fetch(`/api/admin/ads/${ad.value.id}`, { method: 'PATCH', body: { status: 'active' } })
    await refresh()
  } finally {
    togglingStatus.value = false
  }
}

async function confirmDeactivate() {
  if (!ad.value) return
  togglingStatus.value = true
  try {
    await $fetch(`/api/admin/ads/${ad.value.id}`, {
      method: 'PATCH',
      body: { status: 'inactive', reason: deactivateReason.value.trim() }
    })
    deactivateModal.value = false
    deactivateReason.value = ''
    await refresh()
  } finally {
    togglingStatus.value = false
  }
}

function adStatusClass(status: string) {
  if (status === 'active') return 'bg-green-100 text-green-700'
  if (status === 'pending') return 'bg-amber-100 text-amber-700'
  if (status === 'rejected') return 'bg-red-100 text-red-600'
  return 'bg-gray-100 text-gray-500'
}

function adStatusLabel(status: string) {
  if (status === 'active') return 'Active'
  if (status === 'pending') return 'Pending'
  if (status === 'rejected') return 'Rejected'
  return 'Inactive'
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
  return new Date(d).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

useSeoMeta({
  title: () => ad.value ? `${ad.value.title} — BeautyMaster` : 'BeautyMaster',
  description: () => ad.value?.description?.slice(0, 160) || ''
})
</script>
