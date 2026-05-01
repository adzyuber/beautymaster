<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-3xl font-bold text-[#2D4D3A] mb-4">{{ t('about.title') }}</h1>
    <p class="text-[#5B5B5B] text-lg mb-8">{{ t('about.subtitle') }}</p>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
        <div class="text-3xl mb-3">🏥</div>
        <h3 class="font-bold text-[#2D4D3A] text-lg mb-2">{{ t('about.medicine.title') }}</h3>
        <p class="text-[#5B5B5B] text-sm">{{ t('about.medicine.desc') }}</p>
      </div>
      <div class="bg-white rounded p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
        <div class="text-3xl mb-3">💅</div>
        <h3 class="font-bold text-[#2D4D3A] text-lg mb-2">{{ t('about.beauty.title') }}</h3>
        <p class="text-[#5B5B5B] text-sm">{{ t('about.beauty.desc') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
useSeoMeta({ title: 'О проекте — MedBeauty Board' })
</script>
