import mongoose from 'mongoose'
import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'

export default async function handler(request, response) {
  const { method } = request

  await dbConnect()

  switch (method) {
    case 'GET': //find all Questions
      await Questions.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $sort: { updatedAt: -1 },
        },
      ])
        .then((result) => {
          response.status(201).send({
            message: 'List of Questions',
            result,
          })
        })
        // catch error if getting questions
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all questions',
            error,
          })
        })

      break

    case 'POST': //create question
      const question = {
        category_id: mongoose.Types.ObjectId(request.body.category_id),
        question: request.body.question,
        description: request.body.description,
        QuestionType: request.body.QuestionType,
        published: request.body.published,
      }

      await Questions.create(question)
        // return success if the new question is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: 'New Question is successfully created',
            result,
          })
        })
        // catch error if the new question wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating question item',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
