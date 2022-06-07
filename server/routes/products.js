const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/ProductsController");



router.post("/create",ProductsController.productCreateControllerPost)
router.get("/create",ProductsController.productCreateControllerGet)
router.get("/",ProductsController.productControllerGet);


module.exports = router;