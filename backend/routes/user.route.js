const express = require("express");
const router = express.Router();

const { Register, getUser, Login } = require("../controller/user.controller");
// const { checkUserIdCookie } = require("../middlewares/verifyToken");

router.route("/users/register").post(Register);

router.route("/users/login").post(Login);

router.route("/users/:id").get(getUser);

module.exports = router; 