const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        maxlength:128,
        
    },

    description:{
        type:String,
        maxlength:1024,
    },
    status:{
        type:String,
        enum:["New","Slightly Used","well-worn"]
    },
    comments:[],
    sold_count:Number,
    price:Number,
    quantity:Number
})


module.exports = mongoose.model("Product",productSchema);