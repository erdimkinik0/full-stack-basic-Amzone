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
                console.log(cartItem)
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



const getCartController = async (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            console.log(req.user.user);
            const custId = req.user.user.acc_type;
            const customer = await Customer.findById(custId);

            res.status(200).json(customer.cart)

        }
        else {
            res.status(403).json({message:"This is not authorizated"})
        }


    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const cartDeleteController = async (req,res) => {
    try{
        const userID = req.user.user._id;
        const user = await User.findById(userID).populate("acc_type");
        const custId = user.acc_type._id;
        const customer = await Customer.findById(custId).populate("cart");
        for(let i = 0 ; i < customer.cart.length ; i++){
            let productId = customer.cart[i].product;
            let cartId = customer.cart[i]._id
            if(productId == req.body.product_id){
                await CartItem.deleteOne({_id:cartId});
                const newArr = customer.cart.filter((item) => {
                    return item._id !== cartId
                })
                console.log(newArr)
                customer.cart = newArr;
                await customer.save();
            }
        }
        res.status(200).json({message:"cart has been deleted"})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports = {cartControllerPost,cartControllerGet,getCartController,cartDeleteController}