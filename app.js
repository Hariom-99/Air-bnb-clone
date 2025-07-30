const express=require("express");
const app=express();
const mongoose=require("mongoose");
const List=require("./models/model_list.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate")
const wrapAsync=require("./util/wrapAsync.js");
const ExpressError=require("./util/ExpressError.js")
const {listingSchema,reviewSchema}=require("./listingSchema.js");
const Review=require("./models/review_model.js");


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


app.get("/",(req,res)=>{
    res.send("hello");
})

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



app.get("/index",wrapAsync(async(req,res)=>{
    const alllisting=await List.find({});
    res.render("index.ejs",{alllisting});
}));

// showing route 

app.get("/index/new",(req,res)=>{
    res.render("new_hotel_form.ejs");
})
//joi validation  for adding new entities 
app.post("/index",validatelisting,wrapAsync(async(req,res,next)=>{
    // if(!req.body){
    //     throw new ExpressError(400,"Send valid body");
    // }
    
    let new_entry=req.body;
    let new_hotel=new List(new_entry);
    await new_hotel.save();
    console.log(new_entry);
    res.redirect("/index");
}));

// edit route 

app.get("/index/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let data=await List.findById(id)
    res.render("edit.ejs",{data});
    console.log(data);
}));

app.put("/index/:id",validatelisting,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await List.findByIdAndUpdate(id,{...req.body});
    res.redirect("/index");
}));

app.delete("/index/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await List.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/index");
}));


//hotel data to show details 


app.get("/index/:id",wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const hotel_data= await  List.findById(id).populate("reviews");
    res.render("hotel.ejs",{hotel_data});
}));

//reviews post request 
app.post("/index/:id/review",validatereview,wrapAsync(async(req,res)=>{
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

app.delete("/index/:id/reviews/:reviewid",wrapAsync(async(req,res)=>{
    let {id,reviewid}=req.params;
    let deleted=await Review.findByIdAndDelete(reviewid);
    await List.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    console.log(deleted);



    res.redirect(`/index/${id}`);
}));








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