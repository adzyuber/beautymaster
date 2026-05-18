<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
    <div class="mb-6 sm:mb-8 flex items-center gap-2">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('favorites.title') }}</h1>
      <span v-if="ads.length" class="text-base text-[#5B5B5B]">· {{ ads.length }}</span>
    </div>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <p class="text-[#5B5B5B] mb-4">{{ t('favorites.loginToSave') }}</p>
      <NuxtLink to="/login"
        class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        {{ t('common.loginRequired') }}
      </NuxtLink>
    </div>

    <div v-else-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded h-72 animate-pulse"></div>
    </div>

    <div v-else-if="!ads.length"
      class="text-center py-20 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] px-6">
      <div class="w-14 h-14 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-4">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
        </svg>
      </div>
      <p class="text-lg font-semibold text-[#2D4D3A]">{{ t('favorites.empty') }}</p>
      <p class="text-sm text-[#5B5B5B] mt-1 mb-6">{{ t('favorites.emptyHint') }}</p>
      <NuxtLink to="/catalog"
        class="inline-block bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        {{ t('nav.catalog') }}
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <AdCard v-for="ad in ads" :key="ad.id" :ad="ad" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t } = useLocale()
const authStore = useAuthStore()
const { ids } = useFavorites()

const { data: fetched, pending, refresh } = await useFetch<any[]>('/api/favorites/list', {
  default: () => [],
  immediate: authStore.isLoggedIn
})
const ads = computed(() => fetched.value ?? [])

watch(() => authStore.isLoggedIn, (loggedIn) => {
  if (loggedIn) refresh()
  else fetched.value = []
})

watch(ids, (next, prev) => {
  if (!prev) return
  const nextSet = new Set(next)
  if (next.length < prev.length && fetched.value) {
    fetched.value = fetched.value.filter(ad => nextSet.has(ad.id))
  } else if (next.length > prev.length) {
    refresh()
  }
})

useSeoMeta({ title: () => `${t('favorites.title')} — BeautyMaster` })
</script>
