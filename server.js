require('dotenv').config()
const express=require("express");
 const expressLayouts=require("express-ejs-layouts");
 const {urlencoded}=require("body-parser");
 const app=express();
 const cookieParser = require('cookie-parser');
 var cloudinary=require("cloudinary").v2;

 const port=process.env.PORT||5005;
 const db=require("./db/connect");
 const home_controller=require("./controllers/home_controller");
 const fileUpload=require("express-fileupload");
 const MongoStore=require("connect-mongo");
 const flash=require( "connect-flash" );
 const customMiddleware=require("./config/middleware");
const session=require("express-session");
const passport=require('passport');
const passportLocal=require("./config/passport-local-strategy");
const passportGoogle=require("./config/passport-google-oauth2-strategy");
const Emitter=require("events");
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./assets"));
app.use(expressLayouts);


//for file uploads
app.use(fileUpload({
    useTempFiles:true
}))

 // extract style and scripts from sub pages into the layout
 app.set('layout extractStyles', true);
 app.set('layout extractScripts', true);

 //set up the view engine
  app.set("view engine","ejs");
  app.set("views","./views");


 //mongo store is use to store the session cookie in the db so that whenever we restart server loggedin user cant loggedout.

console.log( process.env.SECRET);
 app.use(session({
   name:"Food-order",
   secret: "babajhbsajdbsajdbsajkdbksad",
   saveUninitialized:false,
   resave:false,
   cookie:{
       maxage:(1000)
   },
   store: MongoStore.create({
      mongoUrl:"mongodb://localhost/food-order",
       autoRemove:"disabled"
   },
   function(err){
       console.log(err||"conect mongo dbsetup");
   }
   
   )
}));


app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);



console.log("Outside the flash");


//Event Emitter

const eventEmitter=new Emitter();

app.set('eventEmitter',eventEmitter);
//console.log("api_secret"+""+process.env.api_secret+" "+process.env.api_key+" "+process.env.cloud_name+" "+process.env.email+" "+process.env.pass);
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
});

  app.use("/",require("./routes"));

  const server=app.listen(port,(err)=>{
    if(err){
        console.log("error",err);
    }else{
        console.log("server is up on port",PORT);
    }
})


//socket

const io=require('socket.io')(server);
let t="";
io.on('connection',(socket)=>{
//console.log(socket.id+"is our socket id we have  to use it");

socket.on('join', function (data) {
    console.log(data.custid+" "+"m haut prashan hu apna jeevan se please help me");
    socket.join(data.custid); // We are using room of socket io

});
eventEmitter.on('orderUpdated',(body)=>{
    console.log("hii mera payara dosto"+" "+typeof(body.id));
    let d=body.id;
      //io.to(body.to).emit("orderupdated1","hello everyone");
     socket.emit("orderupdated1",body);
    })


});














































































