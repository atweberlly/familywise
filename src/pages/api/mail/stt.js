import { capitalizeFirstLetter } from '../../../utils/globalFnx'
import { sendMailFnx } from '../sendMailFnx'

const onboarding = async (req, res) => {
  try {
    const user = req.body

    let subject = ''

    if (user.planType === 'premium') {
      subject = `Congratulations on availing the Speech-To-Text feature, ${capitalizeFirstLetter(
        user.firstname
      )}!`
    } else {
      subject = 'Ready to get started with Speech-To-Text?'
    }

    const params = {
      name: capitalizeFirstLetter(user.firstname),
      // Include other parameters relevant to Speech-To-Text feature if needed
    }

    const template = 'SpeechToText/onboarding.html'

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
