const mongoose = require("mongoose")

const createProduct =new  mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_details",
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
        type:Array,
    },
    product_category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product_category"
    }
},{
    timestamps:true
})
module.exports = mongoose.model("products",createProduct)