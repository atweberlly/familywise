import dbConnect from '../../../../lib/dbConnect'
//import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import logActivity from '../activity/logActivity'
import { getUser } from '../users/getUserV2'

const removeQuestion = async (req, res) => {
  await dbConnect()
  try {
    const user = await getUser(req.headers.cookie)
    //const removeStory =
    await Story.deleteOne({
      _id: req.body.question_id,
    })

    const stories = await Story.find({ status: false, user_id: user._id }).populate('question_id')
    const removeStories = stories.filter(
      (e) => new Date() - new Date(e.createdAt) < 3600 * 24 * 7 * 1000
    )
    res.status(200).json(removeStories)
    const email = user.email
    const description = 'Removed a Question: ' + removeStories
    logActivity(email, description)
  } catch (error) {
    console.log(error)
  }
}

export default removeQuestion
