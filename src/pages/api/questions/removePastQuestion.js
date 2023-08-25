import dbConnect from '../../../../lib/dbConnect'
//import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'

const removePastQuestion = async (req, res) => {
  await dbConnect()
  try {
    //const removeStory =
    await Story.deleteOne({
      _id: req.body.question_id,
    })
    const stories = await Story.find({ status: false, user_id: req.body.userId }).populate(
      'question_id',
    )
    const removeStories = stories.filter(
      (e) => new Date() - new Date(e.createdAt) > 3600 * 24 * 7 * 1000,
    )
    res.status(200).json(removeStories)
  } catch (error) {
    console.log(error)
  }
}

export default removePastQuestion
