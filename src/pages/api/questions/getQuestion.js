import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { getUser } from '../users/getUserV2'

const getQuestion = async (req, res) => {
  await dbConnect()
  try {
    //const currentStories = await Story.find()
    await Questions.find()
    const user = await getUser(req.headers.cookie)
    const today = new Date().toISOString().split('T')[0]

    //TEMPORARILY COMMENTED

    // let i = 0
    // i = Math.floor(Math.random() * questions.length)

    // if (currentStories.length === 0) {
    //   await Story.create({
    //     user_id: user._id,
    //     question_id: questions[i]._id,
    //   })
    // }

    const upcomingQuestions = await Story.find({
      status: false,
      user_id: user._id,
      createdAt: { $gte: today },
    }).populate('question_id')

    res.status(200).json(upcomingQuestions)
  } catch (error) {
    console.log(error)
  }
}

export default getQuestion
