<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">Мои объявления</h1>
      <NuxtLink to="/account/create"
        class="bg-[#2D4D3A] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3d6650] transition-all">
        + Разместить
      </NuxtLink>
    </div>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <NuxtLink to="/login" class="bg-[#2D4D3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">Войти</NuxtLink>
    </div>

    <div v-else-if="pending" class="space-y-4">
      <div v-for="i in 3" :key="i" class="bg-white rounded-[18px] h-24 animate-pulse"></div>
    </div>

    <div v-else-if="!data?.ads?.length" class="text-center py-20 bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
      <div class="text-5xl mb-4">📋</div>
      <p class="text-lg font-medium text-[#2D4D3A]">У вас нет объявлений</p>
      <p class="text-sm text-[#5B5B5B] mt-1 mb-6">Разместите своё первое объявление</p>
      <NuxtLink to="/account/create"
        class="bg-[#2D4D3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3d6650] transition-all">
        Создать объявление
      </NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div v-for="ad in data.ads" :key="ad.id"
        class="bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-5 flex gap-4 items-center">
        <div class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
          <img v-if="ad.images?.[0]" :src="ad.images[0].imageUrl" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-2xl">📷</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-[#2D4D3A] truncate">{{ ad.title }}</div>
          <div class="text-sm text-[#5B5B5B] mt-0.5">{{ ad.subcategory }} · {{ ad.city }}</div>
          <div class="flex items-center gap-3 mt-2">
            <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full',
              ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500']">
              {{ ad.status === 'active' ? 'Активно' : 'Неактивно' }}
            </span>
            <span class="text-xs text-gray-400">{{ formatDate(ad.createdAt) }}</span>
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <NuxtLink :to="`/ad/${ad.slug}`"
            class="text-xs px-3 py-1.5 bg-[#8FD9A8]/20 text-[#2D4D3A] rounded-lg hover:bg-[#8FD9A8]/40 font-medium transition-all">
            Просмотр
          </NuxtLink>
          <NuxtLink :to="`/account/edit/${ad.id}`"
            class="text-xs px-3 py-1.5 bg-gray-100 text-[#5B5B5B] rounded-lg hover:bg-gray-200 font-medium transition-all">
            Изменить
          </NuxtLink>
          <button @click="deleteAd(ad.id)"
            class="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 font-medium transition-all">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const { data, pending, refresh } = await useFetch('/api/ads/my')

async function deleteAd(id: number) {
  if (!confirm('Удалить объявление?')) return
  await $fetch(`/api/ads/${id}`, { method: 'DELETE' })
  refresh()
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

useSeoMeta({ title: 'Мои объявления — MedBeauty Board' })
</script>
