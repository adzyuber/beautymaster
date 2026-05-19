<template>
  <div>
    <div class="sm:hidden flex items-center gap-3 px-4 py-4 border-b border-black/5 bg-white">
      <button @click="goBack" class="text-[#5B5B5B] hover:text-[#02282C] transition-colors" :aria-label="t('account.edit.back')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.settings.title') }}</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:py-10">
      <div class="hidden sm:flex items-center gap-3 mb-6 sm:mb-8">
        <NuxtLink to="/account/profile"
          class="w-9 h-9 rounded-full flex items-center justify-center text-[#5B5B5B] hover:text-[#02282C] hover:bg-[#F0FFFE] transition-colors"
          :aria-label="t('account.edit.back')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.settings.title') }}</h1>
      </div>

      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <NuxtLink to="/login"
          class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
          {{ t('common.loginRequired') }}
        </NuxtLink>
      </div>

      <div v-else class="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <!-- Appearance -->
        <section class="bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] overflow-hidden">
          <div class="px-5 sm:px-6 py-3 border-b border-black/5">
            <h2 class="text-sm font-bold text-[#2D4D3A] uppercase tracking-wide">{{ t('account.settings.appearance') }}</h2>
          </div>
          <div class="flex items-center justify-between px-5 sm:px-6 py-4">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>
                </svg>
              </div>
              <div class="min-w-0">
                <div class="font-bold text-[#2D4D3A] text-sm">{{ t('account.language') }}</div>
                <div class="text-xs text-[#5B5B5B] mt-0.5 truncate">{{ t('account.settings.languageHint') }}</div>
              </div>
            </div>
            <div class="flex items-center gap-1 bg-[#f1f5f4] rounded-full p-1 shrink-0">
              <button @click="setLocale('ru')"
                :class="locale === 'ru' ? 'bg-white text-[#02282C] shadow-sm' : 'text-[#5B5B5B]'"
                class="px-3.5 py-1 rounded-full text-xs font-bold transition-all">RU</button>
              <button @click="setLocale('en')"
                :class="locale === 'en' ? 'bg-white text-[#02282C] shadow-sm' : 'text-[#5B5B5B]'"
                class="px-3.5 py-1 rounded-full text-xs font-bold transition-all">EN</button>
            </div>
          </div>
        </section>

        <!-- Account -->
        <section class="bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] overflow-hidden">
          <div class="px-5 sm:px-6 py-3 border-b border-black/5">
            <h2 class="text-sm font-bold text-[#2D4D3A] uppercase tracking-wide">{{ t('account.settings.account') }}</h2>
          </div>
          <NuxtLink to="/account/profile/edit"
            class="group flex items-center gap-4 px-5 sm:px-6 py-4 transition-colors hover:bg-[#F0FFFE]/60 border-b border-black/5">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/>
                <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-[#2D4D3A] text-sm">{{ t('account.edit.title') }}</div>
              <div class="text-xs text-[#5B5B5B] mt-0.5 truncate">{{ t('account.settings.editHint') }}</div>
            </div>
            <svg class="w-5 h-5 text-[#5B5B5B]/40 group-hover:text-[#1EC3BD] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          <button @click="logout" class="w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors text-left">
            <div class="w-10 h-10 rounded-full bg-red-50 ring-1 ring-red-100 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-sm">{{ t('nav.logout') }}</div>
              <div class="text-xs text-red-400 mt-0.5 truncate">{{ t('account.settings.logoutHint') }}</div>
            </div>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t, locale, setLocale } = useLocale()
const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  await authStore.logout()
  router.push('/')
}

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/account/profile')
}

useSeoMeta({ title: () => `${t('account.settings.title')} — BeautyMaster` })
</script>
