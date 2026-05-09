const categoryImages: Record<string, string> = {
  'Стоматология':         'https://loremflickr.com/400/300/dentist,dental?lock=1',
  'Психология':           'https://loremflickr.com/400/300/psychology,therapy?lock=2',
  'Терапия':              'https://loremflickr.com/400/300/doctor,clinic?lock=3',
  'Гинекология':          'https://loremflickr.com/400/300/medical,healthcare?lock=4',
  'Реабилитация':         'https://loremflickr.com/400/300/rehabilitation,physiotherapy?lock=5',
  'Массаж':               'https://loremflickr.com/400/300/massage,spa?lock=6',
  'Диетология':           'https://loremflickr.com/400/300/nutrition,healthy-food?lock=7',
  'ЛФК':                  'https://loremflickr.com/400/300/fitness,exercise?lock=8',
  'Косметология':         'https://loremflickr.com/400/300/cosmetology,skincare?lock=9',
  'Маникюр / Педикюр':   'https://loremflickr.com/400/300/manicure,nails?lock=10',
  'Парикмахер':           'https://loremflickr.com/400/300/hairdresser,haircut?lock=11',
  'Барбер':               'https://loremflickr.com/400/300/barbershop,barber?lock=12',
  'Визажист':             'https://loremflickr.com/400/300/makeup,beauty?lock=13',
  'Лазерная эпиляция':    'https://loremflickr.com/400/300/laser,beauty-salon?lock=14',
  'Бровист / Лешмейкер': 'https://loremflickr.com/400/300/eyebrows,lashes?lock=15',
  'SPA':                  'https://loremflickr.com/400/300/spa,relaxation?lock=16',
}

const categories = [
  'Стоматология', 'Психология', 'Терапия', 'Гинекология',
  'Реабилитация', 'Массаж', 'Диетология', 'ЛФК',
  'Косметология', 'Маникюр / Педикюр', 'Парикмахер', 'Барбер',
  'Визажист', 'Лазерная эпиляция', 'Бровист / Лешмейкер', 'SPA'
]

export default defineEventHandler(() => {
  return {
    categories,
    categoryImages
  }
})
