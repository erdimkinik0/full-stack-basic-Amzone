const express = require("express");
const router = express.Router();
const AdvertsControllers = require("../controllers/AdvertsController");

router.post("/create",AdvertsControllers.advertsCreateControllerPost);
router.get("/create",AdvertsControllers.advertsCreateControllerGet);
router.get("/",AdvertsControllers.advertsControllerGet);

module.exports = router;

