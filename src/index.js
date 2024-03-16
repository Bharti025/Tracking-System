const express=require("express");
const app= express();
const path=require("path")
const tempelatePath=path.join(__dirname,"../tempelates");
app.use(express.json());
app.set("view engine","ejs");
const List=require("../models/list.js");
app.set("views",tempelatePath);
const collection=require("./mongodb.js");

app.use(express.static("./src/public"));
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/signup",(req,res)=>{
    res.render("home");
})

//signup page
app.post("/signup",async (req,res)=>{
const data={
    name:req.body.name,
    password:req.body.password,
}
await collection.insertMany([data])
res.render("home");
});

// app.post("/login",(req,res)=>{
//  res.redirect("/login");
// });

//login page
app.post("/login",async (req,res)=>{
    try{
       const check=await collection.findOne({name:req.body.name});
       if(check.password===req.body.password){
        res.render("home")
       }
       else{
        alert("wrong password!sign up");
        res.render("signup");
       }
    }
    catch{
        res.render("signup");
        
    }
    });

app.get("/sap",(req,res)=>{
  res.render("SAP_Id.ejs");
});

app.get("/noc",(req,res)=>{
    res.render("noc.ejs");
  });

//home page
app.get("/home",(req,res)=>{
  res.render("home");
});

app.post("/sap",async (req,res)=>{
    let {name,request_raised_by,approved_by,correspondance_date,action_date}=req.body;

    let newList = new List({
      name:name,
      request_raised_by:request_raised_by,
      approved_by:approved_by,
      correspondance_date:correspondance_date,
       action_date:action_date,
       
    });
     await newList.save().then(()=>{
        console.log("data was saved");
     });
    
     console.log(newList);
    // let lists=await List.find().sort({name:'asc'});
    res.render("home.ejs");

});


app.listen(8000,()=>{
    console.log("port is connected");
})