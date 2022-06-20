const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const ProductsController = require("../controllers/ProductsController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./uploads")
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname)
    }
})

const fileFilter = (req,file,cb)  => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true)
    }
    else {
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter:fileFilter
})

router.post("/list/create",authorizatedToken,upload.single("productImage"),ProductsController.productCreateControllerPost) //
router.get("/list/create",authorizatedToken,ProductsController.productCreateControllerGet)
router.get("/list",authorizatedToken,ProductsController.productControllerGet);
router.get("/",ProductsController.productsPublicController);
router.get("/filter",ProductsController.productCategoryController);
router.get("/bests",ProductsController.bestProductSellerGet);
router.delete("/delete",authorizatedToken,ProductsController.deleteProductController);
router.get("/:id",ProductsController.productsIdGetController);





function authorizatedToken (req,res,next) {
    const bearerHeader = req.headers["authorization"]; 
    if(bearerHeader === null || bearerHeader === "undefined"){
        return res.status(404).json({message:"There is no Authorization Header on request"});
    }
    const token = bearerHeader.split(" ")[1];
    if (token === null || token === "undefined"){
        return res.status(404).json({message:"There is no token o header"});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if (err){
            return res.status(403).json({message:err.message})
        }
        req.user = user;
        next();
    })
}


module.exports = router;