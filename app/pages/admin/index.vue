<template>
  <!-- Login form for unauthenticated -->
  <div v-if="!authStore.isAdmin" class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded shadow-[0_8px_32px_rgba(45,77,58,0.12)] p-8 w-full max-w-md">
      <div class="mb-8">
        <div class="flex items-center justify-center gap-3 mb-3">
          <img src="/logo.png" alt="BeautyMaster" class="h-12 w-12 object-contain">
          <div class="text-2xl font-bold text-[#2D4D3A]">BeautyMaster</div>
        </div>
        <h1 class="text-xl font-bold text-[#2D4D3A] text-center">Admin panel sign in</h1>
      </div>
      <form @submit.prevent="login" class="space-y-4">
        <input v-model="form.login" type="text" placeholder="Email or phone" required
          class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        <input v-model="form.password" type="password" placeholder="Password" required
          class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        <div v-if="loginError" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded">
          {{ loginError }}
        </div>
        <button type="submit" :disabled="loginPending"
          class="w-full bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] py-3 rounded font-bold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all disabled:opacity-50">
          {{ loginPending ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>

  <!-- Admin dashboard -->
  <div v-else class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="BeautyMaster" class="h-10 w-10 object-contain">
        <div>
          <div class="text-xl font-bold text-[#2D4D3A]">BeautyMaster</div>
          <h1 class="text-sm font-semibold text-[#5B5B5B] leading-tight">Admin panel</h1>
        </div>
      </div>
      <div class="flex gap-2">
        <NuxtLink to="/admin/users" class="text-sm px-4 py-2 bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] rounded font-semibold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all">Users</NuxtLink>
        <NuxtLink to="/admin/ads" class="text-sm px-4 py-2 bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] rounded font-semibold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all">Listings</NuxtLink>
      </div>
    </div>

    <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-white rounded h-28 animate-pulse"></div>
    </div>

    <div v-else-if="data" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6 text-center">
        <div class="text-3xl font-bold text-[#2D4D3A]">{{ data.users }}</div>
        <div class="text-sm text-[#5B5B5B] mt-1">Users</div>
      </div>
      <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6 text-center">
        <div class="text-3xl font-bold text-[#2D4D3A]">{{ data.ads }}</div>
        <div class="text-sm text-[#5B5B5B] mt-1">Listings</div>
      </div>
      <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6 text-center">
        <div class="text-3xl font-bold text-green-600">{{ data.activeAds }}</div>
        <div class="text-sm text-[#5B5B5B] mt-1">Active</div>
      </div>
      <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6 text-center">
        <div class="text-3xl font-bold text-[#2D4D3A]">{{ data.messages }}</div>
        <div class="text-sm text-[#5B5B5B] mt-1">Messages</div>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-6 mb-6">
      <NuxtLink to="/admin/users"
        class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-8 hover:shadow-md transition-shadow group">
        <div class="text-4xl mb-3">👥</div>
        <div class="text-lg font-bold text-[#2D4D3A] group-hover:underline">User management</div>
        <div class="text-sm text-[#5B5B5B] mt-1">View, change roles and delete users</div>
      </NuxtLink>
      <NuxtLink to="/admin/ads"
        class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-8 hover:shadow-md transition-shadow group">
        <div class="text-4xl mb-3">📋</div>
        <div class="text-lg font-bold text-[#2D4D3A] group-hover:underline">Listing moderation</div>
        <div class="text-sm text-[#5B5B5B] mt-1">View all listings, change status and delete</div>
      </NuxtLink>
    </div>

    <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6">
      <div class="text-sm font-bold text-[#2D4D3A] mb-4">Notifications</div>
      <label class="flex items-center gap-3 cursor-pointer select-none">
        <button type="button" role="switch" :aria-checked="emailNotificationsEnabled"
          @click="toggleEmailNotifications"
          :class="emailNotificationsEnabled ? 'bg-[#1EC3BD]' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] focus:ring-offset-2">
          <span :class="emailNotificationsEnabled ? 'translate-x-5' : 'translate-x-1'"
            class="inline-block h-4 w-4 mt-1 rounded-full bg-white shadow transition-transform" />
        </button>
        <span class="text-sm text-[#2D2D2D]">Email notifications for new messages</span>
        <span v-if="settingsSaving" class="text-xs text-[#5B5B5B]">Saving...</span>
        <span v-else-if="settingsSaved" class="text-xs text-green-600">Saved</span>
      </label>
      <p class="text-xs text-[#5B5B5B] mt-2 ml-14">When disabled, users will not receive email alerts about new messages.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: 'admin' })
useSeoMeta({ title: 'Admin — BeautyMaster' })

const authStore = useAuthStore()
const form = reactive({ login: '', password: '' })
const loginError = ref('')
const loginPending = ref(false)
const data = ref<any>(null)
const pending = ref(false)
const emailNotificationsEnabled = ref(true)
const settingsSaving = ref(false)
const settingsSaved = ref(false)

async function login() {
  loginPending.value = true
  loginError.value = ''
  try {
    await authStore.login(form.login, form.password)
    if (!authStore.isAdmin) {
      loginError.value = 'No admin rights'
      await authStore.logout()
      return
    }
    await loadStats()
  } catch (e: any) {
    loginError.value = e.data?.message || 'Sign in error'
  } finally {
    loginPending.value = false
  }
}

async function loadStats() {
  pending.value = true
  try {
    data.value = await $fetch('/api/admin/stats')
  } finally {
    pending.value = false
  }
}

async function loadSettings() {
  const s = await $fetch<Record<string, string>>('/api/admin/settings')
  emailNotificationsEnabled.value = s.emailNotificationsEnabled === 'true'
}

async function toggleEmailNotifications() {
  emailNotificationsEnabled.value = !emailNotificationsEnabled.value
  settingsSaving.value = true
  settingsSaved.value = false
  try {
    await $fetch('/api/admin/settings', {
      method: 'PATCH',
      body: { emailNotificationsEnabled: String(emailNotificationsEnabled.value) }
    })
    settingsSaved.value = true
    setTimeout(() => { settingsSaved.value = false }, 2000)
  } catch {
    emailNotificationsEnabled.value = !emailNotificationsEnabled.value
  } finally {
    settingsSaving.value = false
  }
}

onMounted(() => {
  if (authStore.isAdmin) {
    loadStats()
    loadSettings()
  }
})
</script>
