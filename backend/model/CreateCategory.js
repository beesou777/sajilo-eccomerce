const mongoose = require("mongoose")

const createCategory =new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user_details"
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    slug:{
        type:String
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("product_category",createCategory)


// category name
// slug
// image
// category id
// owner