<template>
  <div class="p-10 font-mono text-sm">
    <h1 class="text-xl font-bold mb-4">Auth Debug</h1>
    <pre class="bg-gray-100 p-4 rounded">{{ info }}</pre>
  </div>
</template>

<script setup lang="ts">
const info = ref('loading...')

onMounted(async () => {
  try {
    const me = await $fetch('/api/auth/me')
    info.value = JSON.stringify({ me }, null, 2)
  } catch (e: any) {
    info.value = JSON.stringify({ error: e?.message || String(e) }, null, 2)
  }
})
</script>
