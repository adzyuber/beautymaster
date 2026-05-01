<template>
  <div class="min-h-screen flex flex-col bg-[#f8faf9]">
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
