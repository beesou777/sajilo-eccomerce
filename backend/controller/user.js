const User = require("../model/user");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const createUser = async (req, res) => {
  try {
    const user = req.headers.user_id
    const {store_name, email, full_name, profile_picture } = req.body;


    if (!email && !store_name && !full_name && !profile_picture) {
      return res.status(400).json({ error: "all feild are required!!" });
    }

    const checkUserExist = await User.findOne({ user });
    if (checkUserExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const storeName = full_name.split(" ")[0]

    const randomInteger = Math.floor(Math.random() * 1000) + 1;

    const newSubDomain = storeName + "-" + randomInteger

    const createUser = new User({
      user_id:user,
      store_name,
      email,
      full_name,
      profile_picture,
      sub_domain:newSubDomain.toLowerCase()
    });

    await createUser.save();
    res
      .status(200)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user_details = await User.findOne({user_id:userId});
    if (!user_details) {
      return res.status(400).json({ message: "User does not found" });
    }
    res.status(200).json({success:true,user_details})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editUserDetails = async (req, res) => {
  try {
    const userId = req.params.id
    const user_details = await User.findOne({user_id:userId});
    if (!user_details) {
      return res.status(400).json({ message: "User does not found" });
    }
    const {
      store_name,full_name
    } = req.body
    const file1 = req.files.product_images;
    const result1 = await cloudinary.uploader.upload(file1.tempFilePath);
    const updateUserDetails = await User.findByIdAndUpdate(id,{
      store_name,full_name,profile_picture:result1.url
    },{new:true})
    res.status(200).json({success:true,updateUserDetails})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUser,
  editUserDetails
};
