const express=require("express");
const router=express.Router();
const admin_controller=require("../controllers/admin_controller.js");

router.post("/login",admin_controller.login);

router.get("/loginpage",admin_controller.loginpage);

router.post("/loginverify",admin_controller.loginverify);

router.get("/order/",admin_controller.orderwithid);

router.post("/bookorderinhotel",admin_controller.bookorderinhotel);
    
router.post("/changeorderstatus1",admin_controller.changeorderstatus);

router.get("/ordershowpage",admin_controller.ordershowpage);
module.exports=router;