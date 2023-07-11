import { sendEmail } from '../../../services/emailService'
import { GetEmailBody } from '../../../services/emailTemplateService'

const sendMailFnx = async (params) => {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? 'http://localhost:3000' : process.env.PRODUCTION_URL
  const { subject, template, param, to } = params
  param.server_url = server
  param.year = new Date().getFullYear()
  const emailBody = await GetEmailBody(template, param)
  const emailParam = {
    to: to,
    from: process.env.ADMIN_EMAIL,
    subject: subject,
    html: emailBody,
  }

  return await sendEmail(emailParam)
}

export { sendMailFnx }
