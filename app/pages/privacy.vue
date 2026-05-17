<template>
  <div class="bg-[#F7FAF8] min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 lg:pt-24 lg:pb-20">

      <!-- Mobile back arrow -->
      <button @click="router.back()"
        class="sm:hidden flex items-center gap-1.5 text-[#2D4D3A] hover:text-[#1EC3BD] transition-colors mb-4 -ml-1">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="text-sm font-medium">{{ locale === 'en' ? 'Back' : 'Назад' }}</span>
      </button>

      <!-- Hero -->
      <header class="mb-10 lg:mb-14">
        <div class="rounded-2xl bg-gradient-to-br from-[#2D4D3A] via-[#1F3A2C] to-[#02282C] px-6 py-10 sm:px-10 sm:py-14 shadow-[0_8px_40px_rgba(45,77,58,0.18)] relative overflow-hidden">
          <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#1EC3BD]/15 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-[#1EC3BD]/10 blur-3xl pointer-events-none"></div>
          <div class="relative">
            <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1EC3BD] bg-white/5 ring-1 ring-white/10 rounded-full px-3 py-1 mb-4">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z"/></svg>
              GDPR
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {{ locale === 'en' ? 'Privacy Policy' : 'Политика конфиденциальности' }}
            </h1>
            <p class="mt-3 text-[#B8D4C4] text-sm sm:text-base max-w-2xl">
              {{ locale === 'en'
                ? 'How BeautyMaster collects, uses, and protects your personal data.'
                : 'Как BeautyMaster собирает, использует и защищает ваши персональные данные.' }}
            </p>
            <div class="mt-5 inline-flex items-center gap-2 text-xs text-white/70">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {{ locale === 'en' ? 'Last updated: 10 May 2026' : 'Последнее обновление: 10 мая 2026 г.' }}
            </div>
          </div>
        </div>
      </header>

      <!-- Body -->
      <div class="lg:grid lg:grid-cols-12 lg:gap-10">

        <!-- TOC (desktop only) -->
        <aside class="hidden lg:block lg:col-span-4 xl:col-span-3">
          <nav class="sticky top-24 bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100">
            <div class="text-xs font-semibold uppercase tracking-wider text-[#5B5B5B] mb-4">
              {{ locale === 'en' ? 'Contents' : 'Содержание' }}
            </div>
            <ol class="space-y-1">
              <li v-for="(s, i) in sections" :key="s.id">
                <a :href="`#${s.id}`"
                   class="group flex items-start gap-3 py-2 px-3 -mx-3 rounded-lg text-sm text-[#3D3D3D] hover:bg-[#F5F8F6] hover:text-[#2D4D3A] transition-colors">
                  <span class="text-xs font-semibold text-[#5B5B5B] group-hover:text-[#1EC3BD] tabular-nums mt-0.5 w-4 shrink-0">{{ i + 1 }}</span>
                  <span class="leading-snug">{{ locale === 'en' ? s.en : s.ru }}</span>
                </a>
              </li>
            </ol>
          </nav>
        </aside>

        <!-- Sections -->
        <main class="lg:col-span-8 xl:col-span-9 space-y-5 lg:space-y-6 text-[#3D3D3D] text-[15px] leading-relaxed">

          <!-- 1 -->
          <section id="controller" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">1</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Data Controller' : 'Оператор персональных данных' }}</h2>
            </div>
            <p v-if="locale === 'en'">
              BeautyMaster ("we", "us", "our") is the data controller responsible for your personal data.
            </p>
            <p v-else>
              Оператором персональных данных является BeautyMaster («мы», «нас», «наш»).
            </p>
            <div class="mt-4 inline-flex items-center gap-2 text-sm bg-[#F5F8F6] rounded-lg px-4 py-2.5">
              <svg class="w-4 h-4 text-[#2D4D3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:adzyuber@gmail.com" class="text-[#2D4D3A] font-semibold hover:underline">adzyuber@gmail.com</a>
            </div>
          </section>

          <!-- 2 -->
          <section id="data" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">2</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Data We Collect' : 'Какие данные мы собираем' }}</h2>
            </div>
            <p class="mb-4">{{ locale === 'en' ? 'We collect the following personal data when you register or use our platform:' : 'При регистрации и использовании платформы мы собираем следующие данные:' }}</p>
            <ul class="grid sm:grid-cols-2 gap-2.5">
              <li v-for="item in dataItems" :key="item.en" class="flex items-start gap-2.5 text-sm text-[#3D3D3D]">
                <svg class="w-4 h-4 text-[#1EC3BD] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                <span>{{ locale === 'en' ? item.en : item.ru }}</span>
              </li>
            </ul>
          </section>

          <!-- 3 -->
          <section id="purposes" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">3</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Purposes and Legal Basis' : 'Цели и правовые основания обработки' }}</h2>
            </div>
            <div class="overflow-x-auto rounded-xl border border-gray-100">
              <table class="w-full text-sm border-collapse">
                <thead>
                  <tr class="bg-[#F5F8F6]">
                    <th class="text-left px-4 py-3 font-semibold text-[#2D4D3A]">{{ locale === 'en' ? 'Purpose' : 'Цель' }}</th>
                    <th class="text-left px-4 py-3 font-semibold text-[#2D4D3A]">{{ locale === 'en' ? 'Legal basis (GDPR Art. 6)' : 'Правовое основание (ст. 6 GDPR)' }}</th>
                  </tr>
                </thead>
                <tbody class="text-[#3D3D3D]">
                  <tr v-for="(row, i) in purposes" :key="row.en[0]" :class="i % 2 === 1 ? 'bg-gray-50/50' : ''" class="border-t border-gray-100">
                    <td class="px-4 py-3">{{ locale === 'en' ? row.en[0] : row.ru[0] }}</td>
                    <td class="px-4 py-3 text-[#5B5B5B]">{{ locale === 'en' ? row.en[1] : row.ru[1] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 4 -->
          <section id="retention" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">4</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Data Retention' : 'Сроки хранения данных' }}</h2>
            </div>
            <p v-if="locale === 'en'">
              We retain your personal data for as long as your account is active. If you delete your account, your personal data is deleted within <strong class="text-[#2D4D3A]">30 days</strong>, unless we are required by law to retain it longer.
            </p>
            <p v-else>
              Мы храним ваши персональные данные, пока ваш аккаунт активен. При удалении аккаунта данные удаляются в течение <strong class="text-[#2D4D3A]">30 дней</strong>, если иное не предусмотрено законодательством.
            </p>
          </section>

          <!-- 5 -->
          <section id="sharing" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">5</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Data Sharing' : 'Передача данных третьим лицам' }}</h2>
            </div>
            <p v-if="locale === 'en'">
              We do not sell your personal data. We may share it with trusted service providers (e.g. hosting, email delivery) who are bound by data processing agreements and process data only on our instructions. We do not transfer personal data outside the EEA without appropriate safeguards.
            </p>
            <p v-else>
              Мы не продаём ваши персональные данные. Мы можем передавать их доверенным поставщикам услуг (например, хостинг, доставка email), которые обязаны соблюдать соглашения об обработке данных и действовать только по нашим инструкциям. Передача данных за пределы ЕЭЗ осуществляется только при наличии надлежащих гарантий.
            </p>
          </section>

          <!-- 6 -->
          <section id="rights" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">6</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Your Rights' : 'Ваши права' }}</h2>
            </div>
            <p class="mb-4">{{ locale === 'en' ? 'Under the GDPR you have the following rights:' : 'В соответствии с GDPR вы имеете следующие права:' }}</p>
            <div class="grid sm:grid-cols-2 gap-3">
              <div v-for="right in rights" :key="right.en[0]" class="rounded-xl bg-[#F5F8F6] p-4 border border-[#E5EFE9]">
                <div class="font-semibold text-[#2D4D3A] text-sm mb-1">{{ locale === 'en' ? right.en[0] : right.ru[0] }}</div>
                <div class="text-xs text-[#5B5B5B] leading-relaxed">{{ locale === 'en' ? right.en[1] : right.ru[1] }}</div>
              </div>
            </div>
            <p class="mt-5 text-sm">
              {{ locale === 'en' ? 'To exercise any of these rights, contact us at ' : 'Для реализации любого из этих прав свяжитесь с нами: ' }}
              <a href="mailto:adzyuber@gmail.com" class="text-[#2D4D3A] font-semibold hover:underline">adzyuber@gmail.com</a>.
              {{ locale === 'en' ? 'We will respond within 30 days.' : 'Мы ответим в течение 30 дней.' }}
            </p>
          </section>

          <!-- 7 -->
          <section id="complaint" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">7</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Right to Lodge a Complaint' : 'Право на подачу жалобы' }}</h2>
            </div>
            <p v-if="locale === 'en'">
              If you believe we are processing your personal data unlawfully, you have the right to lodge a complaint with the supervisory authority in your country of residence. A list of EU data protection authorities is available at
              <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" class="text-[#2D4D3A] font-semibold hover:underline">edpb.europa.eu</a>.
            </p>
            <p v-else>
              Если вы считаете, что мы обрабатываем ваши данные незаконно, вы вправе подать жалобу в надзорный орган по защите данных в вашей стране. Список органов ЕС доступен на сайте
              <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" class="text-[#2D4D3A] font-semibold hover:underline">edpb.europa.eu</a>.
            </p>
          </section>

          <!-- 8 -->
          <section id="cookies" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">8</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Cookies' : 'Файлы cookie' }}</h2>
            </div>
            <p v-if="locale === 'en'">
              We use only technically necessary cookies required for authentication and session management. We do not use tracking or advertising cookies.
            </p>
            <p v-else>
              Мы используем только технически необходимые файлы cookie для аутентификации и управления сессией. Маркетинговые и отслеживающие cookie не применяются.
            </p>
          </section>

          <!-- 9 -->
          <section id="changes" class="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(45,77,58,0.07)] border border-gray-100 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#F5F8F6] text-[#2D4D3A] font-bold text-sm">9</span>
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ locale === 'en' ? 'Changes to This Policy' : 'Изменения политики' }}</h2>
            </div>
            <p v-if="locale === 'en'">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via a notice on the platform. The date of the latest revision is shown at the top of this page.
            </p>
            <p v-else>
              Мы можем периодически обновлять эту Политику. О существенных изменениях мы уведомим вас по электронной почте или через уведомление на платформе. Дата последнего обновления указана в начале страницы.
            </p>
          </section>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useLocale()
const router = useRouter()
useSeoMeta({ title: () => locale.value === 'en' ? 'Privacy Policy — BeautyMaster' : 'Политика конфиденциальности — BeautyMaster' })

const sections = [
  { id: 'controller', en: 'Data Controller', ru: 'Оператор персональных данных' },
  { id: 'data', en: 'Data We Collect', ru: 'Какие данные мы собираем' },
  { id: 'purposes', en: 'Purposes and Legal Basis', ru: 'Цели и правовые основания' },
  { id: 'retention', en: 'Data Retention', ru: 'Сроки хранения данных' },
  { id: 'sharing', en: 'Data Sharing', ru: 'Передача данных' },
  { id: 'rights', en: 'Your Rights', ru: 'Ваши права' },
  { id: 'complaint', en: 'Right to Lodge a Complaint', ru: 'Право на подачу жалобы' },
  { id: 'cookies', en: 'Cookies', ru: 'Файлы cookie' },
  { id: 'changes', en: 'Changes to This Policy', ru: 'Изменения политики' },
]

const dataItems = [
  { en: 'Full name', ru: 'Имя и фамилия' },
  { en: 'Email address', ru: 'Адрес электронной почты' },
  { en: 'Phone number', ru: 'Номер телефона' },
  { en: 'Organisation name (optional)', ru: 'Название организации (по желанию)' },
  { en: 'Content of listings and messages you post', ru: 'Содержимое объявлений и сообщений' },
  { en: 'Technical data: IP address, browser, device', ru: 'Технические данные: IP, браузер, устройство' },
]

const purposes = [
  { en: ['Creating and managing your account', 'Performance of a contract (Art. 6(1)(b))'],
    ru: ['Создание и управление аккаунтом', 'Исполнение договора (ст. 6(1)(б))'] },
  { en: ['Publishing and displaying listings', 'Performance of a contract (Art. 6(1)(b))'],
    ru: ['Публикация и отображение объявлений', 'Исполнение договора (ст. 6(1)(б))'] },
  { en: ['Sending service notifications', 'Legitimate interest (Art. 6(1)(f))'],
    ru: ['Отправка сервисных уведомлений', 'Законный интерес (ст. 6(1)(ф))'] },
  { en: ['Improving platform security and performance', 'Legitimate interest (Art. 6(1)(f))'],
    ru: ['Обеспечение безопасности и работы платформы', 'Законный интерес (ст. 6(1)(ф))'] },
  { en: ['Compliance with legal obligations', 'Legal obligation (Art. 6(1)(c))'],
    ru: ['Соблюдение правовых обязательств', 'Юридическое обязательство (ст. 6(1)(в))'] },
]

const rights = [
  { en: ['Right of access', 'Request a copy of your personal data.'],
    ru: ['Право на доступ', 'Запросить копию ваших персональных данных.'] },
  { en: ['Right to rectification', 'Correct inaccurate or incomplete data.'],
    ru: ['Право на исправление', 'Исправить неточные или неполные данные.'] },
  { en: ['Right to erasure', 'Request deletion of your data ("right to be forgotten").'],
    ru: ['Право на удаление', 'Потребовать удаления данных («право быть забытым»).'] },
  { en: ['Right to restriction', 'Request that we limit how we process your data.'],
    ru: ['Право на ограничение обработки', 'Ограничить обработку ваших данных.'] },
  { en: ['Right to data portability', 'Receive your data in a structured, machine-readable format.'],
    ru: ['Право на переносимость данных', 'Получить данные в структурированном машиночитаемом формате.'] },
  { en: ['Right to object', 'Object to processing based on legitimate interest.'],
    ru: ['Право на возражение', 'Возразить против обработки на основании законного интереса.'] },
  { en: ['Right to withdraw consent', 'Withdraw consent at any time without affecting prior processing.'],
    ru: ['Право отозвать согласие', 'Отозвать согласие в любое время.'] },
]
</script>
