const User = require("../models/user");
const hotel = require("../models/addrestaurent");
module.exports.homepage=async function(req,res){

    const hotelelem=await hotel.find();
    
    console.log(hotelelem);
    if(req.user){
    res.render("home",{
        title:"home",
        username:req.user.name,
        hotelelem:hotelelem
    })
    }else{
         res.render("home",{
            title:"home",
            hotelelem:hotelelem
        })  
    }

}
