const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    to_country:{
        type:String,
        required:true,
        maxlength:64,
    },
    to_city:{
        type:String,
        required:true,
        maxlength:64
    },
    to_street:{
        type:String,
        required:true,
        maxlength:64
    },
    order_date:{
        type:Date,
        default: Date.now()
    },
    cart:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Cart"
    }
    
})

module.exports = mongoose.model("Order",orderSchema);