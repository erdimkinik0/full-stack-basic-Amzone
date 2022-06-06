const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/ProductsController");



router.post("/create",ProductsController.productControllerPost)

router.get("/",ProductsController.productControllerGet);


module.exports = router;