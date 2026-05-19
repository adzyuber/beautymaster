<template>
  <div v-if="!isHidden" class="sm:hidden fixed top-0 left-0 right-0 z-50 bg-gray-100 px-4 py-3">
    <div class="flex items-center gap-3">
      <div class="flex-1 flex items-center rounded overflow-hidden bg-white shadow">
        <div class="flex items-center pl-4 text-gray-400 shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </div>
        <input v-model="search" type="text" :placeholder="t('mobile.searchPlaceholder')"
          @keyup.enter="goSearch"
          class="flex-1 px-4 py-3.5 text-base text-gray-800 outline-none placeholder-gray-400">
        <button @click="goSearch" class="bg-[#02282C] text-white px-5 py-3.5 shrink-0 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </button>
      </div>
      <NuxtLink
        :to="authStore.isLoggedIn ? '/account/notifications' : '/login'"
        class="relative text-[#02282C]/70 hover:text-[#02282C] transition-colors"
        :aria-label="t('notif.title')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2 C12 2 13.5 2 13.5 3.5 C16.5 4.5 19 7.5 19 11 V16 L21.5 19 H2.5 L5 16 V11 C5 7.5 7.5 4.5 10.5 3.5 C10.5 2 12 2 12 2 Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 19 A2.5 2.5 0 0 0 14.5 19" />
        </svg>
        <span
          v-if="totalBadge > 0"
          class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
        >
          {{ totalBadge > 99 ? '99+' : totalBadge }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const search = ref('')
const route = useRoute()
const router = useRouter()
const { t } = useLocale()
const authStore = useAuthStore()
const { notifCount } = useUnreadCount()
const totalBadge = computed(() => notifCount.value)
const hideOnRoutes = ['/account/messages', '/account/profile', '/account/create', '/privacy']
const isHidden = computed(() => hideOnRoutes.includes(route.path) || route.path.startsWith('/ad/'))

function goSearch() {
  if (search.value.trim()) {
    router.push(`/catalog?search=${encodeURIComponent(search.value)}`)
  } else {
    router.push('/catalog')
  }
}
</script>
