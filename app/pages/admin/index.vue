<template>
  <!-- Login form for unauthenticated -->
  <div v-if="!authStore.isAdmin" class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white rounded shadow-[0_8px_32px_rgba(45,77,58,0.12)] p-8 w-full max-w-md">
      <div class="mb-8">
        <div class="flex items-center justify-center gap-3 mb-3">
          <img src="/logo.png" alt="Med&Beauty" class="h-12 w-12 object-contain">
          <div class="text-2xl font-bold">
            <span class="text-[#2D4D3A]">Med</span><span class="text-[#1EC3BD]">&amp;</span><span class="text-[#2D4D3A]">Beauty</span>
          </div>
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
        <img src="/logo.png" alt="Med&Beauty" class="h-10 w-10 object-contain">
        <div>
          <div class="text-xl font-bold">
            <span class="text-[#2D4D3A]">Med</span><span class="text-[#1EC3BD]">&amp;</span><span class="text-[#2D4D3A]">Beauty</span>
          </div>
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

    <div class="grid sm:grid-cols-2 gap-6">
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
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({ layout: 'admin' })
useSeoMeta({ title: 'Admin — MedBeauty Board' })

const authStore = useAuthStore()
const form = reactive({ login: '', password: '' })
const loginError = ref('')
const loginPending = ref(false)
const data = ref<any>(null)
const pending = ref(false)

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

onMounted(() => {
  if (authStore.isAdmin) loadStats()
})
</script>
