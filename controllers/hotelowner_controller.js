const hotel = require("../models/addrestaurent");
const Items = require("../models/Items");
const orders=require("../models/order");
var cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
//show login page for seller

module.exports.sellerloginpage = function (req, res) {
  return res.render("hotellogin", {
    title: "Hotellogin",
  });
};
//lend user to particular hotel
module.exports.findhotel = async function (req, res) {
  if (!req.user) {
    req.flash("error", "Logged in to Continue");
    res.redirect("back");
  }
  console.log(req.query.id);
  Items.find({ hotelname: req.query.id }, async function (err, items) {
    const hoteldesc = await hotel.find({ hotelname: req.query.id });
    console.log(hoteldesc);
    res.render("showhotel", {
      data: hoteldesc,
      items: items,
      title: items.hotelname,
      usercartitems: req.user.usercart,

      username: req.user.name,
    });
  });
};

module.exports.sellerlogin = function (req, res) {
  try {
    const { hotelname, email, password } = req.body;
    console.log(hotelname + " " + email + " " + password);
    hotel.findOne(
      {
        $and: [
          { hotelname: hotelname },
          { email: email },
          { password: password },
        ],
      },
      async function (err, hotelexist) {
        console.log("error is", err);
        if (err) {
          console.log("hii");
          req.flash("error", "Hotelname not registred");
          return res.redirect("back");
        }
        if (hotelexist) {
          const hotelItem = await Items.find({
            hotelname: hotelexist.hotelname,
          });
          console.log(hotelItem);
          return res.render("addItem", {
            hotel: hotelexist,
            title: "AddItem",
            sellerboard: hotelexist.hotelname,
            hotelItem: hotelItem,
          });
        } else {
          req.flash("error", "Enter Valid Credentials");
          return res.redirect("back");
        }
      }
    );
  } catch (err) {
    req.flash("error", "Hotelname not registred");
    return res.redirect("back");
  }
};

//adding new item
module.exports.addnewItem = async function (req, res) {
  console.log("IN A ADD NEW ITEMS");
  try {
    let Availability = false;
    if (req.body.Availability == "Yes") {
      Availability = true;
    }

    const maxsize = 1 * 1024 * 1024;
    const file = req.files.avatar;
    let obj = {};

    if (file.size > maxsize) {
      obj.err = "File size should be less than 1 Mb";
    } else {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        const result = await cloudinary.uploader.upload(file.tempFilePath);

        console.log(result.url);
        const Item = await Items.create({
          price: req.body.Price,
          itemName: req.body.Itemname,
          Availability: Availability,
          hotelname: req.body.hotelname,
          avatar: result.url,
          description: req.body.description,
        });

        if (Item) {
          obj.success = "Succesfully Added";
          obj.Item = Item;
        }
      } else {
        console.log(file.mimetype);
        obj.err = "Image should be jpg/jpeg/png";
      }
    }

    return res.send(obj);
  } catch (err) {
    console.log("Item not added succesfuylly");
    console.log(err);

    return res.send(err);
  }
};

module.exports.deleteItem = async function (req, res) {
  let obj = {};
  try {
    let id = req.body.id;
    console.log("id is", req.body.id);
    const deleted = await Items.deleteOne({ _id: id });

    console.log("succesfully deleted");

    obj.success = "succesfully delted";
    return res.send(obj);
  } catch (err) {
    obj.err = "Not delted";
    return res.send(obj);
  }
};

module.exports.editItems = async function (req, res) {
  try {
    let id = req.body.id;

    let itemName = req.body.itemname;
    let price = req.body.modalPrice;
    let Availability = req.body.modalAvailability;
    id = id.substring(0, id.length - 1);
    const { ObjectId } = require("mongodb");
    id = ObjectId(id);
    var _id = mongoose.Types.ObjectId(id);

    console.log(itemName + " " + price + " " + Availability);
    let available = Availability == "Yes" ? true : false;
    
console.log(_id+" "+typeof(_id));
  console.log("bhai maro mujhe maro");
const result=await Items.findOneAndUpdate({_id},{$set:{itemName:itemName,price:price,Availability:available}});
console.log("result is"+result.hotelname);
const hotelItem = await Items.find({
  hotelname: result.hotelname,
});
console.log(hotelItem);
return res.render("addItem", {
  hotel: result,
  title: "AddItem",
  sellerboard: result.hotelname,
  hotelItem: hotelItem,
});

    return res.send(result);
  } catch (err) {
    console.log(err);
    let obj = {
      success: "no",
    };
    res.send("Something went wrong try again !!");
  }
};

//deleting order when completed

module.exports.deleteorder=async function(req,res){
try{

const { ObjectId } = require("mongodb");
id = ObjectId(req.body.id);
res.send("ok");
await orders.deleteOne({_id:id});
let obj={success:"yes"};
res.send(obj);
}catch(err){
  let obj={success:"no"};
  console.log(err);
res.send(obj);
}

}