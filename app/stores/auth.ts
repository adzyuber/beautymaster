import { defineStore } from 'pinia'
import { ofetch } from 'ofetch'

interface User {
  id: number
  name: string
  email: string
  phone?: string
  organization?: string | null
  website?: string | null
  avatarUrl?: string | null
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loaded: false
  }),
  getters: {
    isLoggedIn: (s) => !!s.user,
    isAdmin: (s) => s.user?.role === 'admin'
  },
  actions: {
    async fetchUser() {
      try {
        const user = await ofetch<User>('/api/auth/me')
        this.user = user
      } catch {
        this.user = null
      } finally {
        this.loaded = true
      }
    },
    async login(login: string, password: string) {
      const res = await ofetch<{ user: User }>('/api/auth/login', {
        method: 'POST',
        body: { login, password }
      })
      this.user = res.user
      return res
    },
    async register(data: { name: string; email: string; password: string; organization?: string }) {
      const res = await ofetch<{ user: User }>('/api/auth/register', {
        method: 'POST',
        body: data
      })
      this.user = res.user
      return res
    },
    async logout() {
      await ofetch('/api/auth/logout', { method: 'POST' })
      this.user = null
    },
    async resetPassword(token: string, password: string) {
      const res = await ofetch<{ user: User }>('/api/auth/reset-password', {
        method: 'POST',
        body: { token, password }
      })
      this.user = res.user
      return res
    }
  }
})
