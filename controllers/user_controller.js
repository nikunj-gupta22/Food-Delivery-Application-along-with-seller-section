const User = require("../models/user");
const Items = require("../models/Items");
const Order = require("../models/order");
const mail = require("../mailer/validateuser");
const { ObjectId } = require("mongodb");
const AddRestaurent = require("../models/addrestaurent");
const order = require("../models/order");
var cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
//sending user for signup page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  return res.render("signup", {
    title: "Signup",
  });
};

//creating our new user
module.exports.create = function (req, res) {
  console.log(req.body);
  //return res.send(req.body);
  let num = Math.floor(Math.random() * 111123);

  let n = num.toString();

  if (req.body.password != req.body.cpassword) {
    return res.render("signup", {
      error: "Password Not Match",
      title: "signup",
    });
  }

  if (req.body.phone.length != 10) {
    return res.render("signup", {
      error: "Invalid Phone Number",
      title: "signup",
    });
  }

  User.findOne({ email: req.body.email }, function (err, result) {
    if (err) {
      console.log("error is in singup", err);
      return;
    }

    if (!result) {
      let nameofuser=req.body.name.replace("\\s+", " ").trim()
      User.create(
        {
          name: nameofuser,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          otp: n,
        },
        function (err, user) {
          if (err) {
            console.log("error in finding user in signup");
            return;
          }

          mail.newuser(user, n);

          setTimeout(async function () {
            const validatinguser = await User.findOne({
              email: req.body.email,
            });
            if (validatinguser.valid == false) {
              var myquery = { email: req.body.email };
              User.deleteOne(myquery, function (err, obj) {
                if (err) {
                  return;
                } else {
                  console.log("Item deleted");
                  return res.redirect("/user/signup");
                }
              });
            } else {
              mail.newusersuccess(user);
              return res.redirect("/");
            }
          }, 60000);
        }
      );
    } else {
      console.log("something went wong");
      return res.redirect("back");
    }
  });
};

//for sending user to verification page
module.exports.verifypage = function (req, res) {
  console.log("requestiong verify page");
  return res.render("verify", {
    title: "verification",
  });
};

//verify user
module.exports.verifyuser = async function (req, res) {
  try {
    const userverify = await User.findOneAndUpdate(
      {
        $and: [{ otp: req.body.otp }, { valid: false }],
      },
      { $set: { valid: true } }
    );

    return res.redirect("/");
  } catch (err) {
    return res.render("signup", {
      title: "signup",
      error: "Something went wrong try again",
    });
  }
};

//sending user to loginpage

module.exports.loginpage = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  return res.render("login", {
    title: "Login",
  });
};

//login in user

module.exports.login = function (req, res) {
  //passport Authentication

  return res.redirect("/");
};

module.exports.signout = function (req, res) {
  req.logout();
  console.log("loggedout");
  req.flash("success", "Signout Succesfully");

  return res.redirect("/");
};

//display adding a restaurent page
module.exports.addrest = function (req, res) {
  return res.render("addrestaurent", {
    title: "addrestaurent",
  });
};

//add arestaurent
module.exports.addhotel = async function (req, res) {
  const {
    email,
    hotelname,
    minorderanount,
    contactNumber,
    password,
    cpassword,
    locality,
  } = req.body;

  if (password != cpassword) {
    req.flash("error", "Password Not matched");

    return res.redirect("back");
  }

const maxsize=1*1024*1024;
const file=req.files.avatar;
console.log("file is"+file);
let obj={};

if(file.size >maxsize){
req.flash("error","file size should be less than 1 mb");
res.redirect("back");
}else{
  if( file.mimetype == "image/png" ||file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){

 const result=await cloudinary.uploader.upload(file.tempFilePath);
let url=result.url;

 AddRestaurent.findOne(
  { hotelname: req.body.hotelname },
  function (err, result) {
    let n = Math.floor(Math.random() * 111123);
    if (err) {
      console.log("error is in signup", err);
      return;
    }

    if (!result) {
      AddRestaurent.create(
        {
          hotelname: req.body.hotelname,
          email: req.body.email,
          minorderanount: req.body.minorderanount,
          contactNumber: req.body.contactNumber,
          password: req.body.password,
          locality: req.body.locality,
          street: req.body.street,
          zip: req.body.zip,
          otp: n,
          description: req.body.description,
      avatar:url    
        },
        function (err, user) {
          if (err) {
            console.log("error in finding user in signup" + err);
            return;
          }

          mail.newrestaurent(user);
          return res.redirect("/user/verifyaddrestaurentotp");
        }
      );
    } else {
      return res.redirect("back");
    }
  }
);
}else{
req.flash("error","file should be jpg/jpeg/png");
res.redirect("back");
}


  }



}


//verify otp of addrestuiarent

module.exports.verifyotppage = function (req, res) {
  return res.render("addrestaurentverify", {
    title: "verify",
  });
};

