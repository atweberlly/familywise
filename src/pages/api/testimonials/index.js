import dbConnect from '../../../../lib/dbConnect'
import Testimonial from '../../../../models/testimonialModel'

export default async function handler(request, response) {
  const { method } = request

  await dbConnect()

  switch (method) {
    case 'GET': //find all testimonials
      await Testimonial.find({})
        // return success
        .then((result) => {
          response.status(201).send({
            message: 'List of Testimonials',
            result,
          })
        })
        // catch error if getting testimonials
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all testimonials',
            error,
          })
        })

      break

    case 'POST': //create testimonial
      const testimonial = {
        message: request.body.message,
        name: request.body.name,
        location: request.body.location,
        position: request.body.position,
        published: request.body.published,
      }

      await Testimonial.create(testimonial)
        // return success if the new Testimonial is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: 'Testimonial Created Successfully',
            result,
          })
        })
        // catch error if the new Testimonial wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating Testimonial item',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
