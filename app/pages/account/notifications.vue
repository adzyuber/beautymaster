<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-white">
      <div class="flex items-center gap-3">
        <button @click="router.back()" class="text-gray-500 hover:text-gray-800 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-[#02282C]">{{ t('notif.title') }}</h1>
      </div>
      <button
        v-if="notifications.some(n => !n.isRead)"
        @click="markAllRead"
        class="text-base text-[#1EC3BD] hover:underline font-medium"
      >
        {{ t('notif.markAllRead') }}
      </button>
    </div>

    <!-- Unread messages banner -->
    <NuxtLink
      v-if="unreadCount > 0"
      to="/account/messages"
      class="flex items-center gap-3 px-4 py-3 bg-[#f0fffe] border-b border-[#c8f5f3] hover:bg-[#e0faf8] transition-colors"
    >
      <span class="text-[#1EC3BD] text-lg">✉</span>
      <span class="text-base text-[#02282C] font-medium flex-1">
        {{ t('notif.newMessages', { n: unreadCount }) }}
      </span>
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </NuxtLink>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <svg class="animate-spin h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
      </svg>
    </div>

    <!-- Empty state -->
    <div v-else-if="notifications.length === 0" class="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
      </div>
      <p class="text-lg font-semibold text-gray-700">{{ t('notif.empty') }}</p>
      <p class="text-base text-gray-400 mt-2 leading-relaxed">{{ t('notif.emptyDesc') }}</p>
    </div>

    <!-- Notification list -->
    <ul v-else class="divide-y divide-gray-100">
      <li
        v-for="n in notifications"
        :key="n.id"
        class="flex gap-3 px-4 py-4 transition-colors cursor-pointer active:bg-gray-100"
        :class="{ 'bg-[#f0fffe]': !n.isRead }"
        @click="openAd(n)"
      >
        <!-- Ad image -->
        <div class="shrink-0">
          <img
            v-if="n.adImageUrl"
            :src="n.adImageUrl"
            class="w-14 h-14 rounded-lg object-cover"
          >
          <div v-else class="w-14 h-14 rounded-lg bg-gray-100"></div>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p class="text-lg font-semibold text-gray-800 truncate">{{ label(n.type) }}</p>
            <span v-if="!n.isRead" class="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#1EC3BD] shrink-0"></span>
          </div>
          <p class="text-base text-gray-500 truncate mt-0.5">{{ n.adTitle }}</p>
          <p class="text-base text-gray-400 mt-0.5 leading-relaxed">{{ labelDesc(n.type) }}</p>
          <div v-if="n.reason" class="mt-2 px-2.5 py-1.5 bg-red-50 border border-red-100 rounded-lg text-base text-red-500 leading-snug">
            <span class="font-medium">{{ t('notif.reasonLabel') }}</span> {{ n.reason }}
          </div>
          <p class="text-sm text-gray-400 mt-1.5">{{ timeAgo(n.createdAt) }}</p>
        </div>

        <!-- Delete -->
        <button
          @click.stop="deleteNotif(n)"
          class="self-start mt-0.5 text-gray-300 hover:text-red-400 transition-colors text-xl leading-none shrink-0 px-1"
          :aria-label="t('notif.delete')"
        >×</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { notifCount, unreadCount, fetchUnread } = useUnreadCount()
const { t } = useLocale()
const router = useRouter()

const loading = ref(false)
const notifications = ref<any[]>([])

onMounted(load)

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

useSeoMeta({ title: `${t('notif.title')} — BeautyMaster` })
</script>