module.exports.verifyotp = async function (req, res) {
  try {
    let userverify = await AddRestaurent.findOneAndUpdate(
      { $and: [{ otp: req.body.otp }, { valid: false }] },
      { $set: { valid: true } }
    );

    return res.redirect("/hotel/sellerlogin");
  } catch (err) {
    console.log("error in finding user" + err);

    req.flash("error", "Failed!!");
    return res.redirect("back");
  }
};

module.exports.addcart = async function (req, res) {
  let obj = {};
  if (!req.user) {
    req.flash("error", "Logged In To continue");
    obj.error = "Loggedin to Continue";
    res.send(obj);
  } else {
    const user = await User.findOne({ _id: req.user.id });
    console.log(req.body.id);
    user.usercart.push(req.body.id);
    user.save();
    obj.success = "Suucessfully Added";

    res.send(obj);
  }
};

module.exports.cartItem = function (req, res) {
  if (!req.user) {
    req.flash("error", "LoggedIn first");
    res.redirect("back");
  } else {
    let total = 0;
    User.findOne({ email: req.user.email }, async function (err, result) {
      let mycartItem = [];
      let arr = result.usercart;
      var myMap = new Map();
      var map2 = new Map();
      for (let i of arr) {
        const ty = JSON.stringify(i);
        if (myMap.has(ty) == true) {
          let l = myMap.get(ty) + 1;
          myMap.set(ty, l);
          map2.set(ty, l);
        } else {
          myMap.set(ty, 1);
          map2.set(ty, 1);
        }

        let res = await Items.findOne({ _id: i });

        mycartItem.push(res);

        total += res.price;
      }

      res.render("cart", {
        title: "Cart",
        mycartItem: mycartItem,
        pricetotal: total,
        username: req.user.name,
        myMap: myMap,
        map2: map2,
      });
    });
  }
};

//delete an item from cart
module.exports.cartdelete = async function (req, res) {
  let obj = {};
  try {
    const user = await User.findOne({ email: req.user.email });
    var i = user.usercart.length;

    while (i--) {
      console.log("user cart" + user.usercart[i]);
      if (user.usercart[i] == req.body.id) {
        user.usercart.splice(user.usercart.indexOf(req.body.id), 1);
      }
    }

    user.save();
    res.send({ success: "yes" });
  } catch (err) {
    res.send({ error: "yes" });
  }
};

//adding an item to an cart

module.exports.increaingcartItem = function (req, res) {
  let obj = {};
  try {
    let mycurruser = req.user;
    mycurruser.usercart.push(req.body.id);
    mycurruser.save();
    obj.success = "succesfully added";
    res.send(obj);
  } catch (err) {
    obj.error = "Not added";
    res.send(obj);
  }
};

//decreasing cart item count
module.exports.reducingcartItem = function (req, res) {
  let obj = {};
  try {
    let user = req.user;
    let mycurruser = req.user.usercart;
    const _id = ObjectId(req.body.id);

    let index = mycurruser.indexOf(_id);
    if (index > -1) {
      mycurruser.splice(index, 1);
      user.save();
    }
    obj.success = "succesfully deleted";
    res.send(obj);
  } catch (err) {
    obj.error = "Not added";
    res.send(obj);
  }
};

//place a user order

module.exports.orderplace = async function (req, res) {
  console.log(req.body.phone + " " + req.body.address);
  try {
    if (req.body.phone.length < 10) {
      req.flash("error", "Enter valid Number");
      return res.redirect("back");
    }
    
    
    else {
      var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

      Order.create({
        phone: req.body.phone,
        address: req.body.address,
        customerId: req.user._id,
        items: req.user.usercart,
        name: req.user.email,
        time:today
      });
      const user = await User.findOne({ email: req.user.email });
      user.usercart.splice(0, user.usercart.length);
      user.save();
      return res.redirect("/user/userorder");
    }
  } catch (err) {
    req.flash("error", "Something went wrong");
    console.log(err);
    res.redirect("back");
  }
};

//userorder page

module.exports.userorder = async function (req, res) {
  const orderinfo = await Order.find({ customerId: req.user.id });
  let total = 0;
  var myMap = new Map();
  let mycartItem = [];
  let cnt = 0;
  
  while (cnt < orderinfo.length) {
    let arr = orderinfo[cnt].items;
    let objec={}; 
    objec["orderId"] =orderinfo[cnt]._id;
    objec["status"]=orderinfo[cnt].status;

    let myarr=[];
    for (let i of arr) {
      const ty = JSON.stringify(i);
      if (myMap.has(ty) == true) {
        let l = myMap.get(ty) + 1;
        myMap.set(ty, l);
      } else {
        myMap.set(ty, 1);
      }
   let res = await Items.findOne({ _id: i });
     total += res.price;
      myarr.push(res);
    }
   objec["arr"]=myarr;
   mycartItem.push(objec);
    cnt++;
  }
  
  res.render("userorder", {
    title: "userorder",
    mycartItem: mycartItem,
    username: req.user.name,
    myMap: myMap,
    total: total,
    userid:req.user.id
  });
};

//mistake objectsId comparision
