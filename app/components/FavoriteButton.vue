<template>
  <button
    type="button"
    @click.stop.prevent="onClick"
    :aria-label="active ? t('favorites.remove') : t('favorites.add')"
    :title="!authStore.isLoggedIn ? t('favorites.loginToSave') : (active ? t('favorites.remove') : t('favorites.add'))"
    :class="['relative inline-flex items-center justify-center select-none transition-colors duration-150', sizeClass, variantClass]"
    :disabled="busy"
  >
    <svg
      :class="['shrink-0 transition-transform duration-200', iconClass, { 'scale-110': pulsing }]"
      :fill="active ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const props = withDefaults(defineProps<{
  adId: number | undefined | null
  variant?: 'overlay' | 'inline' | 'plain'
  size?: 'sm' | 'md' | 'lg'
}>(), { variant: 'inline', size: 'md' })

const { t } = useLocale()
const authStore = useAuthStore()
const { isFavorite, toggle } = useFavorites()
const route = useRoute()
const router = useRouter()

const busy = ref(false)
const pulsing = ref(false)

const active = computed(() => !!props.adId && isFavorite(props.adId))

const sizeClass = computed(() => {
  if (props.variant === 'overlay') {
    return props.size === 'lg' ? 'w-11 h-11' : 'w-10 h-10'
  }
  if (props.size === 'sm') return 'w-7 h-7'
  if (props.size === 'lg') return 'w-10 h-10'
  return 'w-8 h-8'
})

const iconClass = computed(() => {
  if (props.size === 'sm') return 'w-4 h-4'
  if (props.size === 'lg') return 'w-6 h-6'
  return 'w-[22px] h-[22px]'
})

const variantClass = computed(() => {
  if (props.variant === 'overlay') {
    return [
      'rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white',
      active.value ? 'text-red-500' : 'text-[#02282C]'
    ].join(' ')
  }
  if (props.variant === 'plain') {
    return active.value ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'
  }
  return [
    'rounded-full active:scale-95',
    active.value
      ? 'bg-red-100 text-red-500 hover:bg-red-200'
      : 'bg-[#e2ebe7] text-[#2D4D3A] hover:bg-[#d4ddd9]'
  ].join(' ')
})

async function onClick() {
  if (!props.adId || busy.value) return
  if (!authStore.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  busy.value = true
  pulsing.value = true
  try {
    await toggle(props.adId)
  } finally {
    busy.value = false
    setTimeout(() => { pulsing.value = false }, 220)
  }
}
</script>
