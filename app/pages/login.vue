<template>
  <div class="h-dvh flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded shadow-[0_8px_32px_rgba(45,77,58,0.12)] p-8 w-full max-w-md relative">
      <div class="absolute top-4 right-4 flex items-center gap-2 text-sm font-bold">
        <button @click="setLocale('ru')"
          :class="locale === 'ru' ? 'text-[#2D4D3A]' : 'text-gray-300 hover:text-gray-400'"
          class="transition-colors">RU</button>
        <span class="text-gray-200">|</span>
        <button @click="setLocale('en')"
          :class="locale === 'en' ? 'text-[#2D4D3A]' : 'text-gray-300 hover:text-gray-400'"
          class="transition-colors">EN</button>
      </div>
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 justify-center">
          <img src="/logo.png" alt="Med&Beauty" class="h-10 w-auto">
          <span class="text-2xl font-bold text-[#1EC3BD]">Med<span class="text-[#2D2D2D]">&Beauty</span></span>
        </NuxtLink>
        <h1 class="text-xl font-bold text-[#2D4D3A] mt-4">{{ t('login.title') }}</h1>
        <p class="text-[#5B5B5B] text-sm mt-1">{{ t('login.subtitle') }}</p>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('login.label') }}</label>
          <input v-model="form.login" type="text" required
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('login.password') }}</label>
          <input v-model="form.password" type="password" required
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] py-3 rounded font-bold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all disabled:opacity-50">
          {{ loading ? t('login.loading') : t('login.submit') }}
        </button>
      </form>

      <p class="text-center text-sm text-[#5B5B5B] mt-6">
        {{ t('login.noAccount') }}
        <NuxtLink to="/register" class="text-[#2D4D3A] font-semibold hover:underline">{{ t('login.register') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })

const { t, locale, setLocale } = useLocale()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const form = reactive({ login: '', password: '' })
const loading = ref(false)
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.login, form.password)
    const redirect = route.query.redirect as string | undefined
    router.push(redirect || '/account/profile')
  } catch (e: any) {
    error.value = e.data?.message || t('login.error')
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: 'Вход — MedBeauty Board' })
</script>
