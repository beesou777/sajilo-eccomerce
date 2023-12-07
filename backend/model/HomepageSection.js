const mongoose = require("mongoose");

const sectionDetailsSchema = new mongoose.Schema({
  section_1: {
    name: {
      type: String,
      default:"section 1"
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status:{
      type:Boolean,
      required:[true,"required"]
    }
  },
  section_2: {
    name: {
      type: String,
      default:"section 2"
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status:{
      type:Boolean,
      required:[true,"required"]
    }
  },
  section_3: {
    name: {
      type: String,
      default: "section 3"
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status:{
      type:Boolean,
      required:[true,"required"]
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_details",
  },
});

module.exports = mongoose.model("Section_detail", sectionDetailsSchema);
