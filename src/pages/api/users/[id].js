import bcrypt from 'bcrypt'
import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      await User.findById(id)

        // return success if getting user account by id
        .then((result) => {
          response.status(201).send({
            message: 'Success',
            result,
          })
        })
        // catch error if getting user account by id
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting user information',
            error,
          })
        })

      break

    case 'PUT' /* Edit a model by its ID */:
      // user new values
      let newValues = {
        $set: {
          firstname: request.body.firstname,
          lastname: request.body.lastname,
          email: request.body.email,
          country: request.body.country,
          book_reciever: request.body.book_reciever,
          giftDate: request.body.giftDate,
          giftSender: request.body.giftSender,
          giftRelation: request.body.giftRelation,
          giftOccasion: request.body.giftOccasion,
          giftSalutation: request.body.giftSalutation,
          giftMessage: request.body.giftMessage,
          roles: request.body.roles,
          orderId: request.body.orderId,
          planType: request.body.planType,
          status: request.body.status,
        },
      }
      // ... (your PUT request logic)

      if (request.body.password) {
        bcrypt
          .hash(request.body.password, 10)
          .then(async (hashedPassword) => {
            newValues = {
              $set: {
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                email: request.body.email,
                country: request.body.country,
                book_reciever: request.body.book_reciever,
                giftDate: request.body.giftDate,
                giftSender: request.body.giftSender,
                giftRelation: request.body.giftRelation,
                giftMessage: request.body.giftMessage,
                password: hashedPassword,
                roles: request.body.roles,
                orderId: request.body.orderId,
                planType: request.body.planType,
                timezone: userTimezone,
                status: request.body.status,
              },
            }
            // update user values by id
            await User.findByIdAndUpdate(id, newValues, {
              new: true,
              runValidators: true,
            })
              // return success if the new user is updated to the database successfully
              .then((result) => {
                response.status(201).send({
                  message: 'User Updated Successfully',
                  result,
                })
              })
              // catch error if the new user wasn't updating successfully to the database
              .catch((error) => {
                response.status(500).send({
                  message: 'Error updating user account',
                  error,
                })
              })
          })
          // catch error if the password hash isn't successful
          .catch((error) => {
            response.status(500).send({
              message: 'Password was not hashed successfully',
              error,
            })
          })
      } else {
        console.log(newValues)
        // update user values by id
        await User.findByIdAndUpdate(id, newValues, {
          new: true,
          runValidators: true,
        })
          // return success if the new user is updated to the database successfully
          .then((result) => {
            response.status(201).send({
              message: 'User Updated Successfully',
              result,
            })
          })
          // catch error if the new user wasn't updating successfully to the database
          .catch((error) => {
            response.status(500).send({
              message: 'Error updating user account',
              error,
            })
          })
      }

      break

    case 'DELETE' /* Delete a model by its ID */:
      await User.deleteOne({ _id: id })

        // return success if deleting user account
        .then((result) => {
          response.status(201).send({
            message: 'User Deleted Successfully',
            result,
          })
        })
        // catch error if deleting user account
        .catch((error) => {
          response.status(500).send({
            message: 'Error deleting user',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
