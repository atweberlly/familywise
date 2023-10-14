const { getAccessToken } = require('./lulu-api')
const request = require('axios')

const createPrintJob = async () => {
  try {
    const accessToken = await getAccessToken()

    const options = {
      method: 'POST',
      url: 'https://api.sandbox.lulu.com/print-jobs/',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      data: {
        contact_email: 'test@test.com',
        external_id: 'demo-time',
        line_items: [
          {
            external_id: 'item-reference-1',
            printable_normalization: {
              cover: {
                source_url:
                  'https://www.dropbox.com/s/7bv6mg2tj0h3l0r/lulu_trade_perfect_template.pdf?dl=1&raw=1',
              },
              interior: {
                source_url:
                  'https://www.dropbox.com/s/r20orb8umqjzav9/lulu_trade_interior_template-32.pdf?dl=1&raw=1',
              },
              pod_package_id: '0600X0900BWSTDPB060UW444MXX',
            },
            quantity: 30,
            title: 'My Book',
          },
        ],
        production_delay: 120,
        shipping_address: {
          city: 'Lübeck',
          country_code: 'GB',
          name: 'Hans Dampf',
          phone_number: '844-212-0689',
          postcode: 'PO1 3AX',
          state_code: '',
          street1: 'Holstenstr. 48',
        },
        shipping_level: 'MAIL',
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

createPrintJob()
