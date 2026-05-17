<template>
  <AuthShell :title="t('login.title')" :subtitle="t('login.subtitle')">
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-[#2D4D3A] mb-1.5">{{ t('login.label') }}</label>
        <input v-model="form.login" type="text" required autocomplete="username"
          class="w-full rounded border border-gray-200 bg-white px-4 py-3.5 text-[15px] text-[#2D2D2D] placeholder:text-gray-300 transition-colors focus:border-[#1EC3BD] focus:outline-none focus:ring-4 focus:ring-[#1EC3BD]/25">
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="block text-sm font-medium text-[#2D4D3A]">{{ t('login.password') }}</label>
          <NuxtLink to="/forgot-password" class="text-xs font-semibold text-[#1EC3BD] hover:text-[#02282C] transition-colors">{{ t('login.forgot') }}</NuxtLink>
        </div>
        <div class="relative">
          <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required autocomplete="current-password"
            class="w-full rounded border border-gray-200 bg-white px-4 py-3.5 pr-12 text-[15px] text-[#2D2D2D] transition-colors focus:border-[#1EC3BD] focus:outline-none focus:ring-4 focus:ring-[#1EC3BD]/25">
          <button type="button" @click="showPassword = !showPassword"
            :aria-label="showPassword ? t('auth.hidePassword') : t('auth.showPassword')"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#2D4D3A] transition-colors">
            <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029M9.88 9.88a3 3 0 104.243 4.243M9.88 9.88l4.243 4.243M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411M3 3l18 18"/>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded">
        {{ error }}
      </div>

      <button type="submit" :disabled="loading"
        class="w-full bg-[#02282C] text-white py-3.5 rounded font-bold text-[15px] shadow-sm hover:bg-[#011a1d] hover:shadow-md transition-all disabled:opacity-50 disabled:hover:bg-[#02282C]">
        {{ loading ? t('login.loading') : t('login.submit') }}
      </button>
    </form>

    <p class="text-center text-sm text-[#5B5B5B] mt-8">
      {{ t('login.noAccount') }}
      <NuxtLink to="/register" class="text-[#2D4D3A] font-semibold hover:underline ml-1">{{ t('login.register') }}</NuxtLink>
    </p>
  </AuthShell>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })

const { t, tError } = useLocale()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const form = reactive({ login: '', password: '' })
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.login, form.password)
    const redirect = route.query.redirect as string | undefined
    router.push(redirect || '/account/profile')
  } catch (e: any) {
    error.value = tError(e, 'login.error')
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: () => `${t('login.title')} — BeautyMaster` })
</script>
