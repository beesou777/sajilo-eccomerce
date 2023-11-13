const express = require("express")
const router = express.Router()

const {sectionData, homepageData} =require("../controller/HomepageSection")
// const {createcarousel,editCarousel } =require("../controller/HomePageCarousel")
const {createBanner,editBanner, getBanner } =require("../controller/HomepageBanner")
const {checkUserIdCookie}  = require("../middlewares/veryfyToken")

// carousel
// router.route("/carousel-section").post(createcarousel)
// router.route("/edit-carousel/:id").patch(editCarousel)

// banner
router.route("/homepage-banner").post(createBanner).get(getBanner)
router.route("/homepage-banner/:id").patch(editBanner)

// section
router.route("/homepage-section").post(sectionData)
router.route("/homepage-data").get(homepageData)
// router.route("/getUser/:id").get(checkUserIdCookie,getUser)

module.exports = router