<template>
  <div>
    <!-- Mobile sticky header -->
    <div class="sm:hidden flex items-center gap-3 px-4 py-4 border-b border-black/5 bg-white">
      <button @click="goBack" class="text-[#5B5B5B] hover:text-[#02282C] transition-colors" :aria-label="t('account.edit.back')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.edit.title') }}</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:py-10">
      <div class="hidden sm:flex items-center gap-3 mb-6 sm:mb-8">
        <NuxtLink to="/account/profile"
          class="w-9 h-9 rounded-full flex items-center justify-center text-[#5B5B5B] hover:text-[#02282C] hover:bg-[#F0FFFE] transition-colors"
          :aria-label="t('account.edit.back')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </NuxtLink>
        <h1 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.edit.title') }}</h1>
      </div>

      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <NuxtLink to="/login"
          class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2.5 rounded font-bold hover:bg-[#011a1d] hover:border-[#011a1d] transition-all">
          {{ t('common.loginRequired') }}
        </NuxtLink>
      </div>

      <form v-else @submit.prevent="save" class="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <!-- Photo section -->
        <section id="avatar" class="bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] p-5 sm:p-6">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
            </div>
            <h2 class="text-sm font-bold text-[#2D4D3A] uppercase tracking-wide">{{ t('account.edit.photoSection') }}</h2>
          </div>
          <div class="flex items-center gap-5">
            <div class="relative shrink-0">
              <div class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center ring-1 ring-black/5"
                :style="userColor(authStore.user?.name)">
                <img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" class="w-full h-full object-cover">
                <span v-else class="text-2xl font-bold">{{ authStore.user?.name?.charAt(0).toUpperCase() }}</span>
              </div>
              <label class="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#1EC3BD] to-[#19a8a3] rounded-full flex items-center justify-center cursor-pointer hover:from-[#19a8a3] hover:to-[#168f8b] transition-all shadow-[0_2px_8px_rgba(30,195,189,0.35)] ring-2 ring-white"
                :title="t('account.avatarChange')">
                <svg v-if="!avatarUploading" class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/>
                  <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <svg v-else class="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <input type="file" accept="image/*" class="hidden" @change="uploadAvatar" :disabled="avatarUploading">
              </label>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-[#5B5B5B] leading-relaxed">{{ t('account.edit.photoHint') }}</p>
              <button v-if="authStore.user?.avatarUrl" type="button" @click="removeAvatar"
                class="text-xs text-[#5B5B5B] hover:text-red-500 mt-2 transition-colors">
                {{ t('account.avatarRemove') }}
              </button>
            </div>
          </div>
        </section>

        <!-- Personal section -->
        <section class="bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] p-5 sm:p-6">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"/>
              </svg>
            </div>
            <h2 class="text-sm font-bold text-[#2D4D3A] uppercase tracking-wide">{{ t('account.edit.personalSection') }}</h2>
          </div>
          <div class="space-y-4">
            <div id="name">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.name') }}</label>
              <input v-model="form.name" type="text" required
                class="w-full bg-white border border-black/10 rounded px-4 py-3 text-sm text-[#02282C] placeholder:text-[#5B5B5B]/60 focus:outline-none focus:border-[#1EC3BD] focus:ring-2 focus:ring-[#1EC3BD]/20 transition-all">
            </div>
            <div id="phone">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.phone') }}</label>
              <input v-model="form.phone" type="tel" placeholder="+421 9XX XXX XXX"
                class="w-full bg-white border border-black/10 rounded px-4 py-3 text-sm text-[#02282C] placeholder:text-[#5B5B5B]/60 focus:outline-none focus:border-[#1EC3BD] focus:ring-2 focus:ring-[#1EC3BD]/20 transition-all">
            </div>
            <div id="languages">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.languages') }}</label>
              <p class="text-xs text-[#5B5B5B] mb-2.5">{{ t('account.languagesHint') }}</p>
              <div class="flex flex-wrap gap-2">
                <button v-for="lang in languages" :key="lang.code" type="button"
                  @click="toggleLanguage(lang.code)"
                  :class="[
                    'inline-flex items-center px-3.5 py-1.5 rounded text-sm font-semibold border transition-all',
                    form.languages.includes(lang.code)
                      ? 'bg-gradient-to-br from-[#F0FFFE] to-white text-[#02282C] border-[#1EC3BD]/40 ring-1 ring-[#1EC3BD]/20'
                      : 'bg-white text-[#5B5B5B] border-black/10 hover:border-[#1EC3BD]/40 hover:text-[#02282C]'
                  ]">
                  {{ labelFor(lang.code, locale === 'en' ? 'en' : 'ru') }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Business section -->
        <section class="bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] p-5 sm:p-6">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white ring-1 ring-[#1EC3BD]/10 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 21V8a2 2 0 012-2h14a2 2 0 012 2v13M3 21h18M9 21V11h6v10"/>
              </svg>
            </div>
            <h2 class="text-sm font-bold text-[#2D4D3A] uppercase tracking-wide">{{ t('account.edit.businessSection') }}</h2>
          </div>
          <div class="space-y-4">
            <div id="org">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.org') }}</label>
              <input v-model="form.organization" type="text" :placeholder="t('account.orgHint')"
                class="w-full bg-white border border-black/10 rounded px-4 py-3 text-sm text-[#02282C] placeholder:text-[#5B5B5B]/60 focus:outline-none focus:border-[#1EC3BD] focus:ring-2 focus:ring-[#1EC3BD]/20 transition-all">
            </div>
            <div id="website">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.website') }}</label>
              <input v-model="form.website" type="url" :placeholder="t('account.websiteHint')"
                class="w-full bg-white border border-black/10 rounded px-4 py-3 text-sm text-[#02282C] placeholder:text-[#5B5B5B]/60 focus:outline-none focus:border-[#1EC3BD] focus:ring-2 focus:ring-[#1EC3BD]/20 transition-all">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.email') ?? 'Email' }}</label>
              <input :value="authStore.user?.email" type="email" disabled
                class="w-full bg-[#f8faf9] border border-black/10 rounded px-4 py-3 text-sm text-[#5B5B5B] cursor-not-allowed">
            </div>
          </div>
        </section>

        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-if="saved" class="flex items-center gap-2 bg-gradient-to-br from-[#F0FFFE] to-white ring-1 ring-[#1EC3BD]/30 text-[#02282C] text-sm px-4 py-2.5 rounded">
            <svg class="w-4 h-4 text-[#1EC3BD] shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 13l4 4L19 7"/>
            </svg>
            <span class="font-semibold">{{ t('account.saved') }}</span>
          </div>
        </Transition>

        <!-- Sticky save bar -->
        <div class="sticky bottom-16 sm:bottom-0 pt-2">
          <div class="bg-white/95 backdrop-blur ring-1 ring-black/5 rounded shadow-[0_-2px_16px_rgba(45,77,58,0.06)] p-3 sm:p-4 flex flex-wrap gap-2 items-center">
            <p class="text-xs text-[#5B5B5B] flex-1 min-w-0">{{ dirty ? t('account.edit.unsaved') : t('account.edit.allSaved') }}</p>
            <NuxtLink to="/account/profile"
              class="hidden sm:inline-flex bg-white text-[#02282C] border-2 border-black/10 px-5 py-2 rounded font-bold text-sm hover:border-[#1EC3BD]/50 transition-all">
              {{ t('account.edit.back') }}
            </NuxtLink>
            <button type="submit" :disabled="saving || !dirty"
              class="bg-[#02282C] text-white border-2 border-[#02282C] px-6 py-2 rounded font-bold text-sm hover:bg-[#011a1d] hover:border-[#011a1d] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {{ saving ? t('account.saving') : t('account.save') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { userColor } from '~/utils/userColor'
import { parseLanguages } from '~/utils/languages'
const { t, locale } = useLocale()
const { languages, labelFor, defaultCode } = await useLanguages()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  name: authStore.user?.name || '',
  organization: authStore.user?.organization || '',
  website: authStore.user?.website || '',
  phone: authStore.user?.phone || '',
  languages: parseLanguages(authStore.user?.languages)
})

const snapshot = ref(JSON.stringify(form))
const dirty = computed(() => JSON.stringify(form) !== snapshot.value)

function toggleLanguage(code: string) {
  const idx = form.languages.indexOf(code)
  if (idx >= 0) form.languages.splice(idx, 1)
  else form.languages.push(code)
}

const saving = ref(false)
const saved = ref(false)
const avatarUploading = ref(false)

async function uploadAvatar(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  avatarUploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: fd })
    const user = await $fetch('/api/auth/profile', { method: 'PUT', body: { ...form, avatarUrl: res.url } }) as any
    authStore.user = { ...authStore.user!, ...user }
    snapshot.value = JSON.stringify(form)
  } finally {
    avatarUploading.value = false
    ;(e.target as HTMLInputElement).value = ''
  }
}

async function removeAvatar() {
  await $fetch('/api/auth/profile', { method: 'PUT', body: { ...form, avatarUrl: null } })
  authStore.user = { ...authStore.user!, avatarUrl: null }
}

async function save() {
  if (!dirty.value) return
  saving.value = true
  saved.value = false
  try {
    const user = await $fetch('/api/auth/profile', { method: 'PUT', body: form }) as any
    authStore.user = { ...authStore.user!, ...user }
    snapshot.value = JSON.stringify(form)
    saved.value = true
    setTimeout(() => saved.value = false, 3000)
  } finally {
    saving.value = false
  }
}

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/account/profile')
}

watch(() => authStore.user, (u) => {
  if (u) {
    form.name = u.name
    form.organization = u.organization || ''
    form.website = u.website || ''
    form.phone = u.phone || ''
    const parsed = parseLanguages(u.languages)
    form.languages = parsed.length ? parsed : (defaultCode.value ? [defaultCode.value] : [])
    snapshot.value = JSON.stringify(form)
  }
}, { immediate: true })

onMounted(() => {
  if (route.hash) {
    nextTick(() => {
      const el = document.querySelector(route.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }
})

useSeoMeta({ title: () => `${t('account.edit.title')} — BeautyMaster` })
</script>
