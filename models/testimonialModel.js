import mongoose from 'mongoose'

// testimonial schema
const TestimonialSchema = new mongoose.Schema(
  {
    //   message field
    message: {
      type: String,
      required: [true, 'Please provide message!'],
      unique: false,
    },

    //   name field
    name: {
      type: String,
      required: [true, 'Please provide name!'],
      unique: false,
    },
    //   location field
    location: {
      type: String,
      required: false,
      unique: false,
    },
    //   position field
    position: {
      type: String,
      required: false,
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

// export TestimonialSchema
module.exports = mongoose.models.Testimonials || mongoose.model('Testimonials', TestimonialSchema)
