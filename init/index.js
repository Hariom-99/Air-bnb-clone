
const mongoose=require("mongoose");
const initData=require("./data.js");
const List=require("../models/model_list.js");

main()
.then(()=>{console.log(" database connection successful");})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/air_bnb_db');
}

const initDB=async()=>{
    await List.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68aef77cec9ae9d1fb73c939"}));
    await List.insertMany(initData.data);
    console.log("data was inserted in the database")
}

initDB();