<template>
  <header class="bg-[#02282C] shadow-sm fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-[72px]">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/logo.png" alt="BeautyMaster" class="h-12 w-auto brightness-0 invert">
          <span class="text-2xl font-bold text-[#1EC3BD]">Beauty<span class="text-white">Master</span></span>
        </NuxtLink>

        <!-- Auth + locale -->
        <div class="flex items-center gap-6">
          <template v-if="authStore.isLoggedIn">
            <!-- Chat link (desktop only) -->
            <NuxtLink to="/account/messages"
              class="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white transition-colors font-medium text-base">
              <span class="relative">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span v-if="unreadCount > 0"
                  class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {{ unreadCount > 99 ? '99+' : unreadCount }}
                </span>
              </span>
              <span>{{ t('nav.chat') }}</span>
            </NuxtLink>
            <!-- Bell (desktop only) -->
            <button class="hidden sm:flex items-center text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 2 C12 2 13.5 2 13.5 3.5 C16.5 4.5 19 7.5 19 11 V16 L21.5 19 H2.5 L5 16 V11 C5 7.5 7.5 4.5 10.5 3.5 C10.5 2 12 2 12 2 Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 19 A2.5 2.5 0 0 0 14.5 19" />
              </svg>
            </button>
            <!-- Locale switcher -->
            <div class="hidden sm:flex items-center gap-2 text-base font-bold">
              <button @click="setLocale('ru')"
                :class="locale === 'ru' ? 'text-white' : 'text-white/50 hover:text-white'"
                class="transition-colors">RU</button>
              <span class="text-white/30">|</span>
              <button @click="setLocale('en')"
                :class="locale === 'en' ? 'text-white' : 'text-white/50 hover:text-white'"
                class="transition-colors">EN</button>
            </div>
            <!-- Place ad -->
            <NuxtLink to="/account/create"
              class="hidden sm:inline-flex items-center gap-1 bg-white text-[#02282C] border-2 border-white px-5 py-2.5 rounded font-extrabold text-base hover:bg-gray-400 hover:border-gray-400 transition-all">
              {{ t('nav.place') }}
            </NuxtLink>
            <!-- User dropdown -->
            <div class="relative" ref="dropdownRef">
              <button @click="open = !open"
                class="flex items-center gap-2 text-base font-medium text-white hover:opacity-70 transition-opacity">
                <div class="w-8 h-8 rounded-full bg-[#8FD9A8] text-[#2D4D3A] flex items-center justify-center font-bold text-xs overflow-hidden">
                  <img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ authStore.user?.name?.charAt(0).toUpperCase() }}</span>
                </div>
                <span class="hidden sm:block">{{ authStore.user?.name }}</span>
              </button>
              <div v-if="open"
                class="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border border-gray-100 py-1 z-50">
                <NuxtLink to="/account/profile" @click="open=false" class="block px-4 py-2 text-sm hover:bg-gray-50">{{ t('nav.profile') }}</NuxtLink>
                <NuxtLink to="/account/ads" @click="open=false" class="block px-4 py-2 text-sm hover:bg-gray-50">{{ t('nav.myAds') }}</NuxtLink>
                <NuxtLink to="/account/messages" @click="open=false" class="block px-4 py-2 text-sm hover:bg-gray-50">{{ t('nav.messages') }}</NuxtLink>
                <template v-if="authStore.isAdmin">
                  <hr class="my-1">
                  <NuxtLink to="/admin" @click="open=false" class="block px-4 py-2 text-sm font-semibold text-[#2D4D3A] hover:bg-gray-50">{{ t('nav.admin') }}</NuxtLink>
                </template>
                <hr class="my-1">
                <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">{{ t('nav.logout') }}</button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login"
              class="font-bold text-white hover:text-[#1EC3BD] transition-colors">{{ t('nav.login') }}</NuxtLink>
            <NuxtLink to="/register"
              class="bg-white text-[#2D2D2D] border-2 border-white px-5 py-2.5 rounded font-bold hover:bg-gray-400 hover:border-gray-400 transition-all">
              {{ t('nav.register') }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const { unreadCount } = useUnreadCount()
const router = useRouter()
const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const { locale, setLocale, t } = useLocale()

const hidden = ref(false)
let lastY = 0
onMounted(() => {
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    hidden.value = y > lastY && y > 80
    lastY = y
  }, { passive: true })
})

onClickOutside(dropdownRef, () => { open.value = false })

async function logout() {
  open.value = false
  await authStore.logout()
  router.push('/')
}
</script>
