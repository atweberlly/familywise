import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import { sendEmail } from '../../../../services/emailService'
import { GetEmailBody } from '../../../../services/emailTemplateService'
import bcrypt from 'bcrypt'

export default async function handler(request, response) {
  const { method } = request

  await dbConnect()

  switch (method) {
    case 'POST': //forgot endpoint
      const dev = process.env.NODE_ENV !== 'production'
      const server = dev ? 'http://localhost:3000' : process.env.PRODUCTION_URL
      const { token, password } = request.body

      // Find the user with the matching reset token
      User.findOne({ token: token }, (err, user) => {
        if (err || !user) {
          return response.status(401).json({ message: 'Invalid token' })
        }

        // Update the user's password and invalidate the reset token
        bcrypt
          .hash(password, 10)
          .then(async (hashedPassword) => {
            User.findOneAndUpdate(
              { email: user.email },
              { $set: { password: hashedPassword, token: '' } },
              { new: true },
              async (err) => {
                if (err) {
                  return response.status(500).json({ message: 'Error updating password', err })
                }
                //send email
                try {
                  const emailSubject = 'Your Family Wise password has been updated'

                  const data = {
                    name: user.firstname,
                    email: user.email,
                    server_url: server,
                    year: new Date().getFullYear(),
                  }

                  const emailBody = await GetEmailBody('update-password.html', data)

                  const emailParam = {
                    to: data.email,
                    from: process.env.ADMIN_EMAIL,
                    subject: emailSubject,
                    html: emailBody,
                  }

                  await sendEmail(emailParam)

                  return response
                    .status(200)
                    .json({ message: 'Your new password has been updated' })
                } catch (err) {
                  const errorMessage = err instanceof Error ? err.message : 'Internal server error'
                  response.status(500).json({ message: errorMessage, err })
                }
              }
            )
          })
          // catch error if the password hash isn't successful
          .catch((error) => {
            response.status(500).send({
              message: 'Password was not hashed successfully',
              error,
            })
          })
      })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
