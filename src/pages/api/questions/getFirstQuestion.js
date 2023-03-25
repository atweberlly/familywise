import dbConnect from '../../../../lib/dbConnect'
import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'
import { convertTimezone } from '../../../utils/userTimezone'
import { sendMailFnx } from '../sendMailFnx'

const staticQuestionId = '641e466788e2fe3884a27b0f' //requested by the client

const getFirstQuestion = async (req, res) => {
  try {
    await dbConnect()
    const { _id, bookReceiver } = req.body
    const questions = await Questions.findOne({
      _id: staticQuestionId,
    })
    const currentStories = await Story.find({ user_id: _id })
    if (currentStories.length !== 0) {
      return res.status(500).json({ message: 'First question already added' })
    }

    await Story.create({ user_id: _id, question_id: questions._id })

    if (bookReceiver === 'gift') {
      await sendGiftScheduleEmail(req.body, questions.question)
    } else {
      await sendOnboardingEmail(req.body, questions.question)
    }

    return res.status(200).json({ message: 'Email successfully sent!' })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return res.status(500).json({ message: errorMessage, err })
  }
}

const sendOnboardingEmail = async (user, question) => {
  //Email Parameters
  //params { subject, template, param, to }
  const subject = `Ready to get started, ${capitalizeFirstLetter(user.firstname)}?`
  const params = {
    name: capitalizeFirstLetter(user.firstname),
    totalQuestions: user.planType === 'Classic' ? 100 : 500,
  }
  const template = user.planType + '/onboarding-1.html'

  const emailConfig = {
    subject: subject,
    template: template,
    param: params,
    to: user.email,
  }
  // Send the email
  sendMailFnx(emailConfig)
  sendFirstQuestion(user, question)
}
//Note by Jonah: need to test this function
const sendGiftScheduleEmail = async (user, question) => {
  // Set the date and time you want the email to be sent
  const scheduledDate = convertTimezone(new Date(user.giftDate), user.timezone, user.timezone)
  // Calculate the number of milliseconds until the scheduled date and time
  const timeUntilScheduled = scheduledDate.getTime() - Date.now()
  //params { subject, template, param, to }
  const subject = `${capitalizeFirstLetter(user.firstname)}, Here's your gift!`
  const params = {
    name: capitalizeFirstLetter(user.firstname),
    totalQuestions: user.planType === 'Classic' ? 100 : 500,
    occasion: user.giftOccasion,
    salutation: user.giftSalutation,
    token: user.token,
    sender: user.giftSender,
    message: user.giftMessage,
  }

  const template = 'Both/onboarding-1-gift.html'

  const emailConfig = {
    subject: subject,
    template: template,
    param: params,
    to: user.email,
  }
  // Delay the email sending until the scheduled date and time
  setTimeout(() => {
    // Send the email
    sendMailFnx(emailConfig)
    sendFirstQuestion(user, question)
  }, timeUntilScheduled)
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
  setTimeout(() => {
    sendMailFnx(emailConfig)
  }, 300000)
}

// program to convert first letter of a string to uppercase
const capitalizeFirstLetter = (str) => {
  // converting first letter to uppercase
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default getFirstQuestion
