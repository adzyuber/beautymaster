<template>
  <div class="min-h-screen flex flex-col bg-[#f8faf9]">
    <!-- Desktop navbar -->
    <AppNavbar class="hidden sm:block" />
    <!-- Mobile top bar (fixed) -->
    <MobileTopBar />
    <!-- Mobile bottom nav (fixed) -->
    <MobileBottomNav />
    <main class="flex-1 pt-[60px] sm:pt-[72px] pb-16 sm:pb-0"
      :class="{
        '!pt-0 sm:!pt-[72px]': $route.path === '/account/messages' || $route.path.startsWith('/ad/'),
        '!pt-0': $route.path.startsWith('/account/profile') || $route.path === '/account/settings' || ['/account/create', '/privacy'].includes($route.path),
        '!pb-0': $route.path === '/account/messages',
        'bg-white sm:bg-transparent': $route.path === '/account/messages'
      }">
      <slot />
    </main>
    <AppFooter :class="{ 'hidden sm:block': $route.path.startsWith('/account/profile') || $route.path === '/account/settings' || ['/account/create', '/account/messages'].includes($route.path) }" />
  </div>
</template>
