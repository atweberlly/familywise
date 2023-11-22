import dbConnect from '../../../../lib/dbConnect'
import CoverUser from '../../../../models/coverModel'

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      await dbConnect() // Connect to the MongoDB database using dbConnect

      const userId = req.query.userId // Extract the user ID from the query parameters

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      // Fetch data from the collection for the specified user ID
      const coverData = await CoverUser.find({ userId }).exec()

      res.status(200).json(coverData)
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch cover data: ${error.message}` })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
