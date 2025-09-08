const express=require('express');

const router = express.Router();
const passport=require("passport");

const {saveRedirectUrl}=require("../middleware.js");
const usercontroller=require("../controllers/user.js")

router.get("/signup",(req,res)=>{
    res.render("signupform.ejs");
})

router.post("/signup",usercontroller.sign_up_user);


router.get("/login",(req,res)=>{
    res.render("loginform.ejs");
})
router.post('/login', 
  saveRedirectUrl,
  passport.authenticate('local', { failureRedirect: '/login',failureFlash:true }),
  usercontroller.login_user
  );


router.get("/logout",usercontroller.destroy_user);

module.exports=router;