const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

// MongoDB connection using your provided connection string
mongoose.connect(
  'mongodb+srv://admin:QQ5IGGRBuVTw5gcz@cluster0.mho149r.mongodb.net/familyfortunate?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

// Define a User schema based on your 'users' collection
const userSchema = new mongoose.Schema({
  planType: String,
})

const User = mongoose.model('familyfortunate', userSchema, 'users') // 'users' is the collection name

app.use(bodyParser.json())

// API endpoint to update user's planType
app.post('../pages/api/update-plan-type/:userId', async (req, res) => {
  const userId = req.params.userId
  const newPlanType = 'Premium' // Set the new planType here

  try {
    // Update the user's planType
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { planType: newPlanType },
      { new: true }
    )

    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating planType:', error)
    res.status(500).send('Internal Server Error')
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
