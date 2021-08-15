const mongoose=require("mongoose");
const mongodb_URL=process.env.MONGODB_URL;
console.log(mongodb_URL);
//||"mongodb://localhost/food-order"
mongoose.connect(mongodb_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;