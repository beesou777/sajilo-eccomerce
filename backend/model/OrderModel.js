const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orderItems:[{
       quantity:{type:String,required:[true,"quantity is required"]},
       product:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"product is required"],
        ref:"Product"
       }
    }],
    shippingAddress:{
        address:{
            type:String,
            required:[true,"shipping address is true"],
        },
        city:{
            type:String,
            required:[true,"city is true"],
        },
        city:{
            type:String,
            required:[true,"city is true"],
        },
        postalCode: {
            type: String,
            required: [true,"Postal code is required"],
          },
          country: {
            type: String,
            required: [true,"Country is required"],
          },

    },
    paymentMethod:{
        type:String,
        required:true,
        enum:"COD",
        default:"COD"
    },
    paymentResult:{
        type:String,
        enum:['Paid','Unpaid'],
        default:"Unpaid"
    },
    totalPrice:{
        type:Number,
        required:[true,'Total price i required']
    },
    discountPercent:{
        type:Number,
        required:[true,"discount percent is required"],
        default:0.0
    },
    taxPrice:{
        type: Number,
      required: [true,"tax price is required"],
      default: 0.0,
    },
    finalPrice:{
        type:Number,
        required:[true,"Final Price is required"]
    },
    paidAt:{
        type:Date
    },
    deliveredAt:{
        type:Date
    }

},{timestamps:true})

module.exports = mongoose.model("Order",OrderSchema)