const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
email:{
    type:String,
    required:true,
    unique:true
},
password:{
  type:String,
  required:true  
},
name:{
    type:String,
    required:true
},

cart:[String],
usercart: [{ type : mongoose.Schema.Types.ObjectId, ref: 'items' }],
phone:{
    type:Number,
 },
    otp:{
      type:Number
    },
    valid:{
      type:Boolean,
      default:false
    }

},
{
    timestamps: true,
  }

)

const User=mongoose.model('user',userSchema);
module.exports=User;