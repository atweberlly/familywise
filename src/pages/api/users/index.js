import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import bcrypt from 'bcrypt'

export default async function handler(request, response) {
  const { method } = request

  await dbConnect()

  switch (method) {
    case 'GET': //find all users
      await User.find({})
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
      bcrypt
        .hash(request.body.password, 10)
        .then(async (hashedPassword) => {
          const newUser = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password: hashedPassword,
            country: request.body.country,
            book_receiver: request.body.book_receiver,
            gift_for: request.body.gift_for,
            gift_relation: request.body.gift_relation,
            roles: request.body.roles,

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
              response.status(500).send({
                message: 'Error creating user',
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
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
