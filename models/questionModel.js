import mongoose from 'mongoose'

// faq schema
const QuestionSchema = mongoose.Schema(
  {
    // category_id field
    category_id: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide Category ID!'],
      unique: false,
    },

    //   question field
    question: {
      type: String,
      required: [true, 'Please provide question!'],
      unique: false,
    },

    //   question field
    description: {
      type: String,
      required: [true, 'Please provide description!'],
      unique: false,
    },

    QuestionType: {
      type: String,
      enum: ['classic', 'premium', 'freetrial', 'both'],
      default: 'both',
    },

    //   published field
    published: {
      type: Boolean,
      unique: false,
    },
  },
  { timestamps: true }
)

// export QuestionSchema
module.exports = mongoose.models.Questions || mongoose.model('Questions', QuestionSchema)
