<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-2xl font-bold text-[#2D4D3A]">Med<span class="text-[#8FD9A8]">Beauty</span></span>
        </NuxtLink>

        <!-- Nav links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-[#5B5B5B]">
          <NuxtLink to="/catalog" class="hover:text-[#2D4D3A] transition-colors">Каталог</NuxtLink>
          <NuxtLink to="/about" class="hover:text-[#2D4D3A] transition-colors">О проекте</NuxtLink>
          <NuxtLink to="/contacts" class="hover:text-[#2D4D3A] transition-colors">Контакты</NuxtLink>
        </nav>

        <!-- Auth buttons -->
        <div class="flex items-center gap-3">
          <template v-if="authStore.isLoggedIn">
            <NuxtLink to="/account/create"
              class="hidden sm:inline-flex items-center gap-1 bg-[#8FD9A8] text-[#2D4D3A] px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#7bcf9a] transition-all">
              + Разместить
            </NuxtLink>
            <div class="relative" ref="dropdownRef">
              <button @click="open = !open"
                class="flex items-center gap-2 text-sm font-medium text-[#2D4D3A] hover:opacity-80 transition-opacity">
                <div class="w-8 h-8 rounded-full bg-[#2D4D3A] text-white flex items-center justify-center font-bold text-xs">
                  {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                </div>
                <span class="hidden sm:block">{{ authStore.user?.name }}</span>
              </button>
              <div v-if="open"
                class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                <NuxtLink to="/account/profile" @click="open=false" class="block px-4 py-2 text-sm hover:bg-gray-50">Мой профиль</NuxtLink>
                <NuxtLink to="/account/ads" @click="open=false" class="block px-4 py-2 text-sm hover:bg-gray-50">Мои объявления</NuxtLink>
                <NuxtLink to="/account/messages" @click="open=false" class="block px-4 py-2 text-sm hover:bg-gray-50">Сообщения</NuxtLink>
                <hr class="my-1">
                <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">Выйти</button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login"
              class="text-sm font-medium text-[#2D4D3A] hover:underline">Войти</NuxtLink>
            <NuxtLink to="/register"
              class="bg-[#2D4D3A] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#3d6650] transition-all">
              Регистрация
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const router = useRouter()
const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => { open.value = false })

async function logout() {
  open.value = false
  await authStore.logout()
  router.push('/')
}
</script>
