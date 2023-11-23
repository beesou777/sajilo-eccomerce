const mongoose = require("mongoose")

const createCategory =new mongoose.Schema({
    user:{
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
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("Category",createCategory)


// category name
// slug
// image
// category id
// owner