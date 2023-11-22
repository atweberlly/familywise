import dbConnect from '../../../../lib/dbConnect'
import CoverUser from '../../../../models/coverModel'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { userId, title, author, image } = req.body

    try {
      await dbConnect()

      // Check if a document with the given userId exists
      const existingCoverUser = await CoverUser.findOne({ userId })

      if (existingCoverUser) {
        // If the document exists, update the data
        await CoverUser.updateOne({ userId }, { $set: { title, author, image } })
      } else {
        // If the document doesn't exist, create a new one
        await CoverUser.create({ userId, title, author, image })
      }

      res.status(200).json({ message: 'Cover data saved successfully' })
    } catch (error) {
      res.status(500).json({ error: `Failed to save cover data: ${error.message}` })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
