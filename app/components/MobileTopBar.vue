<template>
  <div v-if="!hideOnRoutes.includes(route.path)" class="sm:hidden fixed top-0 left-0 right-0 z-50 bg-gray-100 px-4 py-3">
    <div class="flex items-center gap-3">
      <div class="flex-1 flex items-center rounded overflow-hidden bg-white shadow">
        <div class="flex items-center pl-4 text-gray-400 shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </div>
        <input v-model="search" type="text" :placeholder="t('mobile.searchPlaceholder')"
          @keyup.enter="goSearch"
          class="flex-1 px-4 py-3.5 text-base text-gray-800 outline-none placeholder-gray-400">
        <button @click="goSearch" class="bg-[#02282C] text-white px-5 py-3.5 shrink-0 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </button>
      </div>
      <NotificationBell :dark="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
const search = ref('')
const route = useRoute()
const router = useRouter()
const { t } = useLocale()
const hideOnRoutes = ['/account/messages', '/account/profile', '/account/create', '/privacy']

function goSearch() {
  if (search.value.trim()) {
    router.push(`/catalog?search=${encodeURIComponent(search.value)}`)
  } else {
    router.push('/catalog')
  }
}
</script>
