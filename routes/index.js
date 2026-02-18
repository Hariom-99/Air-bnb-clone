const express = require('express');
const router = express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const List=require("../models/model_list.js");
const listingcontroller=require("../controllers/index.js");
const ExpressError=require("../util/ExpressError.js")
const {listingSchema,reviewSchema}=require("../listingSchema.js");
//const Review=require("../models/review_model.js");
const {isLoggedin,isOwner}=require("../middleware.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//const {cloudinary,storage}=require("../cloudConfig.js");
// const upload = multer({ storage });

// testing purpose can remove the below code ---

// console.log("Cloudinary object:", typeof cloudinary);
// console.log("Uploader exists:", typeof cloudinary.uploader);
// console.log("Storage exists:", typeof storage);

//------



const validatelisting=(req,res,next)=>{                     // joi backend validationg for new hotel
    let {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(400,error.message);
        
    }
    next();
}


//for showing all the hotels 
router.get("/",wrapAsync(listingcontroller.index));

//new hotel ading form
router.get("/new",isLoggedin,(req,res)=>{
    
    res.render("new_hotel_form.ejs");
})
// //joi validation  for adding new entities 
// // router.post("/",validatelisting,wrapAsync(listingcontroller.add_new_hotel));    //temporary commented the post route for the image upload 
// router.post("/", upload.single("image"),(req,res)=>{
//     res.send(req.file);
// });

router.post(
  "/",
  isLoggedin,
  upload.single("image"),
  wrapAsync(listingcontroller.add_new_hotel)
);

//hotel detail edit
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingcontroller.edit_hotel));

//edited detail deployed
router.put("/:id" ,isLoggedin, wrapAsync(isOwner), validatelisting,wrapAsync(listingcontroller.edit_hotel_puts));


// delete the hotel details 

router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingcontroller.destroy_hotel));


//hotel data to show details  for  a particular 


router.get("/:id",wrapAsync(listingcontroller.show_hotel));



module.exports = router;