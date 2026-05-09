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

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
