const router = require("express").Router();
const User = require("../database/Userr");
const bcrypt = require("bcrypt");
const md5=require("md5");

//REGISTER

router.post("/register", async(req,res)=> {
   try{
   /* const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); */
      const person =  User.create({username: req.body.username, email: req.body.email, password:md5(req.body.password)});
      
      
      res.status(200).json(person);
    }
    catch(err){
        res.status(500).json(err);
    }
  
  
});
router.post("/login",async(req,res)=>{
    try{
   const  user=await User.findOne({email:req.body.email})
    if(user){
        if(user.password===md5(req.body.password))
        {
            res.status(200).json(user)
       }
       else{
        res.status(400).json("Wrong Password");
       }
    }
         else
            {
                res.status(404).json("user not found");
            }
    }
    

    catch(err)
    {
        res.status(500).json(err);
    }
})


module.exports=router;
