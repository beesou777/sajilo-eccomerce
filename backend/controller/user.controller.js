const User = require("../model/user.model");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


const accessToken = (user_id) =>{
  return jwt.sign({sub:user_id},process.env.JWT_SECRET_KEY,{
    expiresIn:'7d',
  })
}

const Register = async (req, res) => {
  try {
    const { store_name, email, first_name,last_name,password,phone_number,username } = req.body;
    if (!email || !store_name || !first_name || !last_name || !phone_number || !password || !username) {
      return res.status(400).json({ error: "all fields are required!!" });
    }

    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(password,salt)

    const exiting_user = await User.findOne({email})
    const exiting_user_username = await User.findOne({username})

    if (exiting_user) {
      return res.status(400).json({ message: "user already exist" });
    }

    let roles;
    if(req.route.path == "/customer/register"){
      roles = "customer"
    }else if(req.route.path == "/admin/register"){
      roles = "admin"
    }else{
      roles = "user"
    }
    if (exiting_user_username) {
      return res.status(400).json({ message: "user already exist" });
    }

    const register_user = new User({
      store_name,
      email,
      first_name,
      last_name,
      profile_picture:"https://res.cloudinary.com/dasuhyei1/image/upload/v1700654628/ueser_profile.png",
      phone_number,
      sub_domain: username,
      role:roles,
      password:hash_password,
      username
    });

    await register_user.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

const Login = async (req, res) => {
  try {
    const {email,password} = req.body

    if(!email || !password){
      return res.status(400).json({message:"Invalid username or password"})
    }

    const user = await User.findOne({email})

    if (!user) {
      return res.status(404).json({ message: "User does not found" });
    }

    const match_password = await bcrypt.compare(password,user.password)
    
    if(!match_password){
      return res.status(400).json({message:"password does not match"})
    }
    const access_token = accessToken(user._id)
    res.cookie('token',access_token,{
      httpOnly:true,
      sameSite:'None',
      secure:true
    })

    const uuid = user._id


    res.status(200).json({ success: true,access_token,uuid});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
};

const getUser = async (req, res) => {
  try {
    const user_id = req.headers.user_id;
    if(user_id == null){
      return res.status(404).json({ message: "user does not found" });
    }
    const user_details = await User.findById({_id:user_id}).select("-password")
    if(!user_details){
      return res.status(404).json({ message: "user does not found" });
    }
    res.status(200).json({ success: true, user_details });
  } catch (error) {
    if(error?.value.user_id){
      return res.status(404).json({message:"an error occur"})
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  Register,
  getUser,
  Login
};
