const mongoose = require("mongoose");

const createThemeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_details",
  },
  sub_domain: {
    type: String,
    required: [true, "sub domain is required"],
  },
  banner: {
    image: {
      type: String,
      // required: [true, "image is required"],
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
  },
  section_details: [
    {
      name: {
        type: String,
        required: [true, "name is required"],
      },
      products: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
        ],
      },
    },
  ],
});

module.exports = mongoose.model("themes_data", createThemeSchema);
