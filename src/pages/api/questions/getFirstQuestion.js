import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { capitalizeFirstLetter } from '../../../utils/globalFnx'
import { sendMailFnx } from '../sendMailFnx'

const staticQuestionId = '641e466788e2fe3884a27b0f' //requested by the client

const getFirstQuestion = async (req, res) => {
  try {
    // Connect to the database
    await dbConnect()
    // Extract the user data from the request body
    const user = req.body
    // Construct the email subject line
    const subject = `${capitalizeFirstLetter(user.firstname)}, Here's your first question!`
    // Set the email template to be used
    const template = 'Both/onboarding-2.html'

    // Find the relevant question for the user
    const questions = await Questions.findOne({
      _id: staticQuestionId,
    })
    // Check if the user has already have their first question
    const currentStories = await Story.find({ user_id: user._id })
    if (currentStories.length !== 0) {
      // If the user has already received their first question, send an error response
      return res.status(500).json({ message: 'First question already added' })
    }
    // Set the parameters for the email template
    const params = {
      name: capitalizeFirstLetter(user.firstname),
      question: questions.question,
    }
    // Set the configuration for the email to be sent
    const emailConfig = {
      subject: subject,
      template: template,
      param: params,
      to: user.email,
    }
    // Send the onboarding email and first question
    await sendMailFnx(emailConfig)
    // Save the user's first question to the story table
    await Story.create({ user_id: user._id, question_id: questions._id })
    // Send a success response to the client
    return res.status(200).json({ message: 'Email successfully sent!' })
  } catch (err) {
    // If an error occurs, send an error response to the client
    return res.status(500).json({ message: err })
  }
}
export default getFirstQuestion
