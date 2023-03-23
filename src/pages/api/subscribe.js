import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
})

const subscribe = async (req, res) => {
  const { email, firstName, lastName, country } = req.body

  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        COUNTRY: country,
      },
      status: 'subscribed',
    })

    if (response.status >= 400) {
      return response.status(400).json({
        error: `There was an error subscribing to the newsletter.`,
      })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}

export default subscribe
