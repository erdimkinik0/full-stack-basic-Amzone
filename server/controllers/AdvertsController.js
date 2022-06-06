const Advert = require("../models/Advert");
const User = require("../models/User");
const Customer = require("../models/Customer");

const advertsControllerPost = async (req,res) => {
    try{
        if (req.user.user.onType === "Customer"){
            const newAdvert = await Advert.create({
                title:req.body.title,
                content:req.body.content,
                category:req.body.category,
            })
            const user = await User.findOne({email:req.user.user.email}).populate("acc_type")
            const custId = user.acc_type._id;
            const customer = await Customer.findById(custId);
            customer.adverts.push(newAdvert);
            await customer.save();
            res.status(201).json(newAdvert)
        }
        else {
            res.status(403).json({message:"You are not a customer! You are not allowed to reach this process"})
        }
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}
const advertsControllerGet = (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            // will be responsed user's adverts
            res.status(200).json(req.user.user);
            
        }
        else {
            res.status(403).json({message:"You are not a customer! You are not allowed to reach this process"})
        }
       
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports = {advertsControllerPost,advertsControllerGet}