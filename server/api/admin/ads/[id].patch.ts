import prisma from '../../../utils/prisma'
import { requireAuth } from '../../../utils/auth'
import { sendAdApprovedEmail, sendAdRejectedEmail } from '../../../utils/mailer'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  if (auth.role !== 'admin') throw createError({ statusCode: 403 })

  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  let updateData: any = {}

  if (body.action === 'approve') {
    updateData = { status: 'active', rejectionReason: null }
  } else if (body.action === 'reject') {
    updateData = { status: 'rejected', rejectionReason: body.reason?.trim() || null }
  } else if (body.status === 'inactive') {
    updateData = { status: 'inactive', rejectionReason: body.reason?.trim() || null }
  } else if (body.status === 'active') {
    updateData = { status: 'active', rejectionReason: null }
  } else if (body.status) {
    updateData = { status: body.status }
  } else {
    throw createError({ statusCode: 400, message: 'Invalid request' })
  }

  const ad = await prisma.ad.update({
    where: { id },
    data: updateData,
    include: { user: { select: { id: true, name: true, email: true } } }
  })

  const config = useRuntimeConfig()
  const appUrl = config.appUrl || 'https://beautymaster.guru'
  const adUrl = `${appUrl}/ad/${ad.slug}`

  // Determine notification type
  let notifType: string | null = null
  if (body.action === 'approve' || body.status === 'active') notifType = 'ad_approved'
  else if (body.action === 'reject') notifType = 'ad_rejected'
  else if (body.status === 'inactive') notifType = 'ad_inactive'

  if (notifType) {
    await prisma.notification.create({
      data: {
        userId: ad.user.id,
        type: notifType,
        adId: ad.id,
        adTitle: ad.title,
        adSlug: ad.slug,
        reason: body.reason?.trim() || null
      }
    }).catch(() => {})
  }

  if (body.action === 'approve' || body.action === 'reject') {
    try {
      const emailParams = {
        to: ad.user.email,
        name: ad.user.name,
        adTitle: ad.title,
        adUrl,
        locale: 'ru' as const
      }
      if (body.action === 'approve') {
        await sendAdApprovedEmail(emailParams)
      } else {
        await sendAdRejectedEmail({ ...emailParams, rejectionReason: body.reason })
      }
    } catch {
      // email failure should not block the response
    }
  }

  return { id: ad.id, title: ad.title, status: ad.status }
})
