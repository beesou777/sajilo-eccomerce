const mongoose = require("mongoose");

const NavbarSchema = new mongoose({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user is required"],
  },
  name: {
    type: String,
    required: [true, "Navbar name is required"],
  },
  link: {
    type: String,
    required: [true, "link is required"],
  },
});

const Navbar = mongoose.model("Navbar", NavbarSchema);

module.exports = Navbar;
