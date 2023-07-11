const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:3000' : process.env.PRODUCTION_URL

const GetEmailSubject = async (subjectPath: string) => {
  const buffer = await fetch(`${server}/email_templates/${subjectPath}`)

  return await buffer.text()
}

const replaceTemplate = (emailBody: string, data: any) => {
  for (const key in data) {
    const regex = new RegExp('\\${' + key + '}', 'g')
    emailBody = emailBody.replace(regex, data[key])
  }
  return emailBody
}

const GetEmailBody = async (bodyPath: string, data?: any) => {
  const bufferBody = await fetch(`${server}/email_templates/${bodyPath}`)
  const emailBody = await bufferBody.text()
  const emailBodyParsed = replaceTemplate(emailBody, data)
  return emailBodyParsed.toString()
}

export { GetEmailSubject, GetEmailBody }
