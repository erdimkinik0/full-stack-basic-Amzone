const express = require("express");
const router = express.Router();

// dummy
const User = require("../models/User");

const registerController = require("../controllers/RegisterController");


router.post("/company",registerController.registerCompanyControllerPost);
router.post("/customer",registerController.registerCustomerControllerPost);





// ###################################################                        ###############################################
// ###################################################  TESTING DB BEFORE APP ###############################################
// ###################################################                        ###############################################

// CREATING A PRODUCT WITH DUMMY PATH
// const Product = require("../models/Product");
// const Company = require("../models/Company");


// router.post("/dummy", async (req,res) => {
//     try{
//         const newProduct = await Product.create({

//             name: req.body.name,
//             description: req.body.description,
//             status: req.body.status,
//             quantity: req.body.quantity
//         })
//         console.log(newProduct)
//         const dbUser = await User.findOne({email:"erdalkinikk@gmail.com"}).populate("acc_type");
//         const id = dbUser.acc_type._id;
//         console.log(id);
//         const comp = await Company.findById(id)
//         comp.products.push(newProduct);
//         await comp.save();
//         res.json(comp);
//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// })
// router.get("/dummy",async (req,res) => {
//     try{
//         const dbUser = await User.findOne({email:"erdalkinikk@gmail.com"}).populate("acc_type");
//         const comp = dbUser.acc_type._id;
//         const compProducts = await Company.findById(comp).populate({path:"products",model:"Product"});
//         console.log(compProducts)
//         res.json(compProducts)
//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// })



// ################################################## CREATING A CUSTOMER USER ##############################################
// router.get("/dummy", async (req,res) => {
//     try{
//         const dbCust = await User.findOne({email:"erdalkinik@hotmail.com"}).populate("acc_type");
//         console.log(dbCust);
//         res.json(dbCust);


//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// })


// ################################################## CREATING A COMPANY USER ##################################################
// router.get("/dummy",async (req,res) => {
//     try{
//         const getfullUser = await User.findOne({email:"erdalkinikk@gmail.com"}).populate("acc_type");
//         console.log(getfullUser);
//         res.json(getfullUser);

//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// })

module.exports = router;