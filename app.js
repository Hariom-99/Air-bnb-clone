if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
//const List=require("./models/model_list.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate")
//const wrapAsync=require("./util/wrapAsync.js");
const ExpressError=require("./util/ExpressError.js")
const {listingSchema,reviewSchema}=require("./listingSchema.js");
//const Review=require("./models/review_model.js");
const index=require("./routes/index.js");
const review=require("./routes/reviews.js");
const signuproute=require("./routes/user.js");
const session=require("express-session");
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User=require("./models/user.js");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
//app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method")); 
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))
main()
.then(()=>{console.log(" database connection successful");})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/air_bnb_db');
}
const sessionOption={
    secret:"mysupersecretkey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,httpOnly:true,
    }
};

app.get("/", (req, res) => {
    res.redirect("/index");
});

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});




// let list1=new List({
//   title: "Ocean View Resort",
//   description: "A luxurious beachside resort offering stunning ocean views, infinity pool, fine dining, and spa services. Perfect for a relaxing vacation or honeymoon.",
//   price: 179.99,
//   location: "Goa",
//   country: "India"
// });

// list1.save().then((res)=>{
//     console.log(list1);
// })
const validatelisting=(req,res,next)=>{                     // joi backend validationg for new hotel
    let {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(400,error.message);
        
    }
    next();
}
// const validatereview=(req,res,next)=>{                     // joi backend validationg for review
//     let {error}=reviewSchema.validate(req.body);
//     console.log(error);
//     if(error){
//         throw new ExpressError(400,error.message);
        
//     }
// }
const validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    //  console.log(error);
    if (error) {
        throw new ExpressError(400, error.message);
    }
    next();
};




// showing route index route 
app.use("/index",index);
app.use("/index/:id/review",review);
app.use("/",signuproute);


// edit route 








app.all("/*catchAll", (req, res, next) => {                // ye jo routes above define nahi hai .and wrong route call krne par error trigger krta hai
    next(new ExpressError(404, "Page Not Found!"));
});
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.render("error.ejs",{err});
});



app.listen("8080",()=>{
    console.log("app is listening to port 8080");
})