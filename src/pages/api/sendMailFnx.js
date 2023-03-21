import { sendEmail } from '../../../services/emailService'
import { GetEmailBody } from '../../../services/emailTemplateService'

const sendMailFnx = async (req, res) => {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? 'http://localhost:3000' : 'https://www.familyfortunate.us'
  const { subject, template, param, to } = req.body
  param.server_url = server
  param.year = new Date().getFullYear()

  try {
    const emailBody = await GetEmailBody(template, param)

    const emailParam = {
      to: to,
      from: process.env.ADMIN_EMAIL,
      subject: subject,
      html: emailBody,
    }

    await sendEmail(emailParam)
    return res.status(200).json({ message: 'Email successfully sent!' })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ message: errorMessage, err })
  }
}

export default sendMailFnx
