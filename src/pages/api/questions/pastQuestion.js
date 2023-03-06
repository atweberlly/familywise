import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { getUser } from '../users/getUserV2'

const pastQuestion = async (req, res) => {
  await dbConnect()
  try {
    await Questions.find()
    const user = await getUser(req.headers.cookie)
    const today = new Date().toISOString().split('T')[0]

    const pastQuestions = await Story.find({
      status: false,
      user_id: user._id,
      createdAt: { $lt: today },
    }).populate('question_id')

    res.status(200).json(pastQuestions)
  } catch (error) {
    console.log(error)
  }
}

export default pastQuestion
