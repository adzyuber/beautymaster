<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded-[24px] shadow-[0_8px_32px_rgba(45,77,58,0.12)] p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="text-2xl font-bold text-[#2D4D3A]">Med<span class="text-[#8FD9A8]">Beauty</span></NuxtLink>
        <h1 class="text-xl font-bold text-[#2D4D3A] mt-4">Вход в аккаунт</h1>
        <p class="text-[#5B5B5B] text-sm mt-1">Войдите по email или номеру телефона</p>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Email или телефон</label>
          <input v-model="form.login" type="text" placeholder="+7 999 123-45-67 или email@mail.com" required
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Пароль</label>
          <input v-model="form.password" type="password" placeholder="••••••••" required
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-[#2D4D3A] text-white py-3 rounded-xl font-bold hover:bg-[#3d6650] transition-all disabled:opacity-50">
          {{ loading ? 'Входим...' : 'Войти' }}
        </button>
      </form>

      <p class="text-center text-sm text-[#5B5B5B] mt-6">
        Нет аккаунта?
        <NuxtLink to="/register" class="text-[#2D4D3A] font-semibold hover:underline">Зарегистрируйтесь</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })

const authStore = useAuthStore()
const router = useRouter()
const form = reactive({ login: '', password: '' })
const loading = ref(false)
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.login, form.password)
    router.push('/account/profile')
  } catch (e: any) {
    error.value = e.data?.message || 'Ошибка входа'
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: 'Вход — MedBeauty Board' })
</script>
