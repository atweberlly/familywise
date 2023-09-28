import dbConnect from '../../../../lib/dbConnect'
//import { de } from 'date-fns/locale'
import Story from '../../../../models/storyModel'
import logActivity from '../activity/logActivity'
import { getUser } from '../users/getUserV2'

//import User from '../../../../models/userModel'

const saveStory = async (req, res) => {
  await dbConnect()
  try {
    const user = await getUser(req.headers.cookie)
    const updateStory = await Story.findByIdAndUpdate(req.body.id, {
      heading: req.body.content.heading,
      story: req.body.content.story,
      caption_img: req.body.content.caption,
      status: true,
    })
    const email = user.email
    const description = 'Added/Saved a story: ' + req.body.content.heading
    logActivity(email, description)
    res.status(200).json(updateStory)
  } catch (error) {
    console.log(error)
  }
}

export default saveStory
