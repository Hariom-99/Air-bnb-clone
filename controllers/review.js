
const Review=require("../models/review_model.js");
const {reviewSchema}=require("../listingSchema.js");
const List=require("../models/model_list.js");
const ExpressError=require("../util/ExpressError.js")

module.exports.review_post=async(req,res)=>{
    let hotel=await List.findById(req.params.id);
    let newreview=new Review(req.body.review) ;
    newreview.author=req.user._id;
    console.log(newreview);
    hotel.reviews.push(newreview);
    await newreview.save();
    await hotel.save();

    console.log("new review saved");
    req.flash("success","The review was added successfully");
    res.redirect(`/index/${req.params.id}`)
    //res.send("Review given successfully");
}
module.exports.destroy_review=async(req,res)=>{
    let {id,reviewid}=req.params;
    console.log(id,reviewid);
    console.log("DELETE route hit", id, reviewid); 
    let deleted=await Review.findByIdAndDelete(reviewid);
    await List.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    console.log(deleted);
    req.flash("success","The review was deleted successfully");



    res.redirect(`/index/${id}`);
}