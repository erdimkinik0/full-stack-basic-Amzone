const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    costumer_name:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
        maxlength:512
    }
})

module.exports = mongoose.model("Comment",commentSchema)