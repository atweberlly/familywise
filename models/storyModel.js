import mongoose, { mongo } from 'mongoose'

// story schema
//id
//user_id
//question_id
//heading
//story
//image
//caption_img
//status-0

const StorySchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide User ID!'],
      unique: false,
      ref: 'User',
    },
    question_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide Question ID!'],
      unique: false,
      ref: 'Questions',
    },
    heading: {
      type: String,
      unique: false,
    },
    story: {
      type: String,
      unique: false,
    },
    image: {
      type: String,
      unique: false,
    },
    caption_img: {
      type: String,
      unique: false,
    },
    status: {
      type: Boolean,
      unique: false,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.models.Story || mongoose.model('Story', StorySchema)
