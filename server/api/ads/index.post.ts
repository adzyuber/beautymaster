import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'
import { slugify } from '../../utils/slugify'

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event)
  const body = await readBody(event)
  const { title, category, subcategory, description, price, city, address, images } = body

  if (!title || !category || !subcategory || !description || !city) {
    throw createError({ statusCode: 400, message: 'Заполните все обязательные поля' })
  }

  const tempSlug = slugify(title, Date.now())
  const ad = await prisma.ad.create({
    data: {
      userId: auth.userId,
      title,
      category,
      subcategory,
      description,
      price: price ? Number(price) : null,
      city,
      address: address || null,
      slug: tempSlug,
    }
  })

  const realSlug = slugify(title, ad.id)
  await prisma.ad.update({ where: { id: ad.id }, data: { slug: realSlug } })

  if (images?.length) {
    await prisma.adImage.createMany({
      data: images.map((url: string, i: number) => ({ adId: ad.id, imageUrl: url, sortOrder: i }))
    })
  }

  return { ...ad, slug: realSlug }
})
