<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin" class="text-sm text-[#5B5B5B] hover:text-[#2D4D3A]">← Admin</NuxtLink>
      <h1 class="text-2xl font-bold text-[#2D4D3A]">Listings</h1>
    </div>

    <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-4 mb-6 flex gap-3 flex-wrap">
      <input
        v-model="search"
        type="text"
        placeholder="Search by title or city..."
        class="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-200 rounded text-sm outline-none transition-all duration-200 focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
        @input="onSearch"
      />
      <select
        v-model="statusFilter"
        class="px-4 py-2.5 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8FD9A8] bg-white"
        @change="page = 1; refresh()"
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="i in 5" :key="i" class="bg-white rounded h-20 animate-pulse"></div>
    </div>

    <div v-else-if="!data?.ads?.length" class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-12 text-center text-[#5B5B5B]">
      No listings found
    </div>

    <div v-else class="space-y-3">
      <div v-for="ad in data.ads" :key="ad.id"
        class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-4 flex gap-4 items-center">
        <div class="w-14 h-14 bg-gray-100 rounded overflow-hidden shrink-0">
          <img v-if="ad.images?.[0]" :src="ad.images[0].imageUrl" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300">📷</div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-[#2D4D3A] truncate">{{ ad.title }}</div>
          <div class="text-xs text-[#5B5B5B] mt-0.5">
            {{ ad.subcategory }} · {{ ad.city }} · <span class="text-gray-400">{{ ad.user.name }}</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full',
              ad.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500']">
              {{ ad.status === 'active' ? 'Active' : 'Inactive' }}
            </span>
            <span class="text-xs text-gray-400">{{ formatDate(ad.createdAt) }}</span>
          </div>
        </div>
        <div class="flex gap-2 shrink-0 flex-wrap justify-end">
          <NuxtLink :to="`/ad/${ad.slug}`" target="_blank"
            class="text-xs px-3 py-1.5 bg-[#8FD9A8]/20 text-[#2D4D3A] rounded hover:bg-[#8FD9A8]/40 font-medium transition-all">
            View
          </NuxtLink>
          <button
            @click="toggleStatus(ad)"
            class="text-xs px-3 py-1.5 bg-gray-100 text-[#5B5B5B] rounded hover:bg-gray-200 font-medium transition-all"
          >
            {{ ad.status === 'active' ? 'Hide' : 'Activate' }}
          </button>
          <button
            @click="deleteAd(ad)"
            class="text-xs px-3 py-1.5 bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-if="data && data.pages > 1" class="flex justify-center gap-2 mt-6">
      <button
        v-for="p in data.pages" :key="p"
        @click="page = p; refresh()"
        :class="['w-9 h-9 rounded text-sm font-medium transition-colors',
          p === page ? 'bg-[#2D4D3A] text-white' : 'bg-white text-[#5B5B5B] hover:bg-gray-50 shadow-sm']"
      >{{ p }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin' })
useSeoMeta({ title: 'Listings — MedBeauty Admin' })

const data = ref<any>(null)
const pending = ref(true)
const search = ref('')
const statusFilter = ref('')
const page = ref(1)
let searchTimer: ReturnType<typeof setTimeout>

async function loadAds() {
  pending.value = true
  try {
    const q: any = { page: page.value }
    if (search.value) q.search = search.value
    if (statusFilter.value) q.status = statusFilter.value
    data.value = await $fetch('/api/admin/ads', { query: q })
  } finally {
    pending.value = false
  }
}

function refresh() { loadAds() }

onMounted(() => loadAds())

function onSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; refresh() }, 400)
}

async function toggleStatus(ad: any) {
  const newStatus = ad.status === 'active' ? 'inactive' : 'active'
  await $fetch(`/api/admin/ads/${ad.id}`, { method: 'PATCH', body: { status: newStatus } })
  refresh()
}

async function deleteAd(ad: any) {
  if (!confirm(`Delete listing "${ad.title}"?`)) return
  await $fetch(`/api/admin/ads/${ad.id}`, { method: 'DELETE' })
  refresh()
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
</script>
