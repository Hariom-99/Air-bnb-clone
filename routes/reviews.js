const express=require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../util/wrapAsync.js");
const Review=require("../models/review_model.js");
const {reviewSchema}=require("../listingSchema.js");
const List=require("../models/model_list.js");
const ExpressError=require("../util/ExpressError.js")

const validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    //  console.log(error);
    if (error) {
        throw new ExpressError(400, error.message);
    }
    next();
};

//reviews post request 
router.post("/",validatereview,wrapAsync(async(req,res)=>{
    let hotel=await List.findById(req.params.id);
    let newreview=new Review(req.body.review) ;
    hotel.reviews.push(newreview);
    await newreview.save();
    await hotel.save();

    console.log("new review saved");
    res.redirect(`/index/${req.params.id}`)
    //res.send("Review given successfully");
}));


//delete the review 

router.delete("/:reviewid",wrapAsync(async(req,res)=>{
    let {id,reviewid}=req.params;
    console.log(id,reviewid);
    console.log("DELETE route hit", id, reviewid); 
    let deleted=await Review.findByIdAndDelete(reviewid);
    await List.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    console.log(deleted);



    res.redirect(`/index/${id}`);
}));



module.exports=router;