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
          <img src="/logo.png" alt="BeautyMaster" class="h-10 w-auto">
          <span class="text-2xl font-bold text-[#1EC3BD]">Beauty<span class="text-[#2D2D2D]">Master</span></span>
        </NuxtLink>
        <h1 class="text-xl font-bold text-[#2D4D3A] mt-4">{{ t('forgot.title') }}</h1>
        <p class="text-[#5B5B5B] text-sm mt-1">{{ t('forgot.subtitle') }}</p>
      </div>

      <div v-if="sent" class="bg-[#E8F8F7] border border-[#1EC3BD]/40 text-[#02282C] text-sm px-4 py-4 rounded">
        {{ t('forgot.sent') }}
      </div>

      <form v-else @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('forgot.email') }}</label>
          <input v-model="email" type="email" required autocomplete="email"
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] py-3 rounded font-bold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all disabled:opacity-50">
          {{ loading ? t('forgot.loading') : t('forgot.submit') }}
        </button>
      </form>

      <p class="text-center text-sm text-[#5B5B5B] mt-6">
        <NuxtLink to="/login" class="text-[#2D4D3A] font-semibold hover:underline">{{ t('forgot.backToLogin') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { t, locale, setLocale, tError } = useLocale()
const email = ref('')
const loading = ref(false)
const error = ref('')
const sent = ref(false)

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value, locale: locale.value }
    })
    sent.value = true
  } catch (e: any) {
    error.value = tError(e, 'forgot.error')
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: () => `${t('forgot.title')} — BeautyMaster` })
</script>
