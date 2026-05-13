import { Resend } from 'resend'

let cachedClient: Resend | null = null

function getClient() {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  if (!cachedClient) {
    cachedClient = new Resend(config.resendApiKey)
  }
  return cachedClient
}

type Locale = 'ru' | 'en'

interface ResetEmailParams {
  to: string
  name: string
  resetUrl: string
  locale: Locale
}

export async function sendPasswordResetEmail(params: ResetEmailParams) {
  const config = useRuntimeConfig()
  const client = getClient()

  const { subject, html, text } = renderResetEmail(params)

  const { error } = await client.emails.send({
    from: config.mailFrom,
    to: params.to,
    subject,
    html,
    text
  })

  if (error) {
    throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`)
  }
}

function renderResetEmail({ name, resetUrl, locale }: ResetEmailParams) {
  const t = locale === 'en' ? en : ru
  const safeName = escapeHtml(name)

  const subject = t.subject
  const text = `${t.hello(safeName)}

${t.intro}

${resetUrl}

${t.expiry}

${t.ignore}

— BeautyMaster`

  const html = `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2D2D2D;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(45,77,58,0.08);">
          <tr>
            <td style="padding:32px 32px 16px;text-align:center;">
              <div style="font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                <span style="color:#1EC3BD;">Beauty</span><span style="color:#2D2D2D;">Master</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px;">
              <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#2D4D3A;">${t.hello(safeName)}</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#5B5B5B;">${t.intro}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td>
                    <a href="${resetUrl}" style="display:inline-block;background:#2D2D2D;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:15px;">${t.button}</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#888;">${t.fallback}</p>
              <p style="margin:0 0 24px;font-size:13px;line-height:1.5;word-break:break-all;"><a href="${resetUrl}" style="color:#1EC3BD;">${resetUrl}</a></p>
              <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#888;">${t.expiry}</p>
              <p style="margin:0;font-size:13px;line-height:1.6;color:#888;">${t.ignore}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px;border-top:1px solid #EEE;text-align:center;">
              <p style="margin:0;font-size:12px;color:#AAA;">BeautyMaster &middot; <a href="https://beautymaster.guru" style="color:#AAA;text-decoration:none;">beautymaster.guru</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html, text }
}

const ru = {
  subject: 'Восстановление пароля — BeautyMaster',
  hello: (name: string) => `Здравствуйте, ${name}!`,
  intro: 'Мы получили запрос на сброс пароля для вашего аккаунта BeautyMaster. Чтобы установить новый пароль, нажмите на кнопку ниже.',
  button: 'Сбросить пароль',
  fallback: 'Если кнопка не работает, скопируйте эту ссылку в браузер:',
  expiry: 'Ссылка действительна 30 минут.',
  ignore: 'Если вы не запрашивали сброс пароля — просто проигнорируйте это письмо, ваш пароль останется прежним.'
}

const en = {
  subject: 'Reset your password — BeautyMaster',
  hello: (name: string) => `Hello, ${name}!`,
  intro: 'We received a request to reset the password for your BeautyMaster account. Click the button below to set a new password.',
  button: 'Reset password',
  fallback: 'If the button does not work, copy this link into your browser:',
  expiry: 'This link is valid for 30 minutes.',
  ignore: 'If you did not request a password reset, just ignore this email — your password will remain unchanged.'
}

interface NewMessageEmailParams {
  to: string
  recipientName: string
  senderName: string
  messageText: string
  chatUrl: string
  locale: Locale
}

export async function sendNewMessageEmail(params: NewMessageEmailParams) {
  const config = useRuntimeConfig()
  const client = getClient()

  const { subject, html, text } = renderNewMessageEmail(params)

  const { error } = await client.emails.send({
    from: config.mailFrom,
    to: params.to,
    subject,
    html,
    text
  })

  if (error) {
    throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`)
  }
}

function renderNewMessageEmail({ recipientName, senderName, messageText, chatUrl, locale }: NewMessageEmailParams) {
  const t = locale === 'en' ? enMsg : ruMsg
  const safeName = escapeHtml(recipientName)
  const safeSender = escapeHtml(senderName)
  const safeText = escapeHtml(messageText.length > 200 ? messageText.slice(0, 200) + '…' : messageText)

  const subject = t.subject(safeSender)
  const text = `${t.hello(safeName)}

${t.intro(safeSender)}

"${safeText}"

${chatUrl}

— BeautyMaster`

  const html = `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2D2D2D;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(45,77,58,0.08);">
          <tr>
            <td style="padding:32px 32px 16px;text-align:center;">
              <div style="font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                <span style="color:#1EC3BD;">Beauty</span><span style="color:#2D2D2D;">Master</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px;">
              <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#2D4D3A;">${t.hello(safeName)}</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#5B5B5B;">${t.intro(safeSender)}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;width:100%;">
                <tr>
                  <td style="background:#F5F5F0;border-left:3px solid #1EC3BD;border-radius:4px;padding:12px 16px;font-size:14px;line-height:1.6;color:#444;">${safeText}</td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td>
                    <a href="${chatUrl}" style="display:inline-block;background:#2D2D2D;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:15px;">${t.button}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px;border-top:1px solid #EEE;text-align:center;">
              <p style="margin:0;font-size:12px;color:#AAA;">BeautyMaster &middot; <a href="https://beautymaster.guru" style="color:#AAA;text-decoration:none;">beautymaster.guru</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html, text }
}

const ruMsg = {
  subject: (sender: string) => `Новое сообщение от ${sender} — BeautyMaster`,
  hello: (name: string) => `Здравствуйте, ${name}!`,
  intro: (sender: string) => `Вам пришло новое сообщение от <strong>${sender}</strong>:`,
  button: 'Открыть чат'
}

