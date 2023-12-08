const Banner = require("../model/HomepageBanner");
const User = require("../model/user.model")
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const createBanner = async (req, res) => {
  try {
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const { heading, smallText, buttonText, buttonLink, status } = req.body;
    const categorySection = new Banner({
      createdBy: req.headers.user_id,
      image: result.url,
      heading,
      smallText,
      buttonText,
      buttonLink,
      status,
    });
    await categorySection.save();
    res.status(200).json({ success: true, categorySection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBanner = async (req, res,next) => {
  try {
    let url;
    if(req.headers.url !== (null || undefined)){
      url = req.headers.url.trim().split('/')[1]
    } 
    let banner; 
    let user_id  
    if(url !== undefined || null){
      let user = await User.findOne({sub_domain:url})
      if(!user){
        res.status(404)
        return next({
          message:"data not found"
        })
      }
      user_id =  user.id.valueOf();
      banner = await Banner.findOne({createdBy:user_id})
    }else if(req.headers.user_id){
      user_id = req.headers.user_id
      banner = await Banner.findOne({createdBy:user_id})
      if(!banner){
        const defaultBanner = new Banner({
          createdBy: user_id,        
        });
        banner = await defaultBanner.save();
      }
    }
    res.status(200).json({ success: true, banner });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.files && req.files.image;
    const {heading,sub_title,button_link,button_text} = req.body
    if (!file) {
      await Banner.findByIdAndUpdate(
        id,
        { heading, sub_title, button_link, button_text },
        { new: true }
      );
    } else {
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      await Banner.findByIdAndUpdate(
        id,
        {
          heading,
          sub_title,
          button_link,
          button_text,
          image: result.url,
        },
        { new: true }
      );
    }
    res.status(200).json({ msg: "Successfully updated Banner" });
  } catch (error) {
    console.log("Error updating Banner", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createBanner,
  getBanner,
  editBanner,
};
