const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review_model.js")
const listingSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    image:{type:String,
    default:"https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww",//this is for backend auto allot of the image if not given
set:(v)=>v===""?"https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww":v},// this is when client gives the empty string in the image secton 
    price:{type:Number},
    location:{type:String},
    country:{type:String},
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    },],
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
    },

})
listingSchema.post("findOneAndDelete",async(List)=>{
    if(List){
        await Review.deleteMany({_id:{$in:List.reviews}});
    }
})
const List=mongoose.model("list",listingSchema);
module.exports=List;