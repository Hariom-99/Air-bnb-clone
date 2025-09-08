const List=require("../models/model_list.js");

module.exports.index=async(req,res)=>{
    const alllisting=await List.find({});
    res.render("index.ejs",{alllisting});
}
module.exports.add_new_hotel=async(req,res,next)=>{
    // if(!req.body){
    //     throw new ExpressError(400,"Send valid body");
    // }
    
    let new_entry=req.body;
    let new_hotel=new List(new_entry);
    new_hotel.owner=req.user._id;
    await new_hotel.save();
    req.flash("success","The new listing was created successfully");
    console.log(new_entry);
    res.redirect("/index");
}
module.exports.edit_hotel=async(req,res)=>{
    let {id}=req.params;
    let data=await List.findById(id)
    res.render("edit.ejs",{data});
    console.log(data);
}
module.exports.edit_hotel_put=async(req,res)=>{
    let {id}=req.params;
    await List.findByIdAndUpdate(id,{...req.body});
     req.flash("success","The listing was edited successfully");
    res.redirect("/index");
}
module.exports.destroy_hotel=async(req,res)=>{
    let {id}=req.params;
    let deleted=await List.findByIdAndDelete(id);
    console.log(deleted);
     req.flash("success","The listing was deleted successfully");
    res.redirect("/index");
}
module.exports.show_hotel=async(req,res)=>{
    const {id}=req.params;
    const hotel_data= await  List.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(!hotel_data){
        req.flash("error","Hotel you are looking does not exist");
         return res.redirect("/index");
    }
    console.log(hotel_data);
    res.render("hotel.ejs",{hotel_data});
}