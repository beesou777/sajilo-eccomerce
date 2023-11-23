const mongoose = require("mongoose")

const connect = (uri) =>{
    // console.log('connected to mongodb')
    return mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        socketTimeoutMS:30000
    })
}

module.exports = {
    connect
}