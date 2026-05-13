import { useAuthStore } from '~/stores/auth'

export function useUnreadCount() {
  const unreadCount = useState('unreadCount', () => 0)
  const notifCount = useState('notifCount', () => 0)
  const authStore = useAuthStore()

  async function fetchUnread() {
    if (!authStore.isLoggedIn) { unreadCount.value = 0; notifCount.value = 0; return }
    try {
      const data = await $fetch<{ count: number; notifications: number }>('/api/notifications/unread')
      unreadCount.value = data.count
      notifCount.value = data.notifications
    } catch { unreadCount.value = 0; notifCount.value = 0 }
  }

  watch(() => authStore.isLoggedIn, (loggedIn) => {
    if (loggedIn) fetchUnread()
    else { unreadCount.value = 0; notifCount.value = 0 }
  }, { immediate: true })

  useIntervalFn(fetchUnread, 30_000)

  return { unreadCount, notifCount, fetchUnread }
}
