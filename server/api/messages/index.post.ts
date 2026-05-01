import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event)
  const body = await readBody(event)
  const { toUserId, text } = body

  if (!toUserId || !text?.trim()) {
    throw createError({ statusCode: 400, message: 'Укажите получателя и текст' })
  }
  if (toUserId === auth.userId) {
    throw createError({ statusCode: 400, message: 'Нельзя писать самому себе' })
  }

  const msg = await prisma.message.create({
    data: { fromUserId: auth.userId, toUserId: Number(toUserId), text: text.trim() },
    include: { fromUser: { select: { id: true, name: true } } }
  })
  return msg
})
