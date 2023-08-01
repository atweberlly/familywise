import mongoose from 'mongoose'

// user schema
const UserSchema = new mongoose.Schema(
  {
    // first name field
    firstname: {
      type: String,
      required: [true, 'This field cannot be left blank'],
      unique: false,
    },

    //   last name field
    lastname: {
      type: String,
      required: [true, 'This field cannot be left blank'],
      unique: false,
    },

    // email field
    email: {
      type: String,
      required: [true, 'Please provide an Email!'],
      unique: [true, 'Email Exist'],
    },

    //   password field
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      unique: false,
    },

    //   country field
    country: {
      type: String,
      required: [true, 'Please select a Country!'],
      unique: false,
    },
    //book receiver
    bookReceiver: {
      type: String,
      required: [true, 'Please select book receiver!'],
      unique: false,
    },

    // Date to gift
    giftDate: {
      type: Date,
      required: false,
      unique: false,
    },

    // Gift sender
    giftSender: {
      type: String,
      required: false,
      unique: false,
    },
    // gift relation field
    giftRelation: {
      type: String,
      required: false,
      unique: false,
    },
    // Gift Salutation
    giftSalutation: {
      type: String,
      required: false,
      unique: false,
    },

    // Gift Message
    giftMessage: {
      type: String,
      required: false,
      unique: false,
    },
    // Gift Occasions
    giftOccasion: {
      type: String,
      required: false,
      unique: false,
    },

    // user roles
    roles: {
      type: String,
      enum: ['subscriber', 'admin'],
      default: 'subscriber',
    },
    //paypal subscription ID
    orderId: {
      type: String,
      required: false,
      unique: false,
    },
    //Forgot Password Token
    token: {
      type: String,
      required: false,
      unique: false,
    },
    //subscription type
    planType: {
      type: String,
      enum: ['Free-Trial', 'Classic', 'Premium'],
      default: 'Free-Trial',
    },

    //user's timezone
    timezone: {
      type: String,
      require: true,
    },
    //   payment status
    status: {
      type: Boolean,
      default: false,
      required: false,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
)

// export UserSchema
module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
