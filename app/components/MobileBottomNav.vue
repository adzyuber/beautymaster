<template>
  <nav class="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-stretch h-16 transition-transform duration-300 ease-in-out"
    :class="{ 'translate-y-full': !isVisible && !pinned }">
    <NuxtLink to="/" class="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#02282C] transition-colors"
      :class="{ '!text-[#02282C]': route.path === '/' }">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      <span class="text-[10px] font-semibold">{{ tr.home }}</span>
    </NuxtLink>

    <NuxtLink :to="authStore.isLoggedIn ? '/account/favorites' : '/login'" class="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#02282C] transition-colors"
      :class="{ '!text-[#02282C]': route.path === '/account/favorites' }">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
      </svg>
      <span class="text-[10px] font-semibold">{{ tr.favorites }}</span>
    </NuxtLink>

    <NuxtLink :to="authStore.isLoggedIn ? '/account/create' : '/login'" class="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#02282C] transition-colors"
      :class="{ '!text-[#02282C]': route.path === '/account/create' }">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
      </svg>
      <span class="text-[10px] font-semibold">{{ tr.create }}</span>
    </NuxtLink>

    <NuxtLink :to="authStore.isLoggedIn ? '/account/messages' : '/login'" class="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#02282C] transition-colors"
      :class="{ '!text-[#02282C]': route.path === '/account/messages' }">
      <span class="relative">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span v-if="unreadCount > 0"
          class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>
      </span>
      <span class="text-[10px] font-semibold">{{ tr.chat }}</span>
    </NuxtLink>

    <NuxtLink :to="authStore.isLoggedIn ? '/account/profile' : '/login'"
      class="flex-1 flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-[#02282C] transition-colors"
      :class="{ '!text-[#02282C]': route.path.startsWith('/account/profile') || route.path === '/account/settings' || route.path === '/login' }">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      <span class="text-[10px] font-semibold">{{ tr.profile }}</span>
    </NuxtLink>

  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const route = useRoute()
const authStore = useAuthStore()
const { unreadCount } = useUnreadCount()
const { isVisible } = useScrollDirection()
const { t } = useLocale()
const pinned = computed(() => route.path === '/account/messages')
const tr = computed(() => ({
  home: t('nav.home'),
  create: t('nav.create'),
  favorites: t('nav.favorites'),
  chat: t('nav.chat'),
  profile: t('nav.profile'),
}))
</script>
