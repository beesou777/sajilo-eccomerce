const mongoose = require("mongoose")

const homepageBanner =new mongoose.Schema({
    author:{
        type:mongoose.Schema.ObjectId,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:[true,"image is required"]
    },
    heading:{
        type:String,
        required:[true,"heading text is required"]
    },
    smallText:{
        type:String,
    },
    buttonText:{
        type:String,
    },
    buttonLink:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("homepage_banner",homepageBanner)
