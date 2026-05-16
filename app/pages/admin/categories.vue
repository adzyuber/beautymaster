<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-6 flex items-center justify-between gap-3">
      <h1 class="text-xl sm:text-2xl font-bold text-[#2D4D3A]">Categories</h1>
      <button
        @click="openCreate"
        class="text-sm bg-[#1EC3BD] text-white font-semibold px-3 sm:px-4 py-2 rounded hover:bg-[#19a8a3] transition-colors whitespace-nowrap"
      ><span class="sm:hidden">+ New</span><span class="hidden sm:inline">+ New category</span></button>
    </div>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 8" :key="i" class="bg-white rounded h-14 animate-pulse"></div>
    </div>

    <div v-else-if="!categories.length" class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-12 text-center text-[#5B5B5B]">
      No categories yet
    </div>

    <div v-else class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden">
      <div class="hidden sm:flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 bg-[#f8faf9]">
        <div class="w-6 shrink-0"></div>
        <div class="w-10 shrink-0"></div>
        <div class="flex-1 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Name</div>
        <div class="w-44 shrink-0 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Slug</div>
        <div class="w-28 shrink-0 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Subcategories</div>
        <div class="w-24 shrink-0 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Status</div>
        <div class="w-32 shrink-0"></div>
      </div>

      <div v-for="(cat, idx) in categories" :key="cat.id">
        <!-- Desktop row -->
        <div
          class="hidden sm:flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-[#f8faf9] transition-colors"
          :class="{ 'opacity-60': !cat.isActive }"
        >
          <div class="w-6 shrink-0 flex flex-col items-center text-gray-400">
            <button
              :disabled="idx === 0"
              @click="move(idx, -1)"
              class="w-5 h-4 flex items-center justify-center hover:text-[#1EC3BD] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Up"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
            </button>
            <button
              :disabled="idx === categories.length - 1"
              @click="move(idx, 1)"
              class="w-5 h-4 flex items-center justify-center hover:text-[#1EC3BD] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Down"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>

          <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            :style="{ backgroundColor: cat.iconBg }">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor"
              :style="{ color: cat.iconColor }"
              v-html="cat.iconSvg" />
          </div>

          <div class="flex-1 min-w-0">
            <div class="font-semibold text-[#2D4D3A] text-sm truncate">{{ cat.nameRu }}</div>
            <div class="text-xs text-[#5B5B5B] truncate">{{ cat.nameEn }}</div>
          </div>

          <div class="w-44 shrink-0 text-xs text-gray-500 truncate font-mono">{{ cat.slug }}</div>

          <div class="w-28 shrink-0 text-xs">
            <button
              @click="toggleExpand(cat.id)"
              class="text-[#1EC3BD] hover:underline font-medium"
            >{{ cat.subcategories.length }} item{{ cat.subcategories.length === 1 ? '' : 's' }} {{ expanded[cat.id] ? '▴' : '▾' }}</button>
          </div>

          <div class="w-24 shrink-0">
            <button
              @click="toggleActive(cat)"
              :class="[
                'text-xs font-semibold px-2 py-0.5 rounded-full transition-all',
                cat.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              ]"
            >{{ cat.isActive ? 'Active' : 'Hidden' }}</button>
          </div>

          <div class="w-32 shrink-0 flex items-center justify-end gap-1.5">
            <button
              @click="openEdit(cat)"
              class="text-xs px-2.5 py-1 bg-[#8FD9A8]/20 text-[#2D4D3A] rounded hover:bg-[#8FD9A8]/40 font-medium transition-all"
            >Edit</button>
            <button
              @click="deleteCategory(cat)"
              class="text-xs px-2.5 py-1 bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium transition-all"
            >Delete</button>
          </div>
        </div>

        <!-- Mobile card -->
        <div
          class="sm:hidden px-4 py-4 border-b border-gray-100 last:border-0"
          :class="{ 'opacity-60': !cat.isActive }"
        >
          <!-- Header: icon + name + status toggle -->
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              :style="{ backgroundColor: cat.iconBg }">
              <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor"
                :style="{ color: cat.iconColor }"
                v-html="cat.iconSvg" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-[#2D4D3A] text-base leading-tight truncate">{{ cat.nameRu }}</div>
              <div class="text-sm text-[#5B5B5B] truncate">{{ cat.nameEn }}</div>
              <div class="text-xs text-gray-400 font-mono truncate mt-0.5">{{ cat.slug }}</div>
            </div>
            <button
              @click="toggleActive(cat)"
              :aria-label="cat.isActive ? 'Hide' : 'Activate'"
              :class="[
                'shrink-0 relative inline-flex h-7 w-12 rounded-full transition-colors focus:outline-none',
                cat.isActive ? 'bg-[#1EC3BD]' : 'bg-gray-300'
              ]"
            >
              <span :class="cat.isActive ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-5 w-5 mt-1 rounded-full bg-white shadow transition-transform" />
            </button>
          </div>

          <!-- Reorder + actions -->
          <div class="flex items-center gap-2 mt-3">
            <div class="flex shrink-0 rounded-lg border border-gray-200 overflow-hidden">
              <button
                :disabled="idx === 0"
                @click="move(idx, -1)"
                class="w-11 h-11 flex items-center justify-center text-[#5B5B5B] active:bg-gray-100 disabled:opacity-30 disabled:bg-transparent"
                title="Move up"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
              </button>
              <div class="w-px bg-gray-200"></div>
              <button
                :disabled="idx === categories.length - 1"
                @click="move(idx, 1)"
                class="w-11 h-11 flex items-center justify-center text-[#5B5B5B] active:bg-gray-100 disabled:opacity-30 disabled:bg-transparent"
                title="Move down"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <button
              @click="toggleExpand(cat.id)"
              :class="[
                'flex-1 h-11 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors',
                expanded[cat.id] ? 'bg-[#1EC3BD]/15 text-[#1EC3BD]' : 'bg-[#1EC3BD]/10 text-[#1EC3BD] active:bg-[#1EC3BD]/20'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/>
              </svg>
              <span>{{ cat.subcategories.length }}</span>
              <svg class="w-3.5 h-3.5 transition-transform" :class="expanded[cat.id] ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          <!-- Edit/Delete -->
          <div class="grid grid-cols-2 gap-2 mt-2">
            <button
              @click="openEdit(cat)"
              class="h-11 rounded-lg bg-[#8FD9A8]/25 text-[#2D4D3A] font-semibold text-sm active:bg-[#8FD9A8]/45 transition-colors"
            >Edit</button>
            <button
              @click="deleteCategory(cat)"
              class="h-11 rounded-lg bg-red-50 text-red-500 font-semibold text-sm active:bg-red-100 transition-colors"
            >Delete</button>
          </div>
        </div>

        <!-- Subcategories panel -->
        <div v-if="expanded[cat.id]" class="bg-[#f8faf9] border-b border-gray-100 px-4 py-3 sm:py-4">
          <div class="flex items-center justify-between mb-3 sm:ml-9">
            <div class="text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Subcategories</div>
            <button
              @click="openCreateSub(cat)"
              class="sm:hidden text-sm font-semibold text-[#1EC3BD] active:opacity-70"
            >+ Add</button>
          </div>
          <div v-if="!cat.subcategories.length" class="sm:ml-9 text-sm text-gray-400 mb-2">No subcategories</div>

          <!-- Desktop sub rows -->
          <div class="hidden sm:block">
            <div v-for="sub in cat.subcategories" :key="sub.id"
              class="sm:ml-9 py-1.5 border-b border-gray-100 last:border-0 flex items-center gap-3">
              <div class="flex-1 min-w-0">
                <div class="text-sm text-[#2D4D3A] truncate">{{ sub.nameRu }} <span class="text-gray-400 text-xs">/ {{ sub.nameEn }}</span></div>
                <div class="text-xs text-gray-400 font-mono truncate">{{ sub.slug }}</div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button
                  @click="toggleSubActive(sub)"
                  :class="[
                    'text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-all',
                    sub.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  ]"
                >{{ sub.isActive ? 'Active' : 'Hidden' }}</button>
                <button
                  @click="openEditSub(cat, sub)"
                  class="text-xs px-2 py-0.5 bg-[#8FD9A8]/20 text-[#2D4D3A] rounded hover:bg-[#8FD9A8]/40 font-medium transition-all"
                >Edit</button>
                <button
                  @click="deleteSub(cat, sub)"
                  class="text-xs px-2 py-0.5 bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium transition-all"
                >Delete</button>
              </div>
            </div>
          </div>

          <!-- Mobile sub cards -->
          <div class="sm:hidden space-y-2">
            <div v-for="sub in cat.subcategories" :key="sub.id"
              class="bg-white rounded-lg p-3"
              :class="{ 'opacity-60': !sub.isActive }">
              <div class="flex items-center gap-3">
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-[#2D4D3A] truncate">{{ sub.nameRu }}</div>
                  <div class="text-xs text-[#5B5B5B] truncate">{{ sub.nameEn }}</div>
                  <div class="text-[11px] text-gray-400 font-mono truncate">{{ sub.slug }}</div>
                </div>
                <button
                  @click="toggleSubActive(sub)"
                  :aria-label="sub.isActive ? 'Hide' : 'Activate'"
                  :class="[
                    'shrink-0 relative inline-flex h-6 w-11 rounded-full transition-colors focus:outline-none',
                    sub.isActive ? 'bg-[#1EC3BD]' : 'bg-gray-300'
                  ]"
                >
                  <span :class="sub.isActive ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 mt-1 rounded-full bg-white shadow transition-transform" />
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2 mt-2">
                <button
                  @click="openEditSub(cat, sub)"
                  class="h-10 rounded-md bg-[#8FD9A8]/25 text-[#2D4D3A] font-semibold text-sm active:bg-[#8FD9A8]/45 transition-colors"
                >Edit</button>
                <button
                  @click="deleteSub(cat, sub)"
                  class="h-10 rounded-md bg-red-50 text-red-500 font-semibold text-sm active:bg-red-100 transition-colors"
                >Delete</button>
              </div>
            </div>
          </div>

          <button
            @click="openCreateSub(cat)"
            class="hidden sm:block sm:ml-9 mt-2 text-xs text-[#1EC3BD] hover:underline font-medium"
          >+ Add subcategory</button>
        </div>
      </div>
    </div>

    <!-- Category edit modal -->
    <Teleport to="body">
      <div v-if="modal.open"
        class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto"
        @click.self="modal.open = false">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 my-8">
          <h2 class="text-lg font-bold text-[#2D4D3A] mb-4">
            {{ modal.id ? 'Edit category' : 'New category' }}
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Slug *</label>
              <input v-model="modal.slug" type="text" placeholder="dentistry"
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
              <p class="text-xs text-gray-400 mt-1">Lowercase letters, digits, dashes only. Changing slug rewires existing ads.</p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Name (RU) *</label>
              <input v-model="modal.nameRu" type="text"
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Name (EN) *</label>
              <input v-model="modal.nameEn" type="text"
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Icon bg</label>
              <div class="flex gap-2">
                <input v-model="modal.iconBg" type="color" class="w-12 h-9 border border-gray-200 rounded cursor-pointer">
                <input v-model="modal.iconBg" type="text" class="flex-1 border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Icon color</label>
              <div class="flex gap-2">
                <input v-model="modal.iconColor" type="color" class="w-12 h-9 border border-gray-200 rounded cursor-pointer">
                <input v-model="modal.iconColor" type="text" class="flex-1 border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
              </div>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Icon SVG paths</label>
              <textarea v-model="modal.iconSvg" rows="4"
                placeholder="<path ... />"
                class="w-full border border-gray-200 rounded px-3 py-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]"></textarea>
              <p class="text-xs text-gray-400 mt-1">SVG inner content (paths/circles/etc). Drawn inside &lt;svg viewBox="0 0 24 24" fill="none" stroke="currentColor"&gt;.</p>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Preview</label>
              <div class="flex items-center gap-3 bg-gray-50 rounded px-3 py-2">
                <div class="w-12 h-12 rounded-full flex items-center justify-center"
                  :style="{ backgroundColor: modal.iconBg }">
                  <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor"
                    :style="{ color: modal.iconColor }"
                    v-html="modal.iconSvg" />
                </div>
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  :style="{ backgroundColor: modal.iconBg, color: modal.iconColor }">
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    v-html="modal.iconSvg" />
                  {{ modal.nameRu || 'Category' }}
                </span>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Image URL</label>
              <input v-model="modal.imageUrl" type="text" placeholder="https://..."
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
              <p class="text-xs text-gray-400 mt-1">Fallback image for ads without photos.</p>
            </div>
            <div class="sm:col-span-2">
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <input v-model="modal.isActive" type="checkbox" class="w-4 h-4 accent-[#1EC3BD]">
                <span class="text-sm text-[#2D4D3A]">Active (visible to users)</span>
              </label>
            </div>
          </div>

          <div v-if="modal.error" class="mt-3 text-sm text-red-500">{{ modal.error }}</div>

          <div class="flex gap-3 mt-5 justify-end">
            <button @click="modal.open = false"
              class="px-4 py-2 text-sm text-[#5B5B5B] border border-gray-200 rounded hover:bg-gray-50 font-medium transition-all">
              Cancel
            </button>
            <button @click="saveCategory" :disabled="modal.saving"
              class="px-4 py-2 text-sm bg-[#1EC3BD] text-white rounded hover:bg-[#19a8a3] font-medium transition-all disabled:opacity-50">
              {{ modal.saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Subcategory edit modal -->
    <Teleport to="body">
      <div v-if="subModal.open"
        class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        @click.self="subModal.open = false">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h2 class="text-lg font-bold text-[#2D4D3A] mb-1">
            {{ subModal.id ? 'Edit subcategory' : 'New subcategory' }}
          </h2>
          <p class="text-sm text-[#5B5B5B] mb-4">Under: {{ subModal.parentName }}</p>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Slug *</label>
              <input v-model="subModal.slug" type="text"
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Name (RU) *</label>
              <input v-model="subModal.nameRu" type="text"
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Name (EN) *</label>
              <input v-model="subModal.nameEn" type="text"
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
            </div>
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input v-model="subModal.isActive" type="checkbox" class="w-4 h-4 accent-[#1EC3BD]">
              <span class="text-sm text-[#2D4D3A]">Active</span>
            </label>
          </div>

          <div v-if="subModal.error" class="mt-3 text-sm text-red-500">{{ subModal.error }}</div>

          <div class="flex gap-3 mt-5 justify-end">
            <button @click="subModal.open = false"
              class="px-4 py-2 text-sm text-[#5B5B5B] border border-gray-200 rounded hover:bg-gray-50 font-medium transition-all">
              Cancel
            </button>
            <button @click="saveSub" :disabled="subModal.saving"
              class="px-4 py-2 text-sm bg-[#1EC3BD] text-white rounded hover:bg-[#19a8a3] font-medium transition-all disabled:opacity-50">
              {{ subModal.saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Categories — BeautyMaster Admin' })

interface Subcategory {
  id: number
  slug: string
  nameRu: string
  nameEn: string
  sortOrder: number
  isActive: boolean
}
interface Category {
  id: number
  slug: string
  nameRu: string
  nameEn: string
  iconBg: string
  iconColor: string
  iconSvg: string
  imageUrl: string | null
  sortOrder: number
  isActive: boolean
  subcategories: Subcategory[]
}

const categories = ref<Category[]>([])
const pending = ref(true)
const expanded = ref<Record<number, boolean>>({})

const modal = reactive({
  open: false,
  id: null as number | null,
  slug: '',
  nameRu: '',
  nameEn: '',
  iconBg: '#E0F7F6',
  iconColor: '#02282C',
  iconSvg: '',
  imageUrl: '',
  isActive: true,
  saving: false,
  error: '',
})

const subModal = reactive({
  open: false,
  categoryId: 0,
  parentName: '',
  id: null as number | null,
  slug: '',
  nameRu: '',
  nameEn: '',
  isActive: true,
  saving: false,
  error: '',
})

async function load() {
  pending.value = true
  try {
    const res = await $fetch<{ categories: Category[] }>('/api/admin/categories')
    categories.value = res.categories
  } finally {
    pending.value = false
  }
}

onMounted(load)

function toggleExpand(id: number) {
  expanded.value[id] = !expanded.value[id]
}

function openCreate() {
  Object.assign(modal, {
    open: true, id: null, slug: '', nameRu: '', nameEn: '',
    iconBg: '#E0F7F6', iconColor: '#02282C', iconSvg: '', imageUrl: '',
    isActive: true, saving: false, error: '',
  })
}

function openEdit(cat: Category) {
  Object.assign(modal, {
    open: true,
    id: cat.id,
    slug: cat.slug,
    nameRu: cat.nameRu,
    nameEn: cat.nameEn,
    iconBg: cat.iconBg,
    iconColor: cat.iconColor,
    iconSvg: cat.iconSvg,
    imageUrl: cat.imageUrl ?? '',
    isActive: cat.isActive,
    saving: false,
    error: '',
  })
}

async function saveCategory() {
  modal.saving = true
  modal.error = ''
  try {
    const body = {
      slug: modal.slug.trim().toLowerCase(),
      nameRu: modal.nameRu,
      nameEn: modal.nameEn,
      iconBg: modal.iconBg,
      iconColor: modal.iconColor,
      iconSvg: modal.iconSvg,
      imageUrl: modal.imageUrl.trim() || null,
      isActive: modal.isActive,
    }
    if (modal.id) {
      await $fetch(`/api/admin/categories/${modal.id}`, { method: 'PATCH', body })
    } else {
      await $fetch('/api/admin/categories', { method: 'POST', body })
    }
    modal.open = false
    await load()
  } catch (e: any) {
    modal.error = e.data?.message || 'Save failed'
  } finally {
    modal.saving = false
  }
}

async function toggleActive(cat: Category) {
  await $fetch(`/api/admin/categories/${cat.id}`, { method: 'PATCH', body: { isActive: !cat.isActive } })
  cat.isActive = !cat.isActive
}

async function deleteCategory(cat: Category) {
  if (!confirm(`Delete category "${cat.nameRu}"?`)) return
  try {
    await $fetch(`/api/admin/categories/${cat.id}`, { method: 'DELETE' })
    await load()
  } catch (e: any) {
    alert(e.data?.message || 'Delete failed')
  }
}

async function move(idx: number, dir: -1 | 1) {
  const target = idx + dir
  if (target < 0 || target >= categories.value.length) return
  const next = [...categories.value]
  const [moved] = next.splice(idx, 1)
  next.splice(target, 0, moved)
  categories.value = next
  try {
    await $fetch('/api/admin/categories/reorder', { method: 'POST', body: { ids: next.map(c => c.id) } })
  } catch {
    await load()
  }
}

function openCreateSub(cat: Category) {
  Object.assign(subModal, {
    open: true, categoryId: cat.id, parentName: cat.nameRu,
    id: null, slug: '', nameRu: '', nameEn: '', isActive: true,
    saving: false, error: '',
  })
}

function openEditSub(cat: Category, sub: Subcategory) {
  Object.assign(subModal, {
    open: true, categoryId: cat.id, parentName: cat.nameRu,
    id: sub.id, slug: sub.slug, nameRu: sub.nameRu, nameEn: sub.nameEn,
    isActive: sub.isActive, saving: false, error: '',
  })
}

async function saveSub() {
  subModal.saving = true
  subModal.error = ''
  try {
    const body = {
      slug: subModal.slug.trim().toLowerCase(),
      nameRu: subModal.nameRu,
      nameEn: subModal.nameEn,
      isActive: subModal.isActive,
    }
    if (subModal.id) {
      await $fetch(`/api/admin/subcategories/${subModal.id}`, { method: 'PATCH', body })
    } else {
      await $fetch(`/api/admin/categories/${subModal.categoryId}/subcategories`, { method: 'POST', body })
    }
    subModal.open = false
    await load()
  } catch (e: any) {
    subModal.error = e.data?.message || 'Save failed'
  } finally {
    subModal.saving = false
  }
}

async function toggleSubActive(sub: Subcategory) {
  await $fetch(`/api/admin/subcategories/${sub.id}`, { method: 'PATCH', body: { isActive: !sub.isActive } })
  sub.isActive = !sub.isActive
}

async function deleteSub(_cat: Category, sub: Subcategory) {
  if (!confirm(`Delete subcategory "${sub.nameRu}"?`)) return
  try {
    await $fetch(`/api/admin/subcategories/${sub.id}`, { method: 'DELETE' })
    await load()
  } catch (e: any) {
    alert(e.data?.message || 'Delete failed')
  }
}
</script>
