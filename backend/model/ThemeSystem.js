const mongoose = require("mongoose")


const themeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_details",
  },
  sub_domain: {
    type: String,
    required: [true, "sub domain is required"],
  },
  banner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "banners",
  },
  section_details:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section_details",
    },
});

module.exports = mongoose.model("Theme_data", themeSchema);
