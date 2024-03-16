const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const listSchema=new Schema({
    name:{
        type:String
    },
 req_date:{
       type:Date,
       default:Date.now(),
     },
    
     request_raised_by:String,
     approved_by:String,
     correspondance_date:String,
        action_date:{
            type:Date
         },
      
});

const List=mongoose.model("List",listSchema);
module.exports=List;