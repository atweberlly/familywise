import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string)

interface IEmailParams {
  subject: string
  html: string
  to: string
  bcc: string
  from: string
}

const sendEmail = async (emailParams: IEmailParams) => {
  const email = {
    bcc: emailParams.bcc,
    to: emailParams.to,
    from: emailParams.from,
    subject: emailParams.subject,
    html: emailParams.html,
  }

  try {
    await sendgrid.send(email)
  } catch (error) {
    throw new Error('Email could not be sent, Please try again later')
  }
}

export { sendEmail }
