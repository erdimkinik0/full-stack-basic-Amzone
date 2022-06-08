const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    company_name:{
        type:String,
        required:true,
        maxlength:100,
    },
    // established_date:{
    //     type:Date,
    //     required:true,
    // },
    products:[mongoose.SchemaTypes.ObjectId],
    address:{
        country:{
            type:String,
            required:true,
            maxlength:64
        },
        city:{
            type:String,
            required:true,
            maxlength:64
        },
        street:{
            type:String,
            required:true,
            maxlength:128
        },
        zip:{
            type:String,
            required:true,
            maxlength:16
        },
       
    },
    order_list:[],
    sold:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("Company",companySchema);