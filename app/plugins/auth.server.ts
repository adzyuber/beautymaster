import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const event = nuxtApp.ssrContext?.event
  if (!event) return

  const cookieHeader = event.node.req.headers.cookie || ''
  const authStore = useAuthStore()

  try {
    const user = await $fetch('/api/auth/me', {
      headers: { cookie: cookieHeader }
    }) as any

    authStore.$patch({ user: user || null, loaded: true })
  } catch {
    authStore.$patch({ loaded: true })
  }
})
