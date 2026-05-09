import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const body = await readBody(event)
  const { name, organization, website, avatarUrl } = body

  const user = await prisma.user.update({
    where: { id: auth.userId },
    data: { name, organization: organization || null, website: website || null, ...('avatarUrl' in body ? { avatarUrl } : {}) },
    select: { id: true, name: true, email: true, phone: true, organization: true, website: true, avatarUrl: true, role: true }
  })
  return user
})
