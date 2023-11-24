const express = require("express");
const router = express.Router();

const { Register, getUser, Login } = require("../controller/user.controller");
const { protect } = require("../middlewares/verifyToken");


router.route("/users/register").post(Register);
router.route("/admin/register").post(Register)
router.route("/customer/register").post(Register)

router.route("/users/login").post(Login);

router.route("/users").get(protect,getUser)

module.exports = router; 