const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


router.get("/all",async (req,res) => {
    try{
        const products = await Product.find();
        res.json(products);

    }catch(err){
        res.status(400).json({message:err.message})
    }
})




module.exports = router;