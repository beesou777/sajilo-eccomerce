const express = require("express")
const router = express.Router()

const {getThemeSystem, createTheme} =require("../controller/themeSystem")
const {checkUserIdCookie}  = require("../middlewares/veryfyToken")
router.route("/create-theme").post(createTheme)
router.route("/get-theme").get(getThemeSystem)
// router.route("/update-user-details/:id").patch(checkUserIdCookie,editUserDetails)

module.exports = router