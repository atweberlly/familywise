import mongoose from 'mongoose'

// Category schema
const CategorySchema = mongoose.Schema(
  {
    //   type field
    type: {
      type: String,
      enum: ['faq', 'question'],
      default: ['question'],
    },

    // name field
    name: {
      type: String,
      required: [true, 'Please provide name!'],
      unique: false,
    },

    //   description field
    description: {
      type: String,
      required: false,
      unique: false,
    },
  },
  { timestamps: true },
)

// export CategorySchema
module.exports = mongoose.models.Categories || mongoose.model('Categories', CategorySchema)
