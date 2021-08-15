const express=require("express");
const router=express.Router();
const hotel_controller=require("../controllers/hotelowner_controller");


router.get("/sellerlogin",hotel_controller.sellerloginpage);


router.post("/sellerlogin",hotel_controller.sellerlogin);
router.post("/addnewItem",hotel_controller.addnewItem);
router.post("/deleteItem",hotel_controller.deleteItem);
router.get("/find/",hotel_controller.findhotel)
router.post('/editItems',hotel_controller.editItems);
router.post("/deleteorder",hotel_controller.deleteorder);
module.exports=router;