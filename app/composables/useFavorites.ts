import { useAuthStore } from '~/stores/auth'

export function useFavorites() {
  const ids = useState<number[]>('favoriteIds', () => [])
  const loaded = useState<boolean>('favoritesLoaded', () => false)
  const authStore = useAuthStore()

  const idSet = computed(() => new Set(ids.value))
  const count = computed(() => ids.value.length)

  async function fetchFavorites() {
    if (!authStore.isLoggedIn) {
      ids.value = []
      loaded.value = true
      return
    }
    try {
      const data = await $fetch<number[]>('/api/favorites')
      ids.value = Array.isArray(data) ? data : []
    } catch {
      ids.value = []
    } finally {
      loaded.value = true
    }
  }

  function isFavorite(adId: number | undefined | null) {
    if (!adId) return false
    return idSet.value.has(adId)
  }

  async function add(adId: number) {
    if (!authStore.isLoggedIn) return false
    if (idSet.value.has(adId)) return true
    ids.value = [...ids.value, adId]
    try {
      await $fetch(`/api/favorites/${adId}`, { method: 'POST' })
      return true
    } catch {
      ids.value = ids.value.filter(x => x !== adId)
      return false
    }
  }

  async function remove(adId: number) {
    if (!authStore.isLoggedIn) return false
    if (!idSet.value.has(adId)) return true
    ids.value = ids.value.filter(x => x !== adId)
    try {
      await $fetch(`/api/favorites/${adId}`, { method: 'DELETE' })
      return true
    } catch {
      ids.value = [...ids.value, adId]
      return false
    }
  }

  async function toggle(adId: number) {
    if (idSet.value.has(adId)) return remove(adId)
    return add(adId)
  }

  watch(() => authStore.isLoggedIn, (loggedIn) => {
    if (loggedIn) fetchFavorites()
    else { ids.value = []; loaded.value = true }
  }, { immediate: true })

  return { ids, count, loaded, isFavorite, add, remove, toggle, fetchFavorites }
}
