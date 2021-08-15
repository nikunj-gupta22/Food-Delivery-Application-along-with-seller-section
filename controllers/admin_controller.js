const admin = require("../models/admin");
const Orders=require("../models/order");
const Items=require("../models/Items");
const mail = require("../mailer/bookorder");
const addrestaurent=require("../models/addrestaurent");
const mongoose=require("mongoose");
module.exports.login=function(req,res){

    try{
    
        console.log(req.body);
    admin.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

      res.send("succesfully added");
    }
    catch(err){
        res.send(err);
    }

}

module.exports.loginpage=function(req,res){
    res.render("adminlogin",{
        title:"adminlogin"
    })
}

module.exports.loginverify=async function(req,res){
try{ 
     let adminfind = await admin.find({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password
  });
         if(adminfind){
           
         res.redirect("/admin/ordershowpage");           
     
}else{
    req.flash("error","Invalid Credentials");
            res.redirect("back");
        }
    

}catch(err){
    res.send(err);
 }    
    
}


module.exports.ordershowpage=async function(req,res){
try{
    console.log("hii nikunj here");
         const allorder=await Orders.find({ status: { $in: [ "order_placed", "confirmed","prepared","delivered" ] } });
          console.log(allorder);
            res.render("adminorderpage",{
                allorder:allorder,
                title:"order",
               

            })
        
    }
        catch(Err){
            res.send(Err);
        }

        }

module.exports.orderwithid=async function(req,res){

console.log(req.query.id);

Orders.findOne({_id:req.query.id},async function(err,order){
    if(err){
        return;
    }
    let total=0;
    let mycartItem = [];
    let arr = order.items;
    var myMap = new Map();
    
    for (let i of arr) {
      const ty = JSON.stringify(i);
      if (myMap.has(ty) == true) {
        let l = myMap.get(ty) + 1;
        myMap.set(ty, l);
    
      } else {
        myMap.set(ty, 1);
  }

      let res = await Items.findOne({ _id: i });

      mycartItem.push(res);

      total += res.price;
    }

res.render("particularorder",{
    mycartItem: mycartItem,
    total: total,
    
    myMap: myMap,
    title:"particular Order"
})

})

}

module.exports.bookorderinhotel=async function(req,res){
console.log("HII");
let objres={};
try{
    const hotel=await addrestaurent.findOne({hotelname:req.body.hotel});
    console.log(hotel.email);
    let obj=req.body;
    obj.email=hotel.email;
    mail.bookorder(obj);
    console.log(obj);
    objres.success="Sent"
    res.send(objres);
}catch(Err){
    objres.error="not sent";
    res.send(objres);
 }


}


module.exports.changeorderstatus=async function(req,res){
    console.log(req.body.customerid+"mera customer ku id");
    var id = mongoose.Types.ObjectId(req.body.orderId);
  console.log("whole order is"+req.body);
     Orders.updateOne({_id:id},{status:req.body.status},(err,data)=>{

  if(err){
     return res.redirect("back");
   }else{
     const eventEmitter=req.app.get('eventEmitter');
       eventEmitter.emit("orderUpdated",{
         id:req.body.customerid,
         status:req.body.status,
         orderId:id
   })
   
   return res.redirect("/admin/ordershowpage");

}

  
})



}