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
    password:{
        type:String,
        required:true,

    },
    onType:{
        type:String,
        required:true,
        enum:["Company","Customer"]
    },
    acc_type:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        refPath:"onType"
        
    }
})

module.exports = mongoose.model("User",userSchema);