const express = require("express");
const router = express.Router();
const AdvertsControllers = require("../controllers/AdvertsController");
const jwt = require("jsonwebtoken")

router.post("/list/create",authorizatedToken,AdvertsControllers.advertsCreateControllerPost);
router.get("/list/create",authorizatedToken,AdvertsControllers.advertsCreateControllerGet);
router.get("/list",authorizatedToken,AdvertsControllers.advertsControllerGet);
router.get("/",AdvertsControllers.advertsPublicController);
router.delete("/delete",authorizatedToken,AdvertsControllers.deleteAdvertController);


async function  authorizatedToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(bearerHeader === "undefined" || bearerHeader === null){
        res.status(404).json({message:"There is no authorization header"})
    }
    const token = bearerHeader.split(" ")[1];
    if(token === null || token === "undefined"){
        res.status(404).json({message:"There is no token"})
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err){
            res.status(403).json({message:err.message})
        }
        req.user = user;
        next();
    })

}

module.exports = router;

