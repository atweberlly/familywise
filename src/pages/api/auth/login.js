import bcrypt from 'bcrypt'
import * as jose from 'jose'
import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'

export default async function handler(request, response) {
  const { method } = request
  const EXPIRES = process.env.EXPIRES
  const SECRET = new TextEncoder().encode(`${process.env.JWT_SECRET}`)

  await dbConnect()

  switch (method) {
    case 'POST': //login endpoint
      // check if email exists
      User.findOne({ email: request.body.email, status: true })

        // if email exists
        .then((user) => {
          // compare the password entered and the hashed password found
          bcrypt
            .compare(request.body.password, user.password)

            // if the passwords match
            .then(async (passwordCheck) => {
              // check if password matches
              if (!passwordCheck) {
                return response.status(400).send({
                  message:
                    'The email and password you entered did not match our records. Please double-check and try again.',
                })
              }

              //   create JWT token
              const token = await new jose.SignJWT({
                userId: user._id,
                userEmail: user.email,
                userRoles: user.roles,
              })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime(EXPIRES)
                .sign(SECRET)

              console.log(token)

              //   return success response
              response.status(200).send({
                message: 'Login Successful',
                email: user.email,
                roles: user.roles,
                token,
              })
            })
            // catch error if password does not match
            .catch((error) => {
              response.status(400).send({
                message:
                  'The email and password you entered did not match our records. Please double-check and try again.',
                error,
              })
            })
        })
        // catch error if email does not exist
        .catch((e) => {
          response.status(404).send({
            message: 'Email not found',
            e,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
