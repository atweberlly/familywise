import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { getUser } from '../users/getUserV2'

const saveOwnQuestion = async (req, res) => {
  await dbConnect()
  try {
    const user = await getUser(req.headers.cookie)
    const today = new Date().toISOString().split('T')[0]

    const newQuestion = await Questions.create({
      category_id: '63f734ceb771ba095737369f',
      question: req.body.question,
      description: 'related to custom question',
      published: true,
      QuestionType: 'ylb',
    })

    if (newQuestion) {
      await Story.create({
        user_id: user._id,
        question_id: newQuestion._id,
      })
      const addStories = await Story.find({
        status: false,
        user_id: user._id,
        createdAt: { $gte: today },
      }).populate('question_id')

      res.status(200).json(addStories)
    }
  } catch (error) {
    console.log(error)
  }
}

export default saveOwnQuestion
