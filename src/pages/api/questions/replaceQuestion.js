import dbConnect from '../../../../lib/dbConnect'
//import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { getUser } from '../users/getUserV2'

const replaceQuestion = async (req, res) => {
  await dbConnect()
  try {
    const user = await getUser(req.headers.cookie)
    const today = new Date().toISOString().split('T')[0]

    const currentStory = await Story.find({
      question_id: req.body.question_id,
      user_id: user._id,
    })
    if (currentStory.length !== 0) {
      res.status(201).send({ message: 'question already exists!' })
    } else {
      // const replaceStory =
      await Story.findByIdAndUpdate(req.body.id, {
        question_id: req.body.question_id,
      })
      const stories = await Story.find({
        status: false,
        user_id: user._id,
        createdAt: { $gte: today },
      }).populate('question_id')
      const replaceStories = stories.filter(
        (e) => new Date() - new Date(e.createdAt) < 3600 * 24 * 7 * 1000
      )
      res.status(200).json(replaceStories)
    }
  } catch (error) {
    console.log(error)
  }
}

export default replaceQuestion
