<template>
  <div class="min-h-dvh flex bg-white">
    <!-- Left: form column -->
    <div class="flex-1 flex flex-col px-6 py-6 sm:px-10 lg:px-12 xl:px-20 lg:w-1/2">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="inline-flex items-center gap-2 lg:hidden">
          <img src="/logo.png" alt="BeautyMaster" class="h-8 w-auto">
          <span class="text-xl font-bold text-[#1EC3BD]">Beauty<span class="text-[#2D2D2D]">Master</span></span>
        </NuxtLink>
        <NuxtLink to="/" class="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B5B5B] hover:text-[#2D4D3A] transition-colors">
          {{ t('auth.backHome') }}
        </NuxtLink>
        <div class="flex items-center gap-2 text-sm font-bold">
          <button @click="setLocale('ru')"
            :class="locale === 'ru' ? 'text-[#2D4D3A]' : 'text-gray-300 hover:text-gray-400'"
            class="transition-colors">RU</button>
          <span class="text-gray-200">|</span>
          <button @click="setLocale('en')"
            :class="locale === 'en' ? 'text-[#2D4D3A]' : 'text-gray-300 hover:text-gray-400'"
            class="transition-colors">EN</button>
        </div>
      </div>

      <div class="flex-1 flex items-center">
        <div class="w-full max-w-md mx-auto py-10">
          <h1 class="text-3xl font-bold text-[#2D4D3A] leading-tight">{{ title }}</h1>
          <p v-if="subtitle" class="text-[#5B5B5B] mt-2 text-[15px]">{{ subtitle }}</p>
          <div class="mt-8">
            <slot />
          </div>
        </div>
      </div>
    </div>

    <!-- Right: brand panel (desktop only) -->
    <aside class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#011a1d] via-[#02282C] to-[#2D4D3A]">
      <div class="absolute -top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#1EC3BD]/40 blur-3xl"></div>
      <div class="absolute -bottom-48 -left-24 w-[32rem] h-[32rem] rounded-full bg-[#1EC3BD]/25 blur-3xl"></div>
      <div class="absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-[#1EC3BD]/15 blur-3xl"></div>

      <div class="relative w-full flex flex-col justify-between p-12 xl:p-16 text-white">
        <NuxtLink to="/" class="inline-flex items-center gap-3">
          <img src="/logo.png" alt="BeautyMaster" class="h-10 w-auto brightness-0 invert">
          <span class="text-2xl font-bold tracking-tight"><span class="text-[#1EC3BD]">Beauty</span>Master</span>
        </NuxtLink>

        <div class="max-w-md space-y-7">
          <h2 class="text-4xl xl:text-5xl font-bold leading-[1.1] whitespace-pre-line">{{ t('auth.hero.title') }}</h2>
          <p class="text-white/85 text-lg leading-relaxed">{{ t('auth.hero.subtitle') }}</p>
          <ul class="space-y-3.5 pt-2">
            <li v-for="key in features" :key="key" class="flex items-start gap-3">
              <span class="inline-flex w-7 h-7 rounded-lg bg-white/15 backdrop-blur items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="text-white/95 text-[15px] leading-relaxed">{{ t(key) }}</span>
            </li>
          </ul>
        </div>

        <p class="text-sm text-white/55">{{ t('footer.rights') }}</p>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
const { t, locale, setLocale } = useLocale()
const features = ['auth.hero.feature1', 'auth.hero.feature2', 'auth.hero.feature3']
</script>
