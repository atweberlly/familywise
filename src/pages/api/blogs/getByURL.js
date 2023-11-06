import dbConnect from '../../../../lib/dbConnect'
import Blogs from '../../../../models/blogsModel'

const getByURL = async (req, res) => {
  await dbConnect()
  try {
    const blog = await Blogs.find({ visibility: true, url: req.body.url })
    res.status(200).json(blog[0])
  } catch (error) {
    console.log(error)
  }
}

export default getByURL
