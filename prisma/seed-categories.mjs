import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = [
  {
    slug: 'dentistry', nameRu: 'Стоматология', nameEn: 'Dentistry',
    iconBg: '#E0F7F6', iconColor: '#02282C',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.5 5h7c.8 0 1.5.7 1.5 1.5v2A4.5 4.5 0 0112 13a4.5 4.5 0 01-4.5-4.5v-2C7.5 5.7 8.2 5 9 5z"/><path stroke-linecap="round" stroke-width="1.5" d="M10 13l-.8 7h5.6L14 13"/>',
    imageUrl: 'https://loremflickr.com/400/300/dentist,dental?lock=1',
    keyword: 'dentist,dental',
  },
  {
    slug: 'psychology', nameRu: 'Психология', nameEn: 'Psychology',
    iconBg: '#EDE9FE', iconColor: '#5B21B6',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3.5C7.3 3.5 6 4.8 6 6.5c0 .7.2 1.3.6 1.8C5.6 9 5 10.2 5 11.5c0 1.8 1.1 3.4 2.7 4.1V18h8.6v-2.4c1.6-.7 2.7-2.3 2.7-4.1 0-1.3-.6-2.5-1.6-3.2.4-.5.6-1.1.6-1.8C18 4.8 16.7 3.5 15 3.5c-.9 0-1.7.4-2.3 1A3.5 3.5 0 009 3.5z"/>',
    imageUrl: 'https://loremflickr.com/400/300/psychology,therapy?lock=2',
    keyword: 'psychology,therapy',
  },
  {
    slug: 'therapy', nameRu: 'Терапия', nameEn: 'Therapy',
    iconBg: '#FEF3C7', iconColor: '#92400E',
    iconSvg: '<path fill="currentColor" d="M10.5 3h3v7.5H21v3h-7.5V21h-3v-7.5H3v-3h7.5z"/>',
    imageUrl: 'https://loremflickr.com/400/300/doctor,clinic?lock=3',
    keyword: 'doctor,clinic',
  },
  {
    slug: 'gynecology', nameRu: 'Гинекология', nameEn: 'Gynecology',
    iconBg: '#FCE7F3', iconColor: '#9D174D',
    iconSvg: '<circle cx="12" cy="9" r="5" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14v7M9 18h6"/>',
    imageUrl: 'https://loremflickr.com/400/300/medical,healthcare?lock=4',
    keyword: 'medical,healthcare',
  },
  {
    slug: 'rehabilitation', nameRu: 'Реабилитация', nameEn: 'Rehabilitation',
    iconBg: '#ECFDF5', iconColor: '#065F46',
    iconSvg: '<circle cx="12" cy="4" r="2" fill="currentColor"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 9.5l5 2 5-2M9 8l-3 5 4 1.5-1.5 6.5M15 8l3 5-4 1.5 1.5 6.5"/>',
    imageUrl: 'https://loremflickr.com/400/300/rehabilitation,physiotherapy?lock=5',
    keyword: 'rehabilitation,physiotherapy',
  },
  {
    slug: 'massage', nameRu: 'Массаж', nameEn: 'Massage',
    iconBg: '#FFF7ED', iconColor: '#9A3412',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 4.5v7M11 3.5v8M14 4.5v7M17 6v5M6 11.5A6 6 0 0018 11.5M9 18h6M12 17.5V22"/>',
    imageUrl: 'https://loremflickr.com/400/300/massage,spa?lock=6',
    keyword: 'massage,spa',
  },
  {
    slug: 'dietology', nameRu: 'Диетология', nameEn: 'Dietology',
    iconBg: '#F0FDF4', iconColor: '#166534',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3c0 0 2-2 4-1M12 3C8.5 3 6 7 6 11c0 5 2.5 8 6 8s6-3 6-8c0-4-2.5-8-6-8z"/><path stroke-linecap="round" stroke-width="1.5" d="M12 3v3"/>',
    imageUrl: 'https://loremflickr.com/400/300/nutrition,healthy-food?lock=7',
    keyword: 'nutrition,healthy-food',
  },
  {
    slug: 'exercise-therapy', nameRu: 'ЛФК', nameEn: 'Exercise Therapy',
    iconBg: '#EEF2FF', iconColor: '#3730A3',
    iconSvg: '<rect x="2" y="10" width="3" height="4" rx="1" fill="currentColor"/><rect x="19" y="10" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="8" width="3" height="8" rx="1" fill="currentColor"/><rect x="16" y="8" width="3" height="8" rx="1" fill="currentColor"/><path stroke-width="2" d="M8 12h8"/>',
    imageUrl: 'https://loremflickr.com/400/300/fitness,exercise?lock=8',
    keyword: 'fitness,exercise',
  },
  {
    slug: 'cosmetology', nameRu: 'Косметология', nameEn: 'Cosmetology',
    iconBg: '#FDF2F8', iconColor: '#86198F',
    iconSvg: '<path fill="currentColor" d="M12 2l1.8 5.4L19.2 9l-5.4 1.8L12 16.2l-1.8-5.4L4.8 9l5.4-1.8z"/><path stroke-linecap="round" stroke-width="1.5" d="M8.5 18a4 4 0 007 0"/>',
    imageUrl: 'https://loremflickr.com/400/300/cosmetology,skincare?lock=9',
    keyword: 'cosmetology,skincare',
  },
  {
    slug: 'manicure-pedicure', nameRu: 'Маникюр / Педикюр', nameEn: 'Manicure / Pedicure',
    iconBg: '#FFF1F2', iconColor: '#9F1239',
    iconSvg: '<rect x="9" y="10" width="6" height="10" rx="2" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 10V7.5l1-3.5 1 3.5V10M9 14h6"/>',
    imageUrl: 'https://loremflickr.com/400/300/manicure,nails?lock=10',
    keyword: 'manicure,nails',
  },
  {
    slug: 'hairdresser', nameRu: 'Парикмахер', nameEn: 'Hairdresser',
    iconBg: '#F5F3FF', iconColor: '#4C1D95',
    iconSvg: '<circle cx="6.5" cy="7" r="3" stroke-width="1.5"/><circle cx="6.5" cy="17" r="3" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="1.5" d="M9 9.5l10 9M9 14.5L19 5.5"/>',
    imageUrl: 'https://loremflickr.com/400/300/hairdresser,haircut?lock=11',
    keyword: 'hairdresser,haircut',
  },
  {
    slug: 'barber', nameRu: 'Барбер', nameEn: 'Barber',
    iconBg: '#E0F2FE', iconColor: '#0C4A6E',
    iconSvg: '<rect x="3" y="9" width="18" height="6" rx="3" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="1.5" d="M7 9V6m4 3V6m4 3V6M7 15v3m4-3v3m4-3v3"/>',
    imageUrl: 'https://loremflickr.com/400/300/barbershop,barber?lock=12',
    keyword: 'barbershop,barber',
  },
  {
    slug: 'makeup-artist', nameRu: 'Визажист', nameEn: 'Makeup Artist',
    iconBg: '#FEF0F5', iconColor: '#BE185D',
    iconSvg: '<rect x="9.5" y="11" width="5" height="9" rx="1.5" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.5 11V8.5L12 4l2.5 4.5V11M9.5 14.5h5"/>',
    imageUrl: 'https://loremflickr.com/400/300/makeup,beauty?lock=13',
    keyword: 'makeup,beauty',
  },
  {
    slug: 'laser-epilation', nameRu: 'Лазерная эпиляция', nameEn: 'Laser Hair Removal',
    iconBg: '#FFFBEB', iconColor: '#B45309',
    iconSvg: '<path fill="currentColor" d="M13.5 2L3 14h8.5L10 22l11-13H13L13.5 2z"/>',
    imageUrl: 'https://loremflickr.com/400/300/laser,beauty-salon?lock=14',
    keyword: 'laser,beauty-salon',
  },
  {
    slug: 'brow-lash-artist', nameRu: 'Бровист / Лешмейкер', nameEn: 'Brow / Lash Artist',
    iconBg: '#F5F3FF', iconColor: '#4338CA',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    imageUrl: 'https://loremflickr.com/400/300/eyebrows,lashes?lock=15',
    keyword: 'eyebrows,lashes',
  },
  {
    slug: 'spa', nameRu: 'SPA', nameEn: 'SPA',
    iconBg: '#ECFDF5', iconColor: '#064E3B',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21c0 0-7-4.5-7-11a7 7 0 0114 0c0 6.5-7 11-7 11z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21c0 0-3.5-3-3.5-7a3.5 3.5 0 017 0c0 4-3.5 7-3.5 7z"/>',
    imageUrl: 'https://loremflickr.com/400/300/spa,relaxation?lock=16',
    keyword: 'spa,relaxation',
  },
]

