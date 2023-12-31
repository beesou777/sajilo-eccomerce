const express = require("express")
const router = express.Router()

const {sectionData, homepageData, updateSectionData} =require("../controller/HomepageSection")
const {createBanner,editBanner, getBanner } =require("../controller/HomepageBanner")
// const {checkUserIdCookie}  = require("../middlewares/verifyToken")

// banner
router.route("/homepage-banner").post(createBanner).get(getBanner)
router.route("/homepage-banner/:id").patch(editBanner)

// section
router.route("/homepage-section").get(homepageData)
router.route("/homepage-section/:id").patch(updateSectionData)


module.exports = router