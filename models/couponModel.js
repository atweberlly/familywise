import mongoose from 'mongoose'

// coupon schema
//id
//code
//description
//type ['percentage', 'amount']
//amount
//expiryDate
//publish

const CouponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide coupon code!'],
      unique: [true, 'Coupon Already Exists'],
    },

    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },

    type: {
      type: String,
      enum: ['percentage', 'amount'],
      default: 'subscriber',
    },

    amount: {
      type: Number,
      required: [true, 'Please provide amount!'],
    },

    expiryDate: {
      type: Date,
      required: false,
    },

    //User's timezone
    timezone: {
      type: String,
      required: false,
    },

    published: {
      type: Boolean,
      unique: false,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema)
