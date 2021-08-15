const mongoose=require("mongoose");

const hotelSchema=new mongoose.Schema({

    hotelname:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
         unique:false
    },
    minorderanount:{
        type:String,
        
    },
    contactNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    street:{
        typoe:String,
       
    },
    
    zip:{
        type:String,
        required:true
    },
    valid:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
        default:null
    },
    description:{
        type:String
    },
    avatar:{
        type:String
    },
    


})


const hotel=mongoose.model('hotel',hotelSchema);

module.exports=hotel;