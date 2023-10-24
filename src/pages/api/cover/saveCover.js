import { MongoClient } from 'mongodb'

const uri =
  'mongodb+srv://admin:QQ5IGGRBuVTw5gcz@cluster0.mho149r.mongodb.net/familyfortunate?retryWrites=true&w=majority'

export default async (req, res) => {
  if (req.method === 'POST') {
    let client

    const { userId, title, author, image } = req.body

    try {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      await client.connect()

      const collection = client.db('familyfortunate').collection('CoverUser')

      // Check if a document with the given userId exists
      const existingCoverUser = await collection.findOne({ userId })

      if (existingCoverUser) {
        // If the document exists, update the data
        await collection.updateOne({ userId }, { $set: { title, author, image } })
      } else {
        // If the document doesn't exist, create a new one
        await collection.insertOne({ userId, title, author, image })
      }

      res.status(200).json({ message: 'Cover data saved successfully' })
    } catch (error) {
      res.status(500).json({ error: `Failed to save cover data: ${error.message}` })
    } finally {
      if (client) {
        client.close()
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
