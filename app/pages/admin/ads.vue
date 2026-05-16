<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">Listings</h1>
      <button
        class="sm:hidden relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
        :class="filtersOpen || activeFiltersCount > 0 ? 'bg-[#1EC3BD]/15 text-[#1EC3BD]' : 'text-gray-400 hover:bg-gray-100'"
        @click="filtersOpen = !filtersOpen"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
        </svg>
        <span v-if="activeFiltersCount > 0"
          class="absolute -top-1 -right-1 w-4 h-4 bg-[#1EC3BD] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
          {{ activeFiltersCount }}
        </span>
      </button>
    </div>

    <!-- Filters -->
    <div :class="filtersOpen ? 'grid' : 'hidden'" class="sm:grid bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-4 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-start">

      <!-- Status multiselect -->
      <div class="relative" ref="statusDropdownRef">
        <button
          type="button"
          @click="statusDropdownOpen = !statusDropdownOpen"
          class="w-full flex items-center justify-between px-3 py-2.5 border border-gray-200 rounded text-sm bg-white transition-all focus:outline-none hover:border-gray-300"
          :class="statusFilters.length ? 'border-[#1EC3BD]' : ''"
        >
          <span class="truncate" :class="statusFilters.length ? 'text-[#2D4D3A] font-medium' : 'text-gray-400'">
            {{ statusFilters.length ? statusFilters.map(s => statusLabelMap[s]).join(', ') : 'All statuses' }}
          </span>
          <svg class="w-4 h-4 text-gray-400 shrink-0 ml-1 transition-transform" :class="statusDropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div v-if="statusDropdownOpen"
          class="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg overflow-hidden">
          <label v-for="opt in statusOptions" :key="opt.value"
            class="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 cursor-pointer select-none">
            <input type="checkbox" :value="opt.value" v-model="statusFilters"
              @change="page = 1; refresh()"
              class="w-3.5 h-3.5 rounded accent-[#1EC3BD]">
            <span class="text-sm text-[#2D4D3A]">{{ opt.label }}</span>
            <span v-if="opt.value === 'pending' && pendingCount > 0"
              class="ml-auto text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-full">
              {{ pendingCount }}
            </span>
          </label>
        </div>
      </div>

      <!-- Title -->
      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder="Title..."
          autocomplete="off"
          class="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none transition-all focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
          @input="onFilterInput('title', search)"
          @focus="onFilterInput('title', search)"
          @blur="hideSugg('title')"
          @keydown.down.prevent="moveSugg('title', 1)"
          @keydown.up.prevent="moveSugg('title', -1)"
          @keydown.enter.prevent="pickSugg('title')"
          @keydown.esc="hideSugg('title')"
        />
        <ul v-if="sugg.title.show && sugg.title.items.length"
          class="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg overflow-hidden">
          <li v-for="(item, i) in sugg.title.items" :key="i"
            @mousedown.prevent="selectSugg('title', item)"
            :class="['px-3 py-2 text-sm cursor-pointer transition-colors',
              sugg.title.cursor === i ? 'bg-[#8FD9A8]/30 text-[#2D4D3A]' : 'hover:bg-gray-50 text-[#2D4D3A]']">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- City -->
      <div class="relative">
        <input
          v-model="cityFilter"
          type="text"
          placeholder="City..."
          autocomplete="off"
          class="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none transition-all focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
          @input="onFilterInput('city', cityFilter)"
          @focus="onFilterInput('city', cityFilter)"
          @blur="hideSugg('city')"
          @keydown.down.prevent="moveSugg('city', 1)"
          @keydown.up.prevent="moveSugg('city', -1)"
          @keydown.enter.prevent="pickSugg('city')"
          @keydown.esc="hideSugg('city')"
        />
        <ul v-if="sugg.city.show && sugg.city.items.length"
          class="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg overflow-hidden">
          <li v-for="(item, i) in sugg.city.items" :key="i"
            @mousedown.prevent="selectSugg('city', item)"
            :class="['px-3 py-2 text-sm cursor-pointer transition-colors',
              sugg.city.cursor === i ? 'bg-[#8FD9A8]/30 text-[#2D4D3A]' : 'hover:bg-gray-50 text-[#2D4D3A]']">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Author -->
      <div class="relative">
        <input
          v-model="authorFilter"
          type="text"
          placeholder="Author..."
          autocomplete="off"
          class="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none transition-all focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
          @input="onFilterInput('author', authorFilter)"
          @focus="onFilterInput('author', authorFilter)"
          @blur="hideSugg('author')"
          @keydown.down.prevent="moveSugg('author', 1)"
          @keydown.up.prevent="moveSugg('author', -1)"
          @keydown.enter.prevent="pickSugg('author')"
          @keydown.esc="hideSugg('author')"
        />
        <ul v-if="sugg.author.show && sugg.author.items.length"
          class="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg overflow-hidden">
          <li v-for="(item, i) in sugg.author.items" :key="i"
            @mousedown.prevent="selectSugg('author', item.name)"
            :class="['px-3 py-2 text-sm cursor-pointer transition-colors',
              sugg.author.cursor === i ? 'bg-[#8FD9A8]/30' : 'hover:bg-gray-50']">
            <div class="font-medium text-[#2D4D3A]">{{ item.name }}</div>
            <div class="text-xs text-[#5B5B5B]">{{ item.email }}</div>
          </li>
        </ul>
      </div>

      <!-- Category -->
      <select
        v-model="categoryFilter"
        class="px-3 py-2.5 border border-gray-200 rounded text-sm outline-none bg-white transition-all focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
        @change="page = 1; refresh()"
      >
        <option value="">All categories</option>
        <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.nameRu }}</option>
      </select>

      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="sm:col-span-2 lg:col-span-5 text-sm text-[#5B5B5B] hover:text-red-500 flex items-center gap-1.5 transition-colors w-fit"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Clear filters
      </button>
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="i in 5" :key="i" class="bg-white rounded h-20 animate-pulse"></div>
    </div>

    <div v-else-if="!data?.ads?.length" class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-12 text-center text-[#5B5B5B]">
      No listings found
    </div>

    <div v-else class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden">
      <!-- Header - desktop only -->
      <div class="hidden sm:flex items-center gap-4 px-4 py-2.5 border-b border-gray-100 bg-[#f8faf9]">
        <div class="w-12 shrink-0"></div>
        <div class="flex-1 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Listing</div>
        <div class="shrink-0 w-[90px] text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Status</div>
        <div class="shrink-0 w-[80px] text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Date</div>
        <div class="shrink-0 flex gap-1.5">
          <div class="w-[52px]"></div>
          <div class="w-[84px]"></div>
          <div class="w-[60px]"></div>
          <div class="w-[60px]"></div>
        </div>
      </div>

      <div v-for="ad in data.ads" :key="ad.id"
        class="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-[#f8faf9] transition-colors">

        <!-- Mobile card -->
        <div class="sm:hidden flex items-start gap-3">
          <div class="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
            <img v-if="ad.images?.[0]" :src="ad.images[0].imageUrl" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-lg">📷</div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start gap-2">
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-[#2D4D3A] truncate text-sm">{{ ad.title }}</div>
                <div class="text-xs text-[#5B5B5B] mt-0.5 truncate">{{ catName(ad.category) }} · {{ ad.city }} · {{ ad.user.name }}</div>
              </div>
              <div class="shrink-0 text-right">
                <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap', adStatusClass(ad.status)]">
                  {{ adStatusLabel(ad.status) }}
                </span>
                <div class="text-xs text-gray-400 mt-1">{{ formatDate(ad.createdAt) }}</div>
              </div>
            </div>
            <div v-if="ad.rejectionReason" class="mt-1 text-xs text-red-500 bg-red-50 rounded px-2 py-1 leading-relaxed">
              {{ ad.rejectionReason }}
            </div>
            <div class="flex items-center gap-1.5 mt-2 overflow-x-auto pb-0.5">
              <NuxtLink :to="`/ad/${ad.slug}`" target="_blank"
                class="text-xs px-2.5 py-1 whitespace-nowrap shrink-0 bg-[#8FD9A8]/20 text-[#2D4D3A] rounded hover:bg-[#8FD9A8]/40 font-medium transition-all">
                View
              </NuxtLink>
              <template v-if="ad.status === 'pending'">
                <button @click="approveAd(ad)"
                  class="text-xs px-2.5 py-1 whitespace-nowrap shrink-0 bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium transition-all">
                  Approve
                </button>
              </template>
              <template v-else-if="ad.status === 'active' || ad.status === 'inactive'">
                <button @click="toggleStatus(ad)"
                  class="text-xs px-2.5 py-1 whitespace-nowrap shrink-0 bg-gray-100 text-[#5B5B5B] rounded hover:bg-gray-200 font-medium transition-all">
                  {{ ad.status === 'active' ? 'Deactivate' : 'Activate' }}
                </button>
              </template>
              <template v-else-if="ad.status === 'rejected'">
                <button @click="approveAd(ad)"
                  class="text-xs px-2.5 py-1 whitespace-nowrap shrink-0 bg-green-50 text-green-600 rounded hover:bg-green-100 font-medium transition-all">
                  Approve
                </button>
              </template>
              <button
                @click="ad.status !== 'rejected' && openRejectModal(ad)"
                :disabled="ad.status === 'rejected'"
                class="text-xs px-2.5 py-1 whitespace-nowrap shrink-0 rounded font-medium transition-all"
                :class="ad.status === 'rejected' ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-red-50 text-red-500 hover:bg-red-100'"
              >Reject</button>
              <button @click="deleteAd(ad)"
                class="text-xs px-2.5 py-1 whitespace-nowrap shrink-0 bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop row -->
        <div class="hidden sm:flex items-center gap-4">
          <div class="w-12 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
            <img v-if="ad.images?.[0]" :src="ad.images[0].imageUrl" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-lg">📷</div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-[#2D4D3A] truncate text-sm">{{ ad.title }}</div>
            <div class="text-xs text-[#5B5B5B] mt-0.5 truncate">{{ catName(ad.category) }} · {{ ad.city }} · {{ ad.user.name }}</div>
            <div v-if="ad.rejectionReason" class="mt-1 text-xs text-red-500 bg-red-50 rounded px-2 py-1 leading-relaxed truncate">
              {{ ad.rejectionReason }}
            </div>
          </div>
          <div class="shrink-0 w-[90px]">
            <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap', adStatusClass(ad.status)]">
              {{ adStatusLabel(ad.status) }}
            </span>
          </div>
          <div class="shrink-0 w-[80px] text-xs text-gray-400">{{ formatDate(ad.createdAt) }}</div>
          <div class="shrink-0 flex items-center gap-1.5">
            <NuxtLink :to="`/ad/${ad.slug}`" target="_blank"
              class="text-xs px-3 py-1.5 w-[52px] text-center bg-[#8FD9A8]/20 text-[#2D4D3A] rounded hover:bg-[#8FD9A8]/40 font-medium transition-all">
              View
            </NuxtLink>
            <template v-if="ad.status === 'pending'">
              <button @click="approveAd(ad)"
                class="text-xs px-3 py-1.5 w-[84px] text-center bg-green-100 text-green-700 rounded hover:bg-green-200 font-medium transition-all">
                Approve
              </button>
            </template>
            <template v-else-if="ad.status === 'active' || ad.status === 'inactive'">
              <button @click="toggleStatus(ad)"
                class="text-xs px-3 py-1.5 w-[84px] text-center bg-gray-100 text-[#5B5B5B] rounded hover:bg-gray-200 font-medium transition-all">
                {{ ad.status === 'active' ? 'Deactivate' : 'Activate' }}
              </button>
            </template>
            <template v-else-if="ad.status === 'rejected'">
              <button @click="approveAd(ad)"
                class="text-xs px-3 py-1.5 w-[84px] text-center bg-green-50 text-green-600 rounded hover:bg-green-100 font-medium transition-all">
                Approve
              </button>
            </template>
            <button
              @click="ad.status !== 'rejected' && openRejectModal(ad)"
              :disabled="ad.status === 'rejected'"
              class="text-xs px-3 py-1.5 w-[60px] text-center rounded font-medium transition-all"
              :class="ad.status === 'rejected' ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-red-50 text-red-500 hover:bg-red-100'"
            >Reject</button>
            <button @click="deleteAd(ad)"
              class="text-xs px-3 py-1.5 w-[60px] text-center bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium transition-all">
              Delete
            </button>
          </div>
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

    <!-- Reject modal -->
    <Teleport to="body">
      <div v-if="rejectModal.open"
        class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        @click.self="rejectModal.open = false">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h2 class="text-lg font-bold text-[#2D4D3A] mb-1">Reject listing</h2>
          <p class="text-sm text-[#5B5B5B] mb-4 truncate">« {{ rejectModal.ad?.title }} »</p>
          <label class="block text-sm font-medium text-[#2D2D2D] mb-1.5">Rejection reason <span class="text-xs text-gray-400 font-normal">(optional)</span></label>
          <textarea
            v-model="rejectModal.reason"
            rows="3"
            placeholder="Explain why the listing is being rejected..."
            class="w-full border border-gray-200 rounded px-3 py-2.5 text-sm outline-none resize-none focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
          />
          <div v-if="rejectModal.error" class="mt-2 text-xs text-red-500">{{ rejectModal.error }}</div>
          <div class="flex gap-3 mt-4 justify-end">
            <button @click="rejectModal.open = false"
              class="px-4 py-2 text-sm text-[#5B5B5B] border border-gray-200 rounded hover:bg-gray-50 font-medium transition-all">
              Cancel
            </button>
            <button @click="confirmReject" :disabled="rejectModal.saving"
              class="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 font-medium transition-all disabled:opacity-50">
              {{ rejectModal.saving ? 'Rejecting...' : 'Reject' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Listings — BeautyMaster Admin' })

const route = useRoute()

const data = ref<any>(null)
const pending = ref(true)
const search = ref('')
const cityFilter = ref('')
const authorFilter = ref((route.query.author as string) || '')
const categoryFilter = ref('')
const statusFilters = ref<string[]>(
  route.query.status ? (route.query.status as string).split(',').filter(Boolean) : []
)
const statusDropdownOpen = ref(false)
const statusDropdownRef = ref<HTMLElement | null>(null)
const filtersOpen = ref(false)

const statusOptions = [
  { value: 'pending',  label: 'Pending' },
  { value: 'active',   label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'rejected', label: 'Rejected' },
]
const statusLabelMap: Record<string, string> = {
  pending: 'Pending', active: 'Active', inactive: 'Inactive', rejected: 'Rejected'
}

onClickOutside(statusDropdownRef, () => { statusDropdownOpen.value = false })
const page = ref(1)
const pendingCount = ref(0)
let searchTimer: ReturnType<typeof setTimeout>
let suggTimer: ReturnType<typeof setTimeout>

type SuggField = 'title' | 'city' | 'author'
const sugg = reactive<Record<SuggField, { items: any[]; show: boolean; cursor: number }>>({
  title:  { items: [], show: false, cursor: -1 },
  city:   { items: [], show: false, cursor: -1 },
  author: { items: [], show: false, cursor: -1 },
})

function onFilterInput(field: SuggField, value: string) {
  clearTimeout(suggTimer)
  if (!value.trim()) { sugg[field].items = []; sugg[field].show = false; return }
  suggTimer = setTimeout(async () => {
    const res = await $fetch<{ suggestions: any[] }>('/api/admin/ads/suggestions', { query: { field, q: value } })
    sugg[field].items = res.suggestions
    sugg[field].show = true
    sugg[field].cursor = -1
  }, 200)
  // also trigger search debounce for title/city/author
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; loadAds() }, 400)
}

function hideSugg(field: SuggField) {
  setTimeout(() => { sugg[field].show = false; sugg[field].cursor = -1 }, 150)
}

function moveSugg(field: SuggField, dir: 1 | -1) {
  const len = sugg[field].items.length
  if (!len) return
  sugg[field].cursor = (sugg[field].cursor + dir + len) % len
}

function pickSugg(field: SuggField) {
  const item = sugg[field].items[sugg[field].cursor]
  if (item != null) selectSugg(field, typeof item === 'string' ? item : item.name)
}

function selectSugg(field: SuggField, value: string) {
  if (field === 'title') search.value = value
  else if (field === 'city') cityFilter.value = value
  else if (field === 'author') authorFilter.value = value
  sugg[field].show = false
  sugg[field].cursor = -1
  page.value = 1
  loadAds()
}

const { categories, getCategory } = await useCategories()
function catName(slug: string) {
  return getCategory(slug).nameRu || slug
}

const rejectModal = reactive({
  open: false,
  ad: null as any,
  reason: '',
  error: '',
  saving: false
})

async function loadAds() {
  pending.value = true
  try {
    const q: any = { page: page.value }
    if (search.value) q.search = search.value
    if (statusFilters.value.length) q.status = statusFilters.value.join(',')
    if (cityFilter.value) q.city = cityFilter.value
    if (authorFilter.value) q.author = authorFilter.value
    if (categoryFilter.value) q.category = categoryFilter.value
    data.value = await $fetch('/api/admin/ads', { query: q })
  } finally {
    pending.value = false
  }
}

async function loadPendingCount() {
  const res = await $fetch<any>('/api/admin/ads', { query: { status: 'pending', limit: 1 } })
  pendingCount.value = res.total ?? 0
}

function refresh() { loadAds(); loadPendingCount() }

const hasActiveFilters = computed(() =>
  statusFilters.value.length > 0 || !!search.value || !!cityFilter.value || !!authorFilter.value || !!categoryFilter.value
)

const activeFiltersCount = computed(() =>
  (statusFilters.value.length ? 1 : 0) +
  (search.value ? 1 : 0) +
  (cityFilter.value ? 1 : 0) +
  (authorFilter.value ? 1 : 0) +
  (categoryFilter.value ? 1 : 0)
)

function clearFilters() {
  statusFilters.value = []
  search.value = ''
  cityFilter.value = ''
  authorFilter.value = ''
  categoryFilter.value = ''
  page.value = 1
  refresh()
}


onMounted(() => {
  loadAds()
  loadPendingCount()
  if (hasActiveFilters.value) filtersOpen.value = true
})

function onSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; refresh() }, 400)
}

