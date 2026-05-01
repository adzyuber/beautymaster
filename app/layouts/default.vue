<template>
  <div class="min-h-screen flex flex-col bg-[#f8faf9]">
    <!-- Desktop navbar -->
    <AppNavbar class="hidden sm:block" />
    <!-- Mobile top bar (fixed) -->
    <MobileTopBar />
    <!-- Mobile bottom nav (fixed) -->
    <MobileBottomNav />
    <main class="flex-1 pt-[60px] sm:pt-20 pb-16 sm:pb-0"
      :class="{
        '!pt-0': ['/account/messages', '/account/profile', '/account/create'].includes($route.path),
        '!pb-0': $route.path === '/account/messages'
      }">
      <slot />
    </main>
    <AppFooter :class="{ 'hidden sm:block': ['/account/create', '/account/messages', '/account/profile'].includes($route.path) }" />
  </div>
</template>