const enMsg = {
  subject: (sender: string) => `New message from ${sender} — BeautyMaster`,
  hello: (name: string) => `Hello, ${name}!`,
  intro: (sender: string) => `You have a new message from <strong>${sender}</strong>:`,
  button: 'Open chat'
}

interface AdModerationEmailParams {
  to: string
  name: string
  adTitle: string
  adUrl: string
  rejectionReason?: string
  locale: Locale
}

export async function sendAdApprovedEmail(params: AdModerationEmailParams) {
  const config = useRuntimeConfig()
  const client = getClient()
  const { subject, html, text } = renderAdApprovedEmail(params)
  const { error } = await client.emails.send({ from: config.mailFrom, to: params.to, subject, html, text })
  if (error) throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`)
}

export async function sendAdRejectedEmail(params: AdModerationEmailParams) {
  const config = useRuntimeConfig()
  const client = getClient()
  const { subject, html, text } = renderAdRejectedEmail(params)
  const { error } = await client.emails.send({ from: config.mailFrom, to: params.to, subject, html, text })
  if (error) throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`)
}

function renderAdApprovedEmail({ name, adTitle, adUrl, locale }: AdModerationEmailParams) {
  const t = locale === 'en' ? enAdApproved : ruAdApproved
  const safeName = escapeHtml(name)
  const safeTitle = escapeHtml(adTitle)
  const subject = t.subject
  const text = `${t.hello(safeName)}\n\n${t.intro(safeTitle)}\n\n${adUrl}\n\n— BeautyMaster`
  const html = renderModerationHtml({ locale, subject, safeName, safeTitle, adUrl, t, type: 'approved' })
  return { subject, html, text }
}

function renderAdRejectedEmail({ name, adTitle, adUrl, rejectionReason, locale }: AdModerationEmailParams) {
  const t = locale === 'en' ? enAdRejected : ruAdRejected
  const safeName = escapeHtml(name)
  const safeTitle = escapeHtml(adTitle)
  const safeReason = rejectionReason ? escapeHtml(rejectionReason) : ''
  const subject = t.subject
  const text = `${t.hello(safeName)}\n\n${t.intro(safeTitle)}${safeReason ? `\n\n${t.reason}: ${safeReason}` : ''}\n\n— BeautyMaster`
  const html = renderModerationHtml({ locale, subject, safeName, safeTitle, adUrl, t, type: 'rejected', safeReason })
  return { subject, html, text }
}

function renderModerationHtml({ locale, subject, safeName, safeTitle, adUrl, t, type, safeReason }: {
  locale: string; subject: string; safeName: string; safeTitle: string; adUrl: string
  t: any; type: 'approved' | 'rejected'; safeReason?: string
}) {
  const accentColor = type === 'approved' ? '#22c55e' : '#ef4444'
  const btnBg = type === 'approved' ? '#2D2D2D' : '#ef4444'
  return `<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#F5F5F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#2D2D2D;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(45,77,58,0.08);">
        <tr><td style="padding:32px 32px 16px;text-align:center;">
          <div style="font-size:24px;font-weight:700;letter-spacing:-0.5px;">
            <span style="color:#1EC3BD;">Beauty</span><span style="color:#2D2D2D;">Master</span>
          </div>
        </td></tr>
        <tr><td style="padding:8px 32px 24px;">
          <div style="width:48px;height:48px;border-radius:50%;background:${accentColor}20;display:flex;align-items:center;justify-content:center;margin:0 0 16px;font-size:24px;">${type === 'approved' ? '✓' : '✗'}</div>
          <h1 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#2D4D3A;">${t.hello(safeName)}</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#5B5B5B;">${t.intro(safeTitle)}</p>
          ${safeReason ? `<div style="background:#FEF2F2;border-left:3px solid #ef4444;border-radius:4px;padding:12px 16px;margin:0 0 20px;font-size:14px;line-height:1.6;color:#444;"><strong>${t.reason}:</strong> ${safeReason}</div>` : ''}
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;">
            <tr><td>
              <a href="${adUrl}" style="display:inline-block;background:${btnBg};color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;font-size:15px;">${t.button}</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:16px 32px 32px;border-top:1px solid #EEE;text-align:center;">
          <p style="margin:0;font-size:12px;color:#AAA;">BeautyMaster &middot; <a href="https://beautymaster.guru" style="color:#AAA;text-decoration:none;">beautymaster.guru</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

const ruAdApproved = {
  subject: 'Ваше объявление опубликовано — BeautyMaster',
  hello: (name: string) => `Здравствуйте, ${name}!`,
  intro: (title: string) => `Ваше объявление <strong>«${title}»</strong> прошло модерацию и теперь опубликовано на сайте.`,
  button: 'Посмотреть объявление',
  reason: 'Причина'
}

const enAdApproved = {
  subject: 'Your listing has been published — BeautyMaster',
  hello: (name: string) => `Hello, ${name}!`,
  intro: (title: string) => `Your listing <strong>"${title}"</strong> has passed moderation and is now published on the site.`,
  button: 'View listing',
  reason: 'Reason'
}

const ruAdRejected = {
  subject: 'Ваше объявление отклонено — BeautyMaster',
  hello: (name: string) => `Здравствуйте, ${name}!`,
  intro: (title: string) => `К сожалению, ваше объявление <strong>«${title}»</strong> не прошло модерацию и было отклонено.`,
  button: 'Перейти к объявлению',
  reason: 'Причина отклонения'
}

const enAdRejected = {
  subject: 'Your listing has been rejected — BeautyMaster',
  hello: (name: string) => `Hello, ${name}!`,
  intro: (title: string) => `Unfortunately, your listing <strong>"${title}"</strong> did not pass moderation and has been rejected.`,
  button: 'View listing',
  reason: 'Rejection reason'
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
