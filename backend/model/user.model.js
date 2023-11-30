const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  store_name: {
    type: String,
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
    enum: ['admin', 'user','customer'],
    default: 'user',
  },
  sub_domain: {
    type: String
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    minlength:4
  },
  phone_number:{
    type:Number,
    required:[true,"phone number is required"]
  },
  username:{
    type:String,
    required:[true,"username is required nad must be unique"]
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
