import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import bcrypt from 'bcrypt'

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
          freeTrialEnd: request.body.freeTrialEnd,
          status: request.body.status,
        },
      }
      // ... (your PUT request logic)

      // Check if the user's planType is already 'Free-Trial'
      if (existingUser && existingUser.planType === 'Free-Trial') {
        // If the user's planType is 'Free-Trial', update the freeTrialEnd date
        const newValues = {
          $set: {
            // ... (your other fields)
            planType: request.body.planType,
            freeTrialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Update the freeTrialEnd date (7 days from now)
            timezone: userTimezone,
            status: request.body.status,
          },
        }
        const freeTrialEnd = new Date()
        freeTrialEnd.setDate(freeTrialEnd.getDate() + 7)

        // Set the freeTrialEnd date in the newValues
        newValues.$set.freeTrialEnd = freeTrialEnd

        // ... (your PUT request logic for updating other fields)

        // Update the user's information in the database
        await User.findByIdAndUpdate(id, newValues, {
          new: true,
          runValidators: true,
        })
          .then((result) => {
            response.status(201).send({
              message: 'User Updated Successfully',
              result,
            })
          })
          .catch((error) => {
            response.status(500).send({
              message: 'Error updating user account',
              error,
            })
          })

        break
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
                freeTrialEnd: request.body.freeTrialEnd,
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
