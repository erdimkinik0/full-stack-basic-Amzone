const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");


router.get("/",CartController.cartControllerGet);
router.post("/add",CartController.cartControllerPost);



module.exports = router;