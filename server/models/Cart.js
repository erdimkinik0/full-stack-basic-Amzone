const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    products:[mongoose.SchemaTypes.ObjectId]
})



module.exports = mongoose.model("Cart",cartSchema);