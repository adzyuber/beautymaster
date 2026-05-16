<template>
  <div>
    <div class="sm:hidden flex items-center gap-3 px-4 py-4 border-b border-gray-100 bg-white">
      <button @click="router.back()" class="text-gray-500 hover:text-gray-800 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-[#02282C]">{{ isEdit ? t('account.editTitle') : t('account.createTitle') }}</h1>
    </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="hidden sm:block text-2xl font-bold text-[#02282C] mb-8">{{ isEdit ? t('account.editTitle') : t('account.createTitle') }}</h1>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <NuxtLink to="/login" class="bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] px-6 py-2.5 rounded font-bold">{{ t('common.loginRequired') }}</NuxtLink>
    </div>

    <form v-else @submit.prevent="submit" class="space-y-6">
      <div class="sm:bg-white sm:rounded sm:shadow-[0_2px_16px_rgba(45,77,58,0.07)] sm:p-6 space-y-4">
        <h2 class="font-bold text-[#2D4D3A]">{{ t('form.mainInfo') }}</h2>

        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.title') }} *</label>
          <input v-model="form.title" type="text" :placeholder="t('form.titlePlaceholder')" required maxlength="100"
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.category') }} *</label>
          <ComboboxField
            v-model="form.category"
            :options="categoryOptions"
            :placeholder="t('form.select')"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.description') }} *</label>
          <textarea v-model="form.description" rows="5" required :placeholder="t('form.descPlaceholder')"
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] resize-none"></textarea>
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.price') }}</label>
          <input v-model="form.price" type="number" min="0" :placeholder="t('form.pricePlaceholder')"
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.city') }} *</label>
          <input v-model="form.city" type="text" required
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>

        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.address') }}</label>
          <input v-model="form.address" type="text" :placeholder="t('form.addressPlaceholder')"
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>
      </div>

      <!-- Photos -->
      <div class="sm:bg-white sm:rounded sm:shadow-[0_2px_16px_rgba(45,77,58,0.07)] sm:p-6">
        <h2 class="font-bold text-[#2D4D3A] mb-4">{{ t('form.photos') }} <span class="text-[#5B5B5B] font-normal text-sm">({{ t('form.photosHint') }})</span></h2>

        <div class="grid grid-cols-4 gap-3">
          <div v-for="(url, i) in form.images" :key="i"
            class="relative aspect-square bg-gray-100 rounded overflow-hidden group">
            <img :src="url" class="w-full h-full object-cover">
            <button type="button" @click="removeImage(i)"
              class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
          </div>

          <label v-if="form.images.length < 10"
            class="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:border-[#8FD9A8] transition-all">
            <span class="text-2xl text-gray-300 mb-1">+</span>
            <span class="text-xs text-gray-400">{{ t('form.addPhoto') }}</span>
            <input type="file" accept="image/*" multiple class="hidden" @change="uploadImage" :disabled="uploading">
          </label>
        </div>
        <div v-if="uploading" class="text-sm text-[#5B5B5B] mt-2">{{ t('form.uploading') }}</div>
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded">{{ error }}</div>

      <div class="flex gap-3">
        <button type="submit" :disabled="loading"
          class="flex-[2] bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] py-3 rounded font-bold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all disabled:opacity-50">
          {{ loading ? t('common.saving') : isEdit ? t('common.saveChanges') : t('common.publish') }}
        </button>
        <NuxtLink to="/account/ads"
          class="flex-1 py-3 border-2 border-gray-200 text-[#5B5B5B] rounded font-semibold hover:border-gray-300 transition-all text-center">
          {{ t('common.cancel') }}
        </NuxtLink>
      </div>
    </form>
  </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t, tCat, tError } = useLocale()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const isEdit = computed(() => !!route.params.id)
const { data: categories } = await useFetch('/api/categories')

const form = reactive({
  title: '',
  category: '',
  description: '',
  price: '',
  city: '',
  address: '',
  images: [] as string[]
})

const loading = ref(false)
const uploading = ref(false)
const error = ref('')

const categoryOptions = computed(() =>
  categories.value?.categories.map((c: string) => ({ value: c, label: tCat(c) })) ?? []
)

if (isEdit.value) {
  const ad = await $fetch(`/api/ads/${route.params.id}`) as any
  form.title = ad.title
  form.category = ad.category
  form.description = ad.description
  form.price = ad.price?.toString() || ''
  form.city = ad.city
  form.address = ad.address || ''
  form.images = ad.images?.map((i: any) => i.imageUrl) || []
}

async function uploadImage(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  if (!files.length) return
  const allowed = 10 - form.images.length
  const toUpload = files.slice(0, allowed)
  uploading.value = true
  try {
    const urls = await Promise.all(toUpload.map(async file => {
      const fd = new FormData()
      fd.append('file', file)
      const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: fd })
      return res.url
    }))
    form.images.push(...urls)
  } catch {
    error.value = t('form.uploadError')
  } finally {
    uploading.value = false
    ;(e.target as HTMLInputElement).value = ''
  }
}

function removeImage(i: number) {
  form.images.splice(i, 1)
}

async function submit() {
  loading.value = true
  error.value = ''
  try {
    const body = { ...form, price: form.price ? Number(form.price) : null }
    if (isEdit.value) {
      await $fetch(`/api/ads/${route.params.id}`, { method: 'PUT' as any, body })
    } else {
      await $fetch('/api/ads', { method: 'POST', body })
    }
    router.push('/account/ads')
  } catch (e: any) {
    error.value = tError(e, 'form.saveError')
  } finally {
    loading.value = false
  }
}

useSeoMeta({ title: `${isEdit.value ? 'Редактировать' : 'Создать объявление'} — BeautyMaster` })
</script>
