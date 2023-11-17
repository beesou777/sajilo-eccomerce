const express = require("express")
const router = express.Router()

const {createUser, getUser, editUserDetails} =require("../controller/userDetails")
const {checkUserIdCookie}  = require("../middlewares/veryfyToken")
router.route("/createUser").post(createUser)
router.route("/getUser/:id").get(checkUserIdCookie,getUser)
router.route("/update-user-details/:id").patch(checkUserIdCookie,editUserDetails)

module.exports = router