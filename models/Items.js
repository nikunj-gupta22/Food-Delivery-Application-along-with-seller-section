const mongoose=require("mongoose");
const path = require("path");
const multer = require("multer");
const AVATAR_PATH = path.join("/uploads/Items/avatars");
const ItemSchema=mongoose.Schema({
    price:{
        type:Number,required:true
    },
    
    itemName:{
        type:String,
        required:true
    },
    
     Availability:{
         type:Boolean,
         required:true
     },
   hotelname:{
       type:String,
       required:true
    }, avatar: {
        type: String,
      },
      description:{
          type:String
      }


},
{
    timestamps: true,
  }

)

const Items=mongoose.model("Items",ItemSchema);
module.exports=Items;

