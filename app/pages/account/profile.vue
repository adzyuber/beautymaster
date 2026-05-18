<template>
  <div>
    <div class="sm:hidden flex items-center gap-3 px-4 py-4 border-b border-gray-100 bg-white">
      <button @click="router.back()" class="text-gray-500 hover:text-gray-800 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-[#02282C]">{{ t('account.profile') }}</h1>
    </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:py-10">
    <h1 class="hidden sm:block text-2xl font-bold text-[#02282C] mb-8">{{ t('account.profile') }}</h1>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <p class="text-[#5B5B5B] mb-4">{{ t('account.loginHint') }}</p>
      <NuxtLink to="/login" class="bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] px-6 py-2.5 rounded font-bold">{{ t('common.loginRequired') }}</NuxtLink>
    </div>

    <div v-else class="space-y-6">
      <!-- Profile card -->
      <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6">
        <div class="flex items-center gap-5 mb-6">
          <!-- Avatar -->
          <div class="relative shrink-0">
            <div class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
              :style="userColor(authStore.user?.name)">
              <img v-if="authStore.user?.avatarUrl" :src="authStore.user.avatarUrl" class="w-full h-full object-cover">
              <span v-else class="text-2xl font-bold">{{ authStore.user?.name?.charAt(0).toUpperCase() }}</span>
            </div>
            <label class="absolute -bottom-1 -right-1 w-7 h-7 bg-[#8FD9A8] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all shadow-sm"
              :title="t('account.avatarChange')">
              <svg v-if="!avatarUploading" class="w-3.5 h-3.5 text-[#2D4D3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <svg v-else class="w-3.5 h-3.5 text-[#2D4D3A] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <input type="file" accept="image/*" class="hidden" @change="uploadAvatar" :disabled="avatarUploading">
            </label>
          </div>
          <div>
            <div class="text-xl font-bold text-[#2D4D3A]">{{ authStore.user?.name }}</div>
            <div class="text-[#5B5B5B] text-sm">{{ authStore.user?.email }}</div>
            <button v-if="authStore.user?.avatarUrl" @click="removeAvatar"
              class="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors">
              {{ t('account.avatarRemove') }}
            </button>
          </div>
        </div>

        <form @submit.prevent="save" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.name') }}</label>
            <input v-model="form.name" type="text" required
              class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.org') }}</label>
            <input v-model="form.organization" type="text" :placeholder="t('account.orgHint')"
              class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.website') }}</label>
            <input v-model="form.website" type="url" :placeholder="t('account.websiteHint')"
              class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.phone') }}</label>
            <input v-model="form.phone" type="tel" placeholder="+421 9XX XXX XXX"
              class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('account.languages') }}</label>
            <p class="text-xs text-[#5B5B5B] mb-2">{{ t('account.languagesHint') }}</p>
            <div class="flex flex-wrap gap-2">
              <button v-for="lang in languages" :key="lang.code" type="button"
                @click="toggleLanguage(lang.code)"
                :class="[
                  'inline-flex items-center px-3 py-1.5 rounded text-sm font-medium border transition-all',
                  form.languages.includes(lang.code)
                    ? 'bg-[#02282C] text-white border-[#02282C]'
                    : 'bg-white text-[#5B5B5B] border-gray-200 hover:border-[#1EC3BD]'
                ]">
                {{ labelFor(lang.code, locale === 'en' ? 'en' : 'ru') }}
              </button>
            </div>
          </div>

          <div v-if="saved" class="bg-green-50 text-green-700 text-sm px-4 py-2 rounded">{{ t('account.saved') }}</div>

          <button type="submit" :disabled="saving"
            class="bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] px-6 py-2.5 rounded font-bold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all disabled:opacity-50">
            {{ saving ? t('account.saving') : t('account.save') }}
          </button>
        </form>
      </div>

      <!-- Quick links — desktop grid -->
      <div class="hidden sm:grid sm:grid-cols-3 gap-4">
        <NuxtLink to="/account/ads"
          class="bg-white rounded p-5 shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all group">
          <div class="text-2xl mb-2">📋</div>
          <div class="font-semibold text-[#2D4D3A] group-hover:text-[#3d6650]">{{ t('account.myAds') }}</div>
        </NuxtLink>
        <NuxtLink to="/account/create"
          class="bg-white rounded p-5 shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all group">
          <div class="text-2xl mb-2">➕</div>
          <div class="font-semibold text-[#2D4D3A] group-hover:text-[#3d6650]">{{ t('account.createAd') }}</div>
        </NuxtLink>
        <NuxtLink to="/account/messages"
          class="bg-white rounded p-5 shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all group">
          <div class="text-2xl mb-2">💬</div>
          <div class="font-semibold text-[#2D4D3A] group-hover:text-[#3d6650]">{{ t('account.messages') }}</div>
        </NuxtLink>
        <NuxtLink v-if="authStore.isAdmin" to="/admin"
          class="bg-[#02282C] rounded p-5 shadow-[0_2px_16px_rgba(45,77,58,0.07)] hover:shadow-[0_8px_32px_rgba(45,77,58,0.14)] transition-all group">
          <div class="text-2xl mb-2">⚙️</div>
          <div class="font-semibold text-white group-hover:text-white/80">Admin panel</div>
        </NuxtLink>
      </div>

      <!-- Quick links — mobile list -->
      <div class="sm:hidden bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden">
        <NuxtLink to="/account/ads" class="flex items-center gap-4 px-5 py-4 active:bg-gray-50 transition-colors border-b border-gray-100">
          <span class="text-xl w-7 text-center">📋</span>
          <span class="flex-1 font-semibold text-[#2D4D3A]">{{ t('account.myAds') }}</span>
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </NuxtLink>
        <NuxtLink to="/account/create" class="flex items-center gap-4 px-5 py-4 active:bg-gray-50 transition-colors border-b border-gray-100">
          <span class="text-xl w-7 text-center">➕</span>
          <span class="flex-1 font-semibold text-[#2D4D3A]">{{ t('account.createAd') }}</span>
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </NuxtLink>
        <NuxtLink to="/account/messages" class="flex items-center gap-4 px-5 py-4 active:bg-gray-50 transition-colors" :class="{ 'border-b border-gray-100': authStore.isAdmin }">
          <span class="text-xl w-7 text-center">💬</span>
          <span class="flex-1 font-semibold text-[#2D4D3A]">{{ t('account.messages') }}</span>
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </NuxtLink>
        <NuxtLink v-if="authStore.isAdmin" to="/admin" class="flex items-center gap-4 px-5 py-4 active:bg-gray-50 transition-colors bg-[#02282C]">
          <span class="text-xl w-7 text-center">⚙️</span>
          <span class="flex-1 font-semibold text-white">Admin panel</span>
          <svg class="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </NuxtLink>
      </div>

      <!-- Settings group (mobile only) -->
      <div class="sm:hidden bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span class="text-sm font-semibold text-[#5B5B5B] uppercase tracking-wide">{{ t('account.language') }}</span>
          <div class="flex items-center gap-1 bg-gray-100 rounded-full p-1">
            <button @click="setLocale('ru')"
              :class="locale === 'ru' ? 'bg-white text-[#2D4D3A] shadow-sm' : 'text-gray-400'"
              class="px-4 py-1.5 rounded-full text-sm font-bold transition-all">RU</button>
            <button @click="setLocale('en')"
              :class="locale === 'en' ? 'bg-white text-[#2D4D3A] shadow-sm' : 'text-gray-400'"
              class="px-4 py-1.5 rounded-full text-sm font-bold transition-all">EN</button>
          </div>
        </div>
        <button @click="logout" class="w-full flex items-center gap-3 px-5 py-4 text-red-500 active:bg-red-50 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span class="font-semibold">{{ t('nav.logout') }}</span>
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { userColor } from '~/utils/userColor'
import { parseLanguages } from '~/utils/languages'
const { t, locale, setLocale } = useLocale()
const { languages, labelFor, defaultCode } = await useLanguages()
const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  await authStore.logout()
  router.push('/')
}

const form = reactive({
  name: authStore.user?.name || '',
  organization: authStore.user?.organization || '',
  website: authStore.user?.website || '',
  phone: authStore.user?.phone || '',
  languages: parseLanguages(authStore.user?.languages)
})

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
  } finally {
    avatarUploading.value = false
    ;(e.target as HTMLInputElement).value = ''
  }
}

async function removeAvatar() {
  const user = await $fetch('/api/auth/profile', { method: 'PUT', body: { ...form, avatarUrl: null } }) as any
  authStore.user = { ...authStore.user!, avatarUrl: null }
}

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
  if (u) {
    form.name = u.name
    form.organization = u.organization || ''
    form.website = u.website || ''
    form.phone = u.phone || ''
    const parsed = parseLanguages(u.languages)
    form.languages = parsed.length ? parsed : (defaultCode.value ? [defaultCode.value] : [])
  }
}, { immediate: true })

useSeoMeta({ title: 'Мой профиль — BeautyMaster' })
</script>
