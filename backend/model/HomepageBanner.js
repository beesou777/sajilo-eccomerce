const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    image: {
      type: String,
      required: [true, "image is required"],
      default:"https://images.pexels.com/photos/7125411/pexels-photo-7125411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
  