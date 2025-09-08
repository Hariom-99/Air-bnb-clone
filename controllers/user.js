
const User=require("../models/user.js");
const flash = require('flash');

module.exports.sign_up_user=async(req,res)=>{
    try{
    let new_entry=req.body;
    const newUser = new User({ email: new_entry.email, username: new_entry.username });
    const registeredUser = await User.register(newUser, new_entry.password);
    console.log(registeredUser);
    req.login(registeredUser, function(err) {
    if (err) { return next(err); }
    req.flash("success","Welcome to ait bnb !");
    res.redirect("/index"); 
    });   
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.login_user=async (req, res)=>{
    req.flash("success","Welcome back to airbnb !");
    let redirectUrl=res.locals.redirectUrl||"/index";
    res.redirect(redirectUrl);
  }

  module.exports.destroy_user=(req,res,next)=>{
 req.logout((err)=>{ if(err){
    next(err);
  }
  req.flash("success","you have been successfully logged out");
  res.redirect("/index");
  })

}