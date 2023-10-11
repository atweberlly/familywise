import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { getUser } from '../users/getUserV2'

const getStories = async (req, res) => {
  await dbConnect()
  try {
    if (Questions) {
      const user = await getUser(req.headers.cookie)
      const stories = await Story.find({ status: true, user_id: user._id }).populate('question_id')
      res.status(200).json(stories)
    }
  } catch (error) {
    console.log(error)
  }
}

export default getStories
