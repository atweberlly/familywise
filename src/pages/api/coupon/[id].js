import dbConnect from '../../../../lib/dbConnect'
import Coupon from '../../../../models/couponModel'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      await Coupon.findById(id)

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Success',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting coupon item',
            error,
          })
        })

      break

    case 'PUT' /* Edit a model by its ID */:
      console.log(userTimezone)
      let newValues = {
        code: request.body.code,
        description: request.body.description,
        type: request.body.type,
        amount: request.body.amount,
        expiryDate: request.body.expiryDate,
        timezone: userTimezone,
        published: request.body.published,
      }
      //update newValues by id
      await Coupon.findByIdAndUpdate(id, newValues, {
        new: true,
        runValidators: true,
      })
        // return success message if new coupon is updated successfully
        .then((result) => {
          response.status(201).send({
            message: 'Coupon updated successfully',
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

    case 'DELETE' /* Delete a model by its ID */:
      await Coupon.deleteOne({ _id: id })

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Coupon Deleted Successfully',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error deleting coupon item',
            error,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
