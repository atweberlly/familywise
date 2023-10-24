import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

const s3 = new S3({
  region: 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  signatureVersion: 'v4',
})

const uploadPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, type } = req.body

    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    }

    const url = await s3.getSignedUrlPromise('putObject', fileParams)

    res.status(200).json({ url })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb', // Set the desired value here
    },
  },
}

export default uploadPDF
