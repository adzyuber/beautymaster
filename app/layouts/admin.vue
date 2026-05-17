<template>
  <!-- Unauthenticated: no navbar, centered login -->
  <div v-if="!authStore.isAdmin" class="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
    <slot />
  </div>

  <!-- Authenticated admin -->
  <div v-else class="min-h-screen flex flex-col bg-[#f8faf9]">
    <header class="bg-[#02282C] fixed top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-[72px]">

          <!-- Logo -->
          <NuxtLink to="/admin" class="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="BeautyMaster" class="h-11 w-auto brightness-0 invert">
            <div class="flex items-baseline gap-1.5">
              <span class="text-xl font-bold">
                <span class="text-[#1EC3BD]">Beauty</span><span class="text-white">Master</span>
              </span>
              <span class="text-[10px] font-semibold bg-white/10 text-white/60 px-1.5 py-0.5 rounded tracking-wide">ADMIN</span>
            </div>
          </NuxtLink>

          <!-- Nav links -->
          <nav class="hidden sm:flex items-center gap-1">
            <NuxtLink
              v-for="item in navItems" :key="item.to"
              :to="item.to"
              :class="[
                'relative flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium transition-colors',
                isActive(item.to)
                  ? 'text-white bg-white/10'
                  : 'text-white/65 hover:text-white hover:bg-white/5'
              ]"
            >
              {{ item.label }}
              <span
                v-if="item.badge && pendingAds > 0"
                class="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-amber-400 text-[#02282C] text-[10px] font-bold rounded-full leading-none"
              >{{ pendingAds }}</span>
            </NuxtLink>
          </nav>

          <!-- Right side -->
          <div class="flex items-center gap-3">
            <NuxtLink to="/" class="text-white/50 hover:text-white/80 text-xs sm:text-sm transition-colors">
              ← Site
            </NuxtLink>
            <button
              @click="logout"
              class="text-sm px-4 py-2 border border-white/25 text-white/80 rounded font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile nav -->
      <div class="sm:hidden border-t border-white/10 relative">
        <div ref="mobileNavScroller"
          class="flex py-1.5 px-3 gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <NuxtLink
            v-for="item in navItems" :key="item.to"
            :to="item.to"
            :ref="(el) => setMobileNavRef(item.to, el)"
            :class="[
              'relative shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap',
              isActive(item.to) ? 'text-white bg-white/10' : 'text-white/60 active:text-white'
            ]"
          >
            {{ item.label }}
            <span
              v-if="item.badge && pendingAds > 0"
              class="inline-flex items-center justify-center min-w-[16px] h-4 px-1 bg-amber-400 text-[#02282C] text-[9px] font-bold rounded-full"
            >{{ pendingAds }}</span>
          </NuxtLink>
        </div>
        <!-- Edge fades to hint at scroll affordance -->
        <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#02282C] to-transparent"></div>
        <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#02282C] to-transparent"></div>
      </div>
    </header>

    <main class="flex-1 pt-[120px] sm:pt-[72px]">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const pendingAds = ref(0)

const navItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/ads', label: 'Listings', badge: true },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/languages', label: 'Languages' },
  { to: '/admin/messages', label: 'Messages' },
]

function isActive(path: string) {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const mobileNavScroller = ref<HTMLElement | null>(null)
const mobileNavRefs = new Map<string, HTMLElement>()

function setMobileNavRef(path: string, el: any) {
  const node = (el?.$el ?? el) as HTMLElement | null
  if (node) mobileNavRefs.set(path, node)
  else mobileNavRefs.delete(path)
}

function scrollActiveIntoView(behavior: ScrollBehavior = 'smooth') {
  const scroller = mobileNavScroller.value
  if (!scroller) return
  const activeItem = navItems.find(i => isActive(i.to))
  if (!activeItem) return
  const el = mobileNavRefs.get(activeItem.to)
  if (!el) return
  const target = el.offsetLeft - (scroller.clientWidth - el.offsetWidth) / 2
  scroller.scrollTo({ left: Math.max(0, target), behavior })
}

async function fetchPending() {
  if (!authStore.isAdmin) return
  try {
    const res = await $fetch<any>('/api/admin/stats')
    pendingAds.value = res.pendingAds ?? 0
  } catch {}
}

async function logout() {
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  fetchPending()
  nextTick(() => scrollActiveIntoView('auto'))
})
watch(() => route.path, () => {
  fetchPending()
  nextTick(() => scrollActiveIntoView('smooth'))
})
</script>
