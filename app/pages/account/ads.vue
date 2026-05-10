<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.myAds') }}</h1>
    </div>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <NuxtLink to="/login" class="bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] px-6 py-2.5 rounded font-bold">{{ t('common.loginRequired') }}</NuxtLink>
    </div>

    <div v-else-if="pending" class="space-y-4">
      <div v-for="i in 3" :key="i" class="bg-white rounded h-24 animate-pulse"></div>
    </div>

    <div v-else-if="!data?.ads?.length" class="text-center py-20 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
      <div class="text-5xl mb-4">📋</div>
      <p class="text-lg font-medium text-[#2D4D3A]">{{ t('account.noAds') }}</p>
      <p class="text-sm text-[#5B5B5B] mt-1 mb-6">{{ t('account.noAdsHint') }}</p>
      <NuxtLink to="/account/create"
        class="bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] px-6 py-2.5 rounded font-bold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all">
        {{ t('account.createAd') }}
      </NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div v-for="ad in data.ads" :key="ad.id"
        class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <!-- image + info -->
        <div class="flex gap-4 items-center flex-1 min-w-0">
          <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded overflow-hidden shrink-0">
            <img v-if="ad.images?.[0]" :src="ad.images[0].imageUrl" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-2xl">📷</div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-[#2D4D3A] truncate">{{ ad.title }}</div>
            <div class="text-sm text-[#5B5B5B] mt-0.5">{{ tCat(ad.category) }} · {{ ad.city }}</div>
            <div class="flex items-center gap-3 mt-2">
              <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full',
                ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500']">
                {{ ad.status === 'active' ? t('account.active') : t('account.inactive') }}
              </span>
              <span class="text-xs text-gray-400">{{ formatDate(ad.createdAt) }}</span>
            </div>
          </div>
        </div>
        <!-- actions -->
        <div class="flex gap-2 sm:shrink-0">
          <NuxtLink :to="`/ad/${ad.slug}`"
            class="flex-1 sm:flex-none text-center text-sm px-3 py-2 bg-[#8FD9A8]/20 text-[#2D4D3A] rounded hover:bg-[#8FD9A8]/40 font-medium transition-all">
            {{ t('account.view') }}
          </NuxtLink>
          <NuxtLink :to="`/account/edit/${ad.id}`"
            class="flex-1 sm:flex-none text-center text-sm px-3 py-2 bg-gray-100 text-[#5B5B5B] rounded hover:bg-gray-200 font-medium transition-all">
            {{ t('account.editAd') }}
          </NuxtLink>
          <button @click="deleteAd(ad.id)"
            class="flex-1 sm:flex-none text-sm px-3 py-2 bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium transition-all">
            {{ t('account.deleteAd') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t, tCat, locale } = useLocale()
const authStore = useAuthStore()
const { data, pending, refresh } = await useFetch('/api/ads/my')

async function deleteAd(id: number) {
  if (!confirm(t('common.deleteConfirm'))) return
  await $fetch(`/api/ads/${id}`, { method: 'DELETE' })
  refresh()
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long' })
}

useSeoMeta({ title: 'Мои объявления — BeautyMaster' })
</script>
