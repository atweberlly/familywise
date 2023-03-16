import { sandboxURLs } from './constants'

export const generateAccessToken = async () => {
  const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env
  const { AUTH_API_URL } = sandboxURLs

  const encodedToken = Buffer.from(
    NEXT_PUBLIC_PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET
  ).toString('base64')
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: 'Basic ' + encodedToken,
    },
    body: 'grant_type=client_credentials',
  })
  const { access_token } = await response.json()
  return access_token
}

const getClientToken = async () => {
  const { CLIENT_TOKEN_URL } = sandboxURLs
  const access_token = await generateAccessToken()
  const response = await fetch(CLIENT_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + access_token,
      'Accept-Language': 'en_US',
    },
  })
  const res = await response.json()
  return res
}

const handler = async (req, res) => {
  const { client_token } = await getClientToken()
  console.log(`client token- ${JSON.stringify(client_token)}`)
  res.status(200).send({ client_token })
}
export default handler
