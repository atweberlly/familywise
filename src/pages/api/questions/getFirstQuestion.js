import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { capitalizeFirstLetter } from '../../../utils/globalFnx'
import { sendMailFnx } from '../sendMailFnx'

const staticQuestionId = '641e466788e2fe3884a27b0f' //requested by the client

const getFirstQuestion = async (req, res) => {
  try {
    await dbConnect()
    // Extract relevant information from request body
    const { _id } = req.body

    // Find the relevant question for the user
    const questions = await Questions.findOne({
      _id: staticQuestionId,
    })
    // Check if the user has already have their first question
    const currentStories = await Story.find({ user_id: _id })
    if (currentStories.length !== 0) {
      return res.status(500).json({ message: 'First question already added' })
    }
    // Send the onboarding email and first question
    await sendFirstQuestion(req.body, questions.question)
    // Save the user's first question to the story table
    await Story.create({ user_id: _id, question_id: questions._id })

    return res.status(200).json({ message: 'Email successfully sent!' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

const sendFirstQuestion = async (user, question) => {
  //params { subject, template, param, to }
  const subject = `${capitalizeFirstLetter(user.firstname)}, Here's your first question!`
  const params = {
    name: capitalizeFirstLetter(user.firstname),
    question: question,
  }

  const template = 'Both/onboarding-2.html'

  const emailConfig = {
    subject: subject,
    template: template,
    param: params,
    to: user.email,
  }
  // Send the email
  await sendMailFnx(emailConfig)
}

export default getFirstQuestion
