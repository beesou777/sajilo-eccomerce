const Homepage = require("../model/HomepageSection")
const Banner = require("../model/HomepageBanner")
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const sectionData = async (req, res) => {
    try {
        const {section_1,section_2,section_3} = req.body
        const data = new Homepage({
            createdBy:req.headers.user_id,
            section_1,
            section_2,
            section_3
        })
        await data.save()
        res.status(200).json({success:true,data})
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const homepageData = async (req, res) => {
    try {
      const url = req.headers.url
      console.log(url)
        let sections = await Homepage.findOne({ author: req.headers.user_id })
        .populate({
            path: 'products',
            select:"-user -product_category"
        })
        if(!sections){
          const defaultSections = new Homepage({
            createdBy: req.headers.user_id,
          });
          sections = await defaultSections.save();
        }
        res.status(200).json({success:true,sections})
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
    sectionData,
    homepageData

}