import request from 'axios'

const { getAccessToken } = require('./lulu-api')

const createPrintJob = async (user, title, totalPages) => {
  try {
    const accessToken = await getAccessToken()

    const options = {
      method: 'POST',
      url: 'https://api.lulu.com/print-jobs/',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      data: {
        contact_email: user.email,
        external_id: user._id,
        userfname: user.firstname,
        line_items: [
          {
            external_id: 'item-reference-1',
            printable_normalization: {
              cover: {
                source_url:
                  'https://familyfortunate.s3.ap-southeast-2.amazonaws.com/pdf-inventory/' +
                  user._id +
                  '/' +
                  user.firstname +
                  '_Cover.pdf', //https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1
              },
              interior: {
                source_url:
                  'https://familyfortunate.s3.ap-southeast-2.amazonaws.com/pdf-inventory/' +
                  user._id +
                  '/' +
                  user.firstname +
                  '_Book.pdf',
              },
              pod_package_id: '0583X0827FCSTDPB080CW444MXX', //0583X0827FCSTDPB080CW444MXX //0600X0900BWSTDPB060UW444MXX
            },
            quantity: totalPages,
            title: title,
          },
        ],
        production_delay: 120,
        shipping_address: {
          city: user.city,
          country_code: user.country,
          name: user.firstname + ' ' + user.lastname,
          phone_number: user.phoneNumber,
          postcode: user.postCode,
          state_code: user.stateCode,
          street1: user.street,
        },
        shipping_level: 'MAIL',
      },
    }

    // Return the promise from the request call
    return request(options)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        throw error
      })
  } catch (error) {
    throw error
  }
}

module.exports = createPrintJob
