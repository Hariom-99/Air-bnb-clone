const express=require("express");
const app=express();
const mongoose=require("mongoose");
const List=require("./models/model_list.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate")
const wrapAsync=require("./util/wrapAsync.js");
const ExpressError=require("./util/ExpressError.js")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
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

app.get("/index",wrapAsync(async(req,res)=>{
    const alllisting=await List.find({});
    res.render("index.ejs",{alllisting});
}));

// showing route 

app.get("/index/new",(req,res)=>{
    res.render("new_hotel_form.ejs");
})
app.post("/index",wrapAsync(async(req,res,next)=>{
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

app.put("/index/:id",wrapAsync(async(req,res)=>{
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




app.get("/index/:id",wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const hotel_data= await  List.findById(id);
    res.render("hotel.ejs",{hotel_data});
}));


app.all("/*catchAll", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found!"));
// });


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
});



app.listen("8080",()=>{
    console.log("app is listening to port 8080");
})