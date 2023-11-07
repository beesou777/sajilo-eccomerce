const mongoose = require("mongoose")

const createCategory =new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    category_name:{
        type:String,
        required:true
    },
    category_images:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("product_category",createCategory)