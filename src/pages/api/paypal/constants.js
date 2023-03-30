export const paypalBaseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
export const sandboxURLs = {
  AUTH_API_URL: `${paypalBaseURL}/v1/oauth2/token`,
  ORDERS_API_URL: `${paypalBaseURL}/v2/checkout/orders`,
  CLIENT_TOKEN_URL: `${paypalBaseURL}/v1/identity/generate-token`,
}
