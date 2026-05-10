<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-3xl font-bold text-[#2D4D3A] mb-4">{{ t('contacts.title') }}</h1>
    <p class="text-[#5B5B5B] mb-8">{{ t('contacts.subtitle') }}</p>
    <div class="bg-white rounded p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] space-y-4">
      <div class="flex items-center gap-4">
        <span class="text-2xl">✉️</span>
        <div>
          <div class="font-semibold text-[#2D4D3A]">Email</div>
          <div class="text-[#5B5B5B] text-sm">adzyuber@gmail.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
useSeoMeta({ title: 'Контакты — BeautyMaster' })
</script>
