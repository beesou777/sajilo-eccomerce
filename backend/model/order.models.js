const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"user is required"]
    },
    orderItems:[{
       quantity:{type:String,required:[true,"quantity is required"]},
       product:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"product is required"],
        ref:"Product"
       },
    }],
    customer_details:{
        address:{
            type:String,
            required:[true,"shipping address is required"],
        },
        city:{
            type:String,
            required:[true,"city is required"],
        },
        tole:{
            type:String,
            required:[true,"tole is required"],
        },
        country: {
            type: String,
            required: [true,"Country is required"],
        },
        name:{
            type:String,
            required:[true,"name is required"]
        },
        email:{
            type:String,
            required:[true,"email is required"]
        },
        phone:{
            type:Number,
            required:[true,"phone number is required"]
        }
    },
    payment_method:{
        type:String,
        required:true,
        enum:"COD",
        default:"COD"
    },
    payment_status:{
        type:String,
        enum:['Paid','Unpaid'],
        default:"Unpaid"
    },
    total_price:{
        type:Number,
        required:[true,'Total price i required']
    },
    discount_amount:{
        type:Number,
        default:0.0
    },
    tax_price:{
        type: Number,
      required: [true,"tax price is required"],
      default: 0.0,
    },
    final_price:{
        type:Number,
        required:[true,"Final Price is required"]
    },
    order_status:{
        type:String,
        enum:['Pending','Delivered','Draft','Cancelled','Returned'],
        default:'Pending',
        required:[true,"required"]
    },
    deliveredAt:{
        type:Date
    }
},{timestamps:true})

module.exports = mongoose.model("Order",OrderSchema)