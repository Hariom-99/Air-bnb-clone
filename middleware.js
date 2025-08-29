const List=require("./models/model_list.js");
const Review=require("./models/review_model.js");
const ExpressError=require("./util/ExpressError.js")
const {reviewSchema}=require("./listingSchema.js");
module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create new listing!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl; // optional: clear it
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
     let {id}=req.params;
    const listing = await List.findById(id);
   if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have access to edit");
        return res.redirect(`/index/${id}`);
    }
    next();

}
module.exports.validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    //  console.log(error);
    if (error) {
        throw new ExpressError(400, error.message);
    }
    next();
};


module.exports.isreviewauthor=async(req,res,next)=>{
     let {id,reviewid}=req.params;
    const review= await Review.findById(reviewid);
   if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have access to edit the reivew");
        return res.redirect(`/index/${id}`);
    }
    next();

}