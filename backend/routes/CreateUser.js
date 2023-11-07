const express = require("express")
const router = express.Router()

const {createUser, getUser} =require("../controller/userDetails")
const {checkUserIdCookie}  = require("../middlewares/veryfyToken")
router.route("/createUser").post(createUser)
router.route("/getUser/:id").get(checkUserIdCookie,getUser)

module.exports = router