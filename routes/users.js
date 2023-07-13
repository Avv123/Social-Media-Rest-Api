const router=require("express").Router();
const md5=require("md5");
const User = require("../database/Userr");

//update your account
router.put("/:id", async (req, res) => {  
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
          try {
            // const salt = await bcrypt.genSalt(10);
            req.body.password = md5(req.body.password);
        } catch (err) {
          return res.status(500).json(err);
        }
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    }
else{
   return  res.status(404).json("You are only allowed to update your account")
}
     

      });
// delete your account
 router.delete("/:id", async (req, res) => {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
          try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
          }
           catch (err) {
            return res.status(500).json(err);
          }
        } else {

          return res.status(403).json("You can delete only your account!");
        }
      });
      //get details of a user
      router.get("/:id",async(req,res)=>{
        try{
            const user=await User.findById(req.params.id);
            const {password,updatedAt,isAdmin,...hide} = user._doc // to hide these fields

            res.status(200).json(hide);
        }
        catch(err){
            res.status(500).json(err);
        }
      })

      router.put("/:id/follow",async(req,res)=>{
        try{
            if(req.body.userId!==req.params.id) // to check if not same user
            {
                try{
                const user=await User.findByIdAndUpdate(req.body.userId)
                const tofollow=await User.findById(req.params.id);
                if(!tofollow.followers.includes(req.body.userId))
                {
                    await tofollow.updateOne({$push:{followers:req.body.userId}});
                    await user.updateOne({$push:{followings:req.params.id}})
                    res.status(200).json("The user is successfully followed");
                }
                else
                {
                    res.status(403).json("You are already following this user")
                }
                }
                catch(err)
                {
                    res.status(500).json(err);
                }
            }
            else
            {
                res.status(403).json("Same User");
            }
        }
        catch(err){
            res.status(500).json(err)
        }
      })

      router.put("/:id/unfollow",async(req,res)=>{
        try{
            if(req.body.userId!==req.params.id) // to check if not same user
            {
                try{
                const user=await User.findByIdAndUpdate(req.body.userId)
                const tofollow=await User.findById(req.params.id);
                if(tofollow.followers.includes(req.body.userId))
                {
                    await tofollow.updateOne({$pull:{followers:req.body.userId}});
                    await user.updateOne({$pull:{followings:req.params.id}})
                    res.status(200).json("The user is successfully unfollowed");
                }
                else
                {
                    res.status(403).json("You dont Follow this user ");
                }
                }
                catch(err)
                {
                    res.status(500).json(err);
                }
            }
            else
            {
                res.status(403).json("Same User");
            }
        }
        catch(err){
            res.status(500).json(err)
        }
      })
module.exports=router;
/*
/*const User = require("../database/Userr");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
})*/