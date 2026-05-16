const messages = {
  ru: {
    // Navbar
    'nav.place': '+ Подать объявление',
    'nav.login': 'Войти',
    'nav.register': 'Регистрация',
    'nav.profile': 'Мой профиль',
    'nav.myAds': 'Мои объявления',
    'nav.messages': 'Сообщения',
    'nav.admin': 'Администратор',
    'nav.logout': 'Выйти',
    'nav.home': 'Главная',
    'nav.create': 'Создать',
    'nav.chat': 'Чат',
    'nav.profile': 'Профиль',

    // Home
    'home.hero.title': 'Найдите специалиста по',
    'home.hero.accent': 'красоте и здоровью',
    'home.hero.placeholder': 'Массаж, стоматология, маникюр...',
    'home.hero.city': 'Город',
    'home.hero.search': 'Найти',
    'home.categories.title': 'Популярные категории',
    'home.categories.subtitle': 'Выберите направление которое вас интересует',
    'home.ads.title': 'Новые объявления',
    'home.ads.subtitle': 'Свежие предложения специалистов',
    'home.ads.all': 'Смотреть все →',
    'home.cta.title': 'Готовы разместить объявление?',
    'home.cta.subtitle': 'Присоединяйтесь к тысячам специалистов на нашей платформе',
    'home.cta.register': 'Зарегистрироваться',
    'home.cta.find': 'Найти специалиста',

    // Catalog
    'mobile.searchPlaceholder': 'Поиск специалистов...',
    'catalog.title': 'Каталог услуг',
    'catalog.subtitle': 'Найдите специалиста под ваши задачи',
    'catalog.search': 'Услуга или специалист...',
    'catalog.city': 'Город',
    'catalog.allCats': 'Все категории',
    'catalog.allSubs': 'Все подкатегории',
    'catalog.find': 'Найти',
    'catalog.reset': 'Сбросить всё',
    'catalog.found': 'Найдено:',
    'catalog.ads': 'объявлений',
    'catalog.empty': 'Объявлений не найдено',
    'catalog.emptyHint': 'Попробуйте изменить параметры поиска',
    'catalog.activeFilters': 'Активные фильтры:',

    // Ad page
    'ad.description': 'Описание',
    'ad.details': 'Детали',
    'ad.category': 'Категория',
    'ad.subcategory': 'Направление',
    'ad.city': 'Город',
    'ad.address': 'Адрес',
    'ad.date': 'Дата публикации',
    'ad.publishedOn': 'Опубликовано',
    'ad.contacts': 'Контакты',
    'ad.writeMsg': 'Написать сообщение',
    'ad.loginToWrite': 'Войдите чтобы написать',
    'ad.edit': 'Редактировать',
    'ad.delete': 'Удалить',
    'ad.price.negotiable': 'Цена договорная',
    'ad.back': '← Каталог',

    // Account
    'account.profile': 'Мой профиль',
    'account.name': 'Имя',
    'account.org': 'Организация',
    'account.orgHint': 'Необязательно',
    'account.website': 'Сайт организации',
    'account.websiteHint': 'https://example.com',
    'account.avatar': 'Фото профиля',
    'account.avatarChange': 'Изменить фото',
    'account.avatarUploading': 'Загружаем...',
    'account.save': 'Сохранить',
    'account.saving': 'Сохраняем...',
    'account.saved': 'Профиль сохранён ✓',
    'account.language': 'Язык',
    'account.myAds': 'Мои объявления',
    'account.createAd': 'Создать объявление',
    'account.messages': 'Сообщения',
    'account.place': '+ Подать объявление',
    'account.noAds': 'У вас нет объявлений',
    'account.noAdsHint': 'Разместите своё первое объявление',
    'account.view': 'Просмотр',
    'account.editAd': 'Изменить',
    'account.deleteAd': 'Удалить',
    'account.active': 'Активно',
    'account.inactive': 'Неактивно',
    'account.pending': 'На проверке',
    'account.rejected': 'Отклонено',
    'account.rejectionReason': 'Причина отклонения',
    'account.dialogs': 'Диалоги',
    'account.noDialogs': 'Нет диалогов',
    'account.selectDialog': 'Выберите диалог для просмотра',
    'account.msgPlaceholder': 'Написать сообщение...',
    'account.send': 'Отправить',
    'account.createTitle': 'Разместить объявление',
    'account.editTitle': 'Редактировать объявление',

    // Footer
    'footer.description': 'Современная платформа для поиска специалистов в сфере красоты и здоровья.',
    'footer.nav': 'Навигация',
    'footer.catalog': 'Каталог',
    'footer.about': 'О проекте',
    'footer.contacts': 'Контакты',
    'footer.categories': 'Категории',
    'footer.medicine': 'Медицина',
    'footer.beauty': 'Beauty-услуги',
    'footer.cosmetology': 'Косметология',
    'footer.rights': '© 2026 BeautyMaster. Все права защищены.',

    // Login
    'login.title': 'Вход в аккаунт',
    'login.subtitle': 'Войдите по email или номеру телефона',
    'login.label': 'Email или телефон',
    'login.placeholder': '+7 999 123-45-67 или email@mail.com',
    'login.password': 'Пароль',
    'login.loading': 'Входим...',
    'login.submit': 'Войти',
    'login.noAccount': 'Нет аккаунта?',
    'login.register': 'Зарегистрируйтесь',
    'login.error': 'Ошибка входа',
    'err.missing_fields': 'Заполните все обязательные поля',
    'err.invalid_credentials': 'Неверный логин или пароль',
    'err.invalid_email': 'Введите корректный email',
    'err.duplicate_account': 'Email или телефон уже зарегистрирован',
    'err.password_too_short': 'Пароль слишком короткий',
    'err.invalid_token': 'Некорректная ссылка',
    'err.token_expired': 'Ссылка недействительна или истекла',
    'login.forgot': 'Забыли пароль?',

    // Forgot password
    'forgot.title': 'Восстановление пароля',
    'forgot.subtitle': 'Введите email — пришлём ссылку для сброса',
    'forgot.email': 'Email',
    'forgot.submit': 'Отправить ссылку',
    'forgot.loading': 'Отправляем...',
    'forgot.sent': 'Если такой email зарегистрирован, мы отправили на него письмо со ссылкой для сброса пароля. Проверьте папку «Спам», если письма нет.',
    'forgot.error': 'Не удалось отправить письмо',
    'forgot.backToLogin': '← Вернуться ко входу',

    // Reset password
    'reset.title': 'Новый пароль',
    'reset.subtitle': 'Придумайте новый пароль для аккаунта',
    'reset.password': 'Новый пароль',
    'reset.confirm': 'Повторите пароль',
    'reset.submit': 'Сохранить и войти',
    'reset.loading': 'Сохраняем...',
    'reset.mismatch': 'Пароли не совпадают',
    'reset.invalidLink': 'Ссылка недействительна. Запросите новую через «Забыли пароль?».',
    'reset.error': 'Не удалось обновить пароль',
    'reset.backToLogin': '← Вернуться ко входу',

    // Register
    'register.title': 'Создать аккаунт',
    'register.subtitle': 'Присоединяйтесь к платформе специалистов',
    'register.name': 'Имя',
    'register.namePlaceholder': 'Иван Иванов',
    'register.phone': 'Телефон',
    'register.phonePlaceholder': '+7 999 123-45-67',
    'register.email': 'Email',
    'register.password': 'Пароль',
    'register.passwordPlaceholder': 'Минимум 8 символов',
    'register.org': 'Организация (необязательно)',
    'register.orgPlaceholder': 'Название клиники, салона...',
    'register.loading': 'Регистрируем...',
    'register.submit': 'Зарегистрироваться',
    'register.hasAccount': 'Уже есть аккаунт?',
    'register.login': 'Войдите',
    'register.error': 'Ошибка регистрации',
    'register.consent': 'Я даю согласие на обработку персональных данных в соответствии с',
    'register.consentLink': 'Политикой конфиденциальности',
    'register.consentAfter': '',
    'register.consentRequired': 'Необходимо дать согласие на обработку персональных данных',

    // About
    'about.title': 'О проекте',
    'about.subtitle': 'BeautyMaster — современная платформа для поиска и размещения объявлений в сфере медицины и beauty-услуг.',
    'about.medicine.title': 'Медицинские услуги',
    'about.medicine.desc': 'Стоматологи, терапевты, психологи, массажисты и другие медицинские специалисты.',
    'about.beauty.title': 'Beauty-услуги',
    'about.beauty.desc': 'Косметологи, мастера маникюра, парикмахеры, барберы, визажисты и SPA-мастера.',

    // Contacts
    'contacts.title': 'Контакты',
    'contacts.subtitle': 'Мы всегда рады помочь!',
    'contacts.phone': 'Телефон',

    // Profile additions
    'account.phone': 'Телефон',
    'account.loginHint': 'Для просмотра профиля необходимо войти',

    // Breadcrumb
    'nav.home': 'Главная',
    'nav.catalog': 'Каталог',

    // Form
    'form.mainInfo': 'Основная информация',
    'form.title': 'Заголовок',
    'form.titlePlaceholder': 'Напр: Массаж спины, 60 мин',
    'form.category': 'Категория',
    'form.subcategory': 'Подкатегория',
    'form.description': 'Описание',
    'form.descPlaceholder': 'Подробно опишите услугу, ваш опыт, условия...',
    'form.price': 'Цена (€)',
    'form.pricePlaceholder': 'Оставьте пустым если договорная',
    'form.city': 'Город',
    'form.cityPlaceholder': 'Москва',
    'form.address': 'Адрес',
    'form.addressPlaceholder': 'Необязательно',
    'form.select': 'Выберите...',
    'form.photos': 'Фотографии',
    'form.photosHint': 'до 10 штук',
    'form.addPhoto': 'Добавить',
    'form.uploading': 'Загружаем фото...',
    'form.uploadError': 'Ошибка загрузки фото',
    'form.saveError': 'Ошибка сохранения',

    // Common
    'common.cancel': 'Отмена',
    'common.publish': 'Опубликовать объявление',
    'common.saveChanges': 'Сохранить изменения',
    'common.saving': 'Сохраняем...',
    'common.loginRequired': 'Войти',
    'common.send': 'Отправить',
    'common.sending': 'Отправляем...',
    'common.msgPlaceholder': 'Введите ваше сообщение...',
    'common.deleteConfirm': 'Удалить объявление?',

    // Notifications
    'notif.title': 'Уведомления',
    'notif.markAllRead': 'Прочитать все',
    'notif.empty': 'Уведомлений пока нет',
    'notif.emptyDesc': 'Здесь появятся статусы ваших объявлений — одобрение, отклонение или деактивация',
    'notif.approved': 'Объявление опубликовано',
    'notif.approvedDesc': 'Прошло модерацию и теперь видно всем пользователям',
    'notif.rejected': 'Объявление отклонено',
    'notif.rejectedDesc': 'Не прошло модерацию. Вы можете отредактировать и подать снова',
    'notif.inactive': 'Объявление деактивировано',
    'notif.inactiveDesc': 'Скрыто из каталога администратором',
    'notif.updated': 'Статус изменён',
    'notif.updatedDesc': 'Статус вашего объявления был изменён',
    'notif.reasonLabel': 'Причина:',
    'notif.justNow': 'Только что',
    'notif.minutesAgo': '{n} мин. назад',
    'notif.hoursAgo': '{n} ч. назад',
    'notif.daysAgo': '{n} дн. назад',
    'notif.newMessages': 'Новых сообщений: {n}',
    'notif.delete': 'Удалить уведомление',
  },

  en: {
    // Navbar
    'nav.place': '+ Post a listing',
    'nav.login': 'Sign in',
    'nav.register': 'Sign Up',
    'nav.profile': 'My profile',
    'nav.myAds': 'My ads',
    'nav.messages': 'Messages',
    'nav.admin': 'Admin panel',
    'nav.logout': 'Sign out',
    'nav.home': 'Home',
    'nav.create': 'Create',
    'nav.chat': 'Chat',
    'nav.profile': 'Profile',

    // Home
    'home.hero.title': 'Find a specialist in',
    'home.hero.accent': 'beauty and wellness',
    'home.hero.placeholder': 'Massage, dentistry, manicure...',
    'home.hero.city': 'City',
    'home.hero.search': 'Search',
    'home.categories.title': 'Popular categories',
    'home.categories.subtitle': 'Choose the direction you are interested in',
    'home.ads.title': 'New listings',
    'home.ads.subtitle': 'Fresh offers from specialists',
    'home.ads.all': 'View all →',
    'home.cta.title': 'Ready to post an ad?',
    'home.cta.subtitle': 'Join thousands of specialists on our platform',
    'home.cta.register': 'Sign up',
    'home.cta.find': 'Find a specialist',

    // Catalog
    'mobile.searchPlaceholder': 'Search specialists...',
    'catalog.title': 'Service catalog',
    'catalog.subtitle': 'Find a specialist for your needs',
    'catalog.search': 'Service or specialist...',
    'catalog.city': 'City',
    'catalog.allCats': 'All categories',
    'catalog.allSubs': 'All subcategories',
    'catalog.find': 'Search',
    'catalog.reset': 'Reset all',
    'catalog.found': 'Found:',
    'catalog.ads': 'listings',
    'catalog.empty': 'No listings found',
    'catalog.emptyHint': 'Try changing the search parameters',
    'catalog.activeFilters': 'Active filters:',

    // Ad page
    'ad.description': 'Description',
    'ad.details': 'Details',
    'ad.category': 'Category',
    'ad.subcategory': 'Direction',
    'ad.city': 'City',
    'ad.address': 'Address',
    'ad.date': 'Published',
    'ad.publishedOn': 'Published',
    'ad.contacts': 'Contacts',
    'ad.writeMsg': 'Send a message',
    'ad.loginToWrite': 'Sign in to write',
    'ad.edit': 'Edit',
    'ad.delete': 'Delete',
    'ad.price.negotiable': 'Price negotiable',
    'ad.back': '← Catalog',

    // Account
    'account.profile': 'My profile',
    'account.name': 'Name',
    'account.org': 'Organization',
    'account.orgHint': 'Optional',
    'account.website': 'Organization website',
    'account.websiteHint': 'https://example.com',
    'account.avatar': 'Profile photo',
    'account.avatarChange': 'Change photo',
    'account.avatarUploading': 'Uploading...',
    'account.save': 'Save',
    'account.saving': 'Saving...',
    'account.saved': 'Profile saved ✓',
    'account.language': 'Language',
    'account.myAds': 'My ads',
    'account.createAd': 'Create listing',
    'account.messages': 'Messages',
    'account.place': '+ Post a listing',
    'account.noAds': 'You have no listings',
    'account.noAdsHint': 'Post your first listing',
    'account.view': 'View',
    'account.editAd': 'Edit',
    'account.deleteAd': 'Delete',
    'account.active': 'Active',
    'account.inactive': 'Inactive',
    'account.pending': 'Under review',
    'account.rejected': 'Rejected',
    'account.rejectionReason': 'Rejection reason',
    'account.dialogs': 'Chats',
    'account.noDialogs': 'No chats yet',
    'account.selectDialog': 'Select a chat to view',
    'account.msgPlaceholder': 'Write a message...',
    'account.send': 'Send',
    'account.createTitle': 'Post an ad',
    'account.editTitle': 'Edit ad',

    // Footer
    'footer.description': 'A modern platform to find beauty and wellness specialists.',
    'footer.nav': 'Navigation',
    'footer.catalog': 'Catalog',
    'footer.about': 'About',
    'footer.contacts': 'Contacts',
    'footer.categories': 'Categories',
    'footer.medicine': 'Medicine',
    'footer.beauty': 'Beauty services',
    'footer.cosmetology': 'Cosmetology',
    'footer.rights': '© 2026 BeautyMaster. All rights reserved.',

    // Login
    'login.title': 'Sign in',
    'login.subtitle': 'Sign in with your email or phone number',
    'login.label': 'Email or phone',
    'login.placeholder': '+7 999 123-45-67 or email@mail.com',
    'login.password': 'Password',
    'login.loading': 'Signing in...',
    'login.submit': 'Sign in',
    'login.noAccount': 'No account?',
    'login.register': 'Sign Up',
    'login.error': 'Sign in error',
    'err.missing_fields': 'Please fill in all required fields',
    'err.invalid_credentials': 'Invalid login or password',
    'err.invalid_email': 'Enter a valid email',
    'err.duplicate_account': 'This email or phone is already registered',
    'err.password_too_short': 'Password is too short',
    'err.invalid_token': 'Invalid link',
    'err.token_expired': 'Link is invalid or expired',
    'login.forgot': 'Forgot password?',

    // Forgot password
    'forgot.title': 'Reset your password',
    'forgot.subtitle': 'Enter your email and we will send a reset link',
    'forgot.email': 'Email',
    'forgot.submit': 'Send reset link',
    'forgot.loading': 'Sending...',
    'forgot.sent': 'If this email is registered, we have sent a password reset link. Please check your spam folder if you do not see it.',
    'forgot.error': 'Failed to send email',
    'forgot.backToLogin': '← Back to sign in',

    // Reset password
    'reset.title': 'New password',
    'reset.subtitle': 'Choose a new password for your account',
    'reset.password': 'New password',
    'reset.confirm': 'Confirm password',
    'reset.submit': 'Save and sign in',
    'reset.loading': 'Saving...',
    'reset.mismatch': 'Passwords do not match',
    'reset.invalidLink': 'This link is invalid. Request a new one via "Forgot password?".',
    'reset.error': 'Failed to update password',
    'reset.backToLogin': '← Back to sign in',

    // Register
    'register.title': 'Sign up',
    'register.subtitle': 'Join the specialist platform',
    'register.name': 'Name',
    'register.namePlaceholder': 'John Smith',
    'register.phone': 'Phone',
    'register.phonePlaceholder': '+7 999 123-45-67',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.passwordPlaceholder': 'Minimum 8 characters',
    'register.org': 'Organization (optional)',
    'register.orgPlaceholder': 'Clinic or salon name...',
    'register.loading': 'Signing up...',
    'register.submit': 'Sign up',
    'register.hasAccount': 'Already have an account?',
    'register.login': 'Sign in',
    'register.error': 'Registration error',
    'register.consent': 'I consent to the processing of my personal data in accordance with the',
    'register.consentLink': 'Privacy Policy',
    'register.consentAfter': '',
    'register.consentRequired': 'Please consent to the processing of your personal data to continue',

    // About
    'about.title': 'About',
    'about.subtitle': 'BeautyMaster — a modern platform for finding and posting listings in medicine and beauty services.',
    'about.medicine.title': 'Medical services',
    'about.medicine.desc': 'Dentists, therapists, psychologists, massage therapists and other medical specialists.',
    'about.beauty.title': 'Beauty services',
    'about.beauty.desc': 'Cosmetologists, manicure masters, hairdressers, barbers, makeup artists and SPA masters.',

    // Contacts
    'contacts.title': 'Contacts',
    'contacts.subtitle': 'We are always happy to help!',
    'contacts.phone': 'Phone',

    // Profile additions
    'account.phone': 'Phone',
    'account.loginHint': 'Please sign in to view your profile',

    // Breadcrumb
    'nav.home': 'Home',
    'nav.catalog': 'Catalog',

    // Form
    'form.mainInfo': 'Main information',
    'form.title': 'Title',
    'form.titlePlaceholder': 'E.g. Back massage, 60 min',
    'form.category': 'Category',
    'form.subcategory': 'Subcategory',
    'form.description': 'Description',
    'form.descPlaceholder': 'Describe the service, your experience, terms...',
    'form.price': 'Price (€)',
    'form.pricePlaceholder': 'Leave empty if negotiable',
    'form.city': 'City',
    'form.cityPlaceholder': 'Moscow',
    'form.address': 'Address',
    'form.addressPlaceholder': 'Optional',
    'form.select': 'Select...',
    'form.photos': 'Photos',
    'form.photosHint': 'up to 10',
    'form.addPhoto': 'Add',
    'form.uploading': 'Uploading photo...',
    'form.uploadError': 'Photo upload error',
    'form.saveError': 'Save error',

    // Common
    'common.cancel': 'Cancel',
    'common.publish': 'Publish listing',
    'common.saveChanges': 'Save changes',
    'common.saving': 'Saving...',
    'common.loginRequired': 'Sign in',
    'common.send': 'Send',
    'common.sending': 'Sending...',
    'common.msgPlaceholder': 'Enter your message...',
    'common.deleteConfirm': 'Delete listing?',

    // Notifications
    'notif.title': 'Notifications',
    'notif.markAllRead': 'Mark all read',
    'notif.empty': 'No notifications yet',
    'notif.emptyDesc': 'Listing status updates will appear here — approvals, rejections and deactivations',
    'notif.approved': 'Listing approved',
    'notif.rejected': 'Listing rejected',
    'notif.inactive': 'Listing deactivated',
    'notif.updated': 'Status updated',
    'notif.approved': 'Listing published',
    'notif.approvedDesc': 'Passed moderation and is now visible to everyone',
    'notif.rejected': 'Listing rejected',
    'notif.rejectedDesc': 'Did not pass moderation. You can edit and resubmit',
    'notif.inactive': 'Listing deactivated',
    'notif.inactiveDesc': 'Hidden from the catalog by an administrator',
    'notif.updated': 'Status updated',
    'notif.updatedDesc': 'The status of your listing has been changed',
    'notif.reasonLabel': 'Reason:',
    'notif.justNow': 'Just now',
    'notif.minutesAgo': '{n} min ago',
    'notif.hoursAgo': '{n} h ago',
    'notif.daysAgo': '{n} d ago',
    'notif.newMessages': '{n} new messages',
    'notif.delete': 'Delete notification',
  }
}

