const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    image: {
      type: String,
      required: [true, "image is required"],
      default:"https://www.pexels.com/photo/content-male-gardener-looking-at-ripening-coffee-berries-in-plantation-7125411/"
    },
    heading: {
      type: String,
      required: [true, "heading text is required"],
      default:"your title"
    },
    sub_title: {
      type: String,
      default:"your sub title"
    },
    button_text: {
      type: String,
      default:"create now"
    },
    button_link: {
      type: String,
      default:"facebook.com"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_details",
    }
  });
  
  module.exports = mongoose.model("Banner", bannerSchema);
  