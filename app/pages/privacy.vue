<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-3xl font-bold text-[#2D4D3A] mb-2">{{ locale === 'en' ? 'Privacy Policy' : 'Политика конфиденциальности' }}</h1>
    <p class="text-sm text-[#5B5B5B] mb-10">{{ locale === 'en' ? 'Last updated: 10 May 2026' : 'Последнее обновление: 10 мая 2026 г.' }}</p>

    <div class="space-y-10 text-[#3D3D3D] text-sm leading-relaxed">

      <!-- 1 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '1. Data Controller' : '1. Оператор персональных данных' }}</h2>
        <p v-if="locale === 'en'">
          BeautyMaster ("we", "us", "our") is the data controller responsible for your personal data.<br><br>
          Contact: <a href="mailto:adzyuber@gmail.com" class="text-[#2D4D3A] font-semibold hover:underline">adzyuber@gmail.com</a>
        </p>
        <p v-else>
          Оператором персональных данных является BeautyMaster («мы», «нас», «наш»).<br><br>
          Контакт: <a href="mailto:adzyuber@gmail.com" class="text-[#2D4D3A] font-semibold hover:underline">adzyuber@gmail.com</a>
        </p>
      </section>

      <!-- 2 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '2. Data We Collect' : '2. Какие данные мы собираем' }}</h2>
        <p class="mb-3">{{ locale === 'en' ? 'We collect the following personal data when you register or use our platform:' : 'При регистрации и использовании платформы мы собираем следующие данные:' }}</p>
        <ul class="list-disc list-inside space-y-1 text-[#5B5B5B]">
          <li v-if="locale === 'en'">Full name</li>
          <li v-else>Имя и фамилия</li>
          <li v-if="locale === 'en'">Email address</li>
          <li v-else>Адрес электронной почты</li>
          <li v-if="locale === 'en'">Phone number</li>
          <li v-else>Номер телефона</li>
          <li v-if="locale === 'en'">Organisation name (optional)</li>
          <li v-else>Название организации (по желанию)</li>
          <li v-if="locale === 'en'">Content of listings and messages you post</li>
          <li v-else>Содержимое объявлений и сообщений, которые вы публикуете</li>
          <li v-if="locale === 'en'">Technical data: IP address, browser type, device information</li>
          <li v-else>Технические данные: IP-адрес, тип браузера, информация об устройстве</li>
        </ul>
      </section>

      <!-- 3 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '3. Purposes and Legal Basis' : '3. Цели и правовые основания обработки' }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="bg-[#F5F8F6]">
                <th class="text-left px-3 py-2 font-semibold text-[#2D4D3A] border border-gray-200">{{ locale === 'en' ? 'Purpose' : 'Цель' }}</th>
                <th class="text-left px-3 py-2 font-semibold text-[#2D4D3A] border border-gray-200">{{ locale === 'en' ? 'Legal basis (GDPR Art. 6)' : 'Правовое основание (ст. 6 GDPR)' }}</th>
              </tr>
            </thead>
            <tbody class="text-[#5B5B5B]">
              <tr>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Creating and managing your account' : 'Создание и управление аккаунтом' }}</td>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Performance of a contract (Art. 6(1)(b))' : 'Исполнение договора (ст. 6(1)(б))' }}</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Publishing and displaying listings' : 'Публикация и отображение объявлений' }}</td>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Performance of a contract (Art. 6(1)(b))' : 'Исполнение договора (ст. 6(1)(б))' }}</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Sending service notifications' : 'Отправка сервисных уведомлений' }}</td>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Legitimate interest (Art. 6(1)(f))' : 'Законный интерес (ст. 6(1)(ф))' }}</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Improving platform security and performance' : 'Обеспечение безопасности и работы платформы' }}</td>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Legitimate interest (Art. 6(1)(f))' : 'Законный интерес (ст. 6(1)(ф))' }}</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Compliance with legal obligations' : 'Соблюдение правовых обязательств' }}</td>
                <td class="px-3 py-2 border border-gray-200">{{ locale === 'en' ? 'Legal obligation (Art. 6(1)(c))' : 'Юридическое обязательство (ст. 6(1)(в))' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '4. Data Retention' : '4. Сроки хранения данных' }}</h2>
        <p v-if="locale === 'en'">
          We retain your personal data for as long as your account is active. If you delete your account, your personal data is deleted within <strong>30 days</strong>, unless we are required by law to retain it longer.
        </p>
        <p v-else>
          Мы храним ваши персональные данные, пока ваш аккаунт активен. При удалении аккаунта данные удаляются в течение <strong>30 дней</strong>, если иное не предусмотрено законодательством.
        </p>
      </section>

      <!-- 5 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '5. Data Sharing' : '5. Передача данных третьим лицам' }}</h2>
        <p v-if="locale === 'en'">
          We do not sell your personal data. We may share it with trusted service providers (e.g. hosting, email delivery) who are bound by data processing agreements and process data only on our instructions. We do not transfer personal data outside the EEA without appropriate safeguards.
        </p>
        <p v-else>
          Мы не продаём ваши персональные данные. Мы можем передавать их доверенным поставщикам услуг (например, хостинг, доставка email), которые обязаны соблюдать соглашения об обработке данных и действовать только по нашим инструкциям. Передача данных за пределы ЕЭЗ осуществляется только при наличии надлежащих гарантий.
        </p>
      </section>

      <!-- 6 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '6. Your Rights' : '6. Ваши права' }}</h2>
        <p class="mb-3">{{ locale === 'en' ? 'Under the GDPR you have the following rights:' : 'В соответствии с GDPR вы имеете следующие права:' }}</p>
        <ul class="space-y-2 text-[#5B5B5B]">
          <template v-if="locale === 'en'">
            <li><strong class="text-[#3D3D3D]">Right of access</strong> — request a copy of your personal data.</li>
            <li><strong class="text-[#3D3D3D]">Right to rectification</strong> — correct inaccurate or incomplete data.</li>
            <li><strong class="text-[#3D3D3D]">Right to erasure</strong> — request deletion of your data ("right to be forgotten").</li>
            <li><strong class="text-[#3D3D3D]">Right to restriction</strong> — request that we limit how we process your data.</li>
            <li><strong class="text-[#3D3D3D]">Right to data portability</strong> — receive your data in a structured, machine-readable format.</li>
            <li><strong class="text-[#3D3D3D]">Right to object</strong> — object to processing based on legitimate interest.</li>
            <li><strong class="text-[#3D3D3D]">Right to withdraw consent</strong> — withdraw consent at any time without affecting prior processing.</li>
          </template>
          <template v-else>
            <li><strong class="text-[#3D3D3D]">Право на доступ</strong> — запросить копию ваших персональных данных.</li>
            <li><strong class="text-[#3D3D3D]">Право на исправление</strong> — исправить неточные или неполные данные.</li>
            <li><strong class="text-[#3D3D3D]">Право на удаление</strong> — потребовать удаления данных («право быть забытым»).</li>
            <li><strong class="text-[#3D3D3D]">Право на ограничение обработки</strong> — ограничить обработку ваших данных.</li>
            <li><strong class="text-[#3D3D3D]">Право на переносимость данных</strong> — получить данные в структурированном, машиночитаемом формате.</li>
            <li><strong class="text-[#3D3D3D]">Право на возражение</strong> — возразить против обработки на основании законного интереса.</li>
            <li><strong class="text-[#3D3D3D]">Право отозвать согласие</strong> — отозвать согласие в любое время, не затрагивая законность обработки до момента отзыва.</li>
          </template>
        </ul>
        <p class="mt-4">
          {{ locale === 'en' ? 'To exercise any of these rights, contact us at ' : 'Для реализации любого из этих прав свяжитесь с нами: ' }}
          <a href="mailto:adzyuber@gmail.com" class="text-[#2D4D3A] font-semibold hover:underline">adzyuber@gmail.com</a>.
          {{ locale === 'en' ? 'We will respond within 30 days.' : 'Мы ответим в течение 30 дней.' }}
        </p>
      </section>

      <!-- 7 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '7. Right to Lodge a Complaint' : '7. Право на подачу жалобы' }}</h2>
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
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '8. Cookies' : '8. Файлы cookie' }}</h2>
        <p v-if="locale === 'en'">
          We use only technically necessary cookies required for authentication and session management. We do not use tracking or advertising cookies.
        </p>
        <p v-else>
          Мы используем только технически необходимые файлы cookie для аутентификации и управления сессией. Маркетинговые и отслеживающие cookie не применяются.
        </p>
      </section>

      <!-- 9 -->
      <section>
        <h2 class="text-lg font-bold text-[#2D4D3A] mb-3">{{ locale === 'en' ? '9. Changes to This Policy' : '9. Изменения политики' }}</h2>
        <p v-if="locale === 'en'">
          We may update this Privacy Policy from time to time. We will notify you of significant changes by email or via a notice on the platform. The date of the latest revision is shown at the top of this page.
        </p>
        <p v-else>
          Мы можем периодически обновлять эту Политику. О существенных изменениях мы уведомим вас по электронной почте или через уведомление на платформе. Дата последнего обновления указана в начале страницы.
        </p>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useLocale()
useSeoMeta({ title: () => locale.value === 'en' ? 'Privacy Policy — BeautyMaster' : 'Политика конфиденциальности — BeautyMaster' })
</script>
