import dbConnect from '../../../../lib/dbConnect'
//import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { getUser } from '../users/getUserV2'

const addQuestion = async (req, res) => {
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
      //const newStory =

      await Story.create({
        user_id: user._id,
        question_id: req.body.question_id,
        question: req.body.question,
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

export default addQuestion
