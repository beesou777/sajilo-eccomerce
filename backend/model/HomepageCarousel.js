const mongoose = require("mongoose")

const carouselSection = new mongoose.Schema({
    author:{
        type:mongoose.Schema.ObjectId,
        required:true
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
        default:false
    }
})

module.exports = mongoose.model("carousel_section",carouselSection)
