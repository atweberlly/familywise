import dbConnect from '../../../../lib/dbConnect'
//import { de } from 'date-fns/locale'
import Story from '../../../../models/storyModel'

//import User from '../../../../models/userModel'

const saveStory = async (req, res) => {
  await dbConnect()
  try {
    const updateStory = await Story.findByIdAndUpdate(req.body.id, {
      heading: req.body.content.heading,
      story: req.body.content.story,
      caption_img: req.body.content.caption,
      status: true,
    })
    res.status(200).json(updateStory)
  } catch (error) {
    console.log(error)
  }
}

export default saveStory
