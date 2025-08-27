const express = require('express');
const router = express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const List=require("../models/model_list.js");

const ExpressError=require("../util/ExpressError.js")
const {listingSchema,reviewSchema}=require("../listingSchema.js");
//const Review=require("../models/review_model.js");
const isLoggedin=require("../isLoggedin.js");



const validatelisting=(req,res,next)=>{                     // joi backend validationg for new hotel
    let {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(400,error.message);
        
    }
    next();
}


//for showing all the hotels 
router.get("/",wrapAsync(async(req,res)=>{
    const alllisting=await List.find({});
    res.render("index.ejs",{alllisting});
}));

//new hotel ading form
router.get("/new",isLoggedin,(req,res)=>{
    
    res.render("new_hotel_form.ejs");
})
//joi validation  for adding new entities 
router.post("/",validatelisting,wrapAsync(async(req,res,next)=>{
    // if(!req.body){
    //     throw new ExpressError(400,"Send valid body");
    // }
    
    let new_entry=req.body;
    let new_hotel=new List(new_entry);
    await new_hotel.save();
    req.flash("success","The new listing was created successfully");
    console.log(new_entry);
    res.redirect("/index");
}));


//hotel detail edit
router.get("/:id/edit",isLoggedin,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let data=await List.findById(id)
    res.render("edit.ejs",{data});
    console.log(data);
}));

//edited detail deployed
router.put("/:id",validatelisting,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await List.findByIdAndUpdate(id,{...req.body});
     req.flash("success","The listing was edited successfully");
    res.redirect("/index");
}));


// delete the hotel details 

router.delete("/:id",isLoggedin,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await List.findByIdAndDelete(id);
    console.log(deleted);
     req.flash("success","The listing was deleted successfully");
    res.redirect("/index");
}));


//hotel data to show details  for  a particular 


router.get("/:id",wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const hotel_data= await  List.findById(id).populate("reviews");
    if(!hotel_data){
        req.flash("error","Hotel you are looking does not exist");
         return res.redirect("/index");
    }
    res.render("hotel.ejs",{hotel_data});
}));



module.exports = router;