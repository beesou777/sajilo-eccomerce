const User = require("../model/user.model");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dasuhyei1",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const accessToken = (user_id) => {
  return jwt.sign({ sub: user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

const Register = async (req, res) => {
  try {
    const {
      store_name,
      email,
      first_name,
      last_name,
      password,
      phone_number,
      username,
    } = req.body;
    if (
      !email ||
      !store_name ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !password ||
      !username
    ) {
      return next({
        message: "please fill all field all are required",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const exiting_user = await User.findOne({ email });
    const exiting_user_username = await User.findOne({ username });

    if (exiting_user) {
      return next({
        message: "User already exist on this email please provide another one",
      });
    }

    let roles;
    if (req.route.path == "/customer/register") {
      roles = "customer";
    } else if (req.route.path == "/admin/register") {
      roles = "admin";
    } else {
      roles = "user";
    }
    if (exiting_user_username) {
      return next({
        message:
          "User already exist with this username please provide another username",
      });
    }

    const register_user = new User({
      store_name,
      email,
      first_name,
      last_name,
      profile_picture:
        "https://res.cloudinary.com/dasuhyei1/image/upload/v1700654628/ueser_profile.png",
      phone_number,
      sub_domain: username,
      role: roles,
      password: hash_password,
      username,
    });

    await register_user.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    next({
      message: "Internal server Error",
    });
  }
};

const Login = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        message: "Please provide correct email and password",
      });
    }

    const user = await User.findOne({ email });

    const match_password = await bcrypt.compare(password, user.password);

    if (!match_password) {
      return next({
        message: "User password does not match",
      });
    }
    const access_token = accessToken(user._id);
    res.cookie("token", access_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    const uuid = user._id;

    res.status(200).json({ success: true, access_token, uuid });
  } catch (error) {
    next({
      message: "Internal server Error",
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user_id = req.headers.user_id;
    try {
      const user_details = await User.findById({ _id: user_id }).select(
        "-password"
      );
      res.status(200).json({ success: true, user_details });
    } catch (error) {
      res.status(404);
      return next({
        message: "user not found",
      });
    }
  } catch (error) {
    return next({
      message: "internal server error",
    });
  }
};

const updateUserDetails = async (req, res,next) => {
  try {
    const id = req.headers.user_id;
    const { store_name, first_name, last_name } = req.body;
    const user_details = await User.findByIdAndUpdate(
      id,
      {
        store_name,
        first_name,
        last_name,
      },
      { new: true }
    ).select("-password")
    if (!user_details) {
      res.status(404);
      return next({
        message: "Failed to update user details",
      });
    }
    res.status(200).json({ success: true, user_details });
  } catch (error) {
    next({
      message: "Internal server error",
    });
  }
};

const updatePassword = async (req, res,next) => {
  try {
    const id = req.headers.user_id;
    const { current_password, new_password, confirm_password } = req.body;
    const user = await User.findById({ _id: id });
    const match_password = await bcrypt.compare(
      current_password,
      user.password
    );

    if (!match_password) {
      res.status(404)
      return next({
        message:"unable to change password please try again"
      })
    }

    if(new_password !== confirm_password){
      res.status(400)
      return next({
        message:"password does not matched "
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(new_password, salt);
    await User.findByIdAndUpdate(
      { _id: id },
      { password: hash_password },
      { new: true }
    )
    res.status(200).json({success:true,message:"password successfully updated!!!!!"})
  } catch (error) {
    return next({
      message: "Internal server error",
    });
  }
};

module.exports = {
  Register,
  getUser,
  Login,
  updateUserDetails,
  updatePassword,
};