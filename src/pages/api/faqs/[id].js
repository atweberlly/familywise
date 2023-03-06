import dbConnect from '../../../../lib/dbConnect'
import Faqs from '../../../../models/faqModel'
import mongoose from 'mongoose'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      await Faqs.findById(id)

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
            message: 'Error getting faq item',
            error,
          })
        })

      break

    case 'PUT' /* Edit a model by its ID */:
      let newValues = {
        category_id: mongoose.Types.ObjectId(request.body.category_id),
        question: request.body.question,
        answer: request.body.answer,
        published: request.body.published,
      }
      //update newValues by id
      await Faqs.findByIdAndUpdate(id, newValues, {
        new: true,
        runValidators: true,
      })
        // return success message if new faq is updated successfully
        .then((result) => {
          response.status(201).send({
            message: 'Faq updated successfully',
            result,
          })
        })
        // catch error if new faq wasn't updating successfully
        .catch((error) => {
          response.status(500).send({
            message: 'Error updating',
            error,
          })
        })

      break

    case 'DELETE' /* Delete a model by its ID */:
      await Faqs.deleteOne({ _id: id })

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Faq Deleted Successfully',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error deleting faq item',
            error,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
