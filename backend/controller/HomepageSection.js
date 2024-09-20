const Homepage = require("../model/HomepageSection");
// const Banner = require("../model/HomepageBanner");
// const User = require("../model/user.model");
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

async function homepageData(req, res, next) {
  try {
    const userId = req.headers.user_id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    let sections = await Homepage.findOne({ author: userId })
      .populate({
        path: 'products',
        select: "-user -product_category"
      });

    if (!sections) {
      // Create a default homepage sections if none exists
      const defaultSections = new Homepage({ createdBy: userId });
      sections = await defaultSections.save();
    }

    res.status(200).json({ success: true, sections });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function updateSectionData(req, res) {
  try {
    const { id } = req.params;
    const { section_1, section_2, section_3 } = req.body;
    const data = await Homepage.findByIdAndUpdate(
      id,
      {
        section_1,
        section_2,
        section_3,
      },
      { new: true }
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  sectionData,
  updateSectionData,
  homepageData,
};
