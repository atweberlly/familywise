import { capitalizeFirstLetter } from '../../../utils/globalFnx'
import { sendMailFnx } from '../sendMailFnx'

const calculateDaysDifference = (date1, date2) => {
  const diffInTime = date2.getTime() - date1.getTime()
  const diffInDays = diffInTime / (1000 * 3600 * 24)
  return diffInDays
}

const onboarding = async (req, res) => {
  try {
    const user = req.body

    let subject = ''
    let template = ''
    let emailType = 'Premium'
    let weeklyEmailCount = 1

    if (user.planType === 'Premium') {
      const availedDate = new Date(user.freeTrialEnd)
      const currentDate = new Date()
      const daysSinceAvailed = calculateDaysDifference(availedDate, currentDate)
      if (daysSinceAvailed >= 7) {
        emailType = 'WeeklyEmail'
        // Calculate the count of weekly emails sent
        weeklyEmailCount = Math.floor(daysSinceAvailed / 7) + 1
        // Cap the count to 10
        if (weeklyEmailCount > 10) {
          weeklyEmailCount = 10
        }
      } else {
        emailType = 'PremiumAfterWeek' // Still within the first 7 days of Premium
      }
    }

    const params = {
      name: capitalizeFirstLetter(user.firstname),
      // Include other parameters relevant to Speech-To-Text feature if needed
    }

    switch (emailType) {
      case 'Premium':
        subject = `Congratulations on availing the Speech-To-Text feature, ${capitalizeFirstLetter(
          user.firstname
        )}!`
        template = 'Premium/onboarding-1.html'
        break
      case 'PremiumAfterWeek':
        subject = `Welcome to Premium!`
        template = 'Premium/onboarding-2.html'
        break
      case 'WeeklyEmail':
        subject = `Your Weekly Update`
        template = `Premium/weekly-email-${weeklyEmailCount}.html`
        break
      default:
        subject = 'Ready to get started with Speech-To-Text?'
        template = 'Premium/onboarding-1.html'
        break
    }

    const emailConfig = {
      subject: subject,
      template: template,
      param: params,
      to: user.email,
    }

    // Send the email
    await sendMailFnx(emailConfig)

    return res.status(200).json({ message: 'Email successfully sent!' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export default onboarding
