const mongoose=require("mongoose");



const listingSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    image:{type:String,
    default:"https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg8",//this is for backend auto allot of the image if not given
set:(v)=>v===""?"https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg":v},// this is when client gives the empty string in the image secton 
    price:{type:Number},
    location:{type:String},
    country:{type:String}
})

const List=mongoose.model("list",listingSchema);
module.exports=List;