const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        maxlength:128,
        required:true
    },

    description:{
        type:String,
        maxlength:4096,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["New","Slightly Used","well-worn"]
    },
    comments:[],
    sold_count:{
        type:Number,
        default:0,
    },
    old_price:{
        type:Number,
    },
    discount: {
        type:Number,
    },
    price:{
        type:Number,
        required:true
    },
    storage:{
        type:Number,
        required:true
    },
    img:{
        type:String,
    },
    category:[{
        type:String,
        lowercase:true,
    }]
})


module.exports = mongoose.model("Product",productSchema);