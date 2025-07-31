const express = require('express');
const router = express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const List=require("../models/model_list.js");

const ExpressError=require("../util/ExpressError.js")
const {listingSchema,reviewSchema}=require("../listingSchema.js");
//const Review=require("../models/review_model.js");



const validatelisting=(req,res,next)=>{                     // joi backend validationg for new hotel
    let {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(400,error.message);
        
    }
    next();
}


router.get("/",wrapAsync(async(req,res)=>{
    const alllisting=await List.find({});
    res.render("index.ejs",{alllisting});
}));


router.get("/new",(req,res)=>{
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
    console.log(new_entry);
    res.redirect("/index");
}));

router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let data=await List.findById(id)
    res.render("edit.ejs",{data});
    console.log(data);
}));

router.put("/:id",validatelisting,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await List.findByIdAndUpdate(id,{...req.body});
    res.redirect("/index");
}));

router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await List.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/index");
}));


//hotel data to show details 


router.get("/:id",wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const hotel_data= await  List.findById(id).populate("reviews");
    res.render("hotel.ejs",{hotel_data});
}));



module.exports = router;