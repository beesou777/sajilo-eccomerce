const Banner = require("../model/HomepageBanner");
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
      author: req.headers.user_id,
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

const getBanner = async (req, res) => {
  try {
    const id = req.headers.user_id
    const findBanner = await Banner.findOne({author:id}).select("-author")
    if(!findBanner){
      return res.status(404).json({message:"banner not found"})
    }
    res.status(200).json({ success: true, findBanner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.files && req.files.image;
    const {heading,smallText,buttonLink,buttonText,status} = req.body
    if (!file) {
      await Banner.findByIdAndUpdate(
        id,
        { heading, smallText, buttonLink, buttonText, status },
        { new: true }
      );
    } else {
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      await Banner.findByIdAndUpdate(
        id,
        {
          heading,
          smallText,
          buttonLink,
          buttonText,
          status,
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
