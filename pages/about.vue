<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-3xl font-bold text-[#2D4D3A] mb-4">О проекте</h1>
    <p class="text-[#5B5B5B] text-lg mb-8">MedBeauty Board — современная платформа для поиска и размещения объявлений в сфере медицины и beauty-услуг.</p>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
        <div class="text-3xl mb-3">🏥</div>
        <h3 class="font-bold text-[#2D4D3A] text-lg mb-2">Медицинские услуги</h3>
        <p class="text-[#5B5B5B] text-sm">Стоматологи, терапевты, психологи, массажисты и другие медицинские специалисты.</p>
      </div>
      <div class="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)]">
        <div class="text-3xl mb-3">💅</div>
        <h3 class="font-bold text-[#2D4D3A] text-lg mb-2">Beauty-услуги</h3>
        <p class="text-[#5B5B5B] text-sm">Косметологи, мастера маникюра, парикмахеры, барберы, визажисты и SPA-мастера.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'О проекте — MedBeauty Board' })
</script>
