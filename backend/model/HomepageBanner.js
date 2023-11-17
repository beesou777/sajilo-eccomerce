const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    image: {
      type: String,
      required: [true, "image is required"],
    },
    heading: {
      type: String,
      required: [true, "heading text is required"],
    },
    sub_title: {
      type: String,
    },
    button_text: {
      type: String,
    },
    button_link: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_details",
    }
  });
  
  module.exports = mongoose.model("banners", bannerSchema);
  