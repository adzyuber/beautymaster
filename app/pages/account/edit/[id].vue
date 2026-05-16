<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-2xl font-bold text-[#2D4D3A] mb-8">{{ t('account.editTitle') }}</h1>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <NuxtLink to="/login" class="bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] px-6 py-2.5 rounded font-bold">{{ t('common.loginRequired') }}</NuxtLink>
    </div>

    <form v-else @submit.prevent="submit" class="space-y-6">
      <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6 space-y-4">
        <h2 class="font-bold text-[#2D4D3A]">{{ t('form.mainInfo') }}</h2>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.title') }} *</label>
          <input v-model="form.title" type="text" required
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
          <textarea v-model="form.description" rows="5" required
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.price') }}</label>
            <input v-model="form.price" type="number" min="0"
              class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.city') }} *</label>
            <input v-model="form.city" type="text" required
              class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">{{ t('form.address') }}</label>
          <input v-model="form.address" type="text"
            class="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
        </div>
      </div>

      <!-- Photos -->
      <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6">
        <h2 class="font-bold text-[#2D4D3A] mb-4">{{ t('form.photos') }}</h2>
        <div class="grid grid-cols-4 gap-3">
          <div v-for="(url, i) in form.images" :key="i"
            class="relative aspect-square bg-gray-100 rounded overflow-hidden group">
            <img :src="url" class="w-full h-full object-cover">
            <button type="button" @click="form.images.splice(i,1)"
              class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
          </div>
          <label v-if="form.images.length < 10"
            class="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:border-[#8FD9A8] transition-all">
            <span class="text-2xl text-gray-300">+</span>
            <span class="text-xs text-gray-400">{{ t('form.addPhoto') }}</span>
            <input type="file" accept="image/*" multiple class="hidden" @change="uploadImage">
          </label>
        </div>
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded">{{ error }}</div>

      <div class="flex gap-3">
        <button type="submit" :disabled="loading"
          class="flex-[2] bg-[#2D2D2D] text-white border-2 border-[#2D2D2D] py-3 rounded font-bold hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all disabled:opacity-50">
          {{ loading ? t('common.saving') : t('common.saveChanges') }}
        </button>
        <NuxtLink to="/account/ads" class="flex-1 py-3 border-2 border-gray-200 text-[#5B5B5B] rounded font-semibold hover:border-gray-300 transition-all text-center">{{ t('common.cancel') }}</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const { t, tCat, tError } = useLocale()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const { data: categories } = await useFetch('/api/categories')
const ad = await $fetch(`/api/ads/${route.params.id}`) as any

const categoryOptions = computed(() =>
  categories.value?.categories.map((c: string) => ({ value: c, label: tCat(c) })) ?? []
)

const form = reactive({
  title: ad.title,
  category: ad.category,
  description: ad.description,
  price: ad.price?.toString() || '',
  city: ad.city,
  address: ad.address || '',
  images: ad.images?.map((i: any) => i.imageUrl) || []
})

const loading = ref(false)
const error = ref('')

async function uploadImage(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  if (!files.length) return
  const toUpload = files.slice(0, 10 - form.images.length)
  await Promise.all(toUpload.map(async file => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: fd })
    form.images.push(res.url)
  }))
  ;(e.target as HTMLInputElement).value = ''
}

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch(`/api/ads/${route.params.id}`, {
      method: 'PUT' as any,
      body: { ...form, price: form.price ? Number(form.price) : null }
    })
    router.push('/account/ads')
  } catch (e: any) {
    error.value = tError(e, 'form.saveError')
  } finally {
    loading.value = false
  }
}
</script>
