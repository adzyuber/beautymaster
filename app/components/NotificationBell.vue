<template>
  <div class="relative" ref="bellRef">
    <button
      @click="toggle"
      class="hidden sm:flex items-center text-white/80 hover:text-white transition-colors"
      :aria-label="t('notif.title')"
    >
      <span class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2 C12 2 13.5 2 13.5 3.5 C16.5 4.5 19 7.5 19 11 V16 L21.5 19 H2.5 L5 16 V11 C5 7.5 7.5 4.5 10.5 3.5 C10.5 2 12 2 12 2 Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 19 A2.5 2.5 0 0 0 14.5 19" />
        </svg>
        <span
          v-if="notifCount > 0"
          class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
        >
          {{ notifCount > 99 ? '99+' : notifCount }}
        </span>
      </span>
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg border border-gray-100 z-50 overflow-hidden"
      >
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
          <span class="font-semibold text-sm text-gray-800">{{ t('notif.title') }}</span>
          <button
            v-if="notifications.some(n => !n.isRead)"
            @click="markAllRead"
            class="text-xs text-[#1EC3BD] hover:underline"
          >
            {{ t('notif.markAllRead') }}
          </button>
        </div>

        <div v-if="loading" class="py-8 flex justify-center">
          <svg class="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
        </div>

        <div v-else-if="notifications.length === 0" class="py-8 text-center text-sm text-gray-400">
          {{ t('notif.empty') }}
        </div>

        <ul v-else class="max-h-80 overflow-y-auto divide-y divide-gray-50">
          <li
            v-for="n in notifications"
            :key="n.id"
            class="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
            :class="{ 'bg-[#f0fffe]': !n.isRead }"
            @click="openAd(n)"
          >
            <span class="mt-0.5 shrink-0">
              <span v-if="n.type === 'ad_approved'" class="text-green-500 text-base">✓</span>
              <span v-else-if="n.type === 'ad_rejected'" class="text-red-500 text-base">✕</span>
              <span v-else class="text-yellow-500 text-base">⏸</span>
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 truncate">{{ n.adTitle }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ label(n.type) }}</p>
              <p v-if="n.reason" class="text-xs text-gray-400 mt-0.5 truncate">{{ n.reason }}</p>
              <p class="text-xs text-gray-300 mt-1">{{ timeAgo(n.createdAt) }}</p>
            </div>
            <span v-if="!n.isRead" class="mt-1.5 w-2 h-2 rounded-full bg-[#1EC3BD] shrink-0"></span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { notifCount, fetchUnread } = useUnreadCount()
const { t } = useLocale()

const bellRef = ref<HTMLElement | null>(null)
const open = ref(false)
const loading = ref(false)
const notifications = ref<any[]>([])

onClickOutside(bellRef, () => { open.value = false })

async function toggle() {
  open.value = !open.value
  if (open.value) await load()
}

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

const router = useRouter()
async function openAd(n: any) {
  if (!n.isRead) {
    n.isRead = true
    await fetchUnread()
    $fetch('/api/notifications/read-all', { method: 'PATCH' }).catch(() => {})
  }
  open.value = false
  router.push(`/ad/${n.adSlug}`)
}

function label(type: string) {
  if (type === 'ad_approved') return t('notif.approved')
  if (type === 'ad_rejected') return t('notif.rejected')
  if (type === 'ad_inactive') return t('notif.inactive')
  return t('notif.updated')
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
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
