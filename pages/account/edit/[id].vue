<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-2xl font-bold text-[#2D4D3A] mb-8">Редактировать объявление</h1>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <NuxtLink to="/login" class="bg-[#2D4D3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">Войти</NuxtLink>
    </div>

    <form v-else @submit.prevent="submit" class="space-y-6">
      <div class="bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6 space-y-4">
        <h2 class="font-bold text-[#2D4D3A]">Основная информация</h2>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Заголовок *</label>
          <input v-model="form.title" type="text" required
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Категория *</label>
            <select v-model="form.category" required
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
              <option v-for="cat in categories?.categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Подкатегория *</label>
            <select v-model="form.subcategory" required
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
              <option v-for="sub in currentCat?.subcategories" :key="sub" :value="sub">{{ sub }}</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Описание *</label>
          <textarea v-model="form.description" rows="5" required
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8] resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Цена (₽)</label>
            <input v-model="form.price" type="number" min="0"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
          </div>
          <div>
            <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Город *</label>
            <input v-model="form.city" type="text" required
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-[#5B5B5B] mb-1.5 uppercase tracking-wide">Адрес</label>
          <input v-model="form.address" type="text"
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
        </div>
      </div>

      <!-- Photos -->
      <div class="bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-6">
        <h2 class="font-bold text-[#2D4D3A] mb-4">Фотографии</h2>
        <div class="grid grid-cols-4 gap-3">
          <div v-for="(url, i) in form.images" :key="i"
            class="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
            <img :src="url" class="w-full h-full object-cover">
            <button type="button" @click="form.images.splice(i,1)"
              class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
          </div>
          <label v-if="form.images.length < 10"
            class="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#8FD9A8] transition-all">
            <span class="text-2xl text-gray-300">+</span>
            <span class="text-xs text-gray-400">Добавить</span>
            <input type="file" accept="image/*" class="hidden" @change="uploadImage">
          </label>
        </div>
      </div>

      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{{ error }}</div>

      <div class="flex gap-3">
        <button type="submit" :disabled="loading"
          class="flex-1 bg-[#2D4D3A] text-white py-3 rounded-xl font-bold hover:bg-[#3d6650] transition-all disabled:opacity-50">
          {{ loading ? 'Сохраняем...' : 'Сохранить изменения' }}
        </button>
        <NuxtLink to="/account/ads" class="px-6 py-3 border-2 border-gray-200 text-[#5B5B5B] rounded-xl font-semibold text-center">Отмена</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const { data: categories } = await useFetch('/api/categories')
const ad = await $fetch(`/api/ads/${route.params.id}`) as any

const form = reactive({
  title: ad.title,
  category: ad.category,
  subcategory: ad.subcategory,
  description: ad.description,
  price: ad.price?.toString() || '',
  city: ad.city,
  address: ad.address || '',
  images: ad.images?.map((i: any) => i.imageUrl) || []
})

const loading = ref(false)
const error = ref('')

const currentCat = computed(() =>
  categories.value?.categories.find((c: any) => c.slug === form.category)
)

async function uploadImage(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const fd = new FormData()
  fd.append('file', file)
  const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: fd })
  form.images.push(res.url)
}

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await $fetch(`/api/ads/${route.params.id}`, {
      method: 'PUT',
      body: { ...form, price: form.price ? Number(form.price) : null }
    })
    router.push('/account/ads')
  } catch (e: any) {
    error.value = e.data?.message || 'Ошибка'
  } finally {
    loading.value = false
  }
}
</script>
