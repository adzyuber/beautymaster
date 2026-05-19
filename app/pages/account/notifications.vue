<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
    <div class="mb-6 sm:mb-8 flex items-center gap-3">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('notif.title') }}</h1>
      <span v-if="notifications.length" class="text-base text-[#5B5B5B]">· {{ notifications.length }}</span>
      <button
        v-if="hasUnread"
        @click="markAllRead"
        class="ml-auto text-sm sm:text-base text-[#1EC3BD] hover:text-[#02282C] font-semibold transition-colors"
      >
        {{ t('notif.markAllRead') }}
      </button>
    </div>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <p class="text-[#5B5B5B] mb-4">{{ t('notif.loginToView') }}</p>
      <NuxtLink to="/login"
        class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        {{ t('common.loginRequired') }}
      </NuxtLink>
    </div>

    <div v-else-if="loading" class="space-y-3 max-w-3xl mx-auto">
      <div v-for="i in 4" :key="i" class="bg-white rounded h-28 animate-pulse"></div>
    </div>

    <div v-else-if="!notifications.length" class="flex flex-col items-center text-center px-4 py-10 sm:py-16">
      <div class="relative mb-6">
        <div class="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
        <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
          <svg class="w-12 h-12 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3a6 6 0 016 6v3.586l1.707 1.707A1 1 0 0119 16H5a1 1 0 01-.707-1.707L6 12.586V9a6 6 0 016-6z"/>
            <path d="M10 19a2 2 0 004 0"/>
          </svg>
        </div>
      </div>

      <h2 class="text-xl sm:text-2xl font-bold text-[#2D4D3A]">{{ t('notif.empty') }}</h2>
      <p class="text-sm sm:text-base text-[#5B5B5B] mt-2 max-w-md leading-relaxed">{{ t('notif.emptyDesc') }}</p>

      <NuxtLink to="/account/ads"
        class="mt-10 inline-block bg-[#02282C] text-white border-2 border-[#02282C] px-8 py-3.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        {{ t('notif.openMyAds') }}
      </NuxtLink>
    </div>

    <ul v-else class="max-w-3xl mx-auto space-y-3">
      <li
        v-for="n in notifications"
        :key="n.id"
        class="group relative flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded ring-1 transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(2,40,44,0.06),0_12px_32px_rgba(2,40,44,0.08)]"
        :class="!n.isRead ? 'ring-[#1EC3BD]/30 bg-gradient-to-br from-[#F0FFFE] to-white' : 'ring-black/5 hover:ring-[#1EC3BD]/20'"
        @click="openAd(n)"
      >
        <div class="shrink-0">
          <img
            v-if="n.adImageUrl"
            :src="n.adImageUrl"
            class="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover"
          >
          <div v-else class="w-20 h-20 sm:w-24 sm:h-24 rounded bg-[#E0F7F6] flex items-center justify-center">
            <svg class="w-8 h-8 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16v12H4z"/>
              <circle cx="9" cy="11" r="1.5"/>
              <path d="M20 16l-5-5-9 9"/>
            </svg>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p class="text-base sm:text-lg font-bold text-[#2D4D3A] truncate">{{ label(n.type) }}</p>
            <span v-if="!n.isRead" class="mt-2 w-2.5 h-2.5 rounded-full bg-[#1EC3BD] shrink-0" aria-hidden="true"></span>
          </div>
          <p class="text-sm sm:text-base text-[#02282C] truncate mt-0.5">{{ n.adTitle }}</p>
          <p class="text-xs sm:text-sm text-[#5B5B5B] mt-1 leading-relaxed line-clamp-2">{{ labelDesc(n.type) }}</p>
          <div v-if="n.reason" class="mt-2 px-2.5 py-1.5 bg-red-50 border border-red-100 rounded text-xs sm:text-sm text-red-600 leading-snug">
            <span class="font-semibold">{{ t('notif.reasonLabel') }}</span> {{ n.reason }}
          </div>
          <p class="text-xs text-[#5B5B5B]/80 mt-2">{{ timeAgo(n.createdAt) }}</p>
        </div>

        <button
          @click.stop="deleteNotif(n)"
          class="self-start -mr-1 -mt-1 sm:m-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[#5B5B5B]/50 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center shrink-0"
          :aria-label="t('notif.delete')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M6 18L18 6"/>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { fetchUnread } = useUnreadCount()
const { t } = useLocale()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const notifications = ref<any[]>([])
const hasUnread = computed(() => notifications.value.some(n => !n.isRead))

onMounted(() => {
  if (authStore.isLoggedIn) load()
})

watch(() => authStore.isLoggedIn, (loggedIn) => {
  if (loggedIn) load()
  else notifications.value = []
})

async function load() {
  loading.value = true
  try {
    notifications.value = await $fetch<any[]>('/api/notifications')
  } catch {
    notifications.value = []
  } finally {
    loading.value = false
  }
}

async function markAllRead() {
  await $fetch('/api/notifications/read-all', { method: 'PATCH' })
  notifications.value = notifications.value.map(n => ({ ...n, isRead: true }))
  await fetchUnread()
}

async function openAd(n: any) {
  if (!n.adSlug) return
  if (!n.isRead) {
    n.isRead = true
    $fetch(`/api/notifications/${n.id}`, { method: 'PATCH' }).catch(() => {})
    await fetchUnread()
  }
  router.push(`/ad/${n.adSlug}`)
}

async function deleteNotif(n: any) {
  notifications.value = notifications.value.filter(x => x.id !== n.id)
  if (!n.isRead) await fetchUnread()
  $fetch(`/api/notifications/${n.id}`, { method: 'DELETE' }).catch(() => {})
}

function label(type: string) {
  if (type === 'ad_approved') return t('notif.approved')
  if (type === 'ad_rejected') return t('notif.rejected')
  if (type === 'ad_inactive') return t('notif.inactive')
  return t('notif.updated')
}

function labelDesc(type: string) {
  if (type === 'ad_approved') return t('notif.approvedDesc')
  if (type === 'ad_rejected') return t('notif.rejectedDesc')
  if (type === 'ad_inactive') return t('notif.inactiveDesc')
  return t('notif.updatedDesc')
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return t('notif.justNow')
  if (min < 60) return t('notif.minutesAgo', { n: min })
  const h = Math.floor(min / 60)
  if (h < 24) return t('notif.hoursAgo', { n: h })
  const d = Math.floor(h / 24)
  return t('notif.daysAgo', { n: d })
}

useSeoMeta({ title: () => `${t('notif.title')} — BeautyMaster` })
</script>
