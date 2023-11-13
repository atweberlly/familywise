import dbConnect from '../../../../lib/dbConnect'
import Blogs from '../../../../models/blogsModel'

export default async function handler(request, response) {
  await dbConnect()

  const {
    query: { id },
    method,
    body,
  } = request

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  try {
    switch (method) {
      case 'GET':
        const blog = await Blogs.findById(id)
        if (blog) {
          response.status(200).json({ message: 'Success', result: blog })
        } else {
          response.status(404).json({ message: 'Blog not found' })
        }
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
          url: request.body.title.replace(/ /g, '-').replace(/\?/g, ''), //convert space to dash and remove ?
          timezone: userTimezone,
          visibility: request.body.visibility,
        }

        const updatedBlog = await Blogs.findByIdAndUpdate(id, newValues, {
          new: true,
          runValidators: true,
        })

        if (updatedBlog) {
          response.status(200).json({ message: 'Blog updated successfully', result: updatedBlog })
        } else {
          response.status(404).json({ message: 'Blog not found' })
        }
        break

      case 'DELETE':
        const deletedBlog = await Blogs.deleteOne({ _id: id })

        if (deletedBlog.deletedCount > 0) {
          response.status(200).json({ message: 'Blog post deleted successfully' })
        } else {
          response.status(404).json({ message: 'Blog not found' })
        }
        break

      default:
        response.status(405).json({ message: 'Method Not Allowed' })
        break
    }
  } catch (error) {
    response.status(500).json({ message: 'Server Error', error: error.message })
  }
}
