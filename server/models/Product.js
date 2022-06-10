const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        maxlength:128,
        required:true
    },

    description:{
        type:String,
        maxlength:2048,
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
        required:true
    }
})


module.exports = mongoose.model("Product",productSchema);