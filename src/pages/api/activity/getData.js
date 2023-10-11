import { MongoClient } from 'mongodb'

const uri =
  'mongodb+srv://admin:QQ5IGGRBuVTw5gcz@cluster0.mho149r.mongodb.net/familyfortunate?retryWrites=true&w=majority'

export default async (req, res) => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  try {
    await client.connect()

    const database = client.db('familyfortunate')
    const collection = database.collection('activitylogs')

    const data = await collection.find().toArray()

    res.status(200).json({ success: true, data })
  } finally {
    await client.close()
  }
}
