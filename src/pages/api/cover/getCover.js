import { MongoClient } from 'mongodb'

const uri =
  'mongodb+srv://admin:QQ5IGGRBuVTw5gcz@cluster0.mho149r.mongodb.net/familyfortunate?retryWrites=true&w=majority'

export default async (req, res) => {
  if (req.method === 'GET') {
    let client // Define the client variable outside the try-catch block

    try {
      const userId = req.query.userId // Extract the user ID from the query parameters

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' })
      }

      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      await client.connect()

      const collection = client.db('familyfortunate').collection('CoverUser')

      // Fetch data from the collection for the specified user ID
      const coverData = await collection.find({ userId }).toArray()

      res.status(200).json(coverData)
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch cover data: ${error.message}` })
    } finally {
      if (client) {
        client.close()
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
