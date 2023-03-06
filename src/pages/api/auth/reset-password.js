import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import { sendEmail } from '../../../../services/emailService'
import { GetEmailBody } from '../../../../services/emailTemplateService'
import crypto from 'crypto'

export default async function handler(request, response) {
  const { method } = request

  await dbConnect()

  switch (method) {
    case 'POST': //forgot endpoint
      const dev = process.env.NODE_ENV !== 'production'
      const server = dev ? 'http://localhost:3000' : 'https://wwww.familyfortunate.us'
      const { email } = request.body
      const resetToken = crypto.randomBytes(32).toString('hex')
      // Save the token to the database
      User.findOneAndUpdate({ email }, { token: resetToken }, { new: true }, async (err, user) => {
        if (err) {
          return response.status(500).json({ message: 'Error saving reset token', err })
        }

        //send email
        try {
          const emailSubject = 'Reset your password'
          const resetUrl = `${server}/reset-password?token=${resetToken}`
          const data = {
            name: user.firstname,
            email: email,
            url: resetUrl,
          }

          console.log(data)
          const emailBody = await GetEmailBody('reset-password.html', data)

          const emailParam = {
            to: email,
            from: process.env.ADMIN_EMAIL,
            subject: emailSubject,
            html: emailBody,
          }

          await sendEmail(emailParam)

          return response.status(200).json({ message: 'Reset Email Sent Successfully' })
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Internal server error'
          response.status(500).json({ message: errorMessage, err })
        }
      })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
