const mongoose = require("mongoose");

const sectionDetailsSchema = new mongoose.Schema({
  section_1: {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  section_2: {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  section_2: {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_details",
  },
});

module.exports = mongoose.model("section_details", sectionDetailsSchema);
