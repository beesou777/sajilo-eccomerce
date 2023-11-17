const ThemeSystem = require("../model/ThemeSystem");
const Product = require("../model/CreateProduct");
const Category = require("../model/CreateCategory");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const getThemeSystem = async (req, res) => {
  const id = req.headers.user_id || req.headers.sub_domain;

  const findProducts = await Product.find({ user: id });
  const findCategory = await Category.find({ owner: id });
  try {
    const { heading, sub_title, button_text, button_link, name } = req.body;
  } catch (error) {
    res.status;
  }
  console.log(findCategory);
};

const createTheme = async (req, res) => {
  try {
    const { banner, section_details } = req.body;
    const bannerData = {};
    for (const key in req.body) {
      if (key.startsWith('banner[')) {
        const bannerField = key.split('[')[1].split(']')[0];
        bannerData[bannerField] = req.body[key];
      }
    }
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const newTheme = new ThemeSystem({
      owner: req.headers.user_id,
      sub_domain: req.headers.sub_domain,
      banner: {
        image: result.url,
        heading:bannerData.heading,
        sub_title:bannerData.sub_title,
        button_text:bannerData.button_text,
        button_link:bannerData.button_link
      },
      section_details,
    });
    console.log(newTheme);
    // await newTheme.save();

    // res.status(201).json({
    //   message: 'Theme created successfully',
    //   theme: newTheme,
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating theme' });
  }
};

module.exports = {
  getThemeSystem,
  createTheme,
};
