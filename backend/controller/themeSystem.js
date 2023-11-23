const ThemeSystem = require("../model/ThemeSystem");
const Section = require("../model/HomepageSection")
const Banner = require("../model/HomepageBanner")
const User = require("../model/user.model")
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const getThemeSystem = async (req, res) => {
  try {
    const id = req.headers.user_id || req.headers.sub_domain;
    const themes = await ThemeSystem.findOne({owner:id}).populate("banner")
    .populate({
      path: 'section_details',
      populate: {
        path: 'section_1.products section_2.products section_3.products',
        model: 'products'
      }
    }) 

    res.status(200).json({success:true,themes})
    
  } catch (error) { 
    res.status;
  }
};

const createTheme = async (req, res) => {
  try {
    const id = req.headers.user_id;
    const section = await Section.findOne({ createdBy: id })
    const sub_domain = await User.findOne({_id:id})
    const banner = await Banner.findOne({ createdBy: id })
    const createTheme = new ThemeSystem({
      owner:req.headers.user_id,
      sub_domain:sub_domain.sub_domain,
      banner:banner,
      section_details:section
    })
    await createTheme.save()
    res.status(201).json({
      message: 'Theme created successfully',
     createTheme
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating theme' });
  }
};

module.exports = {
  getThemeSystem,
  createTheme,
};