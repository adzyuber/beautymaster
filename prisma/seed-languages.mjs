import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SEED = [
  { code: 'en', nameRu: 'Английский',   nameEn: 'English',   isDefault: true  },
  { code: 'ru', nameRu: 'Русский',      nameEn: 'Russian',   isDefault: false },
  { code: 'sk', nameRu: 'Словацкий',    nameEn: 'Slovak',    isDefault: false },
  { code: 'uk', nameRu: 'Украинский',   nameEn: 'Ukrainian', isDefault: false },
  { code: 'cs', nameRu: 'Чешский',      nameEn: 'Czech',     isDefault: false },
  { code: 'pl', nameRu: 'Польский',     nameEn: 'Polish',    isDefault: false },
  { code: 'de', nameRu: 'Немецкий',     nameEn: 'German',    isDefault: false },
]

async function main() {
  const existing = await prisma.language.count()
  if (existing > 0) {
    console.log(`Skipping seed — ${existing} languages already exist`)
    return
  }
  for (let i = 0; i < SEED.length; i++) {
    const l = SEED[i]
    await prisma.language.create({ data: { ...l, sortOrder: i } })
  }
  console.log(`Seeded ${SEED.length} languages, default: en`)
}

main().finally(() => prisma.$disconnect())
