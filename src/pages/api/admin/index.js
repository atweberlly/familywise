import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export default async function handler(request, response) {
  const { method } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const result = await User.find({ roles: 'admin' }).sort({ createdAt: -1 })
        response.status(201).send({
          message: 'List of Users',
          result,
        })
      } catch (error) {
        response.status(500).send({
          message: 'Error getting all users',
          error,
        })
      }
      break

    case 'POST':
      try {
        const resetToken = crypto.randomBytes(32).toString('hex')
        const hashedPassword = await bcrypt.hash(request.body.password, 10)

        const newUser = {
          firstname: request.body.firstname,
          lastname: request.body.lastname,
          email: request.body.email,
          password: hashedPassword,
          country: request.body.country,
          bookReceiver: request.body.bookReceiver,
          roles: request.body.roles,
          orderId: request.body.orderId,
          timezone: userTimezone,
          status: request.body.status,
          token: resetToken,
        }

        const result = await User.create(newUser)
        response.status(201).send({
          message: 'User Created Successfully',
          result,
        })
      } catch (error) {
        console.error('Error during user creation:', error)
      }
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
