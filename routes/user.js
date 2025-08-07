const express=require('express');
const User=require("../models/user.js");
const router = express.Router();
const passport=require("passport");
const flash = require('flash');


router.get("/signup",(req,res)=>{
    res.render("signupform.ejs");
})

router.post("/signup",async(req,res)=>{
    try{
    let new_entry=req.body;
    const newUser = new User({ email: new_entry.email, username: new_entry.username });
    const registeredUser = await User.register(newUser, new_entry.password);
    console.log(registeredUser);
    req.flash("success","Welcome to ait bnb !");
    res.redirect("/index");    
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
});
router.get("/login",(req,res)=>{
    res.render("loginform.ejs");
})
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
  async (req, res)=>{
    req.flash("success","Welcome back to airbnb !");
    res.redirect('/index');
  });


module.exports=router;