const { getAccessToken } = require('./lulu-api')
const request = require('axios')

const getPrintJobs = async () => {
  try {
    const accessToken = await getAccessToken()

    const options = {
      method: 'GET',
      url: 'https://api.sandbox.lulu.com/print-jobs/',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    }

    request(options)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error('Error: ', error)
      })
  } catch (error) {
    console.error('Error:', error.message)
  }
}

getPrintJobs()
