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
        let username,advert_id,title,content,category,created_date

        let advertsArr = [];
        const users = await User.find({onType:"Customer"}).populate("acc_type");
        for(let i = 0 ; i < users.length; i++) {
            username = users[i].username;
            let customerID = users[i].acc_type._id;
            const customer = await Customer.findById(customerID).populate({path:"adverts",module:"Advert"});
            for(let k = 0 ; k < customer.adverts.length ; k++){
                advert_id = customer.adverts[k]._id.toString();
                title = customer.adverts[k].title;
                content = customer.adverts[k].content;
                category = customer.adverts[k].category;
                created_date = customer.adverts[k].created_date
                advertsArr.push({
                    username:username,
                    advert_id:advert_id,
                    title:title,
                    content:content,
                    category:category,
                    created_date:created_date,
                })
            }
        }
        //console.log(advertsArr)
        res.status(200).json(advertsArr)

    }catch(err){
        res.status(500).json({message:err.message})
    }
} 

const deleteAdvertController = async(req,res) => {
    try{
        const userId = req.user.user._id;
        const user = await User.findById(userId).populate("acc_type");
        const customerId = user.acc_type._id;
        const customer = await Customer.findById(customerId).populate({path:"adverts",model:"Advert"})
        for(let i = 0; i < customer.adverts.length; i++){
            let advertID = customer.adverts[i]._id;
            if(advertID == req.body.advert_id){
                await Advert.deleteOne({_id:advertID});
                const n_arr = customer.adverts.filter((advert) => {
                    return advert._id !== advertID;
                })
                customer.adverts = n_arr;
                console.log(n_arr)
                await customer.save();
            }
        }
        
        res.status(200).json({message:"Advert has been deleted"})
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

module.exports = {advertsCreateControllerPost,advertsCreateControllerGet,advertsControllerGet,advertsPublicController,deleteAdvertController}