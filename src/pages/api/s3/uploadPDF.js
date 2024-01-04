import PdfGen from '../../../components/PDFGen'
import createPrintJob from '../LuluAPI/create-print'
import { renderToBuffer } from '@react-pdf/renderer'
import S3 from 'aws-sdk/clients/s3'

const s3 = new S3({
  region: 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  signatureVersion: 'v4',
})

// Function to create a folder in S3 if it doesn't exist
const createFolderIfNotExists = async (folderName) => {
  try {
    await s3.headObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: `${folderName}/` }).promise()
  } catch (err) {
    // Folder doesn't exist, create it
    await s3.putObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: `${folderName}/` }).promise()
  }
}

export default async (req, res) => {
  try {
    // Retrieve the user data from the request body sent by handlePublish
    const { title, pages, user, name, email, type, stories } = req.body

    // Create a dynamic folder name by there Email
    const folderName = `${email.split('.')[0]}_Folder`

    // Create the folder if it doesn't exist
    await createFolderIfNotExists(folderName)

    const pdfBuffer = await renderToBuffer(
      <PdfGen user_id={user._id} user={user} stories={stories} />
    )

    // Set S3 parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `pdf-inventory/${folderName}/${name}`,
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
