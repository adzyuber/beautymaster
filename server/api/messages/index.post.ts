import prisma from '../../utils/prisma'
import { requireAuth } from '../../utils/auth'
import { sendNewMessageEmail } from '../../utils/mailer'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const body = await readBody(event)
  const { toUserId, text } = body

  if (!toUserId || !text?.trim()) {
    throw createError({ statusCode: 400, message: 'Укажите получателя и текст' })
  }
  if (toUserId === auth.userId) {
    throw createError({ statusCode: 400, message: 'Нельзя писать самому себе' })
  }

  const recipientId = Number(toUserId)

  const msg = await prisma.message.create({
    data: { fromUserId: auth.userId, toUserId: recipientId, text: text.trim() },
    include: { fromUser: { select: { id: true, name: true } } }
  })

  // Send email only for the first unread message in this conversation thread
  const prevUnreadCount = await prisma.message.count({
    where: { fromUserId: auth.userId, toUserId: recipientId, isRead: false, id: { not: msg.id } }
  })

  console.log('[email] prevUnreadCount=', prevUnreadCount, 'msgId=', msg.id)
  if (prevUnreadCount === 0) {
    const [recipient, notifSetting] = await Promise.all([
      prisma.user.findUnique({ where: { id: recipientId }, select: { email: true, name: true } }),
      prisma.setting.findUnique({ where: { key: 'emailNotificationsEnabled' } })
    ])
    console.log('[email] recipient=', recipient?.email, 'setting=', notifSetting?.value)
    if (recipient && notifSetting?.value === 'true') {
      const config = useRuntimeConfig()
      const chatUrl = `${config.appUrl}/messages?with=${auth.userId}`
      sendNewMessageEmail({
        to: recipient.email,
        recipientName: recipient.name,
        senderName: msg.fromUser.name,
        messageText: msg.text,
        chatUrl,
        locale: 'ru'
      }).then(() => console.log('[email] sent OK to', recipient.email))
        .catch(e => console.error('[email] ERROR:', e.message))
    }
  }

  return msg
})
