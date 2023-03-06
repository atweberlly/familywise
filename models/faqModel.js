import mongoose from 'mongoose'

// faq schema
const FaqSchema = mongoose.Schema(
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

    //   answer field
    answer: {
      type: String,
      required: [true, 'Please provide answer!'],
      unique: false,
    },

    //   published field
    published: {
      type: Boolean,
      unique: false,
    },
  },
  { timestamps: true }
)

// export FaqSchema
module.exports = mongoose.models.Faqs || mongoose.model('Faqs', FaqSchema)
