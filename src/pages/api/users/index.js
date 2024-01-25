import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export default async function handler(request, response) {
  const { method } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  await dbConnect()

  switch (method) {
    case 'GET': // find all users
      await User.find({ roles: 'subscriber' })
        .sort({ createdAt: -1 })
        .then((result) => {
          response.status(201).send({
            message: 'List of Users',
            result,
          })
        })
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all users',
            error,
          })
        })

      break

    case 'POST': // create user
      const resetToken =
        request.body.bookReceiver === 'gift' ? crypto.randomBytes(32).toString('hex') : ''

      bcrypt
        .hash(request.body.password, 10)
        .then(async (hashedPassword) => {
          const newUser = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password: hashedPassword,
            country: request.body.country,
            bookReceiver: request.body.bookReceiver,
            giftDate: request.body.giftDate,
            giftSender: request.body.giftSender,
            senderEmail: request.body.senderEmail,
            giftRelation: request.body.giftRelation,
            giftOccasion: request.body.giftOccasion,
            giftSalutation: request.body.giftSalutation,
            giftMessage: request.body.giftMessage,
            roles: request.body.roles,
            token: resetToken,
            planType: request.body.planType,
            freeTrialEnd: request.body.freeTrialEnd,
            city: request.body.city,
            phoneNumber: request.body.phoneNumber,
            postCode: request.body.postCode,
            stateCode: request.body.stateCode,
            street: request.body.street,
            reason: request.body.reason,
            timezone: userTimezone,
            status: request.body.status,
          }

          // save the new user
          await User.create(newUser)
            .then((result) => {
              response.status(201).send({
                message: 'User Created Successfully',
                result,
              })
            })
            .catch(async (error) => {
              if (error.code === 11000) {
                const existingUser = await User.findOne({ email: newUser.email })

                response.status(500).send({
                  message: `This email address already exists. Please provide a different account.`,
                  idValue: `${existingUser ? existingUser._id : null}`,
                  currentStatus: `${existingUser ? existingUser.status : null}`,
                  error,
                })
              } else {
                console.error('Error details:', error)
                response.status(500).send({
                  message: "We're sorry, something went wrong when attempting to sign up.",
                  error,
                })
              }
            })
        })
        .catch((error) => {
          response.status(500).send({
            message: 'Password was not hashed successfully',
            error,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
