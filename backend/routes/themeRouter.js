const express = require("express")
const router = express.Router()

const {getThemeSystem, createTheme, updateTheme} =require("../controller/themeSystem")
// const {checkUserIdCookie}  = require("../middlewares/verifyToken")
router.route("/create-theme").post(createTheme)
router.route("/get-theme").get(getThemeSystem)

module.exports = router