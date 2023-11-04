import dbConnect from '../../../../lib/dbConnect'
import Blogs from '../../../../models/blogsModel'

export default async function handler(request, response) {
  const {
    query: { id },
    method,
  } = request
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      await Blogs.findById(id)

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
            message: 'Error getting blogs posts',
            error,
          })
        })

      break

    case 'PUT' /* Edit a model by its ID */:
      console.log(userTimezone)
      let newValues = {
        title: request.body.title,
        description: request.body.description,
        pagetitle: request.body.pagetitle,
        pagedescription: request.body.pagedescription,
        image: request.body.description,
        author: request.body.author,
        tags: request.body.tags,
        modified: request.body.modified,
        timezone: userTimezone,
        visibility: request.body.visibility,
      }
      //update newValues by id
      await Blogs.findByIdAndUpdate(id, newValues, {
        new: true,
        runValidators: true,
      })
        // return success message if new coupon is updated successfully
        .then((result) => {
          response.status(201).send({
            message: 'Blog updated successfully',
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
      await Blogs.deleteOne({ _id: id })

        //return success
        .then((result) => {
          response.status(201).send({
            message: 'Blog post Deleted Successfully',
            result,
          })
        })

        // catch error
        .catch((error) => {
          response.status(500).send({
            message: 'Error deleting Blog post',
            error,
          })
        })
      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
