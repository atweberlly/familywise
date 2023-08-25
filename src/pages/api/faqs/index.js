import mongoose from 'mongoose'
import dbConnect from '../../../../lib/dbConnect'
import Faqs from '../../../../models/faqModel'

export default async function handler(request, response) {
  const { method } = request

  await dbConnect()

  switch (method) {
    case 'GET': //find all Faqs
      // await Faqs.find({})
      //   // return success
      //   .then((result) => {
      //     response.status(201).send({
      //       message: 'List of Faqs',
      //       result,
      //     })
      //   })
      //   // catch error if getting Faqs
      //   .catch((error) => {
      //     response.status(500).send({
      //       message: 'Error getting all faqs',
      //       error,
      //     })
      //   })
      await Faqs.aggregate([
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
            message: 'List of Faqs',
            result,
          })
        })
        // catch error if getting Faqs
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all faqs',
            error,
          })
        })

      break

    case 'POST': //create testimonial
      const faqs = {
        category_id: mongoose.Types.ObjectId(request.body.category_id),
        question: request.body.question,
        answer: request.body.answer,
        published: request.body.published,
      }

      await Faqs.create(faqs)
        // return success if the new Faqs is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: 'Faqs Created Successfully',
            result,
          })
        })
        // catch error if the new Faqs wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating Faqs item',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
