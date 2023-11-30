const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default: "https://res.cloudinary.com/dasuhyei1/image/upload/v1700654628/ueser_profile.png",
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: 'customer',
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    minlength:4
  },
  phone_number:{
    type:Number,
    required:[true,"phone number is required"]
  }
});

const Customer = mongoose.model('Customer', userSchema);

module.exports = Customer;
