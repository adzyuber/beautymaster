export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap' },
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'medbeauty-secret',
    public: {}
  },
  nitro: {
    experimental: {
      asyncContext: true
    }
  }
})
