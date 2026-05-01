<template>
  <footer class="bg-[#02282C] text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28 sm:pb-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="text-2xl font-bold mb-3">Med<span class="text-[#1EC3BD]">&Beauty</span></div>
          <p class="text-white/60 text-sm">{{ tr.description }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-3 text-[#1EC3BD]">{{ tr.nav }}</h4>
          <ul class="space-y-2 text-sm text-white/60">
            <li><NuxtLink to="/catalog" class="hover:text-white transition-colors">{{ tr.catalog }}</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">{{ tr.about }}</NuxtLink></li>
            <li><NuxtLink to="/contacts" class="hover:text-white transition-colors">{{ tr.contacts }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-3 text-[#1EC3BD]">{{ tr.categories }}</h4>
          <ul class="space-y-2 text-sm text-white/60">
            <li>{{ tr.medicine }}</li>
            <li>{{ tr.beauty }}</li>
            <li>{{ tr.cosmetology }}</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/40">
        {{ tr.rights }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { locale, t: _t } = useLocale()
const tr = computed(() => ({
  description: _t('footer.description'),
  nav: _t('footer.nav'),
  catalog: _t('footer.catalog'),
  about: _t('footer.about'),
  contacts: _t('footer.contacts'),
  categories: _t('footer.categories'),
  medicine: _t('footer.medicine'),
  beauty: _t('footer.beauty'),
  cosmetology: _t('footer.cosmetology'),
  rights: _t('footer.rights'),
}))
</script>
