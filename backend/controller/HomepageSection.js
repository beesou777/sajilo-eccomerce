const Homepage = require("../model/HomepageSection");
const Banner = require("../model/HomepageBanner");
const User = require("../model/user.model");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const sectionData = async (req, res) => {
  try {
    const { section_1, section_2, section_3 } = req.body;
    const data = new Homepage({
      createdBy: req.headers.user_id,
      section_1,
      section_2,
      section_3,
    });
    await data.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSectionData = async (req, res) => {
  try {
    let id = req.params.id;
    const { section_1, section_2, section_3 } = req.body;
    const section = await Homepage.findByIdAndUpdate(
      id,
      {
        section_1,
        section_2,
        section_3,
      },
      { new: true }
    );
    res.status(200).json({ success: true, section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const homepageData = async (req, res, next) => {
  try {
    const url = req.headers.url.trim().split("/")[1];
    let user_id;
    let sections;
    if (url) {
      let user = await User.findOne({ sub_domain: url });
      if (!user) {
        res.status(404);
        return next({
          message: "data not found",
        });
      }
      user_id = user.id.valueOf();
      sections = await Homepage.findOne({ createdBy: user_id })
       .populate({
        path:"section_1.products section_2.products section_3.products"
       })
      if (!sections) {
        res.status(404);
        return next({
          message: "data not found",
        });
      }
      res.status(200).json({ success: true, sections });
    } else if (req.headers.user_id) {
      sections = await Homepage.findOne({ author: req.headers.user_id }).select(
        "-createdBy"
      );
      if (!sections) {
        const defaultSections = new Homepage({
          createdBy: req.headers.user_id,
        });
        sections = await defaultSections.save();
      }
      res.status(200).json({ success: true, sections });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  sectionData,
  updateSectionData,
  homepageData,
};
