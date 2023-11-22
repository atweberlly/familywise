import dbConnect from '../../../../lib/dbConnect'
import ActivityLog from '../../../../models/activityModel'

export default async function handler(request, response) {
  const { method, query } = request
  await dbConnect()

  switch (method) {
    case 'GET': // Find activity logs for a specific user
      const email = query.email // Assuming user_id is in the query parameters

      if (!email) {
        response.status(400).json({ success: false, message: 'Missing email in query parameters' })
        return
      }

      // Find activity logs for the specific user
      await ActivityLog.find({ email: email })
        // return success
        .then((result) => {
          response.status(201).send({
            message: 'List of Activity Logs for the user',
            result,
          })
        })
        // catch error if getting Activity Logs
        .catch((error) => {
          response.status(500).send({
            message: 'Error getting activity logs',
            error,
          })
        })

      break

    default:
      response.status(400).json({ success: false })
      break
  }
}
