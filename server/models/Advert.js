const mongoose = require("mongoose");


const advertSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:128,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    created_date:{
        type:Date,
        default:new Date()
    }
})


module.exports = mongoose.model("Advert",advertSchema);