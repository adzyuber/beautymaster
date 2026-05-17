<template>
  <footer class="bg-[#02282C] text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28 sm:pb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand + contacts -->
        <div>
          <div class="text-2xl font-bold mb-3">Beauty<span class="text-[#1EC3BD]">Master</span></div>
          <p class="text-white/60 text-sm mb-4">{{ tr.description }}</p>
          <ul class="space-y-2 text-sm text-white/60">
            <li>
              <a href="mailto:adzyuber@gmail.com" class="hover:text-white transition-colors break-all">adzyuber@gmail.com</a>
            </li>
            <li>
              <NuxtLink to="/contacts" class="hover:text-white transition-colors">{{ tr.writeUs }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-semibold mb-3 text-[#1EC3BD]">{{ tr.nav }}</h4>
          <ul class="space-y-2 text-sm text-white/60">
            <li><NuxtLink to="/catalog" class="hover:text-white transition-colors">{{ tr.catalog }}</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">{{ tr.about }}</NuxtLink></li>
            <li><NuxtLink to="/contacts" class="hover:text-white transition-colors">{{ tr.contacts }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories (from DB) -->
        <div>
          <h4 class="font-semibold mb-3 text-[#1EC3BD]">{{ tr.categories }}</h4>
          <ul class="space-y-2 text-sm text-white/60">
            <li v-for="cat in topCategories" :key="cat.slug">
              <NuxtLink :to="`/catalog?category=${cat.slug}`" class="hover:text-white transition-colors">
                {{ locale === 'en' ? cat.nameEn : cat.nameRu }}
              </NuxtLink>
            </li>
            <li v-if="categories.length > topCategories.length">
              <NuxtLink to="/catalog" class="hover:text-white transition-colors font-medium">
                {{ tr.allCategories }} →
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- For specialists -->
        <div>
          <h4 class="font-semibold mb-3 text-[#1EC3BD]">{{ tr.forSpecialists }}</h4>
          <ul class="space-y-2 text-sm text-white/60">
            <li>
              <NuxtLink to="/account/create" class="hover:text-white transition-colors">{{ tr.postAd }}</NuxtLink>
            </li>
            <template v-if="authStore.isLoggedIn">
              <li>
                <NuxtLink to="/account/ads" class="hover:text-white transition-colors">{{ tr.myAds }}</NuxtLink>
              </li>
            </template>
            <template v-else>
              <li>
                <NuxtLink to="/login" class="hover:text-white transition-colors">{{ tr.login }}</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/register" class="hover:text-white transition-colors">{{ tr.register }}</NuxtLink>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
        <div>{{ tr.rights }}</div>
        <NuxtLink to="/privacy" class="hover:text-white transition-colors">{{ tr.privacy }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const { locale, t: _t } = useLocale()
const authStore = useAuthStore()
const { categories } = await useCategories()

const topCategories = computed(() => categories.value.slice(0, 5))

const tr = computed(() => ({
  description: _t('footer.description'),
  nav: _t('footer.nav'),
  catalog: _t('footer.catalog'),
  about: _t('footer.about'),
  contacts: _t('footer.contacts'),
  categories: _t('footer.categories'),
  allCategories: _t('footer.allCategories'),
  forSpecialists: _t('footer.forSpecialists'),
  postAd: _t('footer.postAd'),
  myAds: _t('footer.myAds'),
  login: _t('footer.login'),
  register: _t('footer.register'),
  writeUs: _t('footer.writeUs'),
  privacy: _t('footer.privacy'),
  rights: _t('footer.rights'),
}))
</script>
