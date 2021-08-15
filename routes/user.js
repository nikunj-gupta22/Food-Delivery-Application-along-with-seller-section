const express=require("express");
const route=express.Router();
const passport=require("passport");
const user_controller=require("../controllers/user_controller");




route.get("/signup",user_controller.signup);
route.post("/signup",user_controller.create);
route.get("/verify",user_controller.verifypage);
route.post("/verify",user_controller.verifyuser);
route.get("/signin",user_controller.loginpage);
route.post('/login',passport.authenticate('local',
{failureRedirect:"/user/signin"}),user_controller.login);
route.get("/signout",user_controller.signout);
route.get("/auth/google",passport.authenticate('google',{scope:['profile','email']}));
route.get("/auth/google/callback",passport.authenticate('google',{failureRedirect:"user/signin"}),user_controller.login);
route.get("/addrestaurent", user_controller.addrest);
route.post("/addhotel",user_controller.addhotel);
route.get("/verifyaddrestaurentotp",user_controller.verifyotppage);
route.post("/verifyaddrestaurentotp",user_controller.verifyotp);
route.post("/addcart",user_controller.addcart);
route.get("/cartItem",user_controller.cartItem);
route.post("/cartdelete",user_controller.cartdelete);
route.post("/increasecartItem",user_controller.increaingcartItem);
route.post("/reducingcartItem",user_controller.reducingcartItem);
route.post("/orderplace",user_controller.orderplace);
route.get("/userorder",user_controller.userorder);
module.exports=route;