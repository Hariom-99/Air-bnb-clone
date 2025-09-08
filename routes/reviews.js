const express=require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../util/wrapAsync.js");
const { validatereview, isLoggedin ,isreviewauthor} = require("../middleware.js");
const review_controller=require("../controllers/review.js")


//reviews post request 
router.post("/",isLoggedin,validatereview,wrapAsync(review_controller.review_post));


//delete the review 

router.delete("/:reviewid",isLoggedin,isreviewauthor,wrapAsync(review_controller.destroy_review));



module.exports=router;