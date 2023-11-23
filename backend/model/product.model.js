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
        type:Number,
        required:[true,"selling price is required"]
    },
    actual_price:{
        type:Number,
        required:[true,"actual price is required"]
    },
    quantity:{
        type:Number,
        required:[true,"quantity is required"]
    },
    product_sku:{
        type:String
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    product_images:{
        type:Array,
    },
    product_category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Product",createProduct)