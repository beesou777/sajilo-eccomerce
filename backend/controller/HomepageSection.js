const Homepage = require("../model/HomepageSection")
const Banner = require("../model/HomepageBanner")
const Category = require("../model/CreateCategory")
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


const sectionData = async (req, res) => {
    try {

        const section_1 = {}
        for(const key in req.body){
          if(key.startsWith('section_1[')){
            const sectionField = key.split('[')[1].split(']')[0];
            section_1[sectionField] = req.body[key];
          }
        } 
        console.log(section_1)
        // const products = Object.keys(req.body)
        // .filter(key => key.startsWith('products['))
        // .map(key => req.body[key]);
        // const carouselImages = new Homepage({
        //     author:req.headers.user_id,
        //     name,
        //     products
           
        // })
        // await carouselImages.save()
        // res.status(200).json({success:true,carouselImages})
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const homepageData = async (req, res) => {
    try {
        const homepageCarousel = await Carousel.find({author:req.headers.user_id}).select("-author")
        const homepageBanner = await Banner.findOne({author:req.headers.user_id}).select("-author")
        const sections = await Homepage.find({ author: req.headers.user_id })
        .populate({
            path: 'products',
            select:"-user -product_category"
        })
        if(!homepageCarousel || !homepageBanner || !sections){
          return res.status(404).json({message:"not found"})
        }
        res.status(200).json({success:true,homepageBanner,homepageCarousel,sections})
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
    sectionData,
    homepageData

}