import axios from 'axios'
import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'
import { isSameDate } from '../../../utils/globalFnx'
import { convertTimezone } from '../../../utils/userTimezone'

const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:3000' : process.env.PRODUCTION_URL

const onboardingFutureGift = async (req, res) => {
  //Establish a database connection
  await dbConnect()
  //total of email sent
  let totalSent = 0

  try {
    // Retrieve all users with status=true and role='subscriber'
    const users = await User.find({ status: true, roles: 'subscriber', bookReceiver: 'gift' })

    // Loop through each user
    for (const user of users) {
      //get user's timezone
      const timezone = user.timezone ? user.timezone : 'UTC'
      // Convert schedule date to the specified timezone
      const emailSchedule = convertTimezone(user.giftDate, timezone, timezone)
      // Convert today to the specified timezone
      const today = convertTimezone(new Date(), timezone, timezone)
      // Check if today's date is the same as the scheduled email date
      if (isSameDate(emailSchedule, today)) {
        // Send the onboarding email
        await axios.post(`${server}/api/mail/onboarding`, user)
        // Delay the email sending for 5 minutes
        setTimeout(async () => {
          // Get the first question for the user and send it to them
          await axios.post(`${server}/api/questions/getFirstQuestion`, user)
        }, 300000)
        totalSent += 1
      }
    }
    res.status(200).json({ message: `Email successfully sent for total of ${totalSent} users` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

export default onboardingFutureGift
