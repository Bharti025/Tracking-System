const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/tracking', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected"); 
});


const  LogInSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

const collection=new mongoose.model("Collection1",LogInSchema);
module.exports=collection;