<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-6 flex items-center justify-between gap-3">
      <h1 class="text-xl sm:text-2xl font-bold text-[#2D4D3A]">Languages</h1>
      <button
        @click="openCreate"
        class="text-sm bg-[#1EC3BD] text-white font-semibold px-3 sm:px-4 py-2 rounded hover:bg-[#19a8a3] transition-colors whitespace-nowrap"
      ><span class="sm:hidden">+ New</span><span class="hidden sm:inline">+ New language</span></button>
    </div>

    <p class="text-sm text-[#5B5B5B] mb-6">
      Languages shown in the catalog filter, profile picker, and listing page. The default language is shown on listings whose author hasn't set spoken languages.
    </p>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 5" :key="i" class="bg-white rounded h-14 animate-pulse"></div>
    </div>

    <div v-else-if="!languages.length" class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-12 text-center text-[#5B5B5B]">
      No languages yet
    </div>

    <div v-else class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden">
      <div class="hidden sm:flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 bg-[#f8faf9]">
        <div class="w-6 shrink-0"></div>
        <div class="w-20 shrink-0 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Code</div>
        <div class="flex-1 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Name</div>
        <div class="w-24 shrink-0 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Default</div>
        <div class="w-24 shrink-0 text-xs font-semibold text-[#5B5B5B] uppercase tracking-wide">Status</div>
        <div class="w-32 shrink-0"></div>
      </div>

      <div v-for="(lang, idx) in languages" :key="lang.id">
        <div
          class="hidden sm:flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-[#f8faf9] transition-colors"
          :class="{ 'opacity-60': !lang.isActive }"
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
              :disabled="idx === languages.length - 1"
              @click="move(idx, 1)"
              class="w-5 h-4 flex items-center justify-center hover:text-[#1EC3BD] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Down"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>

          <div class="w-20 shrink-0 text-xs font-mono text-gray-500">{{ lang.code }}</div>

          <div class="flex-1 min-w-0">
            <div class="font-semibold text-[#2D4D3A] text-sm truncate">{{ lang.nameRu }}</div>
            <div class="text-xs text-[#5B5B5B] truncate">{{ lang.nameEn }}</div>
          </div>

          <div class="w-24 shrink-0">
            <button
              v-if="lang.isDefault"
              class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 cursor-default"
              disabled
            >
              ★ Default
            </button>
            <button
              v-else
              @click="setDefault(lang)"
              class="text-xs font-medium px-2 py-0.5 rounded-full text-[#5B5B5B] hover:bg-amber-50 hover:text-amber-700 transition-colors"
              title="Make default"
            >Set default</button>
          </div>

          <div class="w-24 shrink-0">
            <button
              @click="toggleActive(lang)"
              :disabled="lang.isDefault"
              :class="[
                'text-xs font-semibold px-2 py-0.5 rounded-full transition-all',
                lang.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                lang.isDefault ? 'opacity-60 cursor-not-allowed' : ''
              ]"
              :title="lang.isDefault ? 'Default language is always active' : ''"
            >{{ lang.isActive ? 'Active' : 'Hidden' }}</button>
          </div>

          <div class="w-32 shrink-0 flex items-center justify-end gap-1.5">
            <button
              @click="openEdit(lang)"
              class="text-xs px-2.5 py-1 bg-[#8FD9A8]/20 text-[#2D4D3A] rounded hover:bg-[#8FD9A8]/40 font-medium transition-all"
            >Edit</button>
            <button
              @click="deleteLanguage(lang)"
              :disabled="lang.isDefault"
              :class="[
                'text-xs px-2.5 py-1 rounded font-medium transition-all',
                lang.isDefault ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-500 hover:bg-red-100'
              ]"
              :title="lang.isDefault ? 'Cannot delete the default language' : ''"
            >Delete</button>
          </div>
        </div>

        <!-- Mobile card -->
        <div
          class="sm:hidden px-4 py-4 border-b border-gray-100 last:border-0"
          :class="{ 'opacity-60': !lang.isActive }"
        >
          <div class="flex items-center gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <div class="font-semibold text-[#2D4D3A] text-base truncate">{{ lang.nameRu }}</div>
                <span v-if="lang.isDefault" class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">★</span>
              </div>
              <div class="text-sm text-[#5B5B5B] truncate">{{ lang.nameEn }}</div>
              <div class="text-xs text-gray-400 font-mono truncate mt-0.5">{{ lang.code }}</div>
            </div>
            <button
              @click="toggleActive(lang)"
              :disabled="lang.isDefault"
              :class="[
                'shrink-0 relative inline-flex h-7 w-12 rounded-full transition-colors focus:outline-none',
                lang.isActive ? 'bg-[#1EC3BD]' : 'bg-gray-300',
                lang.isDefault ? 'opacity-60' : ''
              ]"
            >
              <span :class="lang.isActive ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-5 w-5 mt-1 rounded-full bg-white shadow transition-transform" />
            </button>
          </div>

          <div class="flex items-center gap-2 mt-3">
            <div class="flex shrink-0 rounded-lg border border-gray-200 overflow-hidden">
              <button
                :disabled="idx === 0"
                @click="move(idx, -1)"
                class="w-11 h-11 flex items-center justify-center text-[#5B5B5B] active:bg-gray-100 disabled:opacity-30"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
              </button>
              <div class="w-px bg-gray-200"></div>
              <button
                :disabled="idx === languages.length - 1"
                @click="move(idx, 1)"
                class="w-11 h-11 flex items-center justify-center text-[#5B5B5B] active:bg-gray-100 disabled:opacity-30"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <button
              v-if="!lang.isDefault"
              @click="setDefault(lang)"
              class="flex-1 h-11 px-3 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 active:bg-amber-100"
            >Set default</button>
            <div v-else class="flex-1 h-11 px-3 rounded-lg text-sm font-medium bg-amber-100 text-amber-700 flex items-center justify-center">★ Default</div>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-2">
            <button
              @click="openEdit(lang)"
              class="h-11 rounded-lg bg-[#8FD9A8]/25 text-[#2D4D3A] font-semibold text-sm active:bg-[#8FD9A8]/45"
            >Edit</button>
            <button
              @click="deleteLanguage(lang)"
              :disabled="lang.isDefault"
              :class="[
                'h-11 rounded-lg font-semibold text-sm',
                lang.isDefault ? 'bg-gray-100 text-gray-400' : 'bg-red-50 text-red-500 active:bg-red-100'
              ]"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit modal -->
    <Teleport to="body">
      <div v-if="modal.open"
        class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
        @click.self="modal.open = false">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h2 class="text-lg font-bold text-[#2D4D3A] mb-4">
            {{ modal.id ? 'Edit language' : 'New language' }}
          </h2>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Code *</label>
              <input v-model="modal.code" type="text" placeholder="en"
                :disabled="!!modal.id"
                class="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] disabled:bg-gray-50 disabled:text-gray-400">
              <p class="text-xs text-gray-400 mt-1">Short language tag like "en", "ru", "pt-br". Lowercase only.</p>
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
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input v-model="modal.isActive" type="checkbox" class="w-4 h-4 accent-[#1EC3BD]">
              <span class="text-sm text-[#2D4D3A]">Active</span>
            </label>
          </div>

          <div v-if="modal.error" class="mt-3 text-sm text-red-500">{{ modal.error }}</div>

          <div class="flex gap-3 mt-5 justify-end">
            <button @click="modal.open = false"
              class="px-4 py-2 text-sm text-[#5B5B5B] border border-gray-200 rounded hover:bg-gray-50 font-medium transition-all">
              Cancel
            </button>
            <button @click="saveLanguage" :disabled="modal.saving"
              class="px-4 py-2 text-sm bg-[#1EC3BD] text-white rounded hover:bg-[#19a8a3] font-medium transition-all disabled:opacity-50">
              {{ modal.saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Languages — BeautyMaster Admin' })

interface Language {
  id: number
  code: string
  nameRu: string
  nameEn: string
  sortOrder: number
  isDefault: boolean
  isActive: boolean
}

const languages = ref<Language[]>([])
const pending = ref(true)

const modal = reactive({
  open: false,
  id: null as number | null,
  code: '',
  nameRu: '',
  nameEn: '',
  isActive: true,
  saving: false,
  error: '',
})

async function load() {
  pending.value = true
  try {
    const res = await $fetch<{ languages: Language[] }>('/api/admin/languages')
    languages.value = res.languages
  } finally {
    pending.value = false
  }
}

onMounted(load)

function openCreate() {
  Object.assign(modal, {
    open: true, id: null, code: '', nameRu: '', nameEn: '',
    isActive: true, saving: false, error: '',
  })
}

function openEdit(lang: Language) {
  Object.assign(modal, {
    open: true,
    id: lang.id,
    code: lang.code,
    nameRu: lang.nameRu,
    nameEn: lang.nameEn,
    isActive: lang.isActive,
    saving: false,
    error: '',
  })
}

async function saveLanguage() {
  modal.saving = true
  modal.error = ''
  try {
    const body: any = {
      nameRu: modal.nameRu,
      nameEn: modal.nameEn,
      isActive: modal.isActive,
    }
    if (modal.id) {
      await $fetch(`/api/admin/languages/${modal.id}`, { method: 'PATCH', body })
    } else {
      body.code = modal.code.trim().toLowerCase()
      await $fetch('/api/admin/languages', { method: 'POST', body })
    }
    modal.open = false
    await load()
  } catch (e: any) {
    modal.error = e.data?.message || 'Save failed'
  } finally {
    modal.saving = false
  }
}

async function toggleActive(lang: Language) {
  if (lang.isDefault) return
  try {
    await $fetch(`/api/admin/languages/${lang.id}`, { method: 'PATCH', body: { isActive: !lang.isActive } })
    lang.isActive = !lang.isActive
  } catch (e: any) {
    alert(e.data?.message || 'Update failed')
  }
}

async function setDefault(lang: Language) {
  try {
    await $fetch(`/api/admin/languages/${lang.id}`, { method: 'PATCH', body: { isDefault: true } })
    await load()
  } catch (e: any) {
    alert(e.data?.message || 'Update failed')
  }
}

async function deleteLanguage(lang: Language) {
  if (lang.isDefault) return
  if (!confirm(`Delete language "${lang.nameRu}"?`)) return
  try {
    await $fetch(`/api/admin/languages/${lang.id}`, { method: 'DELETE' })
    await load()
  } catch (e: any) {
    alert(e.data?.message || 'Delete failed')
  }
}

async function move(idx: number, dir: -1 | 1) {
  const target = idx + dir
  if (target < 0 || target >= languages.value.length) return
  const next = [...languages.value]
  const [moved] = next.splice(idx, 1)
  next.splice(target, 0, moved)
  languages.value = next
  try {
    await $fetch('/api/admin/languages/reorder', { method: 'POST', body: { ids: next.map(l => l.id) } })
  } catch {
    await load()
  }
}
</script>
