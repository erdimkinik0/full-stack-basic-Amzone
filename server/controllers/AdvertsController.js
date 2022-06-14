const Advert = require("../models/Advert");
const User = require("../models/User");
const Customer = require("../models/Customer");

const advertsCreateControllerPost = async (req,res) => {
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

const advertsCreateControllerGet = (req,res) => {

    if (req.user.user.onType === "Customer"){
        res.status(200).json(req.user.user);
    }
    else {
        res.status(400).json({message:"You are not a customer! You are not allowed to reach this process"})
    }
}

const advertsControllerGet = async (req,res) => {
    try{
        if(req.user.user.onType === "Customer"){
            // will be responsed user's adverts
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const custId = user.acc_type._id;
            const customer = await Customer.findById(custId).populate({path:"adverts",model:"Advert"});
            let adverts = customer.adverts;
            res.status(200).json(adverts)
            
        }
        else {
            res.status(403).json({message:"You are not a customer! You are not allowed to reach this process"})
        }
       
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const advertsPublicController = async(req,res) => {
    try{
        const all_adverts = await Advert.find();
        res.status(200).json(all_adverts);

    }catch(err){
        res.status(500).json({message:err.message})
    }
} 

module.exports = {advertsCreateControllerPost,advertsCreateControllerGet,advertsControllerGet,advertsPublicController}