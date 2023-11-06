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

      case 'PUT':
        const newValues = {
          title: body.title,
          description: body.description,
          pagetitle: body.pagetitle,
          pagedescription: body.pagedescription,
          image: body.image,
          author: body.author,
          tags: body.tags,
          modified: body.modified,
          timezone: userTimezone,
          visibility: body.visibility,
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
