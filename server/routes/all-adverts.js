const express = require("express");
const router = express.Router();

const Advert = require("../models/Advert");

router.get("/",async (req,res) => {
    try{
        const adverts = await Advert.find();
        res.status(200).json(adverts);

    }catch(err){
        res.status(400).json({message:err.message});
    }
})



module.exports = router;