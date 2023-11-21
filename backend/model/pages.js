const mongoose = require("mongoose")

const createPages = new mongoose.Schema({
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user_details"
    },
    feature_image:{
        type:String,
        default:"null"
    },
    link:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"published"
    },
    content:{
        type:String,
    },
    title:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model("Store_product",createPages)