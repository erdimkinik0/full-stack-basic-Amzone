const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        maxlength:24,
        lowercase:true,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        maxlength:100,
        required:true
    },
    passowrd:{
        type:String,
        required:true,

    },
    acc_type:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
    }
})

module.exports = mongoose.model("User",userSchema);