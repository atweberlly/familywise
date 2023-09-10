import dbConnect from '../../../../lib/dbConnect'
import User from '../../../../models/userModel'

const deactivateAccount = async (req, res) => {
  try {
    // Ensure that you're receiving the email and reason in the request data
    const { email, reason } = req.body

    // Connect to the database
    await dbConnect()

    // Find the user by email and update the status to false
    // Also, save the deactivation reason
    await User.findOneAndUpdate({ email }, { status: false, reason })

    // Send a success response
    res.status(200).json({ message: 'Account deactivated successfully' })
  } catch (error) {
    console.error('Error deactivating account:', error)
    res.status(500).json({ error: 'Failed to deactivate account' })
  }
}

export default deactivateAccount