const categoryNames: Record<string, Record<string, string>> = {
  ru: {
    'Стоматология': 'Стоматология', 'Психология': 'Психология', 'Терапия': 'Терапия',
    'Гинекология': 'Гинекология', 'Реабилитация': 'Реабилитация', 'Массаж': 'Массаж',
    'Диетология': 'Диетология', 'ЛФК': 'ЛФК', 'Косметология': 'Косметология',
    'Маникюр / Педикюр': 'Маникюр / Педикюр', 'Парикмахер': 'Парикмахер',
    'Барбер': 'Барбер', 'Визажист': 'Визажист', 'Лазерная эпиляция': 'Лазерная эпиляция',
    'Бровист / Лешмейкер': 'Бровист / Лешмейкер', 'SPA': 'SPA',
  },
  en: {
    'Стоматология': 'Dentistry', 'Психология': 'Psychology', 'Терапия': 'Therapy',
    'Гинекология': 'Gynecology', 'Реабилитация': 'Rehabilitation', 'Массаж': 'Massage',
    'Диетология': 'Dietology', 'ЛФК': 'Exercise Therapy', 'Косметология': 'Cosmetology',
    'Маникюр / Педикюр': 'Manicure / Pedicure', 'Парикмахер': 'Hairdresser',
    'Барбер': 'Barber', 'Визажист': 'Makeup Artist', 'Лазерная эпиляция': 'Laser Hair Removal',
    'Бровист / Лешмейкер': 'Brow / Lash Artist', 'SPA': 'SPA',
  },
}

export function useLocale() {
  const cookie = useCookie<'ru' | 'en'>('locale', {
    default: () => 'en',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/'
  })

  const locale = useState<'ru' | 'en'>('locale', () => cookie.value === 'ru' ? 'ru' : 'en')

  function setLocale(l: 'ru' | 'en') {
    locale.value = l
    cookie.value = l
  }

  function t(key: string, params?: Record<string, any>): string {
    let msg: string = (messages[locale.value] as any)[key] ?? (messages.ru as any)[key] ?? key
    if (params) {
      Object.entries(params).forEach(([k, v]) => { msg = msg.replace(`{${k}}`, String(v)) })
    }
    return msg
  }

  function tCat(name: string): string {
    return categoryNames[locale.value]?.[name] ?? categoryNames['ru']?.[name] ?? name
  }

  const tSub = tCat

  function tError(e: any, fallbackKey: string): string {
    const code = e?.data?.data?.code ?? e?.data?.code
    if (code) {
      const key = `err.${code}`
      const msg = (messages[locale.value] as any)[key]
      if (msg) return msg
    }
    return e?.data?.message || t(fallbackKey)
  }

  return { locale, setLocale, t, tCat, tSub, tError }
}
