import dbConnect from '../../../../lib/dbConnect'
import Story from '../../../../models/storyModel'

const saveImage = async (req, res) => {
  await dbConnect()
  try {
    const uploadImage = await Story.findByIdAndUpdate(req.body.id, {
      image: req.body.image,
    })
    res.status(200).json(uploadImage)
  } catch (error) {
    console.log(error)
  }
}

export default saveImage
