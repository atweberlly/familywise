import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request

  await dbConnect()

  switch (method) {
    case 'PUT' /* Edit a model by its ID */:
      console.log(id)
      let newValues = {
        planType: request.body.planType,
        freeTrialEnd: request.body.FreeTrialEnd,
      }
      //update newValues by id
      await User.findByIdAndUpdate(id, newValues, {
        new: true,
        runValidators: true,
      })
        // return success message if new coupon is updated successfully
        .then((result) => {
          response.status(201).send({
            message: 'User Plan type updated successfully',
            result,
          })
        })
        // catch error if new coupon wasn't updating successfully
        .catch((error) => {
          response.status(500).send({
            message: 'Error updating',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
