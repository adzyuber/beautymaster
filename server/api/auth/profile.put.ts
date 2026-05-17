import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'
import { sanitizeLanguages } from '../../utils/languages'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const body = await readBody(event)
  const { name, organization, website, phone, avatarUrl } = body

  const languagesJson = 'languages' in body ? await sanitizeLanguages(body.languages) : undefined

  const user = await prisma.user.update({
    where: { id: auth.userId },
    data: {
      name,
      organization: organization || null,
      website: website || null,
      phone: phone || null,
      ...('avatarUrl' in body ? { avatarUrl } : {}),
      ...(languagesJson !== undefined ? { languages: languagesJson } : {})
    },
    select: {
      id: true, name: true, email: true, phone: true, organization: true,
      website: true, avatarUrl: true, role: true, languages: true
    }
  })

  const profileComplete = !!(user.phone && user.languages && JSON.parse(user.languages).length > 0)
  if (profileComplete) {
    await prisma.notification.deleteMany({
      where: { userId: auth.userId, type: 'profile_incomplete' }
    })
  }

  return user
})
