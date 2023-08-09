import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export default async function handler(request, response) {
  const { method } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  await dbConnect()

  switch (method) {
    case 'GET': //find all users
      await User.find({ roles: 'subscriber' })
        .sort({ createdAt: -1 })
        // return success
        .then((result) => {
          response.status(201).send({
            message: 'List of Users',
            result,
          })
        })
        // catch error if getting user account
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all users',
            error,
          })
        })

      break

    case 'POST': //create user
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
            giftRelation: request.body.giftRelation,
            giftOccasion: request.body.giftOccasion,
            giftSalutation: request.body.giftSalutation,
            giftMessage: request.body.giftMessage,
            roles: request.body.roles,
            token: resetToken,
            planType: request.body.planType,
            freeTrialEnd: request.body.freeTrialEnd,
            timezone: userTimezone,
            status: request.body.status,
          }

          // save the new user
          await User.create(newUser)

            // return success if the new user is added to the database successfully
            .then((result) => {
              response.status(201).send({
                message: 'User Created Successfully',
                result,
              })
            })
            // catch erroe if the new user wasn't added successfully to the database
            .catch((error) => {
              if (error.code === 11000) {
                response.status(500).send({
                  message: 'This email address is already exist. Please provide different account',
                  error,
                })
              } else {
                response.status(500).send({
                  message: "We're sorry, something went wrong when attempting to sign up.",
                  error,
                })
              }
            })
        })
        // catch error if the password hash isn't successful
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
