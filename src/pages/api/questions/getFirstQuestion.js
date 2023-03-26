import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { convertTimezone } from '../../../utils/userTimezone'
import { sendMailFnx } from '../sendMailFnx'

const staticQuestionId = '641e466788e2fe3884a27b0f' //requested by the client

const getFirstQuestion = async (req, res) => {
  try {
    await dbConnect()
    // Extract relevant information from request body
    const { _id, bookReceiver, giftDate, timezone } = req.body

    // Convert gift date to the specified timezone
    const giftDateConverted = convertTimezone(new Date(giftDate), timezone, timezone)
    // Convert today to the specified timezone
    const today = convertTimezone(new Date(), timezone, timezone)

    // Find the relevant question for the user
    const questions = await Questions.findOne({
      _id: staticQuestionId,
    })
    // Check if the user has already have their first question
    const currentStories = await Story.find({ user_id: _id })
    if (currentStories.length !== 0) {
      return res.status(500).json({ message: 'First question already added' })
    }

    // Check if the email should be sent now or scheduled for a later date
    if (bookReceiver === 'gift') {
      if (isSameDate(today, giftDateConverted)) {
        // Send the onboarding email and first question
        await sendOnboardingEmail(req.body)
        await sendFirstQuestion(req.body, questions.question)
      }
    } else {
      // Send the onboarding email and first question
      await sendOnboardingEmail(req.body)
      await sendFirstQuestion(req.body, questions.question)
    }

    // Save the user's first question to the story table
    await Story.create({ user_id: _id, question_id: questions._id })

    return res.status(200).json({ message: 'Email successfully sent!' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

const sendOnboardingEmail = async (user) => {
  //Email Parameters
  //params { subject, template, param, to }
  const subject =
    user.bookReceiver === 'gift'
      ? `${capitalizeFirstLetter(user.firstname)}, Here's your gift!`
      : `Ready to get started, ${capitalizeFirstLetter(user.firstname)}?`
  const params =
    user.bookReceiver === 'gift'
      ? {
          name: capitalizeFirstLetter(user.firstname),
          totalQuestions: user.planType === 'Classic' ? 100 : 500,
          occasion: user.giftOccasion,
          salutation: user.giftSalutation,
          token: user.token,
          sender: user.giftSender,
          message: user.giftMessage,
        }
      : {
          name: capitalizeFirstLetter(user.firstname),
          totalQuestions: user.planType === 'Classic' ? 100 : 500,
        }
  const template =
    user.bookReceiver === 'gift'
      ? 'Both/onboarding-1-gift.html'
      : user.planType + '/onboarding-1.html'

  const emailConfig = {
    subject: subject,
    template: template,
    param: params,
    to: user.email,
  }

  // Send the email
  return await sendMailFnx(emailConfig)
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
  // Delay the email sending for 5 minutes
  setTimeout(async () => {
    // Send the email
    await sendMailFnx(emailConfig)
  }, 300000)
}

// program to convert first letter of a string to uppercase
const capitalizeFirstLetter = (str) => {
  // converting first letter to uppercase
  return str.charAt(0).toUpperCase() + str.slice(1)
}

//function to check if dates are equal
const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export default getFirstQuestion
