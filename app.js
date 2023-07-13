const express=require("express");
const morgan=require("morgan");
const helmet=require("helmet");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const myrouteruser=require("./routes/users");
const myrouterauth=require("./routes/auth");
const myrouterpost=require("./routes/posts");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

dotenv.config();
mongoose.connect("mongodb://0.0.0.0:27017/socioDb",{useNewURLParser:true})
.then(function(u){
    console.log("started");
})
.catch(function(err){
    console.log(err);
});
//middlewares used
//app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",myrouteruser);
app.use("/api/auth",myrouterauth);
app.use("/api/posts",myrouterpost);
/*app.get("/",function(req,res){
    res.send("heyaa");
})*/






app.listen(8800,function(req,res){
    console.log("our server has started on port 3000");
});