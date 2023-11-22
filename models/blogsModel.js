import mongoose from 'mongoose'

const BlogsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      unique: false,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    pageTitle: {
      type: String,
      required: false,
      unique: false,
    },
    pageDescription: {
      type: String,
      required: false,
      unique: false,
    },
    image: {
      type: String,
      unique: false,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      unique: false,
    },
    tags: {
      type: String,
      unique: false,
    },
    url: {
      type: String,
      required: false,
      unique: false,
    },
    modified: {
      type: Date,
      required: false,
    },

    timezone: {
      type: String,
      required: false,
    },

    visibility: {
      type: Boolean,
      unique: false,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.models.Blogs || mongoose.model('Blogs', BlogsSchema)
