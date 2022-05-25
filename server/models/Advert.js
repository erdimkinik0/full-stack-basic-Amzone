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
    }
})


module.exports = mongoose.model("Advert",advertSchema);