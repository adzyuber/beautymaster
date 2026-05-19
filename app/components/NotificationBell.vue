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
        class="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-[440px] bg-white rounded shadow-[0_8px_24px_rgba(2,40,44,0.12),0_2px_8px_rgba(2,40,44,0.06)] ring-1 ring-black/5 z-50 overflow-hidden"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b border-black/5">
          <div class="flex items-center gap-2">
            <span class="font-bold text-lg text-[#2D4D3A]">{{ t('notif.title') }}</span>
            <span v-if="notifications.length" class="text-sm text-[#5B5B5B]">· {{ notifications.length }}</span>
          </div>
          <button
            v-if="hasUnread"
            @click="markAllRead"
            class="text-sm text-[#1EC3BD] hover:text-[#02282C] font-semibold transition-colors"
          >
            {{ t('notif.markAllRead') }}
          </button>
        </div>

        <div v-if="loading" class="py-10 flex justify-center">
          <svg class="animate-spin h-5 w-5 text-[#1EC3BD]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
        </div>

        <div v-else-if="notifications.length === 0" class="flex flex-col items-center text-center px-6 py-10">
          <div class="relative mb-5">
            <div class="absolute inset-0 -m-5 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
            <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
              <svg class="w-10 h-10 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3a6 6 0 016 6v3.586l1.707 1.707A1 1 0 0119 16H5a1 1 0 01-.707-1.707L6 12.586V9a6 6 0 016-6z"/>
                <path d="M10 19a2 2 0 004 0"/>
              </svg>
            </div>
          </div>
          <p class="text-lg font-bold text-[#2D4D3A]">{{ t('notif.empty') }}</p>
          <p class="text-sm text-[#5B5B5B] mt-1.5 leading-relaxed max-w-xs">{{ t('notif.emptyDesc') }}</p>
        </div>

        <ul v-else class="max-h-[480px] overflow-y-auto p-2 space-y-2">
          <li
            v-for="n in notifications"
            :key="n.id"
            class="group relative flex gap-3 p-2.5 rounded ring-1 transition-all cursor-pointer hover:shadow-[0_2px_8px_rgba(2,40,44,0.06),0_8px_20px_rgba(2,40,44,0.06)]"
            :class="!n.isRead ? 'ring-[#1EC3BD]/30 bg-gradient-to-br from-[#F0FFFE] to-white' : 'ring-transparent hover:ring-[#1EC3BD]/20 hover:bg-[#f8faf9]'"
            @click="openNotification(n)"
          >
            <div class="shrink-0">
              <div v-if="n.type === 'profile_incomplete'"
                class="w-20 h-20 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center">
                <svg class="w-10 h-10 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <img
                v-else-if="n.adImageUrl"
                :src="n.adImageUrl"
                class="w-20 h-20 rounded object-cover"
              >
              <div v-else class="w-20 h-20 rounded bg-[#E0F7F6] flex items-center justify-center">
                <svg class="w-7 h-7 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16v12H4z"/>
                  <circle cx="9" cy="11" r="1.5"/>
                  <path d="M20 16l-5-5-9 9"/>
                </svg>
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <p class="text-sm font-bold text-[#2D4D3A] truncate">{{ label(n.type) }}</p>
                <span v-if="!n.isRead" class="mt-1.5 w-2 h-2 rounded-full bg-[#1EC3BD] shrink-0" aria-hidden="true"></span>
              </div>
              <p v-if="n.adTitle" class="text-sm text-[#02282C] truncate mt-0.5">{{ n.adTitle }}</p>
              <p class="text-xs text-[#5B5B5B] mt-1 leading-relaxed line-clamp-2">{{ labelDesc(n.type) }}</p>
              <div v-if="n.reason" class="mt-1.5 px-2 py-1 bg-red-50 border border-red-100 rounded text-xs text-red-600 leading-snug">
                <span class="font-semibold">{{ t('notif.reasonLabel') }}</span> {{ n.reason }}
              </div>
              <p class="text-xs text-[#5B5B5B]/80 mt-1.5">{{ timeAgo(n.createdAt) }}</p>
            </div>

            <button
              @click.stop="deleteNotif(n)"
              class="opacity-0 group-hover:opacity-100 self-start w-7 h-7 rounded-full text-[#5B5B5B]/60 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center shrink-0"
              :aria-label="t('notif.delete')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M6 18L18 6"/>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ dark?: boolean; iconSize?: string }>(), { dark: true, iconSize: 'w-5 h-5' })
const { notifCount, fetchUnread } = useUnreadCount()
const { t } = useLocale()

const totalBadge = computed(() => notifCount.value)

const bellRef = ref<HTMLElement | null>(null)
const open = ref(false)
const loading = ref(false)
const notifications = ref<any[]>([])
const hasUnread = computed(() => notifications.value.some(n => !n.isRead))

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
async function openNotification(n: any) {
  const target = n.type === 'profile_incomplete'
    ? '/account/profile'
    : (n.adSlug ? `/ad/${n.adSlug}` : null)
  if (!target) return
  if (!n.isRead) {
    n.isRead = true
    $fetch(`/api/notifications/${n.id}`, { method: 'PATCH' }).catch(() => {})
    await fetchUnread()
  }
  open.value = false
  router.push(target)
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
  if (type === 'profile_incomplete') return t('notif.profileIncomplete')
  return t('notif.updated')
}

function labelDesc(type: string) {
  if (type === 'ad_approved') return t('notif.approvedDesc')
  if (type === 'ad_rejected') return t('notif.rejectedDesc')
  if (type === 'ad_inactive') return t('notif.inactiveDesc')
  if (type === 'profile_incomplete') return t('notif.profileIncompleteDesc')
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
