<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
    <div class="mb-6 sm:mb-8 flex items-center gap-3">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.myAds') }}</h1>
      <span v-if="data?.ads?.length" class="text-base text-[#5B5B5B]">· {{ data.ads.length }}</span>
      <NuxtLink to="/account/create"
        class="ml-auto inline-flex items-center gap-1.5 bg-[#02282C] text-white border-2 border-[#02282C] px-3 sm:px-4 py-2 rounded font-bold text-sm hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        <span class="hidden sm:inline">{{ t('account.createAd') }}</span>
        <span class="sm:hidden">{{ t('account.createShort') }}</span>
      </NuxtLink>
    </div>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <NuxtLink to="/login"
        class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        {{ t('common.loginRequired') }}
      </NuxtLink>
    </div>

    <div v-else-if="pending" class="space-y-3 lg:space-y-4 max-w-3xl lg:max-w-5xl mx-auto">
      <div v-for="i in 3" :key="i" class="bg-white rounded h-28 lg:h-36 animate-pulse"></div>
    </div>

    <div v-else-if="!data?.ads?.length" class="flex flex-col items-center text-center px-4 py-10 sm:py-16">
      <div class="relative mb-6">
        <div class="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
        <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
          <svg class="w-12 h-12 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2"/>
            <path d="M8 9h8M8 13h8M8 17h5"/>
          </svg>
        </div>
      </div>

      <h2 class="text-xl sm:text-2xl font-bold text-[#2D4D3A]">{{ t('account.noAds') }}</h2>
      <p class="text-sm sm:text-base text-[#5B5B5B] mt-2 max-w-md leading-relaxed">{{ t('account.noAdsHint') }}</p>

      <NuxtLink to="/account/create"
        class="mt-10 inline-flex items-center gap-2 bg-[#02282C] text-white border-2 border-[#02282C] px-8 py-3.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        {{ t('account.createAd') }}
      </NuxtLink>
    </div>

    <ul v-else class="max-w-3xl lg:max-w-5xl mx-auto space-y-3 lg:space-y-4">
      <li v-for="ad in data.ads" :key="ad.id"
        class="group relative flex gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-5 bg-white rounded ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:ring-[#1EC3BD]/20 hover:shadow-[0_4px_12px_rgba(2,40,44,0.06),0_12px_32px_rgba(2,40,44,0.08)]">
        <NuxtLink :to="ad.status === 'active' ? `/ad/${ad.slug}` : `/account/edit/${ad.id}`" class="shrink-0">
          <img v-if="ad.images?.[0]" :src="ad.images[0].imageUrl"
            class="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded object-cover">
          <div v-else class="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded bg-[#E0F7F6] flex items-center justify-center">
            <svg class="w-8 h-8 lg:w-10 lg:h-10 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16v12H4z"/>
              <circle cx="9" cy="11" r="1.5"/>
              <path d="M20 16l-5-5-9 9"/>
            </svg>
          </div>
        </NuxtLink>

        <div class="flex-1 min-w-0">
          <NuxtLink :to="ad.status === 'active' ? `/ad/${ad.slug}` : `/account/edit/${ad.id}`"
            class="block font-bold text-[#2D4D3A] text-base sm:text-lg lg:text-xl leading-tight truncate hover:text-[#02282C] transition-colors">
            {{ ad.title }}
          </NuxtLink>
          <p class="text-xs sm:text-sm text-[#5B5B5B] mt-0.5 lg:mt-1 truncate">{{ catName(ad.category) }} · {{ ad.city }}</p>

          <div class="flex items-center gap-2 mt-2 lg:mt-3 flex-wrap">
            <span :class="['inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded ring-1', statusClass(ad.status)]">
              <span class="w-1.5 h-1.5 rounded-full" :class="statusDotClass(ad.status)" aria-hidden="true"></span>
              {{ statusLabel(ad.status) }}
            </span>
            <span class="text-[11px] sm:text-xs text-[#5B5B5B]/80">{{ formatDate(ad.createdAt) }}</span>
          </div>

          <div v-if="ad.status === 'rejected' && ad.rejectionReason"
            class="mt-2 lg:mt-3 px-2.5 py-1.5 bg-red-50 border border-red-100 rounded text-xs sm:text-sm text-red-600 leading-snug">
            <span class="font-semibold">{{ t('account.rejectionReason') }}:</span> {{ ad.rejectionReason }}
          </div>
        </div>

        <!-- Stacked icon actions on all sizes -->
        <div class="self-start flex flex-col gap-1 lg:gap-1.5 shrink-0">
          <NuxtLink v-if="ad.status === 'active'" :to="`/ad/${ad.slug}`"
            class="w-8 h-8 lg:w-9 lg:h-9 rounded-full text-[#5B5B5B]/70 hover:text-[#1EC3BD] hover:bg-[#F0FFFE] transition-colors flex items-center justify-center"
            :title="t('account.view')" :aria-label="t('account.view')">
            <svg class="w-4 h-4 lg:w-[18px] lg:h-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </NuxtLink>
          <NuxtLink :to="`/account/edit/${ad.id}`"
            class="w-8 h-8 lg:w-9 lg:h-9 rounded-full text-[#5B5B5B]/70 hover:text-[#02282C] hover:bg-[#F0FFFE] transition-colors flex items-center justify-center"
            :title="ad.status === 'rejected' ? t('account.fixAndResubmit') : t('account.editAd')"
            :aria-label="ad.status === 'rejected' ? t('account.fixAndResubmit') : t('account.editAd')">
            <svg class="w-4 h-4 lg:w-[18px] lg:h-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/>
              <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </NuxtLink>
          <button type="button" @click="askDelete(ad)"
            class="w-8 h-8 lg:w-9 lg:h-9 rounded-full text-[#5B5B5B]/50 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
            :title="t('account.deleteAd')" :aria-label="t('account.deleteAd')">
            <svg class="w-4 h-4 lg:w-[18px] lg:h-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13a2 2 0 002 2h8a2 2 0 002-2l1-13M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/>
            </svg>
          </button>
        </div>
      </li>
    </ul>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="adToDelete" class="fixed inset-0 z-[60] bg-[#02282C]/40 backdrop-blur-[2px] flex items-center justify-center px-4"
          @click.self="adToDelete = null">
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2 scale-[0.98]"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-[0.98]">
            <div v-if="adToDelete"
              class="relative bg-white rounded ring-1 ring-black/5 shadow-[0_8px_24px_rgba(2,40,44,0.12),0_2px_8px_rgba(2,40,44,0.06)] w-full max-w-md overflow-hidden">
              <button type="button" @click="adToDelete = null"
                class="absolute top-3 right-3 w-8 h-8 rounded-full text-[#5B5B5B]/60 hover:text-[#02282C] hover:bg-[#F0FFFE] transition-colors flex items-center justify-center"
                :aria-label="t('common.cancel')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
              <div class="px-6 pt-9 pb-2 flex flex-col items-center text-center">
                <div class="relative mb-5">
                  <div class="absolute inset-0 -m-5 rounded-full bg-gradient-to-br from-[#FFE6E0] via-[#FFF1EC] to-transparent blur-xl" aria-hidden="true"></div>
                  <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF1EC] to-white flex items-center justify-center ring-1 ring-[#F4B59F]/30">
                    <svg class="w-10 h-10 text-[#E5734B]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13a2 2 0 002 2h8a2 2 0 002-2l1-13M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-[#2D4D3A]">{{ t('account.deleteAdTitle') }}</h3>
                <p class="text-sm text-[#5B5B5B] mt-2 leading-relaxed max-w-sm">
                  {{ t('account.deleteAdDesc', { title: adToDelete.title }) }}
                </p>
              </div>
              <div class="px-6 pt-5 pb-6 flex flex-col sm:flex-row-reverse gap-2.5">
                <button type="button" @click="confirmDelete" :disabled="deleting"
                  class="flex-1 px-5 py-3 rounded font-bold text-white bg-[#02282C] hover:bg-[#011a1d] transition-colors disabled:opacity-50">
                  {{ deleting ? '...' : t('account.delete') }}
                </button>
                <button type="button" @click="adToDelete = null" :disabled="deleting"
                  class="flex-1 px-5 py-3 rounded font-bold text-[#02282C] ring-1 ring-black/10 hover:bg-[#F0FFFE] hover:ring-[#1EC3BD]/30 transition-all disabled:opacity-50">
                  {{ t('common.cancel') }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t, locale } = useLocale()
const { getCategory } = await useCategories()
const authStore = useAuthStore()
const { data, pending, refresh } = await useFetch<{ ads: any[] }>('/api/ads/my', {
  default: () => ({ ads: [] })
})

const adToDelete = ref<any>(null)
const deleting = ref(false)

function catName(slug: string) {
  const c = getCategory(slug)
  return locale.value === 'en' ? c.nameEn : c.nameRu
}

function askDelete(ad: any) {
  adToDelete.value = ad
}

async function confirmDelete() {
  if (!adToDelete.value) return
  deleting.value = true
  try {
    await $fetch(`/api/ads/${adToDelete.value.id}`, { method: 'DELETE' })
    adToDelete.value = null
    refresh()
  } finally {
    deleting.value = false
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long' })
}

function statusClass(status: string) {
  if (status === 'active') return 'bg-[#F0FFFE] text-[#02282C] ring-[#1EC3BD]/30'
  if (status === 'pending') return 'bg-amber-50 text-amber-700 ring-amber-200'
  if (status === 'rejected') return 'bg-red-50 text-red-600 ring-red-100'
  return 'bg-[#f1f5f4] text-[#5B5B5B] ring-black/10'
}

function statusDotClass(status: string) {
  if (status === 'active') return 'bg-[#1EC3BD]'
  if (status === 'pending') return 'bg-amber-500'
  if (status === 'rejected') return 'bg-red-500'
  return 'bg-[#5B5B5B]/50'
}

function statusLabel(status: string) {
  if (status === 'active') return t('account.active')
  if (status === 'pending') return t('account.pending')
  if (status === 'rejected') return t('account.rejected')
  return t('account.inactive')
}

useSeoMeta({ title: () => `${t('account.myAds')} — BeautyMaster` })
</script>
