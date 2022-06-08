const User = require("../models/User");
const Customer = require("../models/Customer")
const Product = require("../models/Product");
const Order = require("../models/Order");
const CartItem = require("../models/Cart-Item");
const Company = require("../models/Company");



const orderControllerCreatePost = async (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            const user = await User.findById(req.user.user._id).populate({path:"acc_type"});
            const custId = user.acc_type._id
            const customer = await Customer.findById(custId);
            ///////////

            let firstname,lastname,address_p,product_name,product_id,quan,product_price,total;    //
            firstname = customer.firstname; //
            lastname = customer.lastname;   //

            // #########################################

            const newOrder = await Order.create({
                to_country:req.body.to_country,
                to_city:req.body.to_city,
                to_street:req.body.to_street,
                cart:customer.cart
            })

            address_p = {
                to_country: newOrder.to_country,
                to_city:newOrder.to_city,
                to_street:newOrder.to_street,
                order_date:newOrder.order_date
            }


            

            let quantity = 0;
            let productId;
            const customerPro = await Customer.findById(custId).populate({path:"cart",model:"CartItem"});
            // console.log(customerPro)
            
            for(let i = 0 ; i < customerPro.cart.length ; i++) {
                productId = customerPro.cart[i].product;
                quantity = customerPro.cart[i].quantity;
                const product = await Product.findById(productId);
                product.sold_count += quantity;
                product.storage -= quantity;
                await product.save()
            }

//

            for(let i = 0; i < newOrder.cart.length; i++){
                let cartId = newOrder.cart[i]._id;
                const cartItem = await CartItem.findById(cartId).populate({path:"product",model:"Product"});
                let product_name = cartItem.product.name;
                let price = cartItem.product.price;
                let quantity = cartItem.quantity;
                let id = cartItem.product._id;
                let parsedOrder = {
                    id:id,
                    address:address_p,
                    name:product_name,
                    price:price,
                    quantity:quantity,
                    total: price * quantity

               }
               customer.orders.push(parsedOrder)
               await customer.save();
            }

            // saving order in Company DB
            quan = quantity;
            const companies = await Company.find();
            for(let i = 0 ; i < companies.length; i++) {
                let companyId = companies[i]._id;
                const company = await Company.findById(companyId)
                for (let m = 0; m < company.products.length ; m++){
                    let compProId = company.products[m]
                    // order item check
                    for(let n = 0; n < newOrder.cart.length; n++){
                        let cartId = newOrder.cart[n]._id;
                        const cartItem = await CartItem.findById(cartId).populate({path:"product",model:"Product"});
                        if(toString(compProId) === toString(cartItem.product._id)){
                            console.log(cartItem)
                            product_name = cartItem.product.name;
                            product_id = cartItem.product._id;
                            product_price = cartItem.product.price;
                            quan = cartItem.quantity;
                            total = quan * product_price
                            let order = {
                                firstname:firstname,
                                lastname:lastname,
                                address:address_p,
                                product_id:product_id,
                                product_name:product_name,
                                product_price:product_price,
                                quan:quan,
                                total:total
                            }
                            company.order_list.push(order);
                            company.sold += quan
                            await company.save();
                        }
                       
                    }
 
                }
                
            }

            for (let i = 0; i < customer.cart.length ; i++){
                const cartItemId = customer.cart[i];
                await CartItem.deleteMany({_id:cartItemId});
            }

            customer.cart = []
            await customer.save();

            res.status(201).json(newOrder)

        }
        else {
            res.status(403).json({message:"You are not a Customer!"})
        }

    }catch(err){
        res.status(400).json({message:err.message})
    }
}
const orderControllerCreateGet = (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            res.status(200).json(req.user.user);
        }
        else {
            res.status(403).json({message:"You are not a Customer!"})
        }

    }catch(err){
        res.status(400).json({message:err.message});
    }
}
const orderControllerGet = async (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const customerId = user.acc_type._id;
            const customer = await Customer.findById(customerId);
            res.status(200).json(customer.orders);
        }
        else {
            res.status(403).json({message:"You are not a Customer!"})
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}


// order list for company

const orderListControllerGet = async (req,res) => {
    try{
        if(req.user.user.onType === "Company"){
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const companyId = user.acc_type._id;
            const company = await Company.findById(companyId)
            res.status(200).json(company.order_list);
        }
        else{
            res.status(403).json({message:"You are not a Company!"});
        }

    }catch(err){
        res.status(500).json({message:err.message});
    }
}
module.exports = {orderControllerCreateGet,orderControllerGet,orderControllerCreatePost,orderListControllerGet}