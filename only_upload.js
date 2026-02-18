const mongoose = require("mongoose");
const List = require("./models/model_list");

mongoose.connect("mongodb://127.0.0.1:27017/air_bnb_db")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

async function deleteData() {
  await List.deleteMany({});
  console.log("All listings deleted");
  mongoose.connection.close();
}

deleteData();
