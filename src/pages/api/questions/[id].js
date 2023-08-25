import mongoose from 'mongoose'
import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      await Questions.findById(id)

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
            message: 'Error getting question item',
            error,
          })
        })

      break

    case 'PUT' /* Edit a model by its ID */:
      let newValues = {
        category_id: mongoose.Types.ObjectId(request.body.category_id),
        question: request.body.question,
        description: request.body.description,
        QuestionType: request.body.QuestionType,
        published: request.body.published,
      }
      //update newValues by id
      await Questions.findByIdAndUpdate(id, newValues, {
        new: true,
        runValidators: true,
      })
        // return success message if new question is updated successfully
        .then((result) => {
          response.status(201).send({
            message: 'Question is successfully updated',
            result,
          })
        })
        // catch error if new question wasn't updating successfully
        .catch((error) => {
          response.status(500).send({
            message: 'Error updating',
            error,
          })
        })

      break

    case 'DELETE' /* Delete a model by its ID */:
      await Questions.deleteOne({ _id: id })

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Question is successfully deleted',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error deleting question item',
            error,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
