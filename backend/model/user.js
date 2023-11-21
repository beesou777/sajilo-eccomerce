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
    },
    sub_domain:{
        type:String,
        unique:true
    }
})

module.exports = mongoose.model("User",userDetails)