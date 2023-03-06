import dbConnect from '../../../../lib/dbConnect'
import Testimonial from '../../../../models/testimonialModel'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      await Testimonial.findById(id)

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
            message: 'Error getting testimonial item',
            error,
          })
        })

      break

    case 'PUT' /* Edit a model by its ID */:
      let newValues = {
        message: request.body.message,
        name: request.body.name,
        location: request.body.location,
        position: request.body.position,
        published: request.body.published,
      }
      //update newValues by id
      await Testimonial.findByIdAndUpdate(id, newValues, {
        new: true,
        runValidators: true,
      })
        // return success message if new testimonial is updated successfully
        .then((result) => {
          response.status(201).send({
            message: 'Testimonial updated successfully',
            result,
          })
        })
        // catch error if new testimonial wasn't updating successfully
        .catch((error) => {
          response.status(500).send({
            message: 'Error updating',
            error,
          })
        })

      break

    case 'DELETE' /* Delete a model by its ID */:
      await Testimonial.deleteOne({ _id: id })

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Testimonail Deleted Successfully',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error deleting testimonial item',
            error,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
