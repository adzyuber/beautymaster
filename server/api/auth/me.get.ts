import prisma from '../../utils/prisma'
import { getAuthUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = await getAuthUser(event)
  if (!auth) return null

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { id: true, name: true, email: true, phone: true, organization: true, website: true, avatarUrl: true, role: true, createdAt: true }
  })
  return user
})