async function approveAd(ad: any) {
  await $fetch(`/api/admin/ads/${ad.id}`, { method: 'PATCH', body: { action: 'approve' } })
  refresh()
}

function openRejectModal(ad: any) {
  rejectModal.ad = ad
  rejectModal.reason = ''
  rejectModal.error = ''
  rejectModal.open = true
}

async function confirmReject() {
  rejectModal.saving = true
  rejectModal.error = ''
  try {
    await $fetch(`/api/admin/ads/${rejectModal.ad.id}`, {
      method: 'PATCH',
      body: { action: 'reject', reason: rejectModal.reason.trim() }
    })
    rejectModal.open = false
    refresh()
  } catch (e: any) {
    rejectModal.error = e.data?.message || 'Error'
  } finally {
    rejectModal.saving = false
  }
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

function adStatusClass(status: string) {
  if (status === 'active') return 'bg-green-100 text-green-700'
  if (status === 'pending') return 'bg-amber-100 text-amber-700'
  if (status === 'rejected') return 'bg-red-100 text-red-600'
  return 'bg-gray-100 text-gray-500'
}

function adStatusLabel(status: string) {
  if (status === 'active') return 'Active'
  if (status === 'pending') return 'Pending'
  if (status === 'rejected') return 'Rejected'
  return 'Inactive'
}
</script>
