import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import { capitalizeFirstLetter, isSameDate } from '../../../utils/globalFnx'
import { convertTimezone } from '../../../utils/userTimezone'
import { sendMailFnx } from '../sendMailFnx'

const onboardingDaysLater = async (req, res) => {
  //Establish a database connection
  await dbConnect()
  // add req as argument
  const addDays = parseInt(req.query.addDays)
  //total of email sent
  let totalSent = 0

  // Check if addDays parameter is present
  if (!addDays) {
    return res.status(500).json({ message: 'No days configuration' })
  }

  try {
    // Retrieve all users with status=true and role='subscriber'
    const users = await User.find({ status: true, roles: 'subscriber' })

    // Loop through each user
    for (const user of users) {
      //Set the date for the scheduled email based on whether the user received a gift or not
      const date = user.bookReceiver === 'gift' ? user.giftDate : user.createdAt
      //get user's timezone
      const timezone = user.timezone ? user.timezone : 'UTC'
      //Add [n] days to the scheduled date
      const daysLater = new Date(date.setDate(date.getDate() + addDays))
      // Convert schedule date to the specified timezone
      const emailSchedule = convertTimezone(daysLater, timezone, timezone)
      console.log(daysLater)
      // Convert today to the specified timezone
      const today = convertTimezone(new Date(), timezone, timezone)
      console.log(new Date())
      // Check if today's date is the same as the scheduled email date
      if (isSameDate(emailSchedule, today)) {
        // Construct the email subject line
        const subject =
          addDays === 3
            ? `${capitalizeFirstLetter(user.firstname)}, have you answered your first question?`
            : `How was your first week, ${capitalizeFirstLetter(user.firstname)}?`
        // Set the email template to be used based on the number of days to send the email and the user's planType
        const template =
          addDays === 3 ? `Both/onboarding-3.html` : `${user.planType}/onboarding-2.html`
        // Set the parameters for the email template
        const params = {
          name: capitalizeFirstLetter(user.firstname),
        }
        // Set the configuration for the email to be sent
        const emailConfig = {
          subject: subject,
          template: template,
          param: params,
          to: user.email,
        }
        // Send the onboarding email for three days later
        await sendMailFnx(emailConfig)
        totalSent += 1
      }
    }

    res.status(200).json({ message: `Email successfully sent for total of ${totalSent} users` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

export default onboardingDaysLater
