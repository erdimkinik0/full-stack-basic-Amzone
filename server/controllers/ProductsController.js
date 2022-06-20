const Product = require("../models/Product");
const Company = require("../models/Company");
const User = require("../models/User");


const productCreateControllerPost = async (req,res) => {
    try{
        if (req.user.user.onType === "Company") {
            const newProduct = await Product.create({
                name:req.body.name,
                description:req.body.description,
                status:req.body.status,
                price:req.body.price,
                storage:req.body.storage,
                img:req.file.path,
                category:req.body.category
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


const productsIdGetController = async (req,res) => {  
    try {

        let id = req.params.id;
        const spesProd = await Product.findById(id);
        res.status(200).json(spesProd);

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const bestProductSellerGet = async (req,res) => {
    try{
        const best_products = await Product.find().sort({sold_count:-1}).limit(10);
        res.status(200).json(best_products)

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const deleteProductController = async (req,res) => {
    try{
        if (req.user.user.onType === "Company"){
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const companyId = user.acc_type._id;
            const company = await Company.findById(companyId).populate({path:"products",model:"Product"})
            
            for (let i = 0 ; i < company.products.length; i++){
                let productId = company.products[i]._id;
                if(productId == req.body.product_id){
                    await Product.deleteOne({_id:productId});
                    const newProdArr = company.products.filter((product) => {
                        return product._id !== productId;
                    })
                    company.products = newProdArr;
                    await company.save();
                }
            }
            
            res.status(200).json("product has been deleted succesfully");
        }

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const productCategoryController = async (req,res) => {
    try{
        let queries = JSON.stringify(req.query);
        let query = queries.slice(13,queries.length-2);
        const products = await Product.find({category:query});
        res.status(200).json(products);

    }catch(err){
        res.status(500).json({message:err.message})
    }
}




module.exports = {
    productCreateControllerPost,
    productControllerGet,
    productCreateControllerGet,
    productsPublicController,
    productsIdGetController,
    bestProductSellerGet,
    deleteProductController,
    productCategoryController
}