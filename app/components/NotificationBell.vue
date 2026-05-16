<template>
  <div class="relative" ref="bellRef">
    <button
      @click="toggle"
      class="flex items-center transition-colors"
      :class="dark ? 'text-white/80 hover:text-white' : 'text-[#02282C]/70 hover:text-[#02282C]'"
      :aria-label="t('notif.title')"
    >
      <span class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" :class="props.iconSize" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2 C12 2 13.5 2 13.5 3.5 C16.5 4.5 19 7.5 19 11 V16 L21.5 19 H2.5 L5 16 V11 C5 7.5 7.5 4.5 10.5 3.5 C10.5 2 12 2 12 2 Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 19 A2.5 2.5 0 0 0 14.5 19" />
        </svg>
        <span
          v-if="totalBadge > 0"
          class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
        >
          {{ totalBadge > 99 ? '99+' : totalBadge }}
        </span>
      </span>
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-[440px] bg-white rounded shadow-lg border border-gray-100 z-50 overflow-hidden"
      >
        <div class="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
          <span class="font-semibold text-lg text-gray-800">{{ t('notif.title') }}</span>
          <button
            v-if="notifications.some(n => !n.isRead)"
            @click="markAllRead"
            class="text-sm text-[#1EC3BD] hover:underline"
          >
            {{ t('notif.markAllRead') }}
          </button>
        </div>

        <!-- Unread messages banner -->
        <NuxtLink
          v-if="unreadCount > 0"
          to="/account/messages"
          @click="open = false"
          class="flex items-center gap-3 px-4 py-2.5 bg-[#f0fffe] border-b border-[#c8f5f3] hover:bg-[#e0faf8] transition-colors"
        >
          <span class="text-[#1EC3BD] text-base">✉</span>
          <span class="text-sm text-[#02282C] font-medium">
            {{ t('notif.newMessages', { n: unreadCount }) }}
          </span>
          <svg class="ml-auto w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>

        <div v-if="loading" class="py-8 flex justify-center">
          <svg class="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
        </div>

        <div v-else-if="notifications.length === 0" class="py-8 px-6 text-center">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </div>
          <p class="text-lg font-semibold text-gray-700">{{ t('notif.empty') }}</p>
          <p class="text-base text-gray-400 mt-2 leading-relaxed">{{ t('notif.emptyDesc') }}</p>
        </div>

        <ul v-else class="max-h-80 overflow-y-auto divide-y divide-gray-50">
          <li
            v-for="n in notifications"
            :key="n.id"
            class="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group"
            :class="{ 'bg-[#f0fffe]': !n.isRead }"
            @click="openAd(n)"
          >
            <!-- Ad image -->
            <div class="shrink-0">
              <img
                v-if="n.adImageUrl"
                :src="n.adImageUrl"
                class="w-12 h-12 rounded object-cover"
              >
              <div v-else class="w-12 h-12 rounded bg-gray-100"></div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-1">
                <p class="text-base font-semibold text-gray-800 truncate">{{ label(n.type) }}</p>
                <span v-if="!n.isRead" class="mt-1 w-2 h-2 rounded-full bg-[#1EC3BD] shrink-0"></span>
              </div>
              <p class="text-base text-gray-500 truncate mt-0.5">{{ n.adTitle }}</p>
              <p class="text-base text-gray-400 mt-0.5 leading-relaxed">{{ labelDesc(n.type) }}</p>
              <div v-if="n.reason" class="mt-1.5 px-2 py-1 bg-red-50 border border-red-100 rounded text-base text-red-500 leading-snug">
                <span class="font-medium">{{ t('notif.reasonLabel') }}</span> {{ n.reason }}
              </div>
              <p class="text-sm text-gray-400 mt-1.5">{{ timeAgo(n.createdAt) }}</p>
            </div>

            <!-- Delete -->
            <button
              @click.stop="deleteNotif(n)"
              class="opacity-0 group-hover:opacity-100 self-start mt-0.5 text-gray-300 hover:text-red-400 transition-all text-lg leading-none shrink-0"
              :aria-label="t('notif.delete')"
            >×</button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ dark?: boolean; iconSize?: string }>(), { dark: true, iconSize: 'w-5 h-5' })
const { notifCount, unreadCount, fetchUnread } = useUnreadCount()
const { t } = useLocale()

const totalBadge = computed(() => notifCount.value + unreadCount.value)

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
  if (!n.adSlug) return
  if (!n.isRead) {
    n.isRead = true
    $fetch(`/api/notifications/${n.id}`, { method: 'PATCH' }).catch(() => {})
    await fetchUnread()
  }
  open.value = false
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
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
