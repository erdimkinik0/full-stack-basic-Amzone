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
        let company_name,company_id;
        const companies = await Company.find().populate({path:"products",model:"Product"});
        for(let x = 0 ; x < companies.length; x++){
            company_name = companies[x].company_name;
            company_id = companies[x]._id;
            let company = companies[x];
            for (let z = 0 ; z < company.products.length; z++){
                if (req.params.id == company.products[z]._id){
                    res.status(200).json({
                        company_id:company_id,
                        company_name:company_name,
                        _id:company.products[z]._id,
                        name:company.products[z].name,
                        description:company.products[z].description,
                        status:company.products[z].status,
                        comments:company.products[z].comments,
                        sold_count:company.products[z].sold_count,
                        price:company.products[z].price,
                        storage:company.products[z].storage,
                        img:company.products[z].img
                    })
                }
            }
        }

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

const bestEverProductSellerGet = async(req,res) => {
    try{
        const best_product = await Product.find().sort({sold_count:-1}).limit(1);
        res.status(200).json(best_product)

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

const getCategories = async(req,res) => {
    try{
        let dbCategory = []
        const products = await Product.find();
        for(let i = 0 ; i < products.length ; i++) {
            let productCategory = products[i].category;
            for(let x = 0 ; x < productCategory.length; x++){
                if(!dbCategory.includes(productCategory[x])){
                    dbCategory.push(productCategory[x]);
                }
            } 
        }
        console.log(dbCategory);
        res.json(dbCategory);

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const productsEditGetController = async (req,res) => {
    try{
        if(req.user.user.onType === "Company"){
            const id = req.params.id;
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const companyId = user.acc_type._id;
            const comp = await Company.findById(companyId).populate({path:"products",model:"Product"});
            const compProducts = comp.products;
            for (let x = 0 ; x< compProducts.length; x++) {
                let productId = compProducts[x]._id;
                if(productId == id){
                   const product = await Product.findById(productId);
                   res.status(200).json(product)
                }
            }
        }
        else {
            res.status(403).json({message:"You are not allowed"})
        }

    }
    catch(err){

    }
}

const productsEditPostController = async (req,res) => {
    try{
        const id = req.params.id;  
        if(req.user.user.onType === "Company"){
            const user = await User.findById(req.user.user._id).populate("acc_type");
            const compId = user.acc_type._id;
            const company = await Company.findById(compId).populate({path:"products",model:"Product"});
            const productsArr = company.products;
            for (let i = 0 ; i < productsArr.length; i++){
                let product_id = productsArr[i]._id;
                if(product_id == id){
                    const product = await Product.findById(product_id);
                    product.name = req.body.name;
                    product.description = req.body.description;
                    product.status = req.body.status;
                    product.price = req.body.price;
                    product.storage = req.body.storage;
                    await product.save();
                    res.status(202).json(product);
                }
            }
        }

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const commentPostController = async (req,res) => {
    try{
        const id = req.params.id
        if(req.user.user.onType === "Customer"){
            const user = await User.findById(req.user.user._id);
            const companies = await Company.find().populate({path:"products",model:"Product"});
            for(let x = 0; x < companies.length; x++) {
                let compId = companies[x]._id;
                const company = await Company.findById(compId).populate({path:"products",model:"Product"})
                for (let a = 0 ; a < company.products.length; a++){
                    let productId = company.products[a]._id;
                    if(productId == id){
                        const product = await Product.findById(productId);
                        product.comments.push({
                            username:user.username,
                            comment:req.body.comment,
                            date:new Date()
                        })
                        await product.save(); 
                        res.status(201).json(product);
                    } 
                } 
                
            }
           
        }

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
    productCategoryController,
    bestEverProductSellerGet,
    getCategories,
    productsEditGetController,
    productsEditPostController,
    commentPostController
}