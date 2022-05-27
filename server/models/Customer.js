const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        maxlength:64
    },
    lastname:{
        type:String,
        required:true,
        maxlength:64
    },
    orders:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Order"
        }
    ],
    address:{
        country:{
            type:String,
            required:true,
            maxlength:32
        },
        city:{
            type:String,
            required:true,
            maxlength:32
        },
        street:{
            type:String,
            required:true,
            maxlength:128,
        },
        zip:{
            type:Number,
            required:true,
            maxlength:16
        }
       
    },
    adverts:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"Advert"
        }
    ],
    cart:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Cart"
    }
})

module.exports = mongoose.model("Customer",customerSchema);