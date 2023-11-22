import dbConnect from '../../../../lib/dbConnect'
import Blogs from '../../../../models/blogsModel'

export default async function handler(request, response) {
  const { method } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  await dbConnect()

  switch (method) {
    case 'GET': //find all coupon
      await Blogs.find({})
        // return success
        .then((result) => {
          response.status(201).send({
            message: 'List of Blog posts',
            result,
          })
        })
        // catch error if getting Coupons
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting all blogs',
            error,
          })
        })

      break

    case 'POST': //create coupon
      const blog = {
        title: request.body.title,
        description: request.body.description,
        pagetitle: request.body.pagetitle,
        pagedescription: request.body.pagedescription,
        image: request.body.image,
        author: request.body.author,
        tags: request.body.tags,
        modified: request.body.modified,
        url: request.body.title.replace(/ /g, '-').replace(/\?/g, ''), //convert space to dash and remove ?
        timezone: userTimezone,
        visibility: request.body.visibility,
      }
      console.log(blog)

      await Blogs.create(blog)
        // return success if the new coupon is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: 'post Created Successfully',
            result,
          })
        })
        // catch error if the new coupon wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: 'Error creating Blog post',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
