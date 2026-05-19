<template>
  <div>
    <!-- Mobile sticky header -->
    <div class="sm:hidden flex items-center gap-3 px-4 py-4 border-b border-black/5 bg-white">
      <h1 class="text-2xl font-bold text-[#2D4D3A] flex-1">{{ t('account.profile') }}</h1>
      <NuxtLink to="/account/settings"
        class="w-9 h-9 rounded-full flex items-center justify-center text-[#5B5B5B] hover:text-[#02282C] hover:bg-[#F0FFFE] transition-colors"
        :aria-label="t('account.settings.title')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 0 002.591 1.073 1.724 1.724 0 012.37 2.37 1.724 1.724 0 001.072 2.592 1.724 1.724 0 010 3.35 1.724 1.724 0 00-1.073 2.591 1.724 1.724 0 01-2.37 2.37 1.724 1.724 0 00-2.592 1.072 1.724 1.724 0 01-3.35 0 1.724 1.724 0 00-2.591-1.073 1.724 1.724 0 01-2.37-2.37 1.724 1.724 0 00-1.072-2.592 1.724 1.724 0 010-3.35 1.724 1.724 0 001.073-2.591 1.724 1.724 0 012.37-2.37 1.724 1.724 0 002.591-1.073z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </NuxtLink>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:py-10">
      <!-- Desktop header row -->
      <div class="hidden sm:flex items-center gap-3 mb-6 sm:mb-8">
        <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.profile') }}</h1>
        <NuxtLink to="/account/settings"
          class="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-[#5B5B5B] hover:text-[#02282C] transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 0 002.591 1.073 1.724 1.724 0 012.37 2.37 1.724 1.724 0 001.072 2.592 1.724 1.724 0 010 3.35 1.724 1.724 0 00-1.073 2.591 1.724 1.724 0 01-2.37 2.37 1.724 1.724 0 00-2.592 1.072 1.724 1.724 0 01-3.35 0 1.724 1.724 0 00-2.591-1.073 1.724 1.724 0 01-2.37-2.37 1.724 1.724 0 00-1.072-2.592 1.724 1.724 0 010-3.35 1.724 1.724 0 001.073-2.591 1.724 1.724 0 012.37-2.37 1.724 1.724 0 002.591-1.073z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          {{ t('account.settings.title') }}
        </NuxtLink>
      </div>

      <!-- Guest state -->
      <div v-if="!authStore.isLoggedIn" class="flex flex-col items-center text-center px-4 py-10 sm:py-16">
        <div class="relative mb-6">
          <div class="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
          <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
            <svg class="w-12 h-12 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 14a4 4 0 10-8 0M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"/>
              <circle cx="12" cy="8" r="4"/>
            </svg>
          </div>
        </div>
        <p class="text-[#5B5B5B] mb-6 max-w-md">{{ t('account.loginHint') }}</p>
        <NuxtLink to="/login"
          class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
          {{ t('common.loginRequired') }}
        </NuxtLink>
      </div>

      <div v-else class="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <!-- Hero card -->
        <section class="relative bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] overflow-hidden">
          <div class="absolute inset-x-0 top-0 h-48 sm:h-56 bg-gradient-to-b from-[#E0F7F6] via-[#F0FFFE]/60 to-transparent" aria-hidden="true"></div>
          <div class="relative px-5 sm:px-7 pt-8 pb-5 sm:pt-10 sm:pb-6 flex flex-col items-center text-center">
            <div class="relative">
              <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex items-center justify-center ring-4 ring-white shadow-[0_4px_16px_rgba(2,40,44,0.08)]"
                :style="userColor(authStore.user?.name)">
                <img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" class="w-full h-full object-cover">
                <span v-else class="text-3xl sm:text-4xl font-bold">{{ authStore.user?.name?.charAt(0).toUpperCase() }}</span>
              </div>
              <NuxtLink to="/account/profile/edit"
                class="absolute -bottom-1 -right-1 w-9 h-9 bg-gradient-to-br from-[#1EC3BD] to-[#19a8a3] rounded-full flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(30,195,189,0.35)] ring-2 ring-white hover:from-[#19a8a3] hover:to-[#168f8b]"
                :aria-label="t('account.edit.title')">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/>
                  <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </NuxtLink>
            </div>
            <h2 class="mt-4 text-xl sm:text-2xl font-bold text-[#2D4D3A] truncate max-w-full">{{ authStore.user?.name }}</h2>
            <p v-if="authStore.user?.organization" class="text-sm text-[#02282C] mt-0.5 truncate max-w-full">{{ authStore.user.organization }}</p>
            <p class="text-sm text-[#5B5B5B] mt-0.5 truncate max-w-full">{{ authStore.user?.email }}</p>

            <div class="mt-4 flex flex-wrap gap-2 justify-center">
              <NuxtLink to="/account/profile/edit"
                class="inline-flex items-center gap-1.5 bg-[#02282C] text-white border-2 border-[#02282C] px-4 py-2 rounded font-bold text-sm hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/>
                  <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                {{ t('account.edit.title') }}
              </NuxtLink>
              <NuxtLink to="/account/ads"
                class="inline-flex items-center gap-1.5 bg-white text-[#02282C] border-2 border-black/10 px-4 py-2 rounded font-bold text-sm hover:border-[#1EC3BD]/50 hover:text-[#02282C] transition-all">
                {{ t('account.myAds') }}
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- Completeness card -->
        <section v-if="completeness.missing.length"
          class="bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] p-5 sm:p-6">
          <div class="flex items-start gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-baseline justify-between gap-2">
                <h3 class="text-base font-bold text-[#2D4D3A]">{{ t('account.hub.completeness') }}</h3>
                <span class="text-sm font-bold text-[#1EC3BD]">{{ completeness.filled }}/{{ completeness.total }}</span>
              </div>
              <p class="text-xs text-[#5B5B5B] mt-0.5">{{ t('account.hub.completenessHint') }}</p>
              <div class="mt-3 h-2 rounded-full bg-[#f1f5f4] overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#1EC3BD] to-[#0fb8b1] transition-all duration-500"
                  :style="{ width: `${(completeness.filled / completeness.total) * 100}%` }"></div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <NuxtLink v-for="m in completeness.missing" :key="m.key"
              :to="`/account/profile/edit#${m.key}`"
              class="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-white border border-[#1EC3BD]/30 text-[#02282C] hover:bg-gradient-to-br hover:from-[#F0FFFE] hover:to-white hover:border-[#1EC3BD]/60 transition-all">
              <svg class="w-3.5 h-3.5 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              {{ m.label }}
            </NuxtLink>
          </div>
        </section>

        <!-- Stats -->
        <section class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <NuxtLink v-for="s in stats" :key="s.to" :to="s.to"
            class="group relative bg-white rounded ring-1 ring-black/5 p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:ring-[#1EC3BD]/20 hover:shadow-[0_4px_12px_rgba(2,40,44,0.06),0_12px_32px_rgba(2,40,44,0.08)]">
            <div class="flex items-center justify-between mb-2">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0 transition-all group-hover:ring-[#1EC3BD]/30">
                <svg class="w-5 h-5 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true" v-html="s.icon"></svg>
              </div>
              <span v-if="s.badge" class="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-[#1EC3BD] text-white">{{ s.badge > 99 ? '99+' : s.badge }}</span>
            </div>
            <div class="text-2xl sm:text-3xl font-bold text-[#2D4D3A] leading-tight">{{ s.value }}</div>
            <div class="text-xs sm:text-sm text-[#5B5B5B] mt-0.5 truncate">{{ s.label }}</div>
            <div v-if="s.sublabel" class="text-[11px] text-[#5B5B5B]/80 mt-0.5 truncate">{{ s.sublabel }}</div>
          </NuxtLink>
        </section>

        <!-- Quick actions -->
        <section class="bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] overflow-hidden">
          <NuxtLink v-for="(link, idx) in quickLinks" :key="link.to" :to="link.to"
            class="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#F0FFFE]/60 active:bg-[#F0FFFE]"
            :class="{ 'border-t border-black/5': idx > 0 }">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0 transition-all group-hover:ring-[#1EC3BD]/30">
              <svg class="w-5 h-5 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true" v-html="link.icon"></svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-[#2D4D3A] text-sm sm:text-base">{{ link.label }}</div>
              <div class="text-xs text-[#5B5B5B] mt-0.5 truncate">{{ link.hint }}</div>
            </div>
            <svg class="w-5 h-5 text-[#5B5B5B]/40 group-hover:text-[#1EC3BD] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </section>

        <!-- Admin card -->
        <NuxtLink v-if="authStore.isAdmin" to="/admin"
          class="group flex items-center gap-4 p-4 bg-[#02282C] rounded ring-1 ring-black/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(2,40,44,0.16),0_12px_32px_rgba(2,40,44,0.22)]">
          <div class="w-12 h-12 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 0 002.591 1.073 1.724 1.724 0 012.37 2.37 1.724 1.724 0 001.072 2.592 1.724 1.724 0 010 3.35 1.724 1.724 0 00-1.073 2.591 1.724 1.724 0 01-2.37 2.37 1.724 1.724 0 00-2.592 1.072 1.724 1.724 0 01-3.35 0 1.724 1.724 0 00-2.591-1.073 1.724 1.724 0 01-2.37-2.37 1.724 1.724 0 00-1.072-2.592 1.724 1.724 0 010-3.35 1.724 1.724 0 001.073-2.591 1.724 1.724 0 012.37-2.37 1.724 1.724 0 002.591-1.073z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-white">Admin panel</div>
            <div class="text-xs text-white/60 mt-0.5">{{ t('account.adminPanelHint') }}</div>
          </div>
          <svg class="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { userColor } from '~/utils/userColor'
import { parseLanguages } from '~/utils/languages'
const { t } = useLocale()
const authStore = useAuthStore()

const { data: statsData, refresh: refreshStats } = await useFetch<{
  ads: { total: number; active: number; pending: number; rejected: number; inactive: number }
  favorites: number
  messages: { unread: number }
  notifications: { unread: number }
}>('/api/account/stats', {
  default: () => ({ ads: { total: 0, active: 0, pending: 0, rejected: 0, inactive: 0 }, favorites: 0, messages: { unread: 0 }, notifications: { unread: 0 } }),
  immediate: authStore.isLoggedIn
})

watch(() => authStore.isLoggedIn, (loggedIn) => {
  if (loggedIn) refreshStats()
})

onMounted(() => {
  if (authStore.isLoggedIn) refreshStats()
})

const completeness = computed(() => {
  const u = authStore.user
  const checks = [
    { key: 'avatar', filled: !!u?.avatarUrl, label: t('account.hub.addAvatar') },
    { key: 'phone', filled: !!u?.phone, label: t('account.hub.addPhone') },
    { key: 'org', filled: !!u?.organization, label: t('account.hub.addOrg') },
    { key: 'website', filled: !!u?.website, label: t('account.hub.addWebsite') },
    { key: 'languages', filled: parseLanguages(u?.languages).length > 0, label: t('account.hub.addLanguages') }
  ]
  const filled = checks.filter(c => c.filled).length
  const missing = checks.filter(c => !c.filled)
  return { filled, total: checks.length, missing }
})

const stats = computed(() => {
  const s = statsData.value
  return [
    {
      to: '/account/ads',
      label: t('account.hub.statsAds'),
      sublabel: s.ads.pending ? t('account.hub.adsPending', { n: s.ads.pending }) : (s.ads.total ? t('account.hub.adsTotal', { n: s.ads.total }) : t('account.hub.adsNone')),
      value: s.ads.active,
      badge: s.ads.rejected || 0,
      icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>'
    },
    {
      to: '/account/messages',
      label: t('account.hub.statsMessages'),
      sublabel: s.messages.unread ? t('account.hub.unread') : t('account.hub.upToDate'),
      value: s.messages.unread,
      badge: 0,
      icon: '<path d="M21 12a8 8 0 01-11.8 7.04L4 20l1.04-5.2A8 8 0 1121 12z"/>'
    },
    {
      to: '/account/favorites',
      label: t('account.hub.statsFavorites'),
      sublabel: s.favorites ? t('account.hub.favoritesSaved') : t('account.hub.favoritesNone'),
      value: s.favorites,
      badge: 0,
      icon: '<path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>'
    },
    {
      to: '/account/notifications',
      label: t('account.hub.statsNotifications'),
      sublabel: s.notifications.unread ? t('account.hub.unread') : t('account.hub.upToDate'),
      value: s.notifications.unread,
      badge: 0,
      icon: '<path d="M12 3a6 6 0 016 6v3.586l1.707 1.707A1 1 0 0119 16H5a1 1 0 01-.707-1.707L6 12.586V9a6 6 0 016-6z"/><path d="M10 19a2 2 0 004 0"/>'
    }
  ]
})

const quickLinks = computed(() => [
  {
    to: '/account/create',
    label: t('account.createAd'),
    hint: t('account.createAdHint'),
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'
  },
  {
    to: '/account/ads',
    label: t('account.myAds'),
    hint: t('account.myAdsHint'),
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>'
  },
  {
    to: '/account/favorites',
    label: t('favorites.title'),
    hint: t('account.favoritesHint'),
    icon: '<path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>'
  }
])

useSeoMeta({ title: () => `${t('account.profile')} — BeautyMaster` })
</script>
