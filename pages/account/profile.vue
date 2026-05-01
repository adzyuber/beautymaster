<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-2xl font-bold text-[#2D4D3A] mb-8">Мой профиль</h1>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <p class="text-[#5B5B5B] mb-4">Для просмотра профиля необходимо войти</p>
      <NuxtLink to="/login" class="bg-[#2D4D3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">Войти</NuxtLink>
    </div>

    <div v-else class="space-y-6">
      <!-- Profile card -->
      <div class="bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-[#2D4D3A] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {{ authStore.user?.name?.charAt(0).toUpperCase() }}
          </div>
          <div>
            <div class="text-xl font-bold text-[#2D4D3A]">{{ authStore.user?.name }}</div>
            <div class="text-[#5B5B5B] text-sm">{{ authStore.user?.email }}</div>
          </div>
        </div>

        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Имя</label>
            <input v-model="form.name" type="text" required
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Организация</label>
            <input v-model="form.organization" type="text" placeholder="Необязательно"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
          </div>
          <div class="text-sm text-[#5B5B5B]">
            <span class="font-medium">Email:</span> {{ authStore.user?.email }} •
            <span class="font-medium">Телефон:</span> {{ authStore.user?.phone }}
          </div>

          <div v-if="saved" class="bg-green-50 text-green-700 text-sm px-4 py-2 rounded-xl">Профиль сохранён ✓</div>

          <button type="submit" :disabled="saving"
            class="bg-[#2D4D3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3d6650] transition-all disabled:opacity-50">
            {{ saving ? 'Сохраняем...' : 'Сохранить' }}
          </button>
        </form>
      </div>

      <!-- Quick links -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NuxtLink to="/account/ads"
          class="bg-white rounded-[18px] p-5 shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all group">
          <div class="text-2xl mb-2">📋</div>
          <div class="font-semibold text-[#2D4D3A] group-hover:text-[#3d6650]">Мои объявления</div>
        </NuxtLink>
        <NuxtLink to="/account/create"
          class="bg-white rounded-[18px] p-5 shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all group">
          <div class="text-2xl mb-2">➕</div>
          <div class="font-semibold text-[#2D4D3A] group-hover:text-[#3d6650]">Создать объявление</div>
        </NuxtLink>
        <NuxtLink to="/account/messages"
          class="bg-white rounded-[18px] p-5 shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all group">
          <div class="text-2xl mb-2">💬</div>
          <div class="font-semibold text-[#2D4D3A] group-hover:text-[#3d6650]">Сообщения</div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

const form = reactive({
  name: authStore.user?.name || '',
  organization: authStore.user?.organization || ''
})

const saving = ref(false)
const saved = ref(false)

async function save() {
  saving.value = true
  saved.value = false
  try {
    const user = await $fetch('/api/auth/profile', { method: 'PUT', body: form }) as any
    authStore.user = { ...authStore.user!, ...user }
    saved.value = true
    setTimeout(() => saved.value = false, 3000)
  } finally {
    saving.value = false
  }
}

watch(() => authStore.user, (u) => {
  if (u) { form.name = u.name; form.organization = u.organization || '' }
}, { immediate: true })

useSeoMeta({ title: 'Мой профиль — MedBeauty Board' })
</script>
