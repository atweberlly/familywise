import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import User from '../../../../models/userModel'

const cronQuestion = async (req, res) => {
  await dbConnect()
  try {
    const questions = await Questions.find()
    let i = 0
    const users = await User.find({
      status: true,
    })
    // console.log(users)
    users.forEach(async (user) => {
      i = Math.floor(Math.random() * questions.length)
      //const newStory =
      await Story.create({
        user_id: user._id,
        question_id: questions[i]._id,
      })
    })
  } catch (error) {
    console.log(error)
  }
}

export default cronQuestion
