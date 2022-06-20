const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");


router.get("/",CartController.cartControllerGet);
router.post("/add",CartController.cartControllerPost);
router.get("/get-cart",CartController.getCartController);
router.delete("/delete",CartController.cartDeleteController)



module.exports = router;