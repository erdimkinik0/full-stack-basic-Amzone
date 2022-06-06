const express = require("express");
const router = express.Router();
const AdvertControllers = require("../controllers/AdvertsController");

router.post("/create",AdvertControllers.advertsControllerPost);
router.get("/",AdvertControllers.advertsControllerGet);

module.exports = router;

