const mongoose = require("mongoose")

const navbarSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user is required"]
    },
    logo:{
        type:String,
        required:[true,"logo is required"]
    },
    link1:{
        name:{
            type:String,
            default:"link1"
        },
        link:{
            type:String,
            default:"/"
        },
        status:{
            type:Boolean,
            default:true
        }

    },
    link2:{
        name:{
            type:String,
            default:"link2"
        },
        link:{
            type:String,
            default:"/"
        },
        status:{
            type:Boolean,
            default:true
        }

    },
    link3:{
        name:{
            type:String,
            default:"link3"
        },
        link:{
            type:String,
            default:"/"
        },
        status:{
            type:Boolean,
            default:true
        }

    },
    link4:{
        name:{
            type:String,
            default:"link4"
        },
        link:{
            type:String,
            default:"link4"
        },
        status:{
            type:Boolean,
            default:true
        }

    },
    link5:{
        name:{
            type:String,
            default:"link5"
        },
        link:{
            type:String,
            default:"link5"
        },
        status:{
            type:Boolean,
            default:true
        }

    }
})

const Navbar = mongoose.model("Navbar",navbarSchema)

module.exports = {
    Navbar
}