async function main() {
  console.log('Seeding categories...')

  for (let i = 0; i < seed.length; i++) {
    const c = seed[i]
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {
        nameRu: c.nameRu, nameEn: c.nameEn,
        iconBg: c.iconBg, iconColor: c.iconColor, iconSvg: c.iconSvg,
        imageUrl: c.imageUrl, sortOrder: i,
      },
      create: {
        slug: c.slug,
        nameRu: c.nameRu, nameEn: c.nameEn,
        iconBg: c.iconBg, iconColor: c.iconColor, iconSvg: c.iconSvg,
        imageUrl: c.imageUrl, sortOrder: i, isActive: true,
      },
    })
  }
  console.log(`Upserted ${seed.length} categories`)

  console.log('Re-linking existing Ad.category strings to slugs...')
  const nameToSlug = new Map(seed.map(c => [c.nameRu, c.slug]))
  const allAds = await prisma.ad.findMany({ select: { id: true, category: true } })
  let updated = 0
  for (const ad of allAds) {
    if (nameToSlug.has(ad.category)) {
      const slug = nameToSlug.get(ad.category)
      if (ad.category !== slug) {
        await prisma.ad.update({ where: { id: ad.id }, data: { category: slug } })
        updated++
      }
    } else if (!seed.some(c => c.slug === ad.category)) {
      console.warn(`  Ad ${ad.id}: category "${ad.category}" not found in seed — left as-is`)
    }
  }
  console.log(`Updated ${updated} ads`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
