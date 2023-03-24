import dbConnect from '../../../../lib/dbConnect'
import Question from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import User from '../../../../models/userModel'

const generateRandomQuestion = async (req, res) => {
  // add req as argument
  await dbConnect()
  try {
    // Get user with status=true
    const users = await User.find({ status: true })

    // Loop through each user and create a story with a random question
    for (const user of users) {
      // Get random question with QuestionType = 'planType' or 'both' and published = 1
      let questions = await Question.find({
        QuestionType: { $in: ['planType', 'both'] },
        published: true,
      })

      // Get stories for the current user
      const stories = await Story.find({ user_id: user._id })

      // Remove questions that have already been assigned to the user
      for (const story of stories) {
        questions = questions.filter(
          (question) => question._id.toString() !== story.question_id.toString()
        )
      }

      // If there are no questions remaining, skip the user
      if (questions.length === 0) continue

      // Get a random question from the remaining questions
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)]

      // Create a story with the random question
      await Story.create({
        user_id: user._id,
        question_id: randomQuestion._id,
      })
    }

    res.status(200).json({ message: 'Random questions generated for valid users.' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

export default generateRandomQuestion
