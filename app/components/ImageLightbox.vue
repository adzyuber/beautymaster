<template>
  <Teleport to="body">
    <div v-if="open && images.length"
      class="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center select-none"
      @click.self="close"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd">
      <!-- Top bar -->
      <div class="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3 text-white text-sm z-10 pointer-events-none">
        <span v-if="images.length > 1" class="bg-black/40 rounded-full px-3 py-1 font-medium">{{ activeIndex + 1 }} / {{ images.length }}</span>
        <span v-else></span>
        <button @click="close" aria-label="Close"
          class="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center pointer-events-auto transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Prev -->
      <button v-if="images.length > 1" @click="prev" aria-label="Previous"
        class="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center text-white transition-colors z-10">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Image -->
      <img
        :src="images[activeIndex]"
        :alt="alt"
        @click.stop
        class="max-h-[90vh] max-w-[95vw] object-contain"
        draggable="false">

      <!-- Next -->
      <button v-if="images.length > 1" @click="next" aria-label="Next"
        class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 items-center justify-center text-white transition-colors z-10">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Mobile dots -->
      <div v-if="images.length > 1" class="sm:hidden absolute bottom-6 inset-x-0 flex items-center justify-center gap-1.5">
        <span v-for="(_, i) in images" :key="i"
          :class="['w-1.5 h-1.5 rounded-full transition-all', i === activeIndex ? 'bg-white w-4' : 'bg-white/40']"/>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  images: string[]
  initialIndex?: number
  alt?: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const activeIndex = ref(0)
const touchStartX = ref(0)
const touchStartY = ref(0)

watch(() => props.open, (v) => {
  if (v) activeIndex.value = Math.min(Math.max(props.initialIndex ?? 0, 0), Math.max(props.images.length - 1, 0))
  if (typeof document !== 'undefined') document.body.style.overflow = v ? 'hidden' : ''
})

function close() { emit('update:open', false) }
function next() {
  const n = props.images.length
  if (n > 1) activeIndex.value = (activeIndex.value + 1) % n
}
function prev() {
  const n = props.images.length
  if (n > 1) activeIndex.value = (activeIndex.value - 1 + n) % n
}
function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0]?.clientX ?? 0
  touchStartY.value = e.touches[0]?.clientY ?? 0
}
function onTouchEnd(e: TouchEvent) {
  const endX = e.changedTouches[0]?.clientX ?? 0
  const endY = e.changedTouches[0]?.clientY ?? 0
  const dx = endX - touchStartX.value
  const dy = endY - touchStartY.value
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    dx < 0 ? next() : prev()
  } else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) {
    close()
  }
}
function onKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}
onMounted(() => { window.addEventListener('keydown', onKeydown) })
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>
