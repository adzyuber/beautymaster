<template>
  <footer class="bg-[#2D4D3A] text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="text-2xl font-bold mb-3">Med<span class="text-[#8FD9A8]">Beauty</span> Board</div>
          <p class="text-gray-300 text-sm">Современная платформа для поиска специалистов в сфере красоты и здоровья.</p>
        </div>
        <div>
          <h4 class="font-semibold mb-3 text-[#8FD9A8]">Навигация</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><NuxtLink to="/catalog" class="hover:text-white transition-colors">Каталог</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">О проекте</NuxtLink></li>
            <li><NuxtLink to="/contacts" class="hover:text-white transition-colors">Контакты</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-3 text-[#8FD9A8]">Категории</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>Медицина</li>
            <li>Beauty-услуги</li>
            <li>Косметология</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-400">
        © 2024 MedBeauty Board. Все права защищены.
      </div>
    </div>
  </footer>
</template>
