import ActivityLog from '../models/activity-log'

const logActivity = async (email, description) => {
  try {
    const activityLog = new ActivityLog({
      email,
      description,
    })
    await activityLog.save()
    console.log('Activity logged successfully:', activityLog)
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}

export default logActivity
