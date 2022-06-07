const mongoose = require("mongoose");


const cartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true
    }

})


module.exports = mongoose.model("CartItem",cartItemSchema);