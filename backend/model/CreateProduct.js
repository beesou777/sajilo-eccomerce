const mongoose = require("mongoose")
const {CreateCategory} = require("./CreateCategory")

const createProduct =new  mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    product_name:{
        type:String,
        required:true
    },
    product_description:{
        type:String,
        required:[true,"product description is required"]
    },
    selling_price:{
        type:String
    },
    actual_price:{
        type:String,
        required:true
    },
    quantity:{
        type:String
    },
    product_sku:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    product_images:{
        type:String,
    },
    product_category:{
        type:[CreateCategory],
    }
})

module.exports = mongoose.model("products",createProduct)