import mailchimp from '@mailchimp/mailchimp_marketing'

export default async function handler(request, response) {
  const { method } = request

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
  })

  switch (method) {
    case 'GET': //get all subscriber lists
      const count = request.query ? request.query : {}
      const newsletter = await mailchimp.lists.getListMembersInfo(
        process.env.MAILCHIMP_AUDIENCE_ID,
        count,
      )

      if (newsletter.status >= 400) {
        return newsletter.status(400).json({
          error: `There was an error subscribing to the newsletter.`,
        })
      }

      return response.status(201).json({ message: 'List of newsletter', newsletter })

    default:
      response.status(400).json({ success: false })
      break
  }
}
