const mongoose = require('mongoose')

const userDetails = new mongoose.Schema({
    user_id:{
        type:String,
        unique:true
    },
    store_name:{
        type:String,
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String
    },
    email:{
        type:String
    }
})

module.exports = mongoose.model("user_details",userDetails)