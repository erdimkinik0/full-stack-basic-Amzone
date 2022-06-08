const express = require("express");
const router = express.Router();

const OrderControllers = require("../controllers/OrderController");


router.post("/create",OrderControllers.orderControllerCreatePost);
router.get("/create",OrderControllers.orderControllerCreateGet);
router.get("/",OrderControllers.orderControllerGet);
router.get("/list",OrderControllers.orderListControllerGet);




module.exports = router;