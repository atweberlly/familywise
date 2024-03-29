const axios = require('axios')
require('dotenv').config()

const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET
const tokenUrl = process.env.TOKEN_URL

/*
const apiKey = 'ad3ca2df-7496-4204-a3b4-afd1ea56dbcb' // lulu '20bf7b24-e707-4dd4-8a71-e1f67e3d143e'
const apiSecret = 'o7lOhI7w4uM8ZcDH9xUpQcVBKeGn0p0F' // lulu 'M6b1SuWDX0GjG9XYN0t8AfCpSBVgJrfM'
const tokenUrl = 'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token' //sandbox api.sandbox...
*/
const getAccessToken = async () => {
  try {
    const response = await axios.post(tokenUrl, 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
      },
    })
    return response.data.access_token
  } catch (error) {
    throw new Error('API Error:', error.response ? error.response.data : error.message)
  }
}

module.exports = { getAccessToken }

/* Console Log 
const axios = require('axios');

const apiKey = 'ad3ca2df-7496-4204-a3b4-afd1ea56dbcb';  // Lulu API Client Key
const apiSecret = 'o7lOhI7w4uM8ZcDH9xUpQcVBKeGn0p0F';  // Lulu API Client Secret
const apiUrl = 'https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token';

// Example API request
const makeApiRequest = async () => {
  try {
    const response = await axios.post(apiUrl, 'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
      }
    });

    console.log('API Response:', response.data);
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
  }
};

makeApiRequest();
*/
