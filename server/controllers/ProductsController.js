const Product = require("../models/Product");
const Company = require("../models/Company");
const User = require("../models/User");


const productCreateControllerPost = async (req,res) => {
    try{
        if (req.user.user.onType === "Company") {
            console.log(req.file)
            const newProduct = await Product.create({
                name:req.body.name,
                description:req.body.description,
                status:req.body.status,
                price:req.body.price,
                storage:req.body.storage,
                img:req.file.path
            })
            
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const compId = user.acc_type._id;
            const company = await Company.findById(compId);
            company.products.push(newProduct);
            await company.save();
            res.status(201).json(newProduct); 
        }
        else {
            res.status(403).json({message:"You are not a company! You are not allowed to reach this process"})
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const productCreateControllerGet = (req,res) => {
    if (req.user.user.onType === "Company"){
        res.status(200).json(req.user.user)
    }
    else {
        res.status(400).json({message:"You are not a company! You are not allowed to reach this process"});
    }
}
const productControllerGet = async (req,res) => {
    try{
        if(req.user.user.onType === "Company"){
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const companyId = user.acc_type._id;
            const company = await Company.findById(companyId).populate({path:"products",model:"Product"});
            res.json(company.products);
        }
        else {
            return res.status(403).json({message:"You are not a company! You are not allowed to reach this process"})
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const productsPublicController = async (req,res) => {
    try{
        const all_products = await Product.find();
        res.status(200).json(all_products)

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports = {productCreateControllerPost,productControllerGet,productCreateControllerGet,productsPublicController}