import mongoose from 'mongoose'

const activityLogSchema = new mongoose.Schema({
  email: String,
  description: String,
  date: { type: Date, default: Date.now },
})

// Check if the model already exists
let ActivityLog

try {
  ActivityLog = mongoose.model('ActivityLog')
} catch (error) {
  // The model doesn't exist, so create it
  ActivityLog = mongoose.model('ActivityLog', activityLogSchema)
}

export default ActivityLog
