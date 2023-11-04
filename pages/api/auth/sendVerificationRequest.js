import { resend } from '@/lib/resend.js'
import EmailTemplate from '@/components/EmailTemplate/EmailTemplate'

export async function sendVerificationRequest(params) {
  const { identifier, url, provider } = params
  const { host } = new URL(url)

  try {
    const data = await resend.emails.send({
      from: provider.from,
      to: identifier,
      subject: `Sign in to ${host}`,
      react: EmailTemplate({ url, host }),
    })

    return { success: true, data }
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}
