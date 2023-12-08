const Navbar = require("../model/navbar.models");
const User = require("../model/user.model");

const getNavbar = async (req, res, next) => {
  try {
    const id = req.headers.user_id;
    let url;
    let navbar;
    if (req.headers.url !== (null || undefined)) {
      url = req.headers.url.trim().split("/")[1];
    }
    if (url !== undefined || null) {
      let user = await User.findOne({ sub_domain: url });
      if (!user) {
        res.status(404);
        return next({
          message: "data not found",
        });
      }
      user_id = user.id.valueOf();
      navbar = await Navbar.findOne({ user: user_id });
    } else {
      if (!id) {
        res.status(404);
        return next({
          message: "id not found ",
        });
      }
      navbar = await Navbar.findOne({ user: id });
      if (!navbar) {
        const defaultNavbar = new Navbar({
          user: id,
        });
        banner = await defaultNavbar.save();
      }
    }
    res.status(200).json({ success: true, navbar });
  } catch (error) {
    next({
      message: "internal server error",
    });
  }
};

const updateNavbar = (req, res, next) => {
  try {
  } catch (error) {
    next({
      message: "internal server error",
    });
  }
};

module.exports = {
  updateNavbar,
  getNavbar,
};
