<template>
  <AuthShell :title="t('reset.title')" :subtitle="t('reset.subtitle')">
    <div v-if="!token" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-4 rounded">
      {{ t('reset.invalidLink') }}
    </div>

    <form v-else @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-[#2D4D3A] mb-1.5">{{ t('reset.password') }}</label>
        <div class="relative">
          <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required minlength="6" autocomplete="new-password" enterkeyhint="next"
            class="w-full rounded border border-gray-200 bg-white px-4 py-3.5 pr-12 text-base text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
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
      <div>
        <label class="block text-sm font-medium text-[#2D4D3A] mb-1.5">{{ t('reset.confirm') }}</label>
        <div class="relative">
          <input v-model="form.confirm" :type="showConfirm ? 'text' : 'password'" required minlength="6" autocomplete="new-password" enterkeyhint="go"
            class="w-full rounded border border-gray-200 bg-white px-4 py-3.5 pr-12 text-base text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
          <button type="button" @click="showConfirm = !showConfirm"
            :aria-label="showConfirm ? t('auth.hidePassword') : t('auth.showPassword')"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#2D4D3A] transition-colors">
            <svg v-if="!showConfirm" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
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
        {{ loading ? t('reset.loading') : t('reset.submit') }}
      </button>
    </form>

    <p class="text-center text-sm mt-8">
      <NuxtLink to="/login" class="text-[#2D4D3A] font-semibold hover:underline">{{ t('reset.backToLogin') }}</NuxtLink>
    </p>
  </AuthShell>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: false })

const { t, tError } = useLocale()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const token = computed(() => {
  const t = route.query.token
  return typeof t === 'string' && /^[a-f0-9]{64}$/i.test(t) ? t : ''
})

const form = reactive({ password: '', confirm: '' })
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)

async function submit() {
  error.value = ''
  if (form.password !== form.confirm) {
    error.value = t('reset.mismatch')
    return
  }
  loading.value = true
  try {
    await authStore.resetPassword(token.value, form.password)
    router.push('/account/profile')
  } catch (e: any) {
    error.value = tError(e, 'reset.error')
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: () => `${t('reset.title')} — BeautyMaster` })
</script>
