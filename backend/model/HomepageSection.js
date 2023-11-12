const mongoose = require("mongoose")



const sectionFeild =new mongoose.Schema({
    author:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    name:{
        type:String,
        required:[true,"name is required"]
    },
    products: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        }],
    },
})

module.exports = mongoose.model("section_data",sectionFeild)