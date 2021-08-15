const express=require("express");
const router=express.Router();
const home_controller=require("../controllers/home_controller");


router.get("/",home_controller.homepage);

router.use('/user',require("./user"));
router.use("/hotel",require("./hotel"));
router.use("/admin",require("./admin"));
module.exports=router;