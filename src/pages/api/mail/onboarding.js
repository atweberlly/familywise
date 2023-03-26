import { capitalizeFirstLetter } from '../../../utils/globalFnx'
import { sendMailFnx } from '../sendMailFnx'

const onboarding = async (user) => {
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

export default onboarding
