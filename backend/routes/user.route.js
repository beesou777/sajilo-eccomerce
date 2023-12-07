const express = require("express");
const router = express.Router();

const { Register, getUser, Login, updateUserDetails, updatePassword } = require("../controller/user.controller");
const { protect,isAdmin } = require("../middlewares/auth.middleware");

router.route("/users/register").post(Register);
router.route("/admin/register").post(Register)
router.route("/customer/register").post(Register)

router.route("/users/login").post(Login);

router.route("/users").get(protect,isAdmin,getUser).patch(protect,isAdmin,updateUserDetails)

router.route("/users/update/password").patch(protect,isAdmin,updatePassword)

module.exports = router; 