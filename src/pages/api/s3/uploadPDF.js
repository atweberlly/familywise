import ReactDOMServer from 'react-dom/server'
// Import ReactDOMServer
import PdfGen from '../../../components/PDFGen'
import createPrintJob from '../LuluAPI/create-print'
import S3 from 'aws-sdk/clients/s3'
import puppeteer from 'puppeteer'

const s3 = new S3({
  region: 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  signatureVersion: 'v4',
})

export default async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()

    // Retrieve the user data from the request body sent by handlePublish
    const { title, pages, user, name, type } = req.body

    // Use viewport and page size settings for A5
    await page.setViewport({ width: 420, height: 595 }) // A5 size in pixels (5.8in x 8.3in)

    const content = (
      <div style={{ width: '5.83in', height: '8.27in' }}>
        <PdfGen user_id={user._id} user={user} />
      </div>
    )

    // Render the React component to HTML using ReactDOMServer.renderToString
    const html = ReactDOMServer.renderToString(content)

    console.log(html) // Log the HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdfBuffer = await page.pdf({
      format: 'A5',
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
    })

    await browser.close()

    // Set S3 parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
      Body: pdfBuffer,
      Expires: 600,
      ContentType: type,
    }

    console.log(pages)
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading to S3', err)
        res.status(500).send('Error uploading to S3')
      } else {
        console.log('File uploaded to S3', data.Location)

        // Call the createPrintJob function
        createPrintJob(user, title, pages) // Pass user details as needed
          .then(function (response) {
            if (response) {
              if (response.id) {
                console.log('Print job created with ID:', response.id)
                res.status(200).json({ location: data.Location, printJobId: response.id })
              } else {
                console.error('Print job response is missing the expected properties:', response)
                res.status(500).send('Error creating print job')
              }
            } else {
              console.error('Unexpected response from createPrintJob:', response)
              res.status(500).send('Error creating print job')
            }
          })
          .catch(function (error) {
            console.error('Error creating print job:', error)
            res.status(500).send('Error creating print job')
          })
      }
    })
  } catch (error) {
    console.error('Error generating PDF', error)
    res.status(500).send('Error generating PDF')
  }
}
