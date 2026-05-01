export function useScrollDirection() {
  const isVisible = ref(true)
  let lastY = 0
  let ticking = false

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const currentY = window.scrollY
      if (currentY < 50 || currentY < lastY) {
        isVisible.value = true
      } else if (currentY > lastY + 8) {
        isVisible.value = false
      }
      lastY = currentY
      ticking = false
    })
  }

  onMounted(() => {
    lastY = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  return { isVisible }
}
