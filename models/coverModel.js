import mongoose from 'mongoose'

// Cover schema
const CoverSchema = mongoose.Schema(
  {
    // userId field
    userId: {
      type: String,
      required: [true, 'Please provide User ID!'],
      unique: true,
    },

    // title field
    title: {
      type: String,
      unique: false,
    },

    // author field
    author: {
      type: String,
      unique: false,
    },

    // image field
    image: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
)

// export CoverSchema
module.exports = mongoose.models.CoverUser || mongoose.model('CoverUser', CoverSchema)
