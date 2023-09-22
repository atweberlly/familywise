import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'

const deleteAccount = async (req, res) => {
  try {
    // Ensure that you're receiving the email in the request data
    const { email } = req.body

    // Connect to the database
    await dbConnect()

    // Find the user by email and delete it
    await User.findOneAndDelete({ email })

    // Send a success response
    res.status(200).json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Error deleting account:', error)
    res.status(500).json({ error: 'Failed to delete account' })
  }
}

export default deleteAccount
