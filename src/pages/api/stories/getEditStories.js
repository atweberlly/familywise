import dbConnect from '../../../../lib/dbConnect'
//import Questions from '../../../../models/questionModel'
import Story from '../../../../models/storyModel'

const getEditStories = async (req, res) => {
  await dbConnect()
  try {
    const story = await Story.find({ status: true, _id: req.body.id }).populate('question_id')
    // console.log(story)
    res.status(200).json(story[0])
  } catch (error) {
    console.log(error)
  }
}

export default getEditStories
