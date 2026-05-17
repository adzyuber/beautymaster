<template>
  <AuthShell :title="t('forgot.title')" :subtitle="t('forgot.subtitle')">
    <div v-if="sent" class="bg-[#E8F8F7] border border-[#1EC3BD]/40 text-[#02282C] text-sm px-4 py-4 rounded">
      {{ t('forgot.sent') }}
    </div>

    <form v-else @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-[#2D4D3A] mb-1.5">{{ t('forgot.email') }}</label>
        <input v-model="email" type="email" required autocomplete="email" inputmode="email" enterkeyhint="go"
          class="w-full rounded border border-gray-200 bg-white px-4 py-3.5 text-base text-[#2D2D2D] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded">
        {{ error }}
      </div>

      <button type="submit" :disabled="loading"
        class="w-full bg-[#02282C] text-white py-3.5 rounded font-bold text-[15px] shadow-sm hover:bg-[#011a1d] hover:shadow-md transition-all disabled:opacity-50 disabled:hover:bg-[#02282C]">
        {{ loading ? t('forgot.loading') : t('forgot.submit') }}
      </button>
    </form>

    <p class="text-center text-sm mt-8">
      <NuxtLink to="/login" class="text-[#2D4D3A] font-semibold hover:underline">{{ t('forgot.backToLogin') }}</NuxtLink>
    </p>
  </AuthShell>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { t, locale, tError } = useLocale()
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
