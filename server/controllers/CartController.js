const Product = require("../models/Product");
const Customer = require("../models/Customer");
const User = require("../models/User");
const CartItem = require("../models/Cart-Item");

const cartControllerPost = async (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            const user = await User.findById(req.user.user._id).populate({path:"acc_type"});
            const custId = user.acc_type._id;
            const customer = await Customer.findById(custId).populate({path:"cart",model:"CartItem"});
            // creating a new cart item
            const newCartItem = await CartItem.create({
                product:req.body.product_id,
                quantity:req.body.quantity
            })
            customer.cart.push(newCartItem);
            await customer.save();
            res.json(customer)

        }
        else {
            res.status(400).json({message:"You are not a customer!"})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}
const cartControllerGet = async (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            const user = await User.findById(req.user.user._id).populate({path:"acc_type"});
            const custId = user.acc_type._id;
            const customer = await Customer.findById(custId).populate({path:"cart",model:"CartItem"});
            const cartArr = []

            for (let i = 0 ; i < customer.cart.length ; i++) {
                const cartProductsIds = customer.cart[i]._id;
                const quan = customer.cart[i].quantity;
                const cartItem = await CartItem.findById(cartProductsIds).populate({path:"product",model:"Product"})
                let objQuan = {
                    product:cartItem.product,
                    quantity:quan
                }
                cartArr.push(objQuan);
            }
            res.json(cartArr)
        } 
        else {
            res.status(400).json({message:"You are not a Customer!"})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

module.exports = {cartControllerPost,cartControllerGet}